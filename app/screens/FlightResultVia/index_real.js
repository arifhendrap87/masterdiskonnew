import React, { Component } from "react";
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


export default class FlightResultVia extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var param = this.props.navigation.state.params.param;
        console.log('paramFlightResult', JSON.stringify(param));
        console.log('DataFlightVia', JSON.stringify(DataFlightVia));
        //var paramOther=this.props.navigation.state.params.paramOther;

        // var listdata_departure_original=[];
        // var listdata_return_original=[];

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


        var paramUrl = Origin + Destination + DepartureDate + ReturnDate + Adults + Children + Infants + CorporateCode + Subclasses + CabinClass + Airlines;
        //console.log('paramUrl',JSON.stringify(paramUrl));

        this.state = {
            refreshing: false,
            flights: FlightData,
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

            param: param,
            paramUrl: paramUrl,

            //paramOther:paramOther,
            listdata_departure: DataFlightVia,
            data_timeline: '',
            listdata_return: [],

            listdata_departure_original: [],
            listdata_return_original: [],


            modalVisible: false,
            loading_load_more: false,
            loading_spinner: false,
            empty: false,
            login: true
        };
        this.filterProcess = this.filterProcess.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.sortProcess = this.sortProcess.bind(this);
        this.searchAgain = this.searchAgain.bind(this);

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
                this.setState({ config: config });
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


    filter_destination(data) {
        var param = this.state.param;
        var filtersParam = {}
        filtersParam.filter_destination = filter_destination => filter_destination == param.Destination;
        var products = data;
        var filters = filtersParam;
        const filtered = this.filterArray(products, filters);
        return filtered;
    }

    filter_origin(data) {
        var param = this.state.param;
        var filtersParam = {}
        filtersParam.filter_origin = filter_origin => filter_origin == param.Origin;
        var products = data;
        var filters = filtersParam;
        const filtered = this.filterArray(products, filters);
        return filtered;
    }

    rebuild(listdata) {
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


    convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    getProduct() {
        var param = this.state.param;
        var paramUrl = this.state.paramUrl;
        console.log('param', JSON.stringify(param));
        console.log('paramUrl', JSON.stringify(paramUrl));
        console.log('listdata_departureGetProduct', JSON.stringify(this.state.listdata_departure));

        this.setState({ loading_data: true }, () => {
            let config = this.state.configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + 'booking/search';
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "product": "flight",
                "from": param.Origin,
                "to": param.Destination,
                "dateFrom": this.convertDateDMY(param.DepartureDate),
                "dateTo": param.ReturnDate == "" ? param.ReturnDate : this.convertDateDMY(param.ReturnDate),
                "pax": {
                    "adult": parseInt(param.Adults),
                    "child": parseInt(param.Children),
                    "infant": parseInt(param.Infants)
                },
                "filter": {
                    "airlines": [],
                    "direct": param.isDirectOnly
                }
            });
            console.log('paramFlightVia', raw);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log('resultGetProduct', JSON.stringify(result));
                    this.setState({ loading_data: false });

                    if (result.data.options.length != 0) {
                        optionsRebuild = this.rebuild(result.data.options);
                        optionsRebuildRt = this.rebuild(result.data.optionsRt);
                        this.setState({ listdata_departure: optionsRebuild });
                        this.setState({ listdata_return: optionsRebuildRt });
                        this.setState({ listdata_departure_original: optionsRebuild });
                        this.setState({ listdata_return_original: optionsRebuildRt });
                    } else {
                        this.setState({ empty: true });

                    }

                    setTimeout(() => {
                        // console.log('listdata_departureNew', JSON.stringify(this.state.listdata_departure));
                        // console.log('listdata_returneNew', JSON.stringify(this.state.listdata_return));
                    }, 20);
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });





        });

    }





    sortProcess(selected) {
        console.log('sortProcessSelect', selected);
        this.setState({ listdata_departure: this.state.listdata_departure_original });
        setTimeout(() => {
            if (selected == 'low_price') {
                this.sortLowestPrice();

            } else if (selected == 'hight_price') {
                this.sortHightestPrice();

            } else if (selected == 'early_departure_time') {

                this.sortEarlyDepartureTime();

            } else if (selected == 'end_departure_time') {
                this.sortEndDepartureTime();

            } else if (selected == 'early_arrival_time') {
                this.sortEarlyArrivalTime();

            } else if (selected == 'end_arrival_time') {
                this.sortEndArrivalTime();

            } else if (selected == 'shortest_duration') {
                this.sortShortDuration();
            }
        }, 50);

    }

    sortLowestPrice() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return -1;
            if (a.filter_price > b.filter_price)
                return 1;
        });

        this.setState({ listdata_departure: results });
    }

    sortHightestPrice() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return 1;
            if (a.filter_price > b.filter_price)
                return -1;
        });

        this.setState({ listdata_departure: results });
    }


    sortEarlyDepartureTime() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return -1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return 1;
        });

        this.setState({ listdata_departure: results });
    }


    sortEndDepartureTime() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return 1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return -1;
        });

        this.setState({ listdata_departure: results });
    }


    sortEarlyArrivalTime() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return -1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return 1;
        });

        this.setState({ listdata_departure: results });
    }


    sortEndArrivalTime() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return 1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return -1;
        });

        this.setState({ listdata_departure: results });
    }


    sortShortDuration() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_departure);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_duration == b.filter_duration)
                return 0;
            if (a.filter_duration < b.filter_duration)
                return -1;
            if (a.filter_duration > b.filter_duration)
                return 1;
        });

        this.setState({ listdata_departure: results });
    }



    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("FlightFilter",
            {
                listdata: this.state.listdata_departure_original,
                filterProcess: this.filterProcess
            }
        );
    }

    onClear() {
        this.setState({ listdata_departure: this.state.listdata_departure_original });
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




    filterProcess(filter) {
        console.log('filterProcess', JSON.stringify(filter));
        var listdata = this.state.listdata_departure;
        console.log('listdata', JSON.stringify(listdata));



        this.onClear();
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



        setTimeout(() => {
            const filtered = this.filterArray(listdata, listdatafilter);
            console.log('filterresult', JSON.stringify(filtered));
            this.setState({ listdata_departure: filtered });
        }, 50);
    }

    searchAgain(param) {
        const { navigation } = this.props;
        console.log('paramsearchAgain', JSON.stringify(param));

        // this.setState({listdata_departure:[]});
        // this.setState({listdata_return:[]});

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


        var paramUrl = Origin + Destination + DepartureDate + ReturnDate + Adults + Children + Infants + CorporateCode + Subclasses + CabinClass + Airlines;
        this.setState({ paramUrl: paramUrl });
        this.setState({ param: param });

        setTimeout(() => {
            this.getProduct();
        }, 50);

    }




    mapOrder(array, order, key) {

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

    onSelectDetail(select) {
        console.log('onSelectDetail', JSON.stringify(select));
        const { navigation } = this.props;
        navigation.navigate("FlightDetailVia", {
            select: select,
        });
    }


    onSelect(select) {
        // AsyncStorage.getItem('userSession', (error, result) => {
        //     if (result) {
        const { param } = this.state;
        console.log('param', JSON.stringify(param));
        console.log('listdata_return', JSON.stringify(this.state.listdata_return));
        console.log('listdata_return_original', JSON.stringify(this.state.listdata_return_original));
        console.log('select', JSON.stringify(select));

        if (select.type == "combined" || param.ReturnDate == "") {
            this.setState({ loading_spinner: true }, () => {

                let config = this.state.configApi;
                let baseUrl = config.apiBaseUrl;
                let url = baseUrl + 'booking/repricing';
                console.log('configApi', JSON.stringify(config));
                console.log('urlss', url);




                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var paramPrice = {
                    "product": "flight",
                    "productOption": [
                        select.id,
                        ""
                    ]
                };
                console.log('paramPrice', JSON.stringify(paramPrice));
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
                        console.log('resultonSelect', JSON.stringify(result));
                        if (result.success == true) {
                            this.setState({ loading_spinner: false });


                            param.totalPrice = result.data.price.total;
                            param.key = result.data.key;
                            var dataPrice = {
                                required_dob: false,
                                required_passport: false,
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
                            console.log('paramAll', JSON.stringify(paramAll));
                            this.props.navigation.navigate("SummaryGeneral",
                                {
                                    param: paramAll,

                                });
                        } else {
                            this.setState({ loading_spinner: false });
                            this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                        }


                    })
                    .catch(error => {
                        this.setState({ loading_spinner: false });
                        var isEmpty = this.isEmpty(error);
                        if (isEmpty == true) {
                            this.dropdown.alertWithType('info', 'Info', 'Coba klik sekali lagi');
                        }
                    });
            });
        } else {
            console.log('listdata_returnonSelect', JSON.stringify(this.state.listdata_return));
            this.props.navigation.navigate("FlightResultArrivalVia",
                {
                    param: param,
                    //paramOther:paramOther,
                    listdata_return: this.state.listdata_return,
                    listdata_return_original: this.state.listdata_return_original,
                    selectDataDeparture: select
                });

        }
        //     } else {
        //         this.setState({ login: false });

        //     }




        // });




    }

    isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }


    renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { flights, refreshing, clampedScroll, loading_data } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        var content = <View></View>
        var dataList = DataFlight;

        if (loading_data == false) {
            dataList = this.state.listdata_departure;
        }
        //console.log('dataList',JSON.stringify(dataList));

        if (this.state.empty == false) {



            content = <Animated.FlatList
                contentContainerStyle={{
                    // paddingTop: 50,
                    // paddingBottom: 20
                }}

                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollAnim
                                }
                            }
                        }
                    ],
                    { useNativeDriver: true }
                )}
                data={dataList}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (


                    <FlightItemVia
                        //loading={loading_data}
                        loading={loading_data}
                        style={{ marginBottom: 10, marginHorizontal: 20 }}
                        itemData={item}
                        onPress={() => this.onSelect(item)}
                        onPressDetail={() => this.onSelectDetail(item)}
                    />
                )}
            />
        } else {
            content = <DataEmpty />
        }

        return (
            <View style={{ flex: 1 }}>
                {content}

                {/* <Animated.View
                    style={[
                        styles.navbar,
                        { transform: [{ translateY: navbarTranslate }] }
                    ]}
                >
                    <FilterSort
                        onFilter={this.onFilter}
                        onClear={this.onClear}
                        sortProcess={this.sortProcess}
                    />
                </Animated.View> */}
            </View>
        );
    }




    componentDidMount() {
        const { navigation } = this.props;
        console.log('flightResultVia');
        setTimeout(() => {
            this.getProduct();
        }, 50);

    }


    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }


    render() {
        const { navigation } = this.props;
        let { loading_data, loading_load_more, loading_spinner, login } = this.state;
        var param = this.state.param;
        var title = param.Origin + " to " + param.Destination;
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
        var subTitle = this.convertDateText(param.DepartureDate) + ", " + qty + " pax, " + kelas;
        var modalVisible = this.state.modalVisible;

        var information = [
            { title: "County", detail: 'asd' },
            { title: "Category", detail: 'asd' },
            { title: "Duration", detail: 'asdsad' },
        ]

        return (
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
                                        <Text caption1 style={{ color: BaseColor.whiteColor }}>{this.convertDateText(param.tglAwal)}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("FlightSearchAgain",
                                                    {
                                                        param: this.state.param,
                                                        searchAgain: this.searchAgain
                                                    }
                                                );
                                            }}
                                        >
                                            <Icon
                                                name="create-outline"
                                                size={16}
                                                color={BaseColor.secondColor}
                                                style={{ marginLeft: 10 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flex: 2 }} />
                        </View>
                        <View style={{ flex: 0.9, marginTop: 20 }}>
                            {
                                loading_spinner ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                                                source={require("app/assets/loader_paperline.json")}
                                                animationStyle={{ width: 300, height: 300 }}
                                                speed={1}
                                            />
                                            <Text>
                                                Connecting.. to Flight
                                        </Text>
                                        </View>
                                    </View>
                                    :
                                    this.renderContent()
                            }



                            {
                                loading_load_more ?
                                    <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                                    :
                                    <View></View>
                            }
                        </View>

                        {
                            loading_data || loading_spinner ?
                                <View></View>

                                :
                                <FilterSort
                                    onFilter={this.onFilter}
                                    onClear={this.onClear}
                                    sortProcess={this.sortProcess}
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
}
