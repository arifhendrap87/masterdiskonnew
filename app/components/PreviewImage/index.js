import React, { Component } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import Swiper from "react-native-swiper";
import { Image, Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";

export default class PreviewImage extends Component {
    constructor(props) {
        super(props);

        // Temp data images define

        var images = [];
        if (this.props.images) {
            images = this.props.images;
        }
        console.log('imagesPreviewImage', JSON.stringify(images));

        this.state = {
            images: images,
            indexSelected: 0
        };
        this.flatListRef = null;
        this.swiperRef = null;
    }

    onSelect(indexSelected) {
        this.setState(
            {
                indexSelected: indexSelected,
                images: this.state.images.map((item, index) => {
                    if (index == indexSelected) {
                        return {
                            ...item,
                            selected: true
                        };
                    } else {
                        return {
                            ...item,
                            selected: false
                        };
                    }
                })
            },
            () => {
                this.flatListRef.scrollToIndex({
                    animated: true,
                    index: indexSelected
                });
            }
        );
    }

    /**
     * @description Called when image item is selected or activated
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {*} touched
     * @returns
     */
    onTouchImage(touched) {
        if (touched == this.state.indexSelected) return;
        this.swiperRef.scrollBy(touched - this.state.indexSelected, false);
    }

    componentDidMount() {
        // this.onSelect(1);
    }

    render() {
        const { navigation } = this.props;
        const { images, indexSelected } = this.state;
        return (
            <View
                style={{
                    //marginTop: 150
                }}
            >

                <FlatList
                    ref={ref => {
                        this.flatListRef = ref;
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.selectImage(index);
                            }}
                            activeOpacity={0.9}
                        >
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginLeft: 20,
                                    borderRadius: 8,
                                    // borderColor:
                                    //     index == indexSelected
                                    //         ? BaseColor.lightPrimaryColor
                                    //         : BaseColor.grayColor,
                                    // borderWidth: 2
                                }}
                                source={{ uri: item.image }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
