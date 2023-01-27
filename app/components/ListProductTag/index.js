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

import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-svg-uri';
import { useSelector, useDispatch } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';


const styles = StyleSheet.create({
    itemService: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
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
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default function ListProductTag(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [loading, setLoading] = useState(true);
    const [icons, setIcons] = useState(DataMenu);
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    useEffect(() => {
        //console.log('ListproductTag');
        getData();


    }, []);

    async function getData() {
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product/tag";
        //console.log('configApiListProduk', JSON.stringify(config));
        //console.log('urlssgetdataListProduk', url);
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
                //console.log('getdataListProduk', JSON.stringify(result));
                setIcons(result.data);
                setLoading(false);

            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                //console.log('error', JSON.stringify(error));
            });


    }

    function convertArrayTag(arrayTag) {
        var str = "";
        for (a = 0; a < arrayTag.length; a++) {
            str += "&tag[]=" + arrayTag[a];
        }
        return str;

    }

    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            data={icons}

            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => {
                return (
                    loading == true ?
                        <View
                            style={[
                                index == 0
                                    ? { marginLeft: 20, marginRight: 10 }
                                    : { marginRight: 10 }
                                , {
                                    width: 100,
                                    height: 20,
                                    backgroundColor: BaseColor.dividerColor,
                                    paddingHorizontal: 5,
                                    paddingVertical: 5,
                                    borderRadius: 5
                                }
                            ]}
                        >

                        </View>
                        :

                        <TouchableOpacity
                            style={[
                                index == 0
                                    ? { marginLeft: 20, marginRight: 10 }
                                    : { marginRight: 10 }
                            ]}
                            activeOpacity={0.9}
                            onPress={() => {

                                var tag = [];
                                tag.push(item.slug_product_tag);
                                var tagStr = convertArrayTag(tag);
                                //console.log(tagStr);


                                navigation.navigate('ProductList', { type: 'tag', slug: tagStr, title: item.name_product_tag });
                            }}
                        >
                            <View style={{ backgroundColor: BaseColor.primaryColor, paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }}>
                                <Text overline whiteColor style={{ textAlign: "center" }}>
                                    {item.name_product_tag}
                                </Text>
                            </View>
                        </TouchableOpacity>
                );
            }}
        />
    );


}


ListProductTag.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ListProductTag.defaultProps = {
    style: {},

};
