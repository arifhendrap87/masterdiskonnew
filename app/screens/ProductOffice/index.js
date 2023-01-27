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
import FilterSortHotelLinxBottom from "../../components/FilterSortHotelLinxBottom";
import DataEmpty from "../../components/DataEmpty";

import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    StarRating,
    Tag,
    FilterSort
} from "@components";
import * as Utils from "@utils";
import FilterSortProduct from "../../components/FilterSortProduct";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import FastImage from 'react-native-fast-image';
import BlogListSport from "../../components/BlogListSport";






import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


// Load sample data


import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataIcon,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBlog, DataMenu, DataCard, DataPromo
} from "@data";
import { set } from "react-native-reanimated";


const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;
import { useSelector, useDispatch } from 'react-redux';


export default function ProductList({ navigation }) {



    //let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [product, setProduct] = useState(DataCard);
    const [productOriginal, setProductOriginal] = useState(DataCard);
    const [productTag, setProductTag] = useState([]);
    const [productCity, setProductCity] = useState([]);
    const [productMeta, setProductMeta] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState((navigation.state.params && navigation.state.params.title) ? navigation.state.params.title : "");
    console.log('titlesxx', title);
    const [type, setType] = useState((navigation.state.params && navigation.state.params.type) ? navigation.state.params.type : 'category');
    const [currentPage, setCurrentPage] = useState(1);
    const [paramLimit, setParamLimit] = useState((navigation.state.params && navigation.state.params.paramLimit) ? navigation.state.params.paramLimit : 'limit=10');
    const [paramCurrentPage, setParamCurrentPage] = useState((navigation.state.params && navigation.state.params.paramCurrentPage) ? navigation.state.params.paramCurrentPage : "&page=" + currentPage);
    const [paramCategory, setParamCategory] = useState((navigation.state.params && navigation.state.params.paramCategory) ? navigation.state.params.paramCategory : '');
    const [paramPrice, setParamPrice] = useState((navigation.state.params && navigation.state.params.paramPrice) ? navigation.state.params.paramPrice : "");
    const [paramCity, setParamCity] = useState((navigation.state.params && navigation.state.params.paramCity) ? navigation.state.params.paramCity : "");
    const [paramTag, setParamTag] = useState((navigation.state.params && navigation.state.params.paramTag) ? navigation.state.params.paramTag : "");
    const [paramOrder, setParamOrder] = useState((navigation.state.params && navigation.state.params.paramOrder) ? navigation.state.params.paramOrder : "&order=price&order_type=ASC");


    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    const [paramPage, setParamPage] = useState(1);





    useEffect(() => {

        var params = navigation.state.params;
        console.log('logparam', JSON.stringify(params));

        getProduct();

    }, []);

    async function getProduct() {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "apitrav/product/offices";
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);
            //console.log('urlProductList', url);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('resultprodukOffice', JSON.stringify(result.data));
                    setProduct(result.data);
                    setLoading(false);

                })
                .catch(error => {
                    setProductMeta(
                        {
                            limit: 0,
                            page: 0,
                            total: 0,
                            maxPage: 0
                        }
                    );
                    setProduct([]);
                    setProductOriginal([]);
                    setProductCity([]);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }

    }


    async function getOfficesList(id, name) {

        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "apitrav/product/offices/" + id;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);
            //console.log('urlProductList', url);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('listoffice', JSON.stringify(result.data))
                    // var paramTag = '&tag[]=' + item.id;
                    // var title = item.title;
                    navigation.navigate('ProductList', {
                        title: title + ' ' + name,
                        type: 'category',
                        paramPrice: '',
                        paramCategory: '',
                        paramCity: '',
                        paramTag: id,
                        paramOrder: '',
                        paramCatProductList: 'offices'

                    });

                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });
        } catch (error) {
            console.log(error);
        }





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
            </View>
            :
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}

            >
                <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <Header
                    title={title}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="search"
                    //             size={20}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>



                    <ScrollView
                        style={[styles.scrollView, { flex: 0.8 }]}
                    >
                        {
                            product.length != 0 ?
                                <View>
                                    <View style={{ flex: 1, marginBottom: 20 }}>
                                        <FastImage
                                            style={{ width: '100%', height: 200 }}
                                            source={{
                                                uri: 'https://cdn.masterdiskon.com/masterdiskon/product/space/office-illustration-min.png',
                                                headers: { Authorization: 'someAuthToken' },
                                                priority: FastImage.priority.normal,
                                            }}
                                            resizeMode={FastImage.resizeMode.stretch}
                                            cacheControl={FastImage.cacheControl.immutable}

                                        >
                                        </FastImage>

                                    </View>

                                    <FlatList style={{ margin: 5 }}

                                        // style={{ marginHorizontal: 20 }}
                                        // data={offices}
                                        // showsHorizontalScrollIndicator={false}
                                        // keyExtractor={(item, index) => item.id}
                                        // getItemLayout={(item, index) => (
                                        //     { length: 70, offset: 70 * index, index }
                                        // )}
                                        // removeClippedSubviews={true} // Unmount components when outside of window 
                                        // initialNumToRender={2} // Reduce initial render amount
                                        // maxToRenderPerBatch={1} // Reduce number in each render batch
                                        // maxToRenderPerBatch={100} // Increase time between renders
                                        // windowSize={7} // Reduce the window size
                                        // keyExtractor={(item, index) => item.id}

                                        numColumns={3}                  // set number of columns 
                                        columnWrapperStyle={{
                                            flex: 1,
                                            justifyContent: "space-around"
                                        }}  // space them out evenly

                                        data={product}
                                        keyExtractor={(item, index) => item.id}


                                        renderItem={({ item, index }) => <TouchableOpacity

                                            key={item.id}
                                            style={{ marginBottom: 10 }}
                                            onPress={() => {

                                                getOfficesList(item.id, item.name)



                                            }}
                                        >

                                            <View style={{ alignItems: 'center' }}><View
                                                style={{
                                                    height: 80,
                                                    width: 80,

                                                    shadowColor: 'black',
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 30,
                                                    shadowOffset: {
                                                        height: 0,
                                                        width: 2,
                                                    },
                                                    borderRadius: 80 / 2,
                                                    elevation: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: BaseColor.whiteColor,
                                                    borderWidth: 10,
                                                    borderColor: BaseColor.whiteColor,

                                                }}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: 30, height: 30,
                                                        justifyContent: "center",
                                                        alignSelf: "center"
                                                    }}
                                                    source={{
                                                        uri: item.icon,
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                                    resizeMethod={'scale'}

                                                >
                                                </FastImage>
                                            </View>
                                                <Text>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        }


                                    />
                                </View>
                                :
                                <DataEmpty />
                        }




                    </ScrollView>


                </View>
            </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    cardGroup: {
        //marginTop:20,
        width: '100%',
        //backgroundColor: BaseColor.whiteColor,
        paddingBottom: 20
    },
    cardGroupTransparent: {
        marginTop: 20,
        width: '100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom: 20
    },
    cardGroup: {
        marginTop: 20,
        width: '100%',
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 20
    },
});
