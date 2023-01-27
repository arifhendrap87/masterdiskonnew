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



export default class DescProduct extends Component {
    constructor(props) {
        super(props);

        var data = props.data;
        //console.log('datass', JSON.stringify(data));
        this.state = {
            img_featured: Images.doodle,
            //product:props.data,
            loading: true,
            item: data

        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    convertReview(value) {
        var status = '';
        // {hotel.reviewScore >= 8.0 ? 'Very Good' : hotel.reviewScore >= 7.0 ? 'Good' : 'Review Score'}
        if (value >= 8) {
            status = 'Very Good';
        } else if (value >= 7) {
            status = 'Very Good';
        }
        return status;
    }



    render() {
        const { navigation } = this.props;
        const { loading, item } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        // //console.log('product_detail_type', typeof item.product_detail);
        // //console.log('statusProductDetail', statusProductDetail);
        // //console.log('itemss', this.state.item);

        var statusProductDetail = typeof item.product_detail;
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

                (item.detail != undefined) ?

                    <View style={{ backgroundColor: BaseColor.whiteColor }}>
                        <View style={{ marginHorizontal: 20, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                <View style={{
                                    backgroundColor: BaseColor.thirdColor,
                                    borderRadius: 5,
                                    justifyContent: 'center', //Centered horizontally
                                    alignItems: 'center', //Centered vertically
                                    paddingHorizontal: 10

                                }}>
                                    <Text whiteColor>Hotel</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text body2 bold>{item.name}</Text>
                            </View>

                            <Text caption1 >{item.detail.address}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                                <View style={{ flexDirection: 'column', marginRight: 3 }}>
                                    <Text caption1 bold style={{ marginBottom: 0 }}>{this.convertReview(parseInt(item.reviewScore))}</Text>
                                    <Text caption2 style={{ marginBottom: 0 }}>Review</Text>
                                </View>
                                <View style={{
                                    backgroundColor: BaseColor.secondColor, borderRadius: 5,
                                    justifyContent: 'center', //Centered horizontally
                                    alignItems: 'center', //Centered vertically
                                    paddingHorizontal: 10

                                }}>
                                    <Text bold>{item.reviewScore}</Text>

                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignContent: 'stretch', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                justifyContent: 'flex-start',
                                borderTopWidth: 0.3,
                                borderTopColor: BaseColor.dividerColor,

                                borderRightWidth: 0.3,
                                borderRightColor: BaseColor.dividerColor,

                                paddingHorizontal: 20,

                            }}
                                onStartShouldSetResponder={() => true}
                                onResponderGrant={() => {
                                    this.props.handleShare();
                                }}
                            >
                                <Icon
                                    name="pricetag-outline"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text caption1>Share Product</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                justifyContent: 'flex-start',
                                borderTopWidth: 0.3,
                                borderTopColor: BaseColor.dividerColor,

                                paddingHorizontal: 20,

                            }}
                                onStartShouldSetResponder={() => true}
                                onResponderGrant={() => {
                                    this.props.showModalMap();
                                }}
                            >
                                <Icon
                                    name="map"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text caption1>Lihat Peta</Text>
                            </View>
                        </View>
                    </View>

                    :
                    <View />






        );
    }
}
