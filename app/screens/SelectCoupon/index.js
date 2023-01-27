import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image, Coupon, Button } from "@components";
import styles from "./styles";
import DataEmpty from "../../components/DataEmpty";

import { UserData, HotelData, TourData, CouponsData } from "@data";
// Load sample flight data list
import { AsyncStorage } from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import DropdownAlert from 'react-native-dropdownalert';

export default class SelectCoupon extends Component {
    constructor(props) {
        super(props);
        // Temp data define
        this.state = {
            loading_dashboard: true,
            airplane: "",
            flight: [],
            loading: false,
            userSession: this.props.navigation.state.params.userSession,
            param: this.props.navigation.state.params.param,
            listdata_promo: [],
            couponCode: '',
            coupons: [{ "id_coupon_history": 136, "id_coupon": 33, "id_order": null, "id_user": 2022, "contact_title": "Mr", "contact_first": "arif", "contact_last": "hendra87", "coupon_code": "baro", "amount": null, "product": "potongan", "date_claim": "2021-03-04T06:23:01.000Z", "date_used": null, "expired": "2021-03-11", "detail_coupon": { "coupon_name": "Baro", "type": "potongan", "amount": 4000, "percent": "tetap", "max_reward": 12000, "minimum": 100000, "coupon_code": "baro", "platform": "web,app", "product": "", "quantity": 5, "term": "sk", "payment_method": "semua", "extra_term": null, "start_date": "2021-03-01", "end_date": "2021-03-11", "expired_day": 0, "category": "total", "coupon_type": "unik", "status": 1, "action": null, "date_added": "2021-02-25T09:39:14.000Z", "date_modified": null }, "available": true }]

        };

        this.getConfigApi();
        this.getConfig();
        this.getSession();
    }



    //memanggil config
    getConfigApi() {
        AsyncStorage.getItem('configApi', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ configApi: config });
            }
        });
    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                console.log('getConfig', JSON.stringify(config));
                this.setState({ config: config });
            }
        });
    }

    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                var id_user = userSession.id_user;


                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
                console.log('userSession', JSON.stringify(userSession));
            }
        });
    }


    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    //couponCode
    useCoupon(item) {
        const { navigation } = this.props;
        console.log('coupon', JSON.stringify(item));
        this.props.navigation.state.params.useCoupon(item);
        navigation.goBack();
    }

    useCouponForm() {
        const { navigation } = this.props;
        const { couponCode } = this.state;
        const { param } = this.state;
        console.log('couponCode', JSON.stringify(couponCode));
        console.log('param', JSON.stringify(param));

        if (param.type == "flight") {
            this.count(couponCode);
        } else {
            this.props.navigation.state.params.useCouponForm(couponCode);
            navigation.goBack();

        }


        //this.count(couponCode);


    }


    count(couponCode) {
        const { navigation } = this.props;
        let config = this.state.configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "booking/count";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);



        let param = this.state.param;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);
        var paramCount = {};
        paramCount.product = "flight";
        paramCount.key = param.key;
        paramCount.point = false;
        paramCount.insurance = false;
        paramCount.coupon = [couponCode];
        paramCount.paymentMethod = 0;
        paramCount.platform = "app";
        paramCount.ssr = [];
        //paramCount.ssr = this.state.ssr;

        console.log('paramCount', JSON.stringify(paramCount));
        var raw = JSON.stringify(paramCount);



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultcountSelect', JSON.stringify(result));

                if (result.success == false) {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));


                } else {

                    navigation.state.params.useCouponForm(couponCode);
                    navigation.goBack();

                }



            })
            .catch(error => console.log('error', error));


    }




    renderItem(item) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <Coupon
                style={{
                    marginVertical: 0,
                    marginRight: 10,
                    width: '100%'
                }}
                name={item.coupon_code}
                code={item.coupon_code}
                description={item.product_name}
                valid={this.convertDateText(item.expired)}
                remain={priceSplitter('Rp ' + parseInt(item.detail_coupon.minimum))}
                onPress={() => {
                    //alert(item.id_coupon);
                    this.useCoupon(item);
                    //this.props.navigation.navigate("HotelDetail");
                }}
                // quantity={item.quantity}
                // claimed={item.claimed}
                // usedKuota={item.usedKuota}
                // claimable={item.claimed}
                usedCoupon={true}
            />
        );
    }



    getCoupon() {
        const { login, userSession, param } = this.state;


        let config = this.state.configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "promotion/coupon/mycoupon";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var paramCoupon = {
            "id_user": userSession.id_user,
            "total": param.total,
            "platform": "app",
            "product": param.type
        }
        console.log('paramCoupon', JSON.stringify(paramCoupon));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var raw = JSON.stringify(paramCoupon);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading_dashboard: false });
                console.log('resultCoupons', JSON.stringify(result));
                this.setState({ listdata_promo: result.data });

            })
            .catch(error => { alert('Kegagalan Respon Servers'); });





        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNDEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTYzNjYwODAzNTY4MSwiaWF0IjoxNjM2NTIxNjM1fQ.M2yCp5LuZAtyzX8sN0WU-IQjLKkysL_BMr4WcHRr3qs");

        // var raw = JSON.stringify({
        //     "id_user": "2071",
        //     "total": 149400,
        //     "platform": "app",
        //     "product": "flight"
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch("https://devapi.masterdiskon.com/v1/promotion/coupon/mycoupon", requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));


    }

    componentDidMount() {
        console.log('param', JSON.stringify(this.state.param));
        setTimeout(() => {
            this.getCoupon();
        }, 20);

        //this.getProduct();
        // this.setState({ loading_spinner: true }, () => {
        //     AsyncStorage.getItem('config', (error, result) => {
        //         if (result) {   
        //             let config = JSON.parse(result);
        //             var access_token=config.token;
        //             var path=config.common_airport_default.dir;
        //             var url=config.baseUrl;




        //             console.log(url+path,{"param":""});
        //            fetch(url+path,{"param":""})
        //             .then(response => response.json())
        //             .then(result => {
        //                 this.setState({ loading_spinner: false });
        //                 this.setState({flight:result});
        //                 const { navigation } = this.props;
        //                 const selected = navigation.getParam("selected");

        //                 if (selected) {
        //                     this.setState({
        //                         flight: this.state.flight.map(item => {
        //                             return {
        //                                 ...item,
        //                                 checked: item.code == selected
        //                             };
        //                         })
        //                     });
        //                 }

        //             })
        //             .catch(error => {

        //                 alert('Kegagalan Respon Server')
        //             });


        //         }
        //     });             

        // });
    }

    onChange(select) {
        this.setState({
            flight: this.state.flight.map(item => {
                if (item.code == select.code) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }

            })
        });

        const { navigation } = this.props;
        var type = navigation.getParam("type");
        if (type == 'from') {
            this.props.navigation.state.params.setBandaraAsal(
                select.code, select.label
            )
            navigation.goBack();
        } else if (type == 'to') {

            this.props.navigation.state.params.setBandaraTujuan(
                select.code, select.label
            )
            navigation.goBack();
        }
    }

    // search(value) {
    //     this.setState({ loading_spinner: true }, () => {

    //         AsyncStorage.getItem('config', (error, result) => {
    //             if (result) {
    //                 let config = JSON.parse(result);
    //                 var access_token = config.token;
    //                 var path = config.common_airport.dir;
    //                 var url = config.baseUrl;

    //                 console.log(url, path, { "param": value });




    //                 var myHeaders = new Headers();
    //                 myHeaders.append("Content-Type", "application/json");
    //                 // myHeaders.append("Cookie", "ci_session=htllmlmq1kc1inaabihi3lqeqv8jjm91");

    //                 var raw = JSON.stringify({ "param": value });

    //                 var requestOptions = {
    //                     method: 'POST',
    //                     headers: myHeaders,
    //                     body: raw,
    //                     redirect: 'follow'
    //                 };

    //                 fetch(config.baseUrl + "front/api_new/common/airport", requestOptions)
    //                     .then(response => response.json())
    //                     .then(result => {

    //                         this.setState({ loading_spinner: false });
    //                         this.setState({ flight: result });
    //                         const { navigation } = this.props;
    //                         const selected = navigation.getParam("selected");

    //                         if (selected) {
    //                             this.setState({
    //                                 flight: this.state.flight.map(item => {
    //                                     return {
    //                                         ...item,
    //                                         checked: item.code == selected
    //                                     };
    //                                 })
    //                             });
    //                         }

    //                     })
    //                     .catch(error => {

    //                         alert('Kegagalan Respon Server')
    //                     });


    //             }
    //         });
    //     });

    // }

    // onSave() {
    //     const { navigation } = this.props;
    //     var selectParent = navigation.getParam("selected");
    //     var type = navigation.getParam("type");
    //     const selected = this.state.flight.filter(item => item.checked);

    //     if (selected.length > 0) {
    //         if (type == 'from') {
    //             this.setState(
    //                 {
    //                     loading: true
    //                 },
    //                 () => {
    //                     setTimeout(() => {
    //                         this.props.navigation.state.params.setBandaraAsal(
    //                             selected[0].code, selected[0].label
    //                         )
    //                         navigation.goBack();
    //                     }, 50);
    //                 }
    //             );

    //         } else if (type == 'to') {

    //             this.setState(
    //                 {
    //                     loading: true
    //                 },
    //                 () => {
    //                     setTimeout(() => {
    //                         this.props.navigation.state.params.setBandaraTujuan(
    //                             selected[0].code, selected[0].label
    //                         )
    //                         navigation.goBack();
    //                     }, 50);
    //                 }
    //             );
    //         }
    //     }
    // }



    render() {
        const { navigation } = this.props;
        let { flight, loading, airplane, loading_spinner, coupons, loading_dashboard } = this.state;

        var contentFormCoupon = <View style={{ marginBottom: 10, marginTop: 10 }}>
            <View style={[styles.line, { flexDirection: 'column' }]} />
            <Text caption2 style={{ paddingTop: 10 }}>
                Kode kupon
            </Text>

            <View style={{
                flexDirection: "row",
                //marginBottom: this.state.couponCodeList.length == 0 ? 15 :0,
            }}>
                <TouchableOpacity
                    style={{ flex: 9 }}
                // onPress={() =>
                //     {
                //     this.getCouponDetail();
                //     }}
                >
                    <TextInput
                        style={[BaseStyle.textInput, { flex: 11 }]}
                        onChangeText={text => {
                            this.setState({ couponCode: text });
                        }}
                        autoCorrect={false}
                        placeholder="Masukkan kode kupon"
                        placeholderTextColor={BaseColor.grayColor}
                        selectionColor={BaseColor.primaryColor}
                    />
                    {/* <Text style={[BaseStyle.textInput]}>{this.state.couponCode}</Text> */}
                </TouchableOpacity>

                <Button
                    loading={this.state.loadingCheckCoupon}
                    style={[{ backgroundColor: BaseColor.primaryColor }, { flex: 1, borderRadius: 5, height: 40, marginTop: 0 }]}

                    onPress={() => {
                        this.useCouponForm();
                    }}
                >
                    <Icon
                        name="chevron-forward-outline"
                        size={14}
                        color={BaseColor.whiteColor}
                        style={{ textAlign: "center" }}
                    />
                </Button>
                {/* <TouchableOpacity
                    style={{flex: 4,borderWidth: 1,borderColor: BaseColor.fieldColor,borderRadius: 10,backgroundColor:BaseColor.primaryColor}}
                        onPress={() =>
                            {
                            this.checkCoupon();
                            }}
                    >
                            <View style={{justifyContent:'center',alignItems:'center',flex:1,height:30}}><Text caption2  style={{textAlign:'center'}} whiteColor>Gunakan</Text></View>
                    </TouchableOpacity> */}


            </View>

        </View>


        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Pilih Kupon"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => { }}
                />
                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>

                    <ScrollView>
                        <View style={styles.contain}>
                            {/* <TextInput
                        style={BaseStyle.textInput}
                        onChangeText={text => this.search(text)}
                        autoCorrect={false}
                        placeholder="Cari kupon"
                        placeholderTextColor={BaseColor.grayColor}
                        selectionColor={BaseColor.primaryColor}
                    /> */}


                            <View style={{ width: "100%", height: "100%" }}>
                                {contentFormCoupon}
                                {
                                    loading_dashboard ?
                                        <Placeholder
                                            Animation={Fade}

                                        >
                                            <View style={{
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: BaseColor.fieldColor
                                            }}>
                                                <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                                <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                            </View>

                                            <View style={{
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: BaseColor.fieldColor
                                            }}>
                                                <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                                <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                            </View>

                                            <View style={{
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: BaseColor.fieldColor
                                            }}>
                                                <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                                <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                            </View>

                                            <View style={{
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: BaseColor.fieldColor
                                            }}>
                                                <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                                <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                            </View>
                                        </Placeholder>
                                        :
                                        this.state.listdata_promo.length == 0 ?
                                            <DataEmpty />
                                            :
                                            <View>
                                                <FlatList
                                                    data={this.state.listdata_promo}
                                                    keyExtractor={(item, index) => item.id_coupon}
                                                    renderItem={({ item }) => this.renderItem(item)}
                                                />
                                            </View>
                                    // <View />
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={2000} />

            </SafeAreaView>
        );
    }
}


