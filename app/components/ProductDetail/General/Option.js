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


export default class Option extends Component {
    constructor(props) {
        super(props);
        var data = props.data;
        this.state = {
            img_featured: Images.doodle,
            expanded: true,
            product_detail: data.product_detail
        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    onChange(select) {
        const { navigation } = this.props;
        const { product_detail } = this.state;
        this.setState({
            product_detail: product_detail.map(item => {
                if (item.id_product_detail == select.id_product_detail) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }

            })
        });

        this.props.setPrice(select, this.props.quantity);
    }

    render() {
        const { navigation } = this.props;
        const { product_detail } = this.state;

        const priceSplitter = (number) =>
            number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


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
                            <Text body2 bold>Pilihan Produk</Text>
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

                            <FlatList
                                data={product_detail}
                                keyExtractor={(item, index) => item.id_product_detail}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onChange(item)
                                        }

                                        }
                                    >
                                        <View style={{ flexDirection: 'row', borderBottomColor: BaseColor.dividerColor, borderBottomWidth: 0.3 }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 8, flexDirection: 'column' }}>
                                                    <Text caption1 bold>{item.detail_name}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text caption1 bold style={{ marginRight: 10, textDecorationLine: 'line-through' }}>Rp {priceSplitter(item.normal_price)}</Text>
                                                        <Text caption1 bold style={{ color: BaseColor.primaryColor, marginRight: 10 }}>Rp {priceSplitter(item.price)}</Text>
                                                        <View style={{ backgroundColor: BaseColor.thirdColor, paddingHorizontal: 3, paddingVertical: 3, borderRadius: 5 }}>
                                                            <Text caption1 whiteColor>{item.discount} %</Text>
                                                        </View>
                                                    </View>
                                                    <Text captio1>{item.desc}</Text>
                                                </View>
                                                <View>

                                                    {
                                                        item.checked ?
                                                            <View style={styles.iconRight, { flexDirection: 'column' }}>


                                                                <Icon
                                                                    name="checkmark-circle-outline"
                                                                    size={30}
                                                                    color={'green'}
                                                                />
                                                                <Text caption2 style={{ color: 'green' }}>Dipilih</Text>
                                                            </View>
                                                            :
                                                            <View style={styles.iconRight}>
                                                                <Icon
                                                                    name="ellipse-outline"
                                                                    size={30}
                                                                    color={'grey'}
                                                                />
                                                            </View>
                                                    }
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                        </View>


                    </View>
                }



            </View>



        );
    }
}



const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    lineInfor: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    todoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center"
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },

    itemPrice: {
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    linePrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    linePriceMinMax: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 10
    },
    iconRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    contentService: {
        paddingVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
});