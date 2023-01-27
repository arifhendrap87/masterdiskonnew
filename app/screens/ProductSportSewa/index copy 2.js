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
    FilterSort
} from "@components";
import * as Utils from "@utils";
import FilterSortProduct from "../../components/FilterSortProduct";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";


  


import {
    Placeholder,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";


// Load sample data
import HTML from "react-native-render-html";


import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import ImageSize from 'react-native-image-size';
import Modal from "react-native-modal";

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
    DataBlog,DataMenu,DataCard,DataPromo
} from "@data";


const {height, width} = Dimensions.get('window');
const itemWidth = (width - 30) / 2;


export default class ProductList extends Component {
    constructor(props) {
        super(props);
        
        


     
       

        // var slug={};
        // if(this.props.navigation.state.params && this.props.navigation.state.params.slug){
        //     slug=this.props.navigation.state.params.slug;
        // }else{
        //     slug={};
        // }

        var title={};
        if(this.props.navigation.state.params && this.props.navigation.state.params.title){
            title=this.props.navigation.state.params.title;
        }else{
            title={};
        }
        
        var type="category";
        if(this.props.navigation.state.params && this.props.navigation.state.params.type){
            type=this.props.navigation.state.params.type;
        }else{
            type={};
        }

        var paramPrice='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.paramPrice){
            paramPrice=this.props.navigation.state.params.paramPrice;
        }

        var paramCategory='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.paramCategory){
            paramCategory=this.props.navigation.state.params.paramCategory;
        }

        var paramCity='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.paramCity){
            paramCity=this.props.navigation.state.params.paramCity;
        }

        var paramTag='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.paramTag){
            paramTag=this.props.navigation.state.params.paramTag;
        }

        var paramOrder='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.paramOrder){
            paramOrder=this.props.navigation.state.params.paramOrder;
        }



        this.state = {
            heightHeader: Utils.heightHeader(),
            
            product: DataCard,
            productOriginal:DataCard,
            productTag: [],
            productCity:[],
            loading:true,


            title:title,
            type:type,

            paramPrice:paramPrice,
            paramCategory:paramCategory,
            paramCity:paramCity,
            paramTag:paramTag,
            paramOrder:paramOrder,

           
            

        };
        this._deltaY = new Animated.Value(0);
        this.filterProcess = this.filterProcess.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.sortProcess = this.sortProcess.bind(this);

        this.getConfig();
        this.getSession();

    }

    //memanggil config
    getConfig(){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {    
                    let config = JSON.parse(result);
                    this.setState({config:config});
                }
            });
    }

    componentDidMount(){
        //alert('aasd');
        this.setState({product:DataCard});
        this.getData();
        this.getTag();
        // setTimeout(() => {
        //     
        // }, 50);
        
    }

    getData(){
        const {title,type,paramPrice,paramCategory,paramCity,paramTag,paramOrder}=this.state;

        

        console.log('type',type);

        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                var url=config.apiBaseUrlDev+"product?limit="+paramCategory+paramPrice+paramCity+paramTag+paramOrder;
                console.log('urlgetData',url);
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer "+config.apiToken);

                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                console.log('urll',url,JSON.stringify(requestOptions));
                fetch(url, requestOptions)
                 .then(response => response.json())
                 .then(result => {
                    console.log('productList',JSON.stringify(result.data));
                    
                    //setTimeout(() => {
                        var product=this.rebuild(result.data);
                        //console.log('productNew',JSON.stringify(product));
                    //}, 50);
                   
                    
                    this.setState({product:result.data});
                    this.setState({productOriginal:result.data});

                    var productCity=this.rebuildCity(result.data);
                    this.setState({productCity:productCity});
                    
                    this.setState({loading:false});
                })
                .catch(error => {alert('Kegagalan Respon Serverss')});
            }
        });
    }

    getTag(){
        const {title,type,paramPrice,paramCategory,paramCity,paramTag,paramOrder}=this.state;
        


        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                var url='https://devapi.masterdiskon.com/v1/'+"product?"+paramCategory.replace('&','');
                console.log('urlTag',url);
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer "+config.apiToken);

                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                console.log('urll',url,JSON.stringify(requestOptions));
                fetch(url, requestOptions)
                 .then(response => response.json())
                 .then(result => {
                    console.log('productTag',JSON.stringify(result));
                    //var productTag=result.data;
                    var productTag=this.rebuildTags(result.data);
                    //console.log('productTagNew',JSON.stringify(productTag));
                    this.setState({productTag:productTag});
                    // this.setState({loading:false});
                })
                .catch(error => {alert('Kegagalan Respon Server')});
            }
        });
    }
    

    //memanggil session
    getSession(){    
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {    
                let userSession = JSON.parse(result);
                var id_user=userSession.id_user;
                this.setState({id_user:id_user});
                this.setState({userSession:userSession});
                this.setState({login:true});
            }
        });
    }


    filterProcess(filters)
    {
        //this.onClear();
        
        console.log('filters',JSON.stringify(filters));
        this.setState({loading:true});
        this.setState({paramPrice:filters.paramPrice});
        this.setState({paramCity:filters.paramCity});
        this.setState({paramTag:filters.paramTag});
        this.setState({paramOrder:filters.paramOrder});

        setTimeout(() => {
            this.getData();
        }, 50);
        
        
    }


    onFilter() {
        const { navigation } = this.props;
        const {title,type,paramPrice,paramCategory,paramCity,paramTag,paramOrder}=this.state;

                navigation.navigate("ProductFilter",
                {
                    listdata:this.state.productOriginal,
                    filterProcess: this.filterProcess,
                    productTag:this.state.productTag,
                    productCity:this.state.productCity,
                    

                }
                );
    }

    onClear() {
        this.setState({loading:true});
        this.setState({paramPrice:''});
        this.setState({paramCity:''});
        this.setState({paramTag:''});
        this.setState({paramOrder:''});

        setTimeout(() => {
            this.getData();
        }, 50);
        
    }

    sortProcess(selected)
    {   
        // this.setState({listdata_departure:this.state.listdata_departure_original});
        // setTimeout(() => {
        //     if(selected=='low_price'){
        //         this.sortLowestPrice();

        //     }else if(selected=='hight_price'){
        //         this.sortHightestPrice();

        //     }else if(selected=='early_departure_time'){
        //         this.sortEarlyDepartureTime();

        //     }else if(selected=='end_departure_time'){
        //         this.sortEndDepartureTime();

        //     }else if(selected=='early_arrival_time'){
        //         this.sortEarlyArrivalTime();

        //     }else if(selected=='end_arrival_time'){
        //         this.sortEndArrivalTime();

        //     }else if(selected=='shortest_duration'){
        //         this.sortShortDuration();
        //     }
        // }, 50);
        
    }
    
    rebuildCity(listdata){
        var listdata_new = [];
        
        listdata.map(item => {

            var obj = {};
            obj['id'] = item.city.id_city;
            obj['selected'] = false;
            obj['title'] = item.city.city_name;
            
            if(item.city.city_name != null){
                listdata_new.push(obj);
            }
            

        });
       
        arr = listdata_new.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
        .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
        .reverse().map(JSON.parse) // revert it to original state

       

       return arr;
       //console.log('arrayRemoveDuplicate',JSON.stringify(arr));
    }

   
    
    
    rebuildTags(tags){
        var tags_new = [];
        
        
        
            tags.map(item => {
                var obj = {};
                obj['id'] = item.slug_product_tag;
                obj['selected'] = false;
                obj['title'] = item.name_product_tag;
                
                tags_new.push(obj);
            });
       
    
       return tags_new;
    }

    
    

    rebuild(listdata){
        var listdata_new = [];
        var a=1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;


            
            obj['filter_price'] = item.start_price;
            obj['filter_city'] = item.location;

            
            
            obj['id_product'] = item.id_product;
            obj['product_code'] = item.product_code;
            obj['product_name'] = item.product_name;
            obj['slug_product'] = item.slug_product;
            obj['type'] = item.type;
            obj['address'] = item.address;
            obj['time'] = item.time;
            obj['description'] = item.description;
            obj['include'] = item.include;
            obj['term'] = item.term;
            obj['how_to_redeem'] = item.how_to_redeem;
            obj['cancelation_policy'] = item.cancelation_policy;
            obj['reservation_required'] = item.reservation_required;
            obj['start_date'] = item.start_date;
            obj['end_date'] = item.end_date;
            obj['valid_start'] = item.valid_start;
            obj['valid_end'] = item.valid_end;
            obj['start_price'] = item.start_price;
            obj['img_featured'] = item.img_featured;
            obj['tag'] = item.tag;
            obj['status'] = item.status;
            obj['img_featured_url'] = item.img_featured_url;
            obj['product_detail'] = item.product_detail;
            obj['product_img'] = item.product_img;
            obj['product_category'] = item.product_category;
            obj['vendor'] = item.vendor;
            obj['partner'] = item.partner;
            obj['country'] = item.country;
            obj['province'] = item.province;
            obj['city'] = item.city;
            obj['location'] = item.location;
           
            listdata_new.push(obj);
            a++;
        });

       return listdata_new;
    }
 
    
    render() {
        const { navigation } = this.props;
        const { product,loading,title} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

       
        

        

        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                    forceInset={{ top: "always" }}
                >
                <Header
                    title={title}
                    // subTitle="24 Dec 2018, 2 Nights, 1 Room"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="search"
                    //             size={20}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                
                <FilterSortProduct
                        onFilter={this.onFilter}
                        onClear={this.onClear}
                        sortProcess={this.sortProcess}
                        style={{marginHorizontal:20}}
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
                    >

                                {   
                                    DataCard.length != 0 ?
                                    <View style={styles.cardGroup}>
                                        
                                        <FlatList
                                            //    horizontal={true}
                                            //    showsHorizontalScrollIndicator={false}
                                                style={{marginHorizontal:20}}
                                                data={product}
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
                                                        propPrice={{price:1,startFrom:false}}
                                                        propPriceCoret={{price:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0,priceDisc:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0,discount:0,discountView:false}}

                                                        propInframe={{top:item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].discount)+' %' : '',bottom:''}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:item.vendor.display_name}}

                                                        propStar={{rating:'',enabled:false}}
                                                        propLeftRight={{left:item.city.city_name+','+item.province.province_name,right:''}}
                                                        onPress={() =>
                                                            {
                                                                navigation.navigate("ProductDetailNew",{slug:item.slug_product})

                                                            }
                                                            //navigation.navigate("ProductDetailNew",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={loading}
                                                        propOther={{inFrame:true,horizontal:false,width:'100%'}}
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
                            

                </ScrollView>
            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    cardGroup:{
        //marginTop:20,
        width:'100%',
        backgroundColor:BaseColor.whiteColor,
        paddingBottom:20
      },
      cardGroupTransparent:{
        marginTop:20,
        width:'100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom:20
      },
});




