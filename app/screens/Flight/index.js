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

        //buat ganti bulan
        var dAwal = new Date(tglAwal);
        var dAkhir = new Date(tglAkhir);
        var lastMonth = this.format_date(
            this.lastDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 1)
        );
        var dLastMonth = new Date(lastMonth);
        var firstMonth = this.format_date(
            this.firstDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 2)
        );

        console.log("dAwal", dAwal);
        console.log("dAkhir", dAkhir);
        console.log("lastYear", dAwal.getFullYear());
        console.log("lastYear", dAwal.getMonth() + 1);
        console.log("lastMonth", lastMonth);
        console.log("firstMonth", firstMonth);

        console.log(+dAwal === +dLastMonth);
        if (+dAwal === +dLastMonth) {
            tglAkhir = firstMonth;
        }
        //buat ganti bulan


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
            {
                icon: "hotel",
                name: "Hotels",
                route: "Hotel",
                iconAnimation: "tour.json",
                type: 'deal',
                // image: Images.trip
            },

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
        this.setqty = this.setqty.bind(this);
        this.setCatHotel = this.setCatHotel.bind(this);
        this.setCityHotel = this.setCityHotel.bind(this);

        //End Function Bind Search-----------------------//
        this.getSession();
        // this.updateParticipant = this.updateParticipant.bind(this);
        this.openUpdate = this.openUpdate.bind(this);


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

    setqty(jml) {
        this.setState({ qty: jml });
    }
    //-----function untuk hotel-----//



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
        var MyDateString = "";
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = MyDate.getMonth() + 1;
        var tempoDate = MyDate.getDate() + num;
        if (tempoMonth < 10) tempoMonth = "0" + tempoMonth;
        if (tempoDate < 10) tempoDate = "0" + tempoDate;

        return MyDate.getFullYear() + "-" + tempoMonth + "-" + tempoDate;
    }

    firstDateOfYearMonth(y, m) {
        var firstDay = new Date(y, m - 1, 1);
        return firstDay;
    }

    lastDateOfYearMonth(y, m) {
        var lastDay = new Date(y, m, 0);
        return lastDay;
    }

    format_date(d) {
        (month = "" + (d.getMonth() + 1)),
            (day = "" + d.getDate()),
            (year = d.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
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
                    type={'flight'}
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


    openUpdate(link) {
        if (this.state.visible == true) {
            console.log('link', link)
        } else {

        }
        //alert(link);
        //Linking.openURL(link);
    }
    componentDidMount() {
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
