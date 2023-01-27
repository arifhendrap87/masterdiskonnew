
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
    DataBlogList,
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

export default function BlogList(props) {
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
                setListData(result.data);
                setLoading(false);
                console.log('BlogList', JSON.stringify(result));

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
                propImage={{ height: wp("40%"), url: item.img_featured_url }}
                propInframe={{ top: item.name_blog_category, bottom: item.name_blog_category }}
                propTitle={{ text: item.title }}
                propDesc={{ text: item.title }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '' }}

                propStar={{ rating: '', enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {
                    console.log('blog', JSON.stringify(item));


                    var param = {
                        url: 'https://masterdiskon.com/blog/detail/' + item.slug_blog_category + '/' + item.title_slug,
                        title: 'Blog',
                        subTitle: ''
                    }
                    console.log('paramBlog', JSON.stringify(param));
                    navigation.navigate("WebViewPage", { param: param })

                }

                }
                loading={loading}
                propOther={{ inFrame: true, horizontal: true, width: (width - 50) / 2 }}
                style={[
                    index % 2 ? { marginLeft: 10 } : {}
                ]
                }
            />
        );

    }


    return (


        listData.length != 0 ?
            <View>
                <CardCustomTitle style={{ marginLeft: 20 }} title={'Inspirasi'} desc={'Info maupun tips untuk perjalananmu'} />
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        marginBottom: 10
                    }}
                    style={{ marginHorizontal: 20 }}
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
                <View style={{ marginHorizontal: 20, marginTop: -20 }}>
                    <Button
                        full
                        // loading={loading}
                        style={{ height: 40, backgroundColor: 'white', borderRadius: 5, marginTop: 20 }}
                        onPress={() => {
                            var param = {
                                url: 'https://masterdiskon.com/blog',
                                title: 'Blog',
                                subTitle: ''
                            }
                            navigation.navigate("WebViewPage", { param: param })
                            //navigation.navigate("WebVewPage",{param:});


                        }}
                    >
                        Selengkapnya
                    </Button>
                </View>
            </View>
            :
            <View></View>


    );
}


BlogList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

BlogList.defaultProps = {
    style: {},
    title: '',
    slug: '',

};