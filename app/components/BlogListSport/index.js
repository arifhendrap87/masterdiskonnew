
import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, AsyncStorage, Dimensions, Linking } from "react-native";
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
    DataBlogListSport,
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

export default function BlogListSport(props) {
    let { navigation } = props;
    const { title, slug, paramState } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [dataCard, setDataCard] = useState(DataCard);
    const [listData, setListData] = useState(DataBlog);
    const [loading, setLoading] = useState(true);

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    useEffect(() => {
        getData();
    }, []);




    function getData() {
        let time = new Date().getMinutes()
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "promotion/blog";
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
                console.log('BlogListSport', JSON.stringify(result));
                setListData(result.data);
                setLoading(false);

            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                console.log('errorss_configApiListMenu' + time, JSON.stringify(error));
            });


    }





    function renderItemBlog(item, index) {

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: wp("40%"), url: item.img }}
                propInframe={{ top: item.name_blog_category, bottom: item.name_blog_category }}
                propTitle={{ text: item.title }}
                propDesc={{ text: '' }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '' }}

                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                propIsOverlay={false}

                onPress={() => {
                    Linking.openURL('https://masterdiskon.com/blogs/' + item.title_slug)
                }}
                loading={loading}
                propOther={{ inFrame: true, horizontal: true, width: (width) / 2 }}
                style={[{ marginBottom: 0 },
                index % 2 ?
                    { marginRight: 15, marginLeft: 2.5 } :
                    { marginRight: 2.5, marginLeft: 15 }
                ]
                }
            />
        );

    }


    return (


        listData.length != 0 ?
            <View style={{ flex: 1, backgroundColor: BaseColor.whiteColor, marginVertical: 10, paddingBottom: 10 }}>
                <CardCustomTitle style={{ marginLeft: 20 }} title={'Inspirasi'} desc={'Info maupun tips untuk perjalananmu'} />

                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        marginBottom: 0
                    }}
                    //horizontal={false}
                    data={listData}
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
                    renderItem={({ item, index }) => renderItemBlog(item, index)}
                />
                <View style={{ marginHorizontal: 25, marginTop: -10 }}>
                    <Button
                        full
                        style={{ height: 40, backgroundColor: 'white', borderRadius: 10, marginTop: 20 }}
                        onPress={() => { Linking.openURL('https://masterdiskon.com/blogs') }}
                    >
                        Selengkapnya
                    </Button>
                </View>
            </View>
            :
            <View></View>


    );
}


BlogListSport.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

BlogListSport.defaultProps = {
    style: {},
    title: '',
    slug: '',

};