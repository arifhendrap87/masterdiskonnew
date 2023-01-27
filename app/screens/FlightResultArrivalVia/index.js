//import React, { Component } from "react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightItem,
    FilterSort,
    Text
} from "@components";
import DataEmpty from "../../components/DataEmpty";

// import styles from "./styles";
import { StyleSheet } from "react-native";
import { FlightData } from "@data";
import { AsyncStorage } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import AnimatedLoader from "react-native-animated-loader";
import FlightItemVia from "../../components/FlightItemVia";

export default function FlightResultArrivalVia(props) {
    let { navigation, auth } = props;
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);

    const dispatch = useDispatch();
    const [scrollAnim] = useState(new Animated.Value(0));
    const [offsetAnim] = useState(new Animated.Value(0));
    const [param, setParam] = useState(navigation.state.params.param);
    console.log('param', JSON.stringify(param));
    const [listdataReturn, setListdataReturn] = useState(navigation.state.params.listdataReturn);
    const [listdataReturnOriginal, setListdataReturnOriginal] = useState(navigation.state.params.listdataReturnOriginal);
    const [selectDataDeparture, setSelectDataDeparture] = useState(navigation.state.params.selectDataDeparture);
    const [refreshing] = useState(false);
    const [flights, setFlights] = useState(FlightData);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    const [filterParam, setFilterParam] = useState({});

    const [clampedScroll] = useState(Animated.diffClamp(
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

    useEffect(() => {
        setListdataReturn(listdataReturn);
        return () => {
        }
    }, []);

    function onChangeSort() { }

    function onFilter() {
        navigation.navigate("FlightFilter",
            {
                listdata: listdataReturnOriginal,
                filterProcess: filterProcess,
                filterParam: filterParam


            }
        );
    }

    function onClear() {
        setLoadingProduct(true);
        setListdataReturn(listdataReturnOriginal);
        setTimeout(() => {
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

    function filterProcess(filter) {

        //console.log('listdata', JSON.stringify(listdata));
        setLoadingProduct(true);
        setListdataReturn(listdataReturnOriginal);
        setFilterParam(filter);

        //onClear();
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
            var listdata = listdataReturnOriginal;
            const filtered = filterArray(listdata, listdatafilter);
            console.log('filterresult', JSON.stringify(filtered));
            setListdataReturn(filtered);
            setLoadingProduct(false);
        }, 50);

    }

    function sortProcess(selected) {
        setListdataReturn(listdataReturnOriginal);
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
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return -1;
            if (a.filter_price > b.filter_price)
                return 1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }

    function sortHightestPrice() {
        //----------untuk sort desc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return 1;
            if (a.filter_price > b.filter_price)
                return -1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }


    function sortEarlyDepartureTime() {
        //----------untuk sort asc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return -1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return 1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }


    function sortEndDepartureTime() {
        //----------untuk sort desc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return 1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return -1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }


    function sortEarlyArrivalTime() {
        //----------untuk sort asc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return -1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return 1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }


    function sortEndArrivalTime() {
        //----------untuk sort desc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return 1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return -1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }


    function sortShortDuration() {
        //----------untuk sort asc---------//
        var data = eval(listdataReturn);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_duration == b.filter_duration)
                return 0;
            if (a.filter_duration < b.filter_duration)
                return -1;
            if (a.filter_duration > b.filter_duration)
                return 1;
        });

        setListdataReturn(results);
        setLoadingProduct(false);
    }

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

        navigation.navigate("FlightDetailVia", {
            select: select,
        });
    }

    function onSelect(select) {

        // let config = JSON.parse(result);
        // var access_token = config.token;
        // var url = config.aeroUrl;
        // var token = config.token;
        // var baseUrl = config.apiBaseUrl;
        // var path = 'booking/repricing';
        // var url = baseUrl + path;
        setLoadingCheckout(true);
        setLoadingProduct(true);
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + 'booking/repricing';
        console.log('configApi', JSON.stringify(config));
        console.log('urlonSelectArrival', url);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var paramPrice = {
            "product": "flight",
            "productOption": [
                selectDataDeparture.id,
                select.id
            ]
        };
        console.log('paramPriceReturn', JSON.stringify(paramPrice));
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
                if (result.success == true) {
                    setLoadingCheckout(false);
                    setLoadingProduct(false);
                    console.log('result', JSON.stringify(result));

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
                    navigation.navigate("SummaryGeneral",
                        {
                            param: paramAll,

                        });
                } else {
                    setLoadingCheckout(false);
                    setLoadingProduct(false);
                    this.dropdown.alertWithType('info', 'Info', 'Waktu keberangkatan dan kepulangan terlalu dekat, dimohon untuk cek kembali.');

                }


            })
            .catch(error => {
                this.setState({ loadingProduct: false });
                var isEmpty = this.isEmpty(error);
                if (isEmpty == true) {
                    this.dropdown.alertWithType('info', 'Info', 'Coba klik sekali lagi');
                }
            });







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
        return (
            <View style={{ flex: 1 }}>
                {
                    listdataReturn.length != 0 ?
                        <FlatList
                            data={listdataReturn}
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
                                    //loading={loading_data}
                                    loading={false}
                                    style={{ marginBottom: 0, marginHorizontal: 0 }}
                                    itemData={item}
                                    onPress={() => onSelect(item)}
                                    onPressDetail={() => onSelectDetail(item)}
                                />



                            )}
                        />
                        :
                        <DataEmpty />
                }



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

    var title = param.Destination + " to " + param.Origin;
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
    var subTitle = convertDateText(param.ReturnDate) + ", " + qty + " pax, " + kelas;
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
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
            //forceInset={{ top: "always" }}
            >

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
                                <Text caption1 style={{ color: BaseColor.whiteColor }}>{param.bandaraTujuanCode} - {param.bandaraAsalCode}, {param.jumlahPerson} penumpang</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text caption1 style={{ color: BaseColor.whiteColor }}>Pulang - {convertDateText(param.tglAkhir)}</Text>
                                    {/* <TouchableOpacity 
                                            onPress={() => 
                                                {
                                                    navigation.navigate("FlightSearchAgain",
                                                    {
                                                        param:param,
                                                        searchAgain: this.searchAgain
                                                    }
                                                    );
                                                }}
                                            >
                                        <Icon
                                        name="md-pencil-sharp"
                                        size={14}
                                        color={BaseColor.whiteColor}
                                        style={{marginLeft:10}}
                                        />
                                        </TouchableOpacity> */}
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 2 }} />
                    </View>
                    <View style={{ flex: 0.9, marginTop: 20 }}>
                        <View style={{ marginHorizontal: 20, flex: 1 }}>
                            {renderContent()}
                        </View>
                    </View>


                    {
                        loadingProduct ?
                            <View></View>

                            :
                            <FilterSort
                                labelCustom={listdataReturn.length + ' result'}
                                listdata={listdataReturnOriginal}
                                onChangeSort={onChangeSort}
                                onFilter={onFilter}
                                onClear={onClear}
                                sortProcess={sortProcess}
                                style={
                                    [{ marginHorizontal: 15, flex: 0.05 }]
                                }
                            />
                    }
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
    );


}


const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    }
});

