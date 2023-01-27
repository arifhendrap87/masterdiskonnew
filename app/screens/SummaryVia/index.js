import React, { Component } from "react";
import { BackHandler, View, ScrollView, Animated, RefreshControl, TouchableOpacity, ActivityIndicator, StyleSheet, Switch, Image, TextInput, ImageBackground } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    Button,
    ProfileDetail,

} from "@components";
import { AsyncStorage, Platform } from 'react-native';
import { PackageData } from "@data";
import DropdownAlert from 'react-native-dropdownalert';
import { UserData } from "@data";
import AnimatedLoader from "react-native-animated-loader";
import NotYetLogin from "../../components/NotYetLogin";
import Modal from "react-native-modal";
// import { TSpan } from "react-native-svg";


const styles = StyleSheet.create({
    contain: {
        padding: 20,
        width: "100%"
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
        marginTop: 15
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },

    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    contentProfile: {
        flexDirection: "row",
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 5,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: BaseColor.fieldColor,
        padding: 5,
    },
    searchIcon: {
        flex: 1,
        padding: 10,
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
        marginBottom: 10
    }
});

export default class SummaryVia extends Component {
    constructor(props) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var paramAll = [];
        if (this.props.navigation.state.params.param) {
            paramAll = this.props.navigation.state.params.param;
        }
        console.log('paramAll', JSON.stringify(paramAll));


        //------------------------parameter untuk flight------------------------//
        var selectDataDeparture = paramAll.selectDataDeparture;
        var selectDataReturn = paramAll.selectDataReturn;
        var departurePost = paramAll.departurePost;
        var returnPost = paramAll.returnPost;
        var extra = paramAll.extra;
        var resultVia = paramAll.resultVia;

        console.log('extra', JSON.stringify(extra));

        console.log('resultVia', JSON.stringify(resultVia));

        // var dataCount = {
        //     required_dob: false,
        //     required_passport: false,
        //     total_price: 0,
        //     nett_price: 0,
        //     insurance_total: 0,
        //     transaction_fee: 0
        // };
        // dataCount = paramAll.dataCount;

        var productBooking = paramAll.productBooking;

        //------------------------parameter inti------------------------//
        var product = paramAll.product;
        var productPart = paramAll.productPart;
        var param = paramAll.param;
        param.typeLabel = "Flight";

        console.log('product', JSON.stringify(product));
        console.log('param', JSON.stringify(param));
        console.log('product', JSON.stringify(product));
        console.log('productPart', JSON.stringify(productPart));

        //------------------------parameter inti------------------------//

        var jumlahPenumpang = param.Qty;
        console.log('jumlahPenumpang', jumlahPenumpang);
        var arrOldGuest = this.convertOld(param);
        var tambahanBagasi = {};
        tambahanBagasi.desc = "Tidak tambah bagasi";
        tambahanBagasi.code = "";
        tambahanBagasi.amount = 0;

        var tambahanMakanan = {};
        tambahanMakanan.desc = "Tidak tambah makanan";
        tambahanMakanan.code = "";
        tambahanMakanan.amount = 0;

        var extraBaggage = [];
        var extraMeal = [];

        var ssr = [];

        if (extra.baggage.length != 0) {
            extraBaggage.push(tambahanBagasi);
            Array.prototype.push.apply(extraBaggage, extra.baggage[0].data);
            console.log('extraBaggage', JSON.stringify(extraBaggage));
            for (a = 1; a <= jumlahPenumpang; a++) {
                var obj = {};
                obj['number'] = a;
                obj['num'] = a.toString() + "-baggage";
                obj['desc'] = tambahanBagasi.desc;
                obj['code'] = tambahanBagasi.code;
                // obj['amount'] = tambahanBagasi.amount;
                obj['key'] = extra.baggage[0].key;
                obj['ssrType'] = "baggage";
                ssr.push(obj);

            }
        }

        if (extra.meal.length != 0) {
            extraMeal.push(tambahanMakanan);
            Array.prototype.push.apply(extraMeal, extra.meal[0].data);
            console.log('extraMeal', JSON.stringify(extraMeal));
            for (a = 1; a <= jumlahPenumpang; a++) {
                var obj = {};
                obj['number'] = a;
                obj['num'] = a.toString() + "-meal";
                obj['desc'] = tambahanMakanan.desc;
                obj['code'] = tambahanMakanan.code;
                // obj['amount'] = tambahanMakanan.amount;
                obj['key'] = extra.meal[0].key;
                obj['ssrType'] = "meal";
                ssr.push(obj);

            }
        }

        console.log('ssrAwal', JSON.stringify(ssr));



        this.state = {

            login: false,
            paramAll: paramAll,
            param: param,
            product: product,
            productPart: productPart,
            productBooking: productBooking,


            typeFlight: '',

            selectDataDeparture: selectDataDeparture,
            selectDataReturn: selectDataReturn,
            resultVia: resultVia,

            departurePost: departurePost,
            returnPost: returnPost,

            jumlahPenumpang: jumlahPenumpang,
            listdata_participant: [],
            listdata_customer: [],


            refreshing: false,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),

            packageItem: PackageData[0],
            packageItemDetail: PackageData[1],
            arr_old: arrOldGuest,
            loading: false,
            total_price: 0,
            userData: UserData[0],

            colorButton: BaseColor.greyColor,
            colorButtonText: BaseColor.whiteColor,
            disabledButton: true,


            reminders: false,
            remindersInsurance: false,

            otherUser: false,
            remindersOtherUser: false,

            pointUser: false,
            usePointUser: false,

            dataCount: {
                subtotal: 910000,
                fee: 0,
                fee2: 0,
                insurance: 0,
                tax: 176000,
                iwjr: 5000,
                addon: 0,
                total: 591000,
                discount: {
                    subtotal: 0,
                    fee: 0,
                    fee2: 0,
                    insurance: 0,
                    tax: 0,
                    iwjr: 0,
                    addon: 0,
                    total: 500000,
                    grandTotal: 500000
                },
                point: 0,
                coupon: [
                    {
                        id: 51,
                        name: "UAT 2021 Claim(50 %)",
                        code: "UAT2021CLAIM",
                        amount: 500000,
                        category: "total",
                        type: "unik",
                        idHistory: 237
                    }
                ]
            },
            insurance_included: false,
            total_all: 0,
            dataCart: {
                id: "1",
                id_trip: "1",
                adult: 1,
                child: 0,
                infant: 0,
                nett_price: 596360,
                discount: 0,
                total_price: 606180,
                insurance_total: 0,
                transaction_fee: 1080,
                time_limit: "2020-06-17T13:37:00",
                contact: {
                    title: "Mr",
                    first_name: "arifinss",
                    last_name: "hendra",
                    country_id: "ID",
                    country_name: "Indonesia",
                    phone_code: "62",
                    phone_number: "6666666",
                    email: "matadesaindotcom@gmail.com"
                }
            },

            loading_spinner: true,
            loading_spinner_file: require("app/assets/hotel.json"),
            loading_spinner_title: 'Connecting with masterdiskon',

            img_featured: Images.placeholderImage,

            config: { "aeroStatus": false, "aeroUrl": "https://staging-api.megaelectra.co.id/", "baseUrl": "https://masterdiskon.co.id/", "banner": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80", "transaction_fee": "5000", "norek": "1290080508050 (Mandiri) an. PT Master Diskon Internasional", "voucher_markup": "20000", "token": "EfVwMeH5HgFokJknYDYHto_DcxundKflSmevqUHTNNU" },
            error_form_customer: false,
            style_form_customer: {
                flexDirection: "row",
                backgroundColor: BaseColor.fieldColor,
                marginBottom: 15,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: BaseColor.fieldColor,
                padding: 5,
            },
            discount: 0,
            discountPointLabel: 0,
            discountPoint: 0,
            discountPointSisa: 0,
            discountCoupon: 0,
            insurance: 0,
            id_coupon: "",
            id_coupon_history: "",
            img: Images.doodle,
            userSession: { "address": null, "avatar": null, "birthday": "0000-00-00", "cart": "", "city_name": null, "email": "arifhendrap87@gmail.com", "firstname": "arif", "fullname": "Mr arif hendra87", "gender": "Mr", "id_city": null, "id_user": "2022", "lastname": "hendra87", "loginVia": "form", "nationality": null, "nationality_id": null, "nationality_phone_code": null, "passport_country": "", "passport_country_id": null, "passport_expire": "", "passport_number": "", "phone": "45678", "point": "10", "postal_code": null, "referral_code": "arifhendrap87", "status": "customer", "title": "Mr", "un_nationality": null, "username": "arifhendrap87" },
            couponCode: "Pilih kupon",
            couponCodeList: [],
            couponCodeListId: [],
            loadingCheckCoupon: false,
            loadingPoint: true,
            biayaPenanganan: false,
            biayaPenangananValue: 10000,


            modalTambahanBagasi: false,
            modalTambahanMakanan: false,

            tambahanBagasi: tambahanBagasi,
            tambahanMakanan: tambahanMakanan,
            ssr: ssr,
            ssrOri: ssr,

            extra: extra,
            extraBaggage: extraBaggage,
            extraMeal: extraMeal,

            dataCount: {},
            activeExtra: 0,
        };

        this.updateParticipant = this.updateParticipant.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.useCoupon = this.useCoupon.bind(this);
        this.useCouponForm = this.useCouponForm.bind(this);
        this.setCoupon = this.setCoupon.bind(this);


        this.getConfigApi();
        this.getConfig();
        this.getSession();
        this.getTokenFireBase();
        this.getPassword();



    }

    getPassword() {
        AsyncStorage.getItem('password', (error, result) => {
            if (result) {
                let password = JSON.parse(result);
                console.log('getPassword', JSON.stringify(password));
                this.setState({ password: password });
            }
        });
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
                console.log('userSession', JSON.stringify(userSession));
                if (userSession.hasOwnProperty('password') == true) {
                    var id_user = userSession.id_user;
                    this.setState({ id_user: id_user });
                    this.setState({ userSession: userSession });
                    setTimeout(() => {
                        this.getProfile();
                    }, 20);

                    this.setState({ login: true });
                }
            }
        });
    }

    count() {

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
        paramCount.point = this.state.usePointUser;
        paramCount.insurance = this.state.remindersInsurance;
        paramCount.coupon = this.state.couponCodeListId;
        paramCount.paymentMethod = 0;
        paramCount.platform = "app";
        paramCount.ssr = this.extraFilter(this.state.ssr);
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
                console.log('count', JSON.stringify(result));

                if (result.success == false) {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                    this.setState({ loading_spinner: false });

                } else {

                    console.log('resultCountss', JSON.stringify(result));
                    this.setState({ loading_spinner: false });
                    //var dataCount=result.data;

                    var dataCount = {
                        required_dob: false,
                        required_passport: false,
                        total_price: result.data.total,
                        subtotal_price: result.data.subtotal,
                        nett_price: result.data.subtotal,
                        iwjr: result.data.iwjr,
                        insurance_total: result.data.insurance,
                        transaction_fee: result.data.fee,
                        transaction_fee2: result.data.fee2,
                        tax_fee: result.data.tax,
                        point_user: result.data.point,
                        addon: result.data.addon
                    }
                    this.setState({ dataCount: result.data });
                    console.log('countResult', JSON.stringify(result));
                }

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
            });



    }

    getTokenFireBase() {
        AsyncStorage.getItem('tokenFirebase', (error, result) => {
            if (result) {
                this.setState({
                    tokenFirebase: result
                });
            }
        });
    }

    getProfile() {
        let userSession = this.state.userSession;
        let password = this.state.password;
        this.setState({ loadingPoint: true }, () => {
            let config = this.state.configApi;
            let baseUrl = config.baseUrl;
            let url = baseUrl + "front/api_new/user/profile";
            console.log('configApigetProfile', JSON.stringify(config));
            console.log('urlss', url);



            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "ci_session=2m7aungmqk0gqvsacjk2gb3giuos2ill");

            var raw = JSON.stringify({ "param": { "id_user": userSession.id_user } });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            console.log('getProfile1', JSON.stringify({ "param": { "id_user": userSession.id_user } }));
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {

                    this.setState({ loadingPoint: false });
                    console.log('getProfile2', result.user);
                    userSession.password = password;
                    userSession.point = result.user.point;
                    this.setState({ discountPointLabel: result.user.point });
                    this.setState({ discountPointSisa: result.user.point });
                    //this.setState({discountPoint:result.user.point});
                    this.setState({ userSession: userSession });
                    AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    //return result.user;

                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });

        });
    }

    convertDuration(date1, date2) {

        // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
        date1 = date1.split('-');
        date2 = date2.split('-');

        // Now we convert the array to a Date object, which has several helpful methods
        date1 = new Date(date1[0], date1[1], date1[2]);
        date2 = new Date(date2[0], date2[1], date2[2]);

        // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
        date1_unixtime = parseInt(date1.getTime() / 1000);
        date2_unixtime = parseInt(date2.getTime() / 1000);

        // This is the calculated difference in seconds
        var timeDifference = date2_unixtime - date1_unixtime;

        // in Hours
        var timeDifferenceInHours = timeDifference / 60 / 60;

        // and finaly, in days :)
        var timeDifferenceInDays = timeDifferenceInHours / 24;
        var duration = timeDifferenceInDays;
        return duration;
    }

    convertDateDDMY(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    convertOld(param) {

        var x = 1;
        var y = param.Adults;

        var obj_adult = [];
        for (a = x; a <= y; a++) {
            obj_adult[a] = 'ADT';
        }

        var obj_children = [];
        var x = parseInt(param.Adults) + 1;
        var y = (parseInt(param.Adults) + parseInt(param.Children));
        for (a = x; a <= y; a++) {
            obj_children[a] = 'CHD';
        }


        var obj_infant = [];
        var x = (parseInt(param.Adults) + parseInt(param.Children)) + 1;
        var y = parseInt(x) + parseInt(param.Infants);
        for (a = x; a < y; a++) {
            obj_infant[a] = 'INF';
        }

        var obj_Old = obj_adult.concat(obj_children, obj_infant);

        var a = 1;
        var arrOldGuest = [];
        obj_Old.map(item => {
            arrOldGuest[a] = item;
            a++;
        });

        return arrOldGuest;


    }

    // totalPrice() {
    //     let { param, product, productPart, discount, insurance, id_coupon, id_coupon_history, config } = this.state;
    //     console.log('paramintotalPrice', JSON.stringify(param));
    //     var total_price = 0;

    //     param.tax = 0;
    //     param.subtotal = param.totalPrice;
    //     param.discount = discount;
    //     param.insurance = insurance;
    //     param.id_coupon = id_coupon;
    //     param.id_coupon_history = id_coupon_history;
    //     param.tokenMDI = config.apiToken;

    //     if (this.state.discount >= param.totalPrice) {
    //         param.total = 0;

    //     } else {
    //         //param.total=parseInt(param.subtotal)+parseInt(param.tax)+parseInt(param.insurance)-parseInt(param.discount);
    //         param.total = parseInt(param.subtotal) - parseInt(param.discount);

    //     }
    //     this.setState({ param: param });
    //     setTimeout(() => {
    //         console.log('paramTotalPrice', JSON.stringify(this.state.param));

    //     }, 50);

    //     if (param.type == 'trip') {
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });
    //             var dataCount = {
    //                 required_dob: false,
    //                 required_passport: false,
    //                 total_price: total_price,
    //                 nett_price: 0,
    //                 insurance_total: 0,
    //                 transaction_fee: 0
    //             };
    //             this.setState({ dataCount: dataCount });
    //             this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataCount.transaction_fee) });
    //         });
    //     } else if (param.type == 'hotelpackage') {
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });
    //             var dataCount = {
    //                 required_dob: false,
    //                 required_passport: false,
    //                 total_price: total_price,
    //                 nett_price: 0,
    //                 insurance_total: 0,
    //                 transaction_fee: 0
    //             };
    //             this.setState({ dataCount: dataCount });
    //             this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataCount.transaction_fee) });
    //         });
    //     } else if (param.type == 'hotelLinx') {
    //         console.log('paramHotelLinx', JSON.stringify(param));
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });
    //             var dataCount = {
    //                 required_dob: false,
    //                 required_passport: false,
    //                 total_price: total_price,
    //                 nett_price: 0,
    //                 insurance_total: 0,
    //                 transaction_fee: 0
    //             };
    //             this.setState({ dataCount: dataCount });
    //             this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataCount.transaction_fee) });
    //         });
    //     } else if (param.type == 'activities') {
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });
    //             var dataCount = {
    //                 required_dob: false,
    //                 required_passport: false,
    //                 total_price: total_price,
    //                 nett_price: 0,
    //                 insurance_total: 0,
    //                 transaction_fee: 0
    //             };
    //             this.setState({ dataCount: dataCount });
    //             this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataCount.transaction_fee) });
    //         });
    //     } else if (param.type == 'flight') {
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });
    //             var departurePost = this.removePrice(this.state.selectDataDeparture);
    //             var returnPost = this.removePrice(this.state.selectDataReturn);
    //             this.setState({ total_all: this.state.dataCount.total_price });
    //         });
    //     } else {
    //         this.setState({ loading_spinner: true }, () => {
    //             this.setState({ loading_spinner: false });

    //             var dataCount = {
    //                 required_dob: false,
    //                 required_passport: false,
    //                 total_price: total_price,
    //                 nett_price: 0,
    //                 insurance_total: 0,
    //                 transaction_fee: 0
    //             };
    //             this.setState({ dataCount: dataCount });
    //             this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataCount.transaction_fee) });

    //         });

    //     }

    // }

    typeFlight() {
        const data = {
            "fromCode": this.state.param.Origin,
            "toCode": this.state.param.Destination
        }
        const paramData = { "param": data }






        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/api/get_type_flight";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);





        var param = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramData),
        }

        fetch(url, param)
            .then(response => response.json())
            .then(result => {
                console.log('typeFlightsss', JSON.stringify(result));
                this.setState({ typeFlight: result.typeFlight })

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
            });


    }

    setTitle(title) {
        this.setState({ title: title });
    }

    groupArray(ssr, number) {
        var array = ssr,
            result = array.reduce(function (r, a) {
                r[a.number] = r[a.number] || [];
                r[a.number].push(a);
                return r;
            }, Object.create(null));

        console.log(result);


    }

    groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    filterArray(array, number) {
        // var newArray = array.filter(function (el) {
        //     return el.number == number
        // });

        var aquaticCreatures = array.filter(function (creature) {
            return creature.number == number;
        });

        return aquaticCreatures;
    }

    json2array(json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    }

    filtervar(number) {
        const filters = {
            number: number => number === 50
        };
        return filters;
    }










    rebuildParticipant(participant) {
        var participant_new = [];
        var a = 1;
        participant.map(item => {
            var obj = {};

            var newArray = this.state.ssr.filter(function (el) {
                return el.number === a;
            });

            obj['type'] = item.type;
            obj['title'] = item.title;
            obj['firstName'] = item.firstName;
            obj['lastName'] = item.lastName;
            obj['dob'] = item.dob;
            obj['guestnum'] = item.guestnum;
            // obj['ssr'] = this.filterArray(this.state.ssr, a);//this.state.ssr;
            // obj['ssr1'] = this.state.ssr;
            obj['ssr'] = this.extraFilter(newArray);
            obj['passport'] = item.passport;
            //obj['ssr'] = newArray;
            //obj['ssr'] = this.groupBy(this.state.ssr, (c) => c.number);

            participant_new.push(obj);
            a++;
        });

        return participant_new;

    }

    submitOrder() {
        var param = this.state.param;
        var param = this.state.param;
        var customer = this.state.listdata_customer;
        var guest = this.state.listdata_participant;
        var dataCount = this.state.dataCount;
        var ssr = this.state.ssr;
        console.log('guest', JSON.stringify(guest));


        var contact = {
            "title": customer[0].title,
            "firstName": customer[0].firstname,
            "lastName": customer[0].lastname,
            //"country": customer[0].nationality_id,
            "phoneCode": customer[0].nationality_phone_code,
            "phone": customer[0].phone,
            "email": customer[0].email
        };


        var participant = [];
        var a = 1;
        guest.map(item => {
            var obj = {};
            obj['type'] = this.convertOldVia(this.state.arr_old[a]);
            obj['title'] = item.title;
            //obj['nationality'] = item.nationality_id;
            obj['firstName'] = item.firstname;
            obj['lastName'] = item.lastname;
            obj['dob'] = this.convertDateDMY(item.birthday);
            obj['guestnum'] = a;
            //obj['identity_number'] = item.passport_number;
            //obj['issuing_country'] = item.passport_country_id;
            //obj['expiry_date'] = item.passport_expire;
            //obj['departure_baggage'] = "0";
            //obj['return_baggage'] = "0";
            obj['passport'] = {
                "nat": item.passport_country_id,
                "num": item.passport_number,
                // "doi": "",
                // "doe": this.convertDateDMY(item.passport_expire)
            }


            // {
            //     "type": "adult",
            //     "title": "Mr",
            //     "firstName": "Hamdan",
            //     "lastName": "Awaludin",
            //     "passport": {
            //         "nat": "ID",
            //         "num": "1ku2gutf2yi2",
            //         "doi": "26-08-2021",
            //         "doe": "26-06-2026"
            //     }
            // }


            participant.push(obj);
            a++;
        });

        console.log('param', JSON.stringify(param));
        console.log('contact', JSON.stringify(contact));
        console.log('guestSubmit', JSON.stringify(guest));
        console.log('participant', JSON.stringify(participant));
        console.log('dataCount', JSON.stringify(dataCount));

        this.setState({ loading_spinner: true }, () => {
            this.setState({ loading_spinner_file: require("app/assets/loader_flight.json") });
            this.setState({ loading_spinner_title: 'Connecting to Maskapai' });


            let config = this.state.configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + 'booking/checkout';
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);


            var paramCheckout = {};
            paramCheckout.product = "flight";
            paramCheckout.key = param.key;
            paramCheckout.price = {
                "subtotal": dataCount.subtotal,
                "insurance": dataCount.insurance,
                "tax": dataCount.tax,
                "iwjr": dataCount.iwjr,
                "fee": dataCount.fee,
                "fee2": dataCount.fee2,
                "addon": dataCount.addon,
                "discount": dataCount.discount.grandTotal,
                "point": dataCount.point,
                "total": dataCount.total,
            }
            paramCheckout.paymentMethod = 0;
            paramCheckout.contact = contact;
            paramCheckout.guest = this.rebuildParticipant(participant);
            paramCheckout.coupon = this.state.couponCodeListId;;
            paramCheckout.platform = Platform.OS;
            console.log('paramCheckout', JSON.stringify(paramCheckout));



            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);

            var raw = JSON.stringify(paramCheckout);

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

                    if (result.success == true) {
                        console.log('resultcheckout', JSON.stringify(result));
                        var redirect = 'Pembayaran';
                        var id_order = result.data.id_order;

                        var param = {
                            id_order: id_order,
                            dataPayment: {},
                            back: ''
                        }
                        console.log('paramPembayaran', JSON.stringify(param));
                        this.props.navigation.navigate("Pembayaran", { param: param });
                    } else {
                        console.log('Error', JSON.stringify(result));
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result));

                    }

                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });



        });





    }

    expiredPasportMonth(passport_expire) {
        var date1 = passport_expire;
        var today = new Date();
        var date2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var expiredPasportMonth = this.getDateDiff(date2, date1);
        return expiredPasportMonth;
    }

    convertOldVia(oldType) {
        if (oldType == 'ADT') {
            old = 'adult';
        } else if (oldType == 'CHD') {
            old = 'child';
        } else if (oldType == 'INF') {
            old = 'infant';
        }
        return old;
    }

    onSubmit() {

        var customer = this.state.listdata_customer[0];
        var participant = this.state.listdata_participant;
        var typeFlight = this.state.typeFlight;
        var typeProduct = this.state.param.type;

        var valueArr = participant.map(function (item) { return item.fullname });
        var isDuplicate = valueArr.some(function (item, idx) {
            return valueArr.indexOf(item) != idx
        });

        var check = [];
        var a = 1;
        var expiredPasportMonth = '';
        participant.map(item => {
            var obj = {};
            if (typeFlight == "international") {
                expiredPasportMonth = this.expiredPasportMonth(item.passport_expire);
                console.log(item.passport_expire, expiredPasportMonth);
                if (expiredPasportMonth <= 6) {

                    obj['Penumpang ' + a] = 'Passpor minimal expired harus 6 bulan';
                    check.push(obj);
                }
            }


            a++;
        });



        var key = 1;
        var fullname = customer.fullname;
        var firstname = customer.firstname;
        var lastname = customer.lastname;
        var birthday = customer.birthday;
        var nationality = customer.nationality;
        var passport_number = customer.passport_number;
        var passport_country = customer.passport_country;
        var passport_expire = customer.passport_expire;
        var phone = customer.phone;
        var title = customer.title;
        var email = customer.email;
        var nationality_id = customer.nationality_id;
        var nationality_phone_code = customer.nationality_phone_code;
        var passport_country_id = customer.passport_country_id;
        var type = 'guest';




        if (
            firstname == "" ||
            lastname == "" ||
            title == null ||
            email == "" ||
            phone == "" ||
            nationality == null ||
            nationality_phone_code == null
        ) {
            this.dropdown.alertWithType('info', 'Info', 'Pastikan data pemesan terisi semua');
        } else if (isDuplicate == true) {
            this.dropdown.alertWithType('info', 'Info', 'Data traveller / penumpang tidak boleh double');
        } else if (check.length > 0) {
            this.dropdown.alertWithType('info', 'Info', JSON.stringify(check));
        } else {

            this.setState({ loading: true });
            //this.saveParticipant();
            this.submitOrder();
        }
    }

    // onSubmitOrder(cartToBeSaved) {
    //     var item = cartToBeSaved;
    //     this.setState({ loading_spinner_file: require("app/assets/loader_wait.json") });
    //     this.setState({ loading_spinner_title: 'Create Order' });
    //     AsyncStorage.getItem('config', (error, result) => {
    //         if (result) {
    //             let config = JSON.parse(result);
    //             var access_token = config.token;
    //             //var midtransMethod=config.midtransMethod;
    //             var path = config.user_order_submit.dir;
    //             var url = config.baseUrl;
    //             console.log('urlSubmit', url + path);

    //             var param = this.state.param;
    //             param.discountCoupon = this.state.discountCoupon;
    //             param.discountPoint = this.state.discountPoint;
    //             param.platform = Platform.OS;
    //             var dataCartArrayRealSend = {
    //                 "token": access_token,
    //                 "id_user": this.state.id_user,
    //                 "dataCart": item,
    //                 "type": this.state.param.type,
    //                 "tokenFirebase": this.state.tokenFirebase,
    //                 "fee": 0,
    //                 "insurance": this.state.insurance_included,
    //                 "param": param,
    //                 "otherUser": this.state.otherUser,
    //                 "couponCodeList": this.state.couponCodeList
    //             }

    //             console.log("---------------data cart array cart kirim  ------------");
    //             console.log(JSON.stringify(dataCartArrayRealSend));
    //             console.log(url + path, JSON.stringify(dataCartArrayRealSend));





    //             var myHeaders = new Headers();
    //             myHeaders.append("Content-Type", "application/json");


    //             var raw = JSON.stringify(dataCartArrayRealSend);
    //             var requestOptions = {
    //                 method: 'POST',
    //                 headers: myHeaders,
    //                 body: raw,
    //                 redirect: 'follow'
    //             };


    //             fetch(url + path, requestOptions)
    //                 .then(response => response.json())
    //                 .then(result => {
    //                     this.setState({ loading_spinner: false });
    //                     this.updateUserSession();
    //                     var dataOrderSubmit = result;

    //                     var redirect = 'Pembayaran';
    //                     var id_order = dataOrderSubmit.id_order;

    //                     var param = {
    //                         id_order: id_order,
    //                         dataPayment: {},
    //                         back: ''
    //                     }
    //                     this.props.navigation.navigate("Pembayaran", { param: param });


    //                 })
    //                 .catch(error => {
    //                     alert('Kegagalan Respon Server')
    //                 });

    //         }
    //     });


    // }

    updateUserSession() {
        let password = this.state.password;
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);


                var customer = this.state.listdata_customer[0];

                var otherUser = this.state.otherUser;
                if (otherUser) {
                    var newUserSession = {
                        id_user: userSession.id_user,
                        fullname: userSession.fullname,
                        firstname: userSession.firstname,
                        lastname: userSession.lastname,
                        birthday: userSession.birthday,
                        nationality: userSession.nationality,
                        passport_number: userSession.passport_number,
                        passport_country: userSession.passport_country,
                        passport_expire: userSession.passport_expire,
                        phone: userSession.phone,
                        title: userSession.title,
                        email: userSession.email,
                        nationality_id: userSession.nationality_id,
                        nationality_phone_code: userSession.nationality_phone_code,
                        passport_country_id: userSession.passport_country_id,
                        username: userSession.username,
                        gender: userSession.gender,
                        un_nationality: userSession.un_nationality,
                        id_city: userSession.id_city,
                        city_name: userSession.city_name,
                        address: userSession.address,
                        postal_code: userSession.postal_code,
                        avatar: userSession.avatar,
                        cart: userSession.cart,
                        status: userSession.status,
                        loginVia: userSession.loginVia,
                    }

                } else {


                    var newUserSession = {
                        id_user: userSession.id_user,
                        fullname: customer['fullname'],
                        firstname: customer['firstname'],
                        lastname: customer['lastname'],
                        birthday: customer['birthday'],
                        nationality: customer['nationality'],
                        passport_number: customer['passport_number'],
                        passport_country: customer['passport_country'],
                        passport_expire: customer['passport_expire'],
                        phone: customer['phone'],
                        title: customer['title'],
                        email: userSession.email,
                        nationality_id: customer['nationality_id'],
                        nationality_phone_code: customer['nationality_phone_code'],
                        passport_country_id: customer['passport_country_id'],
                        username: userSession.username,
                        gender: userSession.gender,
                        un_nationality: userSession.un_nationality,
                        id_city: userSession.id_city,
                        city_name: userSession.city_name,
                        address: userSession.address,
                        postal_code: userSession.postal_code,
                        avatar: userSession.avatar,
                        cart: userSession.cart,
                        status: userSession.status,
                        loginVia: userSession.loginVia,
                    }


                }

                newUserSession.password = password;
                ////console.log('newUserSession',JSON.stringify(newUserSession))
                AsyncStorage.setItem('userSession', JSON.stringify(newUserSession));

            }
        });

    }

    convertParticipantBirthday(old) {
        let maxDate = new Date();
        let minDate = new Date();
        if (old === 'adult') {
            maxDate = this.addDate(maxDate, -12, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -80, 'years');
            minDate = this.formatDateToString(minDate);
            type = "ADT";
        } else if (old === 'children') {
            maxDate = this.addDate(maxDate, -2, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -11, 'years');
            minDate = this.formatDateToString(minDate);
            type = "CHD";

        } else if (old === 'baby') {
            maxDate = this.addDate(maxDate, -3, 'months');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -24, 'months');
            minDate = this.formatDateToString(minDate);
            type = "INF";
        }
        return maxDate;
        //var arr=array[minDate,type];
        // return arr;

    }

    convertParticipantType(old) {
        let maxDate = new Date();
        let minDate = new Date();
        if (old === 'adult') {
            maxDate = this.addDate(maxDate, -12, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -80, 'years');
            minDate = this.formatDateToString(minDate);
            type = "ADT";
        } else if (old === 'children') {
            maxDate = this.addDate(maxDate, -2, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -11, 'years');
            minDate = this.formatDateToString(minDate);
            type = "CHD";

        } else if (old === 'baby') {
            maxDate = this.addDate(maxDate, -3, 'months');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -24, 'months');
            minDate = this.formatDateToString(minDate);
            type = "INF";
        }
        //return minDate;
        //var arr=array[minDate,type];
        return type;

    }

    saveParticipant(
        key,
        fullname,
        firstname,
        lastname,
        birthday,
        nationality,
        passport_number,
        passport_country,
        passport_expire,
        phone,
        title,
        email,
        nationality_id,
        nationality_phone_code,
        passport_country_id,
        old
    ) {
        const { login, id_user, idParam } = this.state;

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant_update";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        // var url = config.baseUrl;
        // var path = config.user_participant_save.dir;

        const data = {
            "id": key,
            "id_user": id_user,
            "fullname": fullname,
            "firstname": firstname,
            "lastname": lastname,
            "birthday": this.convertParticipantBirthday(old),
            "nationality": nationality,
            "passport_number": passport_number,
            "passport_country": passport_country,
            "passport_expire": passport_expire,
            "phone": phone,
            "title": title,
            "email": email,
            "nationality_id": nationality_id,
            "nationality_phone_code": nationality_phone_code,
            "passport_country_id": passport_country_id,
            "type": this.convertParticipantType(old)
        }
        const param = { "param": data }
        console.log('paramSaveParticipant', JSON.stringify(param));
        // this.convertParticipantOld(old)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify(param);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('saveParticipant', JSON.stringify(result));
                setTimeout(() => {
                    this.validation();
                }, 50);


            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
            });

    }

    filterArray(array, filters) {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
            // validates all filter criteria
            return filterKeys.every(key => {
                // ignores non-function predicates
                if (typeof filters[key] !== 'function') return true;
                return filters[key](item[key]);
            });
        });
    }

    validaton_participant() {
        var hasil = false;
        const products = this.state.listdata_participant;
        console.log('validaton_participant', JSON.stringify(products));


        const filters = {
            title: title => title == "",
            fullname: fullname => fullname == "",
        };

        const filtered = this.filterArray(products, filters);
        var jml = filtered.length;
        console.log("----------------validation participant------------------------------------");
        console.log(JSON.stringify(filtered));
        return jml;
    }

    validaton_customer() {
        var hasil = false;
        const products = this.state.listdata_customer;


        const filters = {
            title: title => title == "",
            fullname: fullname => fullname == "",
        };

        const filtered = this.filterArray(products, filters);
        var jml = filtered.length;
        console.log("----------------validation customer------------------------------------");
        console.log(JSON.stringify(filtered));
        return jml;
    }

    validation() {
        var jml_empty_participant = this.validaton_participant();
        var jml_empty_customer = this.validaton_customer();
        console.log('jml_empty_participant', jml_empty_participant);
        console.log('jml_empty_customer', jml_empty_customer);

        if (jml_empty_participant == 0 && jml_empty_customer == 0) {
            this.setState({ colorButton: BaseColor.secondColor });
            this.setState({ colorButtonText: BaseColor.primaryColor });
            this.setState({ disabledButton: false });
        } else {
            this.setState({ colorButton: BaseColor.greyColor });
            this.setState({ colorButtonText: BaseColor.whiteColor });
            this.setState({ disabledButton: true });
        }

    }

    getDateDiff(dateOne, dateTwo) {
        if (dateOne.charAt(2) == '-' & dateTwo.charAt(2) == '-') {
            dateOne = new Date(formatDate(dateOne));
            dateTwo = new Date(formatDate(dateTwo));
        }
        else {
            dateOne = new Date(dateOne);
            dateTwo = new Date(dateTwo);
        }
        let timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let diffMonths = Math.ceil(diffDays / 31);
        let diffYears = Math.ceil(diffMonths / 12);

        let message = "Difference in Days: " + diffDays + " " +
            "Difference in Months: " + diffMonths + " " +
            "Difference in Years: " + diffYears;
        return diffMonths;
    }

    formatDate(date) {
        return date.split('-').reverse().join('-');
    }



    updateParticipant(
        key,
        fullname,
        firstname,
        lastname,
        birthday,
        nationality,
        passport_number,
        passport_country,
        passport_expire,
        phone,
        title,
        email,
        nationality_id,
        nationality_phone_code,
        passport_country_id,
        type,
        old,
        old_select
    ) {
        const { userSession } = this.state;

        console.log('type', type);
        if (type == 'guest') {
            AsyncStorage.getItem('setDataParticipant', (error, result) => {
                if (result) {

                    let resultParsed = JSON.parse(result);
                    let persons = resultParsed;

                    var date1 = passport_expire;
                    var today = new Date();
                    var date2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var expiredPasportMonth = this.getDateDiff(date2, date1);
                    var countPersons = persons.filter(item => item.fullname === fullname);

                    const checkParticipant = async () => {
                        try {

                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Cookie", "ci_session=okaepmldisibk8nnb05ktaa7nvft3kn8");

                            var param = {
                                "param": {
                                    "id": "",
                                    "id_user": userSession.id_user,
                                    "fullname": "",
                                    "firstname": firstname,
                                    "lastname": lastname,
                                    "birthday": "",
                                    "nationality": "",
                                    "passport_number": "",
                                    "passport_country": "",
                                    "passport_expire": "",
                                    "phone": "",
                                    "title": title,
                                    "email": "",
                                    "nationality_id": "",
                                    "nationality_phone_code": "",
                                    "passport_country_id": "",
                                    "type": ""
                                }
                            };
                            console.log('paramCheckParticipant', JSON.stringify(param));
                            var raw = JSON.stringify(param);

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };

                            let config = this.state.configApi;
                            let baseUrl = config.baseUrl;
                            let url = baseUrl + 'front/api_new/user/participant_check';
                            console.log('configApi', JSON.stringify(config));
                            console.log('urlss', url);

                            let response = await fetch(url, requestOptions);
                            let json = await response.json();
                            console.log('checkParticipant', JSON.stringify(json));

                            var id = 0;
                            if (json.length != 0) {
                                id = json[0].id_passenger;
                            }

                            const newProjects = resultParsed.map(p =>
                                p.key === key
                                    ? {
                                        ...p,
                                        fullname: fullname,
                                        firstname: firstname,
                                        lastname: lastname,
                                        birthday: this.convertParticipantBirthday(old),
                                        nationality: nationality,
                                        passport_number: passport_number,
                                        passport_country: passport_country,
                                        passport_expire: passport_expire,
                                        phone: phone,
                                        title: title,
                                        email: email,
                                        nationality_id: nationality_id,
                                        nationality_phone_code: nationality_phone_code,

                                        passport_country_id: passport_country_id,
                                        id: id
                                    }
                                    : p
                            );

                            AsyncStorage.setItem('setDataParticipant', JSON.stringify(newProjects));
                            this.setState({ listdata_participant: newProjects });


                            this.saveParticipant(
                                id,
                                fullname,
                                firstname,
                                lastname,
                                birthday,
                                nationality,
                                passport_number,
                                passport_country,
                                passport_expire,
                                phone,
                                title,
                                email,
                                nationality_id,
                                nationality_phone_code,
                                passport_country_id,
                                old
                            );


                        } catch (error) {
                            //console.error('ERROR', 'error');
                            console.log(JSON.stringify(error));
                            this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                        }
                    };
                    checkParticipant();



                }
            });
        } else if (type == 'customer') {
            let password = this.state.password;
            AsyncStorage.getItem('setDataCustomer', (error, result) => {
                if (result) {
                    let resultParsed = JSON.parse(result)
                    console.log('setDataCustomer', JSON.stringify(resultParsed));
                    const newProjects = resultParsed.map(p =>
                        p.key === key
                            ? {
                                ...p,
                                fullname: fullname,
                                firstname: firstname,
                                lastname: lastname,
                                birthday: birthday,
                                nationality: nationality,
                                passport_number: passport_number,
                                passport_country: passport_country,
                                passport_expire: passport_expire,
                                phone: phone,
                                title: title,
                                email: email,
                                nationality_id: nationality_id,
                                nationality_phone_code: nationality_phone_code,

                                passport_country_id: passport_country_id,
                            }
                            : p
                    );

                    AsyncStorage.setItem('setDataCustomer', JSON.stringify(newProjects));
                    this.setState({ listdata_customer: newProjects });

                    userSession.fullname = fullname;
                    userSession.firstname = firstname;
                    userSession.lastname = lastname;
                    userSession.title = title;
                    userSession.nationality_phone_code = nationality_phone_code;
                    userSession.phone = phone;
                    userSession.nationality = nationality;
                    userSession.nationality_id = nationality_id;
                    userSession.password = password;
                    console.log('userSessionNew', JSON.stringify(userSession));
                    AsyncStorage.setItem('userSession', JSON.stringify(userSession));

                    let config = this.state.configApi;
                    let baseUrl = config.baseUrl;
                    let url = baseUrl + 'front/api_new/user/user_update';
                    console.log('configApi', JSON.stringify(config));
                    console.log('urlss', url);


                    var params = { "param": userSession }
                    console.log('userSessionUpdate', JSON.stringify(params));


                    var param = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(params),
                    }


                    fetch(url, param)
                        .then(response => response.json())
                        .then(result => {
                            console.log('resultuserSessionUpdate', JSON.stringify(result));

                        })
                        .catch(error => {
                            console.log(JSON.stringify(error));
                            alert('Kegagalan Respon Server updateParticipant');
                        });


                    setTimeout(() => {
                        console.log('listdata_customer', JSON.stringify(this.state.listdata_customer));
                    }, 20);
                }
            });

            this.setState({
                style_form_customer: {
                    flexDirection: "row",
                    backgroundColor: BaseColor.fieldColor,
                    marginBottom: 15,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: BaseColor.fieldColor,
                    padding: 5,
                }
            });
            this.setState({ error_form_customer: false });
            setTimeout(() => {
                this.validation();
            }, 50);
        }




    }



    removePrice(dataObj) {
        var array = {};
        for (var key in dataObj) {
            var obj = {};
            if (key != 'price') {
                array[key] = dataObj[key];
            }
        }
        return array;
    }

    addDate(dt, amount, dateType) {
        switch (dateType) {
            case 'days':
                return dt.setDate(dt.getDate() + amount) && dt;
            case 'weeks':
                return dt.setDate(dt.getDate() + (7 * amount)) && dt;
            case 'months':
                return dt.setMonth(dt.getMonth() + amount) && dt;
            case 'years':
                return dt.setFullYear(dt.getFullYear() + amount) && dt;
        }
    }

    formatDateToString(date) {
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();

        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
    }

    useCoupon2(item) {
        const { userSession, param, couponCode, discount, couponCodeList, product } = this.state;
        console.log('useCoupon', JSON.stringify(item));
        console.log('paramUseCoupn', JSON.stringify(param));

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=gur1sg8tu7micu8i028lqn1sa4tcaa5k");


        var params = {
            "param":
            {
                "id_coupon_history": item.id_coupon_history,
                "id_coupon": item.id_coupon,
                "id_user": this.state.id_user,
                "total": param.total,
                "platform": item.detail_coupon.platform,
                "product": param.type,
                "payment_method": item.detail_coupon.payment_method,
                "parameter": param
            }
        };
        var raw = JSON.stringify(params);
        console.log('paramsuscoup', raw);
        //console.log('param',JSON.stringify(param));


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        var url = "https://masterdiskon.com/front/api_new/product/useCoupon";


        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultuSEcOUPON', JSON.stringify(result));


                if (result.success == true) {

                    const arrayIncludesInObj = (arr, key, valueToCheck) => {
                        return arr.some(value => value[key] === valueToCheck);
                    }

                    const found = arrayIncludesInObj(couponCodeList, "couponCode", item.coupon_code); // true
                    console.log(found);
                    if (found == false) {
                        this.setState({ discount: parseInt(discount) + parseInt(result.data.discount) });
                        couponCodeList.push({
                            couponCode: result.data.coupon_code,
                            couponName: result.data.coupon_name,
                            couponAmount: result.data.discount,
                            couponIdHistory: result.data.id_coupon_history,
                            couponId: result.data.id_coupon,
                            from: param.type == 'hotelLinx' ? param.city : param.bandaraAsalCode,
                            to: param.type == 'hotelLinx' ? "" : param.bandaraTujuanCode
                        });

                        console.log('couponCodeListpush', JSON.stringify(couponCodeList));
                        var discountCoupon = 0;
                        couponCodeList.map(item => {
                            discountCoupon += parseInt(item.couponAmount);
                        });

                        this.setState({ discountCoupon: discountCoupon });
                        this.setState({ couponCodeList: couponCodeList });



                    }

                    //this.setState({couponCode:"Pilih Kupon"});
                    setTimeout(() => {
                        //this.totalPrice();
                        console.log('discount', this.state.discount);
                        console.log('couponCodeList', JSON.stringify(this.state.couponCodeList));
                    }, 50);

                } else {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                }

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
            });
        //this.setState({couponCode:item.coupon_code});
    }

    useCoupon(item) {
        let couponCodeList = this.state.couponCodeList;
        let couponCodeListId = this.state.couponCodeListId;
        let param = this.state.param;
        console.log('useCoupon', JSON.stringify(item));

        couponCodeListId.push(item.id_coupon.toString());
        this.setState({ couponCodeListId: couponCodeListId });
        setTimeout(() => {
            console.log('couponCodeListId', JSON.stringify(this.state.couponCodeListId));
            this.count();
        }, 20);
    }

    useCouponForm(couponCode) {
        let couponCodeList = this.state.couponCodeList;
        let couponCodeListId = this.state.couponCodeListId;
        let param = this.state.param;

        couponCodeListId.push(couponCode);
        this.setState({ couponCodeListId: couponCodeListId });
        setTimeout(() => {
            console.log('couponCodeListId', JSON.stringify(this.state.couponCodeListId));
            this.count();
        }, 20);
    }

    setCoupon(data) {
        //this.setState({couponCode:item.coupon_code});
        //  const {param}=this.state;
        //  console.log('useCoupon',JSON.stringify(data));
        //  if(data.success==false){
        //      alert(data.message);
        //  }else{
        //     this.setState({discount:data.discount});
        //     this.setState({id_coupon:data.id_coupon});
        //     this.setState({id_coupon_history:data.id_coupon_history});
        //     this.setState({param:param});
        // setTimeout(() => {
        //     //this.totalPrice();
        // }, 50);
        // console.log('couponsummary',JSON.stringify(data));
        //  }
    }

    // checkCoupon() {
    //     const { navigation } = this.props;
    //     const { userSession, param, couponCode, discount, couponCodeList, product } = this.state;
    //     console.log('product', JSON.stringify(product));

    //     this.setState({ loadingCheckCoupon: true });
    //     console.log('discount', discount);
    //     var myHeaders = new Headers();
    //     myHeaders.append("Cookie", "ci_session=t8rooel5ugjfvjll6fv4fu0b7b1nif93");

    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //     var paramCode = "code=" + couponCode.toLowerCase();
    //     var paramTotal = "&total=" + param.total;
    //     var paramProduct = "&product=" + param.type;
    //     var paramUrl = paramCode + paramTotal + paramProduct;
    //     var url = "https://masterdiskon.com/front/page/coupon/get_coupon_detail?" + paramUrl;


    //     console.log('urlcheckCoupon', url);
    //     fetch(url, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log('checkCoupon', JSON.stringify(result));
    //             this.setState({ loadingCheckCoupon: false });
    //         })
    //         .catch(error => {
    //             console.log(JSON.stringify(error));
    //             this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
    //         });

    // }

    getCouponDetail() {
        const { navigation } = this.props;
        const { userSession, param } = this.state;
        navigation.navigate('SelectCoupon', { userSession: userSession, param: param, useCoupon: this.useCoupon, useCouponForm: this.useCouponForm });

    }

    componentDidMount() {

        var param = this.state.param;
        var typeProduct = param.type;
        var typeFlight = this.state.typeFlight;
        var ssr = this.state.ssr;
        var ssrOri = this.state.ssrOri;
        var ssrFilter = this.extraFilter(ssr);
        console.log('ssr', JSON.stringify(ssr));
        // console.log('ssrFilter', JSON.stringify(ssrFilter));
        // this.setState({ ssr: ssrFilter });

        //this.setState({ loading_spinner: true });
        setTimeout(() => {
            this.count();
            //this.totalPrice();
            if (param.type == 'flight') {
                this.typeFlight();
            }
        }, 20);


        let dtDefPassportExpired = new Date();
        dtDefPassportExpired = this.addDate(dtDefPassportExpired, -7, 'months');
        var def_passport_expire = this.formatDateToString(dtDefPassportExpired);

        let dtDefAdult = new Date();
        dtDefAdult = this.addDate(dtDefAdult, -13, 'years');
        var def_date_adult = this.formatDateToString(dtDefAdult);

        var def_passport_number = "12345678";
        var def_passport_country = "Indonesia";
        //var def_passport_expire=minDatePassport;
        var def_passport_country_id = "ID";
        var def_phone = "12345678";
        var def_email = "email@gmail.com";


        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                var customer = [];
                for (var i = 1; i <= 1; i++) {
                    var obj = {};
                    obj['key'] = i;
                    obj['label'] = "Contact";
                    obj['old'] = 'adult';

                    obj['fullname'] = userSession.fullname;
                    obj['firstname'] = userSession.firstname;
                    obj['lastname'] = userSession.lastname;
                    obj['birthday'] = def_date_adult;
                    obj['nationality'] = userSession.nationality;
                    obj['passport_number'] = def_passport_number;
                    obj['passport_country'] = def_passport_country;
                    obj['passport_expire'] = def_passport_expire;
                    obj['phone'] = userSession.phone;
                    obj['title'] = userSession.title;
                    obj['email'] = userSession.email;

                    obj['nationality_id'] = userSession.nationality_id;
                    obj['nationality_phone_code'] = userSession.nationality_phone_code;

                    obj['passport_country_id'] = def_passport_country_id;


                    customer.push(obj)
                }
                AsyncStorage.setItem('setDataCustomer', JSON.stringify(customer));
                this.setState({ listdata_customer: customer });
            }
        });



        if (typeFlight == 'domestic' || typeProduct == 'trip') {
            def_passport_number = def_passport_number;
            def_passport_country = def_passport_country;
            def_passport_expire = def_passport_expire;
            def_phone = def_phone;
            def_email = def_email;
            def_passport_country_id = def_passport_country_id;
        }



        var participant = [];
        for (var i = 1; i <= this.state.jumlahPenumpang; i++) {

            if (param.participant == true) {
                if (this.state.arr_old[i] == 'ADT') {
                    old = 'adult';
                } else if (this.state.arr_old[i] == 'CHD') {
                    old = 'children';
                } else if (this.state.arr_old[i] == 'INF') {
                    old = 'baby';
                }

            } else {
                old = 'adult';
            }

            var labeldetail = 'Penumpang ';
            if (param.type != 'flight') {
                labeldetail = 'Treveller ';
            }

            var obj = {};
            obj['key'] = i;
            obj['id'] = 0;
            obj['label'] = labeldetail + i + " : " + old;
            obj['old'] = old;

            obj['fullname'] = "";
            obj['firstname'] = "";
            obj['lastname'] = "";
            obj['birthday'] = "";
            obj['nationality'] = "";
            obj['passport_number'] = def_passport_number;
            obj['passport_country'] = def_passport_country;
            obj['passport_expire'] = def_passport_expire;
            obj['phone'] = def_phone;
            obj['title'] = "";
            obj['email'] = def_email;

            obj['nationality_id'] = "";
            obj['nationality_phone_code'] = "";

            obj['passport_country_id'] = def_passport_country_id;
            obj['ssr'] = this.state.ssr;

            participant.push(obj)
        }
        AsyncStorage.setItem('setDataParticipant', JSON.stringify(participant));
        this.setState({ listdata_participant: participant });
        setTimeout(() => {
            console.log('listdata_participant', JSON.stringify(this.state.listdata_participant))
        }, 20);

    }

    toggleSwitch = value => {
        this.setState({ reminders: value });
        var customer = this.state.listdata_customer[0];

        if (value == true) {
            var key = 1;
            var fullname = customer.fullname;
            var firstname = customer.firstname;
            var lastname = customer.lastname;
            var birthday = customer.birthday;
            var nationality = customer.nationality;
            var passport_number = customer.passport_number;
            var passport_country = customer.passport_country;
            var passport_expire = customer.passport_expire;
            var phone = customer.phone;
            var title = customer.title;
            var email = customer.email;
            var nationality_id = customer.nationality_id;
            var nationality_phone_code = customer.nationality_phone_code;
            var passport_country_id = customer.passport_country_id;
            var type = 'guest';
            var old = 'adult';

            var paraVal = {
                firstname: firstname,
                lastname: lastname,
                title: title,
                email: email,
                phone: phone,
                nationality: nationality,
                nationality_phone_code: nationality_phone_code,


            }

            if (
                firstname == "" ||
                lastname == "" ||
                title == null ||
                email == "" ||
                phone == "" ||
                nationality == null ||
                nationality_phone_code == null
            ) {

                this.setState({
                    style_form_customer: {
                        flexDirection: "row",
                        backgroundColor: BaseColor.fieldColor,
                        marginBottom: 15,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'red',
                        padding: 5,
                    }
                });
                this.setState({ error_form_customer: true });
                this.setState({ reminders: false });
            } else {

                this.updateParticipant(
                    key,
                    fullname,
                    firstname,
                    lastname,
                    birthday,
                    nationality,
                    passport_number,
                    passport_country,
                    passport_expire,
                    phone,
                    title,
                    email,
                    nationality_id,
                    nationality_phone_code,
                    passport_country_id,
                    type,
                    old,
                    ''
                );
            }

        } else {

            var key = 1;
            var fullname = '';
            var firstname = '';
            var lastname = '';
            var birthday = '';
            var nationality = '';
            var passport_number = '';
            var passport_country = '';
            var passport_expire = '';
            var phone = '';
            var title = '';
            var email = '';
            var nationality_id = '';
            var nationality_phone_code = '';
            var passport_country_id = '';
            // var passport_country_phone_code='';
            var type = 'guest';

            this.updateParticipant(
                key,
                fullname,
                firstname,
                lastname,
                birthday,
                nationality,
                passport_number,
                passport_country,
                passport_expire,
                phone,
                title,
                email,
                nationality_id,
                nationality_phone_code,
                passport_country_id,
                type,
                old,
                ''
            );
        }
    };

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    // toggleSwitchInsurance = value => {
    //     var param = this.state.param;
    //     this.setState({ remindersInsurance: value });
    //     if (value == true) {
    //         var total_all = parseInt(this.state.dataCount.total_price) + parseInt(this.state.dataCount.insurance_total);
    //         this.setState({ total_all: total_all });
    //         this.setState({ insurance_included: true });
    //         param.insurance = this.state.dataCount.insurance_total;
    //         param.total = parseInt(param.subtotal) + parseInt(param.tax) + parseInt(param.insurance) - parseInt(param.discount);
    //         this.setState({ param: param });
    //     } else {
    //         var total_all = parseInt(this.state.dataCount.total_price);
    //         this.setState({ total_all: total_all });
    //         this.setState({ insurance_included: false });

    //         param.insurance = 0;
    //         param.total = parseInt(param.subtotal) + parseInt(param.tax) + parseInt(param.insurance) - parseInt(param.discount);
    //         this.setState({ param: param });
    //     }


    // };

    toggleSwitchOtherUser = value => {
        this.setState({ remindersOtherUser: value });
        if (value == true) {
            this.setState({ otherUser: true });
        } else {
            this.setState({ otherUser: false });
        }
    };

    toggleSwitchPointUser = value => {

        const { param } = this.state;
        console.log('usePointUser', value);
        this.setState({ usePointUser: value });

        setTimeout(() => {
            this.count();
        }, 20);

    }

    toggleSwitchPointUser2 = value => {

        const { param } = this.state;
        this.setState({ usePointUser: value });
        var userPoint = this.state.userSession.point;
        if (value == true) {
            console.log('total', param.total);
            console.log('discountPoint', this.state.discountPoint);


            if (param.total <= userPoint) {
                var discountPointSisa = parseInt(userPoint) - parseInt(this.state.param.total);

                var discountPoint = parseInt(userPoint) - parseInt(discountPointSisa);
                console.log('discountPoint', discountPoint);
                this.setState({ discountPoint: discountPoint });

            } else {
                var discountPointSisa = 0;
                var discountPoint = userPoint;
                console.log('discountPoint', discountPoint);
                this.setState({ discountPoint: discountPoint });

            }

            this.setState({ discountPointSisa: discountPointSisa });
            this.setState({ pointUser: true });
            this.setState({ discount: parseInt(this.state.discount) + parseInt(userPoint) });
        } else {
            this.setState({ discountPoint: 0 });
            this.setState({ pointUser: false });
            this.setState({ discountPointSisa: this.state.userSession.point });
            this.setState({ discount: parseInt(this.state.discount) - parseInt(userPoint) });
        }

        setTimeout(() => {
            //this.totalPrice();
        }, 50);

    };

    usePoint() {
        const { param } = this.state;

        this.setState({ discount: parseInt(this.state.discount) + parseInt(this.state.discountCoupon) });
        this.setState({ param: param });
        setTimeout(() => {
            console.log('discount', this.state.discount);
            //this.totalPrice();
        }, 50);
    }

    usePointCancel() {
        const { param } = this.state;

        this.setState({ discount: parseInt(this.state.discount) + parseInt(this.state.discountCoupon) });
        this.setState({ param: param });
        setTimeout(() => {
            //this.totalPrice();
        }, 50);

    }

    removeItem(object, key, item) {
        console.log('couponCodeList', JSON.stringify(object));
        console.log('couponCode', JSON.stringify(key));
        console.log('item', JSON.stringify(item));
        var value = item.couponCode;
        var discount = this.state.discount;
        if (value == undefined)
            return;

        for (var i in object) {
            if (object[i][key] == value) {
                object.splice(i, 1);
            }
        }

        this.setState({ discount: parseInt(discount) - parseInt(item.couponAmount) });
        this.setState({ couponCodeList: object });

        var discountCoupon = 0;
        object.map(item => {
            discountCoupon += parseInt(item.couponAmount);
        });

        this.setState({ discountCoupon: discountCoupon });


        setTimeout(() => {
            //this.totalPrice();
            console.log('couponCodeList', JSON.stringify(this.state.couponCodeList));
        }, 50);
    };

    removeItem2(item) {
        let couponCodeListId = this.state.couponCodeListId;
        console.log('item', item);
        console.log('couponCodeListId', JSON.stringify(couponCodeListId));
        let array = couponCodeListId;
        const index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }


        this.setState({ couponCodeListId: array });


        setTimeout(() => {
            console.log('couponCodeListId', JSON.stringify(this.state.couponCodeListId));
            this.count();
        }, 20);

    };

    getSsr(ssr, num) {
        let filter = ssr.filter(d =>
            d.num == num
        )
        //console.log('filter', JSON.stringify(filter));
        return filter;

    }

    extraFilter(ssr) {
        let filter = ssr.filter(d =>
            d.code != ""
        )
        console.log('filter', JSON.stringify(filter));
        return filter;

    }
    extraUpdate(num, item) {
        console.log('itemUpdate', num, JSON.stringify(item));
        var ssr = this.state.ssr;
        const ssrNew = ssr.map(p =>
            p.num === num
                ? {
                    ...p,
                    desc: item.desc,
                    code: item.code,
                }
                : p
        );


        console.log('ssrNew', JSON.stringify(ssrNew));
        return ssrNew;
        //this.setState({ ssr: ssrNew });
    }

    filterValue(obj, key, value, type) {
        return obj.find(function (v) { return v[key] === value + type });
        //return key + value;
    }

    updateParticipantExtra(
        key,
        extraItem,
        extraType
    ) {

        var listdata_participant = this.state.listdata_participant;
        var resultParsed = listdata_participant;
        console.log('listdata_participant', JSON.stringify(listdata_participant));
        console.log('keyupdateParticipantExtra', key);
        console.log('extraItem', JSON.stringify(extraItem));

        const newProjects = resultParsed.map(p =>
            p.key === key
                ? {
                    ...p,
                    //ssr: p.ssr.push(extraItem),
                    nationality: "xxxx"
                }
                : p
        );

        //console.log('updateParticipantExtra', JSON.stringify(newProjects));

        // AsyncStorage.setItem('setDataParticipant', JSON.stringify(newProjects));
        this.setState({ listdata_participant: newProjects });
        setTimeout(() => {
            console.log('updateParticipantExtrass', this.state.listdata_participant);
        }, 20);



    }


    contentTambahanBagasi(index) {

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var contentTambahanBagasi = <View />
        if (this.state.extra.baggage.length != 0 || this.state.extraBaggage.length != 0) {
            contentTambahanBagasi = <View style={styles.contentProfile}>
                <ProfileDetail
                    textFirst={'Tambahan Bagasi'}
                    textSecond={this.filterValue(this.state.ssr, "num", index, "-baggage").desc}
                    icon={'create-outline'}
                    onPress={() => {

                        console.log('contentTambahanBagasi', index);
                        this.setState({ activeExtra: index });
                        this.setState({ modalTambahanBagasi: true });
                    }
                    }
                    viewImage={false}
                    style={{ flex: 10, marginRight: 10 }}
                />
                <Modal
                    isVisible={this.state.modalTambahanBagasi}
                    onBackdropPress={() => {
                        this.setState({ activeExtra: 0 });
                        this.setState({ modalTambahanBagasi: false });
                    }}
                    onSwipeComplete={() => {
                        this.setState({ activeExtra: 0 });
                        this.setState({ modalTambahanBagasi: false });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>

                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {this.state.extraBaggage.map((item) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                //key={index2}
                                onPress={() => {
                                    console.log('itemTambahanBagasi' + this.state.activeExtra, JSON.stringify(item));
                                    var ssrNew = this.extraUpdate(this.state.activeExtra.toString() + "-baggage", item);

                                    this.updateParticipantExtra(this.state.activeExtra,
                                        item,
                                        'baggage');

                                    console.log('ssrNew', JSON.stringify(ssrNew));

                                    this.setState({ ssr: ssrNew });
                                    this.setState({ tambahanBagasi: item });
                                    this.setState({ modalTambahanBagasi: false });
                                    this.setState({ activeExtra: 0 });

                                    setTimeout(() => {
                                        this.count();
                                    }, 20);


                                    // console.log('itemTambahanBagasi' + num, JSON.stringify(item));
                                    // // var ssrNew = this.extraUpdate(index.toString() + "-baggage", item);

                                    // // console.log('ssrNew', JSON.stringify(ssrNew));

                                    // // this.setState({ ssr: ssrNew });
                                    // // this.setState({ tambahanBagasi: item });
                                    // this.setState({ modalTambahanBagasi: false });

                                    // // setTimeout(() => {
                                    // //     this.count();
                                    // // }, 20);

                                }}
                            >

                                <Text>{item.desc}</Text>
                                <Text> {'IDR ' + priceSplitter(item.amount)}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </Modal>

            </View>

        }
        return contentTambahanBagasi;
    }


    contentTambahanMakanan(index) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        var contentTambahanMakanan = <View />
        if (this.state.extra.meal.length != 0 || this.state.extraMeal.length != 0) {
            var contentTambahanMakanan = <View style={styles.contentProfile}>
                <ProfileDetail
                    textFirst={'Tambah makanan'}
                    textSecond={this.filterValue(this.state.ssr, "num", index, "-meal").desc}
                    icon={'create-outline'}
                    onPress={() => {
                        this.setState({ activeExtra: index });
                        this.setState({ modalTambahanMakanan: true });
                    }
                    }
                    viewImage={false}
                    style={{ flex: 10, marginRight: 10 }}
                />
                <Modal
                    isVisible={this.state.modalTambahanMakanan}
                    onBackdropPress={() => {
                        this.setState({ activeExtra: 0 });
                        this.setState({ modalTambahanMakanan: false });
                    }}
                    onSwipeComplete={() => {
                        this.setState({ activeExtra: 0 });
                        this.setState({ modalTambahanMakanan: false });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>

                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {this.state.extraMeal.map((item) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.desc}
                                onPress={() => {

                                    // console.log('itemTambahanBagasi' + this.state.activeExtra, JSON.stringify(item));
                                    // var ssrNew = this.extraUpdate(this.state.activeExtra.toString() + "-baggage", item);

                                    // console.log('ssrNew', JSON.stringify(ssrNew));

                                    // this.setState({ ssr: ssrNew });
                                    // this.setState({ tambahanBagasi: item });
                                    // this.setState({ modalTambahanBagasi: false });
                                    // this.setState({ activeExtra: 0 });

                                    // setTimeout(() => {
                                    //     this.count();
                                    // }, 20);


                                    console.log('itemTambahanMakanan' + this.state.activeExtra, JSON.stringify(item));
                                    var ssrNew = this.extraUpdate(this.state.activeExtra.toString() + "-meal", item);

                                    console.log('ssrNew', JSON.stringify(ssrNew));
                                    // //console.log('ssrFilter', JSON.stringify(ssrFilter));

                                    this.setState({ ssr: ssrNew });
                                    this.setState({ tambahanMakanan: item });
                                    this.setState({ modalTambahanMakanan: false });
                                    this.setState({ activeExtra: 0 });


                                    setTimeout(() => {
                                        this.count();
                                    }, 20);

                                }}
                            >

                                <Text>{item.desc}</Text>
                                <Text> {'IDR ' + priceSplitter(item.amount)}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </Modal>

            </View>
        }
        return contentTambahanMakanan;
    }




    render() {
        const { navigation } = this.props;
        let { couponCodeList, param, product, productPart, selectDataDeparture, selectDataReturn, dataCount, packageItem, packageItemDetail, loading, loading_spinner, userData, loading_spinner_file, loading_spinner_title, login } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        const { flights, refreshing, clampedScroll } = this.state;

        if (this.state.loading_spinner == false) {
            var coupon = this.state.dataCount.coupon;
            // console.log('dataCount.coupon', JSON.stringify(coupon));
            if (coupon != undefined) {
                if (coupon.length != 0) {
                    var contentCodeCouponList = coupon.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row', marginBottom: 3, justifyContent: "space-between" }}>
                                <Text caption2 style={{ fontStyle: 'italic', color: BaseColor.primaryColor }}>({item.name}) - (Rp {priceSplitter(item.amount)})</Text>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 3, backgroundColor: BaseColor.thirdColor }}
                                    onPress={() => {
                                        //this.removeItem(this.state.couponCodeList, "couponCode", item);
                                        if (item.type == "unik") {
                                            this.removeItem2(item.id.toString());
                                        } else {
                                            this.removeItem2(item.code);
                                        }

                                        //console.log(item.id.toString());
                                    }
                                    }
                                >
                                    {/* <Icon
                                        name="times-circle"
                                        size={12}
                                        color={BaseColor.whiteColor}
                                        style={{ textAlign: "center", marginRight: 3 }}
                                    /> */}
                                    <Text caption2 whiteColor>Hapus</Text>
                                </TouchableOpacity>

                            </View>
                        )
                    })
                } else {
                    var contentCodeCouponList = <View />

                }
            }




        }







        var contentFormCoupon = <View>
            <View style={[{ flexDirection: 'column' }]} />
            <View style={{
                flexDirection: "row",
            }}>
                <View
                    style={{ flex: 9, justifyContent: 'center' }}
                >

                    <Text>{this.state.couponCode}</Text>
                </View>
                <Button
                    loading={this.state.loadingCheckCoupon}
                    style={[{ backgroundColor: BaseColor.primaryColor }, { flex: 3, borderRadius: 5, height: 40, marginTop: 0 }]}

                    onPress={() => {
                        this.getCouponDetail();
                    }}
                >
                    <Text style={{ color: BaseColor.whiteColor }}>Gunakan</Text>
                </Button>
            </View>
            <View>
                {contentCodeCouponList}

            </View>

        </View>

        var contentFormPoint = <View>
            <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 numberOfLines={1}>
                                Point
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                        <Text caption1 semibold numberOfLines={1}>
                            {'IDR ' + priceSplitter(this.state.userSession.point)}
                        </Text>
                    </View>
                </View>
            </View>

            {
                this.state.discountPointSisa != 0 ?

                    <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text caption2 numberOfLines={1} style={{ color: BaseColor.thirdColor }}>
                                        Sisa Point
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                                <Text caption1 semibold numberOfLines={1} style={{ color: BaseColor.thirdColor }}>
                                    {'IDR ' + priceSplitter(this.state.discountPointSisa)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View />
            }

            <View style={{ flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View>
                        <Text caption2 grayColor numberOfLines={1}>
                            Gunakan point untuk pemotongan pembayaran
                        </Text>

                    </View>
                </View>
                <View
                    style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}
                >
                    <Switch name="angle-right"
                        size={18}
                        onValueChange={this.toggleSwitchPointUser}
                        value={this.state.usePointUser}
                    />
                </View>
            </View>
            <View style={styles.line} />
        </View>







        const contentFormCustomer = this.state.listdata_customer.map((item, index) => {
            return (
                <View style={this.state.style_form_customer}>
                    <ProfileDetail
                        textFirst={item.label}
                        textSecond={item.fullname}
                        icon={'create-outline'}
                        onPress={() => this.props.navigation.navigate('DetailContact', {
                            key: item.key,
                            label: item.label,
                            fullname: item.fullname,
                            firstname: item.firstname,
                            lastname: item.lastname,
                            birthday: item.birthday,
                            nationality: item.nationality,
                            passport_number: item.passport_number,
                            passport_country: item.passport_country,
                            passport_expire: item.passport_expire,
                            phone: item.phone,
                            title: item.title,
                            email: item.email,

                            nationality_id: item.nationality_id,
                            nationality_phone_code: item.nationality_phone_code,

                            passport_country_id: item.passport_country_id,

                            updateParticipant: this.updateParticipant,
                            type: 'customer',
                            old: item.old,
                            typeProduct: this.state.param.type,

                        })}
                        viewImage={false}
                        style={{ flex: 10, marginRight: 10 }}
                    />
                    <TouchableOpacity
                        style={styles.searchIcon}
                        onPress={() => {
                            navigation.navigate("ProfileSmart",
                                {
                                    sourcePage: 'summary',
                                    item: item,
                                    old: item.old,
                                    type: 'customer',
                                    updateParticipant: this.updateParticipant,
                                }
                            );
                        }
                        }
                    >
                        <Icon
                            name="search"
                            size={14}
                            color={BaseColor.primaryColor}
                            style={{ textAlign: "center" }}
                        />
                    </TouchableOpacity>
                </View>
            )
        })




        const contentformParticipant = this.state.listdata_participant.map((item, index) => {
            return (
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.contentProfile}>
                        <ProfileDetail
                            textFirst={item.label}
                            textSecond={item.fullname}
                            icon={'create-outline'}
                            onPress={() => {
                                this.props.navigation.navigate('DetailContact', {
                                    key: item.key,
                                    label: item.label,
                                    fullname: item.fullname,
                                    firstname: item.firstname,
                                    lastname: item.lastname,
                                    birthday: item.birthday,
                                    nationality: item.nationality,
                                    passport_number: item.passport_number,
                                    passport_country: item.passport_country,
                                    passport_expire: item.passport_expire,
                                    phone: item.phone,
                                    title: item.title,
                                    email: item.email,

                                    nationality_id: item.nationality_id,
                                    nationality_phone_code: item.nationality_phone_code,

                                    passport_country_id: item.passport_country_id,

                                    updateParticipant: this.updateParticipant,
                                    type: 'guest',
                                    old: item.old,
                                    typeFlight: this.state.typeFlight,
                                    typeProduct: this.state.param.type,
                                    dataCount: this.state.dataCount


                                })
                            }
                            }
                            viewImage={false}
                            style={{ flex: 10, marginRight: 10 }}
                        />
                        <TouchableOpacity
                            style={styles.searchIcon}
                            onPress={() => {
                                navigation.navigate("ProfileSmart",
                                    {
                                        sourcePage: 'summary',
                                        item: item,
                                        old: item.old,
                                        type: 'guest',
                                        updateParticipant: this.updateParticipant,
                                        listdata_participant: this.state.listdata_participant
                                    }
                                );
                            }
                            }
                        >
                            <Icon
                                name="search"
                                size={18}
                                color={BaseColor.primaryColor}
                                style={{ textAlign: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {/* <Text caption2 style={{ paddingVertical: 10, fontSize: 12 }}>
                            Tambahan
                        </Text> */}
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                {this.contentTambahanBagasi(index + 1)}

                            </View>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                {this.contentTambahanMakanan(index + 1)}
                            </View>
                        </View>

                    </View>
                </View>
            )
        })

        var contentProduct = <View></View>

        var dataDeparture = <View />
        var dataReturn = <View />
        dataDeparture = <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    style={{ width: 32, height: 32, marginRight: 10, borderRadius: 16 }}
                    resizeMode="contain"
                    source={{ uri: this.state.resultVia.data.detail.onwardFlight.flight[0].image }}
                />
                <View>
                    <Text caption1>
                        {this.state.resultVia.data.detail.onwardFlight.flight[0].name}
                    </Text>
                    <Text caption2>
                        {this.state.resultVia.data.detail.onwardFlight.flight[0].departure.code} -
                        {this.state.resultVia.data.detail.onwardFlight.flight[0].arrival.code} |
                        {this.state.resultVia.data.detail.onwardFlight.flight[0].arrival.date} |
                        {this.state.resultVia.data.detail.onwardFlight.flight[0].arrival.time}
                        {/* {this.convertDateText(this.state.selectDataDeparture.flight_schedule[0].departure_date)} | 
                                        {this.state.selectDataDeparture.flight_schedule[0].departure_time} | */}
                    </Text>
                </View>
            </View>
            <View
                style={{ flexDirection: "row", alignItems: "flex-end" }}
            >
                <Text caption2 semibold primaryColor>
                    Departure
                </Text>
            </View>
        </View>



        if (this.state.resultVia.data.detail.returnFlight != null) {
            dataReturn = <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        style={{ width: 32, height: 32, marginRight: 10, borderRadius: 16 }}
                        resizeMode="contain"
                        source={{ uri: this.state.resultVia.data.detail.returnFlight.flight[0].image }}
                    />
                    <View>
                        <Text caption1>
                            {this.state.resultVia.data.detail.returnFlight.flight[0].name}
                        </Text>
                        <Text caption2>
                            {this.state.resultVia.data.detail.returnFlight.flight[0].departure.code} -
                            {this.state.resultVia.data.detail.returnFlight.flight[0].arrival.code} |
                            {this.state.resultVia.data.detail.returnFlight.flight[0].arrival.date} |
                            {this.state.resultVia.data.detail.returnFlight.flight[0].arrival.time}
                            {/* {this.convertDateText(this.state.selectDataDeparture.flight_schedule[0].departure_date)} | 
                                            {this.state.selectDataDeparture.flight_schedule[0].departure_time} | */}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                >
                    <Text caption2 semibold primaryColor>
                        Return
                    </Text>
                </View>
            </View>
        }

        contentProduct = <View><FlightPlan
            round={this.state.param.IsReturn}
            fromCode={this.state.param.Origin}
            toCode={this.state.param.Destination}
            from={this.state.param.bandaraAsalLabel}
            to={this.state.param.bandaraTujuanLabel}
        />


            {dataDeparture}
            {dataReturn}

        </View>





        var contentPrice = <View></View>
        var contentCicil = <View></View>
        var contentDiscount = <View></View>





        contentDiscount = <View style={{ flexDirection: 'column', paddingLeft: 20, paddingRight: 20 }} >
            {
                this.state.pointUser == true ?
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 numberOfLines={1} style={{ color: BaseColor.thirdColor }}>
                                    Potongan Point
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1} style={{ color: BaseColor.thirdColor }} >
                                {'IDR ' + priceSplitter(this.state.discountPoint)}
                            </Text>
                        </View>
                    </View>
                    :
                    <View />
            }

            {
                this.state.discountCoupon != 0 ?
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 numberOfLines={1} style={{ color: BaseColor.thirdColor }}>
                                    Potongan Kupon
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1} style={{ color: BaseColor.thirdColor }} >
                                {'IDR ' + priceSplitter(this.state.discountCoupon)}
                            </Text>
                        </View>
                    </View>
                    :
                    <View />
            }

        </View>





        contentPrice = <View>
            <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 grayColor numberOfLines={1}>
                                Jumlah Pembayaran
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                        <Text caption1 semibold numberOfLines={1}>
                            {'IDR ' + priceSplitter(this.state.dataCount.subtotal)}
                        </Text>
                    </View>
                </View>

            </View>



            {/* <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Insurance
                                </Text>

                            </View>
                        </View>
                        <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                {'IDR ' + priceSplitter(this.state.dataCount.insurance_total)}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}
                    >
                        <Switch name="angle-right"
                            size={18}
                            onValueChange={this.toggleSwitchInsurance}
                            value={this.state.remindersInsurance}
                        />
                    </View>
                </View> */}

            {contentDiscount}

            <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 grayColor numberOfLines={1}>
                                Pajak dan Lainnya
                            </Text>

                        </View>
                    </View>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                        <Text caption1 semibold numberOfLines={1}>
                            {'IDR ' + priceSplitter(this.state.dataCount.tax)}
                        </Text>
                    </View>
                </View>
            </View>

            {
                this.state.dataCount.addon != 0 ?

                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text caption2 grayColor numberOfLines={1}>
                                        Tambahan
                                    </Text>

                                </View>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                                <Text caption1 semibold numberOfLines={1}>
                                    {'IDR ' + priceSplitter(this.state.dataCount.addon)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View />
            }

            <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 grayColor numberOfLines={1}>
                                Total
                            </Text>

                        </View>
                    </View>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                        <Text caption1 semibold numberOfLines={1}>
                            {'IDR ' + priceSplitter(this.state.dataCount.total)}
                        </Text>
                    </View>
                </View>
            </View>



        </View>



        var contentBiayaPenanganan = <View />
        if (this.state.param.total == 0) {
            var contentBiayaPenanganan = <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 grayColor numberOfLines={1}>
                                Biaya Penanganan
                            </Text>

                        </View>
                    </View>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                        <Text caption1 semibold numberOfLines={1}>
                            {'IDR ' + priceSplitter(10000)}
                        </Text>
                    </View>
                </View>
            </View>
        }


        var contentButton = <View style={{ padding: 20, borderRadius: 8, width: "100%", marginBottom: 50 }}>
            <TouchableOpacity disabled={this.state.disabledButton} onPress={() => {
                this.onSubmit()
            }} >
                <View pointerEvents='none' style={styles.groupinput}>
                    <Button
                        loading={this.state.loading}
                        style={{ backgroundColor: this.state.colorButton }}
                        full
                    >
                        <Text style={{ color: this.state.colorButtonText }}>Book Now</Text>
                    </Button>
                </View>
            </TouchableOpacity>
        </View>


        var labeldetail = 'Detail Penumpang';
        if (param.type != 'flight') {
            labeldetail = 'Detail Treveller';
        }

        var contents = <View />
        if (login == true) {
            contents = <ScrollView>
                <View style={styles.contain}>
                    {contentProduct}
                    <View style={styles.line} />
                    {/* --------------------------------- */}

                    <Text caption2 style={{ paddingVertical: 10, fontSize: 12 }}>
                        Detail Pemesan
                    </Text>
                    {contentFormCustomer}
                    {
                        this.state.error_form_customer ?
                            <View style={{ flexDirection: 'row', marginTop: -10 }} >
                                <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                                    <View>
                                        <Text caption2 numberOfLines={1} style={{ color: 'red' }}>
                                            Pastikan Detail Pemesan terisi semua, harap cek kembali
                                        </Text>

                                    </View>
                                </View>

                            </View>
                            :
                            <View />
                    }

                    {/* <View style={{ flexDirection: 'row' }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Order Sebagai Pengguna Lain
                                </Text>

                            </View>
                        </View>
                        <View
                            style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}
                        >
                            <Switch name="angle-right"
                                size={14}
                                onValueChange={this.toggleSwitchOtherUser}
                                value={this.state.remindersOtherUser}
                            />
                        </View>
                    </View> */}
                    <View style={styles.line} />


                    {/* --------------------------------- */}

                    <Text caption2 style={{ paddingVertical: 10, fontSize: 12 }}>
                        {labeldetail}
                    </Text>
                    <View style={styles.profileItem}>
                        <Text caption2>Sama dengan pemesan</Text>
                        <Switch name="angle-right"
                            size={14}
                            onValueChange={this.toggleSwitch}
                            value={this.state.reminders}
                        />
                    </View>
                    {contentformParticipant}



                    {contentFormCoupon}
                    {
                        this.state.couponCodeList.length == 0 ? <View /> : <View style={styles.line} />
                    }
                    {
                        this.state.loadingPoint == true ?
                            <View />
                            :
                            contentFormPoint
                    }

                </View>
                {contentPrice}
                {contentBiayaPenanganan}
                {contentButton}
            </ScrollView>
        } else {
            contents = <NotYetLogin redirect={'SummaryVia'} navigation={navigation} param={this.props.navigation.state.params.param} />

        }
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >


                <Header
                    title="Booking"
                    subTitle={param.typeLabel}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}

                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="reload-outline"
                    //             size={20}
                    //             color={BaseColor.whiteColor}
                    //         />

                    //     );
                    // }}

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
                        //this.props.navigation.goBack(null);
                        navigation.goBack();
                    }}

                    // onPressRight={() => {
                    //     var redirect = 'Summary';
                    //     var param = this.state.paramAll;
                    //     console.log('paramSummary', JSON.stringify(param));
                    //     navigation.navigate("Loading", { redirect: redirect, param: param });
                    // }}

                    onPressRightSecond={() => {
                        var redirect = 'Home';
                        var param = {};
                        navigation.navigate("Loading", { redirect: redirect, param: param });
                    }}
                />
                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
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
                                        source={loading_spinner_file}
                                        animationStyle={{ width: 250, height: 250 }}
                                        speed={1}
                                    />
                                    <Text>
                                        {loading_spinner_title}
                                    </Text>
                                </View>
                            </View>
                            :
                            contents
                    }


                    <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={2000} />
                </View>
            </SafeAreaView>
        );
    }
}
