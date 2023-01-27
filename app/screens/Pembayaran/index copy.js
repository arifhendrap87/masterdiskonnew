import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, BackHandler, FlatList, Clipboard } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button
} from "@components";
import * as Utils from "@utils";
import CountDown from 'react-native-countdown-component';
import AnimatedLoader from "react-native-animated-loader";
import moment from 'moment';
import CardCustomProfile from "../../components/CardCustomProfile";
import DataImage from "../../components/DataImage";
import Modal from "react-native-modal";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import PreviewBooking from "../../components/PreviewBooking";
import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBooking
} from "@data";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


export default class Pembayaran extends Component {
    constructor(props) {
        var param = props.navigation.state.params.param;
        var id_order = param.id_order;
        var back = param.back;

        super(props);
        this.state = {
            id_order: id_order,
            back: back,
            pnrDeparture: '-',
            pnrReturns: '-',
            order_id_aero: '',//untuk chek booking aero,
            dataDeparture: {
                "item_id": "3806ad46-bd0d-4cd1-bf3a-c3158e731782",
                "origin": "CGK",
                "origin_name": "Soekarno-Hatta International Airport",
                "destination": "DPS",
                "destination_name": "Ngurah Rai (Bali) International Airport",
                "url_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                "airline": "CITILINK INDONESIA",
                "airline_code": "QG",
                "pnr": "C6Q3NI",
                "gmt_departure": "2020-08-04T21:55:00",
                "gmt_arrival": "2020-08-04T23:55:00",
                "departure_time": "04:55:00",
                "arrival_time": "07:55:00",
                "flight_segment": null,
                "price_pax": [
                    {
                        "pax_type": "ADT",
                        "count": 1,
                        "price": 740800.0
                    },
                    {
                        "pax_type": "ADT",
                        "count": 1,
                        "price": 795800.0
                    }
                ],
                "trans_information_details": [
                    {
                        "cabinClass": "Economy",
                        "subClass": "N",
                        "paxName": "NdaruKurniawan",
                        "paxType": "Adult",
                        "ticketNumber": "N/A",
                        "picEmail": "kurniandaru@gmail.com",
                        "baggage": "20",
                        "requestStatus": false,
                        "insurance": false
                    }
                ]
            },
            dataReturns: null,
            dataBooking: DataBooking,
            payment: [
                // {
                //     payment_type:"credit_card",
                //     payment_type_label: "Kartu Kredit",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"credit_card",
                //                         payment_sub_label:"Kartu Kredit",
                //                         icon:"",
                //                     }
                //                 ]
                // },

                {
                    payment_type: "bank_transfer",
                    payment_type_label: "ATM / Bank Transfer (Fee Rp 5.000,-)",
                    option: true,
                    subPayment: [

                        {
                            payment_sub: "bni_va",
                            payment_sub_label: "BNI",
                            icon: "",
                            fee: 5000
                        },
                        {
                            payment_sub: "permata_va",
                            payment_sub_label: "PERMATA",
                            icon: "",
                            fee: 5000
                        },
                        {
                            payment_sub: "echannel",
                            payment_sub_label: "Mandiri",
                            icon: "",
                            fee: 5000
                        },
                        // {
                        //     payment_sub:"other_va",
                        //     payment_sub_label:"Bank Lainnya",
                        //     icon:"",
                        //     fee:5000
                        // },

                    ]
                },
                // {
                //     payment_type:"gopay",
                //     payment_type_label: "Gopay",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"gopay",
                //                         payment_sub_label:"Gopay",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"klik_bca",
                //     payment_type_label: "Klik BCA",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"bca_klikbca",
                //                         payment_sub_label:"Klik BCA",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"bca_klik_pay",
                //     payment_type_label: "BCA KlikPay",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"bca_klikpay",
                //                         payment_sub_label:"BCA KlikPay",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"cimb_clicks",
                //     payment_type_label: "CIMB Clicks",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"cimb_clicks",
                //                         payment_sub_label:"CIMB Clicks",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"danamon_online",
                //     payment_type_label: "Danamon Online",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"danamon_online",
                //                         payment_sub_label:"Danamon Online",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"telkomsel_cash",
                //     payment_type_label: "Telkomsel Cash",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"visa_mastercard",
                //                         payment_sub_label:"Kartu Kredit",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"indomart",
                //     payment_type_label: "Indomart",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"indomaret",
                //                         payment_sub_label:"Indomart",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"alfamart",
                //     payment_type_label: "Alfamart",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"alfamart",
                //                         payment_sub_label:"Alfamart",
                //                         icon:"",
                //                     }
                //                 ]
                // },
                // {
                //     payment_type:"akulaku",
                //     payment_type_label: "Akulaku",
                //     option:false,
                //     subPayment:[
                //                     {
                //                         payment_sub:"akulaku",
                //                         payment_sub_label:"Akulaku",
                //                         icon:"",
                //                     }
                //                 ]
                // },



            ],
            modalVisible: false,
            option: [
                {
                    payment_sub: "bca",
                    payment_sub_label: "BCA",
                    icon: "",
                },
                {
                    payment_sub: "bni",
                    payment_sub_label: "BNI",
                    icon: "",
                },
                {
                    payment_sub: "permata",
                    payment_sub_label: "PERMATA",
                    icon: "",
                },

            ],
            paymentChooseTemp: {},
            config: DataConfig,

            listdata_promo: DataLoading,
            listdata_musium: DataLoading,
            listdata_culture: DataLoading,
            listdata_product_trip_country: DataLoading,
            listdata_product_trip: DataTrip,
            listdata_product_hotel_package: DataHotelPackage,
            listdata_product_hotel_package_room_promo: DataHotelPackage,
            listdata_product_hotel_package_buy_now_stay_later: DataHotelPackage,
            list_hotel_package_city: DataHotelPackageCity,
            listdata_product_flash: DataLoading,
            listdata_product_activities: DataActivities,
            listdata_slider: DataSlider,
            listdata_dashboard: DataDashboard,
        };

        this.getConfig();
        this.getSession();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Booking');
        return true;
    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
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
            }
        });
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
        var order_payment_recent = item.order_payment_recent;
        var countDown = <View></View>;


        if (order_payment_recent != null) {
            var expiredTime = this.duration(order_payment_recent.expired);
            if (expiredTime > 0) {
                countDown = <View style={{
                    borderWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10
                }}>

                    <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
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
        var url = this.state.config.baseUrl;
        var item = this.state.dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var order_payment = item.order_payment;
        var order_expired = item.order_expired;
        var expiredTime = this.duration(order_expired);
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var content = '';
        var content_tagihan = <View></View>;
        var content_invoice = <View></View>;
        var content_countdown = <View></View>;
        var content_get_code_hotelLinx = <View></View>;






        content_order = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }} >
            <View style={{ flexDirection: 'row', flex: 11, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <View>
                        <Text caption1 bold>
                            Data Order
                                                </Text>
                    </View>
                </View>
                <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                    <Text caption1 semibold numberOfLines={1}>
                        {this.state.dataBooking[0].order_code}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {

                    var type = '';
                    if (this.state.dataBooking[0].product == 'Trip') {
                        type = 'trip';
                    } else if (this.state.dataBooking[0].product == 'Flight') {
                        type = 'flight';
                    } else if (this.state.dataBooking[0].product == 'Hotel') {
                        type = 'hotelLinx';
                    } else if (this.state.dataBooking[0].product == 'Hotelpackage') {
                        type = 'hotelpackage';
                    } else if (this.state.dataBooking[0].product == 'Activities') {
                        type = 'activities';
                    }
                    var param = {
                        type: type
                    }



                    // this.props.navigation.navigate("PreviewBooking",{
                    //     dataDetail:this.state.dataBooking[0],
                    //     param:param,
                    //     config:this.state.config
                    // });

                }
                }
            >


                <Icon
                    name="angle-right"
                    size={18}
                    color={BaseColor.primaryColor}
                    style={{ textAlign: "center" }}
                />
            </TouchableOpacity>
        </View>


        //if (item.product != 'Trip'){
        var expiredTime = this.duration(order_payment_recent.expired);
        if (item.order_status.order_status_slug == 'paid') {
            countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else if (item.order_status.order_status_slug == 'booked') {
            countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else if (item.order_status.order_status_slug == 'complete') {
            countDown = <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else {

            if (expiredTime > 0) {
                if (item.order_status.order_status_slug == 'process' || item.order_status.order_status_slug == 'new') {
                    //     content_invoice=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
                    //                 <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                    //                     <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                    //                         <View>
                    //                             <Text caption1 bold>
                    //                                No. Tagihan
                    //                             </Text>
                    //                         </View>
                    //                     </View>
                    //                     <View caption1 semibold style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                    //                             <Text semibold numberOfLines={1}>
                    //                             {order_payment_recent.id_invoice}
                    //                             </Text>
                    //                     </View>
                    //                 </View>
                    //             </View>
                    // content_tagihan=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
                    //                     <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                    //                         <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                    //                             <View caption1 bold>
                    //                                 <Text>
                    //                                    Tagihan
                    //                                 </Text>
                    //                             </View>
                    //                         </View>
                    //                         <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                    //                                 <Text caption1 semibold numberOfLines={1}>
                    //                                 Rp {priceSplitter(order_payment_recent.iv_total_amount)}
                    //                                 </Text>
                    //                         </View>
                    //                     </View>
                    //                 </View>

                    content_countdown = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text>
                                        Batas Pembayaran
                                                </Text>
                                </View>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
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

                    if (item.product == 'Hotel') {
                        if (item.product_detail.referenceno == "") {
                            content_get_code_hotelLinx = <View style={{ flexDirection: 'row' }}>
                                <Button
                                    style={{ width: '100%', height: 40, backgroundColor: BaseColor.primaryColor }}
                                    onPress={() => {
                                        alert('Masih dalam pengembangan');
                                    }}
                                    full
                                >
                                    <Text style={{ color: BaseColor.whiteColor }}>Get Code</Text>

                                </Button>

                            </View>
                        } else {
                            content_get_code_hotelLinx = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                    <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <View>
                                            <Text>
                                                Voucher Code
                                                    </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                        <Text semibold numberOfLines={1}>
                                            {item.product_detail.referenceno}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        }

                    }
                    //}
                    // else
                    // {
                    //     // content_invoice=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
                    //     //             <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                    //     //                 <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                    //     //                     <View>
                    //     //                         <Text>
                    //     //                            No. Tagihan
                    //     //                         </Text>
                    //     //                     </View>
                    //     //                 </View>
                    //     //                 <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                    //     //                         <Text semibold numberOfLines={1}>
                    //     //                         -
                    //     //                         </Text>
                    //     //                 </View>
                    //     //             </View>
                    //     //         </View>
                    //   content_tagihan=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
                    //                     <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                    //                         <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                    //                             <View>
                    //                                 <Text>
                    //                                    Tagihan
                    //                                 </Text>
                    //                             </View>
                    //                         </View>
                    //                         <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                    //                                 <Text semibold numberOfLines={1}>
                    //                                 -
                    //                                 </Text>
                    //                         </View>
                    //                     </View>
                    //                 </View>
                    // }




                } else {
                    if (item.order_status.order_status_slug == 'new') {

                        content_invoice = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                            <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                    <View>
                                        <Text>
                                            No. Tagihan
                                            </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Text semibold numberOfLines={1}>
                                        {order_payment_recent.id_invoice}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        content_tagihan = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                            <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                    <View>
                                        <Text>
                                            Tagihan
                                                    </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Text semibold numberOfLines={1}>
                                        Rp {priceSplitter(order_payment_recent.iv_total_amount)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    } else {
                        content_invoice = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                            <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                    <View>
                                        <Text>
                                            No. Tagihan
                                                    </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Text semibold numberOfLines={1}>
                                        -
                                                    </Text>
                                </View>
                            </View>
                        </View>
                        content_tagihan = <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                            <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                    <View>
                                        <Text>
                                            Tagihan
                                                    </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Text semibold numberOfLines={1}>
                                        -
                                                    </Text>
                                </View>
                            </View>
                        </View>

                    }
                }
            }
            // }else{
            //     content_invoice=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
            //                         <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
            //                             <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
            //                                 <View>
            //                                     <Text>
            //                                        No. Pembayaran
            //                                     </Text>
            //                                 </View>
            //                             </View>
            //                             <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
            //                                     <Text semibold numberOfLines={1}>
            //                                     {order_payment[0].id_invoice}
            //                                     </Text>
            //                             </View>
            //                         </View>
            //                     </View>

            //     content_tagihan=<View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
            //                             <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
            //                                 <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
            //                                     <View>
            //                                         <Text>
            //                                            Terbayar
            //                                         </Text>
            //                                     </View>
            //                                 </View>
            //                                 <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
            //                                         <Text semibold numberOfLines={1}>
            //                                         Rp {priceSplitter(order_payment[0].iv_total_amount)}
            //                                         </Text>
            //                                 </View>
            //                             </View>
            //                         </View>

            // }
        }
        // else
        // {
        //     if(order_payment_recent.expired==""){
        //         //payArray=<View />
        //         if(item.order_status.order_status_slug=='new'){
        //             payArray=<View><View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                         <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                             <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                 <View>
        //                                     <Text>
        //                                     No. Tagihan
        //                                     </Text>
        //                                 </View>
        //                             </View>
        //                             <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                     <Text semibold numberOfLines={1}>
        //                                     {order_payment_recent.id_invoice}
        //                                     </Text>
        //                             </View>
        //                         </View>
        //                     </View>

        //                     <View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                                 <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                     <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                         <View>
        //                                             <Text>
        //                                                Tagihan
        //                                             </Text>
        //                                         </View>
        //                                     </View>
        //                                     <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                             <Text semibold numberOfLines={1}>
        //                                             Rp {priceSplitter(order_payment_recent.iv_total_amount)}
        //                                             </Text>
        //                                     </View>
        //                                 </View>
        //                             </View> 
        //                         </View>
        //         }else{
        //             payArray=<View><View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                             <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                 <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                     <View>
        //                                         <Text>
        //                                         No. Tagihan
        //                                         </Text>
        //                                     </View>
        //                                 </View>
        //                                 <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                         <Text semibold numberOfLines={1}>
        //                                         -
        //                                         </Text>
        //                                 </View>
        //                             </View>
        //                         </View>

        //                         <View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                                     <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                         <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                             <View>
        //                                                 <Text>
        //                                                 Tagihan
        //                                                 </Text>
        //                                             </View>
        //                                         </View>
        //                                         <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                                 <Text semibold numberOfLines={1}>
        //                                                 -
        //                                                 </Text>
        //                                         </View>
        //                                     </View>
        //                                 </View> 
        //                             </View>

        //         }

        //     }else{
        //         var payArray = [];
        //         var a=1;
        //         order_payment.map(item => {
        //             payArray.push(
        //                         <View style={{borderBottomWidth: 1,borderBottomColor: BaseColor.textSecondaryColor,borderBottomStyle: 'solid',paddingBottom:10}}>
        //                             <View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                                 <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                     <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                         <View>
        //                                             {/* <Text>
        //                                             No. Tagihan {a}
        //                                             </Text> */}
        //                                             <Text>
        //                                             No. Tagihan
        //                                             </Text>
        //                                         </View>
        //                                     </View>
        //                                     <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                             <Text semibold numberOfLines={1}>
        //                                             {
        //                                             (this.duration(item.expired) > 0) ?
        //                                             item.id_invoice
        //                                             :
        //                                             '-'
        //                                             }
        //                                             </Text>
        //                                     </View>
        //                                 </View>
        //                             </View>

        //                             <View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                                         <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                             <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                             {
        //                                             (this.duration(item.expired) > 0) ?
        //                                                 <View>
        //                                                     { 
        //                                                     item.pay_status === "settlement" ?
        //                                                         <Text>Terbayar</Text>
        //                                                         :
        //                                                         <Text>Tagihan</Text>
        //                                                     }
        //                                                 </View>
        //                                                 :
        //                                                 <View><Text>Tagihan</Text></View>

        //                                             }

        //                                             </View>
        //                                             <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                             {
        //                                                 (this.duration(item.expired) > 0) ?
        //                                                     <Text semibold numberOfLines={1}>
        //                                                     Rp {priceSplitter(item.iv_total_amount)}
        //                                                     </Text>
        //                                                 :
        //                                                 <Text semibold numberOfLines={1}>
        //                                                 -
        //                                                     </Text>
        //                                             }
        //                                             </View>
        //                                         </View>
        //                             </View>

        //                             {
        //                             (this.duration(item.expired) > 0) ?
        //                             <View style={{flexDirection:'row',paddingTop:5,paddingBottom:5}} >
        //                                 <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
        //                                     <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
        //                                         <View>
        //                                             { 
        //                                                 item.pay_status === "settlement" ?
        //                                                         <Text>Status</Text>
        //                                                     :
        //                                                     <Text>Batas Pembayaran</Text>
        //                                             }
        //                                         </View>
        //                                     </View>
        //                                     <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
        //                                             { 
        //                                                 item.pay_status === "settlement" ?
        //                                                         <Text>Lunas</Text>
        //                                                     :
        //                                                     <CountDown
        //                                                             size={12}
        //                                                             until={this.duration(item.expired)}
        //                                                             // onFinish={() => alert('Finished')}
        //                                                             style={{float:'left'}}
        //                                                             digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
        //                                                             digitTxtStyle={{color: BaseColor.primaryColor}}
        //                                                             timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
        //                                                             separatorStyle={{color: BaseColor.primaryColor}}
        //                                                             timeToShow={['H', 'M', 'S']}
        //                                                             timeLabels={{m: null, s: null}}
        //                                                             showSeparator
        //                                                         />
        //                                             }


        //                                     </View>
        //                                 </View>
        //                             </View>
        //                             :
        //                             <View />
        //                             }
        //                     </View>

        //             );
        //             a++;
        //         });

        //     }

        // }
        var content = <View></View>
        //if(item.product != 'Trip'){
        content = <View style={{
            borderBottomWidth: 1,
            backgroundColor: "#fff",
            //borderRadius: 18,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //elevation: 5,
            paddingHorizontal: 20,
        }}>

            {/* {content_order}
                        {content_invoice}
                        {content_tagihan} */}
            {content_countdown}
            {content_get_code_hotelLinx}

        </View>
        // }
        // else
        // {
        //     content=<View style={{
        //                 borderBottomWidth: 1,
        //                 backgroundColor: "#fff",
        //                 //borderRadius: 18,
        //                 shadowColor: "#000",
        //                 shadowOffset: {
        //                         width: 0,
        //                         height: 2,
        //                 },
        //                 shadowOpacity: 0.25,
        //                 shadowRadius: 3.84,
        //                 paddingHorizontal:20,

        //                 //elevation: 5,
        //                 }}>

        //                 {content_order}
        //                 {payArray}
        //             </View>
        // }


        return (
            <View>
                {content}
            </View>
        )
    }

    modalShow(status, item) {
        this.setState({ modalVisible: status });
        this.setState({ option: item.subPayment });
        this.setState({ paymentChooseTemp: item });
    }

    gotoPaymentDetailSub(item) {
        this.setState({ modalVisible: false });
        const { navigation } = this.props;
        const { id_order, paymentChooseTemp, config } = this.state;
        console.log(config.midtransMethod);

        var dataPayment = {
            payment_type: paymentChooseTemp.payment_type,
            payment_type_label: paymentChooseTemp.payment_type_label,
            payment_sub: item.payment_sub,
            payment_sub_label: item.payment_sub_label,
            payment_fee: item.fee
        }

        var param = {
            id_order: id_order,
            dataPayment: dataPayment
        }
        this.tokenMidtransUpdate(param);


    }


    gotoPaymentDetail(item) {
        const { navigation } = this.props;
        const { id_order, config } = this.state;

        console.log(config.midtransMethod);
        var dataPayment = {
            payment_type: item.payment_type,
            payment_type_label: item.payment_type_label,
            payment_sub: item.subPayment[0].payment_sub,
            payment_sub_label: item.subPayment[0].payment_sub_label,
        }

        var param = {
            id_order: id_order,
            dataPayment: dataPayment
        }
        navigation.navigate("PembayaranDetail", {
            param: param,
        });
    }


    tokenMidtransUpdate(param) {
        this.setState({ loading_spinner: true });
        var dataPayment = param.dataPayment;
        var fee = dataPayment.payment_fee;
        var idOrder = param.id_order;

        var item = this.state.dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var totalPembayaran = parseInt(order_payment_recent.iv_total_amount) + parseInt(fee);




        const { config, dataBooking } = this.state;
        var authBasicHeader = config.midtransKey.authBasicHeader;

        var payment_type = dataPayment.payment_type;
        var payment_sub = dataPayment.payment_sub;

        var transaction_details = {
            gross_amount: totalPembayaran,
            order_id: dataBooking[0].order_payment_recent.id_invoice
        }
        var customer_details = {
            email: dataBooking[0].contact.contact_email,
            first_name: dataBooking[0].contact.contact_first,
            last_name: dataBooking[0].contact.contact_last,
            phone: dataBooking[0].contact.contact_phone,
        }

        var enabled_payments = [payment_sub];

        var paramPay = {
            transaction_details: transaction_details,
            customer_details: customer_details,
            enabled_payments
        }

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var requestOptions = {
        //                 method: 'POST',
        //                 headers: myHeaders,
        //                 body:  JSON.stringify(paramPay),
        //                 redirect: 'follow'
        //                 };


        var url = config.midtransUrlToken;
        console.log('url', url);


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + authBasicHeader);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=6mmg253sca0no2e0gqas59up68f6ljlo");

        var raw = JSON.stringify(paramPay);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('dataToken', JSON.stringify(result));
                var paramPayMD = {
                    "total_pembayaran": totalPembayaran,
                    "fee": fee,
                    "id_invoice": dataBooking[0].order_payment_recent.id_invoice,
                    "dataPayment": dataPayment,
                    "token": result.token,
                    "order_code": dataBooking[0].order_code,
                    "id_order": idOrder
                }

                console.log('snapTokenUpdate', JSON.stringify(paramPayMD));
                this.snapTokenUpdate(paramPayMD, param);

            })
            .catch(error => { alert('Kegagalan Respon Server'); });




        //  fetch(url, requestOptions)
        //  //return PostDataNew(url,'',param)
        //      .then((result) => {
        //         console.log(JSON.stringify(result));
        //         var paramPayMD={
        //             "total_pembayaran":totalPembayaran,
        //             "fee":fee,
        //             "id_invoice":dataBooking[0].order_payment_recent.id_invoice,
        //             "dataPayment":dataPayment,
        //             "token":result.token,
        //             "order_code":dataBooking[0].order_code,
        //             "id_order":idOrder
        //             }

        //             console.log('snapTokenUpdate',JSON.stringify(paramPayMD));

        //         this.snapTokenUpdate(paramPayMD);
        //         })
        //         .catch((error) => {
        //             console.log(JSON.stringify(error));
        //             alert('Kegagalan Respon Server');
        //           });
    }


    snapTokenUpdate(paramPayMD, param) {
        const { navigation } = this.props;

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var requestOptions = {
        //                 method: 'POST',
        //                 headers: myHeaders,
        //                 body:  JSON.stringify(paramPayMD),
        //                 redirect: 'follow'
        //                 };


        const { config } = this.state;
        var url = config.baseUrl + 'front/api_new/OrderSubmit/snap_token_update';
        //  fetch(url+'front/api_new/OrderSubmit/snap_token_update', requestOptions)
        //  //return PostDataNew(url,'front/api_new/OrderSubmit/snap_token_update',param)
        //      .then((result) => {
        //                 console.log('snapTokenUpdate',JSON.stringify(result));
        //                 var id_invoice=result.id_invoice;
        //                 var token=result.token;
        //                 var dataSendMidTrans={
        //                     id_invoice:id_invoice,
        //                     token:token
        //                 }

        //                 // setTimeout(() => {
        //                 //     fetch();

        //                 // }, 50);
        //                 //setLoading(false);
        //      })
        //      .catch((error) => {
        //         console.log(JSON.stringify(error));
        //         alert('Kegagalan Respon Server');
        //       });





        console.log('urlss', url, JSON.stringify(paramPayMD));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=6mmg253sca0no2e0gqas59up68f6ljlo");

        var raw = JSON.stringify(paramPayMD);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading_spinner: false });
                console.log('snapTokenUpdate', JSON.stringify(result));
                var id_invoice = result.id_invoice;
                var token = result.token;
                var dataSendMidTrans = {
                    id_invoice: id_invoice,
                    token: token
                }
                navigation.navigate("PembayaranDetail", {
                    param: param,
                });

            })
            .catch(error => { alert('Kegagalan Respon Server'); });




    }



    content_bank() {
        const { option, config, id_order } = this.state;
        var item = this.state.dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var order_expired = item.order_expired;
        var expiredTime = this.duration(order_expired);
        var content = <View></View>
        var status_name = '';
        var img = '';
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var content_bank = [];

        var content = <View></View>
        var content_modal = <Modal
            isVisible={this.state.modalVisible}
            onBackdropPress={() => {
                this.setState({ modalVisible: false });
            }}
            onSwipeComplete={() => {
                this.setState({ modalVisible: false });
            }}
            swipeDirection={["down"]}
            style={styles.bottomModal}
        >
            <View style={styles.contentFilterBottom}>

                <View style={styles.contentSwipeDown}>
                    <View style={styles.lineSwipeDown} />
                </View>
                {option.map((item, index) => (
                    <TouchableOpacity
                        style={styles.contentActionModalBottom}
                        key={item.value}
                        onPress={() => {
                            //this.onSelect(item)
                            this.gotoPaymentDetailSub(item);

                        }}
                    >
                        <Text
                            body2
                            semibold
                            primaryColor={item.checked}
                        >
                            {item.payment_sub_label}
                        </Text>
                    </TouchableOpacity>
                ))}

            </View>
        </Modal>



        this.state.payment.map((item, index) => (
            content_bank.push(
                <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                        if (item.option == true) {
                            this.modalShow(true, item);
                        } else {

                            this.gotoPaymentDetail(item);
                        }

                    }}
                >
                    <Text caption2 bold>{item.payment_type_label}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <Icon
                            name="angle-right"
                            color={BaseColor.primaryColor}
                            style={{ marginLeft: 5 }}
                        />
                    </View>

                </TouchableOpacity>
            )
        ))

        if (order_payment_recent != null) {
            var expiredTime = this.duration(order_payment_recent.expired);
            var title = <Text>Metode Pembayaran</Text>


            if (item.order_status.order_status_slug == 'paid') {
                title = <View />;
                content = <View />
            } else if (item.order_status.order_status_slug == 'booked') {
                title = <View />;

                content = <View />
            } else if (item.order_status.order_status_slug == 'complete') {
                title = <View />;

                content = <View />
            } else {

                if (expiredTime > 0) {
                    if (item.order_status.order_status_slug == 'process' || item.order_status.order_status_slug == 'new') {
                        status_name = item.order_status.order_status_name;
                        content = content_bank;
                    } else {
                        status_name = item.order_status.order_status_name;
                        content = <DataImage img={Images.timeout} text={status_name} />
                    }
                } else {
                    if (item.order_status.order_status_slug == 'new') {
                        if (order_payment_recent.expired == "") {
                            status_name = 'Menunggu Konfirmasi';
                            content = <DataImage img={Images.waiting} text={status_name} />
                        } else {
                            status_name = 'Expired';
                            content = <DataImage img={Images.timeout} text={status_name} />
                        }
                    } else if (item.order_status.order_status_slug == 'process') {
                        status_name = 'Expired';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'paid') {
                        status_name = 'Paid';
                        content = <DataImage img={Images.paid} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'booked') {
                        status_name = 'Booked';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'complete') {
                        status_name = 'Complete';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'cancel') {
                        status_name = 'Cancel';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'expired') {
                        status_name = 'Expired';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'billed') {
                        status_name = 'Billed';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'deny') {
                        status_name = 'Deny';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'error') {
                        status_name = 'Error';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'dropped') {
                        status_name = 'Dropped';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    } else if (item.order_status.order_status_slug == 'refunded') {
                        status_name = 'Refunded';
                        content = <DataImage img={Images.timeout} text={status_name} />
                    }
                }
            }

        } else {
            status_name = item.order_status.order_status_name;
            content = <View
                style={{
                    borderWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}
            >
                <Icon
                    name="check-circle"
                    size={50}
                    color={'green'}
                    solid
                />
                <Text caption2>
                    {status_name}
                </Text>
            </View>

        }
        return (
            <View style={{
                borderBottomWidth: 1,
                backgroundColor: "#fff",
                //borderRadius: 18,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                paddingHorizontal: 20,
                //paddingVertical:10
            }}>
                {title}
                {content}
                {content_modal}

            </View>
        )
    }

    content_eticket() {
        var item = this.state.dataBooking[0];
        var dataDeparture = this.state.dataDeparture;
        var dataReturns = this.state.dataReturns;
        var order_id_aero = this.state.order_id_aero;

        var type = '';
        if (this.state.dataBooking[0].product == 'Trip') {
            type = 'trip';
        } else if (this.state.dataBooking[0].product == 'Flight') {
            type = 'flight';
        } else if (this.state.dataBooking[0].product == 'Hotel') {
            type = 'hotelLinx';
        } else if (this.state.dataBooking[0].product == 'Hotelpackage') {
            type = 'hotelpackage';
        } else if (this.state.dataBooking[0].product == 'Activities') {
            type = 'activities';
        }
        var param = {
            type: type
        }


        if (item.product == 'Flight') {
            if (dataReturns != null) {
                var content_returns = <CardCustomProfile
                    title={'E-Ticket Returns'}
                    subtitle={'Check tiket kepulangan Anda'}
                    icon={'tag'}
                    onPress={() => {
                        this.props.navigation.navigate("Eticket",
                            {
                                order_id_aero: order_id_aero,
                                dataFlight: dataReturns,
                                type: 'Return',

                                dataDetail: this.state.dataBooking[0],
                                param: param,
                                config: this.state.config

                            });
                    }}

                />
            }
        }

        var content = <View></View>
        if (item.product == 'Flight') {
            if (item.order_status.order_status_slug == 'complete') {
                var order_detail = item.detail[0].order_detail[0];

                if (this.state.loading_evoucher == true) {
                    content = <View>
                        <Text>Check Eticket..</Text>
                        <PlaceholderLine style={{
                            height: 50, borderWidth: 1,
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom: 10,
                        }} width={100} />
                    </View>
                } else {
                    content = <View
                        style={{
                            borderWidth: 1,
                            borderColor: BaseColor.textSecondaryColor,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >

                        <CardCustomProfile
                            title={'E-Ticket Departures'}
                            subtitle={'Check tiket keberangkatan Anda'}
                            icon={'tag'}
                            onPress={() => {

                                this.props.navigation.navigate("Eticket",
                                    {
                                        order_id_aero: order_id_aero,
                                        dataFlight: dataDeparture, type: 'Departure',
                                        dataDetail: this.state.dataBooking[0],
                                        param: param,
                                        config: this.state.config
                                    });
                            }}

                        />

                        {content_returns}
                    </View>
                }
            }
        } else if (item.product == 'Hotelpackage' || item.product == 'Trip' || item.product == 'Activities' || item.product == 'Hotel') {
            if (item.order_status.order_status_slug == 'complete') {
                var order_detail = item.detail[0].order;
                content = <View
                    style={{
                        borderWidth: 1,
                        borderColor: BaseColor.textSecondaryColor,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                >
                    <CardCustomProfile
                        title={'Voucher Code'}
                        subtitle={'Check Evoucher pesanan Anda'}
                        icon={'pricetag-outline'}
                        onPress={() => {
                            this.props.navigation.navigate("Evoucher",
                                {
                                    dataDetail: this.state.dataBooking[0],
                                    param: param,
                                    config: this.state.config
                                });
                        }}

                    />



                </View>
            } else if (item.order_status.order_status_slug == 'paid') {
                var order_detail = item.detail[0].order;
                content = <View
                    style={{
                        borderWidth: 1,
                        borderColor: BaseColor.textSecondaryColor,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                >
                    <CardCustomProfile
                        title={item.order_status.order_status_desc}
                        subtitle={'Kami akan memproses pembayaran Anda'}
                        icon={'info-circle'}
                        nav={false}
                        onPress={() => {
                            this.props.navigation.navigate("Evoucher",
                                {
                                    dataDetail: this.state.dataBooking[0],
                                    param: param,
                                    config: this.state.config
                                });
                        }}

                    />



                </View>

            } else if (item.order_status.order_status_slug == 'booked') {
                var order_detail = item.detail[0].order;
                content = <View
                    style={{
                        borderWidth: 1,
                        borderColor: BaseColor.textSecondaryColor,
                        borderRadius: 10,
                        marginBottom: 10,
                    }}
                >
                    <CardCustomProfile
                        title={item.order_status.order_status_name}
                        subtitle={item.order_status.order_status_desc}
                        icon={'info-circle'}
                        nav={false}
                        onPress={() => {
                            this.props.navigation.navigate("Evoucher",
                                {
                                    dataDetail: this.state.dataBooking[0],
                                    param: param,
                                    config: this.state.config
                                });
                        }}

                    />



                </View>

            }
        }

        return (
            <View>
                {content}
            </View>
        )


    }


    // content_booking_code(){
    //     var item=this.state.dataBooking[0];
    //     var dataDeparture=this.state.dataDeparture;
    //     var dataReturns=this.state.dataReturns;
    //     var order_id_aero=this.state.order_id_aero;



    //     if(dataReturns != null){


    //     var content_returns=<CardCustomProfile 
    //                                 title={'E-Ticket Returns'}
    //                                 subtitle={'Check tiket kepulangan Anda'}
    //                                 icon={'tag'}
    //                                 onPress={() => {
    //                                     this.props.navigation.navigate("Eticket",
    //                                     {order_id_aero:order_id_aero,dataFlight:dataReturns,type:'Returns'});
    //                                 }}

    //                             />
    //                         }

    //     var content=<View></View>
    //     if(item.product=='Flight' && item.order_status.order_status_slug=='complete'){
    //         var order_detail=item.detail[0].order_detail[0];
    //         content=<View
    //                     style={{
    //                         borderWidth: 1, 
    //                         borderColor: BaseColor.textSecondaryColor,
    //                         borderRadius: 10,
    //                         marginBottom:10,
    //                         }}
    //                     >
    //                             <CardCustomProfile 
    //                                 title={'E-Ticket Departure'}
    //                                 subtitle={'Check tiket keberangkatan Anda'}
    //                                 icon={'tag'}
    //                                 onPress={() => {
    //                                     this.props.navigation.navigate("Eticket",{order_id_aero:order_id_aero,dataFlight:dataDeparture,type:'Departure'});
    //                                 }}

    //                             />
    //                         {content_returns}
    //                     </View>
    //     }

    //     return(
    //         <View>
    //                 {content}
    //         </View>
    //     )
    // }


    getDataDashboard() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);

                this.setState({ loading_dashboard: true }, () => {


                    var url = config.baseUrl;
                    var path = config.dashboard.dir;


                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(),
                        redirect: 'follow'
                    };

                    fetch(url + path, requestOptions)
                        .then(response => response.json())
                        .then(result => {


                            this.setState({ loading_dashboard: false });
                            var listdata_product_hotel_package_room_promo = result.list_product_hotel_package_room_promo;
                            var listdata_product_hotel_package_buy_now_stay_later = result.list_product_hotel_package_paynow_stay_later;
                            var listdata_product_activities = result.list_product_activities;
                            var listdata_product_trip = result.list_product_trip;

                            var list_hotel_package_city = result.list_hotel_package_city;
                            var listdata_category_hotel_package = result.form_hotel_category;
                            var listdata_slider = result.slider;

                            var more_product_hotel_package_room_promo = result.more_product_hotel_package_room_promo;
                            var more_product_hotel_package_buy_now_stay_later = result.more_product_hotel_package_buy_now_stay_later;
                            var more_product_activities = result.more_product_activities;
                            var more_product_trip = result.more_product_trip;
                            var more_hotel_package_city = result.more_hotel_package_city;


                            this.setState({ listdata_product_hotel_package_room_promo: listdata_product_hotel_package_room_promo })
                            this.setState({ listdata_product_hotel_package_buy_now_stay_later: listdata_product_hotel_package_buy_now_stay_later })
                            this.setState({ listdata_product_activities: listdata_product_activities });
                            this.setState({ listdata_product_trip: listdata_product_trip });

                            this.setState({ more_product_hotel_package_room_promo: more_product_hotel_package_room_promo })
                            this.setState({ more_product_hotel_package_buy_now_stay_later: more_product_hotel_package_buy_now_stay_later })
                            this.setState({ more_product_activities: more_product_activities });
                            this.setState({ more_product_trip: more_product_trip });
                            this.setState({ more_hotel_package_city: more_hotel_package_city });

                            this.setState({ list_hotel_package_city: list_hotel_package_city });
                            this.setState({ listdata_category_hotel_package: listdata_category_hotel_package });
                            this.setState({ listdata_slider: listdata_slider });


                        })
                        .catch(error => { alert('Kegagalan Respon Server') });
                });

            }
        });
    }



    renderItemFeaturedDestination(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
                propInframe={{ top: '', bottom: item.city_name }}
                propTitle={{ text: '' }}
                propDesc={{ text: '' }}
                propPrice={{ price: '', startFrom: true }}
                propStar={{ rating: ''.stars, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() =>
                    navigation.navigate("Hotel", { id_city: item.id_city })
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: false, horizontal: true, width: wp("40%") }}
            />
        );
    }



    renderItemRoomPromo(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_place, bottom: item.product_cat }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: true }}
                propPriceCoret={{ price: priceSplitter(item.product_price_correct), discount: priceSplitter(item.product_discount), discountView: true }}
                propStar={{ rating: item.product_rate, enabled: true }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() =>
                    navigation.navigate("ProductDetail", { product: item, product_type: 'hotelpackage' })
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );
    }



    renderItemBuyNowStayLater(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_place, bottom: item.product_cat }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: true }}
                propPriceCoret={{ price: priceSplitter(item.product_price_correct), discount: priceSplitter(item.product_discount), discountView: true }}
                propStar={{ rating: item.product_rate, enabled: true }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() =>
                    navigation.navigate("ProductDetail", { product: item, product_type: 'hotelpackage' })
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );
    }

    renderItemEvent(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: item.img_featured_url }}
                propInframe={{ top: this.convertDateDM(item.product_time), bottom: item.product_cat }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: true }}
                propPriceCoret={{ price: priceSplitter(item.product_price_correct), discount: priceSplitter(item.product_discount), discountView: true }}

                propInframe={{ top: this.convertDateDM(item.product_time), bottom: item.product_cat }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    navigation.navigate("ProductDetail", { product: item, product_type: 'activities' })
                }
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    navigation.navigate("ProductDetail", { product: item, product_type: 'activities' })
                }
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );

    }

    renderItemPaketTrip(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: hp("20%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_place, bottom: item.product_time }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: true }}
                propPriceCoret={{ price: '', discount: priceSplitter(item.product_discount), discountView: true }}

                propStar={{ rating: 10, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() =>
                    navigation.navigate("TourDetailCustom", { product: item })
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );

    }

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
        return d.getDate() + "+" + months[d.getMonth()] + "+" + d.getFullYear();
    }



    convertDateDM(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return d.getDate() + " " + months[d.getMonth()];
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({ loading_spinner: true });
        //this.getDataDashboard();
        //this.fetch();
        navigation.addListener('willFocus', () => {
            this.setState({ loading_spinner: true });
            this.setState({ loading_evoucher: true });
            setTimeout(() => {
                this.fetch();
            }, 50);
        });
    }

    getCodeHotelLinx(id) {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=ilba585ua0c2rl442pmjs1osqdpmm5re");

        var formdata = new FormData();
        formdata.append("id", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://masterdiskon.com/front/product/hotel/getCodeHL", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultCodeHotelLinx', JSON.stringify(result));

            })
            .catch(error => { alert('Kegagalan Respon Server'); });

    }

    fetch() {
        const { config, id_order, id_user } = this.state;
        var url = config.baseUrl;
        var path = config.user_order.dir;

        var data = { "id": id_user, "id_order": id_order, "id_order_status": "", "product": "" }
        var parameter = { "param": data }

        var body = parameter;

        this.setState({ loading_spinner: true }, () => {
            var param = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }


            console.log('get_booking_historys_param', url + path, parameter);
            fetch(url + path, param)
                .then(response => response.json())
                .then(result => {
                    console.log('result', JSON.stringify(result));
                    var dataBooking = result;


                    this.setState({ dataBooking: dataBooking });

                    var order_status = dataBooking[0].order_status.order_status_slug;
                    var product = dataBooking[0].product;
                    if (product == 'Flight' && order_status == 'complete') {
                        var order_code = dataBooking[0].aero_orderid;
                        this.checkBooking(order_code);
                    } else {
                        this.setState({ loading_spinner: false });
                        this.setState({ loading_evoucher: false });
                    }

                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    alert('Kegagalan Respon Server');
                });


        });
    }


    checkBooking(order_code) {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                var access_token = config.token;
                var url = config.aeroUrl;
                var path = 'crm/MyOrder/v3/' + order_code;

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Bearer " + access_token);


                var raw = JSON.stringify();
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                console.log(url + path);

                fetch(url + path, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({ loading_spinner: false });
                        this.setState({ loading_evoucher: false });
                        console.log('checkBooking', JSON.stringify(result));
                        this.setState({ dataBookingAero: result.data });

                        var order_id_aero = result.data.order_id;
                        var dataDeparture = result.data.orders[0].items[0].departure;
                        var pnrDeparture = result.data.orders[0].items[0].departure.pnr;

                        this.setState({ order_id_aero: order_id_aero });

                        this.setState({ dataDeparture: dataDeparture });
                        this.setState({ pnrDeparture: pnrDeparture });

                        var dataReturns = result.data.orders[0].items[0].returns;
                        this.setState({ dataReturns: dataReturns });

                        if (dataReturns != null) {
                            var pnrReturns = result.data.orders[0].items[0].returns.pnr;
                            this.setState({ pnrReturns: pnrReturns });
                        }

                    })
                    .catch(error => {
                        console.log(JSON.stringify(error));
                        alert('Kegagalan Respon Server');
                    });



                fetch(url + path, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error));
                        alert('Kegagalan Respon Server');
                    });
            }
        });
    }


    render() {
        const { navigation } = this.props;
        const { id_order, loading_spinner } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        var type = '';
        if (this.state.dataBooking[0].product == 'Trip') {
            type = 'trip';
        } else if (this.state.dataBooking[0].product == 'Flight') {
            type = 'flight';
        } else if (this.state.dataBooking[0].product == 'Hotel') {
            type = 'hotelLinx';
        } else if (this.state.dataBooking[0].product == 'Hotelpackage') {
            type = 'hotelpackage';
        } else if (this.state.dataBooking[0].product == 'Activities') {
            type = 'activities';
        }
        var param = {
            type: type
        }

        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Pembayaran"
                    subTitle={'No.Order :' + this.state.dataBooking[0].order_code}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Icon
                                name="reload-outline"
                                size={20}
                                color={BaseColor.primaryColor}
                            />

                        );
                    }}

                    onPressLeft={() => {
                        navigation.navigate('Booking');
                    }}

                    onPressRight={() => {
                        var redirect = 'Pembayaran';
                        var param = {
                            id_order: this.state.id_order,
                            dataPayment: {},
                        }
                        navigation.navigate("Loading", { redirect: redirect, param: param });
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
                                    overlayColor="rgba(255,255,255,0.1)"
                                    source={require("app/assets/loader_payment.json")}
                                    animationStyle={{ width: 250, height: 250 }}
                                    speed={1}
                                />
                                <Text>
                                    Prepare Payment
                                    </Text>
                            </View>
                        </View>
                        :

                        <ScrollView>
                            <View style={{}}>
                                {this.content_payment()}
                                {this.content_eticket()}
                                {/* {this.content_booking_code()} */}

                                {
                                    this.state.loading_spinner == false ?

                                        <PreviewBooking
                                            dataDetail={this.state.dataBooking[0]}
                                            param={param}
                                            config={this.state.config}
                                        />
                                        :
                                        <View />
                                }


                                {this.content_bank()}

                            </View>

                        </ScrollView>
                }
            </SafeAreaView>
        );
    }
}




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


    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    }
});
