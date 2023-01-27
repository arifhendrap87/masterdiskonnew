import React, { Component } from "react";
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
// import styles from "./styles";
import { StyleSheet } from "react-native";
import { FlightData } from "@data";
import { AsyncStorage } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import AnimatedLoader from "react-native-animated-loader";
import FlightItemVia from "../../components/FlightItemVia";


export default class FlightResultArrivalVia extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        var param = this.props.navigation.state.params.param;
        //var paramOther=this.props.navigation.state.params.paramOther;
        var listdata_return = this.props.navigation.state.params.listdata_return;
        var listdata_return_original = this.props.navigation.state.params.listdata_return_original;
        var selectDataDeparture = this.props.navigation.state.params.selectDataDeparture;

        var listdata_return_original = listdata_return;


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
            //paramOther:paramOther,
            listdata_return: listdata_return,
            selectDataDeparture: selectDataDeparture,
            listdata_return_original: listdata_return_original
        };
        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.filterProcess = this.filterProcess.bind(this);
        this.sortProcess = this.sortProcess.bind(this);
        this.onClear = this.onClear.bind(this);

    }

    onChangeSort() { }

    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("FlightFilter",
            {
                listdata: this.state.listdata_return_original,
                filterProcess: this.filterProcess
            }
        );
    }

    onClear() {
        //console.log("---------------original------------------------------------");
        //console.log(JSON.stringify(this.state.listdata_return_original));
        this.setState({ listdata_return: this.state.listdata_return_original });
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
        var listdata = this.state.listdata_return;
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
            this.setState({ listdata_return: filtered });
        }, 50);

    }


    filterProcess2(filters) {
        this.onClear();
        setTimeout(() => {
            var products = this.state.listdata_return;
            const filtered = this.filterArray(products, filters);
            this.setState({ listdata_return: filtered });
        }, 50);


    }

    sortProcess(selected) {
        this.setState({ listdata_return: this.state.listdata_return_original });
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
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return -1;
            if (a.filter_price > b.filter_price)
                return 1;
        });

        this.setState({ listdata_return: results });
    }

    sortHightestPrice() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_price == b.filter_price)
                return 0;
            if (a.filter_price < b.filter_price)
                return 1;
            if (a.filter_price > b.filter_price)
                return -1;
        });

        this.setState({ listdata_return: results });
    }


    sortEarlyDepartureTime() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return -1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return 1;
        });

        this.setState({ listdata_return: results });
    }


    sortEndDepartureTime() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_departure_time_num == b.filter_departure_time_num)
                return 0;
            if (a.filter_departure_time_num < b.filter_departure_time_num)
                return 1;
            if (a.filter_departure_time_num > b.filter_departure_time_num)
                return -1;
        });

        this.setState({ listdata_return: results });
    }


    sortEarlyArrivalTime() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return -1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return 1;
        });

        this.setState({ listdata_return: results });
    }


    sortEndArrivalTime() {
        //----------untuk sort desc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_arrival_time_num == b.filter_arrival_time_num)
                return 0;
            if (a.filter_arrival_time_num < b.filter_arrival_time_num)
                return 1;
            if (a.filter_arrival_time_num > b.filter_arrival_time_num)
                return -1;
        });

        this.setState({ listdata_return: results });
    }


    sortShortDuration() {
        //----------untuk sort asc---------//
        var data = eval(this.state.listdata_return);
        var results = data;
        results.sort(function (a, b) {
            if (a.filter_duration == b.filter_duration)
                return 0;
            if (a.filter_duration < b.filter_duration)
                return -1;
            if (a.filter_duration > b.filter_duration)
                return 1;
        });

        this.setState({ listdata_return: results });
    }


    onChangeView() { }


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
        const { navigation } = this.props;

        navigation.navigate("FlightDetailVia", {
            select: select,
        });
    }

    onSelect(select) {
        const { param } = this.state;
        const { selectDataDeparture } = this.state;
        console.log('selectDataDeparture', JSON.stringify(selectDataDeparture));
        console.log('selectReturn', JSON.stringify(select));

        // listdata_return:this.state.listdata_return,
        //         listdata_return_original:this.state.listdata_return_original,
        //         selectDataDeparture:select


        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {
                    let config = JSON.parse(result);
                    var access_token = config.token;
                    var url = config.aeroUrl;
                    var token = config.token;
                    var baseUrl = config.apiBaseUrl;
                    var path = 'booking/repricing';
                    var url = baseUrl + path;


                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
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
                                this.setState({ loading_spinner: false });
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
                                this.props.navigation.navigate("SummaryVia",
                                    {
                                        param: paramAll,

                                    });
                            } else {
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





                }
            });
        });
    }


    isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }


    renderContent() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { flights, refreshing, clampedScroll } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList
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
                    data={this.state.listdata_return}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (



                        <FlightItemVia
                            //loading={loading_data}
                            loading={false}
                            style={{ marginBottom: 10, marginHorizontal: 20 }}
                            itemData={item}
                            onPress={() => this.onSelect(item)}
                            onPressDetail={() => this.onSelectDetail(item)}
                        />
                    )}
                />

            </View>
        );
    }

    componentDidMount() {
        this.setState({ listdata_return: this.state.listdata_return });
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
        let { loading_spinner } = this.state;
        var param = this.state.param;
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
        var subTitle = this.convertDateText(param.ReturnDate) + ", " + qty + " pax, " + kelas;
        return (
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
                                    <Text caption1 style={{ color: BaseColor.whiteColor }}>{this.convertDateText(param.tglAwal)}</Text>
                                    {/* <TouchableOpacity 
                                            onPress={() => 
                                                {
                                                    navigation.navigate("FlightSearchAgain",
                                                    {
                                                        param:this.state.param,
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




                    </View>


                    {
                        loading_spinner ?
                            <View></View>

                            :
                            <FilterSort
                                labelCustom={this.state.listdata_return.length + ' result'}
                                listdata={this.state.listdata_return_original}
                                onChangeSort={this.onChangeSort}
                                onFilter={this.onFilter}
                                onClear={this.onClear}
                                sortProcess={this.sortProcess}
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

