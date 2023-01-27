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



export default class Bid extends Component {
    constructor(props) {
        super(props);
        var data = props.data;
        this.state = {
            img_featured: Images.doodle,
            expanded: false,
            item: data,
            loadingProduct: true,
            product: []
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    componentDidMount() {
        AsyncStorage.getItem('configApi', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                var url = config.apiBaseUrl + "product?id_vendor=68&page=2&status=1";
                console.log('urlgetData', url);


                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + config.apiToken + "; refresh_token=undefined");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({ loadingProduct: false });
                        var product = this.rebuild(result.data);
                        this.setState({ product: product });
                        console.log('resultss', JSON.stringify(product));
                    })
                    .catch(error => {

                    });
            }
        });

    }


    rebuild(listdata) {
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
            obj['img_featured_url'] = this.getRandomItem(array);
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
        //console.log('rebuildsss', JSON.stringify(listdata));
        //console.log('listdata_new', JSON.stringify(listdata_new));

        return listdata_new;
    }
    getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }

    render() {
        const { navigation, data } = this.props;

        return (
            <View style={{ backgroundColor: BaseColor.whiteColor, marginTop: 10, flex: 1 }}>
                <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.toggleExpand()
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text body2 bold>Penawaran</Text>
                            <Icon
                                name={this.state.expanded ? 'chevron-up' : 'chevron-down'}
                                color={BaseColor.dividedColor}
                                size={14}
                            />
                        </View>
                    </TouchableOpacity>


                </View>

                {
                    this.state.expanded &&
                    <View
                        style={{
                            borderBottomColor: BaseColor.dividerColor,
                            borderBottomWidth: 0.5,
                        }}
                    />
                }

                {
                    this.state.expanded &&
                    <View>
                        {
                            this.state.loadingProduct == true ?
                                <ActivityIndicator size="large" color="#00ff00" />
                                :
                                <FlatList
                                    //    horizontal={true}
                                    //    showsHorizontalScrollIndicator={false}
                                    style={{ marginHorizontal: 20 }}
                                    data={this.state.product}
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
                                        <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
                                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                                <View style={{ flex: 3 }}>
                                                    <FastImage
                                                        style={{
                                                            width: 80,
                                                            height: 'auto',
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                        source={this.state.img_featured}
                                                        resizeMode={FastImage.resizeMode.stretch}
                                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                                        resizeMethod={'scale'}
                                                        onLoad={evt => {
                                                            this.setState({
                                                                img_featured: {
                                                                    uri: item.img_featured_url,
                                                                    headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }


                                                            })
                                                        }
                                                        }

                                                    >
                                                    </FastImage>

                                                </View>
                                                <View style={{ flex: 9, flexDirection: 'column' }}>
                                                    <Text body2 bold>{item.product_name}</Text>
                                                    <Text captio1>Melayani pangkas rambut </Text>
                                                    <Text captio1>{item.location}</Text>
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View style={{ style: 1, flexDirection: 'row', backgroundColor: BaseColor.primaryColor, paddingHorizontal: 5, marginRight: 10 }}>
                                                                {/* <Icon
                                                            name="star"
                                                            color={BaseColor.whiteColor}
                                                            size={8}
                                                            style={{backgroundColor:BaseColor.primaryColor,padding:5,borderRadius:5}}
                                                    /> */}
                                                                <Text caption1 whiteColor>{item.filter_price}</Text>
                                                            </View>
                                                            {/* <View style={{style:1,flexDirection:'row',alignItems: 'center',marginRight:10}}>
                                                    <Icon
                                                            name="heart"
                                                            //color={BaseColor.whiteColor}
                                                            size={8}
                                                            style={{marginRight:5}}
                                                    />
                                                    <Text caption1>Like</Text>
                                                </View>
                                                <View style={{style:1,flexDirection:'row',alignItems: 'center',marginRight:10}}>
                                                    <Icon
                                                            name="map-marker-alt"
                                                            //color={BaseColor.whiteColor}
                                                            size={8}
                                                            style={{marginRight:5}}
                                                    />
                                                    <Text caption1>3.1 km</Text>
                                                </View> */}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}


                                />


                        }



                    </View>
                }



            </View>



        );
    }
}
