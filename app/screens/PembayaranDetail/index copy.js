import React, { Component } from "react";
import { View, ScrollView, Animated, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem,
    Button
} from "@components";
import * as Utils from "@utils";
// import styles from "./styles";
import { DataMasterDiskon, DataPayment, DataBooking } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { PostData } from '../../services/PostData';
import AnimatedLoader from "react-native-animated-loader";
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

const styles = StyleSheet.create({
    containField: {
        margin: 20,
        marginTop: 90,
        flexDirection: "row",
        height: 140,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 10
    },
    contentLeftItem: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    tagFollow: { width: 150, margin: 10 },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: Utils.getWidthDevice() / 3
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    containProfileItem: {
        paddingLeft: 20,
        paddingRight: 20
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    contentButtonBottom: {
        // borderTopColor: BaseColor.textSecondaryColor,
        // borderTopWidth: 1,
        //paddingVertical: 10,
        // paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
});


export default class PembayaranDetail extends Component {
    constructor(props) {
        super(props);
        var param = props.navigation.state.params.param;
        var id_order = param.id_order;
        var dataPayment = param.dataPayment;

        //console.log('dataPayments',JSON.stringify(dataPayment));

        AsyncStorage.getItem('tokenFirebase', (error, result) => {
            if (result) {
                //console.log('Token Firebase',result);
                this.setState({
                    tokenFirebase: result
                });
            }
        });



        this.state = {
            dataPayment: dataPayment,
            dataBooking: DataBooking,
            statusMidtrans: { "va_numbers": [{ "bank": "bca", "va_number": "81174157162" }], "payment_amounts": [], "transaction_time": "2020-07-06 16:33:07", "gross_amount": "740800.00", "currency": "IDR", "order_id": "MD2007060026", "payment_type": "bank_transfer", "signature_key": "7eb271c8362f64dd96c7519a7067ccb5d8f563ee45e7c64e4606773332aad32841e522fcdfb30dae96c183d57a044db425f07a3772a3e4d848ccbb1d65765884", "status_code": "201", "transaction_id": "1df337f3-5dc2-4cc7-a445-ae8c46eabefa", "transaction_status": "pending", "fraud_status": "accept", "status_message": "Success, transaction is found", "merchant_id": "G042781174" },
            id_order: id_order,
            loading: false,
        };
    }

    submitPayment() {

        const { dataPayment, dataBooking } = this.state;

        var paramPayMD = {
            "subtotal": dataBooking[0].subtotal,
            "insurance": dataBooking[0].insurance,
            "fee": dataBooking[0].fee,
            "total_price": dataBooking[0].total_price,
            "id_order": dataBooking[0].id_order,
            "order_code": dataBooking[0].order_code,
            "dataPayment": this.state.dataPayment,
            "tokenFirebase": this.state.tokenFirebase,
        }
        //console.log('paramPayMD',JSON.stringify(paramPayMD));
        ////console.log('paramPayMidtrans',JSON.stringify(paramPayMidtrans));
        this.payMasterDiskon(paramPayMD);

    }

    payMasterDiskon(paramPayMD) {
        this.setState({ loading_spinner: true }, () => {
            //console.log("---------------paramPayMD ------------");
            //console.log(JSON.stringify(paramPayMD));


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify(paramPayMD);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://masterdiskon.com/front/api_new/apiOrder/payment", requestOptions)
                .then(response => response.json())
                .then((result) => {
                    //console.log("---------------result payment md ------------");
                    //console.log(JSON.stringify(result));
                    var id_invoice = result.id_invoice;
                    this.payMidtrans(id_invoice);

                });
        });

    }


    payMidtrans(id_invoice) {
        const { dataPayment, dataBooking } = this.state;
        var payment_type = dataPayment.payment_type;
        var payment_sub = dataPayment.payment_sub;


        var transaction_details = {
            gross_amount: dataBooking[0].total_price,
            order_id: id_invoice
        }
        var customer_details = {
            email: dataBooking[0].contact.contact_email,
            first_name: dataBooking[0].contact.contact_first,
            last_name: dataBooking[0].contact.contact_last,
            phone: dataBooking[0].contact.contact_phone,
        }


        if (payment_type == 'bank_transfer') {
            var paramPay = {
                payment_type: payment_type,
                transaction_details: transaction_details,
                customer_details: customer_details,
                bank_transfer: {
                    bank: payment_sub
                }
            }
        }




        //console.log('paramPay',JSON.stringify(paramPay))


        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");

        var raw = JSON.stringify(paramPay);
        var requestOptions = {
            method: 'POST',


            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.sandbox.midtrans.com/v2/charge", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log("---------------result payment midtarns ------------");
                //console.log(JSON.stringify(result));

                this.setState({ loading_spinner: false });

                var redirect = 'PembayaranDetail';
                var param = {
                    id_order: this.state.id_order,
                    dataPayment: this.state.dataPayment
                }
                this.props.navigation.navigate("Loading", { redirect: redirect, param: param });
            })
            .catch(error => //{ alert('Kegagalan Respon Server');});
    
    }

    duration(expirydate) {

        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;

    }

    content_countdown() {
        var item = this.state.dataBooking[0];
        var order_expired = item.order_expired;
        var expiredTime = this.duration(order_expired);
        var countDown = <View></View>;

        if (expiredTime > 0) {
            if (item.order_status.order_status_slug == 'new' || item.order_status.order_status_slug == 'process') {
                countDown = <View style={{
                    borderWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10
                }}>

                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text>
                                        Batas Waktu Pembayaran
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}>
                                <CountDown
                                    size={12}
                                    until={expiredTime}
                                    // onFinish={() => alert('Finished')}
                                    style={{ float: 'left' }}
                                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor }}
                                    digitTxtStyle={{ color: BaseColor.primaryColor }}
                                    timeLabelStyle={{ color: BaseColor.primaryColor, fontWeight: 'bold' }}
                                    separatorStyle={{ color: BaseColor.primaryColor }}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator
                                />
                            </View>
                        </View>
                    </View>
                </View>

            }

        }
        return (
            <View>
                {countDown}
            </View>
        )
    }

    content_payment() {
        const { navigation } = this.props;
        const { dataPayment, loading, dataBooking, statusMidtrans } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num = dataBooking[0].order_payment_num;
        var order_payment_recent = dataBooking[0].order_payment_recent;
        var content = <View></View>;
        var virtual_account = '';
        var payment_type = dataPayment.payment_type;
        var payment_sub = dataPayment.payment_sub;




        if (order_payment_recent != null) {
            if (payment_type == 'bank_transfer') {
                if (payment_sub == 'bca') {
                    virtual_account = this.state.statusMidtrans.va_numbers[0].va_number;
                } else if (payment_sub == 'bni') {
                    virtual_account = this.state.statusMidtrans.va_numbers[0].va_number;
                } else if (payment_sub == 'permata') {
                    virtual_account = this.state.statusMidtrans.permata_va_number;
                }
            }
        }

        if (order_payment_recent == null) {
            content = <View>
                <View style={{
                    borderWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10
                }}>

                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text>
                                        Total Pembayaran
                                    </Text>

                                </View>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text caption1 semibold numberOfLines={1}>
                                    {'IDR ' + priceSplitter(this.state.dataBooking[0].total_price)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        } else {
            content = <View>
                <View style={{
                    borderWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10
                }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center", borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }}>
                            <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                                        Transfer
                                    </Text>
                                    <Text>
                                        {dataPayment.payment_sub_label}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text></Text>
                                <Text caption1 semibold numberOfLines={1}>

                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center", borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }}>
                            <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                                        No Rekening
                                    </Text>
                                    <Text caption1 semibold numberOfLines={6}>
                                        {this.state.dataBooking[0].order_payment_info.norek}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text></Text>
                                <Text caption1 semibold numberOfLines={1}>
                                    SALIN
                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center", borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }}>
                            <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                                        Total Pembayaran
                                    </Text>
                                    <Text caption1 semibold numberOfLines={1}>
                                        {'IDR ' + priceSplitter(this.state.dataBooking[0].order_payment[0].iv_total_amount)}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text></Text>
                                <Text caption1 semibold numberOfLines={1}>
                                    SALIN
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                                        Virtual Account
                                    </Text>
                                    <Text caption1 semibold numberOfLines={10}>
                                        {virtual_account}

                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text></Text>
                                <Text caption1 semibold numberOfLines={1}>
                                    SALIN
                                </Text>
                            </View>
                        </View>
                    </View>



                </View>
            </View>

        }

        return (
            <View>
                {content}
            </View>
        )
    }
    content_button() {

        const { navigation } = this.props;
        const { dataPayment, loading, dataBooking } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var order_payment_num = dataBooking[0].order_payment_num;
        var order_payment_recent = dataBooking[0].order_payment_recent;
        var content = <View></View>;


        if (order_payment_recent == null) {
            content = <View style={styles.contentButtonBottom}>
                <Button
                    full
                    loading={loading}
                    onPress={() => {
                        Alert.alert(
                            'Confirm',
                            'Yakin ingin membayar tagihan ini ?',
                            [
                                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                { text: 'YES', onPress: () => this.submitPayment() },
                            ]
                        );
                    }}
                >
                    Bayar
                </Button>
            </View>
        } else {


            content = <View>
                <View style={styles.contentButtonBottom}>
                    <Button
                        full
                        loading={loading}
                        onPress={() => {
                            this.onSubmit();
                        }}
                    >
                        Sudah Membayar
                    </Button>
                </View>
                <View style={styles.contentButtonBottom}>
                    <Button
                        full
                        loading={loading}
                        onPress={() => {
                            Alert.alert(
                                'Confirm',
                                'Ingin mengganti metode pembayaran ?',
                                [
                                    { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                    { text: 'YES', onPress: () => this.changePayment() },
                                ]
                            );
                        }}
                        style={{ backgroundColor: BaseColor.grayColor }}
                    >
                        <Text style={{ color: BaseColor.whiteColor }}>Ganti Metode Pembayaran</Text>
                    </Button>
                </View>
            </View>

        }


        return (

            <View>
                {content}
            </View>
        )

    }


    // submitPayment(){


    //     const data={"id_order":this.state.id_order}
    //     const param={"param":data}
    //     //console.log('-------------param change payment-------------');
    //     //console.log(JSON.stringify(param));

    //     PostData('order_payment_delete',param)
    //         .then((result) => {
    //             //console.log("---------------get_booking_historys ------------");
    //             //console.log(JSON.stringify(result));
    //             //this.setState({dataBooking:result});
    //         },
    //         (error) => {
    //             this.setState({ error });
    //         }
    //     ); 

    // }


    changePayment() {

        this.setState({ loading_spinner: true }, () => {
            const data = { "id_order": this.state.id_order }
            const param = { "param": data }
            //console.log('-------------param change payment-------------');
            //console.log(JSON.stringify(param));

            PostData('order_payment_delete', param)
                .then((result) => {
                    this.cancelMidtrans();

                },
                    (error) => {
                        this.setState({ error });
                    }
                );
        });

    }

    cancelMidtrans() {
        var dataBooking = this.state.dataBooking;
        var order_code = dataBooking[0].order_code;
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");

        var raw = "";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.sandbox.midtrans.com/v2/" + order_code + "/cancel", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading_spinner: false });
                //console.log("---------------cancel midtrans ------------");
                //console.log(JSON.stringify(result));
                var redirect = 'Pembayaran';
                var param = {
                    id_order: this.state.id_order,
                    dataPayment: {}
                }
                this.props.navigation.navigate("Loading", { redirect: redirect, param: param });
            })
            .catch(error => //{ alert('Kegagalan Respon Server');}); 
    }

    fetch() {

        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                    let userSession = JSON.parse(result);
                    //console.log("---------------data session user  ------------");
                    //console.log(JSON.stringify(userSession));
                    this.setState({ userSession: userSession });
                    this.setState({ login: true });

                    var id_user = userSession.id_user;
                    const data = { "id": id_user, "id_order": this.state.id_order, "order_status": "", "product": "" }
                    const param = { "param": data }
                    //console.log('-------------param booking-------------');
                    //console.log(JSON.stringify(param));


                    PostData('get_booking_history', param)
                        .then((result) => {
                            var dataBooking = result;
                            //console.log("---------------get_booking_historys ------------");
                            //console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({ dataBooking: dataBooking });


                            //var order_code=dataBooking[0].order_code;

                            var order_payment_recent = dataBooking[0].order_payment_recent;



                            if (order_payment_recent != null) {
                                var id_invoice = order_payment_recent.id_invoice;
                                this.fetchMidtrans(id_invoice);

                            }

                        },
                            (error) => {
                                this.setState({ error });
                            }
                        );
                } else {
                    this.setState({ login: false });
                }

            });
        });

    }

    fetchMidtrans(id_invoice) {
        //console.log('id_invoice',id_invoice);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://api.sandbox.midtrans.com/v2/" + id_invoice + "/status", requestOptions)
            .then(response => response.json())
            .then(result => {
                var statusMidtrans = result;
                //console.log('status_midtrans',JSON.stringify(result));
                this.setState({ statusMidtrans: statusMidtrans });
            })
            .catch(error => //{ alert('Kegagalan Respon Server');});

    }


    componentDidMount() {
        this.fetch();
    }

    render() {
        const { navigation } = this.props;
        const { dataPayment, loading, dataBooking, loading_spinner } = this.state;


        return (


            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={dataPayment.payment_type_label + ' - ' + dataPayment.payment_sub_label}
                    subTitle={'No.Tagihan :' + this.state.dataBooking[0].order_code}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />

                {
                    loading_spinner ?

                        <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
                            <View
                                style={{
                                    position: "absolute",
                                    top: 220,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >

                                <AnimatedLoader
                                    visible={true}
                                    overlayColor="rgba(255,255,255,0.75)"
                                    source={require("app/assets/loader_paperline.json")}
                                    animationStyle={{ width: 300, height: 300 }}
                                    speed={1}
                                />
                                <Text grayColor>
                                    Connecting.. to Masterdiskon
                                </Text>
                            </View>
                        </View>
                        :
                        <ScrollView>
                            <View style={{ padding: 20 }}>
                                {this.content_countdown()}
                                {this.content_payment()}
                                {this.content_button()}
                            </View>
                        </ScrollView>
                }

            </SafeAreaView>
        );
    }
}

