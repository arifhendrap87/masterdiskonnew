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
    const [paramCatProductList, setParamCatProductList] = useState((navigation.state.params && navigation.state.params.paramCatProductList) ? navigation.state.params.paramCatProductList : 'general');




    useEffect(() => {

        console.log('paramCatProductList', JSON.stringify(paramCatProductList));
        var params = navigation.state.params;

        setTitle(params.title);
        setType(params.type);
        setParamPrice(params.paramPrice);
        setParamCategory(params.paramCategory);
        setParamCity(params.paramCity);
        setParamTag(params.paramTag);
        setParamOrder(params.paramOrder);
        setLoading(true);
        var paramUrl = paramLimit + paramCurrentPage + paramCategory + paramPrice + paramCity + paramTag + paramOrder;

        setParamCurrentPage('');

        if (paramCatProductList == 'general') {
            getData(paramUrl);

        } else {
            getDataOffice(paramTag);

        }
        getTag();


    }, [navigation]);

    async function getDataOffice(paramTag) {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "apitrav/product/offices/" + paramTag;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);
            console.log('urlProductList', url);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('resultproduk', JSON.stringify(result));

                    if (result.data != undefined) {
                        setProductMeta([]);
                        setProduct(rebuildOffice(result.data.items));
                        setProductOriginal(rebuildOffice(result.data.items));
                        setProductCity([]);
                        setLoading(false);

                    } else {
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
                    }


                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });
        } catch (error) {
            console.log(error);
        }

    }




    async function getData(paramUrl) {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "product?" + paramUrl;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);
            console.log('urlProductList', url);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('resultproduk', JSON.stringify(result));

                    if (result.data != undefined) {
                        setProductMeta(result.meta);
                        setLoading(false);

                        setProduct(rebuild(result.data));
                        setProductOriginal(rebuild(result.data));
                        setProductCity(rebuildCity(result.data));



                    } else {
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
                    }




                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });
        } catch (error) {
            console.log(error);
        }

    }

    async function getTag() {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "product/tag?" + paramCategory.replace('&', '');
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
                    console.log('listTag', JSON.stringify(result.data));
                    setProductTag(rebuildTags(result.data));
                    console.log('listTagrebuild', JSON.stringify(rebuildTags(result.data)));
                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });
        } catch (error) {
            console.log(error);
        }

    }

    function setPagination(currentPage) {
        console.log('setPagination', currentPage);
        if (currentPage <= productMeta.maxPage) {
            setCurrentPage(currentPage);
            var parCurrentPage = "&page=" + currentPage;
            var paramUrl = paramLimit + parCurrentPage + paramCategory + paramPrice + paramCity + paramTag + paramOrder;
            console.log('paramUrlsetPagination', paramUrl);
            getData(paramUrl);

        }

    }

    function filterProcess(filters) {
        console.log('filters', JSON.stringify(filters));
        var parCurrentPage = '&page=1';
        setLoading(true);
        setParamPrice(filters.paramPrice);
        setParamCity(filters.paramCity);
        setParamTag(filters.paramTag);
        setParamOrder(filters.paramOrder);
        setCurrentPage(1);
        var paramUrl = paramLimit + parCurrentPage + paramCategory + filters.paramPrice + filters.paramCity + filters.paramTag + filters.paramOrder;
        console.log('paramUrlfilterProcess', paramUrl);
        getData(paramUrl);
    }

    function sortProcess(selected) {

        console.log('sortProcess', selected);
        let parOrder = "";
        if (selected == 'low_price') {
            parOrder = "&order=price&order_type=ASC";
        } else if (selected == 'hight_price') {

            parOrder = "&order=price&order_type=DESC";
        }

        setParamOrder(parOrder);
        var paramUrl = paramLimit + paramCurrentPage + paramCategory + paramPrice + paramCity + paramTag + parOrder;
        console.log('paramUrlsortProcess', paramUrl);
        getData(paramUrl);



    }

    function onFilter() {
        navigation.navigate("ProductFilter",
            {
                listdata: productOriginal,
                filterProcess: filterProcess,
                productTag: productTag,
                productCity: productCity,
            }
        );
    }

    function onClear() {
        setLoading(true);
        setParamPrice('');
        setParamCity('');
        setParamTag('');
        setParamOrder('');
        setTimeout(() => {
            getData();
        }, 50);

    }

    function rebuildCity(listdata) {
        var listdata_new = [];

        listdata.map(item => {

            var obj = {};
            obj['id'] = item.city.id_city;
            obj['selected'] = false;
            obj['title'] = item.city.city_name;

            if (item.city.city_name != null) {
                listdata_new.push(obj);
            }


        });

        arr = listdata_new.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
            .filter(function (item, index, arr) { return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
            .reverse().map(JSON.parse) // revert it to original state
        return arr;
    }



    function rebuildTags(tags) {
        var tags_new = [];
        tags.map(item => {
            var obj = {};
            obj['id'] = item.slug_product_tag;
            obj['selected'] = false;
            obj['title'] = item.name_product_tag;

            tags_new.push(obj);
        });


        return tags_new;
    }


    function rebuildOffice(listdata) {

        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;
            obj['filter_price'] = "";
            obj['filter_city'] = "";
            obj['id_product'] = "";
            obj['product_code'] = item.name;
            obj['product_name'] = item.name;
            obj['slug_product'] = item.name;
            obj['type'] = "";
            obj['address'] = item.address;
            obj['time'] = "";
            obj['description'] = item.address;
            obj['include'] = "";
            obj['term'] = "";
            obj['how_to_redeem'] = "";
            obj['cancelation_policy'] = "";
            obj['reservation_required'] = "";
            obj['start_date'] = "";
            // obj['end_date'] = item.end_date;
            // obj['valid_start'] = item.valid_start;
            // obj['valid_end'] = item.valid_end;
            obj['start_price'] = item.price;
            obj['img_featured'] = item.image;
            obj['tag'] = item.name;
            //obj['status'] = item.status;
            //obj['img_featured_url'] = getRandomItem(array);
            obj['img_featured_url'] = item.image;
            obj['product_detail'] = [
                {
                    normal_price: item.price + 50000,
                    price: item.price,
                    discount: parseFloat(item.price / (item.price + 50000)).toFixed(2)
                }
            ];
            obj['product_img'] = item.image;
            obj['product_category'] = {
                name_product_category: ""
            };
            //obj['vendor'] = item.vendor;
            //obj['partner'] = item.partner;
            //obj['country'] = item.country;
            //obj['province'] = item.province;
            //obj['city'] = item.city;
            //obj['location'] = item.location;

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }


    function rebuild(listdata) {
        const array = [
            'https://fave-production-main.myfave.gdn/attachments/b830f5d667f72a999671580eb58683af908d4486/store/fill/400/250/5b225df71f4f5fcd71a24bb5e7f7eb44026fa4b98005d45a979853b812c3/activity_image.jpg',
            'https://fave-production-main.myfave.gdn/attachments/240be21ccb5ad99e3afb0f591a4c65273b0f8c16/store/fill/800/500/bd1160e0f91e468af35f6186d6fd7374868f62b1534ee5db6432399b5f48/activity_image.jpg',
            'https://fave-production-main.myfave.gdn/attachments/ffd7160ebf8ff67cc63e22016f82803a85714754/store/fill/400/250/975eec09dd53b92faca441aa40b75a6843a0628d30a966375404f1730f0b/activity_image.jpg'
        ];

        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;
            obj['filter_price'] = item.start_price;
            obj['filter_city'] = item.location;
            obj['id_product'] = item.id_product;
            obj['product_code'] = item.product_code;
            obj['product_name'] = item.product_name;
            obj['slug_product'] = item.slug_product;
            obj['type'] = item.type;
            obj['address'] = item.address;
            obj['time'] = item.time;
            obj['description'] = item.description;
            obj['include'] = item.include;
            obj['term'] = item.term;
            obj['how_to_redeem'] = item.how_to_redeem;
            obj['cancelation_policy'] = item.cancelation_policy;
            obj['reservation_required'] = item.reservation_required;
            obj['start_date'] = item.start_date;
            obj['end_date'] = item.end_date;
            obj['valid_start'] = item.valid_start;
            obj['valid_end'] = item.valid_end;
            obj['start_price'] = item.start_price;
            obj['img_featured'] = item.img_featured;
            obj['tag'] = item.tag;
            obj['status'] = item.status;
            //obj['img_featured_url'] = getRandomItem(array);
            obj['img_featured_url'] = item.img_featured_url;
            obj['product_detail'] = item.product_detail;
            obj['product_img'] = item.product_img;
            obj['product_category'] = item.product_category;
            obj['vendor'] = item.vendor;
            obj['partner'] = item.partner;
            obj['country'] = item.country;
            obj['province'] = item.province;
            obj['city'] = item.city;
            obj['location'] = item.location;

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    function getRandomItem(arr) {
        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];
        return item;
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
                        // }


                        // scrollEventThrottle={8}
                        style={[styles.scrollView, { flex: 0.8 }]}
                    //contentContainerStyle={styles.contentContainer}
                    >

                        {
                            product.length != 0 ?
                                <View style={styles.cardGroup}>
                                    <FlatList
                                        style={{ marginHorizontal: 20, paddingBottom: 30 }}
                                        data={product}
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
                                        renderItem={({ item, index }) => (

                                            <CardCustom
                                                propImage={{ height: wp("30%"), url: item.img_featured_url != "" ? item.img_featured_url : 'https://masterdiskon.com/assets/images/image-not-found.png' }}
                                                propTitle={{ text: item.product_name }}
                                                propPrice={""}
                                                propInframe={{
                                                    top: "",
                                                    topTitle: '',
                                                    topHighlight: false,
                                                    topIcon: '',
                                                    bottom: '',
                                                    bottomTitle: ''
                                                }}
                                                propReview={item.reviewScore}
                                                propIsPromo={true}
                                                propDesc={{ text: '' }}
                                                propType={''}
                                                propTypeProduct={'general'}
                                                propStar={{ rating: '', enabled: true }}
                                                onPress={() => {
                                                    var paramNav = {
                                                        param: { slug: item.slug_product, product_type: paramCatProductList, product_detail: paramCatProductList != 'general' ? item : {} },
                                                        product_type: paramCatProductList
                                                    }
                                                    navigation.navigate("ProductDetailNew",
                                                        paramNav
                                                    );
                                                }

                                                }
                                                loading={loading}
                                                propOther={{ inFrame: true, horizontal: false, width: '100%' }}
                                                propIsCampaign={false}
                                                propPoint={0}

                                                propDesc1={item?.vendor?.display_name}
                                                propDesc2={''}
                                                propDesc3={''}
                                                propLeftRight={{ left: "asd", right: "asd" }}
                                                propLeftRight2={{ left: "dss", right: "sdsd" }}
                                                propLeftRight3={{ left: "asdasd", right: "asdas" }}
                                                propLeftRight4={{ left: "", right: "" }}
                                                propTopDown={{ top: "Vendor", down: "asd" }}
                                                propTopDown2={{ top: "", down: "" }}
                                                propTopDown3={{ top: "", down: "" }}
                                                propTopDown4={{ top: "", down: "" }}
                                                propHightLight={""}
                                                propPriceCoret={{
                                                    price: item?.product_detail[0]?.normal_price,
                                                    priceDisc: item?.product_detail[0]?.price,
                                                    discount: 10,
                                                    discountView: true,
                                                }}
                                                propFacilities={[]}
                                                propAmenities={[["swimming", "smoke"]]}
                                                style={[{ marginBottom: 0 }]}
                                                sideway={true}
                                            />
                                        )}


                                    />
                                </View>
                                :
                                <DataEmpty />
                        }


                    </ScrollView>
                    <FilterSortHotelLinxBottom
                        onFilter={onFilter}
                        onClear={onClear}
                        sortProcess={sortProcess}
                        banyakData={productMeta.total}
                        banyakPage={productMeta.maxPage}
                        setPagination={setPagination}
                        value={currentPage}
                        valueMin={1}
                        valueMax={currentPage <= productMeta.maxPage ? false : true}

                        style={
                            [{ marginHorizontal: 15, flex: 0.05 }]
                        }
                    />
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
});
