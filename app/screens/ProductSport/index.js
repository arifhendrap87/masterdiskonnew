import React, { Component, useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from "react-native";
import DataEmpty from "../../components/DataEmpty";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
} from "@components";
import * as Utils from "@utils";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import FastImage from 'react-native-fast-image';
import BlogListSport from "../../components/BlogListSport";
import {
    DataCard
} from "@data";

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;
import { useSelector, useDispatch } from 'react-redux';
export default function ProductList({ navigation }) {
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
    const [type, setType] = useState((navigation.state.params && navigation.state.params.type) ? navigation.state.params.type : 'category');
    const [currentPage, setCurrentPage] = useState(1);
    const [paramLimit, setParamLimit] = useState((navigation.state.params && navigation.state.params.paramLimit) ? navigation.state.params.paramLimit : 'limit=10');
    const [paramCurrentPage, setParamCurrentPage] = useState((navigation.state.params && navigation.state.params.paramCurrentPage) ? navigation.state.params.paramCurrentPage : "&page=" + currentPage);
    const [paramCategory, setParamCategory] = useState((navigation.state.params && navigation.state.params.paramCategory) ? navigation.state.params.paramCategory : '');
    const [paramPrice, setParamPrice] = useState((navigation.state.params && navigation.state.params.paramPrice) ? navigation.state.params.paramPrice : "");
    const [paramCity, setParamCity] = useState((navigation.state.params && navigation.state.params.paramCity) ? navigation.state.params.paramCity : "");
    const [paramTag, setParamTag] = useState((navigation.state.params && navigation.state.params.paramTag) ? navigation.state.params.paramTag : "");
    const [paramOrder, setParamOrder] = useState((navigation.state.params && navigation.state.params.paramOrder) ? navigation.state.params.paramOrder : "&order=price&order_type=ASC");



    useEffect(() => {
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
        getData(paramUrl);
        getTag();


    }, []);

    async function getData(paramUrl) {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "product?" + paramUrl;
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
                    console.log('resultproduk', JSON.stringify(result));

                    if (result.data != undefined) {
                        setProductMeta(result.meta);
                        setProduct(rebuild(result.data));
                        console.log('rebuidsss', JSON.stringify(rebuild(result.data)));
                        setProductOriginal(rebuild(result.data));
                        setProductCity(rebuildCity(result.data));
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
        //console.log('tags', JSON.stringify(tags));
        var tags_new = [];
        tags.map(item => {
            var obj = {};
            obj['id'] = item.slug_product_tag;
            obj['selected'] = false;
            obj['title'] = item.name_product_tag;
            if (item.slug_product_tag == 'run') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/running-white.png';
            } else if (item.slug_product_tag == 'bicycle') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/bicycle.png';
            } else if (item.slug_product_tag == 'golf') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/golf.png';

            } else if (item.slug_product_tag == 'basket') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/basketball.png';

            } else if (item.slug_product_tag == 'badminton') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/badminton.png';

            } else if (item.slug_product_tag == 'futsal') {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/soccer-player.png';


            } else {
                obj['img'] = 'https://cdn.masterdiskon.com/masterdiskon/icon/fe/soccer-player.png';

            }
            tags_new.push(obj);
        });
        return tags_new;
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


    function renderNewProduct(item, index) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                propImage={{ height: hp("25%"), url: item.img_featured_url }}
                propInframe={{ top: 'Rp ' + priceSplitter(item.start_price), topTitle: 'Mulai dari', topHighlight: false, topIcon: '', bottom: item.product_name, bottomTitle: '' }}
                propTitle={{ text: '' }}
                propDesc={{ text: '' }}
                propPrice={{ price: 'empty', startFrom: false }}
                propPriceCoret={{ price: '', discount: priceSplitter(item.product_discount), discountView: false }}

                propStar={{ rating: 10, enabled: false }}
                propLeftRight={{ left: '', right: '' }}
                onPress={() => {

                    navigation.navigate("ProductDetailNew",
                        {
                            param: { slug: item.slug_product, product_type: 'general' },
                            product_type: 'general'
                        }
                    )
                }

                }
                loading={loading}
                propOther={{ inFrame: true, horizontal: true, width: wp("40%") }}
                propIsCampaign={item.product_is_campaign}
                propPoint={item.product_point}
                style={[
                    index == 0
                        ? { marginLeft: 10, marginRight: 0 }
                        : { marginRight: 0 }
                ]}
            />
        );

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
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
                    <ScrollView
                        style={[styles.scrollView, { flex: 0.8 }]}
                    >
                        <View style={{ marginVertical: 10 }} />
                        {
                            product.length != 0 ?
                                <View>
                                    <FlatList
                                        style={{ margin: 5 }}
                                        numColumns={3}
                                        columnWrapperStyle={{
                                            flex: 1,
                                            justifyContent: "space-around"
                                        }}

                                        data={productTag}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) =>
                                            <TouchableOpacity

                                                key={item.id}
                                                style={{ marginBottom: 10 }}
                                                onPress={() => {
                                                    var paramTag = '&tag[]=' + item.id;
                                                    var title = item.title;
                                                    navigation.navigate('ProductList', {
                                                        title: title,
                                                        type: 'category',
                                                        paramPrice: '',
                                                        paramCategory: '',
                                                        paramCity: '',
                                                        paramTag: paramTag,
                                                        paramOrder: '',

                                                    });

                                                }}
                                            >
                                                <View style={{ alignItems: 'center' }}>
                                                    <View
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
                                                            backgroundColor: BaseColor.primaryColor,
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
                                                                uri: item.img,
                                                                headers: { Authorization: 'someAuthToken' },
                                                                priority: FastImage.priority.normal,
                                                            }}
                                                            resizeMode={FastImage.resizeMode.stretch}
                                                            cacheControl={FastImage.cacheControl.cacheOnly}
                                                            resizeMethod={'scale'}

                                                        >
                                                        </FastImage>
                                                    </View>
                                                    <Text>{item.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }


                                    />
                                    <View style={styles.cardGroup}>
                                        <CardCustomTitle
                                            style={{ marginLeft: 20 }}
                                            title={'Produk Baru'}
                                            desc={''}
                                            more={false}
                                            onPress={() =>
                                                navigation.navigate("Activities")
                                            }
                                        />
                                        <FlatList
                                            contentContainerStyle={{
                                                paddingRight: 20
                                            }}
                                            horizontal={true}
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
                                            renderItem={({ item, index }) => renderNewProduct(item, index)}


                                        />
                                    </View>
                                    <View style={styles.cardGroup}>
                                        <CardCustomTitle
                                            style={{ marginLeft: 20 }}
                                            title={'Sport Events'}
                                            desc={''}
                                            more={false}
                                            onPress={() =>
                                                navigation.navigate("Activities")
                                            }
                                        />
                                        <View style={{ marginHorizontal: 20 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var param = {
                                                        url: 'https://masterdiskon.com/schedule/event/run',
                                                        title: 'Sport Events',
                                                        subTitle: ''
                                                    }
                                                    navigation.navigate("WebViewPage", { param: param })
                                                }}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: '100%', height: Dimensions.get('window').height / 5,
                                                        justifyContent: "center",
                                                        alignSelf: "center"
                                                    }}
                                                    source={{
                                                        uri: 'https://cdn.masterdiskon.com/masterdiskon/product/sports/jadwal-acaraa.png',
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                                    resizeMethod={'scale'}

                                                >
                                                </FastImage>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={styles.cardGroup}>
                                        <CardCustomTitle
                                            style={{ marginLeft: 20 }}
                                            title={'Sewa Lapangan'}
                                            desc={''}
                                            more={false}
                                            onPress={() =>
                                                navigation.navigate("Activities")
                                            }
                                        />
                                        <View style={{ marginHorizontal: 20 }}>
                                            <TouchableOpacity
                                                // onPress={() => {
                                                //     navigation.navigate('ProductSportEvent');
                                                // }}
                                                onPress={() => {
                                                    var param = {
                                                        url: 'https://masterdiskon.com/sewa/arena/golf',
                                                        title: 'Sewa Lapangan',
                                                        subTitle: ''
                                                    }
                                                    navigation.navigate("WebViewPage", { param: param })
                                                }}
                                            >
                                                <FastImage
                                                    style={{
                                                        width: '100%', height: Dimensions.get('window').height / 5,
                                                        justifyContent: "center",
                                                        alignSelf: "center"
                                                    }}
                                                    source={{
                                                        uri: 'https://cdn.masterdiskon.com/masterdiskon/product/sports/sewa_arena.png',
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                                    resizeMethod={'scale'}

                                                >
                                                </FastImage>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <BlogListSport navigation={navigation} slug={'entertainment'} title={'BlogList'} />

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
