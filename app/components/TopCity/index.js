import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, AsyncStorage, Dimensions } from "react-native";
import {
    Text,
    SafeAreaView,
    Header,
    Image,
    Icon,
    Tag,
    FormOption,
    Button
} from "@components";
import PropTypes from "prop-types";
// import styles from "./styles";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    DataMenu, DataMasterDiskon, DataCard
} from "@data";

import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-svg-uri';
import CardCustom from "../CardCustom";
import CardCustomTitle from "../CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;
import { useSelector, useDispatch } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
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
    DataPromo,
    DataTopCity,
    DataGetProvince
} from "@data";


const styles = StyleSheet.create({
    itemService: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
    },

    iconContentColor: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 5,
        marginBottom: 5,
        //backgroundColor: BaseColor.primaryColor,
    },
    cardGroup: {
        marginTop: 10,
        width: '100%',
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 10
    },
    cardGroupTransparent: {
        marginTop: 10,
        width: '100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom: 10
    },
});
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default function TopCity(props) {
    let { navigation } = props;
    const { title, slug, paramState } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [dataCard, setDataCard] = useState(DataCard);
    const [listData, setListData] = useState(DataTopCity);
    const [loading, setLoading] = useState(true);

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    useEffect(() => {
        getData();
    }, []);


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
                if (result.data != undefined) {
                    setListData(result.data);
                    setLoading(false);
                } else {
                    setListData([]);
                    setLoading(false);
                }

            })
            .catch(error => {
                console.log('errorss_topCity', JSON.stringify(error));
            });


    }

    function getNight(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;

    }

    function getDate(num) {
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    }

    function convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    function onSubmit(item) {

        var round = true;
        var tgl_akhir = '';
        if (round == true) {
            tgl_akhir = getDate(1);
        }


        var param = {
            DepartureDate: getDate(0),
            ReturnDate: tgl_akhir,
            Adults: "2",
            Children: "0",
            Infants: "0",
        }

        var link = '';



        param.city = item.product_detail.searchCity;
        param.hotelid = item.product_detail.searchHotel;
        param.typeSearch = item.product_detail.searchType;
        param.area = item.product_detail.searchArea;
        param.country = "Indonesia";
        param.room = 1;
        param.stringAdults = "2";
        param.stringChild = "0";
        param.stringBaby = "0";
        param.umurank = "0";
        param.stringumurank = "0,0";
        param.stringRoom = "1";
        param.adultnchildparam = "Adult,Adult";
        param.checkin = convertDateText(param.DepartureDate);
        param.checkout = convertDateText(param.ReturnDate);

        param.adults = param.Adults;
        param.child = param.Children;

        param.noofnights = getNight(param.DepartureDate, param.ReturnDate);
        param.type = 'hotelLinx';

        param.roomMultiCountRoom = 1;
        param.roomMultiParam = [
            {
                "id": 1,
                "dewasa": 2,
                "anak": 0,
                "bayi": 0,
                "umurAnakKe1": 0,
                "umurAnakKe2": 0,
                "umurAnak": ""
            }
        ];
        param.roomMultiGuest = 2;
        param.hotelLinxDestinationLabel = item.product_detail.cityname + " " + item.product_detail.countryname;
        param.tglAwal = getDate(0);
        param.tglAkhir = getDate(1);

        param.hotelLinxDestination = {
            "total": "0",
            "cityid": item.product_detail.cityid,
            "cityname": item.product_detail.cityname,
            "countryname": item.product_detail.countryname,
            "searchType": "best",
            "searchCity": item.product_detail.cityid,
            "searchHotel": "",
            "searchTitle": item.product_detail.cityname + " " + item.product_detail.countryname,
            "searchArea": "",
            "searchCountry": item.product_detail.countryname,
            "searchProvince": "",
        };

        param.ratingH = "";
        param.rHotel = "";
        param.srcdata = "";
        param.minimbudget = "0";
        param.maximbudget = "15000000";
        param.shortData = "";
        param.startkotak = "0";
        param.searchTitle = item.product_detail.cityname + " " + item.product_detail.countryname,
            param.jmlTamu = 2;
        param.room = 1;


        console.log('paramOnsubmit', JSON.stringify(param));
        link = 'HotelLinx';
        navigation.navigate(link,
            {
                param: param,
                paramOriginal: param
            });


    }


    function renderItemGetProvince(item, index) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: hp("20%"), url: item.image }}
                propInframe={{ top: item.name, topTitle: '', bottom: 'Rp ' + priceSplitter(item.price), bottomTitle: 'Mulai dari' }}
                propTitle={{ text: '' }}
                propDesc={{ text: '' }}
                propPrice={{ price: priceSplitter(item.product_price), startFrom: false }}
                propPriceCoret={{ price: '', discount: priceSplitter(item.product_discount), discountView: false }}

                propStar={{ rating: 10, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    console.log('item', JSON.stringify(item));
                    let detail = {};
                    detail.total = "";
                    detail.cityid = "";
                    detail.cityname = item.name;
                    detail.countryname = "";
                    detail.searchType = "best";

                    detail.searchCity = item.cityid;
                    detail.searchHotel = item.name;
                    detail.searchTitle = item.name;
                    detail.searchArea = item.name;

                    detail.searchCountry = item.name;
                    detail.searchProvince = item.name;

                    var items = {
                        product_detail: detail
                    }

                    onSubmit(items);
                }

                }
                loading={loading}
                propOther={{ inFrame: true, horizontal: true, width: wp("35%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
                style={[
                    index == 0
                        ? { marginLeft: 10, marginRight: 0 }
                        : { marginRight: 0 }
                ]}
            />
        );

    }


    return (

        listData.length != 0 ?
            <View style={{ flex: 1, backgroundColor: BaseColor.whiteColor }}>
                <CardCustomTitle
                    style={{ marginLeft: 20 }}
                    title={'Kota terbaik'}
                    desc={''}
                    more={false}
                    onPress={() =>
                        navigation.navigate("Activities")
                    }
                />
                <FlatList
                    contentContainerStyle={{
                        paddingRight: 20
                    }}
                    horizontal={true}
                    data={listData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id}
                    getItemLayout={(item, index) => (
                        { length: 70, offset: 70 * index, index }
                    )}
                    removeClippedSubviews={true} // Unmount components when outside of window 
                    initialNumToRender={2} // Reduce initial render amount
                    maxToRenderPerBatch={1} // Reduce number in each render batch
                    maxToRenderPerBatch={100} // Increase time between renders
                    windowSize={7} // Reduce the window size
                    renderItem={({ item, index }) => renderItemGetProvince(item, index)}


                />
            </View>
            :
            <View></View>

    );
}


TopCity.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

TopCity.defaultProps = {
    style: {},
    title: '',
    slug: '',

};