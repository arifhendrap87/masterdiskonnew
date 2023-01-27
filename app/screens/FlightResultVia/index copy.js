import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    Text
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightItem,
    FilterSort,
} from "@components";
import styles from "./styles";
import { FlightData, DataLoading, DataFlight } from "@data";
import { FlightSearch } from "@data";
import { PostData } from '../../services/PostData';
import { AsyncStorage } from 'react-native';
import Modal from "react-native-modal";
import AnimatedLoader from "react-native-animated-loader";
import DataEmpty from "../../components/DataEmpty";


import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

import Timeline from 'react-native-timeline-flatlist';

export default class FlightResult extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        var param = this.props.navigation.state.params.param;
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
            listdata_departure: DataFlight,
            data_timeline: '',
            listdata_return: [],

            listdata_departure_original: [],
            listdata_return_original: [],


            modalVisible: false,
            loading_load_more: true,
            loading_spinner: false,
            empty: false
        };
        this.filterProcess = this.filterProcess.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.sortProcess = this.sortProcess.bind(this);


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

            obj['filter_price'] = item.price.total_price;
            obj['filter_airline_code'] = item.airline_code;
            obj['filter_transit'] = item.transit;
            obj['filter_entertainment'] = item.flight_schedule[0].inflight_entertainment;
            obj['filter_baggage'] = item.flight_schedule[0].baggage;
            obj['filter_meal'] = item.flight_schedule[0].meal;

            obj['filter_departure_time'] = Math.ceil(parseFloat(item.departure_time.substr(0, 2) + '.' + item.departure_time.substr(3, 2)));
            obj['filter_departure_time_num'] = parseInt(item.departure_time.substr(0, 2) + item.departure_time.substr(3, 2));

            obj['filter_arrival_time'] = Math.ceil(parseFloat(item.arrival_time.substr(0, 2) + '.' + item.arrival_time.substr(3, 2)));
            obj['filter_arrival_time_num'] = parseInt(item.arrival_time.substr(0, 2) + item.arrival_time.substr(3, 2));

            obj['filter_seat_vailable'] = item.flight_schedule[0].seat_available;
            obj['filter_origin'] = item.from;
            obj['filter_destination'] = item.to;
            obj['filter_duration'] = item.duration;

            obj["price"] = item.price;
            obj["international"] = item.international;
            obj["combinable"] = item.combinable;
            obj["match_id"] = item.match_id;
            obj["supplier_id"] = item.supplier_id;
            obj["airline_id"] = item.airline_id;
            obj["validating_carrier"] = item.validating_carrier;
            obj["from"] = item.from;
            obj["to"] = item.to;
            obj["adult"] = item.adult;
            obj["child"] = item.child;
            obj["infant"] = item.infant;
            obj["currency"] = item.currency;
            obj["price_type"] = item.price_type;
            obj["flight_schedule"] = item.flight_schedule;
            obj["supplier_code"] = item.supplier_code;
            obj["airline_code"] = item.airline_code;
            obj["reference"] = item.reference;
            obj["subclasses"] = item.subclasses;
            obj["airline_name"] = item.airline_name;
            obj["airline_logo"] = item.airline_logo;
            obj["departure_date"] = item.departure_date;
            obj["departure_time"] = item.departure_time;
            obj["departure_timezone"] = item.departure_timezone;
            obj["gmt_departure"] = item.gmt_departure;
            obj["arrival_date"] = item.arrival_date;
            obj["arrival_time"] = item.arrival_time;
            obj["arrival_timezone"] = item.arrival_timezone;
            obj["gmt_arrival"] = item.gmt_arrival;
            obj["duration"] = item.duration;
            obj["transit"] = item.transit;
            obj["from_name"] = item.from_name;
            obj["from_city"] = item.from_city;
            obj["from_country"] = item.from_country;
            obj["from_country_code"] = item.from_country_code;
            obj["to_name"] = item.to_name;
            obj["to_city"] = item.to_city;
            obj["to_country"] = item.to_country;
            obj["to_country_code"] = item.to_country_code;
            obj["price_custom"] = item.price.total_price;
            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    rebuildRow(item, num) {

        var row = {
            "num": num.toString(),
            "nums": num,
            "data_type": "real",

            "filter_price": item.price.total_price,
            "filter_airline_code": item.airline_code,
            "filter_transit": item.transit,
            "filter_entertainment": item.flight_schedule[0].inflight_entertainment,
            "filter_baggage": item.flight_schedule[0].baggage,
            "filter_meal": item.flight_schedule[0].meal,
            "filter_departure_time": Math.ceil(parseFloat(item.departure_time.substr(0, 2) + '.' + item.departure_time.substr(3, 2))),
            "filter_departure_time_num": parseInt(item.departure_time.substr(0, 2) + item.departure_time.substr(3, 2)),

            "filter_arrival_time": Math.ceil(parseFloat(item.arrival_time.substr(0, 2) + '.' + item.arrival_time.substr(3, 2))),
            "filter_arrival_time_num": parseInt(item.arrival_time.substr(0, 2) + item.arrival_time.substr(3, 2)),

            "filter_seat_vailable": item.flight_schedule[0].seat_available,
            "filter_origin": item.from,
            "filter_destination": item.to,
            "filter_duration": item.duration,

            "price": item.price,
            "international": item.international,
            "combinable": item.combinable,
            "match_id": item.match_id,
            "supplier_id": item.supplier_id,
            "airline_id": item.airline_id,
            "validating_carrier": item.validating_carrier,
            "from": item.from,
            "to": item.to,
            "adult": item.adult,
            "child": item.child,
            "infant": item.infant,
            "currency": item.currency,
            "price_type": item.price_type,
            "flight_schedule": item.flight_schedule,
            "supplier_code": item.supplier_code,
            "airline_code": item.airline_code,
            "reference": item.reference,
            "subclasses": item.subclasses,
            "airline_name": item.airline_name,
            "airline_logo": item.airline_logo,
            "departure_date": item.departure_date,
            "departure_time": item.departure_time,
            "departure_timezone": item.departure_timezone,
            "gmt_departure": item.gmt_departure,
            "arrival_date": item.arrival_date,
            "arrival_time": item.arrival_time,
            "arrival_timezone": item.arrival_timezone,
            "gmt_arrival": item.gmt_arrival,
            "duration": item.duration,
            "transit": item.transit,
            "from_name": item.from_name,
            "from_city": item.from_city,
            "from_country": item.from_country,
            "from_country_code": item.from_country_code,
            "to_name": item.to_name,
            "to_city": item.to_city,
            "to_country": item.to_country,
            "to_country_code": item.to_country_code,
            "price_custom": item.price.total_price,

        }
        return row;

    }
    getProduct() {
        var param = this.state.param;
        var paramUrl = this.state.paramUrl;


        this.setState({ loading_data: true }, () => {
            this.setState({ loading_load_more: true });
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {
                    let config = JSON.parse(result);
                    //console.log('configss',JSON.stringify(config));

                    var token = config.token;
                    var url = config.aeroUrl;


                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + token);

                    var raw = "";

                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    var urlReq = url + "flight/search?" + paramUrl;
                    console.log('urlReq', urlReq);
                    fetch(urlReq, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            var length = result.data.departure.length;
                            //console.log('getProduct',JSON.stringify(result.data.departure));
                            // console.log('flight_result',length);   
                            var listdata_departure = [];
                            var listdata_return = [];
                            if (length != 0) {
                                this.setState({ loading_data: false });
                                listdata_departure = this.rebuild(result.data.departure);
                                listdata_return = this.rebuild(result.data.return);
                                //console.log('flight_results',JSON.stringify(this.rebuild(result.data.departure)));                            
                                listdata_departure = this.filter_destination(listdata_departure);
                                //listdata_return=this.filter_origin(listdata_return);

                                this.setState({ listdata_departure: listdata_departure });
                                this.setState({ listdata_return: listdata_return });

                                this.setState({ listdata_departure_original: listdata_departure });
                                this.setState({ listdata_return_original: listdata_return });
                            }



                            var dataKey = result.data.key;
                            var datacontinue = result.data.continue;

                            if (datacontinue == true) {
                                this.setState({ loading_load_more: true });
                                this.getProductNext(dataKey);
                            } else {
                                setTimeout(() => {
                                    if (this.state.listdata_departure.length == 0) {
                                        this.setState({ empty: true });
                                    }
                                }, 50);

                                this.setState({ loading_load_more: false });
                            }

                        })
                        .catch(error => {
                            //this.setState({loading_spinner:false});
                            console.log(JSON.stringify(error));
                            alert('Kegagalan respon server, coba ulangi pencarian lagi.');

                        });
                }
            });

        });

    }

    getProductNext(dataKey) {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {

                let config = JSON.parse(result);
                var token = config.token;
                var url = config.aeroUrl;


                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(url + "flight/search/" + dataKey, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        //console.log('getProductNext',JSON.stringify(result.data.departure));

                        var length = result.data.departure.length;
                        //console.log('flight_result_next',length);   
                        var dataDeparture = [];
                        var dataReturn = [];


                        var listdata_departure_next = [];
                        var listdata_return_next = [];

                        if (length != 0) {
                            this.setState({ loading_data: false });
                            console.log('flight_result_next', JSON.stringify(result.data.departure));
                            dataDeparture = result.data.departure;
                            dataReturn = result.data.return;


                            listdata_departure_next = this.state.listdata_departure;
                            listdata_return_next = this.state.listdata_return;


                            var a = listdata_departure_next.length;
                            dataDeparture.map((item, index) => {
                                a++;
                                var rebuidDeparture = this.rebuildRow(item, a);
                                listdata_departure_next.push(rebuidDeparture);

                            })

                            var b = listdata_return_next.length;
                            dataReturn.map((item, index) => {
                                b++;
                                var rebuidReturn = this.rebuildRow(item, b);
                                listdata_return_next.push(rebuidReturn);

                            })
                            //console.log('listdata_departure_next',JSON.stringify(listdata_departure_next));

                            // const index = listdata_departure_next.findIndex(x => x.data_type === "sample");
                            // if (index !== undefined) listdata_departure_next.splice(index, 1);

                            listdata_departure_next = this.filter_destination(listdata_departure_next);
                            //listdata_return_next=this.filter_origin(listdata_return_next);

                            this.setState({ listdata_departure: listdata_departure_next });
                            this.setState({ listdata_return: listdata_return_next });

                            this.setState({ listdata_departure_original: listdata_departure_next });
                            this.setState({ listdata_return_original: listdata_return_next });


                        }

                        // setTimeout(() => {
                        //     console.log('listdata_departure',JSON.stringify(this.state.listdata_departure.length));
                        //     console.log('listdata_departure_next',JSON.stringify(listdata_departure_next.length));

                        //     console.log('listdata_departure_original',JSON.stringify(this.state.listdata_departure_original.length));
                        //     console.log('listdata_return_original',JSON.stringify(this.state.listdata_return_original.length));
                        // }, 50);

                        var dataKey = result.data.key;
                        var datacontinue = result.data.continue;

                        if (datacontinue == true) {
                            this.setState({ loading_load_more: true });
                            this.getProductNext(dataKey);
                        } else {
                            setTimeout(() => {
                                if (this.state.listdata_departure.length == 0) {
                                    this.setState({ empty: true });
                                }
                            }, 50);


                            this.setState({ loading_load_more: false });
                        }


                    })
                    .catch(error => {
                        //this.setState({loading_spinner:false});
                        console.log(JSON.stringify(error));
                        alert('Kegagalan respon server, coba ulangi pencarian lagi.');

                    });
            }
        });


    }



    sortProcess(selected) {
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




    filterProcess(filters) {
        this.onClear();

        setTimeout(() => {
            var products = this.state.listdata_departure;
            const filtered = this.filterArray(products, filters);
            this.setState({ listdata_departure: filtered });
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
        navigation.navigate("FlightDetail", {
            select: select,
        });
    }


    onSelect(select) {
        const { param } = this.state;
        if (param.IsReturn == true) {
            this.props.navigation.navigate("FlightResultArrival",
                {
                    param: param,
                    //paramOther:paramOther,
                    listdata_return: this.state.listdata_return,
                    listdata_return_original: this.state.listdata_return_original,
                    selectDataDeparture: select
                });
        } else if (param.IsReturn == false) {

            var returnPost = null;
            var departurePost = this.removePrice(select);



            var paramGetPrice = {
                "Adults": param.Adults,
                "Children": param.Children,
                "Infants": param.Infants,
                "CabinClass": param.CabinClass[0],
                "CorporateCode": param.CorporateCode,
                "ReturnDate": param.ReturnDate,
                "DepartureDate": param.DepartureDate,
                "Destination": param.Destination,
                "Origin": param.Origin,
                "departure": departurePost,
                "return": returnPost
            };


            this.setState({ loading_spinner: true }, () => {
                AsyncStorage.getItem('config', (error, result) => {
                    if (result) {
                        let config = JSON.parse(result);
                        var access_token = config.token;
                        var url = config.aeroUrl;
                        const controller = new AbortController();
                        const signal = controller.signal;
                        setTimeout(() => controller.abort(), 60000);


                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer " + access_token);

                        var raw = JSON.stringify(paramGetPrice);

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                            signal
                        };

                        fetch(url + 'flight/Price/v3', requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                //console.log('select',JSON.stringify(result));
                                this.setState({ loading_spinner: false });
                                if (result.errors) {
                                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.errors));
                                } else if (result.status === "error") {
                                    this.dropdown.alertWithType('info', 'Info', result.message);
                                } else if (result.status === "success") {
                                    //var totalPrice=result.data.total_price;
                                    param.totalPrice = result.data.total_price;

                                    this.props.navigation.navigate("Summary",
                                        {
                                            param: {
                                                param: param,
                                                selectDataDeparture: select,
                                                selectDataReturn: null,
                                                departurePost: departurePost,
                                                returnPost: null,
                                                dataPrice: result.data

                                            },

                                        });


                                }

                            })
                            .catch(error => {
                                this.setState({ loading_spinner: false });
                                console.log(JSON.stringify(error));
                                alert('Kegagalan respon server, coba ulangi pencarian lagi.');

                            });






                    }
                });
            });


        }


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

        if (this.state.loading_data == false) {
            dataList = this.state.listdata_departure;
        }

        if (this.state.empty == false) {



            content = <Animated.FlatList
                contentContainerStyle={{
                    paddingTop: 50,
                    paddingBottom: 20
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

                    <FlightItem
                        loading={loading_data}
                        style={{ marginBottom: 10, marginHorizontal: 20 }}
                        fromHour={item.departure_time}
                        toHour={item.arrival_time}
                        fromFlight={item.from}
                        toFlight={item.to}
                        totalHour={item.duration}
                        brand={item.airline_name}
                        brandCode={item.airline_code}
                        image={item.airline_logo}
                        type={item.flight_schedule[0]['cabin']}
                        price={item.currency + " " + priceSplitter(item.price['total_price'])}
                        route={item.transit}
                        onPress={() => this.onSelect(item)}
                        onPressDetail={() => this.onSelectDetail(item)}
                        flight_schedule={item.flight_schedule}
                    />
                )}
            />
        } else {
            content = <DataEmpty />
        }

        return (
            <View style={{ flex: 1 }}>
                {content}

                <Animated.View
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
                </Animated.View>
            </View>
        );
    }




    componentDidMount() {
        this.setState({ listdata_departure: [] });
        this.setState({ listdata_return: [] });
        const { navigation } = this.props;
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
        let { loading_data, loading_load_more, loading_spinner } = this.state;
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
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title={title}
                    subTitle={subTitle}
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
            </SafeAreaView>
        );
    }
}
