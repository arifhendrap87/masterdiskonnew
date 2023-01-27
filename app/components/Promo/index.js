
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
import Swiper from 'react-native-swiper'

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
    DataBlogList,
    DataGetProvince
} from "@data";
import * as Utils from "@utils";

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

    wrapper: {
        width: "100%",
        height: Utils.scaleWithPixel(hp("20%")),
        justifyContent: "flex-end",
        marginLeft: 0,
        borderRadius: 8,
        marginBottom: 10

    },
    contentPage: {
        bottom: 0
    },
    img: {
        width: "95%",
        height: "100%",
        backgroundColor: '#00b9df',
        borderRadius: 10,
    },
});
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default function Promo(props) {
    let { navigation } = props;
    const { title, slug, paramState } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [dataCard, setDataCard] = useState(DataCard);
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);

    const [listData, setListData] = useState([
        {
            "name": "Diskon Early Bird - Travel Time",
            "slug": "diskon-early-bird---travel-time",
            "image": "https://cdn.masterdiskon.com/masterdiskon/promotion/promo/2022/WhatsApp_Image_2022-05-24_at_11_10_42.jpeg",
            "valid_end": "31 Jul 2022"
        },
        {
            "name": "Diskon khusus Hotel - Travel Time",
            "slug": "diskon-khusus-hotel---travel-time",
            "image": "https://cdn.masterdiskon.com/masterdiskon/promotion/promo/2022/WhatsApp_Image_2022-05-24_at_09_48_11_(1).jpeg",
            "valid_end": "31 Jul 2022"
        },
        {
            "name": "Diskon khusus Tiket Pesawat - Travel Time",
            "slug": "diskon-khusus-tiket-pesawat---travel-time",
            "image": "https://cdn.masterdiskon.com/masterdiskon/promotion/promo/2022/WhatsApp_Image_2022-05-24_at_11_10_43.jpeg",
            "valid_end": "31 Jul 2022"
        },
        {
            "name": "Promo aplikasi hingga 200rb",
            "slug": "promo-aplikasi-hingga-200rb",
            "image": "https://cdn.masterdiskon.com/masterdiskon/promotion/promo/2022/WhatsApp_Image_2022-05-24_at_11_10_41.jpeg",
            "valid_end": "31 Jul 2022"
        }
    ]);
    const [loading, setLoading] = useState(true);

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    useEffect(() => {
        if (dataMasterDiskon.status == "sandbox") {
            setLoading(false);


        } else {
            getData();

        }
    }, []);


    function getData() {
        let time = new Date().getMinutes()
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "promotion/promo?limit=6";
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
                console.log('Promo', JSON.stringify(result.data));
                setListData(result.data);
                setLoading(false);
                console.log('Promo', JSON.stringify(result.data));

            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                console.log('errorss_Promo' + time, JSON.stringify(error));
            });


    }


    function convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    function renderItemPromo(item, index, length) {
        const { navigation } = this.props;
        const { config, param } = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: item.img_featured_url }}
                propInframe={{ top: item.product_desc, bottom: convertDateText(item.product_time) + '-' + convertDateText(item.product_time2) }}
                propTitle={{ text: item.product_name }}
                propDesc={{ text: '' }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '' }}

                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                propCopyPaste={{ left: item.product_code, right: item.product_time, enabled: false }}
                onPress={() => {
                    console.log('item', JSON.stringify(item));
                    navigation.navigate("PromoDetail", { product: item });
                }

                }

                loading={this.state.loading_dashboard}
                propOther={{ inFrame: true, horizontal: true, width: length != 1 ? (width - 0) / 2 : (width - 40) / 1 }}
                style={[
                    length != 1 ?
                        index == 0
                            ? { marginLeft: 20, marginRight: 10 }
                            : { marginRight: 10 }
                        :
                        { marginLeft: 20 }

                ]}
            />
        );

    }



    return (


        listData.length != 0 ?
            <View style={{ marginLeft: 20, marginTop: 10 }}>

                {
                    loading ?
                        <Placeholder
                            Animation={Fade}
                        >
                            <PlaceholderLine width={95} style={{
                                width: "95%",
                                height: Utils.scaleWithPixel(100),
                                marginLeft: 0,
                                marginRight: 0,
                                borderRadius: 0
                            }} />
                        </Placeholder>
                        :

                        <View style={styles.wrapper}>

                            <Swiper
                                dotStyle={{
                                    backgroundColor: BaseColor.textSecondaryColor
                                }}

                                activeDotColor={BaseColor.primaryColor}
                                paginationStyle={styles.contentPage}
                                removeClippedSubviews={false}
                            >
                                {listData.map((item, index) => {
                                    return (
                                        <TouchableOpacity

                                            onPress={() => {
                                                if (dataMasterDiskon.status == "sandbox") {
                                                    alert('Saat ini sedang mode sandbox');
                                                } else {
                                                    navigation.navigate("Loading",
                                                        {
                                                            redirect: 'ProductDetailNew',
                                                            param: { slug: item.slug, product_type: 'promo' },
                                                        }
                                                    )

                                                }


                                            }}
                                        >
                                            <FastImage
                                                source={{ uri: item.image }}
                                                style={[
                                                    styles.img,
                                                    {
                                                        height: Utils.scaleWithPixel(hp("20%")),
                                                        backgroundColor: BaseColor.lightPrimaryColor,
                                                    },
                                                ]}
                                                resizeMode={"cover"}
                                                key={index}
                                            />

                                        </TouchableOpacity>

                                    );
                                })}
                            </Swiper>



                        </View>
                }
            </View>
            :
            <View></View>


    );
}


Promo.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

Promo.defaultProps = {
    style: {},
    title: '',
    slug: '',

};