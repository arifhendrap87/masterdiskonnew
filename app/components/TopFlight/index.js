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
    DataTopFlight,
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

export default function TopFlight(props) {
    let { navigation } = props;
    const { title, slug } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [dataCard, setDataCard] = useState(DataCard);
    const [listData, setListData] = useState(DataTopFlight);
    const [loading, setLoading] = useState(true);
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    useEffect(() => {
        getData();
    }, []);


    function getData() {
        let time = new Date().getMinutes()
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/flight/popular";
        console.log('urlflight', JSON.stringify(url));
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
                console.log('resulttopflight', JSON.stringify(result));
                if (result.data != undefined) {
                    setListData(result.data);
                    setLoading(false);
                } else {
                    setListData([]);
                    setLoading(false);
                }


            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                //console.log('errorss_configApiListMenu' + time, JSON.stringify(error));
            });


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

    function toFlightSearch(item) {
        console.log('toFlightSearchComp', JSON.stringify(item));
        var tglAwal = getDate(1);
        var tglAkhir = getDate(2);
        console.log('tglAwal', tglAwal);
        console.log('tglAkhir', tglAkhir);

        paramFlightSearch = {
            "DepartureDate": tglAwal,
            "ReturnDate": tglAkhir,
            "Adults": "1",
            "Children": "0",
            "Infants": "0",
            "Origin": "CGK",
            "Destination": item.destination,
            "IsReturn": true,
            "CabinClass": [
                "E"
            ],
            "CorporateCode": "",
            "Subclasses": false,
            "Airlines": [],
            "type": "flight",
            "Qty": 1,
            "participant": true,
            "round": true,
            "bandaraAsalCode": "CGK",
            "bandaraTujuanCode": item.destination,
            "bandaraAsalLabel": "Soekarno Hatta",
            "bandaraTujuanLabel": item.name,
            "tglAwal": tglAwal,
            "tglAkhir": tglAkhir,
            "listdata_kelas": [
                {
                    "value": "E",
                    "text": "Economy Class"
                },
                {
                    "value": "S",
                    "text": "Premium Economy"
                },
                {
                    "value": "B",
                    "text": "Business Class"
                },
                {
                    "value": "F",
                    "text": "First Class"
                }
            ],
            "kelas": "Economy Class",
            "kelasId": "E",
            "jumlahPerson": 1,
            "dewasa": "1",
            "anak": "0",
            "bayi": "0"
        };

        console.log('paramFlightSearch', JSON.stringify(paramFlightSearch));

        navigation.navigate('FlightResultVia',
            {
                param: paramFlightSearch,
            });

    }

    function renderItemTopFlight(item, index) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: hp("20%"), url: item.image }}
                propInframe={{ top: item.name + " (" + item.destination + ")", topTitle: 'Jakarta ke', topHighlight: false, topIcon: 'airplane-outline', bottom: '', bottomTitle: '' }}
                propTitle={{ text: '' }}
                propDesc={{ text: '' }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '', discount: priceSplitter(item.product_discount), discountView: false }}

                propStar={{ rating: 10, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    toFlightSearch(item);
                }
                }
                loading={loading}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
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
            <View style={{ flex: 1, backgroundColor: BaseColor.whiteColor, marginVertical: 10, paddingBottom: 10 }}>
                <CardCustomTitle
                    style={{ marginLeft: 20 }}
                    title={'Penerbangan Populer'}
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
                    renderItem={({ item, index }) => renderItemTopFlight(item, index)}


                />
            </View>
            :
            <View></View>

    );
}


TopFlight.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

TopFlight.defaultProps = {
    style: {},
    title: '',
    slug: '',

};