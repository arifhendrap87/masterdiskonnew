import React, { Component, useEffect, useState } from "react";
import { View, ScrollView, Animated, Dimensions, TouchableOpacity, StyleSheet, AsyncStorage, Alert, Clipboard, ActivityIndicator, Linking } from "react-native";
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
import { DataPayment, DataBooking, DataConfig } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { PostData } from '../../services/PostData';
import AnimatedLoader from "react-native-animated-loader";
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { PostDataNew } from '../../services/PostDataNew';
import DropdownAlert from 'react-native-dropdownalert';


// import {fcmService} from '../../src/FCMService';
// import {localNotificationService} from '../../src/LocalNotificationService';
import { DataMasterDiskon } from "@data";
// import Clipboard from "@react-native-community/clipboard";
import { Form, TextValidator } from 'react-native-validator-form';
import { Base64 } from 'js-base64';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';


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
    contentProfile: {
        // marginTop: 15,
        flexDirection: "row",
        // backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,
        width: '100%',
    },
});


export default function PembayaranDetail(props) {

    var param = props.navigation.state.params.param;
    // var id_order=param.id_order;
    // var dataPayment=param.dataPayment;

    const { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);

    const [params, setParam] = useState(param);
    console.log('parampaymentDetail', JSON.stringify(param));
    const [dataPayment, setDataPayment] = useState(param.dataPayment);
    const [idOrder, setIdOrder] = useState(param.id_order);
    const [count, setCount] = useState(0);
    //const [tokenFirebase, setTokenFirebase]= useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [dataBooking, setDataBooking] = useState(DataBooking);
    const [statusMidtrans, setStatusMidtrans] = useState({ "va_numbers": [{ "bank": "bca", "va_number": "81174157163" }], "payment_amounts": [], "transaction_time": "2020-07-06 16:33:07", "gross_amount": "740800.00", "currency": "IDR", "order_id": "MD2007060026", "payment_type": "bank_transfer", "signature_key": "7eb271c8362f64dd96c7519a7067ccb5d8f563ee45e7c64e4606773332aad32841e522fcdfb30dae96c183d57a044db425f07a3772a3e4d848ccbb1d65765884", "status_code": "201", "transaction_id": "1df337f3-5dc2-4cc7-a445-ae8c46eabefa", "transaction_status": "pending", "fraud_status": "accept", "status_message": "Success, transaction is found", "merchant_id": "G042781174" });
    const [fee, setFee] = useState(0);
    const [totalPembayaran, setTotalPembayaran] = useState(0);

    const [cardNumber, setCardNumber] = useState('4811 1111 1111 1114');
    const [cardExpMonth, setCardExpMonth] = useState('01');
    const [cardExpYear, setCardExpYear] = useState('2025');
    const [cardCVV, setCardCVV] = useState('123');
    const [cardToken, setCardToken] = useState(0);


    const [colorButton, setColorButton] = useState(BaseColor.greyColor);
    const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
    const [disabledButton, setDisabledButton] = useState(true);
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalTitleSub, setModalTitleSub] = useState('');
    const [modalStatus, setModalStatus] = useState('none');
    const [statusPembayaran, setStatusPembayaran] = useState('');






    _onMessage = event => {
        //const { navigation } = this.state;
        console.log('_onMessage', JSON.parse(event.nativeEvent.data));
        const res = JSON.parse(event.nativeEvent.data);
        if (res.message === 'ok') {
            //alert('button clicked');
            //navigation.goBack();
        }
    };

    function onNavigationStateChange(navState) {

        var event = navState.url.split('#')[1]
        var data = navState.title

        console.log('responwebview', navState);

        var pathname = navState.url;
        const paths = pathname.split("/").filter(entry => entry !== "");
        const lastPath = paths[paths.length - 1];
        const lastPathString = lastPath.split("?")[0];

        console.log('lastPath', lastPathString);
        //if (lastPathString == 'home') {
        var paramx = {
            id_order: param.idOrder,
            dataPayment: {},
        };


        if (lastPathString == 'transaction-status' || lastPathString == 'home') {

            changeStatusIndodana();
            setTimeout(() => {
                //navigation.goBack();
                navigation.navigate("Loading", {
                    redirect: "Pembayaran",
                    param: paramx,
                });
            }, 500);
        } else if (lastPathString == 'login') {
            //navigation.goBack();
            navigation.navigate("Loading", {
                redirect: "Pembayaran",
                param: paramx,
            });
        } else if (lastPathString == 'download') {
            //navigation.goBack()
            navigation.navigate("Loading", {
                redirect: "Pembayaran",
                param: paramx,
            });
            // } else if (lastPathString == 'gopay') {
            //     //navigation.goBack()
            //     navigation.navigate("Loading", {
            //         redirect: "Pembayaran",
            //         param: paramx,
            //     });
            // } else if (lastPathString == 'gopay-finish-deeplink') {
            //     //navigation.goBack()
            //     navigation.navigate("Loading", {
            //         redirect: "Pembayaran",
            //         param: paramx,
            //     });

        } else if (lastPathString == 'details') {

            var paramstring = navState.title.split("?");
            navigation.navigate("Loading", {
                redirect: "Pembayaran",
                param: paramx,
            });
            Linking.openURL('gojek://gopay/merchanttransfer?' + paramstring[1]);

        } else if (lastPathString == 'profile') {
            //navigation.goBack()
            navigation.navigate("Loading", {
                redirect: "Pembayaran",
                param: paramx,
            });

        }
    }


    useEffect(() => {
        return () => {

            // Linking.openURL('gojek://gopay/merchanttransfer?tref=0320221010092803lfjjlHwgcuID&amount=1505000&activity=GP:RR&callback_url=');
        }
    }, []);




    var urlSnap = param.link;



    let jsCode = '';
    jsCode += " let btn = document.querySelector('.btn-track');let data_button_name = btn.getAttribute('data-button-name');if(data_button_name=='goToMerchant'){document.querySelector('.btn-track').style.display = 'none'};";
    console.log('urlssssnapp', urlSnap);
    content = <View style={{ flex: 1 }}>
        <WebView
            style={{ height: '70%' }}
            source={{ uri: urlSnap }}
            ref={ref => {
                this.webview = ref;
            }}
            originWhitelist={['*']}
            javaScriptEnabledAndroid={true}
            automaticallyAdjustContentInsets={false}
            onNavigationStateChange={onNavigationStateChange.bind(this)}

            onLoadProgress={({ path }) => {
                console.log("current_pathonLoadProgress", path);
            }}
            injectedJavaScript={jsCode}
            onMessage={this._onMessage}
        />


    </View>




    return (
        loadingSpinner == true ?
            <View style={{
                position: "absolute",
                top: 220,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {/* <LinesLoader /> */}
                <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                <Text>Sedang memuat data</Text>
            </View>
            :

            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <Header
                    title={param.title}
                    subTitle={''}
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
                />



                {content}


                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={1000} />

            </SafeAreaView>
    );
}