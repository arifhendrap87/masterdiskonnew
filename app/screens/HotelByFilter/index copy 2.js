import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,ScrollView,Dimensions,ActivityIndicator} from "react-native";
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


// Load sample data
import {DataLoading,DataConfig,DataHotelPackage,DataTrip} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import DataEmpty from "../../components/DataEmpty";
  const { width, height } = Dimensions.get('window');
export default class Hotel extends Component {
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
            data:DataHotelPackage,
            data_original:DataHotelPackage,
            config:DataConfig,
            place_city: [
                { id: "Badung", name: "Badung"},
                { id: "Gianyar", name: "Giianyar" },
                { id: "Malang", name: "Malang" },
                { id: "Bandung", name: "Bandung" },
            ],
            loading_hotel_package_city:true,

            //data: [],
            page: 1,
            loading: true,
            loadingMore: false,
            filtering: false,
            refreshing: false,
            error: null,
            stop:false
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


    loadProduct = () => {
        const {config,page} =this.state;

        if(page==1){
            this.getProduct();
        }else{
            setTimeout(() => {
                this.getProduct();
            }, 3000);
        }

    }
    
    
    getProduct = () => {
        const {config,page} =this.state;
        //this.setState({ loading_product_hotel_package: true }, () => {
            var url=config.baseUrl;
            var path=config.product_hotel_package.dir;
            var paramUrl={"param":{
                        "id_country":this.state.id_country,
                        "id_city":this.state.id_city,
                        "id_hotelpackage":"",
                        "detail_category":this.state.detail_category,
                        "search":"",
                        "limit":"",
                        //"page":this.state.page
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
                    // this.setState({loading_product_hotel_package: false });
                    // this.setState({data: result});
                    // this.setState({data_original: result});
                    
                        this.setState((prevState, nextProps) => ({
                            data:
                              page === 1
                                ? Array.from(result)
                                : [...this.state.data, ...result],
                            loading: false
                        }));
                 
                    
    
                })
                .catch(error => {alert('Kegagalan Respon Server')});
                

        //});
    };

    _handleRefresh = () => {
        this.setState(
          {
            page: 1,
            refreshing: true
          },
          () => {
            this.loadProduct();
          }
        );
      };
    

      _handleLoadMore = () => {
        this.setState(
          (prevState, nextProps) => ({
            page: prevState.page + 1,
            loadingMore: true
          }),
          () => {
            this.loadProduct();
          }
        )
      };
    
      _renderFooter = () => {
        if (!this.state.loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
              width: width,
              height: height,
              paddingVertical: 20,
              //borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
              //borderColor: colors.veryLightPink
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };


    onSelectCity(select) {
        this.setState({data:this.state.data_original});
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
        var products=this.state.data;
        const filtered=this.filterArray(products, filters);
        this.setState({data: filtered});
        }, 10);
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
            this.getProduct();
            this.getProductHotelPackageCity();
        }, 50);
    }

    renderItem(item) {
        const { navigation } = this.props;
        const { config,param} = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                                                        propImage={{height:wp("30%"),url:item.img_featured_url}}
                                                        propInframe={{top:item.product_place,bottom:item.product_cat}}
                                                        propTitle={{text:item.product_name}}
                                                        propDesc={{text:item.product_desc}}
                                                        propPrice={{price:priceSplitter(item.product_price),startFrom:true}}
                                                        propStar={{rating:item.product_rate,enabled:true}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("ProductDetail",{product:item,product_type:'hotelpackage'})
                                                        }
                                                        loading={false}
                                                        propOther={{inFrame:true,horizontal:false,width:wp("45%")}}
                                                        style={
                                                            {marginLeft:15,marginBottom: 15}
                                                        }
                                                    />
        );
    }

   


    renderContent() {
        const { config} = this.state;
        const { navigation } = this.props;
    
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

      
                return (
                                <View style={{}}>

                                {   
                                    !this.state.loading ?
                                    <View style={{flex:1}}>
                                        <FlatList
                                                columnWrapperStyle={{ marginBottom: 10 }}
                                                numColumns={2}
                                                //horizontal={false}
                                                data={this.state.data}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}


                                               

                                                // ListHeaderComponent={this._renderHeader}
                                                // ListFooterComponent={this._renderFooter}
                                                // onRefresh={this._handleRefresh}
                                                // refreshing={this.state.refreshing}
                                                // onEndReached={this._handleLoadMore}
                                                // onEndReachedThreshold={0.5}
                                                // initialNumToRender={10}


                                                removeClippedSubviews={true} // Unmount components when outside of window 
                                                initialNumToRender={2} // Reduce initial render amount
                                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                                maxToRenderPerBatch={100} // Increase time between renders
                                                windowSize={7} // Reduce the window size
                                                onScrollEndDrag={() => console.log("end")}
    onScrollBeginDrag={() => console.log("start")}

                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                renderItem={({ item }) => this.renderItem(item)}

                                                  
                                                renderItem={({ item }) => this.renderItem(item)}
                                            />
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ alignSelf: 'center' }}>Loading beers</Text>
                                        <ActivityIndicator />
                                    </View>
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
                                color={BaseColor.primaryColor}
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
