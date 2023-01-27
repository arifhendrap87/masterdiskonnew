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
import PhotoHeader from "../../components/ProductDetail/PhotoHeader.js";
import DescProduct from "../../components/ProductDetail/DescProduct.js";
import Schedule from "../../components/ProductDetail/Schedule.js";
import CollectionView from "../../components/ProductDetail/CollectionView.js";
import DescPartner from "../../components/ProductDetail/DescPartner.js";
import Services from "../../components/ProductDetail/Services.js";
import Information from "../../components/ProductDetail/Information.js";
import HowExchange from "../../components/ProductDetail/HowExchange.js";
import CancelPolicy from "../../components/ProductDetail/CancelPolicy.js";
import Location from "../../components/ProductDetail/Location.js";
import Comment from "../../components/ProductDetail/Comment.js";
import Bid from "../../components/ProductDetail/Bid.js";
import Option from "../../components/ProductDetail/Option.js";
import QuantityPickerHorizontal from "../../components/QuantityPickerHorizontal";

//import { CirclesLoader, PulseLoader, TextLoader, DotsLoader,LinesLoader } from 'react-native-indicator';
import {
    DataMenu, DataMasterDiskon, DataCard
} from "@data";
import DropdownAlert from 'react-native-dropdownalert';


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

import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import ImageSize from 'react-native-image-size';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';

export default function ProductList(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    // console.log('configApiBooking', JSON.stringify(configApi));
    // console.log('userSessionBooking', JSON.stringify(userSession));
    // console.log('loginBooking', JSON.stringify(login));

    const [slug, setSlug] = useState((navigation.state.params && navigation.state.params.slug) ? navigation.state.params.slug : '');
    const [productId, setProductId] = useState((navigation.state.params && navigation.state.params.productId) ? navigation.state.params.productId : '');
    const [product, setProduct] = useState((navigation.state.params && navigation.state.params.product) ? navigation.state.params.product : '');
    const [productPart, setProductPart] = useState((navigation.state.params && navigation.state.params.productPart) ? navigation.state.params.productPart : '');
    const [productType, setProductType] = useState((navigation.state.params && navigation.state.params.productType) ? navigation.state.params.productType : '');
    const [param, setParam] = useState((navigation.state.params && navigation.state.params.param) ? navigation.state.params.param : '');
    const [paramProduct, setParamProduct] = useState((navigation.state.params && navigation.state.params.paramProduct) ? navigation.state.params.paramProduct : '');
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());

    useEffect(() => {
        getData();
        //productHotel();
        return () => {

        }
    }, [])

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


    async function getData() {

        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/" + slug;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        // let config = JSON.parse(result);
        // var url=config.apiBaseUrlDev+"product/"+slug;
        // console.log('url',JSON.stringify(url));
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
                const array = [
                    'https://fave-production-main.myfave.gdn/attachments/b830f5d667f72a999671580eb58683af908d4486/store/fill/400/250/5b225df71f4f5fcd71a24bb5e7f7eb44026fa4b98005d45a979853b812c3/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/240be21ccb5ad99e3afb0f591a4c65273b0f8c16/store/fill/800/500/bd1160e0f91e468af35f6186d6fd7374868f62b1534ee5db6432399b5f48/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/ffd7160ebf8ff67cc63e22016f82803a85714754/store/fill/400/250/975eec09dd53b92faca441aa40b75a6843a0628d30a966375404f1730f0b/activity_image.jpg'
                ];

                console.log('detailProduct', JSON.stringify(result));
                result.data.img_featured_url = getRandomItem(array);

                setProduct(result.data);
                setProductPart(result.data.product_detail[0]);
                setPrice(result.data.product_detail[0]);
                // setTimeout(() => {
                //     setPrice(result.data.product_detail[0]);
                // }, 20);

                setParam({
                    "DepartureDate": getDate(0),
                    "ReturnDate": "",
                    "Adults": "1",
                    "Children": "0",
                    "Infants": "0",
                    "type": "",
                    "Qty": quantity,
                    "totalPrice": parseInt(result.data.product_detail[0].price) * quantity,
                    "participant": false
                });
                setLoading(false);


            })
            .catch(error => {
                //his.dropdown.alertWithType('info', 'Info', 'Terjadi kesalahan');

                if (isEmpty(error)) {
                    setLoading(false);
                    navigation.goBack();
                    this.dropdown.alertWithType('info', 'Info', 'Terjadi kesalahan');
                    console.log('errorss', 'Terjadi kesalahan');
                }
            });
    }

    var isEmpty = function (data) {
        if (typeof (data) === 'object') {
            if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
                return true;
            } else if (!data) {
                return true;
            }
            return false;
        } else if (typeof (data) === 'string') {
            if (!data.trim()) {
                return true;
            }
            return false;
        } else if (typeof (data) === 'undefined') {
            return true;
        } else {
            return false;
        }
    }


    function getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    function setPrice(select) {
        setProductPart(select);
        console.log('select', JSON.stringify(select));
        console.log('productPart', JSON.stringify(productPart));
        console.log('quantity', JSON.stringify(quantity));
        setTimeout(() => {
            var totalx = select.price * quantity;
            setTotal(totalx);
        }, 20);



    }

    function setQuantityx(value, id) {
        setQuantity(value);
        setTimeout(() => {
            setPrice(productPart);
        }, 20);
        //console.log('value',value);
    }

    function onSubmit() {
        var paramx = {
            "DepartureDate": getDate(0),
            "ReturnDate": "",
            "Adults": "1",
            "Children": "0",
            "Infants": "0",
            "type": "hotels",
            "Qty": quantity,
            "totalPrice": parseInt(productPart.price) * quantity,
            "participant": false,
        };

        link = 'Summary';
        //param.type=product_type;
        // param.cityId=cityId;
        // param.cityText=cityText;
        // param.cityProvince=cityProvince;
        // param.Qty=parseInt(qty);
        // param.totalPrice=parseInt(qty)*parseInt(select.price);
        // param.participant=false;

        var param = {
            param: paramx,
            product: product,
            productPart: productPart
        }

        console.log('dataSummary', JSON.stringify(param));

        navigation.navigate(link,
            {
                param: param,
            });


        //console.log('paramSubmit',JSON.stringify(param));
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
                <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                <Text>Sedang memuat data</Text>
                {/* <LinesLoader />
            <TextLoader text="Sedang Memuat Data" /> */}
            </View>
            :
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >
                <ScrollView
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { y: this._deltaY }
                            }
                        }
                    ])}
                    onContentSizeChange={() => {
                        setHeightHeader(Utils.heightHeader());
                    }
                    }
                    scrollEventThrottle={8}
                >
                    <PhotoHeader data={product} />
                    <DescProduct data={product} />
                    <Option data={product} setPrice={setPrice} />
                    <DescPartner navigation={navigation} data={product} />
                    <CollectionView navigation={navigation} data={product} />
                    <Schedule data={product} />
                    <Services data={product} />
                    <HowExchange data={product} />
                    <CancelPolicy data={product} />
                    <Information data={product} />
                    <Location data={product} />
                    <Comment data={product} />
                    <Bid data={product} />


                </ScrollView>
                <View style={[styles.contentButtonBottom]}>

                    <QuantityPickerHorizontal
                        style={{}}
                        label="Quantity"
                        detail="Pesanan"
                        value={1}
                        minPerson={1}
                        valueMin={1}
                        valueMax={false}
                        setQuantity={setQuantityx}
                        id={1}
                        typeOld={'4'}

                    />
                    <Button
                        full
                        style={{ height: 40, borderRadius: 0, width: 'auto', borderRadius: 10 }}
                        onPress={() => {
                            onSubmit();

                        }}
                    >
                        <Text caption1 bold>Beli - {total}</Text>

                    </Button>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={1000} />

            </SafeAreaView>
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




