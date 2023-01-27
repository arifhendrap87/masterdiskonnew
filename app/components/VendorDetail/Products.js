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


import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import Modal from "react-native-modal";
// import {
//     DataLoading,
//     DataConfig,
//     DataTrip,
//     DataHotelPackage,
//     DataIcon,
//     DataHotelPackageCity,
//     DataActivities,
//     DataDashboard,
//     DataSlider,
//     DataBlog,DataMenu,products,DataPromo
// } from "@data";
import CardCustom from "../../components/CardCustom";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

export default class Products extends Component {
    constructor(props) {
        super(props);
        var data = props.data.products;
        console.log('productVendor', JSON.stringify(data));
        this.state = {
            img_featured: Images.doodle,
            expanded: true,
            item: data,
            loading: true,
            products: data,

        };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }


    slug(slug) {
        const { navigation, data } = this.props;
        return slug.map((item) => {
            return (
                <Tag
                    rateSmall
                    style={{
                        backgroundColor: BaseColor.accentColor,
                        borderColor: BaseColor.accentColor,
                        marginTop: 3,
                        marginRight: 5
                    }}
                    onPress={() => {

                        navigation.navigate('ProductList', {
                            title: item.name_product_tag,
                            type: 'tag',
                            paramPrice: '',
                            paramCategory: '',
                            paramCity: '',
                            paramTag: '&tag[]=dnd&tag[]=western',
                            paramOrder: '',

                        });
                    }}
                >
                    {item.name_product_tag}
                </Tag>
            )
        })
    }
    render() {
        const { navigation, data } = this.props;
        const { loading, item, products } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

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
                            <Text body1>Deal Partner</Text>
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
                        <FlatList


                            data={products}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id}
                            getItemLayout={(item, index) => (
                                { length: 70, offset: 70 * index, index }
                            )}
                            removeClippedSubviews={true} // Unmount components when outside of window 
                            initialNumToRender={2} // Reduce initial render amount
                            maxToRenderPerBatch={1} // Reduce number in each render batch
                            maxToRenderPerBatch={100} // Increase time between renders
                            windowSize={7} // Reduce the window size
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
                                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                            <View style={{ flex: 3 }}>
                                                <FastImage
                                                    style={{
                                                        width: 80,
                                                        height: 'auto',
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                    source={{ uri: item.img_featured_url }}
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                                    resizeMethod={'scale'}
                                                >
                                                </FastImage>

                                            </View>
                                            <TouchableOpacity
                                                style={{ flex: 9, flexDirection: 'column' }}
                                                onPress={() => {
                                                    var param = { slug: item.slug_product, product_type: 'general' };
                                                    console.log('dataVendor', JSON.stringify(param));
                                                    navigation.navigate("Loading", { redirect: 'ProductDetailNew', param: param });
                                                    //console.log('dataVendor', JSON.stringify(data));
                                                    //this.props.navigation.navigate('ProductDetailNew', { slug: item.slug_product, product_type: 'general' });
                                                }}>

                                                <View
                                                // onStartShouldSetResponder={() => {
                                                //     console.log('dataVendor', JSON.stringify(data));
                                                //     this.props.navigation.navigate('ProductDetailNew', { slug: item.slug_product, product_type: 'general' });
                                                // }

                                                // }
                                                >
                                                    <Text body2 bold>{item.product_name}</Text>
                                                    <Text captio1>Tukarkan pada {item.valid_end}</Text>

                                                    <View style={{ flexDirection: 'column' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            {this.slug(item.tag)}
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>


                                        </View>
                                    </View>


                                </View>

                            )}


                        />
                    </View>
                }



            </View>



        );
    }
}
