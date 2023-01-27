import React, { Component } from "react";
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


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


export default class Other extends Component {

    constructor(props) {
        super(props);


        console.log('DataCard', JSON.stringify(DataCard));


        this.state = {
            DataPromo: DataPromo,
            DataCard: DataCard,
            DataMasterDiskon: DataMasterDiskon[0],
            login: false,

            heightHeader: Utils.heightHeader(),
            config: DataConfig,
            loading_dashboard: true,

            userSession: null,
            key: 'masdis'

        };
        this._deltaY = new Animated.Value(0);


        this.getSession();

    }

    //memanggil config
    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }

    //memanggil session
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('userSessions', JSON.stringify(userSession));

                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }


    checkVersion() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                console.log('versionPublish', config.versionPublish);
                console.log('versionApp', this.state.DataMasterDiskon.versionApp);
                console.log('Platform', Platform.OS);
                //if(Platform.OS=="android"){
                if (parseInt(this.state.DataMasterDiskon.versionApp) < parseInt(config.versionPublish)) {
                    console.log('update');
                    Alert.alert(
                        'Versi baru telah tersedia',
                        'Silakan memperbarui aplikasi masterdiskon untuk menikmati fitur baru dan pengalaman aplikasi yang lebih baik',
                        [
                            { text: "Tutup Peringatan", onPress: () => null }
                        ],
                        { cancelable: false }
                    );

                }
                //}

            }
        });

    }
    componentDidMount() {
        StatusBar.setBackgroundColor(this.props.color, true)
        const { navigation } = this.props;
        this.checkVersion();
    }



    renderItemEvent(item, index) {
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
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
                    navigation.navigate("ProductDetail", { product: item, product_type: 'hotelpackage' })
                }
                loading={false}
                propOther={{ inFrame: false, horizontal: false, width: itemWidth }}
                propIsCampaign={item.product_is_campaign}
                propPoint={0}

                style={[
                    index == 0
                        ? { marginHorizontal: 20 }
                        : { marginRight: 20 }
                ]}
            />
        );

    }

    // getCategory(){
    //     AsyncStorage.getItem('config', (error, result) => {
    //         if (result) {    
    //             let config = JSON.parse(result);
    //             var url=config.apiBaseUrlDev+"product/category";

    //             var myHeaders = new Headers();
    //             myHeaders.append("Authorization", "Bearer "+config.apiToken);

    //             var requestOptions = {
    //             method: 'GET',
    //             headers: myHeaders,
    //             redirect: 'follow'
    //             };

    //             fetch(url, requestOptions)
    //              .then(response => response.json())
    //             .then(result => {
    //                 console.log('iconsss',JSON.stringify(result.data));
    //                 //this.setState({icons:result.data});

    //                 var category=this.rebuild(result.data);
    //                 console.log('category',JSON.stringify(category));
    //                 this.setState({icons:category});
    //                 this.setState({loading:false});
    //             })
    //             .catch(error => {alert('Kegagalan Respon Server')});
    //         }
    //     });
    // }


    // rebuild(listdata){
    //     var listdata_new = [];
    //     var a=1;
    //     listdata.map(item => {
    //         var obj = {};

    //         obj['id_product_category'] = item.id_product_category;
    //         obj['icon_product_category'] = item.icon_product_category;
    //         obj['code_product_category'] = item.code_product_category;
    //         obj['name_product_category'] = item.name_product_category;
    //         obj['slug_product_category'] = item.slug_product_category;
    //         obj['status'] = item.status;
    //         obj['img'] = 'https://masterdiskon.com/assets/icon/original/prdt/icon-apss-0'+item.id_product_category+'.png';

    //         listdata_new.push(obj);
    //         a++;
    //     });

    //    return listdata_new;
    // }


    render() {

        const { navigation } = this.props;
        const { heightHeader, login, DataCard } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const heightImageBanner = Utils.scaleWithPixel(300, 1);
        const marginTopBanner = heightImageBanner - heightHeader;



        return (



            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >


                <HeaderHome
                    title={
                        this.state.userSession == null ?
                            'Hey, Mau Kemana ?' : this.state.userSession.fullname
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
                    onContentSizeChange={() =>
                        this.setState({
                            heightHeader: Utils.heightHeader()
                        })
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
                                {this.state.DataPromo.map((item, index) => {
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
                                more={this.state.more_product_activities}
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
                            DataCard.length != 0 ?
                                <View style={styles.cardGroup}>
                                    <CardCustomTitle
                                        style={{ marginLeft: 20 }}
                                        title={'Koleksi Untuk Kamu'}
                                        desc={''}
                                        more={this.state.more_product_activities}
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
                                        data={DataCard}
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
                            DataCard.length != 0 ?
                                <View style={styles.cardGroup}>
                                    <CardCustomTitle
                                        style={{ marginLeft: 20 }}
                                        title={'Koleksi Untuk Kamu'}
                                        desc={''}
                                        more={this.state.more_product_activities}
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
                                        data={DataCard}
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
                            DataCard.length != 0 ?
                                <View style={styles.cardGroup}>
                                    <CardCustomTitle
                                        style={{ marginLeft: 20 }}
                                        title={'Eat & Treaths with Ecard'}
                                        desc={''}
                                        more={this.state.more_product_activities}
                                        onPress={() =>
                                            navigation.navigate("Activities")
                                        }
                                    />
                                    <FlatList
                                        //    horizontal={true}
                                        //    showsHorizontalScrollIndicator={false}
                                        style={{ marginHorizontal: 20 }}
                                        data={DataCard}
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
}
