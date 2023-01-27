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


export default function Promo(props) {
    let { navigation, listCategory, listCategoryLoading } = props;
    //console.log('listCategoryComponentOri', JSON.stringify(listCategory));
    // console.log('listCategoryLoadingComponentd', listCategoryLoading);
    const login = useSelector(state => state.application.loginStatus);
    var listCategoryComponent = [];
    if (listCategoryLoading == false) {
        listCategoryComponent = rebuild(listCategory);
    }
    //console.log('listCategoryComponentNew', JSON.stringify(listCategoryComponent));
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);

    // console.log('loginPromo', login);
    // console.log('userSessionPromo', JSON.stringify(userSession));
    // console.log('configApiPromo', JSON.stringify(configApi));

    const [loading, setLoading] = useState(true);
    const [icons, setIcons] = useState(DataMenu);
    //const [icons, setIcons] = useState(rebuild(listCategory));

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    useEffect(() => {

        getData();
        // Runs after EVERY rendering
    }, []);

    function getData() {
        let time = new Date().getMinutes()
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/category";
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
                var category = rebuild(result.data);
                console.log('categorylist', JSON.stringify(category));
                //setIcons(result.data);
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
        listdata_sort.push(filterValue(listdata, "slug_product_category", "travel-deals"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "health-beauty"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "fandb"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "gift-vouchers"));
        listdata_sort.push(filterValue(listdata, "slug_product_category", "entertainment"));

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
            obj['img'] = 'https://masterdiskon.com/assets/icon/app/icon_masdis_' + item.slug_product_category + '.png';
            //obj['img'] = "@assets/images/icon_masdis_" + item.slug_product_category + ".png";
            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    return (
        <FlatList
            data={icons}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                return (

                    loading == true ?
                        <View style={[styles.itemService]}>
                            <View style={[styles.iconContentColor, { backgroundColor: BaseColor.whiteColor }]}></View>
                        </View>
                        :

                        <TouchableOpacity
                            style={styles.itemService}
                            activeOpacity={0.9}
                            onPress={() => {
                                var paramCategory = '&category=' + item.slug_product_category;
                                var title = item.name_product_category;
                                console.log('slugCategory', item.slug_product_category);
                                if (item.slug_product_category == 'hotels') {
                                    navigation.navigate('Hotel');
                                } else if (item.slug_product_category == 'flight') {
                                    navigation.navigate('Flight');
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

                                }



                            }}
                        >
                            <View>
                                <View style={styles.iconContentColor}>
                                    {/* <Icon
                                    name={item.icon}
                                    size={24}
                                    color={BaseColor.whiteColor}
                                    solid
                                /> */}
                                    {/* <SvgUri
                                        width="50"
                                        height="50"
                                        style={{ justifyContent: "center", alignSelf: "center" }}
                                        //source={{uri:DataMasterDiskon[0].baseUrl+'assets/icon/original/product/'+item.icon_product_category}}
                                        source={{ uri: item.icon_product_category }}
                                    //source={{ uri: 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg' }}
                                    /> */}

                                    <FastImage
                                        style={{
                                            width: 50, height: 50,
                                            justifyContent: "center",
                                            alignSelf: "center"
                                        }}
                                        //source={this.state.img}
                                        //source={require("@assets/images/icon_masdis_" + item.slug_product_category + ".png")}
                                        source={{
                                            uri: item.img,
                                            headers: { Authorization: 'someAuthToken' },
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                    // onLoad={evt =>{
                                    //     this.setState({img:{
                                    //     uri:propImage.url,
                                    //     headers:{ Authorization: 'someAuthToken' },
                                    //     priority: FastImage.priority.normal,
                                    //     }


                                    //     })
                                    // }
                                    // }
                                    >
                                    </FastImage>
                                </View>
                                <Text overline style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    width: 50
                                }}>
                                    {item.name_product_category}
                                </Text>
                            </View>

                        </TouchableOpacity>
                );
            }}
        />
    );


}


Promo.propTypes = {
    //style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Promo.defaultProps = {
    //style: {},

};