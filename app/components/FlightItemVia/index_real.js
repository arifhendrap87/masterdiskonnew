import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
import styles from "./styles";

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


import Modal from "react-native-modal";


export default class itemDataDataVia extends Component {

    render() {
        const {
            style,
            loading,
            itemData,
            onPress,
            onPressDetail,
        } = this.props;


        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <View style={[styles.content, style]}>
                {
                    loading ?
                        <View>
                            <View style={styles.contentTop}>
                                <View style={{ flex: 1 }}>
                                    <PlaceholderLine width={50} />
                                    <PlaceholderLine width={30} />
                                </View>
                                <View style={{ flex: 1.5, alignitemDatas: "center", alignItems: 'center' }}>
                                    <PlaceholderLine width={50} />
                                    <View style={styles.contentLine}>
                                        <View style={styles.line} />
                                        <Icon
                                            name="md-airplane-outline"
                                            color={BaseColor.dividerColor}
                                            size={24}
                                            solid
                                        />
                                        <View style={styles.dot} />
                                    </View>
                                    <PlaceholderLine width={50} />
                                </View>
                                <View style={{ flex: 1, alignitemDatas: "flex-end", alignItems: 'flex-end' }}>
                                    <PlaceholderLine width={50} />
                                    <PlaceholderLine width={30} />
                                </View>
                            </View>
                            <View style={styles.contentBottom}>
                                <View style={styles.bottomLeft}>
                                    <PlaceholderLine width={50} />
                                </View>
                                <View
                                    style={styles.bottomRight}
                                >
                                    <PlaceholderLine width={50} />
                                </View>
                            </View>
                        </View>
                        :
                        // <View />
                        <View>
                            <TouchableOpacity onPress={onPress} style={{ flexDirection: 'column' }}>
                                <View style={[{ flex: 1, flexDirection: 'row', marginBottom: 10 }]}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <View style={{ flex: 1 }}>
                                            <Text body2 bold>{itemData.detail.from.time}</Text>
                                            <View style={{ alignSelf: 'flex-start', backgroundColor: BaseColor.secondColor, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                                                <Text caption2 bold>
                                                    {itemData.detail.from.code}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignitemDatas: "center", alignItems: 'center' }}>
                                            <Text caption1 light>
                                                {itemData.detail.flight[0].flyTime}
                                            </Text>
                                            <View style={styles.contentLine}>
                                                <View style={styles.line} />
                                                <Icon
                                                    name="md-airplane-outline"
                                                    color={BaseColor.dividerColor}
                                                    size={20}
                                                    solid
                                                />
                                                <View style={styles.dot} />
                                            </View>
                                            <Text caption1 light>
                                                {itemData.transit == 0 ? "Langsung" : itemData.transit + " Transit"}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignitemDatas: "flex-end", alignItems: 'flex-end' }}>
                                            <Text body2 bold>{itemData.detail.to.time}</Text>
                                            <View style={{ alignSelf: 'flex-end', backgroundColor: BaseColor.secondColor, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                                                <Text caption2 bold>
                                                    {itemData.detail.to.code}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text body1 light primaryColor bold>
                                                Rp {priceSplitter(itemData.price)}
                                            </Text>
                                            <Text caption1 light style={{ marginLeft: 5 }}>
                                                / Pax
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button
                                                style={{ height: 30, width: '50%', borderRadius: 5, backgroundColor: BaseColor.secondColor }}
                                                onPress={onPress}
                                            >
                                                <Text bold>Pesan</Text>

                                            </Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={styles.bottomLeft}>
                                        <Image
                                            style={styles.image}
                                            resizeMode="contain"
                                            source={{ uri: itemData.detail.flight[0].image }}
                                        // source={image}
                                        />
                                        <View>
                                            <Text caption1 semibold accentColor>
                                                {itemData.detail.flight[0].name}
                                            </Text>
                                            <Text caption2 light>
                                                {itemData.detail.flight[0].class}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <View
                                        style={{ flex: 1, flexDirection: 'column' }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            {
                                                itemData.filter_baggage == 1 ?
                                                    <View
                                                        style={[{
                                                            alignitemDatas: "flex-end",
                                                            alignItems: 'flex-end',
                                                            alignSelf: 'flex-end',
                                                            marginLeft: 5
                                                        }]}
                                                    >
                                                        <Icon
                                                            name="briefcase-outline"
                                                            size={16}
                                                            solid
                                                            style={{ alignSelf: 'flex-end', textAlign: 'right' }}

                                                        />
                                                    </View>
                                                    :
                                                    <View />
                                            }

                                            {
                                                itemData.filter_meal == 1 ?

                                                    <View
                                                        style={[{
                                                            alignitemDatas: "flex-end",
                                                            alignItems: 'flex-end',
                                                            alignSelf: 'flex-end',
                                                            marginLeft: 5

                                                        }]}
                                                    >
                                                        <Icon
                                                            name="md-fast-food-outline"
                                                            size={16}
                                                            solid
                                                            style={{ alignSelf: 'flex-end' }}
                                                        />


                                                    </View>
                                                    :
                                                    <View />
                                            }
                                        </View>


                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={onPressDetail}>
                                        <View style={styles.contentLine}>
                                            <Icon
                                                name="ios-arrow-down-circle-outline"
                                                color={BaseColor.primaryColor}
                                                size={24}
                                                solid
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>



                            </View>

                        </View>
                }
            </View>
        );
    }
}

itemDataDataVia.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    itemData: PropTypes.object,
    loading: PropTypes.bool,
    onPress: PropTypes.func,
    onPressDetail: PropTypes.func,
};

itemDataDataVia.defaultProps = {
    style: {},
    itemData: {},
    loading: true,
    onPress: () => { },
    onPressDetail: () => { },

};
