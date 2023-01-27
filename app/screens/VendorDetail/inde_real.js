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




export default class VendorDetail extends Component {
    constructor(props) {
        super(props);

        var slug = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.slug) {
            slug = this.props.navigation.state.params.slug;
            //console.log('productss',JSON.stringify(product));
        } else {
            slug = '';
        }

        var id = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.id) {
            id = this.props.navigation.state.params.id;
            //console.log('productss',JSON.stringify(product));
        } else {
            id = '';
        }

        var product = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.product) {
            product = this.props.navigation.state.params.product;
            //console.log('productss',JSON.stringify(product));
        } else {
            product = '';
        }


        var product_type = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.product_type) {
            product_type = this.props.navigation.state.params.product_type;
        } else {
            product_type = '';
        }

        var param = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.param) {
            param = this.props.navigation.state.params.param;
        } else {
            param = {};
        }



        this.state = {
            slug: slug,
            id: id,
            heightHeader: Utils.heightHeader(),
            product: DataCard[0],
            vendor: {},
            loading: true



        };
        this._deltaY = new Animated.Value(0);


        this.getConfig();
        this.getSession();

    }

    //memanggil config
    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }
    componentDidMount() {
        //this.setState({loading:false});
        this.getData();
        //this.getProduct();
    }

    getData() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                var url = config.apiBaseUrl + "user/vendor/" + this.state.id;
                console.log('urlss', JSON.stringify(url));
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + config.apiToken);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        //console.log('detailVendor',JSON.stringify(result));
                        var vendor = result.data;
                        this.setState({ vendor: result.data });
                        setTimeout(() => {
                            //var vendor=result.data;
                            this.getProduct();
                        }, 50);

                        //this.setState({loading:false});
                    })
                    .catch(error => { alert('Kegagalan Respon Server') });
            }
        });
    }

    getProduct() {
        //console.log('vendor',JSON.stringify(vendor));
        const { vendor } = this.state;
        //var vendor=vendor;
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                //console.log('vendor',JSON.stringify(vendor));
                let config = JSON.parse(result);
                var url = config.apiBaseUrl + "product?id_vendor=" + this.state.id;

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + config.apiToken);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                console.log('url', url);

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {

                        //console.log('productListss',JSON.stringify(result.data));
                        vendor.products = result.data;
                        this.setState({ vendor: vendor });
                        setTimeout(() => {
                            //console.log('vendorNew',JSON.stringify(this.state.vendor));
                            this.setState({ loading: false });
                        }, 50);


                    })
                    .catch(error => { alert('Kegagalan Respon Server') });
            }
        });
    }



    //memanggil session
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }


    render() {
        const { navigation } = this.props;
        const { loading, vendor } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);



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
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
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
                </SafeAreaView>
        );
    }
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




