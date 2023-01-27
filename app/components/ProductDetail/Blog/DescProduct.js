

import React, { Component, useEffect, useState, useCallback } from "react";
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
import { useWindowDimensions } from 'react-native';
import HTML, { HTMLContentModel, defaultHTMLElementModels } from 'react-native-render-html';
import { WebView } from 'react-native-webview';



export default function DescProduct(props) {
    let { navigation } = props;
    const [item, setItem] = useState(props.data);

    const { width } = useWindowDimensions();
    return (
        <View style={{ backgroundColor: BaseColor.whiteColor }}>
            <View style={{ marginHorizontal: 20, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text body2 bold>{item.title}</Text>
                    <HTML
                        html={'<div style="width:100%"' + item.content_blog + '</div>'}
                        contentWidth={width}
                        imagesMaxWidth={Dimensions.get("window").width}
                        tagsStyles={{
                            // p: {
                            //     fontSize: 22,
                            //     lineHeight: 30,
                            //     marginBottom: 0
                            // },
                            img: {
                                width: 100
                            }
                        }}
                        classesStyles={{
                            'p img': {
                                width: 100

                            }
                        }}
                        ignoredStyles={['line-height']}
                    // renderersProps={{
                    //     enableExperimentalPercentWidth: true
                    //   }}
                    />
                    {/* <View style={{ flex: 1, marginTop: 20 }}>
                                    <WebView style={{}} source={{ uri: this.state.url }} originWhitelist={['*']} />
                                </View> */}
                </View>
            </View>

            {/* <View style={{ flexDirection: 'row', alignContent: 'stretch', justifyContent: 'space-evenly', marginTop: 10 }}>
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

                            }}>
                                <Icon
                                    name="pricetag-outline"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text caption1>Tambah ke wishlist</Text>
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

                            }}>
                                <Icon
                                    name="share-social-outline"
                                    color={BaseColor.lightPrimaryColor}
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text caption1>Bagikan penawaran ini</Text>
                            </View>
                        </View> */}
        </View>
    );
}