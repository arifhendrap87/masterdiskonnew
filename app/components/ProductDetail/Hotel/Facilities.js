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



export default class Facilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img_featured: Images.doodle,
            expanded: false,
            item: props.data,
            numFacDef: 5,
            numFac: props.data.detail.facilities.length
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    facility(data, defNum) {
        var xx = [];
        //console.log('banyakdata', data.length);

        for (var i = 0; i < data.length; i++) {
            if (i <= defNum) {
                xx.push(<View
                    style={{
                        flexDirection: 'row'
                    }}
                    key={"service" + i}
                >
                    <Icon
                        name={'checkmark-outline'}
                    />
                    <Text
                        style={{ marginLeft: 5 }}
                        caption1
                    >
                        {data[i].name}
                    </Text>
                </View>)
            }
        }

        return xx;

    }

    render() {
        const { navigation, data } = this.props;
        const { item } = this.state;

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
                            <Text body2 bold>Fasilitas</Text>
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

                        (item.detail != undefined) ?
                        <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1, height: this.state.numFacDef == item.detail.facilities.length ? this.state.numFacDef * 20 : this.state.numFacDef * 35, marginBottom: 40 }}>
                            <View style={{}}>
                                {this.facility(item.detail.facilities, this.state.numFacDef)}
                            </View>
                            {
                                item.detail.facilities.length <= 5 ?
                                    <View />
                                    :

                                    this.state.numFacDef == item.detail.facilities.length ?

                                        <Button
                                            style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                                            onPress={() => {
                                                this.setState({ numFacDef: 3 });

                                            }}
                                        >
                                            <Text bold>Tutup</Text>
                                        </Button>
                                        :
                                        <Button
                                            style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                                            onPress={() => {
                                                this.setState({ numFacDef: item.detail.facilities.length });

                                            }}
                                        >
                                            <Text bold>Lihat Lebih Banyak</Text>
                                        </Button>




                            }

                        </View>
                        :
                        <View />
                }

            </View>



        );
    }
}
