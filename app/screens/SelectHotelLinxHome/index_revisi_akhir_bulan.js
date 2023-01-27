import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image, Button } from "@components";
// import styles from "./styles";

// Load sample flight data list
import { AsyncStorage } from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";



const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: BaseColor.bgColor
    },
    imageBrand: {
        width: 32,
        height: 32,
        marginRight: 10
    }
});


export default function FlightResultVia(props) {
    let { navigation, auth } = props;
    const [tglAwal, setTglAwal] = useState(getDate(0));
    // var tglAkhirx = getDate(1);

    var dAwal = new Date(tglAwal);
    var lastMonth = format_date(
        lastDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 1)
    );
    var dLastMonth = new Date(lastMonth);
    var firstMonth = format_date(
        firstDateOfYearMonth(dAwal.getFullYear(), dAwal.getMonth() + 2)
    );

    console.log(+dAwal === +dLastMonth);
    // if (+dAwal === +dLastMonth) {
    //     tglAkhir = firstMonth;
    // }

    const [tglAkhir, setTglAkhir] = useState((+dAwal === +dLastMonth) ? firstMonth : getDate(1));

    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);
    const dispatch = useDispatch();

    const [fromHome, setFromHome] = useState((navigation.state.params && navigation.state.params.fromHome) ? navigation.state.params.fromHome : false);

    const [airplane, setAirPlane] = useState("");
    const [flight, setFlight] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listdata_kota, setListdataKota] = useState([]);
    const [listdata_hotel, setListdataHotel] = useState([]);
    const [listdata_area, setListdataArea] = useState([]);
    const [listdata_search, setListdataSearch] = useState([]);
    const [listdata_bestTenCity, setListdataBestTenCity] = useState([]);
    const [loading_spinner, setLoadingSpinner] = useState(true);
    //const [textSearch, setTextSearch] = useState("");
    const [textSearch, setTextSearch] = React.useState('');
    const timeout = React.useRef(null);

    useEffect(() => {
        //bestTenCity();
        getData();
        return () => {
        }
    }, []);


    function firstDateOfYearMonth(y, m) {
        var firstDay = new Date(y, m - 1, 1);
        return firstDay;
    }

    function lastDateOfYearMonth(y, m) {
        var lastDay = new Date(y, m, 0);
        return lastDay;
    }

    function format_date(d) {
        (month = "" + (d.getMonth() + 1)),
            (day = "" + d.getDate()),
            (year = d.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    function getDate(num) {
        var MyDate = new Date();
        var MyDateString = "";
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = MyDate.getMonth() + 1;
        var month = tempoMonth;
        var tempoDate = MyDate.getDate() + num;
        if (tempoMonth < 10) tempoMonth = "0" + tempoMonth;
        if (tempoDate < 10) tempoDate = "0" + tempoDate;
        var date = MyDate.getFullYear() + "-" + tempoMonth + "-" + tempoDate;

        return date;
    }

    function convertDateText(date) {
        var d = new Date(date);
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }
    function getNight(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
    }


    function onChange(select) {


        console.log('select', JSON.stringify(select));

        var param = {
            DepartureDate: tglAwal,
            ReturnDate: tglAkhir,
            Adults: "1",
            Children: "0",
            Infants: "0",
        };

        param.city = select.searchCity;
        param.hotelid = select.searchType == 'hotel' ? select.searchHotel : "";
        param.typeSearch = select.searchType;
        param.area = select.searchArea;
        param.country = select.searchCountry;
        param.province = select.searchProvince;
        param.room = 1;
        param.stringAdults = "1";
        param.stringChild = "0";
        param.stringBaby = "0";

        param.umurank = "0";
        param.stringumurank = "0";

        param.stringRoom = "1";
        param.adultnchildparam = "Adult";
        param.checkin = convertDateText(param.DepartureDate);
        param.checkout = convertDateText(param.ReturnDate);
        param.srcdata = "";
        param.keyword = "";
        param.search = "";

        param.adults = param.Adults;
        param.child = param.Children;

        param.noofnights = getNight(param.DepartureDate, param.ReturnDate);
        param.type = "hotelLinx";
        param.product_type = "hotel";

        param.roomMultiCountRoom = 1;
        param.roomMultiParam = [
            {
                id: 1,
                dewasa: 1,
                anak: 0,
                bayi: 0,
                umurAnakKe1: 0,
                umurAnakKe2: 0,
                umurAnak: "",
            },
        ];
        param.roomMultiGuest = 1;
        param.hotelLinxDestinationLabel = select.searchTitle;
        param.tglAwal = param.DepartureDate;
        param.tglAkhir = param.ReturnDate;
        param.hotelLinxDestination = select;
        param.currentPage = 1;

        var link = "";
        if (select.searchType == "hotel") {
            var paramProduct = {}
            paramProduct.id = param.hotelid;
            param.searchTitle = select.searchTitle;
            param.jmlTamu = 1;

            link = "ProductDetailNew";
            navigation.navigate(link, {
                param: param,
                paramOriginal: param,
                paramProduct: paramProduct,
                product: { hotelid: param.hotelid },
                product_type: "hotel",
            });
        } else {


            param.ratingH = "";
            param.rHotel = "";
            param.srcdata = select.searchTitle.split(",")[0];
            param.keyword = select.searchTitle.split(",")[0];
            param.search = "";
            param.minimbudget = 0;
            param.maximbudget = 50000000;
            param.shortData = "";
            param.startkotak = "0";
            param.searchTitle = select.searchTitle;
            param.jmlTamu = 1;
            link = "HotelLinx";
            console.log("paramHotellinxxhome", JSON.stringify(param));
            navigation.navigate(link, {
                param: param,
                paramOriginal: param,
            });
        }

    }

    function getData() {
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/hotel/besttencity";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('resultTopten', JSON.stringify(result));
                //console.log('resultbestTenCitys', JSON.stringify(result));
                setLoadingSpinner(false);
                setListdataBestTenCity(rebuild_bestTenCityNew(result.data));
                console.log('rebuild_bestTenCityNew', JSON.stringify(rebuild_bestTenCityNew(result.data)));


            })
            .catch(error => {
                console.log('errorss_topCity', JSON.stringify(error));
            });


    }

    function bestTenCity() {
        setLoadingSpinner(true);
        let config = configApi;
        let baseUrl = config.baseUrl;
        var url = baseUrl + 'front/api_new/product/bestTenCity';
        if (config.apiHotel == "traveloka") {
            url = baseUrl + 'front/api_new/product/bestTenCityTraveloka';
        }
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        var myHeaders = new Headers();

        var raw = "";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultbestTenCitys', JSON.stringify(result));
                setLoadingSpinner(false);
                setListdataBestTenCity(rebuild_bestTenCity(result));
            })
            .catch(error => {
                alert('Kegagalan Respon Server')
            });




    }

    function rebuild_bestTenCity(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};

            obj['total'] = item.total;
            obj['cityid'] = item.cityid;
            obj['cityname'] = item.cityname;
            obj['countryname'] = item.countryname;
            obj['searchType'] = "best";
            obj['searchCity'] = item.cityid;
            obj['searchHotel'] = '';
            obj['searchTitle'] = item.cityname + ', ' + item.countryname;
            obj['searchArea'] = '';
            obj['searchCountry'] = item.countryname;
            obj['searchProvince'] = item.province_id;

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }


    function rebuild_bestTenCityNew(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};

            obj['total'] = "0";
            obj['cityid'] = item.cityid.toString();
            obj['cityname'] = item.name;
            obj['countryname'] = 'Indonesia';
            obj['searchType'] = "AREA";
            obj['searchCity'] = item.cityid.toString();
            obj['searchHotel'] = '';
            obj['searchTitle'] = item.name + ', ' + 'Indonesia';
            obj['searchArea'] = '';
            obj['searchCountry'] = item.name;
            obj['searchProvince'] = item.cityid.toString();

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    function searchHotel(value) {
        setLoadingSpinner(true);

        let config = configApi;
        var url = config.baseUrl;
        var path = 'front/api_new/product/searchKotaHotelorLokasi';

        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("ketikData", value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url + path, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoadingSpinner(false);
                var arr_kota = result.arr_kota;
                var arr_hotel = result.arr_hotel;
                var arr_area = result.arr_area;

                setListdataKota(this.rebuild_kota(arr_kota));
                setListdataHotel(this.rebuild_hotel(arr_hotel));
                setListdataArea(this.rebuild_area(arr_area));



            })
            .catch(error => {

                alert('Kegagalan Respon Server')
            });



    }


    function searchHotelApi(value) {
        setLoadingSpinner(true);
        let config = configApi;
        var baseUrl = config.apiBaseUrl;
        var url = baseUrl + "booking/autocomplete?product=hotel&q=" + value;
        if (config.apiHotel = "traveloka") {
            baseUrl = config.apiBaseUrl;
            url = baseUrl + "apitrav/booking/autocomplete?product=hotel&q=" + value;

        }

        console.log('urlsearchHotelApi', url);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resultHotelselect', JSON.stringify(result.data));
                setLoadingSpinner(false);
                var arr_search = result.data;
                setListdataSearch(rebuild_search(arr_search));

            })
            .catch(error => {
                alert('Kegagalan Respon Server')
            });






    }


    function rebuild_search(listdata) {
        console.log('listdata', JSON.stringify(listdata));
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['icon'] = item.level == 'AREA' || item.level == 'CITY' ? 'business' : 'bed';
            obj['total'] = '';
            obj['cityid'] = '';
            obj['cityname'] = '';
            obj['countryname'] = '';


            obj['searchType'] = item.level ? item.level : 'hotel';
            obj['searchCity'] = item.id;
            obj['searchHotel'] = item.productId ? item.productId : '';
            obj['searchTitle'] = item.name;
            obj['searchArea'] = item.name;
            obj['searchCountry'] = item.name;
            obj['searchProvince'] = item.name;

            listdata_new.push(obj);
            a++;
        });
        console.log('listdata_search_new', JSON.stringify(listdata_new));

        return listdata_new;


    }


    function rebuild_kota(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};

            obj['kota'] = item.kota;
            obj['id_hotel'] = item.id_hotel;
            obj['hotelid'] = item.hotelid;
            obj['cityid'] = item.cityid;
            obj['cityname'] = item.cityname;
            obj['countryname'] = item.countryname;


            obj['searchType'] = "kota";
            obj['searchCity'] = item.cityid;
            obj['searchHotel'] = item.hotelid;
            obj['searchTitle'] = item.cityname + ', ' + item.countryname;
            obj['searchArea'] = '';
            obj['searchCountry'] = item.countryname;


            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    function rebuild_hotel(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};

            obj['id_hotel'] = item.id_hotel;
            obj['hotelid'] = item.hotelid;
            obj['cityid'] = item.cityid;
            obj['cityname'] = item.cityname;
            obj['hotelname'] = item.hotelname;
            obj['countryname'] = item.countryname;
            obj['address'] = item.address;




            obj['searchType'] = "hotel";
            obj['searchCity'] = item.cityid;
            obj['searchHotel'] = item.hotelid;
            obj['searchTitle'] = item.hotelname + ', ' + item.address + ', ' + item.countryname;
            obj['searchArea'] = '';
            obj['searchCountry'] = item.countryname;

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    function rebuild_area(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};

            obj['countryname'] = item.countryname;
            obj['area'] = item.area;


            obj['searchType'] = "area";
            obj['searchCity'] = '';
            obj['searchHotel'] = '';
            obj['searchTitle'] = item.area + ', ' + item.countryname;
            obj['searchArea'] = item.area;
            obj['searchCountry'] = item.countryname;



            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    // function search(value) {
    //     //setTextSearch(value);
    //     setTimeout(() => {

    //         searchHotelApi(value);

    //     }, 2000);
    // }

    const onChangeHandler = (value) => {

        clearTimeout(timeout.current);
        setTextSearch(value);
        timeout.current = setTimeout(() => {
            console.log('valesss', value);
            if (value.length >= 3) {
                searchHotelApi(value)
            }
        }, 1000);
    }

    var listdata_bestTenCity_content = <View></View>
    if (listdata_bestTenCity.length != 0) {
        listdata_bestTenCity_content = <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: BaseColor.secondColor }}>
                <Text caption2 bold>
                    Populer Destination
                </Text>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                <FlatList
                    data={listdata_bestTenCity}
                    keyExtractor={(item, index) => item.cityid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                                console.log('item=', JSON.stringify(item));
                                onChange(item)

                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            name={'locate-outline'}
                                            size={20}

                                        />
                                    </View>
                                    <View>
                                        <Text caption1 semibold>
                                            {item.cityname}
                                        </Text>
                                        <Text
                                            note
                                            numberOfLines={1}
                                            footnote
                                            grayColor
                                            style={{
                                                paddingTop: 5
                                            }}
                                        >
                                            {item.countryname}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>

    }

    var listdata_kota_content = <View></View>
    if (listdata_kota.length != 0) {
        listdata_kota_content = <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: BaseColor.bgColor }}>
                <Text caption2 bold>
                    Kota
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <FlatList
                    data={listdata_kota}
                    keyExtractor={(item, index) => item.cityid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => onChange(item)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <View style={styles.left}>
                                    <Text caption1 semibold>
                                        {item.cityname}
                                    </Text>
                                    <Text
                                        note
                                        numberOfLines={1}
                                        footnote
                                        grayColor
                                        style={{
                                            paddingTop: 5
                                        }}
                                    >
                                        {item.countryname}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>

    }

    var listdata_hotel_content = <View></View>
    if (listdata_hotel.length != 0) {
        listdata_hotel_content = <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: BaseColor.bgColor }}>
                <Text caption2 bold>
                    More Result Hotels by Name Hotel
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <FlatList
                    data={listdata_hotel}
                    keyExtractor={(item, index) => item.cityid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => onChange(item)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <View style={styles.left}>
                                    <Text caption1 semibold>
                                        {item.hotelname}
                                    </Text>
                                    <Text
                                        note
                                        numberOfLines={1}
                                        footnote
                                        grayColor
                                        style={{
                                            paddingTop: 5
                                        }}
                                    >
                                        {item.address}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>

    }

    var listdata_area_content = <View></View>
    if (listdata_area.length != 0) {
        listdata_area_content = <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: BaseColor.bgColor }}>
                <Text caption2 bold>
                    Area
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <FlatList
                    data={listdata_area}
                    keyExtractor={(item, index) => item.area}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => onChange(item)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <View style={styles.left}>
                                    <Text caption1 semibold>
                                        {item.area}
                                    </Text>
                                    <Text
                                        note
                                        numberOfLines={1}
                                        footnote
                                        grayColor
                                        style={{
                                            paddingTop: 5
                                        }}
                                    >
                                        {item.countryname
                                        }
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>

    }

    var listdata_search_content = <View></View>
    if (listdata_search.length != 0) {
        listdata_search_content = <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: "row", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: BaseColor.secondColor }}>
                <Text caption2 bold>
                    Hasil Cari
                </Text>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                <FlatList
                    data={listdata_search}
                    keyExtractor={(item, index) => item.area}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => onChange(item)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ marginRight: 10 }}>
                                        <Icon
                                            name={item.icon}
                                            size={20}
                                            style={{ color: BaseColor.primaryColor }}

                                        />
                                    </View>
                                    <View>
                                        <Text caption1 semibold>
                                            {item.searchTitle}
                                        </Text>
                                        <Text
                                            note
                                            numberOfLines={1}
                                            footnote
                                            grayColor
                                            style={{
                                                paddingTop: 5
                                            }}
                                        >
                                            {item.searchType
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>

    }


    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
            forceInset={{ top: "always" }}
        >
            <StatusBar
                backgroundColor={BaseColor.primaryColor}
            />
            <Header
                title="Tujuan Hotel"
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
                //     if (loading) {
                //         return (
                //             <ActivityIndicator
                //                 size="small"
                //                 color={BaseColor.primaryColor}
                //             />
                //         );
                //     } else {
                //         return (
                //             <Text caption1 primaryColor>
                //                 Save
                //             </Text>
                //         );
                //     }
                // }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            //onPressRight={() => this.onSave()}
            />
            <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <View style={styles.contain}>
                    <View style={{ height: 40, width: '100%' }}>
                        <TextInput
                            style={{
                                height: 46,
                                backgroundColor: BaseColor.fieldColor,
                                borderRadius: 5,
                                padding: 10,
                                width: '100%'
                            }}
                            value={textSearch}
                            onChangeText={(value) => { onChangeHandler(value) }}
                            autoCorrect={false}
                            placeholder="Search Hotel"
                            placeholderTextColor={BaseColor.grayColor}
                            selectionColor={BaseColor.primaryColor}
                            autoFocus
                        />

                    </View>

                    <ScrollView>
                        <View style={{ width: "100%", height: "100%", flexDirection: 'row', paddingBottom: 20 }}>
                            {
                                loading_spinner ?
                                    <Placeholder
                                        Animation={Fade}

                                    >
                                        <View style={{
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.bgColor
                                        }}>
                                            <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                            <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                        </View>

                                        <View style={{
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.bgColor
                                        }}>
                                            <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                            <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                        </View>

                                        <View style={{
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.bgColor
                                        }}>
                                            <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                            <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                        </View>

                                        <View style={{
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.bgColor
                                        }}>
                                            <PlaceholderLine width={100} height={30} style={{ marginBottom: 0 }} />
                                            <PlaceholderLine width={100} height={15} style={{ marginTop: 5, marginBottom: 0 }} />
                                        </View>
                                    </Placeholder>
                                    :
                                    <View>
                                        <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_search_content}</View>
                                        {/* <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_bestTenCity_content}</View> */}
                                        <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_area_content}</View>
                                        <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_bestTenCity_content}</View>
                                        <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_kota_content}</View>
                                        <View style={{ flexDirection: 'row', width: "100%" }}>{listdata_hotel_content}</View>
                                    </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );





}


