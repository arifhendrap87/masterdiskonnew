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
const heightImageBanner = Utils.scaleWithPixel(220, 1);

export default class PhotoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img_featured: Images.doodle,
            item: props.data,
            itemImg: [],
            imgMain: {}
        };

    }
    componentDidMount() {
        this.rebuild(this.state.item);


    }

    rebuild(item) {
        //const { item } = this.state;
        if (item.detail != undefined) {
            var listdata_new = [];
            var listdata_sort = [];
            var a = 1;
            item.detail.images.map(function (item, i) {
                var obj = {}
                obj['img'] = item;
                obj['key'] = i;
                listdata_new.push(obj);
                a++;

            })
            // console.log('rebuildgambar', JSON.stringify(listdata_new));
            this.setState({ itemImg: listdata_new });

            var propImg = {
                uri: listdata_new[0].img,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }
            this.setState({ imgMain: propImg });


        }

    }



    render() {
        const { navigation, data } = this.props;
        const { item, itemImg } = this.state;
        // console.log('productphotoheaders', JSON.stringify(item));
        // console.log('productphotoheadersdetail', JSON.stringify(item.detail.images));
        // console.log('itemImg', JSON.stringify(itemImg));
        return (
            <View style={{ height: heightImageBanner - 12 }}>
                {
                    (item.detail != undefined)

                        ?

                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: BaseColor.primaryColor }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View style={{ flex: 3 }}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                        style={{ width: '100%', height: heightImageBanner - 75 }}
                                        source={this.state.imgMain}
                                    >
                                    </FastImage>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 5, paddingBottom: 5 }}>

                                    <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={this.state.itemImg}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(index) => item.id}
                                        getItemLayout={(item, index) => (
                                            { length: 70, offset: 70 * index, index }
                                        )}
                                        removeClippedSubviews={true} // Unmount components when outside of window 
                                        initialNumToRender={2} // Reduce initial render amount
                                        maxToRenderPerBatch={1} // Reduce number in each render batch
                                        maxToRenderPerBatch={100} // Increase time between renders
                                        windowSize={7} // Reduce the window size
                                        renderItem={({ item, index }) => <TouchableOpacity
                                            onPress={() => {
                                                var propImg = {
                                                    uri: item.img,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }
                                                this.setState({ imgMain: propImg });

                                            }}
                                        >
                                            <FastImage
                                                resizeMode={FastImage.resizeMode.cover}
                                                cacheControl={FastImage.cacheControl.cacheOnly}
                                                resizeMethod={'scale'}
                                                style={{ width: 50, height: 50, marginRight: 5, borderRadius: 5, }}

                                                source={{
                                                    uri: item.img,
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                            >
                                            </FastImage></TouchableOpacity>}


                                    />

                                </View>
                                {/* <View style={{ flex: 1, marginLeft: 2.5, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1, marginRight: 2.5 }}>
                                            <FastImage
                                                resizeMode={FastImage.resizeMode.cover}
                                                cacheControl={FastImage.cacheControl.cacheOnly}
                                                resizeMethod={'scale'}
                                                style={{ width: '100%', height: 100 }}

                                                source={{
                                                    uri: item.detail.images[1],
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                            >
                                            </FastImage>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 2.5 }}>
                                            <FastImage
                                                resizeMode={FastImage.resizeMode.cover}
                                                cacheControl={FastImage.cacheControl.cacheOnly}
                                                resizeMethod={'scale'}
                                                style={{ width: '100%', height: 100 }}

                                                source={{
                                                    uri: item.detail.images[2],
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                            >
                                            </FastImage>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 1, marginRight: 2.5 }}>
                                            <FastImage
                                                resizeMode={FastImage.resizeMode.cover}
                                                cacheControl={FastImage.cacheControl.cacheOnly}
                                                resizeMethod={'scale'}
                                                style={{ width: '100%', height: 100 }}

                                                source={{
                                                    uri: item.detail.images[3],
                                                    headers: { Authorization: 'someAuthToken' },
                                                    priority: FastImage.priority.normal,
                                                }}
                                            >
                                            </FastImage>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 2.5 }}>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                                console.log('detail.images', JSON.stringify(item.detail.images));
                                                navigation.navigate('PreviewImage', { images: item.detail.images });
                                            }}>
                                                <FastImage
                                                    resizeMode={FastImage.resizeMode.cover}
                                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                                    resizeMethod={'scale'}
                                                    style={{ width: '100%', height: 100 }}

                                                    source={{
                                                        uri: item.detail.images[4],
                                                        headers: { Authorization: 'someAuthToken' },
                                                        priority: FastImage.priority.normal,
                                                    }}
                                                >
                                                    <View style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        zIndex: 1
                                                    }}>
                                                        <Text body2 bold style={{ color: BaseColor.whiteColor, }}>+ {item.detail.images.length}</Text>
                                                    </View>
                                                    <View style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        left: 0,
                                                        backgroundColor: 'black',
                                                        opacity: 0.7,
                                                        zIndex: 0
                                                    }} />

                                                </FastImage>
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                </View> */}

                            </View>
                            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginRight: 5 }}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                        style={{ width: '100%', height: 100 }}
                                        source={{
                                            uri: item.detail.images[2],
                                            headers: { Authorization: 'someAuthToken' },
                                            priority: FastImage.priority.normal,
                                        }}
                                    >
                                    </FastImage>
                                </View>
                                <View style={{ flex: 1, marginHorizontal: 5 }}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        cacheControl={FastImage.cacheControl.cacheOnly}
                                        resizeMethod={'scale'}
                                        style={{ width: '100%', height: 100 }}

                                        source={{
                                            uri: item.detail.images[3],
                                            headers: { Authorization: 'someAuthToken' },
                                            priority: FastImage.priority.normal,
                                        }}
                                    >
                                    </FastImage>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                        console.log('detail.images', JSON.stringify(item.detail.images));
                                        navigation.navigate('PreviewImage', { images: item.detail.images });
                                    }}>
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.cover}
                                            cacheControl={FastImage.cacheControl.cacheOnly}
                                            resizeMethod={'scale'}
                                            style={{ width: '100%', height: 100 }}

                                            source={{
                                                uri: item.detail.images[4],
                                                headers: { Authorization: 'someAuthToken' },
                                                priority: FastImage.priority.normal,
                                            }}
                                        >
                                            <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                zIndex: 1
                                            }}>
                                                <Text body2 bold style={{ color: BaseColor.whiteColor, }}>+ {item.detail.images.length}</Text>
                                            </View>
                                            <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                left: 0,
                                                backgroundColor: 'black',
                                                opacity: 0.7,
                                                zIndex: 0
                                            }} />

                                        </FastImage>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                        :
                        <FastImage
                            style={{
                                width: "100%",
                                height: heightImageBanner,
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
                                        uri: data.image,
                                        headers: { Authorization: 'someAuthToken' },
                                        priority: FastImage.priority.normal,
                                    }


                                })
                            }
                            }

                        >
                        </FastImage>
                }
            </View>
        );
    }
}
