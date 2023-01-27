import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,ScrollView,Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort,Text } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import {AsyncStorage} from 'react-native';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";

// Load sample data
import {DataLoading,DataConfig,DataHotelPackage,DataTrip} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";
import DataEmpty from "../../components/DataEmpty";
const {height, width} = Dimensions.get('window');
const itemWidth = (width - 30) / 2;

export default class Tour extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.navigation.state.params && this.props.navigation.state.params.country){
            country=this.props.navigation.state.params.country;
            id_country=country.id_country;
        }else{
            id_country='';
        }

        this.state = {
            id_country:id_country,
            listdata_product_trip:DataTrip,
            config:DataConfig,
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
    
    
    getProductTrip(){
        const {config} =this.state;
        var url=config.baseUrl;
        var path=config.product_trip.dir;
        this.setState({ loading_product_trip: true }, () => {
            var param={
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
              }
       

            fetch(url+path,param)
                .then(response => response.json())
                .then(result => {

                    //console.log("getProductTripTour",JSON.stringify(result));
                    this.setState({loading_product_trip: false });
                    this.setState({listdata_product_trip: result});
                })
                .catch(error => {

                    alert('Kegagalan Respon Server')
                });
        });
    }


    componentDidMount() {
        setTimeout(() => {
            this.getProductTrip();
        }, 50);
    }


    renderContent() {
        const { config} = this.state;
        const { navigation } = this.props;
        var content=<View></View>
    
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                return (
                    <View style={{marginTop:10}}>

                    {   
                        this.state.listdata_product_trip.length != 0 ?
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
                                    data={this.state.listdata_product_trip}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index }) => (
                                        <CardCustom
                                            propImage={{height:wp("30%"),url:item.img_featured_url}}
                                            propInframe={{top:item.product_place,bottom:item.product_duration}}
                                            propTitle={{text:item.product_name}}
                                            propDesc={{text:''}}
                                            propPrice={{price:priceSplitter(item.product_detail.price),startFrom:false}}
                                            propPriceCoret={{price:'',discount:priceSplitter(item.product_discount),discountView:true}}

                                            
                                            propStar={{rating:10,enabled:false}}
                                            propLeftRight={{left:'',right:''}}
                                            onPress={() =>
                                                            navigation.navigate("TourDetailCustom",{product:item})
                                                        }
                                            loading={this.state.loading_product_trip}
                                            propOther={{inFrame:true,horizontal:false,width:(width - 50) / 2}}
                                            propIsCampaign={item.product_is_campaign}
                                            propPoint={item.product_point}
                                
                                            style={[
                                                index % 2 ? { marginLeft: 10 } : {}
                                            ]
                                            }
                                        />
                                    
                                    )}
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
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Trip"
                    subTitle="Indonesia"
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
