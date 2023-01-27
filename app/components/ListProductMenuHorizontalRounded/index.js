import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, AsyncStorage } from "react-native";
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
    DataMenu, DataMasterDiskon
} from "@data";
// import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";


const styles = StyleSheet.create({
    itemService: {
        alignItems: "center",
        //justifyContent: "center",
        flex: 1,
        //paddingTop: 10
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
});

import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-svg-uri';


export default function ListProductMenuHorizontal(props) {
    let { navigation, listCategory, listCategoryLoading } = props;
    const login = useSelector(state => state.application.loginStatus);
    var listCategoryComponent = [];
    if (listCategoryLoading == false) {
        listCategoryComponent = rebuild(listCategory);
    }
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);


    const [loading, setLoading] = useState(true);
    const [icons, setIcons] = useState(DataMenu);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleOffice, setModalVisibleOffice] = useState(false);
    const [productOffice, setProductOffice] = useState([{ "id": 1, "name": "Go Work", "icon": "https://cdn.masterdiskon.com/masterdiskon/vendor/2022/go-work.png" }, { "id": 2, "name": "Regus", "icon": "https://cdn.masterdiskon.com/masterdiskon/vendor/2022/regus.png" }, { "id": 3, "name": "Werkspace", "icon": "https://cdn.masterdiskon.com/masterdiskon/vendor/2022/werkspace.png" }]);

    const [productTag, setProductTag] = useState(rebuildTags([
        {
            "id_product_tag": 24,
            "code_product_category": "RUN",
            "name_product_tag": "Running",
            "slug_product_tag": "run",
            "id_product_category": 9
        },
        {
            "id_product_tag": 25,
            "code_product_category": "BCY",
            "name_product_tag": "Cycling",
            "slug_product_tag": "bicycle",
            "id_product_category": 9
        },
        {
            "id_product_tag": 26,
            "code_product_category": "GLF",
            "name_product_tag": "Golf",
            "slug_product_tag": "golf",
            "id_product_category": 9
        },
        {
            "id_product_tag": 27,
            "code_product_category": "BSK",
            "name_product_tag": "Basketball",
            "slug_product_tag": "basket",
            "id_product_category": 9
        },
        {
            "id_product_tag": 28,
            "code_product_category": "BDT",
            "name_product_tag": "Badminton",
            "slug_product_tag": "badminton",
            "id_product_category": 9
        },
        {
            "id_product_tag": 29,
            "code_product_category": "FTS",
            "name_product_tag": "Futsal",
            "slug_product_tag": "futsal",
            "id_product_category": 9
        }
    ]));



    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    useEffect(() => {
        getData();
    }, []);

    async function getOfficesList(id, name) {
        console.log('offciedetail', id, name);

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
                    setModalVisibleOffice(false);
                    console.log('listoffice', JSON.stringify(result.data))
                    navigation.navigate('ProductList', {
                        title: name,
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


    async function getOffice(paramCategory, title) {
        setModalVisibleOffice(true);



    }

    async function getTag(paramCategory, title) {
        try {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "product/tag?category=sports";
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
                    console.log('listTagLenght', JSON.stringify(result.data.length));
                    if (result.data.length != 0) {
                        navigation.navigate('ProductSport', {
                            title: title,
                            type: 'category',
                            paramPrice: '',
                            paramCategory: paramCategory,
                            paramCity: '',
                            paramTag: '',
                            paramOrder: '',

                        });


                    } else {
                        setModalVisible(true);

                        // setProductTag(rebuildTags(result.data));
                        // setTimeout(() => {
                        //     setModalVisible(true);
                        // }, 1000);


                    }

                    //                     setModalVisible(true);

                    //
                    //console.log('listTagrebuild', JSON.stringify(rebuildTags(result.data)));
                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                });
        } catch (error) {
            console.log(error);
        }

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

    function getData() {
        //let time = new Date().getMinutes()
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/category?status=1";
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
                //console.log('menusss', JSON.stringify(result));
                var category = result.data;
                var arrayoffice = {
                    id_product_category: 50,
                    icon_product_category: "https://cdn.masterdiskon.com/masterdiskon/icon/general/new/icon_masdis_hotels.png",
                    code_product_category: "OF",
                    name_product_category: "Offices",
                    slug_product_category: "offices",
                    status: 1,
                    pax_required: 0,
                    part: null,
                    sort: null,
                    tag: [

                    ]
                };
                category.push(arrayoffice);
                //console.log('categorylistrebuild', JSON.stringify(category));
                setIcons(category);
                setLoading(false);

            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                // console.log('errorss_configApiListMenu' + time, JSON.stringify(error));
            });


    }


    function filterValue(obj, key, value) {
        return obj.find(function (v) { return v[key] === value });
    }

    function rebuild(listdata) {
        var listdata_sort = [];
        filterValue(listdata, "slug_product_category", "hotels");

        listdata_sort.push(filterValue(listdata, "slug_product_category", "hotels"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "flight"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "tours"));
        // listdata_sort.push(filterValue(listdata, "slug_product_category", "travel-deals"));
        // listdata_sort.push(filterValue(listdata, "slug_product_category", "health-beauty"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "fandb"));
        // listdata_sort.push(filterValue(listdata, "slug_product_category", "gift-vouchers"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "entertainment"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "sports"));

        var listdata_new = [];
        var a = 1;
        listdata_sort.map(item => {
            var obj = {};

            obj['id_product_category'] = item.id_product_category;
            obj['icon_product_category'] = item.icon_product_category;
            obj['code_product_category'] = item.code_product_category;
            obj['name_product_category'] = item.name_product_category;
            obj['slug_product_category'] = item.slug_product_category;
            obj['status'] = item.status;
            obj['imgwhite'] = item.icon_product_category;
            //obj['imgwhite'] = 'https://masterdiskon.com/assets/icon/app_white/icon_masdis_' + item.slug_product_category + '.png';
            obj['img'] = 'https://masterdiskon.com/assets/icon/app/icon_masdis_' + item.slug_product_category + '.png';
            //obj['img'] = "@assets/images/icon_masdis_" + item.slug_product_category + ".png";
            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    return (
        <View>
            <FlatList
                data={icons}
                // style={{ marginVertical: 5 }}
                // horizontal={true}

                style={{ margin: 5 }}
                numColumns={4}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: "space-around"
                }}

                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (

                        loading == true ?
                            <View style={[styles.itemService]}>
                                <View style={[styles.iconContentColor, { backgroundColor: BaseColor.whiteColor }]}></View>
                            </View>
                            :

                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}
                                activeOpacity={0.9}
                                onPress={() => {
                                    var paramCategory = '&category=' + item.slug_product_category;
                                    var title = item.name_product_category;
                                    console.log('slugCategory', item.slug_product_category);
                                    if (item.slug_product_category == 'hotels') {
                                        navigation.navigate('Hotel');
                                    } else if (item.slug_product_category == 'flight') {
                                        navigation.navigate('Flight');
                                    } else if (item.slug_product_category == 'sports') {
                                        getTag(paramCategory, title);
                                    } else if (item.slug_product_category == 'offices') {
                                        getOffice(paramCategory, title);


                                    } else {
                                        navigation.navigate('ProductList', {
                                            title: title,
                                            type: 'category',
                                            paramPrice: '',
                                            paramCategory: paramCategory,
                                            paramCity: '',
                                            paramTag: '',
                                            paramOrder: '',

                                        });
                                        console.log('ProductListParam', {
                                            title: title,
                                            type: 'category',
                                            paramPrice: '',
                                            paramCategory: paramCategory,
                                            paramCity: '',
                                            paramTag: '',
                                            paramOrder: '',

                                        })

                                    }



                                }}
                            >

                                <LinearGradient
                                    style={{
                                        height: 60,
                                        width: 60,
                                        shadowColor: 'black',
                                        shadowOpacity: 0.2,
                                        shadowRadius: 30,
                                        shadowOffset: {
                                            height: 0,
                                            width: 2,
                                        },
                                        borderRadius: 80 / 2,
                                        elevation: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: BaseColor.primaryColor,
                                        borderWidth: 5,
                                        borderColor: BaseColor.whiteColor,


                                    }}


                                    colors={['#d8145e', '#d8145e', '#d8145e', '#d8145e', '#d8145e', '#d8145e']}
                                    //##f16489ee
                                    //#d8145e
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                                >

                                    <FastImage
                                        style={{
                                            width: 50,
                                            height: 50,
                                            justifyContent: "center",
                                            alignSelf: "center",

                                        }}
                                        tintColor="#ffffff"
                                        source={{
                                            uri: item.icon_product_category,
                                            headers: { Authorization: 'someAuthToken' },
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}

                                    >
                                    </FastImage>


                                </LinearGradient>
                                <Text
                                    bold
                                    style={{
                                        fontSize: 12,

                                        fontWeight: 'bold',
                                        marginTop: 5

                                    }}>
                                    {item.name_product_category}
                                </Text>



                            </TouchableOpacity>
                    );
                }}
            />

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                swipeDirection={["down"]}
                style={styles.bottomModal}

                animationType={"slide"}
                transparent={true}
            >
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white', height: 300, borderRadius: 20 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 20
                    }}>
                        <Text body2 bold>Sports</Text>
                        <FlatList style={{ margin: 5 }}
                            numColumns={3}
                            columnWrapperStyle={{
                                flex: 1,
                                justifyContent: "space-around"
                            }}

                            data={productTag}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => <TouchableOpacity

                                key={item.id}
                                style={{ marginBottom: 10 }}
                                onPress={() => {
                                    setModalVisible(false);
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
                                <View style={{ alignItems: 'center' }}><View
                                    style={{
                                        height: 80,
                                        width: 80,

                                        // shadowColor: 'black',
                                        // shadowOpacity: 0.2,
                                        // shadowRadius: 30,
                                        // shadowOffset: {
                                        //     height: 0,
                                        //     width: 2,
                                        // },
                                        borderRadius: 80 / 2,
                                        //elevation: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: BaseColor.primaryColor,
                                        borderWidth: 10,


                                    }}
                                >
                                    {/* <Text>{item.title}</Text> */}
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
                                    <Text style={{ color: 'black' }}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                            }


                        />
                    </View>
                </View>
            </Modal>

            <Modal
                isVisible={modalVisibleOffice}
                onBackdropPress={() => {
                    setModalVisibleOffice(false);
                }}
                onSwipeComplete={() => {
                    setModalVisibleOffice(false);
                }}
                swipeDirection={["down"]}
                style={styles.bottomModal}

                animationType={"slide"}
                transparent={true}
            >
                <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white', height: 200, borderRadius: 20 }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 20
                    }}>
                        <Text body2 bold>Offices</Text>
                        <FlatList style={{ margin: 5 }}
                            numColumns={3}
                            columnWrapperStyle={{
                                flex: 1,
                                justifyContent: "space-around"
                            }}

                            data={productOffice}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity

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

                                            borderRadius: 80 / 2,
                                            // elevation: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: BaseColor.whiteColor,
                                            borderWidth: 10,
                                            borderColor: BaseColor.primaryColor,
                                            marginHorizontal: 5

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
                </View>
            </Modal>
        </View>
    );


}


ListProductMenuHorizontal.propTypes = {
    //style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ListProductMenuHorizontal.defaultProps = {
    //style: {},

};
