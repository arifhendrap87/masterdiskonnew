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



export default class Ulasan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img_featured: Images.doodle,
            expanded: true,
            item: props.data,
            ulasan: [
                {
                    key: "kebersihan",
                    value: 1
                },
                {
                    key: "fasilitas",
                    value: 2
                },
                {
                    key: "lokasi",
                    value: 4
                },
                {
                    key: "layanan",
                    value: 4
                },
                {
                    key: "kepantasan",
                    value: 5
                }
            ]
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    starLoop(value) {
        var myloop = [];
        var max = 5;
        var sisa = max - value;
        if (value <= max) {
            for (let a = 1; a <= value; a++) {
                myloop.push(
                    <Icon
                        name={'star'}
                        size={16}
                    />
                );

            }
            for (let a = value; a < max; a++) {
                myloop.push(
                    <Icon
                        name={'star-outline'}
                        size={16}
                    />
                );

            }
        }

        return myloop;
    }


    render() {
        const { navigation, data } = this.props;
        const { item } = this.state;
        // console.log('itemdescription', JSON.stringify(item));

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
                            <Text body2 bold>Ulasan</Text>
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
                    this.state.expanded ?

                        <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
                            {/* <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                                {
                                    this.state.ulasan.length != 0 ?
                                        this.state.ulasan.map((item, index) => (
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text>{item.key}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                                    {this.starLoop(item.value)}
                                                </View>

                                            </View>


                                        ))
                                        :
                                        <View />
                                }
                            </View> */}

                            {/* <View style={{ marginTop: 10 }}>
                                <Text bold>Ulasan pengguna</Text>
                                <View>
                                    <Text>Arif Hendra Pambudi</Text>
                                    <Text>It has good location and pretty good nature surrounded. But, I little unsatisfied for the service like long queue check-in, I'm allowed to check in at 3pm! We stayed with family and bring children. Also for amenities in the bathroom, it's so underrated for 5 starts hotel, I can get better brand in 4 stars hotel. Lift direction also confused and no one standby at </Text>
                                </View>
                            </View> */}
                        </View>
                        :
                        <View />
                }
            </View>



        );
    }
}
