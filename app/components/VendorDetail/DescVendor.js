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
    AsyncStorage
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



export default class DescVendor extends Component {
    constructor(props) {
        super(props);


        var data = props.data;
        console.log('vendorsss', JSON.stringify(data));
        this.state = {
            img_featured: Images.doodle,
            //product:props.data,
            loading: true,
            data: data

        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }



    render() {
        const { navigation } = this.props;
        const { loading, data } = this.state;
        //console.log('datass',JSON.stringify(data));
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            loading == true ?
                <Placeholder
                    Animation={Fade}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
                :
                <View style={{ backgroundColor: BaseColor.whiteColor, flex: 1, flexDirection: 'column' }}>
                    <View style={{ marginHorizontal: 20, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text body2 bold>{data.display_name}</Text>
                        </View>

                        {/* <View style={{flexDirection:'row'}}>
                        <Text body2>Rp {data.product_detail.length != 0 ? priceSplitter(data.product_detail[0].normal_price) : 0}</Text>
                        <Text body2 style={{color:BaseColor.primaryColor}}>Rp {data.product_detail.length != 0 ? priceSplitter(data.product_detail[0].price) : 0}</Text>
                        <View style={{backgroundColor:BaseColor.thirdColor,paddingHorizontal:3,paddingVertical:3}}>
                            <Text caption1 whiteColor>{data.product_detail.length != 0 ? data.product_detail[0].discount : 0} %</Text>
                        </View>
                    </View> */}
                        <Text caption1>{data.description}</Text>



                    </View>

                    <View style={{ marginHorizontal: 20, paddingVertical: 10, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 1, paddingVertical: 10, marginRight: 20 }}>
                            <Icon
                                name="map-outline"
                                color={BaseColor.whiteColor}
                                size={14}
                                style={{ backgroundColor: BaseColor.thirdColor, padding: 5, borderRadius: 5, marginRight: 15 }}
                            />
                            <Text caption1 style={{}}>{data.address}, {data.city.city_name}, {data.province.province_name}, {data.country.country_name} </Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 1, paddingVertical: 10 }}>
                            <Icon
                                name="call-outline"
                                color={BaseColor.whiteColor}
                                size={14}
                                style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5, marginRight: 15 }}
                            />
                            <Text caption1 style={{}}>{data.phone}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 1, paddingVertical: 10 }}>
                            <Icon
                                name="at"
                                color={BaseColor.whiteColor}
                                size={14}
                                style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5, marginRight: 15 }}
                            />
                            <Text caption1 style={{}}>{data.email}</Text>
                        </View>

                    </View>

                    {/* <View style={{flexDirection:'row',alignContent:'stretch',justifyContent:'space-evenly',marginTop:10}}>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            alignItems: 'center',
                            padding:10,
                            justifyContent:'flex-start',
                            borderTopWidth:0.3,
                            borderTopColor:BaseColor.dividerColor,

                            borderRightWidth:0.3,
                            borderRightColor:BaseColor.dividerColor,

                            paddingHorizontal:20,

                            }}>
                            <Icon
                                    name="tag"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{marginRight:5}}
                            />
                            <Text caption1>Tambah ke wishlist</Text>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            alignItems: 'center',
                            padding:10,
                            justifyContent:'flex-start',
                            borderTopWidth:0.3,
                            borderTopColor:BaseColor.dividerColor,

                            paddingHorizontal:20,

                            }}>
                            <Icon
                                    name="share-alt"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{marginRight:5}}
                            />
                            <Text caption1>Bagikan penawaran ini</Text>
                        </View>
                </View> */}
                </View>



        );
    }
}
