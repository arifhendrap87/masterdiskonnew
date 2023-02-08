import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button, IconIons } from "@components";
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

    convertGambar(code,image){
        const str = code;
        const firstTwoChars = str.slice(0, 2);
        var imageMaskapai=image;
        if(firstTwoChars=='8B'){
            imageMaskapai='https://cdn.masterdiskon.com/masterdiskon/product/flight/airline/transnusa.jpg';
        }else if(firstTwoChars=='IU'){
            imageMaskapai='https://cdn.masterdiskon.com/masterdiskon/product/flight/airline/superairjet.jpg';
        }else if(firstTwoChars=='IP'){
            imageMaskapai='https://cdn.masterdiskon.com/masterdiskon/product/flight/airline/pelitaair.jpg';
        }


        return imageMaskapai;
    }

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
            <View style={styles.item}>
                <View style={[styles.contain, style]}>
                    <View style={styles.content}>
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
                                    <View  style={{ flexDirection: 'column' }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>

                                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                <View>
                                                    <Image
                                                        style={styles.image}
                                                        resizeMode="contain"
                                                        //source={{ uri: itemData.detail.flight[0].image }}
                                                        source={{ uri: this.convertGambar(itemData.detail.flight[0].code,itemData.detail.flight[0].image) }}
                                                    />
                                                </View>
                                                <View>
                                                    <Text caption1 bold >
                                                        {itemData.name} 
                                                        {/* {this.convertGambar(itemData.detail.flight[0].code,itemData.detail.flight[0].image) } */}
                                                    </Text>
                                                    <Text caption1 style={{ fontStyle: 'italic' }} >
                                                        {itemData.detail.flight[0].class}
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={[{ flex: 1, flexDirection: 'row', marginBottom: 10 }]}>
                                            <View style={{ flex: 2.5, flexDirection: "row" }}>
                                                <View style={{ flex: 1 }}>

                                                    <View style={{ alignSelf: 'flex-start', backgroundColor: BaseColor.secondColor, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                                                        <Text caption2 bold>
                                                            {itemData.detail.from.code}
                                                        </Text>
                                                    </View>
                                                    <Text caption1 bold>{itemData.detail.from.time}</Text>
                                                </View>
                                                <View style={{ flex: 1, alignitemDatas: "center", alignItems: 'center' }}>
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
                                                    <Text caption2> {itemData.transit == 0 ? "Direct" : "Transit"}</Text>
                                                    <Text caption2>
                                                        {itemData.duration}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, alignitemDatas: "flex-end", alignItems: 'flex-end' }}>

                                                    <View style={{ alignSelf: 'flex-end', backgroundColor: BaseColor.secondColor, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                                                        <Text caption2 bold>
                                                            {itemData.detail.to.code}
                                                        </Text>
                                                    </View>
                                                    <Text caption1 bold>{itemData.detail.to.time}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text body1 light primaryColor bold>
                                                        Rp {priceSplitter(itemData.price)}
                                                    </Text>
                                                    <Text caption1 light style={{ marginLeft: 5, marginTop: 5 }}>
                                                        / Pax
                                                    </Text>
                                                </View>
                                               
                                            </View>
                                        </View>


                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <View
                                                style={{ flex: 1, flexDirection: 'column' }}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    {
                                                        itemData.detail?.flight[0]?.amenities?.baggage?.cabin?.adt?.desc ?
                                                            <View
                                                                style={[{
                                                                    alignitemDatas: "flex-end",
                                                                    alignItems: 'center',
                                                                    alignSelf: 'center',
                                                                    marginLeft: 5
                                                                }]}
                                                            >
                                                                <IconIons
                                                                    name="suitcase"
                                                                    size={16}
                                                                    solid
                                                                    style={{ alignSelf: 'center' }}

                                                                />
                                                            </View>
                                                            :
                                                            <View />
                                                    }

                                                    {
                                                        itemData.detail?.flight[0]?.amenities?.baggage?.checkin?.adt?.desc ?
                                                            <View
                                                                style={[{
                                                                    alignitemDatas: "flex-end",
                                                                    alignItems: 'center',
                                                                    alignSelf: 'center',
                                                                    marginLeft: 5
                                                                }]}
                                                            >
                                                                <IconIons
                                                                    name="suitcase-rolling"
                                                                    size={20}
                                                                    solid
                                                                    style={{ alignSelf: 'center' }}

                                                                />
                                                                {/* <Text caption1>{itemData.detail?.flight[0]?.amenities?.baggage?.checkin?.adt?.desc}</Text> */}
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
                                                                    name="md-fast-food"
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
                                        <View style={{ flex: 1,flexDirection:'row',justifyContent:'flex-end'}}>
                                            {/* <TouchableOpacity style={{  }} onPress={onPressDetail}>
                                                
                                                    <Icon
                                                        name="ios-arrow-down-circle-outline"
                                                        color={BaseColor.primaryColor}
                                                        size={24}
                                                        solid
                                                    />
                                               
                                            </TouchableOpacity> */}
                                            <TouchableOpacity style={{  }} onPress={onPressDetail}>
                                            <View style={{ flexDirection: 'row',marginRight:5 }}>
                                                    <Button
                                                        style={{ height: 40, borderRadius: 5, backgroundColor: BaseColor.whiteColor,borderWidth:1,borderColor:BaseColor.grayColor }}
                                                        onPress={onPressDetail}
                                                    >
                                                        <Text bold>Detail</Text>

                                                    </Button>
                                            </View>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row' }}>
                                                    <Button
                                                        style={{ height: 40, borderRadius: 5, backgroundColor: BaseColor.secondColor,borderWidth:1,borderColor:BaseColor.secondColor  }}
                                                        onPress={onPress}
                                                    >
                                                        <Text bold>Pilih</Text>

                                                    </Button>
                                            </View>
                                        </View>



                                    </View>

                                </View>
                        }
                    </View>
                </View>
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
