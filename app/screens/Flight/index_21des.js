import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    Platform,
    StatusBar,
    Dimensions,
    Linking,
    Switch,
    CheckBox,
    ImageBackground
} from "react-native";
import {
    Text,
    SafeAreaView,
    Image,
    Icon,
    Tag,
    FormOption,
    Button,
    Header

} from "@components";


import Swiper from 'react-native-swiper'
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import FlightPlanCustom from "../../components/FlightPlanCustom";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import SetDateLong from "../../components/SetDateLong";
import SetPenumpangLong from "../../components/SetPenumpangLong";
import FormOptionScreen from "../../components/FormOptionScreen";
import DropdownAlert from 'react-native-dropdownalert';
import { DataMasterDiskon } from "@data";
import Modal from 'react-native-modal';
import moment from "moment";

import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBlog,
    DataPromo
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
import FastImage from "react-native-fast-image";

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;


export default class Flight extends Component {

    constructor(props) {
        super(props);


        //Start Set Variabel Search
        var type = 'flight';

        var tglAwal = this.getDate(1);
        var tglAkhir = this.getDate(1);

        var round = '';
        var title = '';
        if (type == 'flight') {
            round = false;
            title = 'Search Flight';
        } else if (type == 'hotel') {
            round = true;
            title = 'Search Hotel Package';
        } else if (type == 'trip') {
            round = true;
            title = 'Set Tour';
        }
        //End Set Variabel Search


        this.state = {
            DataMasterDiskon: DataMasterDiskon[0],
            login: false,
            icons: [{
                icon: "plane",
                name: "Flights",
                route: "FlightSearch",
                iconAnimation: "flight.json",
                type: 'flight',
                // image: Images.flight,
                checked: true
            },


            // {
            //     icon: "handshake",
            //     name: "Deals",
            //     route: "Deal",
            //     iconAnimation:"hotel.json",
            //     type:'deal',
            //     // image: Images.hotel
            // },
            {
                icon: "hotel",
                name: "Hotels",
                route: "Hotel",
                iconAnimation: "tour.json",
                type: 'deal',
                // image: Images.trip
            },
                // {
                //     icon: "map-marker-alt",
                //     name: "Trips",
                //     route: "Tour",
                //     iconAnimation:"tour.json",
                //     type:'trip',
                //     // image: Images.trip
                // },

                // {
                //     icon: "map-signs",
                //     name: "Activities",
                //     route: "Activities",
                //     iconAnimation:"tour.json",
                //     type:'activities',
                //     // image: Images.trip
                // },
                // {
                //     icon: "ellipsis-v",
                //     name: "Coming Soon",
                //     route: "Other",
                //     iconAnimation:"tour.json",
                //     type:'other',
                //     // image: Images.trip
                // },
            ],
            heightHeader: Utils.heightHeader(),
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
            listdata_promo: DataPromo,
            listdata_slider: DataSlider,
            listdata_dashboard: DataDashboard,
            listdata_blog: DataBlog,
            listdata_flashsale_home: [],
            get_ada_flashsale: [],
            config: DataConfig,
            loading_dashboard: true,



            //Start Parameter Search-----------------------//
            //parameter flight//
            type: type,

            bandaraAsalCode: 'CGK',
            bandaraAsalLabel: 'Soekarno Hatta',
            bandaraTujuanCode: 'DPS',
            bandaraTujuanLabel: 'Denpasar',
            bandaraAsalIdCountry: '193',

            kelas: 'All Class',
            kelasId: '',
            tglAkhirSet: false,

            listdata_kelas: [
                {
                    value: "",
                    text: "All Class"
                },
                {
                    value: "E",
                    text: "Economy Class"
                },
                {
                    value: "S",
                    text: "Premium Economy"
                },
                {
                    value: "B",
                    text: "Business Class"
                },
                {
                    value: "F",
                    text: "First Class"
                }],

            //parameter hotel
            cityId: '5171',
            cityText: 'Denpasar',
            cityProvince: 'Bali',
            qty: 1,


            //parameter hotelLinx
            guest_per_room: 2,
            minRoom: 1,
            hotelLinxDestinationLabel: 'City, hotel, place to go',
            hotelLinxDestinationCity: '',
            hotelLinxDestinationHotel: '',
            hotelLinxDestinationType: '',
            hotelLinxDestinationArea: '',
            hotelLinxDestinationCountry: '',
            hotelLinxDestinationType: '',
            listdataRoom: [
                {
                    value: 1,
                    text: "1 Room"
                },
                {
                    value: 2,
                    text: "2 Room"
                },
                {
                    value: 3,
                    text: "3 Room"
                },
                {
                    value: 4,
                    text: "4 Room"
                },
                {
                    value: 5,
                    text: "5 Room"
                }
            ],

            round: round,
            dewasa: "1",
            anak: "0",
            bayi: "0",
            stringAdults: "1",
            stringChild: "0",
            stringBaby: "0",
            umurank: "0",
            stringumurank: "0",
            stringRoom: "1",
            adultnchildparam: "Adult",
            roomMultiParam: [
                {
                    id: 1,
                    dewasa: 1,
                    anak: 0,
                    bayi: 0,
                    umurAnakKe1: 0,
                    umurAnakKe2: 0,
                    umurAnak: ""

                }
            ],
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
            jumlahPerson: 1,
            //End Parameter Search-----------------------//
            userSession: null,
            visible: false,
            linkUpdate: '',
            versionInName: '',
            directOnly: false

        };
        this._deltaY = new Animated.Value(0);

        //Start Function Bind Search-----------------------//
        this.setBandaraAsal = this.setBandaraAsal.bind(this);
        this.setBandaraTujuan = this.setBandaraTujuan.bind(this);
        this.setKelasPesawat = this.setKelasPesawat.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setJumlahPerson = this.setJumlahPerson.bind(this);
        this.setBookingTimeAwal = this.setBookingTimeAwal.bind(this);
        this.setBookingTimeAkhir = this.setBookingTimeAkhir.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setqty = this.setqty.bind(this);
        this.setCatHotel = this.setCatHotel.bind(this);
        this.setCityHotel = this.setCityHotel.bind(this);


        this.setHotelLinxDestination = this.setHotelLinxDestination.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.setRoom(1);
        this.setRoomMulti = this.setRoomMulti.bind(this);
        //End Function Bind Search-----------------------//
        this.getSession();
        this.updateParticipant = this.updateParticipant.bind(this);
        this.openUpdate = this.openUpdate.bind(this);


    }

    //memanggil config
    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }

    getTokenFirebase() {
        AsyncStorage.getItem('tokenFirebase', (error, result) => {
            if (result) {
                let tokenFirebase = JSON.parse(result);
                console.log('tokenFirebaseHome', tokenFirebase);
                console.log('userSessionsgetTokenFirebase', JSON.stringify(this.state.userSession));
                var userSession = this.state.userSession;
                if (this.state.userSession != null) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    var param = {
                        "param":
                        {
                            "token": tokenFirebase,
                            "id_user": userSession.id_user,
                            "username": userSession.username,
                            "email": userSession.email,
                        }
                    };
                    console.log('getTokenFirebaseParam', JSON.stringify(param));
                    var raw = JSON.stringify(param);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("https://masterdiskon.com/front/api_new/AuthRegister/registrasi_token_app", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log('getTokenFirebase', JSON.stringify(result));

                        })
                        .catch(error => {
                            alert('Kegagalan Respon Server');
                        });
                }
            }
        });
    }

    //memanggil session
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('userSessions', JSON.stringify(userSession));

                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }

    //Start Function  Search-----------------------//
    //-----function untuk hotel-----//
    setCity(id, city, province) {
        this.setState({ cityId: id });
        this.setState({ cityText: city });
        this.setState({ cityProvince: province });
    }

    setqty(jml) {
        this.setState({ qty: jml });
    }
    //-----function untuk hotel-----//


    //-----function untuk hotelLinx-----//
    setHotelLinxDestination(select) {
        console.log('setHotelLinxDestination', JSON.stringify(select));
        this.setState({ hotelLinxDestination: select });
        this.setState({ hotelLinxDestinationLabel: select.searchTitle });
        this.setState({ hotelLinxDestinationCity: select.searchCity });
        this.setState({ hotelLinxDestinationHotel: select.searchHotel });
        this.setState({ hotelLinxDestinationType: select.searchType });
        this.setState({ hotelLinxDestinationArea: select.searchArea });
        this.setState({ hotelLinxDestinationCountry: select.searchCountry });
        this.setState({ hotelLinxDestinationType: select.searchType });
    }
    arradultnchildparam(dataArray, num) {
        var arradultnchildparam = []

        for (var a = 0; a < dataArray[num]['dewasa']; a++) {

            arradultnchildparam.push('Adult');
        }

        for (var a = 0; a < dataArray[num]['anak']; a++) {

            arradultnchildparam.push('Child');
        }

        return arradultnchildparam;
    }


    setRoomMulti(dataArray) {
        console.log('dataArray', JSON.stringify(dataArray));
        var jmlDewasa = 1;
        var jmlAnak = 1;
        var jmlBayi = 0;
        var jmlGuest = 0;

        jmlDewasa = dataArray.reduce((n, { dewasa }) => n + dewasa, 0);
        jmlAnak = dataArray.reduce((n, { anak }) => n + anak, 0);
        jmlBayi = dataArray.reduce((n, { bayi }) => n + bayi, 0);
        jmlGuest = parseInt(jmlDewasa) + parseInt(jmlAnak) + parseInt(jmlBayi);
        this.setState({ roomMultiGuest: jmlGuest });
        this.setState({ roomMultiParam: dataArray });
        this.setState({ roomMultiCountRoom: dataArray.length });


        var stringAdults = dataArray.map(function (elem) {
            return elem.dewasa;
        }).join(",");

        var stringChild = dataArray.map(function (elem) {
            return elem.anak;
        }).join(",");

        var stringInfants = dataArray.map(function (elem) {
            return elem.bayi;
        }).join(",");

        var stringRoom = dataArray.map(function (elem) {
            return "1";
        }).join(",");

        var strAnakNew = [];


        var stringumurank = "0";
        dataArray.map(elem => {
            if (elem.umurAnakKe1 == 0 && elem.umurAnakKe2 != 0) {
                strAnakNew.push(elem.umurAnakKe2);
            } else if (elem.umurAnakKe1 != 0 && elem.umurAnakKe2 == 0) {
                strAnakNew.push(elem.umurAnakKe1);
            } else if (elem.umurAnakKe1 != 0 && elem.umurAnakKe2 != 0) {
                strAnakNew.push(elem.umurAnakKe1);
                strAnakNew.push(elem.umurAnakKe2);
            } else if (elem.umurAnakKe1 == 0 && elem.umurAnakKe2 == 0) {
                strAnakNew.push(0);
            }
        });

        stringumurank = strAnakNew.toString();
        console.log('stringumurank', stringumurank);

        var a = this.arradultnchildparam(dataArray, 0);

        var flat = [];
        for (var i = 1; i < dataArray.length; i++) {
            flat = flat.concat(this.arradultnchildparam(dataArray, i));
        }

        var x = a.concat(flat);
        var arradultnchildparam = x.join(",");

        this.setState({ stringAdults: stringAdults });
        this.setState({ stringChild: stringChild });
        this.setState({ stringumurank: stringumurank });
        this.setState({ umurank: stringumurank });
        this.setState({ stringRoom: stringRoom });
        this.setState({ adultnchildparam: arradultnchildparam });

        this.setState({ dewasa: jmlDewasa.toString() });
        this.setState({ anak: jmlAnak.toString() });
        this.setState({ bayi: jmlBayi.toString() });
    }
    setRoom(jml) {
        //alert(jml);
        this.setState({ dewasa: "2" });
        this.setState({ anak: "0" });
        this.setState({ bayi: "0" });
        this.setState({ jmlPerson: 2 });
        setTimeout(() => {
            var maksPersonRoom = parseInt(jml) * 2;
            var jmlPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            var sisaPersonRoom = parseInt(maksPersonRoom) - parseInt(jmlPerson);

            this.setState({ maksPersonRoom: maksPersonRoom });
            this.setState({ sisaPersonRoom: sisaPersonRoom });
            this.setState({ minRoom: jml });
        }, 50);
    }

    getProductHotelLinx() {
        const { config, param } = this.state;
        const { navigation } = this.props;

        const data = {
            "city": param.city,
            "hotelid": param.hotelid,
            "checkin": this.convertDateText(param.DepartureDate),
            "checkout": this.convertDateText(param.ReturnDate),
            "adults": param.Adults,
            "child": param.Children,
            "room": param.room,
            "typeSearch": param.typeSearch,
            "area": param.area,
            "country": param.country,
        }
        const paramSearch = { "param": data };
        this.setState({ loading_product_hotel_linx: true }, () => {
            var url = config.baseUrl;
            var path = "front/api_new/product/product_hotel_linx";


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(paramSearch);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + path, requestOptions)
                .then(response => response.json())
                .then(result => {

                    this.setState({ loading: false });
                    param.city = this.state.param.city;
                    param.adults = this.state.param.Adults;
                    param.checkin = this.convertDateDMY(this.state.param.DepartureDate);
                    param.checkout = this.convertDateDMY(this.state.param.ReturnDate);
                    param.noofnights = this.getNight(this.state.param.DepartureDate, this.state.param.ReturnDate);
                    param.type = 'hotelLinx';

                    var product = result[0];
                    navigation.navigate("ProductDetail", { param: param, product: product, product_type: 'hotelLinx' })
                })
                .catch(error => alert('Kegagalan Respon Server'));

        });
    }

    //-----function untuk hotelLinx-----//
    setBookingTimeAwal(tglAwal) {

        startdate = this.convertDate(tglAwal);
        var new_date = moment(startdate, "DD-MM-YYYY").add("days", 1);
        var day = new_date.format("DD");
        var month = new_date.format("MM");
        var year = new_date.format("YYYY");

        if (this.state.tglAkhirSet == false) {
            var tglAkhir = year + "-" + month + "-" + day;
            this.setState({ tglAwal: tglAwal });
            this.setState({ tglAkhir: tglAkhir });

        } else {
            var tglAkhir = this.state.tglAkhir;
            var date1 = new Date(tglAwal);
            var date2 = new Date(tglAkhir);
            if (date1 < date2) {
                this.setState({ tglAwal: tglAwal });
            } else {
                this.dropdown.alertWithType(
                    "info",
                    "Info",
                    "Tgl checkout harus lebih besar dari checkin"
                );
            }

        }

        // var type = this.state.type;
        // if (type == 'hotel') {
        //     var tglAkhir = this.getDate2(1, tglAwal);
        //     this.setState({ tglAwal: tglAwal });
        //     this.setState({ tglAkhir: tglAkhir });
        // } else {
        //     this.setState({ tglAwal: tglAwal });
        //     this.setState({ tglAkhir: tglAwal });
        // }
    }

    setBookingTimeAkhir(tglAkhir) {

        var tglAwal = this.state.tglAwal;
        var type = this.state.type;

        var date1 = new Date(tglAwal);
        var date2 = new Date(tglAkhir);
        if (date1 > date2) {
            this.dropdown.alertWithType(
                "info",
                "Info",
                "Tgl checkout harus lebih besar dari checkin"
            );
        } else if (date1 < date2) {
            console.log('tglAkhir', tglAkhir);
            this.setState({ tglAkhir: tglAkhir });
            this.setState({ tglAkhirSet: true });
        } else {
            this.dropdown.alertWithType(
                "info",
                "Info",
                "Tgl checkout harus lebih besar dari checkin"
            );
        }


        // var tglAwal = this.state.tglAwal;
        // var type = this.state.type;

        // if (type == 'hotel') {
        //     var date1 = new Date(tglAwal);
        //     var date2 = new Date(tglAkhir);

        //     if (date1 > date2) {
        //         this.dropdown.alertWithType('info', 'Info', 'Tgl checkin harus lebih besar dari checkout');
        //     } else if (date1 < date2) {
        //         this.setState({ tglAkhir: tglAkhir });
        //     } else {
        //         this.dropdown.alertWithType('info', 'Info', 'Tgl checkin harus lebih besar dari checkout');
        //     }
        // } else {
        //     this.setState({ tglAkhir: tglAkhir });
        // }
    }

    getDate(num) {
        var lastday = function (y, m) {
            return new Date(y, m + 1, 0).getDate();
        }

        var lastDayInMonth = lastday(2021, 7);
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoDate = (MyDate.getDate());



        console.log('tempoDate', tempoDate);
        if (tempoDate != lastDayInMonth) {
            // var tempoMonth=(new Date().getMonth()+1)%12 + 1;
            tempoDate = (MyDate.getDate() + num);

            var tempoMonth = (MyDate.getMonth() + 1);
            if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
            if (tempoDate < 10) tempoDate = '0' + tempoDate;
            var dayCurrent = MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
        } else {
            var tempoMonth = (new Date().getMonth() + 1) % 12 + 1;;
            if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
            if (tempoDate < 10) tempoDate = '0' + tempoDate;
            var dayCurrent = MyDate.getFullYear() + '-' + tempoMonth + '-' + '01';
        }
        console.log('dayCurrent', dayCurrent);
        return dayCurrent;


    }

    getDate2(num, date) {
        var MyDate = new Date(date);
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    }

    onSetFlightType(round) {
        this.setState({
            round: round
        });
    }

    convertDate(dateString) {
        var p = dateString.split(/\D/g);
        return [p[2], p[1], p[0]].join(".");
    }

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }



    convertDateDM(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return d.getDate() + " " + months[d.getMonth()];
    }

    getNight(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
    }
    convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        return today;
    }


    onSelectFlight(type) {
        const { navigation } = this.props;
        const { from, to } = this.state;
        switch (type) {
            case "to":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraTujuanCode,
                    setBandaraTujuan: this.setBandaraTujuan,
                    type: type
                });
                break;
            case "from":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraAsalCode,
                    setBandaraAsal: this.setBandaraAsal,
                    type: type
                });
                break;
            default:
                break;
        }
    }


    setDate(date) {
        var date = new Date(date);
        var tempoMonth = (date.getMonth() + 1);
        var tempoDate = (date.getDate());
        var finaldate = "";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return finaldate = date.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    };

    setDateLocal(date) {
        if (date != "") {
            var date = new Date(date);
            var tempoMonth = (date.getMonth() + 1);
            var tempoDate = (date.getDate());
            return finaldate = tempoDate + '/' + tempoMonth + '/' + date.getFullYear();
        } else {
            return "Set Tanggal"
        }
    };

    getProductHotelLinxDetail(param) {
        const { config } = this.state;
        const { navigation } = this.props;
        const data = {
            "hotelid": param.hotelid,
        }
        console.log('param', JSON.stringify(param));
        const paramSearch = { "param": data };
        this.setState({ loading: true }, () => {
            var url = 'https://masterdiskon.com/';
            var path = "front/api_new/product/product_hotel_linx_detail";

            console.log('paramgetProductHotelLinx', url + path, JSON.stringify(paramSearch));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(paramSearch);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + path, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loading: false });
                    console.log(JSON.stringify(result[0]));
                    navigation.navigate("ProductDetail", { param: param, product: result[0], product_type: 'hotelLinx' })
                    // this.setState({loading_product_hotel_linx: false });
                    // this.setState({listdata_product_hotel_linx: result});
                    // this.setState({listdata_product_hotel_linx_original: result});

                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    alert('Kegagalan Respon Server');
                });


        });
    }

    isLastDayOfMonth(date) {
        return date.getDate() == new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    onSubmit() {
        const { type, product, productPart, round, from, to, loading, login } = this.state;
        var tgl_akhir = '';
        if (this.state.round == true) {
            tgl_akhir = this.state.tglAkhir;
        }


        var param = {
            DepartureDate: this.state.tglAwal,
            ReturnDate: tgl_akhir,
            Adults: this.state.dewasa,
            Children: this.state.anak,
            Infants: this.state.bayi,
        }

        var link = '';

        if (type == 'flight') {
            link = 'FlightResult';
            param.Origin = this.state.bandaraAsalCode;
            param.Destination = this.state.bandaraTujuanCode;
            param.IsReturn = this.state.round;
            param.CabinClass = [this.state.kelasId];
            param.CorporateCode = "";
            param.Subclasses = false;
            param.Airlines = [];
            param.type = 'flight';


            param.Qty = parseInt(param.Adults) + parseInt(param.Children) + parseInt(param.Infants);
            param.participant = true;

            param.round = round;
            param.bandaraAsalCode = this.state.bandaraAsalCode;
            param.bandaraTujuanCode = this.state.bandaraTujuanCode;
            param.bandaraAsalLabel = this.state.bandaraAsalLabel;
            param.bandaraTujuanLabel = this.state.bandaraTujuanLabel;
            param.tglAwal = param.DepartureDate;
            param.tglAkhir = param.ReturnDate;
            param.listdata_kelas = this.state.listdata_kelas;
            param.kelas = this.state.kelas;
            param.kelasId = this.state.kelasId;
            param.jumlahPerson = this.state.jumlahPerson;


            param.dewasa = this.state.dewasa;
            param.anak = this.state.anak;
            param.bayi = this.state.bayi;


            console.log('FlightResult', JSON.stringify(param))

            this.props.navigation.navigate(link,
                {
                    param: param,
                });
        }
    }

    onSubmit2() {
        const { type, product, productPart, round, from, to, loading, login } = this.state;
        var tgl_akhir = '';
        if (this.state.round == true) {
            tgl_akhir = this.state.tglAkhir;
        }


        var param = {
            DepartureDate: this.state.tglAwal,
            ReturnDate: tgl_akhir,
            Adults: this.state.dewasa,
            Children: this.state.anak,
            Infants: this.state.bayi,
        }

        var link = '';

        if (type == 'flight') {
            link = 'FlightResultVia';
            param.Origin = this.state.bandaraAsalCode;
            param.Destination = this.state.bandaraTujuanCode;
            param.IsReturn = this.state.round;
            param.CabinClass = [this.state.kelasId];
            param.CorporateCode = "";
            param.Subclasses = false;
            param.Airlines = [];
            param.type = 'flight';


            param.Qty = parseInt(param.Adults) + parseInt(param.Children) + parseInt(param.Infants);
            param.participant = true;

            param.round = round;
            param.bandaraAsalCode = this.state.bandaraAsalCode;
            param.bandaraTujuanCode = this.state.bandaraTujuanCode;
            param.bandaraAsalLabel = this.state.bandaraAsalLabel;
            param.bandaraTujuanLabel = this.state.bandaraTujuanLabel;
            param.tglAwal = param.DepartureDate;
            param.tglAkhir = param.ReturnDate;
            param.listdata_kelas = this.state.listdata_kelas;
            param.kelas = this.state.kelas;
            param.kelasId = this.state.kelasId;
            param.jumlahPerson = this.state.jumlahPerson;


            param.dewasa = this.state.dewasa;
            param.anak = this.state.anak;
            param.bayi = this.state.bayi;
            param.isDirectOnly = this.state.directOnly;
            param.tglAkhirSet = this.state.tglAkhirSet;

            console.log('FlightResult', JSON.stringify(param))

            this.props.navigation.navigate(link,
                {
                    param: param,
                });
        }
    }

    setBandaraAsal(code = '', label = '', id_country = '') {
        this.setState({ bandaraAsalCode: code });
        this.setState({ bandaraAsalLabel: label });
        this.setState({ bandaraAsalIdCountry: id_country });

    }

    setBandaraTujuan(code = '', label = '') {
        this.setState({ bandaraTujuanCode: code });
        this.setState({ bandaraTujuanLabel: label });
    }







    setJumlahDewasa(jml) {
        var type = this.state.type;

        if (type != 'hotel') {
            this.setState({ dewasa: jml });
            setTimeout(() => {
                this.setJumlahPerson();
            }, 50);
        } else {
            var maksPersonRoom = this.state.maksPersonRoom;
            var jmlPerson = parseInt(jml) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            var sisaPersonRoom = parseInt(maksPersonRoom) - parseInt(jmlPerson);
            this.setState({ maksPersonRoom: maksPersonRoom });
            this.setState({ jmlPerson: jmlPerson });
            this.setState({ sisaPersonRoom: sisaPersonRoom });
            this.setState({ dewasa: jml });
        }

    }

    setJumlahAnak(jml) {
        this.setState({ anak: jml });
        var type = this.state.type;

        if (type != 'hotel') {
            setTimeout(() => {
                this.setJumlahPerson();
            }, 50);

        } else {
            var maksPersonRoom = this.state.maksPersonRoom;
            var jmlPerson = parseInt(this.state.dewasa) + parseInt(jml) + parseInt(this.state.bayi);
            var sisaPersonRoom = parseInt(maksPersonRoom) - parseInt(jmlPerson);

            this.setState({ maksPersonRoom: maksPersonRoom });
            this.setState({ jmlPerson: jmlPerson });
            this.setState({ sisaPersonRoom: sisaPersonRoom });
            this.setState({ anak: jml });
        }
    }

    setJumlahBayi(jml) {
        var type = this.state.type;
        this.setState({ bayi: jml });

        if (type != 'hotel') {
            setTimeout(() => {
                this.setJumlahPerson();
            }, 50);

        } else {
            var maksPersonRoom = this.state.maksPersonRoom;
            var jmlPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(jml);
            var sisaPersonRoom = parseInt(maksPersonRoom) - parseInt(jmlPerson);

            this.setState({ maksPersonRoom: maksPersonRoom });
            this.setState({ jmlPerson: jmlPerson });
            this.setState({ sisaPersonRoom: sisaPersonRoom });
            this.setState({ bayi: jml });

        }
    }

    setJumlahPerson() {
        var jumlahPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
        this.setState({ jumlahPerson: jumlahPerson });
    }


    setKelasPesawat(kelas, kelasId) {
        this.setState({ kelas: kelas });
        this.setState({ kelasId: kelasId });
    }

    setCatHotel(text, value) {
        const { navigation } = this.props;
        this.setState({ catHotel: text });
        this.setState({ catHotelId: value });
        navigation.navigate("HotelByFilter", { detail_category: value });
    }

    setCityHotel(text, value) {
        const { navigation } = this.props;
        this.setState({ hotel_package_city: text });
        this.setState({ hotel_package_city_id: value });
        navigation.navigate("HotelByFilter", { id_city: value });
    }

    setTglAwal(tgl) {
        this.setState({ tglAwal: tgl });
    }

    setTglAkhir(tgl) {
        this.setState({ tglAkhir: tgl });
    }

    renderContentSearch() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;

        // var loading = this.state.loading;
        var type = this.state.type;
        var title = '';
        var content = <View></View>
        var contentTitle = <View></View>
        var contentButton = <Button
            full
            loading={loading}
            style={{ height: 40 }}
            onPress={() => {
                this.onSubmit();

            }}
        >
            Search
        </Button>

        var contentButton2 = <Button
            full
            loading={loading}
            style={{ height: 40 }}
            onPress={() => {
                this.onSubmit2();

            }}
        >
            Search
        </Button>
        var content = <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
                <View style={[styles.flightType]}>
                    <Tag
                        outline={round}
                        primary={!round}
                        round
                        onPress={() => this.onSetFlightType(false)}
                    >
                        One Way
                    </Tag>
                    <Tag
                        outline={!round}
                        primary={round}
                        round
                        onPress={() => this.onSetFlightType(true)}
                        style={{ marginRight: 20 }}
                    >
                        Round Trip
                    </Tag>

                </View>
            </View>
            <View style={{ flex: 1 }}>
                <FlightPlanCustom
                    round={round}
                    fromCode={this.state.bandaraAsalCode}
                    toCode={this.state.bandaraTujuanCode}
                    from={this.state.bandaraAsalLabel}
                    to={this.state.bandaraTujuanLabel}
                    style={{}}
                    onPressFrom={() => this.onSelectFlight("from")}
                    onPressTo={() => this.onSelectFlight("to")}
                />
            </View>
            <View style={{ flex: 1 }}>
                <SetDateLong
                    labelTglAwal={'Departure'}
                    labelTglAkhir={'Pulang'}
                    setBookingTimeAwal={this.setBookingTimeAwal}
                    setBookingTimeAkhir={this.setBookingTimeAkhir}
                    tglAwal={this.state.tglAwal}
                    tglAkhir={this.state.tglAkhir}
                    round={this.state.round}
                    icon={'calendar-outline'}
                //minDate={1}
                />
            </View>

            <View style={{ flex: 1 }}>
                <FormOption
                    style={{}}
                    label={'Seat Class'}
                    option={this.state.listdata_kelas}
                    optionSet={this.setKelasPesawat}
                    optionSelectText={this.state.kelas}
                    optionSelectValue={this.state.kelasId}
                    icon={'pricetag-outline'}
                />
            </View>
            <View style={{ flex: 1 }}>

                <SetPenumpangLong
                    label={this.state.jumlahPerson}
                    dewasa={this.state.dewasa}
                    anak={this.state.anak}
                    bayi={this.state.bayi}
                    setJumlahDewasa={this.setJumlahDewasa}
                    setJumlahAnak={this.setJumlahAnak}
                    setJumlahBayi={this.setJumlahBayi}
                    minPersonDef={1}
                    minPerson={1}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                    <View
                        style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}

                    >
                        <Switch name="angle-right"
                            size={14}
                            onValueChange={this.toggleSwitchDirectOnly}
                            value={this.state.directOnly}
                        />
                    </View>
                    <View
                        style={{ flexDirection: 'row', flex: 10, justifyContent: "flex-start", alignItems: "center" }}>
                        <View>
                            <Text caption2 grayColor numberOfLines={1}>
                                Direct Only
                            </Text>

                        </View>
                    </View>

                </View>
            </View>

        </View>
        title = 'Pencarian Tiket Pesawat';


        contentTitle = <View><Text body2 bold>{title}</Text></View>
        return (
            <View>
                {contentTitle}
                {content}
                {/* {contentButton} */}
                {contentButton2}
            </View>
        );

    }

    toggleSwitchDirectOnly = value => {

        const { param } = this.state;
        console.log('directOnly', value);
        this.setState({ directOnly: value });



    }






    onSelectProduct(select) {
        this.setState({
            icons: this.state.icons.map(item => {
                if (item.name == select.name) {
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

        this.setState({ type: select.type });

    }

    //End Function Search-----------------------//


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
                            var listdata_promo = result.list_promo;

                            var list_hotel_package_city = result.list_hotel_package_city;
                            var listdata_category_hotel_package = result.form_hotel_category;
                            var listdata_slider = result.slider;
                            var listdata_blog = result.blog;
                            var listdata_flashsale_home = result.flashsale_home;


                            var more_product_hotel_package_room_promo = result.more_product_hotel_package_room_promo;
                            var more_product_hotel_package_buy_now_stay_later = result.more_product_hotel_package_buy_now_stay_later;
                            var more_product_activities = result.more_product_activities;
                            var more_product_trip = result.more_product_trip;
                            var more_hotel_package_city = result.more_hotel_package_city;
                            var get_ada_flashsale = result.get_ada_flashsale;




                            this.setState({ listdata_product_hotel_package_room_promo: listdata_product_hotel_package_room_promo })
                            this.setState({ listdata_product_hotel_package_buy_now_stay_later: listdata_product_hotel_package_buy_now_stay_later })
                            this.setState({ listdata_product_activities: listdata_product_activities });
                            this.setState({ listdata_product_trip: listdata_product_trip });
                            this.setState({ listdata_promo: listdata_promo });


                            this.setState({ more_product_hotel_package_room_promo: more_product_hotel_package_room_promo })
                            this.setState({ more_product_hotel_package_buy_now_stay_later: more_product_hotel_package_buy_now_stay_later })
                            this.setState({ more_product_activities: more_product_activities });
                            this.setState({ more_product_trip: more_product_trip });
                            this.setState({ more_hotel_package_city: more_hotel_package_city });

                            this.setState({ list_hotel_package_city: list_hotel_package_city });
                            this.setState({ listdata_category_hotel_package: listdata_category_hotel_package });
                            this.setState({ listdata_slider: listdata_slider });

                            this.setState({ listdata_blog: listdata_blog });
                            this.setState({ get_ada_flashsale });
                            this.setState({ listdata_flashsale_home: listdata_flashsale_home });

                            AsyncStorage.setItem('info_activities', JSON.stringify(result.info_activities));
                            AsyncStorage.setItem('info_hotelpackage', JSON.stringify(result.info_hotelpackage));
                            AsyncStorage.setItem('info_trip', JSON.stringify(result.info_trip));



                        })
                        .catch(error => { alert('Kegagalan Respon Server') });



                });

            }
        });
    }

    checkVersion() {

        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                console.log('config', JSON.stringify(config));
                console.log('versionPublish', config.versionPublish);
                console.log('versionApp', this.state.DataMasterDiskon.versionApp);
                console.log('Platform', Platform.OS);
                if (Platform.OS == "android") {
                    config.from = 'android';
                    AsyncStorage.setItem('config', JSON.stringify(config));
                    if (parseInt(this.state.DataMasterDiskon.versionInPlayStore) < parseInt(config.versionInPlayStore)) {

                        this.setState({ visible: true });
                        setTimeout(() => {
                            console.log('visible', this.state.visible);
                        }, 50);
                        this.setState({ linkUpdate: 'http://onelink.to/9gdqsj' });
                        this.setState({ versionInName: config.versionInPlayStoreName });
                        // Alert.alert(
                        //     'Versi baru telah tersedia',
                        //     'Silakan memperbarui aplikasi masterdiskon untuk menikmati fitur baru dan pengalaman aplikasi yang lebih baik',
                        //     [
                        //         { text: "Tutup Peringatan", onPress: () => null}
                        //       ], 
                        //       { cancelable: false }
                        //     );


                    }
                } else {
                    config.from = 'ios';
                    AsyncStorage.setItem('config', JSON.stringify(config));
                    if (parseInt(this.state.DataMasterDiskon.versionInAppStore) < parseInt(config.versionInAppStore)) {
                        console.log('update');
                        this.setState({ visible: true });
                        setTimeout(() => {
                            console.log('visible', this.state.visible);
                        }, 50);
                        this.setState({ linkUpdate: 'http://onelink.to/9gdqsj' });
                        this.setState({ versionInName: config.versionInAppStoreName });

                        // Alert.alert(
                        //     'Versi baru telah tersedia',
                        //     'Silakan memperbarui aplikasi masterdiskon untuk menikmati fitur baru dan pengalaman aplikasi yang lebih baik',
                        //     [
                        //         { text: "Tutup Peringatan", onPress: () => null}
                        //       ], 
                        //       { cancelable: false }
                        //     );

                    }

                }

            }
        });

    }

    openUpdate(link) {
        if (this.state.visible == true) {
            console.log('link', link)
        } else {

        }
        //alert(link);
        //Linking.openURL(link);
    }
    componentDidMount() {


        // StatusBar.setBackgroundColor(this.props.color, true)
        // const {navigation} = this.props;
        // this.getTokenFirebase();

        // this.checkVersion();
        // this.getDataDashboard();
        // this.setRoomMulti(this.state.roomMultiParam);

    }

    //fungsi untuk menampilkan icon
    renderIconService() {
        const { navigation } = this.props;
        const { icons } = this.state;
        return (
            <FlatList
                data={icons}
                numColumns={6}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemService}
                            activeOpacity={0.9}
                            onPress={() => {
                                if (item.type == 'trip') {
                                    navigation.navigate(item.route, { type: item.type });
                                } else if (item.type == 'other') {
                                    navigation.navigate('Other');

                                } else if (item.type == 'activities') {
                                    navigation.navigate(item.route, { type: item.type });
                                } else if (item.type == 'hotel') {
                                    this.setState({ round: true });
                                    var tglAwal = this.getDate(0);
                                    var tglAkhir = this.getDate(1);
                                    this.setState({ tglAwal });
                                    this.setState({ tglAkhir });
                                    this.onSelectProduct(item);
                                    this.setState({ dewasa: "2" });
                                    this.setState({ bayi: "0" });
                                    this.setState({ anak: "0" });
                                    this.setState({ jmlPerson: 2 });
                                } else if (item.type == 'flight') {
                                    this.setState({ round: false });
                                    var tglAwal = this.getDate(1);
                                    var tglAkhir = this.getDate(1);
                                    this.setState({ tglAwal });
                                    this.setState({ tglAkhir });
                                    this.onSelectProduct(item);
                                    this.setState({ dewasa: "1" });
                                    this.setState({ bayi: "0" });
                                    this.setState({ anak: "0" });
                                    this.setState({ jumlahPerson: 1 });
                                } else if (item.type == 'deal') {

                                    navigation.navigate("Hotel", { reSearch: false, reSearchParam: {} });

                                } else {
                                    this.onSelectProduct(item);
                                }



                            }}
                        >
                            {item.checked ?

                                <View>
                                    <View style={styles.iconContentColor}>
                                        <Icon
                                            name={item.icon}
                                            size={20}
                                            color={BaseColor.whiteColor}
                                            solid
                                        />
                                    </View>
                                    <Text overline style={{ textAlign: "center" }}>
                                        {item.name}
                                    </Text>
                                </View>
                                :
                                <View>
                                    <View style={styles.iconContent}>
                                        <Icon
                                            name={item.icon}
                                            size={20}
                                            color={BaseColor.primaryColor}
                                            solid
                                        />
                                    </View>
                                    <Text overline style={{ textAlign: "center" }}>
                                        {item.name}
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }

    renderItemFlashsale(item) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_place, bottom: item.product_cat }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: true }}
                propPriceCoret={{ price: priceSplitter(item.product_price_correct), discount: priceSplitter(item.product_discount), discountView: true }}
                propStar={{ rating: item.product_rate, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    //console.log('product',JSON.stringify(item));
                    navigation.navigate("ProductDetail", { product: item, product_type: item.product_is_campaign.type_product })

                }
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
                propIsFlashsale={true}
                propDarkMode={true}
            />
        );
    }




    renderItemFeaturedDestination(item, index) {
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
                    navigation.navigate("HotelByFilter", { id_city: item.id_city })
                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: false, horizontal: true, width: wp("40%") }}
                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );
    }



    renderItemRoomPromo(item, index) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
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

                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );
    }



    renderItemBuyNowStayLater(item, index) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
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
                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );
    }

    renderItemEvent(item, index) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
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
                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );

    }

    renderItemPaketTrip(item, index) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: hp("15%"), url: item.img_featured_url }}
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
                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );

    }

    renderItemBlog(item, index) {
        const { navigation } = this.props;
        const { config, param } = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: 'https://masterdiskon.com/assets/upload/blog/post/' + item.featured_image }}
                propInframe={{ top: item.name_blog_category, bottom: item.name_blog_category }}
                propTitle={{ text: item.title }}
                propDesc={{ text: item.title }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '' }}

                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    console.log('blog', JSON.stringify(item));
                    // var param={
                    //     title:'Detail Blog',
                    //     subTitle:'',
                    //     featuredImage:item.featured_image,
                    //     titleBlog:item.title,
                    //     contentBlog:item.content_blog,
                    //     slugBlog:item.title_slug
                    // }
                    // navigation.navigate("Blog",{param:param});

                    var param = {
                        url: 'https://masterdiskon.com/blog/detail/' + item.slug_blog_category + '/' + item.title_slug,
                        title: 'Blog',
                        subTitle: ''
                    }
                    console.log('paramBlog', JSON.stringify(param));
                    navigation.navigate("WebViewPage", { param: param })

                }

                }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: false, width: (width - 50) / 2 }}
                style={[
                    index % 2 ? { marginLeft: 10 } : {}
                ]
                }
            />
        );

    }


    renderItemPromo(item, index) {
        const { navigation } = this.props;
        const { config, param } = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("30%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_desc, bottom: 'Per :' + this.convertDateText(item.product_time) + '-' + this.convertDateText(item.product_time2) }}
                propTitle={{ text: 'Potongan ' + item.product_discount }}
                propDesc={{ text: item.product_name }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '' }}

                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: 'Min.Transaksi', right: 'Rp ' + priceSplitter(item.product_price_minumum) }}
                propCopyPaste={{ left: item.product_code, right: item.product_time, enabled: true }}
                // onPress={() =>{
                //     console.log('blog',JSON.stringify(item));
                //     // var param={
                //     //     title:'Detail Blog',
                //     //     subTitle:'',
                //     //     featuredImage:item.featured_image,
                //     //     titleBlog:item.title,
                //     //     contentBlog:item.content_blog,
                //     //     slugBlog:item.title_slug
                //     // }
                //     // navigation.navigate("Blog",{param:param});

                //     var param={
                //         url:'https://masterdiskon.com/blog/detail/'+item.slug_blog_category+'/'+item.title_slug,
                //         title:'Blog',
                //         subTitle:''
                //     }
                //     console.log('paramBlog',JSON.stringify(param));
                //     navigation.navigate("WebViewPage",{param:param})

                //     }

                // }
                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: false, width: (width - 0) / 2 }}
                style={[
                    index == 0
                        ? { marginLeft: 20, marginRight: 10 }
                        : { marginRight: 10 }
                ]}
            />
        );

    }


    toEditContact() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                let item = userSession;
                console.log('userSessions', JSON.stringify(userSession));
                var id_user = userSession.id_user;


                this.props.navigation.navigate('DetailContact', {
                    key: 0,
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
                    old: 'adult',
                    typeProduct: '',

                })
            }
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





    }

    render() {

        const { navigation } = this.props;
        const { heightHeader, login } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const heightImageBanner = Utils.scaleWithPixel(300, 1);
        const marginTopBanner = heightImageBanner - heightHeader;



        return (



            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Flights"
                    //subTitle={filterTitle}
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
                        navigation.navigate("Home");
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />

                <ScrollView
                    scrollEnabled={false}

                >
                    <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 20 }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                width: '100%',
                                alignSelf: 'center',
                                borderRadius: 5,
                                elevation: 3,
                                padding: 10,
                                flex: 1,


                            }}
                        >
                            {this.renderContentSearch()}
                        </View>
                    </View>

                </ScrollView>



                <FastImage source={Images.bgFlight} resizeMode="cover" style={{
                    justifyContent: "flex-end",
                    height: height / 3,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -50,

                }}>

                </FastImage>


                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </SafeAreaView>
        );
    }
}
