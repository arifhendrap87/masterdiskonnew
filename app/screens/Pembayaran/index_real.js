import React, { Component, useEffect, useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, BackHandler, FlatList, Alert, Clipboard, TextInput, Linking, StatusBar } from "react-native";
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
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import PreviewBooking from "../../components/PreviewBooking";
import FastImage from 'react-native-fast-image';

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
import DropdownAlert from 'react-native-dropdownalert';
import Modal from "react-native-modal";
import { PostDataNew } from '../../services/PostDataNew';

import Dialog from "react-native-dialog";
import { useSelector, useDispatch } from 'react-redux';

export default function Pembayaran(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);

    const [param, setParam] = useState(props.navigation.state.params.param);
    const [id_order] = useState(param.id_order);
    const [orderIdAero, setOrderIdAero] = useState(orderIdAero);
    const [dataDeparture, setDataDeparture] = useState({});
    const [dataReturns, setDataReturns] = useState(null);
    const [dataBooking, setDataBooking] = useState(DataBooking);
    const [bookingDoc, setBookingDoc] = useState({});
    const [dataBookingAero, setDataBookingAero] = useState({});
    const [payment, setPayment] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCancel, setModalVisibleCancel] = useState(false);
    const [option, setOption] = useState([]);
    const [paymentChooseTemp, setPaymentChooseTemp] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);
    const [reason, setReason] = useState('');
    const [loadCancel, setLoadCancel] = useState(true);
    const [enableCancel, setEnableCancel] = useState(false);
    const [loadingPaymantMethod, setLoadingPaymantMethod] = useState(true);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [statusMidtrans, setStatusMidtrans] = useState({});
    const [loadingEvoucher, setLoadingEvoucher] = useState(false);
    const [statusIndodana, setStatusIndodana] = useState(false);
    const [loadingIndodana, setLoadingIndodana] = useState(true);
    const [paymentSelect, setPaymentSelect] = useState(false);
    const [paymentSelectData, setPaymentSelectData] = useState({});
    function duration(expirydate) {

        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;

    }

    function getPaymentMethod(total) {
        var type = '';
        if (total == 0) {
            type = 'statis';
        }
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + 'front/api_new/common/methodPayment/' + total + '/' + type;


        var type = '';
        if (total == 0) {
            type = 'statis';
        }
        // console.log('urlgetPaymentMethod', url);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=naquthon3ikgs94iun6c7g7cj4v9ukok");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('getPaymentMethod', JSON.stringify(result));
                setLoadingPaymantMethod(false);
                setPayment(result);
            })
            .catch(error => console.log('error', error));
    }


    function content_countdown() {
        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var countDown = <View></View>;


        if (order_payment_recent != null) {
            var expiredTime = duration(order_payment_recent.expired);
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

    function content_payment() {

        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var order_payment = item.order_payment;
        var order_expired = item.order_expired;
        var expiredTime = duration(order_expired);
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
                        {dataBooking[0].order_code}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {

                    var type = '';
                    if (dataBooking[0].product == 'Trip') {
                        type = 'trip';
                    } else if (dataBooking[0].product == 'Flight') {
                        type = 'flight';
                    } else if (dataBooking[0].product == 'Hotel') {
                        type = 'hotelLinx';
                    } else if (dataBooking[0].product == 'Hotelpackage') {
                        type = 'hotelpackage';
                    } else if (dataBooking[0].product == 'Activities') {
                        type = 'activities';
                    }
                    // var param = {
                    //     type: type
                    // }

                }
                }
            >


                <Icon
                    name="chevron-forward-outline"
                    size={18}
                    color={BaseColor.primaryColor}
                    style={{ textAlign: "center" }}
                />
            </TouchableOpacity>
        </View>


        //if (item.product != 'Trip'){
        var expiredTime = duration(order_payment_recent.expired);
        if (item.order_status.order_status_slug == 'paid') {
            countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else if (item.order_status.order_status_slug == 'booked') {
            countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else if (item.order_status.order_status_slug == 'complete') {
            countDown = <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
        } else {

            if (expiredTime > 0) {
                if (item.order_status.order_status_slug == 'process' || item.order_status.order_status_slug == 'new') {


                    content_countdown = <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        marginBottom: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        padding: 10,


                    }} >
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
                                    size={10}
                                    until={expiredTime}
                                    onFinish={() => {
                                        //alert('Finished')}
                                        var redirect = 'Pembayaran';
                                        var paramx = {
                                            id_order: id_order,
                                            dataPayment: {},
                                        }
                                        navigation.navigate("Loading", { redirect: redirect, param: paramx });
                                    }}
                                    style={{ float: 'left' }}
                                    digitStyle={{ backgroundColor: expiredTime < 300 ? BaseColor.thirdColor : BaseColor.secondColor }}
                                    digitTxtStyle={{ color: expiredTime < 300 ? BaseColor.whiteColor : BaseColor.blackColor }}
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

        }

        var content = <View></View>
        //if(item.product != 'Trip'){
        content = <View style={{

        }}>


            {content_countdown}
            {content_get_code_hotelLinx}

        </View>


        return (
            <View style={{

            }}>
                {content}
            </View>
        )
    }

    function modalShow(status, item) {

        console.log('itemMenu', JSON.stringify(item));

        if (item.payment_type == 'paylater') {
            getListIndodana();
        } else {
            setModalVisible(status);
            setOption(item.subPayment);
            setPaymentChooseTemp(item);

        }
    }

    function generateSubPaymentIndodana() {
        [
            {
                "payment_sub": "30_days",
                "payment_sub_label": "Indodana 30 hari",
                "icon": "paylater/5db129dbf7357fd4b59fe9fbbf883f74_e8dgasfl23kj4c766508e8bb827c564ccf373_compressed.png",
                "fee": 0,
                "payment_type": "30_days",
                "qris": false,
                "payment_form": "screenOther"
            }
        ]
    }

    function getListIndodana() {
        setModalVisible(false);
        var dataBookingData = dataBooking[0];
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + 'front/user/purchase/getTenorIndodanaApps';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer UEFSVE5FUk1BU1RFUkRJU0tPTjEyMzEyMzEyMzEyMw==");

        var formdata = new FormData();

        formdata.append("produk", dataBookingData.product);
        formdata.append("id", dataBookingData.id_user + dataBookingData.id_order);
        formdata.append("name", dataBookingData.product_name);
        formdata.append("image", dataBookingData.detail[0].order.img_featured_url);
        formdata.append("price", dataBookingData.total_price);
        formdata.append("qty", dataBookingData.pax_people);
        formdata.append("key", dataBookingData.id_user + dataBookingData.id_order);

        console.log('formdata', JSON.stringify(formdata));
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('getListIndodana', JSON.stringify(result));

                if (result.data.payments.length != 0) {
                    var subPaymentIndodana = [];
                    result.data.payments.map(item => {
                        var obj = {};

                        obj['payment_sub'] = item.id;
                        obj['payment_sub_label'] = item.paymentType;
                        obj['icon'] = '';
                        obj['fee'] = 0;
                        obj['payment_type'] = 'paylater';
                        obj['qris'] = false;
                        obj['payment_form'] = "screenOther";

                        subPaymentIndodana.push(obj);
                    });


                    const newPayment = payment.map(p =>
                        p.payment_type === 'paylater'
                            ? {
                                ...p,
                                subPayment: subPaymentIndodana,

                            }
                            : p
                    );
                    var item = newPayment.find(item => item.payment_type === 'paylater');

                    setModalVisible(true);
                    setOption(subPaymentIndodana);
                    setPaymentChooseTemp(item);
                    setPayment(newPayment);
                } else {
                    this.dropdown.alertWithType('error', 'Pembayaran', 'Total pembayaran sangat besar');
                }




            })
            .catch(error => console.log('error', error));



    }


    function gotoPaymentDetailSub(item) {
        setModalVisible(false);

        var dataPayment = {
            payment_type: item.payment_type,
            param_qris: item.qris,
            payment_type_label: paymentChooseTemp.payment_type_label,
            payment_sub: item.payment_sub,
            payment_sub_label: item.payment_sub_label,
            payment_fee: item.fee,
            payment_form: item.payment_form
        }

        var paramx = {
            id_order: id_order,
            dataPayment: dataPayment
        }
        console.log('paramx', JSON.stringify(paramx));

        if (dataPayment.payment_form == "screenOther") {
            if (dataPayment.payment_type == "gopay") {
                tokenMidtransUpdateCore(paramx);
            } else if (dataPayment.payment_type == "paylater") {
                indodanaChoose(paramx);
            } else {
                tokenMidtransUpdate(paramx);
            }
        } else {
            tokenMidtransUpdateCore(paramx);
        }







    }
    function indodanaChoose(paramx) {
        var dataPayment = param.dataPayment;
        var id_order = param.id_order;
        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var fee = dataPayment.payment_fee;
        var totalPembayaran = parseInt(order_payment_recent.iv_total_amount) + parseInt(fee);


        console.log('paramxIndodanaChoose', JSON.stringify(paramx));
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/user/purchase/checkoutIndodanaApps";
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer UEFSVE5FUk1BU1RFUkRJU0tPTjEyMzEyMzEyMzEyMw==");

        var formdata = new FormData();
        formdata.append("id_order", dataBooking[0].id_order);
        formdata.append("id_user", dataBooking[0].id_user);
        formdata.append("payment_type", paramx.dataPayment.payment_sub);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        console.log('requestoptionindodana', JSON.stringify(requestOptions));
        // var paramPayMD = {
        //     "total_pembayaran": totalPembayaran,
        //     "fee": fee,
        //     "id_invoice": dataBooking[0].order_payment_recent.id_invoice,
        //     "dataPayment": dataPayment,
        //     "token": "",
        //     "order_code": dataBooking[0].order_code,
        //     "id_order": id_order,
        //     "va_or_code_or_link": ""
        // }

        var params = {
            id_order: id_order,
            dataPayment: dataPayment
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultIndodana', JSON.stringify(result));
                console.log('paramPayment', JSON.stringify(params));
                //console.log('resultIndodana', JSON.stringify(result));
                params.dataPayment = {
                    payment_type: "Indodana",
                    param_qris: false,
                    payment_type_label: "Indodana",
                    payment_sub: "Indodana",
                    payment_sub_label: "Indodana",
                    payment_fee: 0,
                    payment_form: "screenOther"
                };
                navigation.navigate("PembayaranDetail", {
                    param: params,
                });
            })
            .catch(error => {
                alert('Kegagalan Respon Server indodana');
            });

    }
    function gotoPaymentDetail(item) {
        console.log(config.midtransMethod);
        var dataPayment = {
            payment_type: item.payment_type,
            payment_qris: item.qris,

            payment_type_label: item.payment_type_label,
            payment_sub: item.subPayment[0].payment_sub,
            payment_sub_label: item.subPayment[0].payment_sub_label,
            payment_fee: item.subPayment[0].fee,
            payment_form: item.subPayment[0].payment_form,
        }

        var paramx = {
            id_order: id_order,
            dataPayment: dataPayment
        }
        console.log('paramNosSub', JSON.stringify(paramx));


        if (dataPayment.payment_form == "screenOther") {
            if (dataPayment.payment_type == "gopay") {
                tokenMidtransUpdateCore(paramx);
            } else {
                tokenMidtransUpdate(paramx);
            }

        } else {
            tokenMidtransUpdateCore(paramx);
        }


    }


    function tokenMidtransUpdate(param) {
        setLoadingSpinner(true)
        var dataPayment = param.dataPayment;
        var id_order = param.id_order;
        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var fee = dataPayment.payment_fee;
        var totalPembayaran = parseInt(order_payment_recent.iv_total_amount) + parseInt(fee);
        let config = configApi;
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

        var credit_card = "";


        if (dataPayment.payment_type == "credit_card") {
            credit_card = {
                "secure": true,
                "save_card": true
            };
        }


        var item_details = [
            {
                "id": "1",
                "price": order_payment_recent.iv_total_amount,
                "quantity": 1,
                "name": dataBooking[0].product_name
            },
            {
                "id": "2",
                "price": fee,
                "quantity": 1,
                "name": "Fee"
            }

        ];

        var paramPay = {
            transaction_details: transaction_details,
            item_details,
            customer_details: customer_details,
            enabled_payments,
            credit_card
        }


        var url = config.midtransUrlToken;
        console.log('url', url);
        console.log('paramPay', JSON.stringify(paramPay));
        console.log('dataPayment', JSON.stringify(dataPayment));



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
                    "id_order": id_order,
                    "va_or_code_or_link": result.redirect_url
                }
                if (dataPayment.payment_type == "gopay") {
                    var qr_code_url = snapCharge(result.token);
                    param.qr_code_url = qr_code_url;
                    snapTokenUpdate(paramPayMD, param);
                } else {
                    snapTokenUpdate(paramPayMD, param);
                }


            })
            .catch(error => { alert('Kegagalan Respon Server tokenMidtransUpdate tokenMidtransUpdate'); });


    }

    function snapCharge(token) {
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = config.midtransUrlToken + token + "/charge";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic U0ItTWlkLXNlcnZlci1rYUg3VlctakNpVjAyOGtWcmJmbjZITGY6");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "payment_type": "gopay" });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result.qr_code_url;

            })
            .catch(error => { alert('Kegagalan Respon Server snapCharge'); });
    }

    function snapTokenUpdate(paramPayMD, params) {

        let config = configApi;
        var url = config.baseUrl + 'front/api_new/OrderSubmit/snap_token_update';


        console.log('paramPayMD', JSON.stringify(paramPayMD));
        console.log('params', JSON.stringify(params));
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
                setLoadingSpinner(false);
                console.log('snapTokenUpdate', JSON.stringify(result));
                var id_invoice = result.id_invoice;
                var token = result.token;
                var dataSendMidTrans = {
                    id_invoice: id_invoice,
                    token: token
                }


                if (paramPayMD.dataPayment.payment_form == "screenOther") {
                    navigation.navigate("PembayaranDetail", {
                        param: params,
                    });

                } else if (paramPayMD.dataPayment.payment_form == "screenSelf") {
                    var paramx = {
                        id_order: dataBooking[0].id_order,
                        dataPayment: {},
                    }
                    navigation.navigate("Loading", { redirect: 'Pembayaran', param: paramx });
                } else if (paramPayMD.dataPayment.payment_form == "screenLink") {

                    var paramx = {
                        id_order: dataBooking[0].id_order,
                        dataPayment: {},
                    }
                    navigation.navigate("Loading", { redirect: 'Pembayaran', param: paramx });

                    var link = paramPayMD.va_or_code_or_link;
                    // console.log('link',JSON.stringify(link));
                    // console.log('paramPayMD',JSON.stringify(paramPayMD));
                    Linking.openURL(link);
                }

            })
            .catch(error => { alert('Kegagalan Respon Server snapTokenUpdate'); });
    }

    function tokenMidtransUpdateCore(params) {
        setLoadingSpinner(true);
        var dataPayment = params.dataPayment;
        console.log('dataPaymenttokenMidtransUpdateCore', JSON.stringify(dataPayment));
        var fee = dataPayment.payment_fee;
        var id_order = params.id_order;

        var item = dataBooking[0];
        console.log('dataBooking', JSON.stringify(item));
        var order_payment_recent = item.order_payment_recent;
        var totalPembayaran = parseInt(order_payment_recent.iv_total_amount) + parseInt(fee);

        let config = configApi;
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
        var item_details = [{
            "id": "ID-ORDER" + dataBooking[0].id_order,
            "price": dataBooking[0].total_price,
            "quantity": 1,
            "name": dataBooking[0].product_name
        }];

        var bank_transfer = {
            "bank": dataPayment.payment_sub,
            "va_number": "1234567890"
        }

        var item_details = [
            {
                "id": "1",
                "price": order_payment_recent.iv_total_amount,
                "quantity": 1,
                "name": dataBooking[0].product_name
            },
            {
                "id": "2",
                "price": fee,
                "quantity": 1,
                "name": "Fee"
            }

        ];

        //console.log('params',JSON.stringify(params));
        if (dataPayment.payment_type == "gopay") {
            var gopay = {
                "secure": true,
                "save_card": true
            };

            var paramPay = {
                payment_type: dataPayment.payment_type,
                transaction_details: transaction_details,
                gopay,
                item_details,
                customer_details: customer_details,

            }

        } else {
            var paramPay = {
                payment_type: dataPayment.payment_type,
                transaction_details: transaction_details,
                item_details,
                customer_details: customer_details,

            }

        }


        if (dataPayment.payment_type == "bank_transfer") {
            paramPay.bank_transfer = bank_transfer;
        } else if (dataPayment.payment_type == "echannel") {
            paramPay.echannel = {
                "bill_info1": "Payment For:",
                "bill_info2": "Masterdiskon"
            }
        }
        console.log('parampay', JSON.stringify(paramPay));
        var url = config.midtransUrl + "v2/charge";
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + authBasicHeader);
        myHeaders.append("Cookie", "__cfduid=d4ff313b0fa4bdbbb74a64dd1f5a4ccb51616649753");

        var raw = JSON.stringify(paramPay);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {

                var va_or_code_or_link = "";
                if (dataPayment.payment_type == "bank_transfer") {
                    if (dataPayment.payment_sub == "bni") {
                        va_or_code_or_link = result.va_numbers[0].va_number;
                    } else if (dataPayment.payment_sub == "permata") {
                        va_or_code_or_link = result.permata_va_number;
                    }
                } else if (dataPayment.payment_type == "echannel") {
                    if (dataPayment.payment_sub == "echannel") {
                        va_or_code_or_link = result.bill_key;
                    }
                } else if (dataPayment.payment_type == "gopay") {
                    va_or_code_or_link = result.actions[0].url;
                }

                var paramPayMD = {
                    "total_pembayaran": totalPembayaran,
                    "fee": fee,
                    "id_invoice": dataBooking[0].order_payment_recent.id_invoice,
                    "dataPayment": dataPayment,
                    "token": "",
                    "order_code": dataBooking[0].order_code,
                    "id_order": id_order,
                    "va_or_code_or_link": va_or_code_or_link,
                }
                console.log('paramPayMD', JSON.stringify(paramPayMD));
                snapTokenUpdate(paramPayMD, params);
            })
            .catch(error => { alert('Kegagalan Respon Server tokenMidtransUpdateCore'); });

    }

    function cekStatusMidtrans(id_invoice, button) {
        let config = configApi;
        var url = config.midtransUrl + "v2/" + id_invoice + "/status";
        console.log('urlcekStatusMidtrans', url);


        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic " + config.midtransKey.authBasicHeader);
        //myHeaders.append("Cookie", "__cfduid=d4ff313b0fa4bdbbb74a64dd1f5a4ccb51616649753");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };


        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                var status = result;
                console.log('statusMidtrans', JSON.stringify(result));
                if (button == false) {
                    setStatusMidtrans(status);
                } else if (button == true) {
                    if (status.status_code == '404') {
                        this.dropdown.alertWithType('error', 'Pembayaran #' + id_invoice, 'Pembayaran belum dilakukan');
                    } else {
                        if (status.transaction_status == 'settlement') {
                            this.dropdown.alertWithType('success', 'Pembayaran #' + id_invoice, 'Pembayaran berhasil dilakukan');

                            setTimeout(() => {
                                var paramx = {
                                    id_order: dataBooking[0].id_order,
                                    dataPayment: {},
                                }
                                navigation.navigate("Loading", { redirect: 'Pembayaran', param: paramx });
                            }, 50);



                        } else if (status.transaction_status == 'pending') {
                            this.dropdown.alertWithType('warn', 'Pembayaran #' + id_invoice, 'Menunggu pembayaran');
                        }
                    }
                }
            })
            .catch(error => {
                alert('Kegagalan Respon Server cekStatusMidtrans');
            });
    }


    async function submitChange() {
        //alert('submitChange');
        setLoadingSpinner(true);
        let config = configApi;
        var paramPayMD = {
            "id_invoice": dataBooking[0].order_payment_recent.id_invoice,
            "id_order": dataBooking[0].id_order,
            "id_order_payment": dataBooking[0].order_payment_recent.id_order_payment,
        }
        var requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramPayMD),
        }

        var url = config.baseUrl + 'front/api_new/OrderSubmit/new_invoice';
        console.log('snapTokenNewssss', url, paramPayMD);

        // PostDataNew(url, 'front/api_new/OrderSubmit/new_invoice', requestOptions)
        //     .then((result) => {

        //         loadingSpinner(false);
        //         var id_invoice = result.id_invoice;
        //         var paramx = {
        //             id_order: dataBooking[0].id_order,
        //             dataPayment: {},
        //         }
        //         navigation.navigate("Loading", { redirect: 'Pembayaran', param: paramx });

        //     })
        //     .catch((error) => {
        //         console.log(JSON.stringify(error));
        //         alert('Kegagalan Respon Server submitChange');
        //     });

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultchange', result);
                setLoadingSpinner(false);
                var id_invoice = result.id_invoice;
                var paramx = {
                    id_order: dataBooking[0].id_order,
                    dataPayment: {},
                }
                navigation.navigate("Loading", { redirect: 'Pembayaran', param: paramx });

            })
            .catch(error => {
                console.log('error', error);
                alert('Kegagalan Respon Server submitChanges');
            });


    }


    function gotoFormPayment() {
        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var dataPayment = {
            payment_type: order_payment_recent.payment_type,
            payment_type_label: order_payment_recent.payment_type_label,
            payment_sub: order_payment_recent.payment_sub,
            payment_sub_label: order_payment_recent.payment_sub_label,
        };

        var paramx = {
            id_order: item.id_order,
            dataPayment: dataPayment, back: ''
        }

        console.log('order_payment_recent', JSON.stringify(order_payment_recent));

        if (order_payment_recent.payment_form == "screenOther") {
            navigation.navigate("PembayaranDetail", {
                param: paramx,
            });
        } else {
            var link = order_payment_recent.payment_va_or_code_or_link;
            Linking.openURL(link);
        }

    }


    function content_bank() {
        let config = configApi;
        var item = dataBooking[0];
        var order_payment_recent = item.order_payment_recent;
        var order_expired = item.order_expired;
        var expiredTime = duration(order_expired);
        var status_name = '';
        var img = '';
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var content_bank = [];

        var content = <View></View>
        var content_modal = <Modal
            isVisible={modalVisible}
            onBackdropPress={() => {
                setModalVisible(false);
            }}
            onSwipeComplete={() => {
                setModalVisible(false);
            }}
            swipeDirection={["down"]}
            style={styles.bottomModal}
        >
            <View style={[styles.contentFilterBottom, { paddingBottom: 50 }]}>

                <View style={styles.contentSwipeDown}>
                    <View style={styles.lineSwipeDown} />
                </View>
                {option.map((item, index) => (
                    <TouchableOpacity
                        style={styles.contentActionModalBottom}
                        key={item.value}
                        onPress={() => {
                            gotoPaymentDetailSub(item);
                        }}
                    >

                        <View style={{ flexDirection: 'row' }}>
                            {/* <FastImage
                                style={{
                                    width: 20,
                                    height: 20,
                                    justifyContent: "center",
                                    alignSelf: "center"
                                }}
                                source={{
                                    uri: 'https://cdn.masterdiskon.com/masterdiskon/icon/payment/transfer/f6f57e9126c57179cf729cc9586e47c0_e26ce4cce944fe379072ae509fe72ec1_compressed.png',
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                                cacheControl={FastImage.cacheControl.cacheOnly}
                                resizeMethod={'scale'}

                            >
                            </FastImage> */}
                            <Text style={{}} caption2 bold>{item.payment_sub_label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </Modal>



        payment.map((item, index) => (



            content_bank.push(
                <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                        //console.log('itemoption',item.option);
                        if (loadingPaymantMethod == false) {
                            if (item.option == true) {
                                modalShow(true, item);
                            } else {
                                gotoPaymentDetail(item);
                            }
                        }


                    }}
                >

                    {loadingPaymantMethod == true ? <PlaceholderLine width={100} /> :
                        <View style={{ flexDirection: 'row' }}>
                            {/* <FastImage
                                style={{
                                    width: 20,
                                    height: 20,
                                    justifyContent: "center",
                                    alignSelf: "center"
                                }}
                                source={{
                                    uri: 'https://cdn.masterdiskon.com/masterdiskon/icon/payment/transfer/f6f57e9126c57179cf729cc9586e47c0_e26ce4cce944fe379072ae509fe72ec1_compressed.png',
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                                cacheControl={FastImage.cacheControl.cacheOnly}
                                resizeMethod={'scale'}

                            >
                            </FastImage> */}
                            <Text style={{}} caption2 bold>{item.payment_type_label}</Text>
                        </View>


                    }
                    {
                        loadingPaymantMethod == true ?
                            <View />
                            :
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >

                                <Text style={{ marginLeft: 10 }} caption2 bold>Rp {priceSplitter(item.subPayment[0].fee)}</Text>
                                <Icon
                                    name="chevron-forward-outline"
                                    color={BaseColor.primaryColor}
                                    style={{ marginLeft: 5 }}
                                />

                            </View>
                    }



                </TouchableOpacity>
            )


        ))



        if (order_payment_recent != null) {
            var expiredTime = duration(order_payment_recent.expired);
            if (item.aero_status == 'BLOCKINGINPROGRESS') {
                status_name = 'Menunggu Konfirmasi';
                content = <View>
                    <DataImage img={Images.waiting} text={status_name} />
                    <Button
                        full
                        style={{
                            borderRadius: 0,
                            backgroundColor: BaseColor.primaryColor,
                            marginTop: 10
                        }}
                        loading={loadingButton}
                        onPress={() => {
                            var redirect = 'Pembayaran';
                            var paramx = {
                                id_order: id_order,
                                dataPayment: {},
                            }
                            navigation.navigate("Loading", { redirect: redirect, param: paramx });
                        }}
                    >
                        <Text whiteColor>Refresh / Cek Order</Text>

                    </Button>
                </View>
            } else {
                if (loadingSpinner == false) {
                    if (order_payment_recent.payment_type == "" || order_payment_recent.payment_type == "user") {
                        var title = <Text>Metode Pembayaran</Text>
                    } else {
                        var title = <Text>Metode Pembayaran Terpilih</Text>
                    }

                }




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
                        if (order_payment_recent.payment_type == "" || order_payment_recent.payment_type == "user") {
                            if (item.order_status.order_status_slug == 'process' || item.order_status.order_status_slug == 'new') {
                                status_name = item.order_status.order_status_name;
                                content = content_bank;
                            } else {
                                status_name = item.order_status.order_status_name;
                                content = <DataImage img={Images.timeout} text={status_name} />
                            }
                        } else {

                            var content_lanjut_bayar = <View />
                            if (order_payment_recent.payment_type == "Indodana") {
                                if (statusIndodana == true) {
                                    if (loadingIndodana == false) {
                                        //content_lanjut_bayar = <View />
                                        content_lanjut_bayar = <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                            <Button
                                                full
                                                style={{
                                                    borderRadius: 0,
                                                    backgroundColor: BaseColor.primaryColor,
                                                    marginTop: 10
                                                }}
                                                loading={loadingButton}
                                                onPress={() => {
                                                    var redirect = 'Pembayaran';
                                                    var paramx = {
                                                        id_order: id_order,
                                                        dataPayment: {},
                                                    }
                                                    navigation.navigate("Loading", { redirect: redirect, param: paramx });
                                                }}
                                            >
                                                <Text whiteColor>Refresh / Cek Order</Text>

                                            </Button>
                                        </View>
                                    } else {
                                        content_lanjut_bayar = <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                            <Text>Menunggu Perubahan Status</Text>
                                        </View>
                                    }

                                } else {
                                    if (loadingIndodana == false) {
                                        content_lanjut_bayar = <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                            <Button
                                                style={{ borderRadius: 0, marginVertical: 0, height: 30, backgroundColor: BaseColor.fourthColor }}
                                                full
                                                //loading={loading}
                                                onPress={() => {

                                                    gotoFormPayment();

                                                }}
                                            >
                                                Lanjut Bayar
                                </Button>
                                        </View>
                                    }
                                }
                            } else {
                                content_lanjut_bayar = <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                    <Button
                                        style={{ borderRadius: 0, marginVertical: 0, height: 30, backgroundColor: BaseColor.fourthColor }}
                                        full
                                        //loading={loading}
                                        onPress={() => {

                                            gotoFormPayment();

                                        }}
                                    >
                                        Lanjut Bayar
                                </Button>
                                </View>

                            }



                            content = <View style={{ flexDirection: 'column' }}>
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{ flexDirection: "row", marginTop: 10 }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text caption1 bold>Pembayaran via</Text>
                                        </View>
                                        <View
                                            style={{ flex: 1, alignItems: "flex-end" }}
                                        >
                                            <Text caption2 bold primaryColor>
                                                {order_payment_recent.payment_sub_label}
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        order_payment_recent.payment_form == "screenSelf" ?
                                            <View>
                                                <View
                                                    style={{ flexDirection: "row", marginTop: 10 }}
                                                >
                                                    <View style={{ flex: 1 }}>
                                                        <Text caption1 bold>Virtual Account</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                                                        <View
                                                            style={{ flexDirection: 'row' }}
                                                        >
                                                            <Text caption2 bold primaryColor>
                                                                {order_payment_recent.payment_va_or_code_or_link}
                                                            </Text>

                                                            <TouchableOpacity onPress={() => {

                                                                Clipboard.setString(order_payment_recent.payment_va_or_code_or_link);
                                                                this.dropdown.alertWithType('success', 'Copy Text Invoice', order_payment_recent.payment_va_or_code_or_link);

                                                            }}>
                                                                <Icon
                                                                    name="copy"
                                                                    size={14}
                                                                    style={{ marginLeft: 10 }}

                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                {

                                                    order_payment_recent.payment_sub_label == 'Mandiri' ?
                                                        <View
                                                            style={{ flexDirection: "row", marginTop: 10 }}
                                                        >
                                                            <View style={{ flex: 1 }}>
                                                                <Text caption1 bold>Penyedia Jasa</Text>
                                                            </View>
                                                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                                                <View
                                                                    style={{ flexDirection: 'row' }}
                                                                >
                                                                    <Text caption2 bold primaryColor>
                                                                        Midtrans (70012)
                                                                    </Text>


                                                                </View>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View />
                                                }
                                            </View>
                                            : <View />
                                    }

                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    {
                                        order_payment_recent.payment_form != "screenSelf" ?
                                            content_lanjut_bayar
                                            :
                                            <View />

                                    }
                                    {
                                        order_payment_recent.payment_type != "Indodana" ?
                                            <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-start", width: '60%', flexDirection: 'row' }}>
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                                    <Button
                                                        style={{ borderRadius: 0, marginVertical: 0, height: 30 }}
                                                        full
                                                        //loading={loading}
                                                        onPress={() => {
                                                            Alert.alert(
                                                                'Confirm',
                                                                'Ingin mengganti metode pembayaran ?',
                                                                [
                                                                    { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                                                    { text: 'YES', onPress: () => submitChange() },
                                                                ]
                                                            );

                                                        }}
                                                    >
                                                        Ganti
                                                    </Button>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", width: '30%' }}>
                                                    <Button
                                                        style={{ borderRadius: 0, marginVertical: 0, height: 30, backgroundColor: BaseColor.primaryColor }}
                                                        full
                                                        //loading={loading}
                                                        onPress={() => {
                                                            cekStatusMidtrans(dataBooking[0].order_payment_recent.id_invoice, true);

                                                        }}
                                                    >

                                                        <Text style={{ color: BaseColor.whiteColor }}>Cek Bayar</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            :
                                            <></>
                                    }
                                </View>
                            </View>

                        }

                    } else {
                        if (item.order_status.order_status_slug == 'new') {
                            if (order_payment_recent.expired == "") {
                                status_name = 'Menunggu Konfirmasi';
                                content = <DataImage img={Images.waiting} text={status_name} />
                            } else {
                                status_name = 'Expireds';
                                content = <DataImage img={Images.timeout} text={status_name} />
                            }
                        } else if (item.order_status.order_status_slug == 'process') {
                            status_name = 'Menunggu Payment';
                            content = <View />
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



            <View style={[loadingSpinner == false ? styles.blockView : '', { marginTop: 10 }]}>
                {title}
                {content}
                {content_modal}
            </View>


        )
    }

    function checkHL(id_order, idInvoice) {
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/order/check_code_hl/" + id_order;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        var type = '';
        if (dataBooking[0].product == 'Trip') {
            type = 'trip';
        } else if (dataBooking[0].product == 'Flight') {
            type = 'flight';
        } else if (dataBooking[0].product == 'Hotel') {
            type = 'hotelLinx';
        } else if (dataBooking[0].product == 'Hotelpackage') {
            type = 'hotelpackage';
        } else if (dataBooking[0].product == 'Activities') {
            type = 'activities';
        }
        var paramx = {
            type: type
        }

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=2p49a9qkonj20udtaeses9s3sp3fdb2f");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log('checkHL', url);
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('checkHL', JSON.stringify(result));
                if (result.status == "empty") {
                    //this.getCodeHL(idInvoice);
                    alert('Terjadi kegagalan input data hotel');

                } else {


                    paramx.codeHL = result.codeHL;
                    navigation.navigate("Evoucher",
                        {
                            dataDetail: dataBooking[0],
                            param: paramx,
                            config: config
                        });

                }
            })
            .catch(error => { alert('Kegagalan Respon Server checkHL') });
    }

    function getCodeHL(idInvoice) {
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "front/product/hotel/byPassCodeHl/" + idInvoice;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var type = '';
        if (dataBooking[0].product == 'Trip') {
            type = 'trip';
        } else if (dataBooking[0].product == 'Flight') {
            type = 'flight';
        } else if (dataBooking[0].product == 'Hotel') {
            type = 'hotelLinx';
        } else if (dataBooking[0].product == 'Hotelpackage') {
            type = 'hotelpackage';
        } else if (dataBooking[0].product == 'Activities') {
            type = 'activities';
        }
        var paramx = {
            type: type
        }

        console.log('idInvoice', idInvoice);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=3vkrld7j5d2unodr92hperkdrepd4v6j");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('getCodeHL', JSON.stringify(result));
                navigation.navigate("Evoucher",
                    {
                        dataDetail: dataBooking[0],
                        param: paramx,
                        config: config,
                        ReferenceNo: result.ReferenceNo

                    });


            })
            .catch(error => { alert('Kegagalan Respon Server') });

    }

    function showFormCancel() {
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "api/hotel/Hotelinx/getCheckHotelCancellationCharges/app";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var id_order = id_order;
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=f16dtrsomtfqmusdvjgqs79f4u07f8u5");

        var formdata = new FormData();
        formdata.append("param", id_order);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('keyCancel', JSON.stringify(result));
                if (result.success == true) {
                    setModalVisibleCancel(true);
                } else {
                    alert('Kegagalan Respon Server');
                }

            })
            .catch(error => {
                alert('Kegagalan Respon Server');
            });



    }

    function processCancel() {
        const { navigation } = this.props;
        var id_order = id_order;
        var reason = reason;

        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "api/hotel/Hotelinx/getCancelBooking/app";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        console.log('id_order', id_order);
        console.log('reason', reason);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=f16dtrsomtfqmusdvjgqs79f4u07f8u5");

        var formdata = new FormData();
        formdata.append("id_booking", id_order);
        formdata.append("reason", reason);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('processCancel', JSON.stringify(result));
                if (result.status == 1) {
                    setModalVisibleCancel(false);
                    this.dropdown.alertWithType('success', 'Info Pembatalan', 'Pembatalan berhasil dilakukan');
                    setTimeout(() => {
                        navigation.navigate('Booking');
                    }, 50);


                } else {
                    alert('Kegagalan Respon Server');
                }
                // {"status":1,"msg":"Order berhasil di cancel"}

            })
            .catch(error => {
                alert('Kegagalan Respon Server');
            });
    }

    function content_eticket() {

        var item = dataBooking[0];
        var dataDeparture = dataDeparture;
        var dataReturns = dataReturns;
        var order_id_aero = order_id_aero;

        var type = '';
        if (dataBooking[0].product == 'Trip') {
            type = 'trip';
        } else if (dataBooking[0].product == 'Flight') {
            type = 'flight';
        } else if (dataBooking[0].product == 'Hotel') {
            type = 'hotelLinx';
        } else if (dataBooking[0].product == 'Hotelpackage') {
            type = 'hotelpackage';
        } else if (dataBooking[0].product == 'Activities') {
            type = 'activities';
        }
        var paramx = {
            type: type
        }


        if (item.product == 'Flight') {
            if (dataReturns != null) {
                var content_returns = <CardCustomProfile
                    title={'E-Ticket Returns'}
                    subtitle={'Check tiket kepulangan Anda'}
                    icon={'bookmark-outline'}
                    onPress={() => {
                        console.log('dataFlight', JSON.stringify(dataReturns));
                        navigation.navigate("Eticket",
                            {
                                // order_id_aero: order_id_aero,
                                // dataFlight: dataReturns,
                                // type: 'Return',

                                // dataDetail: dataBooking[0],
                                // param: paramx,
                                // config: config,
                                bookingDoc: bookingDoc

                            });
                    }}

                />
            }
        }

        var content = <View></View>
        if (item.product == 'Flight') {
            if (item.order_status.order_status_slug == 'complete') {
                var order_detail = item.detail[0].order_detail[0];

                if (loadingEvoucher == true) {
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
                    >

                        <CardCustomProfile
                            title={'E-Ticket Departures'}
                            subtitle={'Check tiket keberangkatan Anda'}
                            icon={'bookmark-outline'}
                            onPress={() => {
                                navigation.navigate("Eticket",
                                    {
                                        bookingDoc: bookingDoc
                                    });
                            }}

                        />

                        {/* {content_returns} */}
                    </View>
                }
            }
        } else if (item.product == 'Hotelpackage' || item.product == 'Trip' || item.product == 'Activities' || item.product == 'Hotel' || item.product == 'Product') {
            if (item.order_status.order_status_slug == 'complete') {

                content = <View
                >

                    <CardCustomProfile
                        title={'Voucher Code'}
                        subtitle={'Check Evoucher pesanan Anda'}
                        icon={'bookmark-outline'}
                        onPress={() => {
                            navigation.navigate("Eticket",
                                {
                                    bookingDoc: bookingDoc
                                });
                        }}

                    />

                    {/* {content_returns} */}
                </View>


                // if (item.product == "Hotel") {
                //     var order_detail = item.detail[0].order;
                //     content = <View
                //     >
                //         <CardCustomProfile
                //             title={'Voucher Code'}
                //             subtitle={'Check Evoucher pesanan Anda'}
                //             icon={'bookmark-outline'}
                //             onPress={() => {
                //                 console.log('hotel', JSON.stringify(item));
                //                 this.checkHL(item.id_order, item.order_payment_recent.id_invoice);
                //                 //this.getCodeHL(item.order_payment_recent.id_invoice);
                //                 // navigation.navigate("Evoucher",
                //                 // {
                //                 //     dataDetail:dataBooking[0],
                //                 //     param:param,
                //                 //     config:config
                //                 // });
                //             }}

                //         />


                //         <View>
                //             {
                //                 enableCancel == true ?
                //                     <Button
                //                         full
                //                         style={{ borderRadius: 0, backgroundColor: BaseColor.thirdColor }}
                //                         loading={loadingButton}
                //                         onPress={() => {
                //                             this.showFormCancel();
                //                         }}
                //                     >
                //                         <Text whiteColor>Batalkan Pesanan</Text>

                //                     </Button>
                //                     :
                //                     <View />
                //             }

                //         </View>



                //     </View>
                // } else {
                //     var order_detail = item.detail[0].order;
                //     content = <View
                //     >
                //         <CardCustomProfile
                //             title={'Voucher Code'}
                //             subtitle={'Check Evoucher pesanan Anda'}
                //             icon={'bookmark-outline'}
                //             onPress={() => {
                //                 navigation.navigate("Evoucher",
                //                     {
                //                         dataDetail: dataBooking[0],
                //                         param: param,
                //                         config: config
                //                     });
                //             }}

                //         />



                //     </View>
                // }

            } else if (item.order_status.order_status_slug == 'paid') {
                var order_detail = item.detail[0].order;
                content = <View
                >
                    <CardCustomProfile
                        title={item.order_status.order_status_desc}
                        subtitle={'Kami akan memproses pembayaran Anda'}
                        icon={'info-circle'}
                        nav={false}
                        onPress={() => {
                            navigation.navigate("Evoucher",
                                {
                                    dataDetail: dataBooking[0],
                                    param: param,
                                    config: config
                                });
                        }}

                    />



                </View>

            } else if (item.order_status.order_status_slug == 'booked') {
                var order_detail = item.detail[0].order;
                content = <View
                >
                    <CardCustomProfile
                        title={item.order_status.order_status_name}
                        subtitle={item.order_status.order_status_desc}
                        icon={'info-circle'}
                        nav={false}
                        onPress={() => {
                            navigation.navigate("Evoucher",
                                {
                                    dataDetail: dataBooking[0],
                                    param: param,
                                    config: config
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

    function renderItemFeaturedDestination(item) {
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
                loading={loading_dashboard}
                propOther={{ inFrame: false, horizontal: true, width: wp("40%") }}
            />
        );
    }

    function renderItemRoomPromo(item) {
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
                loading={loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );
    }

    function renderItemBuyNowStayLater(item) {
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
                loading={loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );
    }

    function renderItemEvent(item) {
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
                loading={loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    navigation.navigate("ProductDetail", { product: item, product_type: 'activities' })
                }
                }
                loading={loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );

    }

    function renderItemPaketTrip(item) {
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
                loading={loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
            />
        );

    }

    function convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    function convertDateDM(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return d.getDate() + " " + months[d.getMonth()];
    }

    function getCheckCancel() {
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + 'api/hotel/Hotelinx/getBookingDetail/app';
        console.log('configApi', JSON.stringify(config));
        console.log('urlssgetCheckCancel', url, id_order);

        setLoadingSpinner(true);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=n8pbg26jcb13lnqi40e99gek5sujs8he");

        var formdata = new FormData();
        formdata.append("param", id_order);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultgetCheckCancel', JSON.stringify(result));
                var cancelPrice = result.informasiPembatalan[0].CancellationPrice;
                if (cancelPrice != 0) {
                    var enableCancel = false;

                } else {
                    var enableCancel = true;
                    setLoadingSpinner(false);
                    setEnableCancel(true);

                }
                console.log('getCheckCancel', JSON.stringify(result));
                console.log('enableCancel', JSON.stringify(enableCancel));
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                //alert('Kegagalan Respon Server getCheckCancel');
            });

    }

    function getCodeHotelLinx(id) {

        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + 'front/product/hotel/getCodeHL';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


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

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultCodeHotelLinx', JSON.stringify(result));

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server getCodeHotelLinx');
            });

    }

    function getData() {

        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/order/get_booking_history";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var data = { "id": userSession.id_user, "id_order": id_order, "id_order_status": "", "product": "" }
        var parameter = { "param": data }

        var body = parameter;
        console.log("paramgetbook", JSON.stringify(body));
        setLoadingSpinner(true);
        var requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }


        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log('resultPembayaran', JSON.stringify(result));
                var dataBooking = result;
                setDataBooking(dataBooking);
                var order_status = dataBooking[0].order_status.order_status_slug;
                var product = dataBooking[0].product;
                changeStatusIndodana(dataBooking[0].id_order);
                setLoadingSpinner(false);

                getPaymentMethod(dataBooking[0]['total_price']);
                if (order_status == 'complete') {
                    var order_code = dataBooking[0].aero_orderid;
                    bookingDocF(product.toLowerCase(), id_order);
                }
                setLoadingEvoucher(false);

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server fetch');
            });

    }

    function bookingDocF(product, id_order) {
        let dataBooking = dataBooking;
        console.log('dataBooking', JSON.stringify(dataBooking));
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + 'booking/detail';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var raw = JSON.stringify({
            "product": product,
            "key": id_order
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('createPdf', JSON.stringify(result));
                setBookingDoc(result.data.doc);

            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if (login == true) {
            const isFocused = navigation.isFocused();
            if (isFocused) {
                setLoadingIndodana(true);
                getData();

            }

            const navFocusListener = navigation.addListener('didFocus', () => {
                setLoadingIndodana(true);
                getData();

            });

            return () => {
                navFocusListener.remove();
            };
        }


        return () => {

        }
    }, []);

    function changeStatusIndodana(idOrder) {

        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/user/purchase/checkStatusIndodanaApps";
        var myHeaders = new Headers();
        var id_user = userSession.id_user;
        myHeaders.append("Authorization", "Bearer UEFSVE5FUk1BU1RFUkRJU0tPTjEyMzEyMzEyMzEyMw==");
        myHeaders.append("Cookie", "ci_session=jtdunpubhtr60kv9h4tt4lrq7k8rjbgb");

        var formdata = new FormData();
        formdata.append("id_order", idOrder);
        formdata.append("id_user", id_user);
        formdata.append("token", config.apiToken);
        console.log('formdatachangeStatusIndodana', JSON.stringify(formdata));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code == "201") {
                    setStatusIndodana(true);
                } else {
                    setStatusIndodana(false);
                }
                setLoadingIndodana(false);

                //console.log('resultchangeStatusIndodana', JSON.stringify(result));

            })
            .catch(error => {
                //navigation.goBack();
                alert('Kegagalan Respon Server indodana');
            });
    }


    var type = '';
    if (dataBooking[0].product == 'Trip') {
        type = 'trip';
    } else if (dataBooking[0].product == 'Flight') {
        type = 'flight';
    } else if (dataBooking[0].product == 'Hotel') {
        type = 'hotelLinx';
    } else if (dataBooking[0].product == 'Hotelpackage') {
        type = 'hotelpackage';
    } else if (dataBooking[0].product == 'Activities') {
        type = 'activities';
    }
    var paramx = {
        type: type
    }



    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
            forceInset={{ top: "always" }}
        >
            <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

            <Header
                title="Pembayaran"
                subTitle={'No.Order :' + dataBooking[0].order_code}
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
                            color={BaseColor.whiteColor}
                        />

                    );
                }}

                renderRightSecond={() => {
                    return (
                        <Icon
                            name="home"
                            size={20}
                            color={BaseColor.whiteColor}
                        />

                    );
                }}

                onPressLeft={() => {
                    navigation.navigate('Booking');
                }}

                onPressRight={() => {
                    var redirect = 'Pembayaran';
                    var paramx = {
                        id_order: id_order,
                        dataPayment: {},
                    }
                    navigation.navigate("Loading", { redirect: redirect, param: paramx });
                }}

                onPressRightSecond={() => {
                    var redirect = 'Home';
                    var paramx = {};
                    navigation.navigate("Loading", { redirect: redirect, param: paramx });
                }}
            />
            <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
                {
                    loadingSpinner ?

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
                            <View style={{ marginHorizontal: 20 }}>
                                {content_payment()}
                                {content_eticket()}
                                {/* {this.content_booking_code()} */}

                                {
                                    loadingSpinner == false ?

                                        <PreviewBooking
                                            dataDetail={dataBooking[0]}
                                            param={param}
                                            config={config}
                                            dataBookingAero={dataBookingAero}
                                        />
                                        :
                                        <View />
                                }


                                {content_bank()}

                            </View>

                        </ScrollView>
                }
            </View>
            <View>
                <Modal
                    isVisible={modalVisibleCancel}
                    onBackdropPress={() => {
                        this.setState({ modalVisibleCancel: false });
                    }}
                    onSwipeComplete={() => {
                        this.setState({ modalVisibleCancel: false });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={[styles.contentFilterBottom, { paddingBottom: 20 }]}>

                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        <TextInput
                            style={[BaseStyle.textInput, { height: 100 }]}
                            onChangeText={text => {
                                this.setState({ reason: text });
                            }}
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Ketikkan Alasan Pembatalan"
                            placeholderTextColor={BaseColor.grayColor}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <View style={{ flexDirection: "row", paddingTop: 5 }}>

                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-start" }}>
                                <Button
                                    style={{ borderRadius: 0, marginVertical: 0 }}
                                    full
                                    //loading={loading}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirm',
                                            'Yakin ingin dibatalkan ?',
                                            [
                                                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                                { text: 'YES', onPress: () => { this.processCancel() } },
                                            ]
                                        );

                                    }}
                                >
                                    Lanjut Batalkan
                                </Button>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-start" }}>
                                <Button
                                    style={{ borderRadius: 0, marginVertical: 0, backgroundColor: BaseColor.primaryColor }}
                                    full
                                    //loading={loading}
                                    onPress={() => {


                                    }}
                                >

                                    <Text style={{ color: BaseColor.whiteColor }}>Tutup</Text>
                                </Button>
                            </View>
                        </View>



                    </View>
                </Modal>
            </View>
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={1000} />

        </SafeAreaView>
    )
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
    },
    blockView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: BaseColor.whiteColor,

        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // padding:20,
        marginBottom: 10,
        borderRadius: 10,
    }
});
