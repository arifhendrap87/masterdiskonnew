import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightItem,
    FilterSort,
} from "@components";
// import styles from "./styles";
import { FlightData, DataLoading, DataFlight, DataFlightVia } from "@data";
import { FlightSearch } from "@data";
import { PostData } from '../../services/PostData';
import { AsyncStorage } from 'react-native';
import Modal from "react-native-modal";
import AnimatedLoader from "react-native-animated-loader";
import DataEmpty from "../../components/DataEmpty";
import FlightItemVia from "../../components/FlightItemVia";
import NotYetLogin from "../../components/NotYetLogin";
import DropdownAlert from 'react-native-dropdownalert';


import * as Utils from "@utils";


import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

import Timeline from 'react-native-timeline-flatlist';



const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
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
    scrollView: {
        height: '20%',
        width: '80%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        paddingBottom: 50
    }
});

export default function FlightResultVia(props) {
    let { navigation, auth } = props;
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);

    const dispatch = useDispatch();
    var paramx = navigation.state.params.param;
    ////console.log('paramFlightResult', JSON.stringify(paramx));
    var Origin = 'Origin=' + paramx.Origin;
    var Destination = '&Destination=' + paramx.Destination;
    var DepartureDate = '&DepartureDate=' + paramx.DepartureDate;
    var Adults = '&Adults=' + paramx.Adults;
    var Children = '&Children=' + paramx.Children;
    var Infants = '&Infants=' + paramx.Infants;
    var CorporateCode = '&CorporateCode';
    var Subclasses = '&Subclasses=false';
    var CabinClass = '&CabinClass=' + paramx.CabinClass[0];
    var Airlines = '&Airlines=';


    if (paramx.IsReturn == true) {
        var ReturnDate = '&ReturnDate=' + paramx.ReturnDate;
    } else {
        var ReturnDate = '';
    }


    var paramUrlx = Origin + Destination + DepartureDate + ReturnDate + Adults + Children + Infants + CorporateCode + Subclasses + CabinClass + Airlines;
    const [param, setParam] = useState(paramx);
    const [paramUrl, setParamUrl] = useState(paramUrlx);
    const [flights, setFlights] = useState(FlightData);
    const [filterParam, setFilterParam] = useState({});
    const [scrollAnim, setScrollAnim] = useState(new Animated.Value(0));
    const [offsetAnim, setOffsetAnim] = useState(new Animated.Value(0));
    const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(
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
    ));
    const [listdataDeparture, setListdataDeparture] = useState(DataFlightVia);
    const [dataTimeline, setDataTimeline] = useState('');
    const [listdataReturn, setListdataReturn] = useState([]);
    const [listdataDepartureOriginal, setListadataDepartureOriginal] = useState([]);
    const [listdataReturnOriginal, setListdataReturnOriginal] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCheckout, setLoadingCheckout] = useState(false)


    function filter_destination(data) {

        var filtersParam = {}
        filtersParam.filter_destination = filter_destination => filter_destination == param.Destination;
        var products = data;
        var filters = filtersParam;
        const filtered = filterArray(products, filters);
        return filtered;
    }

    function filter_origin(data) {

        var filtersParam = {}
        filtersParam.filter_origin = filter_origin => filter_origin == param.Origin;
        var products = data;
        var filters = filtersParam;
        const filtered = filterArray(products, filters);
        return filtered;
    }

    function rebuild(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;
            obj['data_type'] = "real";
            obj['id'] = item.id;
            obj['type'] = item.type;
            obj['price'] = item.price;
            obj['name'] = item.name;
            obj['code'] = item.code;
            obj['image'] = item.image;
            obj['duration'] = item.duration;
            obj['transit'] = item.transit;
            obj['detail'] = item.detail;
            obj['filter'] = item.filter;
            obj['filter_price'] = item.filter.price;
            obj['filter_airline_code'] = item.filter.airline_code;
            obj['filter_transit'] = item.filter.transit;
            obj['filter_entertainment'] = item.filter.entertainment == true ? 1 : 0;
            obj['filter_baggage'] = item.filter.baggage == true ? 1 : 0;
            obj['filter_meal'] = item.filter.meal == true ? 1 : 0;
            obj['filter_duration'] = item.filter.duration;
            obj['filter_departure_time'] = Math.ceil(parseFloat(item.filter.departure_time.substr(0, 2) + '.' + item.filter.departure_time.substr(3, 2)));
            obj['filter_departure_time_num'] = parseInt(item.filter.departure_time.substr(0, 2) + item.filter.departure_time.substr(3, 2));
            obj['filter_arrival_time'] = Math.ceil(parseFloat(item.filter.arrival_time.substr(0, 2) + '.' + item.filter.arrival_time.substr(3, 2)));
            obj['filter_arrival_time_num'] = parseInt(item.filter.arrival_time.substr(0, 2) + item.filter.arrival_time.substr(3, 2));



            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    function convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    useEffect(() => {
        console.log('paramflight', JSON.stringify(param));
        getProduct(param);
        return () => {
        }
    }, []);


    function getProduct(param) {


        setLoadingProduct(true);
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + 'booking/search';
        //console.log('configApi', JSON.stringify(config));
        //console.log('urlss', url);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);


        var raw = JSON.stringify({
            "product": "flight",
            "from": param.Origin,
            "to": param.Destination,
            "dateFrom": convertDateDMY(param.DepartureDate),
            "dateTo": param.ReturnDate == "" ? param.ReturnDate : convertDateDMY(param.ReturnDate),
            "pax": {
                "adult": parseInt(param.Adults),
                "child": parseInt(param.Children),
                "infant": parseInt(param.Infants)
            },
            "filter": {
                "airlines": [],
                "direct": param.isDirectOnly
            },
            "classCabin": param.kelasId
        });
        console.log('paramFlightVia', raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let timeout = 10000;
        let timeout_err = {
            ok: false,
            status: 408,
        };

        return new Promise(function (resolve, reject) {
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log('resultGetProduct', JSON.stringify(result));

                    setLoadingProduct(false);

                    if (result.data.options.length != 0) {
                        console.log('productrebuild', 'adadata');
                        optionsRebuild = rebuild(result.data.options);
                        optionsRebuildRt = rebuild(result.data.optionsRt);

                        setListdataDeparture(optionsRebuild);
                        setListdataReturn(optionsRebuildRt);
                        setListadataDepartureOriginal(optionsRebuild);
                        setListdataReturnOriginal(optionsRebuildRt);
                    } else {
                        console.log('productrebuild', 'tidak ada data');
                        setListdataDeparture([]);
                        setListdataReturn([]);
                        setListadataDepartureOriginal([]);
                        setListdataReturnOriginal([]);
                        setEmpty(true);

                    }


                })
                .catch(error => {
                    console.log('productrebuild', 'data error');
                    setListdataDeparture([]);
                    setListdataReturn([]);
                    setListadataDepartureOriginal([]);
                    setListdataReturnOriginal([]);
                    setEmpty(true);
                });

            setTimeout(() => {
                reject.bind(null, timeout_err);
            }, timeout);

        });







    }

    function sortProcess(selected) {
        console.log('sortProcessSelect', selected);
        setListdataDeparture(listdataDepartureOriginal);
        // setListdataDeparture(listdataDepartureOriginal);
        setTimeout(() => {
            setLoadingProduct(true);
            if (selected == 'low_price') {
                sortLowestPrice();
            } else if (selected == 'hight_price') {
                sortHightestPrice();
            } else if (selected == 'early_departure_time') {
                sortEarlyDepartureTime();
            } else if (selected == 'end_departure_time') {
                sortEndDepartureTime();
            } else if (selected == 'early_arrival_time') {
                sortEarlyArrivalTime();
            } else if (selected == 'end_arrival_time') {
                sortEndArrivalTime();
            } else if (selected == 'shortest_duration') {
                sortShortDuration();
            }
        }, 50);

    }

    function sortLowestPrice() {
        //----------untuk sort asc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return -1;
            if (a.filter_price > b.filter_price)
                return 1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function sortHightestPrice() {
        //----------untuk sort desc---------//
        console.log('listdataDeparture_sortHightestPrice', JSON.stringify(listdataDeparture));

        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return 1;
            if (a.filter_price > b.filter_price)
                return -1;
        });
        console.log('listdataDeparture_sortHightestPrice_sort', JSON.stringify(results));
        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function sortEarlyDepartureTime() {
        //----------untuk sort asc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return -1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return 1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function sortEndDepartureTime() {
        //----------untuk sort desc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return 1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return -1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function sortEarlyArrivalTime() {
        //----------untuk sort asc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return -1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return 1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function sortEndArrivalTime() {
        //----------untuk sort desc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return 1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return -1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);

    }

    function sortShortDuration() {
        //----------untuk sort asc---------//
        var data = eval(listdataDeparture);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_duration == b.filter_duration)
                return 0;
            if (a.filter_duration < b.filter_duration)
                return -1;
            if (a.filter_duration > b.filter_duration)
                return 1;
        });

        setListdataDeparture(results);
        setLoadingProduct(false);
    }

    function onFilter() {

        navigation.navigate("FlightFilter",
            {
                listdata: listdataDepartureOriginal,
                filterProcess: filterProcess,
                filterParam: filterParam
            }
        );
    }

    function onClear() {
        setLoadingProduct(true);
        setListdataDeparture(listdataDepartureOriginal);
        setTimeout(() => {
            setLoadingProduct(false);
        }, 500);
    }

    function filterProcess(filter) {
        console.log('listdataDepartureOriginal', JSON.stringify(listdataDepartureOriginal));
        setLoadingProduct(true);
        setListdataDeparture(listdataDepartureOriginal);

        console.log('filter_param', JSON.stringify(filter));
        setFilterParam(filter);
        var listdatafilter = {};
        if (filter.filter_airline_code.length != 0) {
            listdatafilter.filter_airline_code = filter_airline_code => filter.filter_airline_code.includes(filter_airline_code.toUpperCase());
        }

        if (filter.filter_transit.length != 0) {
            listdatafilter.filter_transit = filter_transit => filter.filter_transit.includes(filter_transit);
        }

        if (filter.filter_entertainment == 1) {
            listdatafilter.filter_entertainment = filter_entertainment => filter_entertainment === filter.filter_entertainment;
        }

        if (filter.filter_baggage == 1) {
            listdatafilter.filter_baggage = filter_baggage => filter_baggage === filter.filter_baggage;
        }

        if (filter.filter_meal == 1) {
            listdatafilter.filter_meal = filter_meal => filter_meal === filter.filter_meal;
        }

        listdatafilter.filter_departure_time = filter_departure_time => filter_departure_time <= filter.filter_departure_time[0].max && filter_departure_time >= filter.filter_departure_time[0].min;
        listdatafilter.filter_arrival_time = filter_arrival_time => filter_arrival_time <= filter.filter_arrival_time[0].max && filter_arrival_time >= filter.filter_arrival_time[0].min;
        listdatafilter.filter_price = filter_price => filter_price <= filter.filter_price[1] && filter_price >= filter.filter_price[0];

        console.log('listdatafilter', JSON.stringify(listdatafilter));

        setTimeout(() => {
            var listdata = listdataDepartureOriginal;
            console.log('listdata', JSON.stringify(listdata));
            const filtered = filterArray(listdata, listdatafilter);
            setListdataDeparture(filtered);
            setLoadingProduct(false);
        }, 500);
    }

    function filterArray(array, filters) {

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

    function searchAgain(param) {
        //console.log('paramsearchAgain', JSON.stringify(param));
        var Origin = 'Origin=' + param.Origin;
        var Destination = '&Destination=' + param.Destination;
        var DepartureDate = '&DepartureDate=' + param.DepartureDate;
        var Adults = '&Adults=' + param.Adults;
        var Children = '&Children=' + param.Children;
        var Infants = '&Infants=' + param.Infants;
        var CorporateCode = '&CorporateCode';
        var Subclasses = '&Subclasses=false';
        var CabinClass = '&CabinClass=' + param.CabinClass[0];
        var Airlines = '&Airlines=';


        if (param.IsReturn == true) {
            var ReturnDate = '&ReturnDate=' + param.ReturnDate;
        } else {
            var ReturnDate = '';
        }


        var parUrl = Origin + Destination + DepartureDate + ReturnDate + Adults + Children + Infants + CorporateCode + Subclasses + CabinClass + Airlines;

        setParamUrl(parUrl);
        setParam(param);
        getProduct(param);


        // setTimeout(() => {
        //     getProduct();
        // }, 50);

    }

    function mapOrder(array, order, key) {

        array.sort(function (a, b) {
            var A = a[key], B = b[key];

            if (order.indexOf(A) > order.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }

        });

        return array;
    };

    function removePrice(dataObj) {
        var array = {};
        for (var key in dataObj) {
            var obj = {};
            if (key != 'price') {
                array[key] = dataObj[key];
            }
        }
        return array;

    }

    function onSelectDetail(select) {
        //console.log('onSelectDetail', JSON.stringify(select));
        navigation.navigate("FlightDetailVia", {
            select: select,
        });
    }

    function onSelect(select) {
        //console.log('selectSelectArrival', JSON.stringify(select));
        //console.log('paramSelectArrival', JSON.stringify(param));
        if (select.type == "combined" || param.ReturnDate == "") {
            setLoadingCheckout(true);
            setLoadingProduct(true);
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + 'booking/repricing';
            //console.log('configApi', JSON.stringify(config));
            //console.log('urlonSelectArrival', url);




            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);

            var paramPrice = {
                "product": "flight",
                "productOption": [
                    select.id,
                    ""
                ]
            };
            //console.log('paramPrice', JSON.stringify(paramPrice));
            var raw = JSON.stringify(paramPrice);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log('resultonSelect', JSON.stringify(result));
                    if (result.success == true) {
                        setLoadingCheckout(false);
                        setLoadingProduct(false);
                        param.totalPrice = result.data.price.total;
                        param.key = result.data.key;
                        var dataPrice = {
                            required_dob: result.data.conditions.dobReq,
                            required_passport: result.data.conditions.passport.mandatory,
                            total_price: result.data.price.total,
                            subtotal_price: result.data.price.subtotal,
                            nett_price: result.data.price.subtotal,
                            iwjr: result.data.price.iwjr,
                            insurance_total: result.data.extra.insurance.price,
                            transaction_fee: result.data.price.fee,
                            tax_fee: result.data.price.tax,
                            point_user: 0
                        }

                        var paramAll = {
                            param: param,
                            selectDataDeparture: select,
                            selectDataReturn: null,
                            departurePost: [],
                            returnPost: [],
                            dataPrice: dataPrice,
                            extra: result.data.extra,
                            resultVia: result

                        };
                        //console.log('paramAll', JSON.stringify(paramAll));
                        navigation.navigate("SummaryGeneral",
                            {
                                param: paramAll,

                            });
                    } else {
                        setLoadingCheckout(false);
                        setLoadingProduct(false);
                        this.dropdown.alertWithType('info', 'Info', 'Tiket tidak tersedia, coba ulangi pencarian');

                    }


                })
                .catch(error => {

                    setLoadingProduct(false);
                    var isEmpty = this.isEmpty(error);
                    if (isEmpty == true) {
                        this.dropdown.alertWithType('info', 'Info', 'Coba klik sekali lagi');
                    }
                });

        } else {
            setLoadingProduct(false);
            navigation.navigate("FlightResultArrivalVia",
                {
                    param: param,
                    //paramOther:paramOther,
                    listdataReturn: listdataReturn,
                    listdataReturnOriginal: listdataReturnOriginal,
                    selectDataDeparture: select
                });

        }





    }


    function isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }

    function renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        var content = <View></View>
        var dataList = DataFlight;

        if (loadingProduct == false) {
            dataList = listdataDeparture;
        }
        ////console.log('dataList',JSON.stringify(dataList));

        if (listdataDeparture.length != 0) {



            content = <FlatList
                data={dataList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                //keyExtractor={(item, index) => String(item.id)}
                getItemLayout={(item, index) => (
                    { length: 70, offset: 70 * index, index }
                )}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={7} // Reduce the window size
                renderItem={({ item, index }) => (


                    <FlightItemVia
                        //loading={loadingProduct}
                        loading={loadingProduct}
                        style={{ marginBottom: 0, marginHorizontal: 0 }}
                        itemData={item}
                        onPress={() => onSelect(item)}
                        onPressDetail={() => onSelectDetail(item)}
                    />
                )}
            />
        } else {
            content = <DataEmpty />
        }

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
    }

    function convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }


    var qty = parseInt(param.Adults) + parseInt(param.Children) + parseInt(param.Infants);
    var kelas = "";
    if (param.CabinClass == 'E') {
        kelas = "Economy Class";
    } else if (param.CabinClass == 'S') {
        kelas = "Premium Economy";
    } else if (param.CabinClass == 'B') {
        kelas = "Business Class";
    } else if (param.CabinClass == 'F') {
        kelas = "First Class";
    }
    var subTitle = convertDateText(param.DepartureDate) + ", " + qty + " pax, " + kelas;

    var information = [
        { title: "County", detail: 'asd' },
        { title: "Category", detail: 'asd' },
        { title: "Duration", detail: 'asdsad' },
    ]

    function renderItem(item, index) {

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (

            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: BaseColor.whiteColor, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flex: 3, padding: 10 }}>
                    <PlaceholderLine width={80} style={{ height: 30 }} />
                    <PlaceholderLine width={80} style={{ height: 10 }} />
                    <PlaceholderLine width={80} style={{ height: 10 }} />
                    <PlaceholderLine width={80} style={{ height: 10 }} />
                </View>
                <View style={{ flex: 7, padding: 10, alignContent: 'flex-end' }}>
                    <PlaceholderLine width={50} style={{ alignItems: 'flex-end' }} />
                    <PlaceholderLine width={100} />
                    <PlaceholderLine width={50} />
                </View>

            </View>

        );
    }

    return (
        loadingCheckout ?

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        top: 220,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <AnimatedLoader
                        visible={true}
                        overlayColor="rgba(255,255,255,0.1)"
                        source={

                            require("app/assets/loader_paperline.json")

                        }
                        animationStyle={{ width: 300, height: 300 }}
                        speed={1}
                    />
                    <Text>
                        Connecting..Masterdiskon
                    </Text>
                </View>
            </View>
            :


            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                {/* {
                    login == true ? */}
                <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', flex: 0.05, backgroundColor: BaseColor.primaryColor, paddingVertical: 5 }}>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                    style={{ marginLeft: 20 }}
                                >
                                    <Icon
                                        name="md-arrow-back"
                                        size={20}
                                        color={BaseColor.whiteColor}
                                        style={{}}
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{ flex: 8 }}>
                                <View style={{ paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text caption1 style={{ color: BaseColor.whiteColor }}>{param.bandaraAsalCode} - {param.bandaraTujuanCode}, {param.jumlahPerson} penumpang</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text caption1 style={{ color: BaseColor.whiteColor }}>{param.IsReturn == true ? 'Berangkat - ' + convertDateText(param.tglAwal) : '' + convertDateText(param.tglAwal)}</Text>

                                    </View>
                                </View>

                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("FlightSearchAgain",
                                            {
                                                param: param,
                                                searchAgain: searchAgain
                                            }
                                        );
                                    }}
                                    style={{ marginLeft: 20 }}
                                >
                                    <Icon
                                        name="create-outline"
                                        size={24}
                                        color={BaseColor.whiteColor}
                                        style={{}}
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ flex: 0.9, marginTop: 10 }}>
                            {
                                loadingProduct ?
                                    <View style={{ flex: 1 }}>
                                        <View style={{ marginHorizontal: 20, flex: 1 }}>
                                            {renderItem()}
                                            {renderItem()}
                                            {renderItem()}
                                            {renderItem()}
                                            {renderItem()}
                                        </View>

                                    </View>
                                    :
                                    <View style={{ marginHorizontal: 20, flex: 1 }}>
                                        {renderContent()}
                                    </View>
                            }


                        </View>

                        {
                            loadingProduct ?
                                <View style={
                                    [{ paddingHorizontal: 15, flex: 0.05, backgroundColor: 'white' },
                                    {

                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }]
                                }>
                                    <View style={{ flex: 1 }}>
                                        <Placeholder
                                            Animation={Fade}
                                            style={{ marginTop: 5 }}
                                        >
                                            <PlaceholderLine width={80} height={10} />
                                        </Placeholder>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Placeholder
                                            Animation={Fade}
                                            style={{ marginTop: 5 }}
                                        >
                                            <PlaceholderLine width={80} height={10} />
                                        </Placeholder>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Placeholder
                                            Animation={Fade}
                                            style={{ marginTop: 5 }}
                                        >
                                            <PlaceholderLine width={80} height={10} />
                                        </Placeholder>
                                    </View>

                                </View>


                                :
                                <FilterSort
                                    onFilter={onFilter}
                                    onClear={onClear}
                                    sortProcess={sortProcess}
                                    style={
                                        [{ marginHorizontal: 15, flex: 0.05 }]
                                    }
                                />
                        }


                    </View>
                    {/* :
                        <NotYetLogin redirect={'FlightResultVia'} navigation={navigation} param={this.props.navigation.state.params.param} />
                } */}
                    <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

                </View>
            </SafeAreaView>
    );
}


