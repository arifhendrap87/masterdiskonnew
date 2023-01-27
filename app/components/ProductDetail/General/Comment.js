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



export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img_featured: Images.doodle,
            expanded: false
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
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
                            <Text body1>Komentar</Text>
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
                    <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 0.3 }}>
                                <View style={{ flex: 2 }}>
                                    <FastImage
                                        style={{
                                            width: 50,
                                            height: 50,
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 60 / 2
                                        }}
                                        source={this.state.img_featured}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                        onLoad={evt => {
                                            this.setState({
                                                img_featured: {
                                                    uri: data.img_featured_url,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }


                                            })
                                        }
                                        }

                                    >
                                    </FastImage>

                                </View>
                                <View style={{ flex: 10, flexDirection: 'column' }}>
                                    <Text body2 bold>Salon Perdana</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row', backgroundColor: BaseColor.primaryColor, marginRight: 5, paddingHorizontal: 5 }}>
                                            <Icon
                                                name="star"
                                                color={BaseColor.whiteColor}
                                                size={8}
                                                style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}
                                            />
                                            <Text caption1 whiteColor>5</Text>
                                        </View>
                                        <View><Text caption1 >20 Feb 2021</Text></View>
                                    </View>
                                    <Text caption1>Dokternya telaten & ramah. Mantap</Text>
                                </View>
                            </View>




                            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 0.3 }}>
                                <View style={{ flex: 2 }}>
                                    <FastImage
                                        style={{
                                            width: 50,
                                            height: 50,
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 60 / 2
                                        }}
                                        source={this.state.img_featured}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                        onLoad={evt => {
                                            this.setState({
                                                img_featured: {
                                                    uri: data.img_featured_url,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }


                                            })
                                        }
                                        }

                                    >
                                    </FastImage>

                                </View>
                                <View style={{ flex: 10, flexDirection: 'column' }}>
                                    <Text body2 bold>Salon Perdana</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row', backgroundColor: BaseColor.primaryColor, paddingHorizontal: 5, marginRight: 5 }}>
                                            <Icon
                                                name="star"
                                                color={BaseColor.whiteColor}
                                                size={8}
                                                style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}
                                            />
                                            <Text caption1 whiteColor>5</Text>
                                        </View>
                                        <View><Text caption1 >20 Feb 2021</Text></View>
                                    </View>
                                    <Text caption1>Dokternya telaten & ramah. Mantap</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }



            </View>



        );
    }
}
