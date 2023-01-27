import React, { Component, useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    InteractionManager,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    StarRating,
    Tag,
} from "@components";
import * as Utils from "@utils";
import PhotoHeader from "../../components/VendorDetail/PhotoHeader.js";
import DescVendor from "../../components/VendorDetail/DescVendor.js";
import Products from "../../components/VendorDetail/Products.js";

import Schedule from "../../components/ProductDetail/General/Schedule.js";
import CollectionView from "../../components/ProductDetail/General/CollectionView.js";
import DescPartner from "../../components/ProductDetail/General/DescPartner.js";
import Services from "../../components/ProductDetail/General/Services.js";
import Information from "../../components/ProductDetail/General/Information.js";
import HowExchange from "../../components/ProductDetail/General/HowExchange.js";
import CancelPolicy from "../../components/ProductDetail/General/CancelPolicy.js";
import Location from "../../components/ProductDetail/General/Location.js";
import Comment from "../../components/ProductDetail/General/Comment.js";
import Bid from "../../components/ProductDetail/General/Bid.js";
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader, LinesLoader } from 'react-native-indicator';
import {
    DataMenu, DataMasterDiskon, DataCard
} from "@data";


import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


// Load sample data
import HTML from "react-native-render-html";
import {
    DataConfig,
} from "@data";

// import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import ImageSize from 'react-native-image-size';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';

export default function VendorDetail(props) {
    let { navigation } = props;
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    const [slug, setSlug] = useState((navigation.state.params && navigation.state.params.slug) ? navigation.state.params.slug : '');
    const [id, setId] = useState((navigation.state.params && navigation.state.params.id) ? navigation.state.params.id : '');
    const [product, setProduct] = useState((navigation.state.params && navigation.state.params.product) ? navigation.state.params.product : DataCard[0]);
    const [productType, setProductType] = useState((navigation.state.params && navigation.state.params.productType) ? navigation.state.params.productType : '');
    const [param, setParam] = useState((navigation.state.params && navigation.state.params.param) ? navigation.state.params.param : '');
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const [vendor, setVendor] = useState({});
    const [loading, setLoading] = useState(true);
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);

    useEffect(() => {

        getData();


    }, [])

    function getData() {

        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "user/vendor/" + id;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

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
                //console.log('detailVendor', JSON.stringify(result.data));
                //var vendor = result.data;
                //setVendor(result.data);
                getProduct(result.data);

                // setTimeout(() => {
                //     console.log('vendorgetData', JSON.stringify(vendor));
                //     getProduct();
                // }, 3000);

            })
            .catch(error => { alert('Kegagalan Respon Server') });
    }

    function getProduct(dataVendor) {

        let config = configApi;
        var url = config.apiBaseUrl + "product?id_vendor=" + id;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log('urlgetProduct', url);

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {

                //console.log('vendorgetproduct', JSON.stringify(vendor));
                // vendor.products = result;
                // console.log('vendorproductListss', JSON.stringify(vendor));
                // setVendor(vendor);
                // setTimeout(() => {
                //     setLoading(false);
                // }, 50);
                dataVendor.products = result.data;
                setVendor(dataVendor);
                setLoading(false);
                //console.log('dataVendorProduct', JSON.stringify(dataVendor));



            })
            .catch(error => { alert('Kegagalan Respon Server') });

    }

    return (
        loading == true ?
            <View style={{
                position: "absolute",
                top: 220,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {/* <LinesLoader /> */}
                <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                <Text>Sedang memuat data</Text>
            </View>
            :
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                // onScroll={Animated.event([
                //     {
                //         nativeEvent: {
                //             contentOffset: { y: this._deltaY }
                //         }
                //     }
                // ])}
                // onContentSizeChange={() => {
                //     setHeightHeader(Utils.heightHeader());
                // }
                //     // this.setState({
                //     //     heightHeader: Utils.heightHeader()
                //     // })

                // }
                //scrollEventThrottle={8}
                >
                    <PhotoHeader data={vendor} />
                    <DescVendor data={vendor} />
                    <Products data={vendor} navigation={navigation} />
                    {/* <Schedule data={this.state.product}/>
                        <CollectionView data={this.state.product}/>
                        <DescPartner data={this.state.product}/>
                        <Services data={this.state.product}/>
                        <Information data={this.state.product}/>
                        <HowExchange data={this.state.product}/>
                        <CancelPolicy data={this.state.product}/>
                        <Location data={this.state.product}/>
                        <Comment data={this.state.product}/>
                        <Bid data={this.state.product}/> */}

                </ScrollView>
            </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    lineInfor: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    todoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center"
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },

    itemPrice: {
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linePrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    linePriceMinMax: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 10
    },
    iconRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    contentService: {
        paddingVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
});

