import React, { Component } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import Swiper from "react-native-swiper";
import { Image, Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";
import BrickList from 'react-native-masonry-brick-list';
import FastImage from 'react-native-fast-image';

export default class PreviewImage extends Component {
    constructor(props) {
        super(props);

        // Temp data images define

        var images = [];
        if (this.props.navigation.state.params.images) {
            images = this.props.navigation.state.params.images;
        }
        console.log('imagepreview', JSON.stringify(images));
        var indexSelected = 0;
        if (this.props.navigation.state.params.indexSelected) {
            indexSelected = this.props.navigation.state.params.indexSelected;
        }
        var arrNumber = [1, 2, 3, 1, 1, 1, 3, 2, 1, 2, 3, 2, 1, 3,
            1, 2, 3, 1, 1, 1, 3, 2, 1, 2, 3, 2, 1, 3,
            1, 2, 3, 1, 1, 1, 3, 2, 1, 2, 3, 2, 1, 3,
            1, 2, 3, 1, 1, 1, 3, 2, 1, 2, 3, 2, 1, 3
        ]
        var images_new = this.rebuild(images, arrNumber);
        console.log('images_new', JSON.stringify(images_new))
        //console.log('indexSelected',indexSelected);
        this.state = {
            images: images_new,
            indexSelected: 0,
            data: [
                { id: '1', name: "Red", color: "#f44336", span: 1 },
                { id: '2', name: "Pink", color: "#E91E63", span: 2 },
                { id: '3', name: "Purple", color: "#9C27B0", span: 3 },
                { id: '4', name: "Deep Purple", color: "#673AB7", span: 1 },
                { id: '5', name: "Indigo", color: "#3F51B5", span: 1 },
                { id: '6', name: "Blue", color: "#2196F3", span: 1 },
                { id: '7', name: "Light Blue", color: "#03A9F4", span: 3 },
                { id: '8', name: "Cyan", color: "#00BCD4", span: 2 },
                { id: '9', name: "Teal", color: "#009688", span: 1 },
                { id: '10', name: "Green", color: "#4CAF50", span: 1 },
                { id: '11', name: "Light Green", color: "#8BC34A", span: 2 },
                { id: '12', name: "Lime", color: "#CDDC39", span: 3 },
                { id: '13', name: "Yellow", color: "#FFEB3B", span: 2 },
                { id: '14', name: "Amber", color: "#FFC107", span: 1 },
                { id: '15', name: "Orange", color: "#FF5722", span: 3 },
            ]
        };
        // this.flatListRef = null;
        // this.swiperRef = null;
    }

    rebuild(listdata, arrNumber) {
        var listdata_new = [];
        var a = 0;

        listdata.map(item => {
            var obj = {};

            obj["id"] = item.id;
            obj["span"] = arrNumber[a];
            obj["image"] = item;

            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    // onSelect(indexSelected) {
    //     //console.log(indexSelected);
    //     this.setState(
    //         {
    //             indexSelected: indexSelected,
    //             images: this.state.images.map((item, index) => {
    //                 if (index == indexSelected) {
    //                     return {
    //                         ...item,
    //                         selected: true
    //                     };
    //                 } else {
    //                     return {
    //                         ...item,
    //                         selected: false
    //                     };
    //                 }
    //             })
    //         },
    //         () => {
    //             this.flatListRef.scrollToIndex({
    //                 animated: true,
    //                 index: indexSelected
    //             });
    //         }
    //     );
    // }

    // onTouchImage(touched) {
    //     console.log(touched);
    //     if (touched == this.state.indexSelected) return;
    //     this.swiperRef.scrollBy(touched - this.state.indexSelected, false);
    // }

    componentDidMount() {
        setTimeout(() => {
            //this.onTouchImage(this.props.navigation.state.params.indexSelected);
        }, 50);
    }

    //RenderAnyItem



    render() {
        const { navigation } = this.props;
        const { images, indexSelected } = this.state;

        renderView = (prop) => {
            return (
                <View key={prop.id} style={{
                    margin: 2,
                    borderRadius: 2,
                    backgroundColor: prop.color,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    //height: 50
                }} >
                    {/* <Text style={{ color: 'white' }}>{prop.name}</Text> */}
                    <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        cacheControl={FastImage.cacheControl.cacheOnly}
                        resizeMethod={'scale'}
                        style={{ width: '100%', height: 100 }}

                        source={{
                            uri: prop.image,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                    >
                    </FastImage>
                </View>

                // <View key={prop.id} style={{
                //     flex: 1,
                //     marginHorizontal: 1,


                // }}>
                //     <FastImage
                //         resizeMode={FastImage.resizeMode.cover}
                //         cacheControl={FastImage.cacheControl.cacheOnly}
                //         resizeMethod={'scale'}
                //         style={{ width: '100%', height: 100 }}

                //         source={{
                //             uri: "https://cdn.masterdiskon.com/masterdiskon/product/hotel/img/featured/2021/998558/a1.jpg",
                //             headers: { Authorization: 'someAuthToken' },
                //             priority: FastImage.priority.normal,
                //         }}
                //     >
                //     </FastImage>
                // </View>


            )
        };

        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >

                <Header
                    style={{ backgroundColor: BaseColor.primaryColor }}
                    title=""
                    renderRight={() => {
                        return (
                            <Icon
                                name="close-outline"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressRight={() => {
                        navigation.goBack();
                    }}
                    barStyle="light-content"
                />
                <View style={{ backgroundColor: BaseColor.whiteColor, marginTop: 10, flex: 1 }}>
                    <BrickList
                        data={this.state.images}
                        renderItem={(prop) => renderView(prop)}
                        columns={3}
                        rowHeight={105}
                    />
                </View>
            </SafeAreaView>
        )
        // return (
        //     <SafeAreaView
        //         style={[BaseStyle.safeAreaView, { backgroundColor: "black" }]}
        //         forceInset={{ top: "always" }}
        //     >
        //         <Header
        //             style={{ backgroundColor: "black" }}
        //             title=""
        //             renderRight={() => {
        //                 return (
        //                     <Icon
        //                         name="close-outline"
        //                         size={20}
        //                         color={BaseColor.whiteColor}
        //                     />
        //                 );
        //             }}
        //             onPressRight={() => {
        //                 navigation.goBack();
        //             }}
        //             barStyle="light-content"
        //         />
        //         <Swiper
        //             ref={ref => {
        //                 this.swiperRef = ref;
        //             }}
        //             dotStyle={{
        //                 backgroundColor: BaseColor.textSecondaryColor
        //             }}
        //             paginationStyle={{ bottom: 0 }}
        //             loop={false}
        //             activeDotColor={BaseColor.primaryColor}
        //             removeClippedSubviews={false}
        //             onIndexChanged={index => this.onSelect(index)}
        //         >
        //             {images.map((item, key) => {
        //                 return (
        //                     <Image
        //                         key={key}
        //                         style={{ width: "100%", height: "100%" }}
        //                         resizeMode="contain"
        //                         source={{ uri: item.image }}
        //                     />
        //                 );
        //             })}
        //         </Swiper>
        //         <View
        //             style={{
        //                 paddingVertical: 10
        //             }}
        //         >
        //             <View style={styles.lineText}>
        //                 <Text caption2 whiteColor>
        //                     Standard Double Room
        //                 </Text>
        //                 <Text caption2 whiteColor>
        //                     {indexSelected + 1}/{images.length}
        //                 </Text>
        //             </View>
        //             <FlatList
        //                 ref={ref => {
        //                     this.flatListRef = ref;
        //                 }}
        //                 horizontal={true}
        //                 showsHorizontalScrollIndicator={false}
        //                 data={images}
        //                 keyExtractor={(item, index) => item.id}
        //                 renderItem={({ item, index }) => (
        //                     <TouchableOpacity
        //                         onPress={() => {
        //                             this.onTouchImage(index);
        //                         }}
        //                         activeOpacity={0.9}
        //                     >
        //                         <Image
        //                             style={{
        //                                 width: 70,
        //                                 height: 70,
        //                                 marginLeft: 20,
        //                                 borderRadius: 8,
        //                                 borderColor:
        //                                     index == indexSelected
        //                                         ? BaseColor.lightPrimaryColor
        //                                         : BaseColor.grayColor,
        //                                 borderWidth: 1
        //                             }}
        //                             source={{ uri: item.image }}
        //                         />
        //                     </TouchableOpacity>
        //                 )}
        //             />
        //         </View>
        //     </SafeAreaView>
        // );
    }
}
