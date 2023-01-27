import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,ScrollView,Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort,Text,Tag} from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import {PostData} from '../../services/PostData';
import {AsyncStorage} from 'react-native';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";
  const {height, width} = Dimensions.get('window');
  const itemWidth = (width - 30) / 2;

// Load sample data
import {DataLoading,DataConfig,DataHotelPackage,DataTrip} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import DataEmpty from "../../components/DataEmpty";

export default class HotelByFilter extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.id_country){
            id_country=this.props.navigation.state.params.id_country;
        }else{
            id_country='';
        }

        var id_city='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.id_city){
            id_city=this.props.navigation.state.params.id_city;
        }else{
            id_city='';
        }

        var city_name='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.city_name){
            city_name=this.props.navigation.state.params.city_name;
        }else{
            city_name='';
        }

        var detail_category='';
        if(this.props.navigation.state.params && this.props.navigation.state.params.detail_category){
            detail_category=this.props.navigation.state.params.detail_category;
        }else{
            detail_category='';
        }
        
        
        var filterTitle='';
        if(city_name !=''){
            filterTitle=city_name;
        }

        

        

        this.state = {
            id_country:id_country,
            id_city:id_city,
            city_name:city_name,
            filterTitle:filterTitle,
            detail_category:detail_category,
            listdata_product_hotel_package:DataHotelPackage,
            listdata_product_hotel_package_original:DataHotelPackage,
            config:DataConfig,
            place_city: [
                { id: "Badung", name: "Badung"},
                { id: "Gianyar", name: "Giianyar" },
                { id: "Malang", name: "Malang" },
                { id: "Bandung", name: "Bandung" },
            ],
            loading_hotel_package_city:true
        };
        this.getConfig();

    }
    
    getConfig(){
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {    
                let config = JSON.parse(result);
                ////console.log('getConfig',config);
                this.setState({config:config});
            }
        });
    }

    getProductHotelPackageCity(){
        const {config} =this.state;
        
        this.setState({loading_hotel_package_city: true }, () => {
            var url=config.baseUrl;
            var path=config.common_city_hotel_package.dir;
            var paramUrl={}
                    
                    
            console.log(url,path,paramUrl);
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
         
            fetch(url+path, param)
            .then(response => response.json())
            .then(result => {
                this.setState({loading_hotel_package_city: false });
                this.setState({list_hotel_package_city: result});
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server');
            });



        });
    }
    
    
    getProductHotelPackage(){
        const {config} =this.state;
        
        this.setState({ loading_product_hotel_package: true }, () => {
            var url=config.baseUrl;
            var path=config.product_hotel_package.dir;
            var paramUrl={"param":{
                        "id_country":this.state.id_country,
                        "id_city":this.state.id_city,
                        "id_hotelpackage":"",
                        "detail_category":this.state.detail_category,
                        "search":"",
                        "limit":""
                        }}
                    
                    
            console.log(url,path,paramUrl);
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramUrl),
              }
          

                fetch(url+path, param)
                .then(response => response.json())
                .then(result => {
                    this.setState({loading_product_hotel_package: false });
                    this.setState({listdata_product_hotel_package: result});
                    this.setState({listdata_product_hotel_package_original: result});
                })
                .catch(error => {alert('Kegagalan Respon Server')});
                

        });
    }

    onSelectCity(select) {
        this.setState({listdata_product_hotel_package:this.state.listdata_product_hotel_package_original});
        this.setState({
            place_city: this.state.place_city.map(item => {
                if (item.id == select.id) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }
            })
        });
        
        setTimeout(() => {
        const filters = {
            product_place_2: product_place_2 => product_place_2 === select.id,
          };
        var products=this.state.listdata_product_hotel_package;
        const filtered=this.filterArray(products, filters);
        this.setState({listdata_product_hotel_package: filtered});
        }, 50);
    }

    filterArray(array, filters) {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
          });
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.getProductHotelPackage();
            this.getProductHotelPackageCity();
        }, 50);
    }


    renderItem(item,index) {
        const { navigation } = this.props;
        const { config,param} = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                                                        propImage={{height:wp("30%"),url:item.img_featured_url}}
                                                        propInframe={{top:item.product_place,bottom:item.product_cat}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:''}}
                                                        propPrice={{price:priceSplitter(item.product_price),startFrom:true}}
                                                        propPriceCoret={{price:priceSplitter(item.product_price_correct),discount:priceSplitter(item.product_discount),discountView:true}}

                                                        propStar={{rating:item.product_rate,enabled:true}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("ProductDetail",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={this.state.loading_product_hotel_package}
                                                        propOther={{inFrame:true,horizontal:false,width:(width - 50) / 2}}
                                                        propIsCampaign={item.product_is_campaign}
                                                        propPoint={item.product_point}

                                                        style={[
                                                            index % 2 ? { marginLeft: 10 } : {}
                                                        ]
                                                        }
                                                    />
        );
    }


    renderContent() {
        const { config} = this.state;
        const { navigation } = this.props;
    
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

      
                return (
                                <View style={{marginTop:10}}>

                                {   
                                    this.state.listdata_product_hotel_package.length != 0 ?
                                    <View style={{flex:1}}>
                                        <FlatList
                                                numColumns={2}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: 'space-evenly',
                                                    marginBottom:10
                                                }}
                                                style={{marginHorizontal:20}}
                                                //horizontal={false}
                                                data={this.state.listdata_product_hotel_package}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}

                                                removeClippedSubviews={true} // Unmount components when outside of window 
                                                initialNumToRender={2} // Reduce initial render amount
                                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                                maxToRenderPerBatch={1000} // Increase time between renders
                                                windowSize={7} // Reduce the window size

                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                onScrollEndDrag={() => console.log("end")}
                                                onScrollBeginDrag={() => console.log("start")}
                                                onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
                                                renderItem={({ item,index }) => this.renderItem(item,index)}
                                            />
                                    </View>
                                    :
                                    <DataEmpty />
                                    }
                                </View>
                );
            
    }


    render() {
        const { navigation } = this.props;
        const {place_city}=this.state;
        var filterCity=<View></View>
        var filterTitle='';
        if(this.state.filterTitle != ''){
            filterTitle=this.state.filterTitle;
        }

        if(this.state.id_city == ''){
            filterCity=<View style={{flexDirection: "row",paddingTop: 10,paddingBottom: 20}}>
                            <View style={{marginLeft:20}}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={place_city}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    
                                    this.state.loading_hotel_package_city ?
                                    <View style={[{ marginRight: 10, width: 100,height:30 },
                                        {
                                        paddingVertical: 5,
                                        paddingHorizontal: 10,
                                        borderRadius: 17,
                                        backgroundColor: BaseColor.lightPrimaryColor,
                                        borderColor: BaseColor.lightPrimaryColor,
                                        alignItems: "center",
                                        justifyContent: "center"
                                        }
                                    ]}>
                                    </View>
                                    :
                                    <Tag
                                        primary={item.checked}
                                        style={[{ marginRight: 10, width: 100 }]}
                                        outline={!item.checked}
                                        onPress={() =>{
                                            this.onSelectCity(item)
                                        }}
                                    >
                                        {item.name}
                                    </Tag>
                                )}
                            />
                            </View>
                </View>
        }
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Deals"
                    subTitle={filterTitle}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                {filterCity}
                
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
                {this.renderContent()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
