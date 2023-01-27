import React, { Component } from "react";
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
    Coupon,
    CardCustomTitle
} from "@components";
import * as Utils from "@utils";

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
import Modal from "react-native-modal";



export default class DescProduct extends Component {
    constructor(props) {
        super(props);

        var data = props.data;
        var coupons = props.coupons;
        var loadingCoupon = props.loadingCoupon;
        console.log('dataPromo', JSON.stringify(data));
        console.log('dataCoupons', JSON.stringify(coupons));
        this.state = {
            img_featured: Images.doodle,
            //product:props.data,
            loading: true,
            item: data,
            coupons: coupons,
            loadingCoupon: loadingCoupon

        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    // async function claimCoupon(id) {


    //     var raw = "";
    //     if (login == true) {
    //         var param = {
    //             "id": id,
    //             "id_user": userSession.id_user,
    //             "platform": "app"
    //         };
    //         var raw = JSON.stringify(param);
    //         console.log('claimCoupon', raw);

    //     }

    //     let config = configApi;
    //     let baseUrl = config.apiBaseUrl;
    //     let url = baseUrl + "promotion/coupon/claim";
    //     console.log('configApi', JSON.stringify(config));
    //     console.log('urlss', url);

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Authorization", "Bearer " + config.apiToken);

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     return fetch(url, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.success == false) {
    //                 dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

    //             } else {

    //                 dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
    //                 updateClainPromo(id);
    //             }
    //         })
    //         .catch(error => {
    //             console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
    //         });



    // }

    renderItem(item, index) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        if (index == 0) {
            var margin = { marginLeft: 0, marginRight: 10 }
        } else {
            var margin = { marginRight: 10 }
        }
        return (
            <View>
                <Coupon
                    style={[{
                        marginVertical: 0,
                        width: 200,

                    }, margin]}
                    backgroundHeader={BaseColor.primaryColor}
                    name={item.name}
                    code={item.code}
                    description={''}
                    valid={item.expired}
                    remain={priceSplitter('Rp ' + item.minimum_transaction)}
                    onPress={() => {
                        //alert(item.id_coupon);
                        this.props.claimCoupon(item.id);
                        //props.navigation.navigate("HotelDetail");
                    }}
                    quantity={0}
                    claimed={item.claimed}
                    usedKuota={0}
                    claimable={''}
                    usedCoupon={''}
                />


            </View>
        );
    }


    render() {
        const { navigation } = this.props;
        const { loading, item, coupons } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        console.log('product_detail_type', typeof item.product_detail);

        var statusProductDetail = typeof item.product_detail;
        console.log('statusProductDetail', statusProductDetail);
        return (
            loading == true ?
                <Placeholder
                    Animation={Fade}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
                :


                <View style={{ backgroundColor: BaseColor.whiteColor }}>
                    <View style={{ marginHorizontal: 20, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text body2 bold>{item.title_promo}</Text>
                            <HTML
                                html={'<div style="font-size:12">' + item.content_promo + '</div>'}
                                imagesMaxWidth={Dimensions.get("window").width}
                            />
                        </View>
                        {
                            coupons.length != 0 ?

                                <View>


                                    <View>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={coupons}
                                            keyExtractor={(item, index) => item.id_coupon}
                                            renderItem={({ item, index }) => this.renderItem(item, index)}
                                        />
                                    </View>
                                </View>
                                :
                                <View></View>
                        }

                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'stretch', justifyContent: 'space-evenly', marginTop: 10 }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                justifyContent: 'flex-start',
                                borderTopWidth: 0.3,
                                borderTopColor: BaseColor.dividerColor,

                                borderRightWidth: 0.3,
                                borderRightColor: BaseColor.dividerColor,

                                paddingHorizontal: 20,

                            }}
                            onStartShouldSetResponder={() => true}
                            onResponderGrant={() => {
                                this.props.handleShare();
                            }}
                        >
                            <Icon
                                name="pricetag-outline"
                                color={BaseColor.lightPrimaryColor}
                                size={20}
                                style={{ marginRight: 5 }}
                            />
                            <Text caption1>Share Product</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            justifyContent: 'flex-start',
                            borderTopWidth: 0.3,
                            borderTopColor: BaseColor.dividerColor,

                            paddingHorizontal: 20,

                        }}
                            onStartShouldSetResponder={() => true}
                            onResponderGrant={() => {
                                this.props.sendWhatsApp();
                            }}
                        >
                            <Icon
                                name="help-circle-outline"
                                color={BaseColor.lightPrimaryColor}
                                size={20}
                                style={{ marginRight: 5 }}
                            />
                            <Text caption1>Tanyakan Produk</Text>
                        </View>


                    </View>
                </View>





        );
    }
}
