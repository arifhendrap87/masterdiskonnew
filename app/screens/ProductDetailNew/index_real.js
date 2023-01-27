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




export default class ProductDetailNew extends Component {
    constructor(props) {
        super(props);

        var slug = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.slug) {
            slug = this.props.navigation.state.params.slug;
            //console.log('productss',JSON.stringify(product));
        } else {
            slug = '';
        }


        var productId = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.productId) {
            productId = this.props.navigation.state.params.productId;
            //console.log('productss',JSON.stringify(product));
        } else {
            productId = '';
        }


        var product = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.product) {
            product = this.props.navigation.state.params.product;
            //console.log('productss',JSON.stringify(product));
        } else {
            product = '';
        }

        var productPart = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.productPart) {
            productPart = this.props.navigation.state.params.productPart;
            //console.log('productss',JSON.stringify(product));
        } else {
            productPart = '';
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

        var paramProduct = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.paramProduct) {
            paramProduct = this.props.navigation.state.params.paramProduct;
        } else {
            paramProduct = {};
        }



        this.state = {
            slug: slug,
            heightHeader: Utils.heightHeader(),
            product: DataCard[0],
            loading: true,
            param: {
                "DepartureDate": this.getDate(0),
                "ReturnDate": "",
                "Adults": "1",
                "Children": "0",
                "Infants": "0",
                "type": "",
                "Qty": 0,
                "totalPrice": 0,
                "participant": false
            },
            paramProduct: paramProduct,
            product: product,
            productPart: productPart,
            quantity: 1,
            total: 0



        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
        this.setQuantity = this.setQuantity.bind(this);



        this.getConfigApi();
        this.getConfig();
        this.getSession();

    }

    //memanggil config
    getConfigApi() {
        AsyncStorage.getItem('configApi', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ configApi: config });
            }
        });
    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }

    //memanggil session
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('userSessions', JSON.stringify(userSession));

                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }

    getDate(num) {
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    }



    componentDidMount() {
        setTimeout(() => {
            this.getData();
            this.productHotel();
        }, 20);

    }

    productGeneral() {


    }

    productHotel() {

        // let config=this.state.configApi;
        // let baseUrl=config.apiBaseUrl;
        // let url=baseUrl+"product/hotel/detail?type=hotel&hotelid=22858";
        // console.log('configApiproductHotel',JSON.stringify(config));
        // console.log('urlssproductHotel',url);

        // //let token="access_token="+config.apiToken+"; refresh_token="+config.apiTokenRefresh;
        // let token="access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNDEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTYzNjE2NDYwMzMwNiwiaWF0IjoxNjM2MDc4MjAzfQ.23TklY0cec2bINFiqQ7mSc3qjNNwis2KskvdD_O5D0Q";
        // console.log('tokenHotel',token);



        // var myHeaders = new Headers();
        // myHeaders.append("Cookie", token);

        // var formdata = new FormData();

        // var requestOptions = {
        // method: 'GET',
        // headers: myHeaders,
        // body: formdata,
        // redirect: 'follow'
        // };

        // fetch(url, requestOptions)
        // .then(response => response.json())
        // .then(result => {
        //     console.log('resutlHotel',JSON.stringify(result));

        // })
        // .catch(error => {
        //     console.log('error', error)
        // });


        var myHeaders = new Headers();
        myHeaders.append("Cookie", "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNDEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTYzNjE2NDYwMzMwNiwiaWF0IjoxNjM2MDc4MjAzfQ.23TklY0cec2bINFiqQ7mSc3qjNNwis2KskvdD_O5D0Q");

        var formdata = new FormData();
        var url = "https://devapi.masterdiskon.com/v1/product/hotel/detail?type=hotel&hotelid=22858";
        console.log('urlss', url)
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('resutlHotel', JSON.stringify(result));

            })
            .catch(error => {
                console.log('error', error)
            });



    }

    getData() {

        let config = this.state.configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/" + this.state.slug;
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        // let config = JSON.parse(result);
        // var url=config.apiBaseUrlDev+"product/"+this.state.slug;
        // console.log('url',JSON.stringify(url));
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
                const array = [
                    'https://fave-production-main.myfave.gdn/attachments/b830f5d667f72a999671580eb58683af908d4486/store/fill/400/250/5b225df71f4f5fcd71a24bb5e7f7eb44026fa4b98005d45a979853b812c3/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/240be21ccb5ad99e3afb0f591a4c65273b0f8c16/store/fill/800/500/bd1160e0f91e468af35f6186d6fd7374868f62b1534ee5db6432399b5f48/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/ffd7160ebf8ff67cc63e22016f82803a85714754/store/fill/400/250/975eec09dd53b92faca441aa40b75a6843a0628d30a966375404f1730f0b/activity_image.jpg'
                ];

                console.log('detailProduct', JSON.stringify(result));
                result.data.img_featured_url = this.getRandomItem(array);
                this.setState({ product: result.data });
                this.setState({ productPart: result.data.product_detail[0] });
                console.log('option', result.data.product_detail[0])
                setTimeout(() => {
                    this.setPrice(result.data.product_detail[0]);
                }, 20);
                //this.setPrice(result.data.product_detail[0]);
                //this.setState({total:this.state.quantity*result.data.product_detail[0].price})
                this.setState({
                    param: {
                        "DepartureDate": this.getDate(0),
                        "ReturnDate": "",
                        "Adults": "1",
                        "Children": "0",
                        "Infants": "0",
                        "type": "",
                        "Qty": this.state.quantity,
                        "totalPrice": parseInt(result.data.product_detail[0].price) * this.state.quantity,
                        "participant": false
                    }
                });
                this.setState({ loading: false });
                setTimeout(() => {
                    console.log('productPart', JSON.stringify(this.state.productPart));
                    console.log('productParam', JSON.stringify(this.state.param));
                }, 50);
            })
            .catch(error => { alert('Kegagalan Respon Server') });

    }

    getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
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



    setPrice(select) {

        this.setState({ productPart: select });
        setTimeout(() => {
            var total = this.state.productPart.price * this.state.quantity;
            this.setState({ total: total });
        }, 20);



    }

    setQuantity(value, id) {
        this.setState({ quantity: value });
        setTimeout(() => {
            this.setPrice(this.state.productPart);
        }, 20);
        //console.log('value',value);
    }
    onSubmit() {
        const { product, productPart } = this.state;
        var param = {
            "DepartureDate": this.getDate(0),
            "ReturnDate": "",
            "Adults": "1",
            "Children": "0",
            "Infants": "0",
            "type": "hotels",
            "Qty": this.state.quantity,
            "totalPrice": parseInt(this.state.productPart.price) * this.state.quantity,
            "participant": false,
        };

        link = 'Summary';
        //param.type=this.state.product_type;
        // param.cityId=this.state.cityId;
        // param.cityText=this.state.cityText;
        // param.cityProvince=this.state.cityProvince;
        // param.Qty=parseInt(qty);
        // param.totalPrice=parseInt(qty)*parseInt(select.price);
        // param.participant=false;

        var param = {
            param: param,
            product: product,
            productPart: productPart
        }

        console.log('dataSummary', JSON.stringify(param));

        this.props.navigation.navigate(link,
            {
                param: param,
            });


        //console.log('paramSubmit',JSON.stringify(param));
    }
    render() {
        const { navigation } = this.props;
        const { loading, productPart } = this.state;
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
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        <PhotoHeader data={this.state.product} />
                        <DescProduct data={this.state.product} />
                        <Option data={this.state.product} setPrice={this.setPrice} />
                        <DescPartner navigation={navigation} data={this.state.product} />
                        <CollectionView navigation={navigation} data={this.state.product} />
                        <Schedule data={this.state.product} />
                        <Services data={this.state.product} />
                        <HowExchange data={this.state.product} />
                        <CancelPolicy data={this.state.product} />
                        <Information data={this.state.product} />
                        <Location data={this.state.product} />
                        <Comment data={this.state.product} />
                        <Bid data={this.state.product} />


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
                            setQuantity={this.setQuantity}
                            // setJumlahDewasa={this.setJumlahDewasa}
                            // setJumlahAnak={this.setJumlahAnak}
                            // setJumlahBayi={this.setJumlahBayi}
                            id={1}
                            typeOld={'4'}

                        />
                        <Button
                            full
                            style={{ height: 40, borderRadius: 0, width: 'auto' }}
                            onPress={() => {
                                this.onSubmit();

                            }}
                        >
                            <Text caption1 bold>Beli - {this.state.total}</Text>

                        </Button>
                    </View>
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




