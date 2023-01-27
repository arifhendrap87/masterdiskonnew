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



export default class DescPartner extends Component {
    constructor(props) {
        super(props);
        var data = props.data;
        console.log('datass', JSON.stringify(data));
        this.state = {
            img_featured: Images.doodle,
            expanded: false,
            item: data,
            loading: true
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }



    render() {
        const { navigation, data } = this.props;
        const { loading, item } = this.state;

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
                            <Text body1>Deal Partner</Text>
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

                                <View
                                    onStartShouldSetResponder={() => {
                                        console.log('dataVendor', JSON.stringify(data));
                                        this.props.navigation.navigate('VendorDetail', { id: item.vendor.id_vendor });
                                    }

                                    }
                                    style={{ flex: 9, flexDirection: 'column' }}>
                                    <Text body2 bold>{item.vendor.display_name}</Text>
                                    <Text captio1>Melayani pangkas rambut </Text>
                                    <Text captio1>Jakarta Timur</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ style: 1, flexDirection: 'row', backgroundColor: BaseColor.primaryColor, paddingHorizontal: 5, marginRight: 10 }}>
                                                <Icon
                                                    name="star"
                                                    color={BaseColor.whiteColor}
                                                    size={8}
                                                    style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}
                                                />
                                                <Text caption1 whiteColor>5</Text>
                                            </View>
                                            <View style={{ style: 1, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                                <Icon
                                                    name="heart"
                                                    //color={BaseColor.whiteColor}
                                                    size={8}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text caption1>Like</Text>
                                            </View>
                                            <View style={{ style: 1, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                                <Icon
                                                    name="map-marker-alt"
                                                    //color={BaseColor.whiteColor}
                                                    size={8}
                                                    style={{ marginRight: 5 }}
                                                />
                                                <Text caption1>3.1 km</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>


                            </View>


                        </View>

                        <View style={{ flexDirection: 'row', alignContent: 'stretch', justifyContent: 'space-evenly', borderTopWidth: 0.3, borderTopColor: BaseColor.dividerColor, paddingVertical: 10 }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingHorizontal: 20,
                                alignItems: 'center',

                            }}>
                                <Icon
                                    name="phone"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text caption1>Telepon</Text>
                            </View>


                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingHorizontal: 20,
                                alignItems: 'center'

                            }}>
                                <Icon
                                    name="route"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text caption1>Arahan</Text>
                            </View>


                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingHorizontal: 20,
                                alignItems: 'center'

                            }}>
                                <Icon
                                    name="share-alt"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text caption1>Bagikan</Text>
                            </View>


                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingHorizontal: 20,
                                alignItems: 'center'

                            }}>
                                <Icon
                                    name="thumbs-up"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text caption1>Like</Text>
                            </View>

                        </View>
                    </View>
                }



            </View>



        );
    }
}
