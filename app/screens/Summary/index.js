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
import ImageSize from 'react-native-image-size';
import NotYetLogin from "../../components/NotYetLogin";
import FastImage from 'react-native-fast-image';
import { DataMasterDiskon } from "@data";


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
        marginBottom: 15,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: BaseColor.fieldColor,
        padding: 5,
    },
    searchIcon: {
        flex: 1,
        padding: 10,
    },
});

export default class Summary extends Component {
    constructor(props) {
        super(props);




        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var paramAll = [];
        if (this.props.navigation.state.params.param) {
            paramAll = this.props.navigation.state.params.param;
        }
        console.log('paramAlls', JSON.stringify(paramAll));


        //------------------------parameter untuk flight------------------------//
        var selectDataDeparture = paramAll.selectDataDeparture;
        var selectDataReturn = paramAll.selectDataReturn;
        var departurePost = paramAll.departurePost;
        var returnPost = paramAll.returnPost;


        var dataPrice = {
            required_dob: false,
            required_passport: false,
            total_price: 0,
            nett_price: 0,
            insurance_total: 0,
            transaction_fee: 0
        };
        dataPrice = paramAll.dataPrice;

        var productBooking = paramAll.productBooking;

        //------------------------parameter inti------------------------//
        var product = paramAll.product;
        var productPart = paramAll.productPart;
        var param = paramAll.param;

        if (param.type == "hotelpackage") {
            param.typeLabel = "Hotel Package";
        } else if (param.type == "trip") {
            param.typeLabel = "Trip";
        } else if (param.type == "flight") {
            param.typeLabel = "Flight";
        } else if (param.type == "activities") {
            param.typeLabel = "Activities";
        } else if (param.type == "hotelLinx") {
            param.typeLabel = "Hotel Reservasi";
        }

        console.log('product', JSON.stringify(product));
        console.log('param', JSON.stringify(param));
        console.log('product', JSON.stringify(product));
        console.log('productPart', JSON.stringify(productPart));

        //------------------------parameter inti------------------------//
        var jumlahPenumpang = param.Qty;
        var arrOldGuest = this.convertOld(param);

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

            dataPrice: dataPrice,
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
            loadingCheckCoupon: false,
            loadingPoint: true,
            biayaPenanganan: false,
            biayaPenangananValue: 10000,
            DataMasterDiskon: DataMasterDiskon[0],


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

    count() {


        let config = this.state.configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "booking/count";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);



        // let config = JSON.parse(result);
        // let url=config.apiBaseUrl+"booking/count";

        let param = this.state.param;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.tokenMDIAccess);

        var raw = JSON.stringify({
            "product": "flight",
            "key": param.key,
            "point": this.state.usePointUser,
            "insurance": this.state.remindersInsurance,
            "coupon": [],
            "paymentMethod": 1,
            "platform": "app"
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
                this.setState({ loading_spinner: false });
                //var dataPrice=result.data;

                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: result.data.total,
                    subtotal_price: result.data.subtotal,
                    nett_price: result.data.subtotal,
                    iwjr: result.data.iwjr,
                    insurance_total: result.data.insurance,
                    transaction_fee: result.data.fee,
                    tax_fee: result.data.tax,
                    point_user: result.data.point
                }

                console.log('countResult', JSON.stringify(dataPrice));
            })
            .catch(error => console.log('error', error));


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

    getProfile() {
        let userSession = this.state.userSession;
        let password = this.state.password;
        this.setState({ loadingPoint: true }, () => {


            let config = this.state.configApi;
            let baseUrl = config.baseUrl;
            let url = baseUrl + "front/api_new/user/profile";
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);


            // let config = JSON.parse(result);
            // var url=config.baseUrl;
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
                .catch(error => { alert('Kegagalan Respon Server'); });

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

    totalPrice() {
        let { param, product, productPart, discount, insurance, id_coupon, id_coupon_history, config } = this.state;
        console.log('paramintotalPrice', JSON.stringify(param));
        var total_price = 0;

        param.tax = 0;
        param.subtotal = param.totalPrice;
        param.discount = discount;
        param.insurance = insurance;
        param.id_coupon = id_coupon;
        param.id_coupon_history = id_coupon_history;
        param.tokenMDI = config.apiToken;

        if (this.state.discount >= param.totalPrice) {
            param.total = 0;

        } else {
            //param.total=parseInt(param.subtotal)+parseInt(param.tax)+parseInt(param.insurance)-parseInt(param.discount);
            param.total = parseInt(param.subtotal) - parseInt(param.discount);

        }
        this.setState({ param: param });
        setTimeout(() => {
            console.log('paramTotalPrice', JSON.stringify(this.state.param));

        }, 50);

        if (param.type == 'trip') {
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: total_price,
                    nett_price: 0,
                    insurance_total: 0,
                    transaction_fee: 0
                };
                this.setState({ dataPrice: dataPrice });
                this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataPrice.transaction_fee) });
            });
        } else if (param.type == 'hotelpackage') {
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: total_price,
                    nett_price: 0,
                    insurance_total: 0,
                    transaction_fee: 0
                };
                this.setState({ dataPrice: dataPrice });
                this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataPrice.transaction_fee) });
            });
        } else if (param.type == 'hotelLinx') {
            console.log('paramHotelLinx', JSON.stringify(param));
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: total_price,
                    nett_price: 0,
                    insurance_total: 0,
                    transaction_fee: 0
                };
                this.setState({ dataPrice: dataPrice });
                this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataPrice.transaction_fee) });
            });
        } else if (param.type == 'activities') {
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: total_price,
                    nett_price: 0,
                    insurance_total: 0,
                    transaction_fee: 0
                };
                this.setState({ dataPrice: dataPrice });
                this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataPrice.transaction_fee) });
            });
        } else if (param.type == 'flight') {
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });
                var departurePost = this.removePrice(this.state.selectDataDeparture);
                var returnPost = this.removePrice(this.state.selectDataReturn);
                this.setState({ total_all: this.state.dataPrice.total_price });
            });
        } else {
            this.setState({ loading_spinner: true }, () => {
                this.setState({ loading_spinner: false });

                var dataPrice = {
                    required_dob: false,
                    required_passport: false,
                    total_price: total_price,
                    nett_price: 0,
                    insurance_total: 0,
                    transaction_fee: 0
                };
                this.setState({ dataPrice: dataPrice });
                this.setState({ total_all: parseInt(param.totalPrice) + parseInt(dataPrice.transaction_fee) });

            });

        }

    }

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


        // let config = JSON.parse(result);
        // var access_token=config.token;
        // var path=config.common_type_flight.dir;
        // var url=config.baseUrl;
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

                alert('Kegagalan Respon Server')
            });


    }

    setTitle(title) {
        this.setState({ title: title });
    }

    submitOrder() {
        var param = this.state.param;

        var customer = this.state.listdata_customer;
        var product = this.state.product;
        var guest = this.state.listdata_participant;
        var param = this.state.param;
        var dataPrice = this.state.dataPrice;
        var productPart = this.state.productPart;
        var productBooking = this.state.productBooking;

        var participant = [];
        var a = 1;
        guest.map(item => {
            var obj = {};
            obj['key'] = a,
                obj['label'] = 'Penumpang ' + a + ' = ' + item['old'],
                obj['old'] = item['old'],
                obj['fullname'] = item['fullname'],
                obj['firstname'] = item['firstname'],
                obj['lastname'] = item['lastname'],
                obj['birthday'] = item['birthday'],
                obj['nationality'] = item['nationality'],
                obj['passport_number'] = item['passport_number'],
                obj['passport_country'] = item['passport_country'],
                obj['passport_expire'] = item['passport_expire'],
                obj['phone'] = item['phone'],
                obj['title'] = item['title'],
                obj['email'] = item['email'],
                obj['nationality_id'] = item['nationality_id'],
                obj['nationality_phone_code'] = item['nationality_phone_code'],
                obj['passport_country_id'] = item['passport_country_id']

            participant.push(obj);
            a++;
        });
        var dataCart = {
            "departure_date": param.DepartureDate,
            "product": product,
            "product_part": productPart,
            "product_booking": productBooking,
            "pax": [
                {
                    "departure_baggage": 0,
                    "return_baggage": 0,
                    "loyalty_number": [],
                    "type": "ADT",
                    "type_name": "Adult",
                    "title": customer[0].title,
                    "first_name": customer[0].firstname,
                    "last_name": customer[0].lastname,
                    "dob": customer[0].birthday,
                    "nationality_code": customer[0].nationality_id,
                    "nationality_name": customer[0].nationality,
                    "identity_type": "passport",
                    "identity_type_name": customer[0].nationality,
                    "identity_number": customer[0].passport_number,
                    "identity_expired_date": customer[0].passport_expire,
                    "identity_issuing_country_code": customer[0].passport_country_id,
                    "identity_issuing_country_name": customer[0].passport_country_id
                }
            ],
            "international": false,
            "detail_price": [
                {
                    "total_tax": 0,
                    "type": "",
                    "segment": "",
                    "total_price": this.state.total_all,
                    "nett_price": 0,
                    "commission_percent": 0,
                    "commission_amount": 0,
                    "insurance_code": null,
                    "insurance_name": null,
                    "insurance_company": null,
                    "insurance_program": null,
                    "insurance_fee": 0,
                    "insurance_total": 0,
                    "transaction_fee": 0,
                }
            ],
            "id": "",
            "adult": param.Adults,
            "child": param.Children,
            "infant": param.Infants,
            "nett_price": 0,
            "discount": 0,
            "total_price": this.state.total_all,
            "insurance_total": 0,
            "transaction_fee": 0,
            "time_limit": "2020-09-01T11: 37: 27",
            "contact": {
                "title": customer[0].title,
                "first_name": customer[0].firstname,
                "last_name": customer[0].lastname,
                "country_id": customer[0].nationality_id,
                "country_name": customer[0].nationality,
                "phone_code": customer[0].nationality_phone_code,
                "phone_number": customer[0].phone,
                "email": customer[0].email
            },
            "participant": participant,
            "typeProduct": "hotelLinx"
        }
        var cartToBeSaved = dataCart;
        console.log('cartToBeSavedHotelLinx', JSON.stringify(cartToBeSaved));
        this.onSubmitOrder(cartToBeSaved);

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
            this.submitOrder();
        }





    }

    onSubmitOrder(cartToBeSaved) {
        const { DataMasterDiskon } = this.state;
        var item = cartToBeSaved;
        this.setState({ loading_spinner_file: require("app/assets/loader_wait.json") });
        this.setState({ loading_spinner_title: 'Create Order' });

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/OrderSubmit/submit";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        // let config = JSON.parse(result);
        // var access_token=config.token;
        //var midtransMethod=config.midtransMethod;
        // var path=config.user_order_submit.dir;
        // var url=config.baseUrl;
        // console.log('urlSubmit',url+path);

        var param = this.state.param;
        param.discountCoupon = this.state.discountCoupon;
        param.discountPoint = this.state.discountPoint;
        param.platform = Platform.OS;
        var dataCartArrayRealSend = {
            //"token":access_token,
            "status": DataMasterDiskon.status,
            "id_user": this.state.id_user,
            "dataCart": item,
            "type": this.state.param.type,
            "tokenFirebase": this.state.tokenFirebase,
            "fee": 0,
            "insurance": this.state.insurance_included,
            "param": param,
            "otherUser": this.state.otherUser,
            "couponCodeList": this.state.couponCodeList
        }

        console.log("---------------data cart array cart kirim  ------------");
        console.log(JSON.stringify(dataCartArrayRealSend));
        console.log(url, JSON.stringify(dataCartArrayRealSend));





        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify(dataCartArrayRealSend);
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
                this.updateUserSession();
                var dataOrderSubmit = result;

                var redirect = 'Pembayaran';
                var id_order = dataOrderSubmit.id_order;

                var param = {
                    id_order: id_order,
                    dataPayment: {},
                    back: ''
                }
                this.props.navigation.navigate("Pembayaran", { param: param });


            })
            .catch(error => {
                alert('Kegagalan Respon Server')
            });




    }

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

    saveParticipants(
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
        console.log('config', JSON.stringify(config));
        //alert('asdss');
        //var url=config.baseUrl;

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant_update";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        //var path=config.user_participant_save.dir;

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

        // console.log('url+path',url+path);
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTimeout(() => {
                    this.validation();
                }, 50);


            })
            .catch(error => {

                alert('Kegagalan Respon Server')
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

    checkParticipant(id_user, title, firstname, lastname) {

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant_check";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=okaepmldisibk8nnb05ktaa7nvft3kn8");

        var param = {
            "param": {
                "id": "",
                "id_user": id_user,
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

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('checkParticipant',JSON.stringify(result));
                return result;
            })
            .catch(error => {
                console.log('error', 'eRROR');
            });
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

                            let response = await fetch("https://masterdiskon.com/front/api_new/user/participant_check", requestOptions);
                            let json = await response.json();
                            console.log('checkParticipantxxx', JSON.stringify(json));

                            // console.log('countPersons',countPersons.length);
                            var id = 0;
                            if (json.length != 0) {
                                id = json[0].id_passenger;
                            }

                            console.log('setDataParticipantxx', JSON.stringify(resultParsed));
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
                            console.log('newProjectsxxx', JSON.stringify(newProjects));

                            AsyncStorage.setItem('setDataParticipant', JSON.stringify(newProjects));
                            this.setState({ listdata_participant: newProjects });
                            // setTimeout(() => {
                            //     console.log('listdata_participant',JSON.stringify(this.state.listdata_participant));
                            // }, 200);



                            this.saveParticipants(
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



                            // setTimeout(() => {
                            //     console.log('listdata_participant',JSON.stringify(this.state.listdata_participant));
                            // }, 50);

                        } catch (error) {
                            console.error('ERROR', 'error');
                        }
                    };
                    checkParticipant();
                    //   setTimeout(() => {
                    //     checkParticipant();
                    //   }, 20);




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

    useCoupon(item) {

        const { userSession, param, couponCode, discount, couponCodeList, product } = this.state;
        console.log('useCoupon', JSON.stringify(item));
        console.log('paramUseCoupn', JSON.stringify(param));

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/product/useCoupon";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

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
        //var url = "https://masterdiskon.com/front/api_new/product/useCoupon";


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
                        this.totalPrice();
                        console.log('discount', this.state.discount);
                        console.log('couponCodeList', JSON.stringify(this.state.couponCodeList));
                    }, 50);

                } else {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                }

            })
            .catch(error => { alert('Kegagalan Respon Server'); });
        //this.setState({couponCode:item.coupon_code});
    }

    useCouponForm(couponCode) {
        const { navigation } = this.props;
        const { userSession, param, discount, couponCodeList, product } = this.state;
        console.log('product', JSON.stringify(product));
        console.log('param', JSON.stringify(param));



        this.setState({ loadingCheckCoupon: true });
        console.log('discount', discount);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=t8rooel5ugjfvjll6fv4fu0b7b1nif93");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var paramCode = "code=" + couponCode.toLowerCase();
        var paramTotal = "&total=" + param.total;
        var paramProduct = "&product=" + param.type;
        var paramIdUser = "&id_user=" + userSession.id_user;
        var paramPlatform = "&platform=app";
        var paramId = param.type == 'hotelLinx' ? "&id=" + product.id : "&id=";
        var from = param.type == 'hotelLinx' ? "&from=" + param.city : "&from=" + param.bandaraAsalCode;
        var to = param.type == 'hotelLinx' ? "&to=" : "&to=" + param.bandaraTujuanCode;

        var paramUrl = paramCode + paramTotal + paramProduct + paramIdUser + paramPlatform + paramId + from + to;
        console.log('paramCouponForm', JSON.stringify(paramUrl));

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/page/coupon/get_coupon_detail?" + paramUrl;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        //var url = "https://masterdiskon.com/front/page/coupon/get_coupon_detail?" + paramUrl;


        console.log('urlcheckCoupon', url);
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('checkCoupon', JSON.stringify(result));
                this.setState({ loadingCheckCoupon: false });
                if (result.status == "success") {

                    const arrayIncludesInObj = (arr, key, valueToCheck) => {
                        return arr.some(value => value[key] === valueToCheck);
                    }

                    const found = arrayIncludesInObj(couponCodeList, "couponCode", this.state.couponCode); // true
                    if (found == false) {
                        this.setState({ discount: parseInt(discount) + parseInt(result.res.amount) });
                        couponCodeList.push({
                            couponCode: result.res.coupon_code,
                            couponName: result.res.coupon_name,
                            couponAmount: result.res.amount,
                            couponIdHistory: "",
                            couponId: result.res.id_coupon,
                            from: param.type == 'hotelLinx' ? param.city : param.bandaraAsalCode,
                            to: param.type == 'hotelLinx' ? "" : param.bandaraTujuanCode
                        });

                        var discountCoupon = 0;
                        couponCodeList.map(item => {
                            discountCoupon += parseInt(item.couponAmount);
                        });

                        this.setState({ discountCoupon: discountCoupon });
                        this.setState({ couponCodeList: couponCodeList });



                    }

                    //this.setState({couponCode:"Pilih Kupon"});
                    setTimeout(() => {
                        this.totalPrice();
                        console.log('discount', this.state.discount);
                        console.log('couponCodeList', JSON.stringify(this.state.couponCodeList));
                    }, 50);
                } else {
                    //this.setState({couponCode:"Pilih Kupon"});
                    console.log('resultCheckCoupon', JSON.stringify(result));
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                }


            })
            .catch(error => {

            });

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
        //     this.totalPrice();
        // }, 50);
        // console.log('couponsummary',JSON.stringify(data));
        //  }
    }

    checkCoupon() {

        const { navigation } = this.props;
        const { userSession, param, couponCode, discount, couponCodeList, product } = this.state;
        console.log('product', JSON.stringify(product));

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/page/coupon/get_coupon_detail?" + paramUrl;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        this.setState({ loadingCheckCoupon: true });
        console.log('discount', discount);
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "ci_session=t8rooel5ugjfvjll6fv4fu0b7b1nif93");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var paramCode = "code=" + couponCode.toLowerCase();
        var paramTotal = "&total=" + param.total;
        var paramProduct = "&product=" + param.type;
        var paramUrl = paramCode + paramTotal + paramProduct;
        //var url = "https://masterdiskon.com/front/page/coupon/get_coupon_detail?" + paramUrl;


        console.log('urlcheckCoupon', url);
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('checkCoupon', JSON.stringify(result));
                this.setState({ loadingCheckCoupon: false });
            })
            .catch(error => {
            });
    }

    getCouponDetail() {
        const { navigation } = this.props;
        const { userSession, param } = this.state;
        navigation.navigate('SelectCoupon', { userSession: userSession, param: param, useCoupon: this.useCoupon, useCouponForm: this.useCouponForm });

    }

    componentDidMount() {

        var param = this.state.param;
        var typeProduct = param.type;
        var typeFlight = this.state.typeFlight;
        //console.log('');
        //this.setState({ reminders: true });

        // if(typeFlight=='flight' || typeProduct=='hotelLinx'){
        //     this.setState({ reminders: true });
        //     console.log('reminder true');
        // }

        this.totalPrice();

        if (param.type == 'flight') {
            this.typeFlight();
        }

        let dtDefPassportExpired = new Date();
        dtDefPassportExpired = this.addDate(dtDefPassportExpired, +3, 'days');
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

            participant.push(obj)
        }
        AsyncStorage.setItem('setDataParticipant', JSON.stringify(participant));
        this.setState({ listdata_participant: participant });

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

    toggleSwitchInsurance = value => {
        var param = this.state.param;
        this.setState({ remindersInsurance: value });
        if (value == true) {
            var total_all = parseInt(this.state.dataPrice.total_price) + parseInt(this.state.dataPrice.insurance_total);
            this.setState({ total_all: total_all });
            this.setState({ insurance_included: true });
            param.insurance = this.state.dataPrice.insurance_total;
            param.total = parseInt(param.subtotal) + parseInt(param.tax) + parseInt(param.insurance) - parseInt(param.discount);
            this.setState({ param: param });
        } else {
            var total_all = parseInt(this.state.dataPrice.total_price);
            this.setState({ total_all: total_all });
            this.setState({ insurance_included: false });

            param.insurance = 0;
            param.total = parseInt(param.subtotal) + parseInt(param.tax) + parseInt(param.insurance) - parseInt(param.discount);
            this.setState({ param: param });
        }


    };

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
            this.totalPrice();
        }, 50);

    };

    usePoint() {
        const { param } = this.state;

        this.setState({ discount: parseInt(this.state.discount) + parseInt(this.state.discountCoupon) });
        this.setState({ param: param });
        setTimeout(() => {
            console.log('discount', this.state.discount);
            this.totalPrice();
        }, 50);
    }

    usePointCancel() {
        const { param } = this.state;

        this.setState({ discount: parseInt(this.state.discount) + parseInt(this.state.discountCoupon) });
        this.setState({ param: param });
        setTimeout(() => {
            this.totalPrice();
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
            this.totalPrice();
            console.log('couponCodeList', JSON.stringify(this.state.couponCodeList));
        }, 50);
    };

    render() {
        const { navigation } = this.props;
        let { couponCodeList, param, product, productPart, selectDataDeparture, selectDataReturn, dataPrice, packageItem, packageItemDetail, loading, loading_spinner, userData, loading_spinner_file, loading_spinner_title, login } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        const { flights, refreshing, clampedScroll } = this.state;

        const contentCodeCouponList = this.state.couponCodeList.map((item) => {
            return (
                <View style={{ flexDirection: 'row', marginBottom: 3, justifyContent: "space-between" }}>
                    <Text caption2 style={{ fontStyle: 'italic', color: BaseColor.primaryColor }}>({item.couponCode}) - (Rp {priceSplitter(item.couponAmount)})</Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 3, backgroundColor: BaseColor.thirdColor }}
                        onPress={() => {

                            this.removeItem(this.state.couponCodeList, "couponCode", item);
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




        const contentFormCustomer = this.state.listdata_customer.map((item) => {
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


        const contentformParticipant = this.state.listdata_participant.map((item) => {
            return (
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
                                dataPrice: this.state.dataPrice


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
            )
        })

        var contentProduct = <View></View>
        if (this.state.param.type == 'trip') {
            contentProduct = <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <View>
                        <Image
                            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 16 }}
                            resizeMode="cover"
                            source={{ uri: this.state.product.img_featured_url }}
                        />
                    </View>
                </View>
                <View style={{ flex: 9 }}>

                    <View>
                        <View>
                            <Text caption1>
                                {this.state.product.product_name}
                            </Text>
                            <Text caption2>
                                {this.state.product.product_detail.country_name}
                            </Text>
                            <Text caption2 style={{ color: BaseColor.primaryColor }}>
                                {this.convertDateDDMY(param.DepartureDate)}

                            </Text>
                            <Text caption2>
                                {param.minPerson} x Rp {priceSplitter(param.minPrice)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        } else if (this.state.param.type == 'hotelpackage') {
            contentProduct = <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <View>
                        <Image
                            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 16 }}
                            resizeMode="cover"
                            source={{ uri: this.state.product.img_featured_url }}
                        />
                    </View>
                </View>
                <View style={{ flex: 9 }}>

                    <View>
                        <View>
                            <Text caption1>
                                {this.state.product.product_name}
                            </Text>
                            <Text caption2>
                                {this.state.productPart.detail_name}
                            </Text>
                            <Text caption2 style={{ color: BaseColor.primaryColor }}>
                                {this.convertDateDDMY(param.DepartureDate)}

                            </Text>
                            <Text caption2>
                                {param.Qty} Room
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        } else if (this.state.param.type == 'hotelLinx') {
            contentProduct = <View style={{ flexDirection: 'row', flex: 10 }}>
                <View style={{ flex: 3, flexDirection: "row" }}>
                    <View>

                        <Image
                            source={this.state.img_featured}
                            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 16 }}
                            resizeMode="cover"
                            onLoad={evt => {
                                ImageSize.getSize(this.state.product.img_featured_url)
                                    .then(size => {
                                        this.setState({ img_featured: { uri: this.state.product.img_featured_url } });

                                    })
                                    .catch(error => {
                                        //handle Error
                                        console.log('kosong');
                                        this.setState({ img: { uri: 'https://bitsofco.de/content/images/2018/12/broken-1.png' } });

                                    })
                            }
                            }
                        />
                    </View>
                </View>
                <View style={{ flex: 9 }}>

                    <View>
                        <View>
                            <Text body2 bold>
                                {this.state.product.product_name}
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Kamar
                                </Text>
                                <Text caption2>
                                    {this.state.productPart.detail_name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Lama menginap
                                </Text>
                                <Text caption2>
                                    {param.noofnights} malam
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Fasilitas
                                </Text>
                                <Text caption2>
                                    {productPart.MealName}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Orang
                                </Text>
                                <Text caption2>
                                    {param.adults} Dewasa, {param.child} Anak
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Checkin
                                </Text>
                                <Text caption2>
                                    {this.convertDateDDMY(param.DepartureDate)}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text caption2>
                                    Checkout
                                </Text>
                                <Text caption2>
                                    {this.convertDateDDMY(param.ReturnDate)}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>

        } else if (this.state.param.type == 'activities') {
            contentProduct = <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <View>
                        <Image
                            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 16 }}
                            resizeMode="cover"
                            source={{ uri: this.state.product.img_featured_url }}
                        />
                    </View>
                </View>
                <View style={{ flex: 9 }}>

                    <View>
                        <View>
                            <Text caption1>
                                {this.state.product.product_name}
                            </Text>
                            <Text caption2>
                                {this.state.productPart.detail_name}
                            </Text>
                            <Text caption2 style={{ color: BaseColor.primaryColor }}>
                                {this.convertDateDDMY(param.DepartureDate)}
                            </Text>
                            <Text caption2>
                                {param.Qty} Pax / voucher
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        } else if (this.state.param.type == 'flight') {
            var dataDeparture = <View />
            var dataReturn = <View />
            dataDeparture = <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        style={{ width: 32, height: 32, marginRight: 10, borderRadius: 16 }}
                        resizeMode="contain"
                        source={{ uri: this.state.selectDataDeparture.flight_schedule[0].airline_logo.includes("https") ? this.state.selectDataDeparture.flight_schedule[0].airline_logo : 'https:' + this.state.selectDataDeparture.flight_schedule[0].airline_logo }}
                    />
                    <View>
                        <Text caption1>
                            {this.state.selectDataDeparture.name}
                        </Text>
                        <Text caption2>

                            {this.state.selectDataDeparture.flight_schedule[0].from} -
                            {this.state.selectDataDeparture.flight_schedule[0].to} |
                            {this.convertDateText(this.state.selectDataDeparture.flight_schedule[0].departure_date)} |
                            {this.state.selectDataDeparture.flight_schedule[0].departure_time} |

                            {/* {this.state.selectDataDeparture.detail.flight[0].departure.code} - 
                                            {this.state.selectDataDeparture.detail.flight[0].arrival.code} | 
                                            {this.state.selectDataDeparture.detail.flight[0].arrival.date} | 
                                            {this.state.selectDataDeparture.detail.flight[0].arrival.time}
                                             */}


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



            var dataReturn = null;
            if (this.state.selectDataReturn) {
                dataReturn = <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            style={{ width: 32, height: 32, marginRight: 10, borderRadius: 16 }}
                            resizeMode="contain"
                            source={{ uri: this.state.selectDataReturn.flight_schedule[0].airline_logo.includes("https") ? this.state.selectDataReturn.flight_schedule[0].airline_logo : 'https:' + this.state.selectDataReturn.flight_schedule[0].airline_logo }}
                        />
                        <View>
                            <Text caption1>
                                {this.state.selectDataReturn.flight_schedule[0].airline_name}
                            </Text>
                            <Text caption2>
                                {this.state.selectDataReturn.flight_schedule[0].from} -
                                {this.state.selectDataReturn.flight_schedule[0].to} |
                                {this.convertDateText(this.state.selectDataReturn.flight_schedule[0].departure_date)}
                                {this.state.selectDataReturn.flight_schedule[0].departure_time}
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


        } else {

            contentProduct = <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

                    <View>
                        <FastImage
                            style={{ width: 70, height: 70, marginRight: 10, borderRadius: 16 }}
                            source={this.state.img}
                            resizeMode={FastImage.resizeMode.stretch}
                            cacheControl={FastImage.cacheControl.cacheOnly}
                            resizeMethod={'scale'}
                            onLoad={evt => {
                                this.setState({
                                    img: {
                                        uri: this.state.product.img_featured_url,
                                        headers: { Authorization: 'someAuthToken' },
                                        priority: FastImage.priority.normal,
                                    }


                                })
                            }
                            }
                        >
                        </FastImage>
                    </View>

                </View>
                <View style={{ flex: 9 }}>

                    <View>
                        <View>
                            <Text caption1>
                                {this.state.product.product_name}
                            </Text>
                            <Text caption2>
                                {this.state.productPart.detail_name}
                            </Text>
                            <Text caption2 style={{ color: BaseColor.primaryColor }}>
                                {this.convertDateDDMY(param.DepartureDate)}
                            </Text>
                            <Text caption2>
                                {param.Qty} Pax
                            </Text>
                        </View>
                    </View>
                </View>
            </View>


        }


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






        if (this.state.param.type == 'trip') {
            contentCicil = <View style={{ paddingVertical: 10, paddingHorizontal: 10, }}>
                <View style={{
                    borderColor: BaseColor.greyColor,
                    borderStyle: "dashed",
                    borderRadius: 8,
                    borderWidth: 1
                }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text caption2 grayColor numberOfLines={1}>
                                        Pembayaran 1
                                    </Text>

                                </View>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text caption1 semibold numberOfLines={1}>
                                    {'IDR ' + priceSplitter(parseInt(this.state.total_all) / 2)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                        <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                            <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                <View>
                                    <Text caption2 grayColor numberOfLines={1}>
                                        Pembayaran 2
                                    </Text>

                                </View>
                            </View>
                            <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>
                                <Text caption1 semibold numberOfLines={1}>
                                    {'IDR ' + priceSplitter(parseInt(this.state.total_all) / 2)}
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
            contentPrice = <View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                {'IDR ' + priceSplitter(this.state.dataprice.subtotal)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Tax
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                Include
                            </Text>
                        </View>
                    </View>
                </View>

                {contentDiscount}


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
                                {'IDR ' + priceSplitter(this.state.param.total)}
                            </Text>
                        </View>
                    </View>
                </View>
                {contentCicil}
            </View>
        } else if (this.state.param.type == 'hotelpackage' || this.state.param.type == 'hotelLinx' || this.state.param.type == 'activities') {

            contentPrice = <View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                {'IDR ' + priceSplitter(this.state.param.subtotal)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Tax
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                Include
                            </Text>
                        </View>
                    </View>
                </View>

                {contentDiscount}

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
                                {'IDR ' + priceSplitter(this.state.param.total)}
                            </Text>

                            {/* <Text caption1 semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(this.state.param.total)}
                                </Text> */}
                        </View>
                    </View>
                </View>

            </View>
        } else if (this.state.param.type == 'flight') {
            contentPrice = <View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 5, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                {'IDR ' + priceSplitter(this.state.param.subtotal)}
                            </Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity
                        style={{flex: 2}}
                        onPress={() => {
                            navigation.navigate("PricingTable",{
                                dataPrice:this.state.dataPrice
                            });
                            }
                        }
                    >
                                     <Icon
                                        name="angle-down"
                                        size={18}
                                        color={BaseColor.primaryColor}
                                        style={{ textAlign: "center"}}
                                    />
                    </TouchableOpacity> */}
                </View>



                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
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
                                {'IDR ' + priceSplitter(this.state.dataPrice.insurance_total)}
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
                </View>

                {contentDiscount}

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
                                {'IDR ' + priceSplitter(this.state.param.total)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        } else {
            contentPrice = <View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                {'IDR ' + priceSplitter(this.state.param.subtotal)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5 }} >
                    <View style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View style={{ flex: 6, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <View>
                                <Text caption2 grayColor numberOfLines={1}>
                                    Tax
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 6, justifyContent: "center", alignItems: "flex-end" }}>

                            <Text caption1 semibold numberOfLines={1}>
                                Include
                            </Text>
                        </View>
                    </View>
                </View>

                {contentDiscount}

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
                                {'IDR ' + priceSplitter(this.state.param.total)}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
        }


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
                            <View style={{ flexDirection: 'row', }} >
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
            contents = <NotYetLogin redirect={'Summary'} navigation={navigation} param={this.props.navigation.state.params.param} />

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
                        //this.props.navigation.goBack(null);
                        navigation.goBack();
                    }}

                    onPressRight={() => {
                        var redirect = 'Summary';
                        var param = this.state.paramAll;
                        console.log('paramSummary', JSON.stringify(param));
                        navigation.navigate("Loading", { redirect: redirect, param: param });
                    }}

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
