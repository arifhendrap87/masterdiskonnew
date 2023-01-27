import React, { Component, useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    Linkings,
    Alert,
    Platform,
    StatusBar,
    Dimensions,
    ImageBackground
} from "react-native";
import {
    Text,
    SafeAreaView,
    Header,
    Image,
    Icon,
    Tag,
    FormOption,
    Button
} from "@components";





import Swiper from 'react-native-swiper'

import { BaseStyle, BaseColor } from "@config";
import * as Utils from "@utils";
import styles from "./styles";

import HeaderHome from "../../components/HeaderHome";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import ProductListCommon from "../../components/ProductList/Common.js";
import ProductListBeauthHealth from "../../components/ProductList/BeautyHealth.js";


import DropdownAlert from 'react-native-dropdownalert';
import { DataMasterDiskon } from "@data";

import ListProductMenu from "../../components/ListProductMenu";
import ListProductTag from "../../components/ListProductTag";
import { useSelector, useDispatch } from 'react-redux';


const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataIcon,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBlog,
    DataMenu,
    DataCard,
    DataPromo
} from "@data";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import NotYetLoginHome from "../../components/NotYetLoginHome";


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


export default function Home2(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    console.log('configApiBooking', JSON.stringify(configApi));
    console.log('userSessionBooking', JSON.stringify(userSession));
    console.log('loginBooking', JSON.stringify(login));
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [dataPromo] = useState(DataPromo);
    const [visible, setVisible] = useState(false);
    const [linkUpdate, setLinkUpdate] = useState('');
    const [versionInName, setVersionInName] = useState('');

    // const { heightHeader, login, dataCard } = this.state;
    const [dataCard] = useState(DataCard);
    const [heightHeader, setheightHeader] = useState(Utils.heightHeader());
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    const [heightImageBanner] = useState(Utils.scaleWithPixel(300, 1));
    const marginTopBanner = heightImageBanner - heightHeader;



    async function checkVersion() {
        let config = configApi;
        console.log('config', JSON.stringify(config));
        console.log('Platform', Platform.OS);
        if (Platform.OS == "android") {
            //config.from = 'android';
            //AsyncStorage.setItem('config', JSON.stringify(config));
            if (parseInt(dataMasterDiskon.versionInPlayStore) < parseInt(config.versionInPlayStore)) {
                setVisible(true);
                setLinkUpdate('http://onelink.to/9gdqsj');
                setVersionInName(config.versionInPlayStoreName);
            }
        } else {
            if (parseInt(dataMasterDiskon.versionInAppStore) < parseInt(config.versionInAppStore)) {
                setVisible(true);
                setLinkUpdate('http://onelink.to/9gdqsj');
                setVersionInName(config.versionInAppStoreName);

            }

        }



    }


    return (



        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
            forceInset={{ top: "always" }}
        >


            <HeaderHome
                title={
                    userSession == null ?
                        'Hey, Mau Kemana ?' : userSession.fullname
                }
                // renderRight={() => {
                //     return (
                //         this.state.login ?
                //         <Icon
                //             name="bell"
                //             size={20}
                //             color={BaseColor.whiteColor}
                //         />
                //         :
                //         <View />

                //     );
                // }}

                onPressRight={() => {
                    var redirect = 'Notification';
                    var param = {}
                    navigation.navigate(redirect);
                }}
            />



            <ScrollView
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: { y: this._deltaY }
                        }
                    }
                ])}
                onContentSizeChange={() => { }
                    // setheigt
                    // this.setState({
                    //     heightHeader: Utils.heightHeader()
                    // })
                }
                scrollEventThrottle={8}
                style={{ marginBottom: 0 }}
            >

                <View style={{ marginTop: 0 }}>

                    <View style={{
                        width: "100%",
                        height: Utils.scaleWithPixel(50),
                        justifyContent: "flex-end",
                    }}>
                        <Swiper
                            dotStyle={{
                                backgroundColor: BaseColor.textSecondaryColor
                            }}
                            activeDotColor={BaseColor.primaryColor}
                            paginationStyle={styles.contentPage}
                            removeClippedSubviews={false}
                        >
                            {dataPromo.map((item, index) => {
                                return (
                                    <Image
                                        source={{ uri: item.img_featured_url }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: '#00b9df',
                                        }}
                                        resizeMode="contain"
                                        key={index}
                                    />
                                );
                            })}
                        </Swiper>
                    </View>


                    <View
                        style={{
                            // marginTop:0,
                            width: '100%',
                            alignSelf: 'center',
                            backgroundColor: BaseColor.primaryColor,
                            paddingVertical: 20
                        }}
                    >

                        <ListProductMenu navigation={navigation} />
                    </View>

                    <View
                        style={styles.cardGroup}
                    >
                        <CardCustomTitle
                            style={{ marginLeft: 20 }}
                            title={'Swipe Left To Discover More'}
                            desc={''}
                            more={''}
                            onPress={() => { }
                            }
                        />
                        <ListProductTag navigation={navigation} />
                    </View>

                    <ProductListCommon navigation={navigation} slug={'hotels'} title={'Sepuluh kota terbaik'} />
                    <ProductListCommon navigation={navigation} slug={'flights'} title={'Penerbangan terpopular'} />
                    <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'} />
                    <ProductListCommon navigation={navigation} slug={'tours'} title={'Tours'} />
                    <ProductListCommon navigation={navigation} slug={'beauty-health'} title={'Beauty & health'} />
                    <ProductListCommon navigation={navigation} slug={'fandb'} title={'FB'} />
                    <ProductListCommon navigation={navigation} slug={'gift-vouchers'} title={'Gift Vouchers'} />
                    <ProductListCommon navigation={navigation} slug={'entertainment'} title={'Entertainment'} />
                    {/* <ProductListCommon navigation={navigation} slug={'flight'} title={'Flight'}/> */}


                    {/* <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'}/>
                        <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'}/> */}

                    {/* <ProductListTravelDeals navigation={navigation} /> */}
                    <ProductListBeauthHealth navigation={navigation} />
                    <ProductListBeauthHealth navigation={navigation} />












                    {
                        dataCard.length != 0 ?
                            <View style={styles.cardGroup}>
                                <CardCustomTitle
                                    style={{ marginLeft: 20 }}
                                    title={'Koleksi Untuk Kamu'}
                                    desc={''}
                                    more={''}
                                    onPress={() =>
                                        navigation.navigate("Activities")
                                    }
                                />
                                <FlatList

                                    numColumns={2}
                                    columnWrapperStyle={{
                                        flex: 1,
                                        justifyContent: 'space-evenly',
                                        marginBottom: 10
                                    }}
                                    style={{ marginHorizontal: 20 }}
                                    data={dataCard}
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

                                        <CardCustom
                                            propImage={{ height: wp("20%"), url: item.img_featured_url }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propPrice={{ price: 0, startFrom: false }}
                                            propPriceCoret={{ price: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0, priceDisc: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0, discount: 0, discountView: false }}

                                            propInframe={{ top: item.product_discount, bottom: '' }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propStar={{ rating: '', enabled: false }}
                                            propLeftRight={{ left: '', right: '' }}
                                            onPress={() =>
                                                navigation.navigate("ProductDetailNew", { product: item, product_type: 'hotelpackage' })
                                            }
                                            loading={false}
                                            propOther={{ inFrame: true, horizontal: false, width: (width - 50) / 2 }}
                                            propIsCampaign={item.product_is_campaign}
                                            propPoint={0}

                                            style={[
                                                index % 2 ? { marginLeft: 10 } : {}
                                            ]
                                            }
                                        />
                                    )}


                                />
                            </View>
                            :
                            <View></View>
                    }



                    {
                        dataCard.length != 0 ?
                            <View style={styles.cardGroup}>
                                <CardCustomTitle
                                    style={{ marginLeft: 20 }}
                                    title={'Koleksi Untuk Kamu'}
                                    desc={''}
                                    more={''}
                                    onPress={() =>
                                        navigation.navigate("Activities")
                                    }
                                />
                                <FlatList

                                    // numColumns={2}
                                    // columnWrapperStyle={{
                                    //     flex: 1,
                                    //     justifyContent: 'space-evenly',
                                    //     marginBottom:10
                                    // }}
                                    style={{ marginHorizontal: 20 }}
                                    data={dataCard}
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

                                        <CardCustom
                                            propImage={{ height: wp("20%"), url: item.img_featured_url }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propPrice={{ price: 0, startFrom: false }}
                                            propPriceCoret={{ price: priceSplitter(item.product_price_correct), priceDisc: priceSplitter(item.product_price), discount: 0, discountView: false }}

                                            propInframe={{ top: item.product_discount, bottom: '' }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propStar={{ rating: '', enabled: false }}
                                            propLeftRight={{ left: '', right: '' }}
                                            onPress={() =>
                                                navigation.navigate("ProductDetailNew", { product: item, product_type: 'hotelpackage' })
                                            }
                                            loading={false}
                                            propOther={{ inFrame: false, horizontal: false, width: '100%' }}
                                            propIsCampaign={item.product_is_campaign}
                                            propPoint={0}

                                            style={[
                                                //index % 2 ? { marginLeft: 15 } : {}
                                                { marginBottom: 10 }
                                            ]
                                            }
                                        />
                                    )}


                                />
                            </View>
                            :
                            <View></View>
                    }


                    {
                        dataCard.length != 0 ?
                            <View style={styles.cardGroup}>
                                <CardCustomTitle
                                    style={{ marginLeft: 20 }}
                                    title={'Eat & Treaths with Ecard'}
                                    desc={''}
                                    more={''}
                                    onPress={() =>
                                        navigation.navigate("Activities")
                                    }
                                />
                                <FlatList
                                    //    horizontal={true}
                                    //    showsHorizontalScrollIndicator={false}
                                    style={{ marginHorizontal: 20 }}
                                    data={dataCard}
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

                                        <CardCustom
                                            propImage={{ height: wp("20%"), url: item.img_featured_url }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propPrice={{ price: 0, startFrom: false }}
                                            propPriceCoret={{ price: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0, priceDisc: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0, discount: 0, discountView: false }}

                                            propInframe={{ top: item.product_discount, bottom: '' }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: item.vendor.display_name }}
                                            propStar={{ rating: '', enabled: false }}
                                            propLeftRight={{ left: item.city.city_name, right: '' }}
                                            onPress={() =>
                                                navigation.navigate("ProductDetailNew", { product: item, product_type: 'hotelpackage' })
                                            }
                                            loading={false}
                                            propOther={{ inFrame: true, width: width }}
                                            propIsCampaign={item.product_is_campaign}
                                            propPoint={0}

                                            style={
                                                [
                                                    // index == 0
                                                    //     ? { marginLeft: 20,marginRight:10 }
                                                    //     : { marginRight: 10 }
                                                    { marginBottom: 10 }
                                                ]

                                            }
                                            sideway={true}
                                        />
                                    )}


                                />
                            </View>
                            :
                            <View></View>
                    }
                </View>
            </ScrollView>
            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
        </SafeAreaView>
    );

}
