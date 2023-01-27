import React,{useState,useEffect} from "react";
import {
    View,
    ScrollView,
    Animated,
    FlatList,
    AsyncStorage,
    Alert,
    Platform,
    Dimensions,
} from "react-native";
import {
    SafeAreaView,
    Image,
    HeaderHome,
    CardCustom,
    CardCustomTitle,
    ProductListCommon,
    ProductListBeauthHealth,
    ListProductMenu,
    ListProductTag
} from "@components";
import {useDispatch} from 'react-redux';


import Swiper from 'react-native-swiper'
import { BaseStyle, BaseColor} from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';
import {DataMasterDiskon} from "@data";


const {height, width} = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

import {
    DataConfig,
    DataCard,
    DataPromo
} from "@data";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";

export default function NewHome({navigation}) {

    const [state,setState]=useState({
            DataPromo:DataPromo,
            DataCard:DataCard,
            DataMasterDiskon:DataMasterDiskon[0],
            login:false,
            heightHeader: Utils.heightHeader(),
            config:DataConfig,
            loading_dashboard:true,
            userSession:null,
            key:'masdis'

    })
    const dispatch = useDispatch();

    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    const heightImageBanner = Utils.scaleWithPixel(300, 1);
    const marginTopBanner = heightImageBanner - state.heightHeader;


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         DataPromo:DataPromo,
    //         DataCard:DataCard,
    //         DataMasterDiskon:DataMasterDiskon[0],
    //         login:false,
            
    //         heightHeader: Utils.heightHeader(),
    //         config:DataConfig,
    //         loading_dashboard:true,
    //         userSession:null,
    //         key:'masdis'
            
    //     };
    //     this._deltaY = new Animated.Value(0);
    //     this.getSession();

    // }

    useEffect(()=>{
        // StatusBar.setBackgroundColor(this.props.color, true)
        checkVersion();
    })
   
    

    const checkVersion=()=>{
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                console.log('versionPublish',config.versionPublish);
                console.log('versionApp',state.DataMasterDiskon.versionApp);
                console.log('Platform',Platform.OS);
                //if(Platform.OS=="android"){
                    if(parseInt(state.DataMasterDiskon.versionApp) < parseInt(config.versionPublish))
                    {
                        console.log('update');
                        Alert.alert(
                            'Versi baru telah tersedia',
                            'Silakan memperbarui aplikasi masterdiskon untuk menikmati fitur baru dan pengalaman aplikasi yang lebih baik',
                            [
                                { text: "Tutup Peringatan", onPress: () => null}
                              ], 
                              { cancelable: false }
                            );
                        
                    }
                //}

            }
        });
   
    }
    
   
    return (
           

                
                <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
                >
                
                
                <HeaderHome
                        title={
                            state.userSession==null ?
                            'Hey, Mau Kemana ?' : state.userSession.fullname
                        }
                        // renderRight={() => {
                        //     return (
                        //         state.login ?
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
                            var redirect='Notification';
                            var param={}
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
                            setState({
                                ...state,
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                        style={{marginBottom:0}}
                    >

                        <View style={{marginTop:0}}>

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
                                       {state.DataPromo.map((item, index) => {
                                           return (
                                               <Image
                                                   source={{uri :item.img_featured_url}}
                                                   style={{width: "100%",
                                                   height: "100%",
                                                   backgroundColor:'#00b9df',
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
                                width:'100%',
                                alignSelf: 'center',
                                backgroundColor:BaseColor.primaryColor,
                                paddingVertical:20
                                }}
                                >
                                
                                <ListProductMenu navigation={navigation}/>
                            </View>

                            <View 
                                style={styles.cardGroup}
                                >
                                <CardCustomTitle 
                                            style={{marginLeft:20}} 
                                            title={'Swipe Left To Discover More'} 
                                            desc={''}  
                                            more={state.more_product_activities}
                                            onPress={() =>
                                                {}
                                            }
                                        />
                                <ListProductTag navigation={navigation}/>
                            </View>
                           
                            {/* <ProductListCommon navigation={navigation} slug={'hotels'} title={'Sepuluh kota terbaik'}/> */}
                            {/* <ProductListCommon navigation={navigation} slug={'flights'} title={'Penerbangan terpopular'}/> */}
                            <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'} paramProduct={{}}/>
                            <ProductListCommon navigation={navigation} slug={'tours'} title={'Tours'} paramProduct={{}}/>
                            <ProductListCommon navigation={navigation} slug={'beauty-health'} title={'Beauty & health'} paramProduct={{}}/>
                            <ProductListCommon navigation={navigation} slug={'fandb'} title={'FB'} paramProduct={{}}/>
                            <ProductListCommon navigation={navigation} slug={'gift-vouchers'} title={'Gift Vouchers'} paramProduct={{}}/>
                            <ProductListCommon navigation={navigation} slug={'entertainment'} title={'Entertainment'} paramProduct={{}}/>


                            {/* <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'}/>
                            <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'}/> */}
                           
                            {/* <ProductListTravelDeals navigation={navigation} /> */}
                            <ProductListBeauthHealth navigation={navigation} />
                            <ProductListBeauthHealth navigation={navigation} />

                                {   
                                    DataCard.length != 0 ?
                                    <View style={styles.cardGroup}>
                                        <CardCustomTitle 
                                            style={{marginLeft:20}} 
                                            title={'Koleksi Untuk Kamu'} 
                                            desc={''}  
                                            more={state.more_product_activities}
                                            onPress={() =>
                                                navigation.navigate("Activities")
                                            }
                                        />
                                        <FlatList
                                               
                                                numColumns={2}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: 'space-evenly',
                                                    marginBottom:10
                                                }}
                                                style={{marginHorizontal:20}}
                                                data={DataCard}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                  removeClippedSubviews={true} // Unmount components when outside of window 
                                                  initialNumToRender={2} // Reduce initial render amount
                                                  maxToRenderPerBatch={1} // Reduce number in each render batch
                                                  maxToRenderPerBatch={100} // Increase time between renders
                                                  windowSize={7} // Reduce the window size
                                                  renderItem={({ item,index }) => (

                                                    <CardCustom
                                                        propImage={{height:wp("20%"),url:item.img_featured_url}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propPrice={{price:0,startFrom:false}}
                                                        propPriceCoret={{price:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0,priceDisc:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0,discount:0,discountView:false}}

                                                        propInframe={{top:item.product_discount,bottom:''}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propStar={{rating:'',enabled:false}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("ProductDetailNew",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={false}
                                                        propOther={{inFrame:true,horizontal:false,width:(width - 50) / 2}}
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
                                            style={{marginLeft:20}} 
                                            title={'Koleksi Untuk Kamu'} 
                                            desc={''}  
                                            more={state.more_product_activities}
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
                                                style={{marginHorizontal:20}}
                                                data={DataCard}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                  removeClippedSubviews={true} // Unmount components when outside of window 
                                                  initialNumToRender={2} // Reduce initial render amount
                                                  maxToRenderPerBatch={1} // Reduce number in each render batch
                                                  maxToRenderPerBatch={100} // Increase time between renders
                                                  windowSize={7} // Reduce the window size
                                                  renderItem={({ item,index }) => (

                                                    <CardCustom
                                                        propImage={{height:wp("20%"),url:item.img_featured_url}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propPrice={{price:0,startFrom:false}}
                                                        propPriceCoret={{price:priceSplitter(item.product_price_correct),priceDisc:priceSplitter(item.product_price),discount:0,discountView:false}}

                                                        propInframe={{top:item.product_discount,bottom:''}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propStar={{rating:'',enabled:false}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("ProductDetailNew",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={false}
                                                        propOther={{inFrame:false,horizontal:false,width:'100%'}}
                                                        propIsCampaign={item.product_is_campaign}
                                                        propPoint={0}

                                                        style={[
                                                            //index % 2 ? { marginLeft: 15 } : {}
                                                            {marginBottom:10}
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
                                            style={{marginLeft:20}} 
                                            title={'Eat & Treaths with Ecard'} 
                                            desc={''}  
                                            more={state.more_product_activities}
                                            onPress={() =>
                                                navigation.navigate("Activities")
                                            }
                                        />
                                        <FlatList
                                            //    horizontal={true}
                                            //    showsHorizontalScrollIndicator={false}
                                                style={{marginHorizontal:20}}
                                                data={DataCard}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                  removeClippedSubviews={true} // Unmount components when outside of window 
                                                  initialNumToRender={2} // Reduce initial render amount
                                                  maxToRenderPerBatch={1} // Reduce number in each render batch
                                                  maxToRenderPerBatch={100} // Increase time between renders
                                                  windowSize={7} // Reduce the window size
                                                renderItem={({ item,index }) => (

                                                    <CardCustom
                                                        propImage={{height:wp("20%"),url:item.img_featured_url}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propPrice={{price:0,startFrom:false}}
                                                        propPriceCoret={{price:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0,priceDisc:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0,discount:0,discountView:false}}

                                                        propInframe={{top:item.product_discount,bottom:''}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:item.vendor.display_name}}
                                                        propStar={{rating:'',enabled:false}}
                                                        propLeftRight={{left:item.city.city_name,right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("ProductDetailNew",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={false}
                                                        propOther={{inFrame:true,width:width}}
                                                        propIsCampaign={item.product_is_campaign}
                                                        propPoint={0}       

                                                        style={
                                                        [
                                                            // index == 0
                                                            //     ? { marginLeft: 20,marginRight:10 }
                                                            //     : { marginRight: 10 }
                                                            {marginBottom:10}
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
