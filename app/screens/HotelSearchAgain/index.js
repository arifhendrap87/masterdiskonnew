import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort, Text, Tag, Button, FormOption } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { PostData } from '../../services/PostData';
import { AsyncStorage } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

// Load sample data
import { DataLoading, DataConfig, DataHotelPackage, DataTrip } from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import DataEmpty from "../../components/DataEmpty";

import FlightPlanCustom from "../../components/FlightPlanCustom";
import HeaderHome from "../../components/HeaderHome";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import SetDateLong from "../../components/SetDateLong";
import SetPenumpangLong from "../../components/SetPenumpangLong";
import FormOptionScreen from "../../components/FormOptionScreen";
import FormOptionQtyLong from "../../components/FormOptionQtyLong";
import DropdownAlert from 'react-native-dropdownalert';
import { PropTypes } from "prop-types";
import { DataMasterDiskon } from "@data";
import { ActivityIndicatorBase } from "react-native";
import moment from "moment";

import FastImage from "react-native-fast-image";


export default class HotelSearchAgain extends Component {
    constructor(props) {
        super(props);

        if (this.props.navigation.state.params && this.props.navigation.state.params.id_country) {
            id_country = this.props.navigation.state.params.id_country;
        } else {
            id_country = '';
        }

        var id_city = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.id_city) {
            id_city = this.props.navigation.state.params.id_city;
        } else {
            id_city = '';
        }

        var city_name = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.city_name) {
            city_name = this.props.navigation.state.params.city_name;
        } else {
            city_name = '';
        }

        var detail_category = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.detail_category) {
            detail_category = this.props.navigation.state.params.detail_category;
        } else {
            detail_category = '';
        }

        var param = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.param) {
            param = this.props.navigation.state.params.param;
        } else {
            param = '';
        }

        var paramProduct = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.param) {
            paramProduct = this.props.navigation.state.params.paramProduct;
        } else {
            paramProduct = '';
        }
        console.log('paramSearchAgain', JSON.stringify(param));
        var filterTitle = '';
        if (city_name != '') {
            filterTitle = city_name;
        }




        var tglAwal = param.tglAwal;
        var tglAkhir = param.tglAkhir;
        var roomMultiCountRoom = param.roomMultiCountRoom;
        var roomMultiParam = param.roomMultiParam;
        var roomMultiGuest = param.roomMultiGuest;
        var hotelLinxDestination = param.hotelLinxDestination;





        var dAwal = new Date(tglAwal);
        var dAkhir = new Date(tglAkhir);
        var lastMonth = this.format_date(this.lastDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 1));
        var dLastMonth = new Date(lastMonth);
        var firstMonth = this.format_date(this.firstDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 2));

        console.log('dAwal', dAwal);
        console.log('dAkhir', dAkhir);
        console.log('lastYear', dAwal.getFullYear());
        console.log('lastYear', dAwal.getMonth() + 1);
        console.log('lastMonth', lastMonth);
        console.log('firstMonth', firstMonth);

        console.log(+dAwal === +dLastMonth);
        if (+dAwal === +dLastMonth) {
            tglAkhir = firstMonth
        }


        this.state = {
            paramProduct: paramProduct,
            roomMultiCountRoom: roomMultiCountRoom,
            roomMultiParam: roomMultiParam,
            roomMultiGuest: roomMultiGuest,


            id_country: id_country,
            id_city: id_city,
            city_name: city_name,
            filterTitle: filterTitle,
            detail_category: detail_category,
            listdata_product_hotel_package: DataHotelPackage,
            listdata_product_hotel_package_original: DataHotelPackage,
            loading_product_hotel_package: true,
            config: DataConfig,
            place_city: [
                { id: "Badung", name: "Badung" },
                { id: "Gianyar", name: "Giianyar" },
                { id: "Malang", name: "Malang" },
                { id: "Bandung", name: "Bandung" },
            ],
            loading_hotel_package_city: true,
            type: 'hotel',
            hotelLinxDestination: hotelLinxDestination,
            hotelLinxDestinationLabel: hotelLinxDestination.searchTitle,
            hotelLinxDestinationCity: hotelLinxDestination.searchCity,
            hotelLinxDestinationHotel: hotelLinxDestination.searchHotel,
            hotelLinxDestinationType: hotelLinxDestination.searchType,
            hotelLinxDestinationArea: hotelLinxDestination.searchArea,
            hotelLinxDestinationCountry: hotelLinxDestination.searchCountry,
            hotelLinxDestinationType: hotelLinxDestination.searchType,
            hotelLinxDestinationSearch: hotelLinxDestination.searchTitle,
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
            tglAkhirSet: param.tglAkhirSet,
            roomMultiParam: roomMultiParam,
            round: true,
            icons: [{
                icon: "plane",
                name: "Pencarian Hotel",
                route: "FlightSearch",
                iconAnimation: "flight.json",
                type: 'hotel',
                checked: true
            },
            {
                icon: "ellipsis-v",
                name: "Buy Now Stay Later",
                route: "Other",
                iconAnimation: "tour.json",
                type: 'deal',
            },
            ],
        };

        this.setBookingTimeAwal = this.setBookingTimeAwal.bind(this);
        this.setBookingTimeAkhir = this.setBookingTimeAkhir.bind(this);
        this.setHotelLinxDestination = this.setHotelLinxDestination.bind(this);
        this.setRoom = this.setRoom.bind(this);
        this.setRoom(1);
        this.setRoomMulti = this.setRoomMulti.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getConfig();

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


    renderIconService() {
        const { navigation } = this.props;
        const { icons } = this.state;
        return (
            <FlatList
                data={icons}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                                paddingTop: 10,
                                flexDirection: 'row'
                            }}
                            activeOpacity={0.9}
                            onPress={() => {
                                this.onSelectProduct(item);
                            }}
                        >
                            {item.checked ?


                                <View style={{
                                    flex: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // width: 40,
                                    // height: 40,
                                    borderRadius: 5,
                                    backgroundColor: BaseColor.primaryColor,
                                    marginBottom: 5,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5

                                }}>
                                    <Text overline whiteColor bold>
                                        {item.name}
                                    </Text>
                                </View>


                                :
                                <View style={{
                                    flex: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // width: 40,
                                    // height: 40,
                                    borderRadius: 5,
                                    backgroundColor: BaseColor.whiteColor,
                                    marginBottom: 5,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5

                                }}>
                                    <Text overline bold>
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



    // getDate(num){
    //     var MyDate = new Date();
    //     var MyDateString = '';
    //     MyDate.setDate(MyDate.getDate());
    //     var tempoMonth = (MyDate.getMonth()+1);
    //     var tempoDate = (MyDate.getDate()+num);
    //     if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
    //     if (tempoDate < 10) tempoDate = '0' + tempoDate;

    //     return MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
    // }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                ////console.log('getConfig',config);
                this.setState({ config: config });
            }
        });
    }

    getProductHotelPackageCity() {
        const { config } = this.state;

        this.setState({ loading_hotel_package_city: true }, () => {
            var url = config.baseUrl;
            var path = config.common_city_hotel_package.dir;
            var paramUrl = {}



            console.log('getProductHotelPackageCity', url, path, paramUrl);
            var param = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            }

            fetch(url + path, param)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loading_hotel_package_city: false });
                    this.setState({ list_hotel_package_city: result });
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    alert('Kegagalan Respon Server');
                });



        });
    }


    getProductHotelPackage() {
        const { config } = this.state;

        this.setState({ loading_product_hotel_package: true }, () => {
            var url = config.baseUrl;
            var path = config.product_hotel_package.dir;
            var paramUrl = {
                "param": {
                    "id_country": this.state.id_country,
                    "id_city": this.state.id_city,
                    "id_hotelpackage": "",
                    "detail_category": 'buy_now_stay_later',
                    //"detail_category":this.state.detail_category,
                    "search": "",
                    "limit": ""
                }
            }


            console.log('getProductHotelPackage', url, path, paramUrl);
            var param = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramUrl),
            }


            fetch(url + path, param)
                .then(response => response.json())
                .then(result => {
                    console.log('getProductHotelPackage', JSON.stringify(result));
                    this.setState({ loading_product_hotel_package: false });
                    this.setState({ listdata_product_hotel_package: result });
                    this.setState({ listdata_product_hotel_package_original: result });
                })
                .catch(error => { alert('Kegagalan Respon Server') });


        });
    }

    onSelectCity(select) {
        this.setState({ listdata_product_hotel_package: this.state.listdata_product_hotel_package_original });
        this.setState({
            place_city: this.state.place_city.map(item => {
                if (item.id == select.id) {
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

        setTimeout(() => {
            const filters = {
                product_place_2: product_place_2 => product_place_2 === select.id,
            };
            var products = this.state.listdata_product_hotel_package;
            const filtered = this.filterArray(products, filters);
            this.setState({ listdata_product_hotel_package: filtered });
        }, 50);
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







    componentDidMount() {




        this.setRoomMulti(this.state.roomMultiParam);
        // setTimeout(() => {
        //     this.getProductHotelPackage();
        //     this.getProductHotelPackageCity();
        // }, 50);
    }

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


    onSubmit() {
        const { type, product, productPart, paramProduct } = this.state;
        const { navigation } = this.props;
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



        param.city = this.state.hotelLinxDestinationCity;
        param.hotelid = this.state.hotelLinxDestinationHotel;
        param.typeSearch = this.state.hotelLinxDestinationType;
        param.area = this.state.hotelLinxDestinationArea;
        param.country = this.state.hotelLinxDestinationCountry;
        param.room = this.state.roomMultiCountRoom;
        param.stringAdults = this.state.stringAdults;
        param.stringChild = this.state.stringChild;
        param.stringBaby = this.state.stringBaby;


        // param.umurank = this.state.umurank.replace(",0", "");
        // param.stringumurank = this.state.stringumurank.replace(",0", "");

        param.umurank = this.state.umurank;
        param.stringumurank = this.state.stringumurank;


        param.stringRoom = this.state.stringRoom;
        param.adultnchildparam = this.state.adultnchildparam;
        param.checkin = this.convertDateText(param.DepartureDate);
        param.checkout = this.convertDateText(param.ReturnDate);

        param.adults = param.Adults;
        param.child = param.Children;

        param.noofnights = this.getNight(param.DepartureDate, param.ReturnDate);
        param.type = 'hotelLinx';
        param.product_type = "hotel";


        param.roomMultiCountRoom = this.state.roomMultiCountRoom;
        param.roomMultiParam = this.state.roomMultiParam;
        param.roomMultiGuest = this.state.roomMultiGuest;
        param.hotelLinxDestinationLabel = this.state.hotelLinxDestinationLabel;
        param.tglAwal = param.DepartureDate;
        param.tglAkhir = param.ReturnDate;
        param.hotelLinxDestination = this.state.hotelLinxDestination;

        console.log('paramHotelLinx', JSON.stringify(param));
        console.log('hotelLinxDestinationType', this.state.hotelLinxDestinationType);



        if (this.state.hotelLinxDestinationSearch == '') {
            this.dropdown.alertWithType('info', 'Info', 'Tujuan / nama hotel belum dipilih');

        } else {

            if (this.state.hotelLinxDestinationType == 'hotel') {
                this.props.navigation.navigate("ProductDetailNew", {
                    param: param,
                    paramOriginal: param,
                    product: { hotelid: param.hotelid },
                    product_type: "hotel",
                });

            } else {
                console.log('param', JSON.stringify(param));

                param.ratingH = "";
                param.rHotel = "";
                param.srcdata = this.state.hotelLinxDestinationLabel.split(",")[0];
                param.keyword = this.state.hotelLinxDestinationLabel.split(",")[0];
                param.minimbudget = 0;
                param.maximbudget = 50000000;
                param.shortData = "";
                param.startkotak = "0";
                param.searchTitle = this.state.hotelLinxDestinationLabel;
                param.currentPage = 1;

                param.jmlTamu = this.state.roomMultiGuest;

                if (this.state.hotelLinxDestinationType != "hotel") {
                    param.hotelid = "";
                }
                console.log('paramHotellinxSearchAgain', JSON.stringify(param));
                //console.log('parammmmm',JSON.stringify(param));
                this.props.navigation.state.params.filterProcess(param, paramProduct);
                navigation.goBack();



            }

        }

    }



    //-----function untuk hotelLinx-----//

    getNight(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
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
        this.setState({ hotelLinxDestinationSearch: select.searchTitle });
    }
    arradultnchildparam(dataArray, num) {
        var arradultnchildparam = []

        for (var a = 0; a < dataArray[num]['dewasa']; a++) {

            arradultnchildparam.push('Adult');
        }

        for (var a = 0; a < dataArray[num]['anak']; a++) {

            arradultnchildparam.push('Child');
        }

        //console.log('arradultnchildparam',JSON.stringify(arradultnchildparam));

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


        // var stringumurank = dataArray.map(function(elem){
        //             return "2";
        //         }).join(",");

        var stringRoom = dataArray.map(function (elem) {
            return "1";
        }).join(",");

        var strAnakNew = [];


        // var stringumurank = "2";
        // dataArray.map(elem => {
        //     if (elem.umurAnakKe1 == 0 && elem.umurAnakKe2 != 0) {
        //         strAnakNew.push(elem.umurAnakKe2);
        //     } else if (elem.umurAnakKe1 != 0 && elem.umurAnakKe2 == 0) {
        //         strAnakNew.push(elem.umurAnakKe1);
        //     } else if (elem.umurAnakKe1 != 0 && elem.umurAnakKe2 != 0) {
        //         strAnakNew.push(elem.umurAnakKe1);
        //         strAnakNew.push(elem.umurAnakKe2);
        //     } else if (elem.umurAnakKe1 == 0 && elem.umurAnakKe2 == 0) {
        //         strAnakNew.push(0);
        //     }
        // });
        // const index = strAnakNew.indexOf(0);
        // if (index > -1) {
        //     strAnakNew.splice(index, 1);
        // }

        dataArray.map(elem => {
            strAnakNew.push(elem.umurAnakKe1 + '_' + elem.umurAnakKe2);
        });

        strAnakNew2 = [];
        for (a = 0; a < strAnakNew.length; a++) {
            if (strAnakNew[a].includes("_0") == true) {
                let x = strAnakNew[a].replace("_0", "");
                strAnakNew2.push(x);
            } else if (strAnakNew[a].includes("0_0") == true) {

            } else {
                strAnakNew2.push(strAnakNew[a]);
            }

        }

        let umAn = strAnakNew2.join(",");


        stringumurank = strAnakNew.toString();
        console.log('stringumurank', stringumurank);
        console.log('stringumurank', JSON.stringify(strAnakNew))




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
        this.setState({ umurank: umAn });
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

    setBookingTimeAwal(tglAwal) {
        //var type = this.state.type;
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


        // } else {
        //     this.setState({ tglAwal: tglAwal });
        //     this.setState({ tglAkhir: tglAwal });
        // }
    }

    setBookingTimeAkhir(tglAkhir) {
        var tglAwal = this.state.tglAwal;
        var type = this.state.type;

        if (type == 'hotel') {
            var date1 = new Date(tglAwal);
            var date2 = new Date(tglAkhir);

            if (date1 > date2) {
                this.dropdown.alertWithType('info', 'Info', 'Tgl checkin harus lebih besar dari checkout');
            } else if (date1 < date2) {
                this.setState({ tglAkhir: tglAkhir });
                this.setState({ tglAkhirSet: true });
            } else {
                this.dropdown.alertWithType('info', 'Info', 'Tgl checkin harus lebih besar dari checkout');
            }
        } else {
            this.setState({ tglAkhir: tglAkhir });
        }
    }

    getDate(num) {
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var month = tempoMonth;
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;
        var date = MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;


        return date;

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
        month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
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
    //-----function untuk hotelLinx-----//

    renderContentSearch() {
        var loading = this.state.loading;
        var type = this.state.type;
        var title = '';
        var content = <View></View>
        var contentTitle = <View></View>
        var contentButton = <View style={{ flexDirection: 'column' }}><Button
            full
            loading={loading}
            style={{ height: 40, backgroundColor: BaseColor.primaryColor }}
            onPress={() => {
                this.onSubmit();

            }}
        >
            <Text whiteColor>Search</Text>
        </Button></View>
        if (type == "hotel") {
            content = this.renderContentSearchHotel();
            title = 'Pencarian Hotel';


        } else if (type == "deal") {
            content = this.renderContentSearchDeal();
            contentButton = <View></View>
            title = 'Pencarian hotel';
        }

        contentTitle = <TouchableOpacity
            style={styles.itemService}
            activeOpacity={0.9}
            onPress={() => {



            }}
        >
            <View><Text body2 bold>{title}</Text></View>
        </TouchableOpacity>
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {contentTitle}
                {content}
                {contentButton}
            </View>
        );
    }

    renderContentSearchDeal() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;
        var content = <View>
            <FormOptionScreen
                label={'Cari Nama Hotel'}
                title={'Klik disini untuk mencari hotel'}
                icon={'hotel'}
                onPress={() =>
                    navigation.navigate("SelectHotel")
                }
            />
        </View>

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );

    }




    renderContentSearchHotel() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;
        var content = <View style={{ flexDirection: 'column', flex: 1 }}>

            <FormOptionScreen
                label={'Tujuan'}
                title={this.state.hotelLinxDestinationLabel}
                icon={'navigate-outline'}
                onPress={() => {
                    if (this.props.navigation.state.params.searchDetailAgain == false) {
                        navigation.navigate("SelectHotelLinx", {
                            setHotelLinxDestination: this.setHotelLinxDestination,
                        });
                    }



                }}
            />


            <SetDateLong
                labelTglAwal={'Check In'}
                labelTglAkhir={'Check Out'}
                setBookingTimeAwal={this.setBookingTimeAwal}
                setBookingTimeAkhir={this.setBookingTimeAkhir}
                tglAwal={this.state.tglAwal}
                tglAkhir={this.state.tglAkhir}
                round={this.state.round}
                icon={'ios-calendar-outline'}
            />

            <FormOptionScreen
                label={'Tamu Hotel'}
                title={this.state.roomMultiCountRoom + ' kamar, ' + this.state.roomMultiGuest + ' tamu'}
                icon={'md-person-outline'}
                onPress={() => {
                    navigation.navigate("HotelLinxGuest", {
                        roomMultiCountRoom: this.state.roomMultiCountRoom,
                        roomMultiParam: this.state.roomMultiParam,
                        roomMultiGuest: this.state.roomMultiGuest,
                        setRoomMulti: this.setRoomMulti



                    });
                }}
            />

        </View>

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {content}
            </View>
        );

    }

    renderItem(item, index) {
        const { navigation } = this.props;
        const { config, param } = this.state;

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
                loading={this.state.loading_product_hotel_package}
                propOther={{ inFrame: true, horizontal: false, width: (width - 50) / 2 }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}

                style={[
                    index % 2 ? { marginLeft: 10 } : {}
                ]
                }
            />
        );
    }


    renderContent() {
        const { config } = this.state;
        const { navigation } = this.props;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{ marginTop: 10, flexDirection: 'row' }}>

                {
                    this.state.listdata_product_hotel_package.length != 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                numColumns={2}
                                columnWrapperStyle={{
                                    flex: 1,
                                    justifyContent: 'space-evenly',
                                    marginBottom: 10
                                }}
                                style={{ marginHorizontal: 20 }}
                                //horizontal={false}
                                data={this.state.listdata_product_hotel_package}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id}

                                removeClippedSubviews={true} // Unmount components when outside of window 
                                initialNumToRender={2} // Reduce initial render amount
                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                maxToRenderPerBatch={1000} // Increase time between renders
                                windowSize={7} // Reduce the window size

                                getItemLayout={(item, index) => (
                                    { length: 70, offset: 70 * index, index }
                                )}
                                onScrollEndDrag={() => console.log("end")}
                                onScrollBeginDrag={() => console.log("start")}
                                onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                            />
                        </View>
                        :
                        <DataEmpty />
                }
            </View>
        );

    }


    render() {
        const { navigation } = this.props;
        const { place_city } = this.state;
        var filterCity = <View></View>
        var filterTitle = '';
        if (this.state.filterTitle != '') {
            filterTitle = this.state.filterTitle;
        }

        if (this.state.id_city == '') {
            filterCity = <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 20 }}>
                <View style={{ marginLeft: 20 }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={place_city}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (

                            this.state.loading_hotel_package_city ?
                                <View style={[{ marginRight: 10, width: 100, height: 30 },
                                {
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 17,
                                    backgroundColor: BaseColor.lightPrimaryColor,
                                    borderColor: BaseColor.lightPrimaryColor,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }
                                ]}>
                                </View>
                                :
                                <Tag
                                    primary={item.checked}
                                    style={[{ marginRight: 10, width: 100 }]}
                                    outline={!item.checked}
                                    onPress={() => {
                                        this.onSelectCity(item)
                                    }}
                                >
                                    {item.name}
                                </Tag>
                        )}
                    />
                </View>
            </View>
        }
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.secondColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotel"
                    //subTitle={filterTitle}
                    transparent={true}
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
