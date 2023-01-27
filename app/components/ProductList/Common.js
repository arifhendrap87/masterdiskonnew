import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, AsyncStorage, Dimensions } from "react-native";
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
    DataMenu, DataMasterDiskon, DataCard
} from "@data";

import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-svg-uri';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;
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
    cardGroup: {
        marginTop: 10,
        width: '100%',
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 10
    },
    cardGroupTransparent: {
        marginTop: 10,
        width: '100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom: 10
    },
});
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default function Common(props) {
    let { navigation } = props;
    const { title, slug } = props;
    //console.log('titleCommon', title);
    //console.log('slugCommon', slug);

    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [dataCard, setDataCard] = useState(DataCard);
    const [loading, setLoading] = useState(true);
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    useEffect(() => {
        getData();
    }, []);

    // useEffect(() => {
    //     getData();
    // });

    function getData() {
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "product?limit=4&tag=&category=" + slug;
        console.log('url', url);
        console.log('configApi', JSON.stringify(configApi));

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
                console.log('resultgetData', JSON.stringify(result));

                const array = [
                    'https://fave-production-main.myfave.gdn/attachments/b830f5d667f72a999671580eb58683af908d4486/store/fill/400/250/5b225df71f4f5fcd71a24bb5e7f7eb44026fa4b98005d45a979853b812c3/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/240be21ccb5ad99e3afb0f591a4c65273b0f8c16/store/fill/800/500/bd1160e0f91e468af35f6186d6fd7374868f62b1534ee5db6432399b5f48/activity_image.jpg',
                    'https://fave-production-main.myfave.gdn/attachments/ffd7160ebf8ff67cc63e22016f82803a85714754/store/fill/400/250/975eec09dd53b92faca441aa40b75a6843a0628d30a966375404f1730f0b/activity_image.jpg'
                ];



                const newProjects = result.data.map(p =>
                    p.status === 1
                        ? {
                            ...p,
                            img_featured_url: getRandomItem(array),
                        }
                        : p
                );
                setDataCard(newProjects);
                setLoading(false);
            })
            .catch(error => {
                console.log('error', JSON.stringify(error));
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
            });



    }

    function getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    return (

        dataCard.length != 0 ?
            <View style={styles.cardGroup}>
                <CardCustomTitle
                    style={{ marginLeft: 20 }}
                    title={title}
                    desc={''}
                    more={true}
                    onPress={() => {
                        var paramCategory = '&category=' + slug;
                        navigation.navigate('ProductList', { type: 'category', slug: slug, title: title, paramCategory: paramCategory });
                    }
                    }
                />
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}

                    data={dataCard}
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
                            propImage={{ height: wp("30%"), url: item.img_featured_url }}
                            propTitle={{ text: item.product_name }}
                            propDesc={{ text: '' }}
                            propPrice={{ price: 'empty', startFrom: false }}
                            propPriceCoret={{ price: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0, priceDisc: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0, discount: 0, discountView: false }}
                            propInframe={{ top: item.product_detail.length != 0 ? item.product_detail[0].discount + '%' : 0, topTitle: '', topHighlight: true, topIcon: '', bottom: '', bottomTitle: '' }}

                            propTitle={{ text: item.product_name }}
                            propDesc={{ text: (item.vendor == false || item.vendor === null || item.vendor === undefined) ? '' : item.vendor.display_name }}
                            propStar={{ rating: '', enabled: false }}
                            propLeftRight={{ left: '', right: '' }}
                            onPress={() => {
                                navigation.navigate("ProductDetailNew", { slug: item.slug_product, product_type: 'general' })
                            }
                            }
                            loading={loading}
                            propOther={{ inFrame: true, width: (width - 40) / 2, height: height / 9, inCard: true }}
                            propIsCampaign={item.product_is_campaign}
                            propPoint={0}

                            style={[
                                index == 0
                                    ? { marginLeft: 20, marginRight: 10 }
                                    : { marginRight: 10 }
                            ]}
                        />
                    )}
                />
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={2000} />

            </View>
            :
            <View></View>

    );
}


Common.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    slug: PropTypes.string,
};

Common.defaultProps = {
    style: {},
    title: '',
    slug: '',

};
