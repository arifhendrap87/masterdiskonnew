import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,ScrollView,Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort,Text } from "@components";
// import styles from "./styles";
import * as Utils from "@utils";
import {AsyncStorage} from 'react-native';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from "react-native-responsive-screen";

import { StyleSheet } from "react-native";
const {height, width} = Dimensions.get('window');
const itemWidth = (width - 30) / 2;


// Load sample data
import {DataLoading,DataConfig,DataHotelPackage,DataTrip,DataHotelPackageCity} from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import DataEmpty from "../../components/DataEmpty";

export default class HotelCity extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            config:DataConfig,
            list_hotel_package_city:DataHotelPackageCity
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
    
    
    fetch(){
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


    componentDidMount() {
       
        setTimeout(() => {
            this.fetch();
    }, 50);
    }


    renderItem(item,index) {
        const { navigation } = this.props;
        const { config,param} = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <CardCustom
                                                        propImage={{height:wp("30%"),url:item.img_featured_url}}
                                                        propInframe={{top:'',bottom:item.city_name}}
                                                        propTitle={{text:''}}
                                                        propDesc={{text:''}}
                                                        propPrice={{price:'',startFrom:false}}
                                                        propStar={{rating:''.stars,enabled:false}}
                                                        propLeftRight={{left:'',right:''}}
                                                        onPress={() =>
                                                            navigation.navigate("Hotel",{id_city:item.id_city,city_name:item.city_name})
                                                        }
                                                        loading={this.state.loading_hotel_package_city}
                                                        propOther={{inFrame:false,horizontal:false,width:(width - 50) / 2}}
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
                                <View style={{marginVertical:10}}>

                                {   
                                    this.state.list_hotel_package_city.length != 0 ?
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
                                                data={this.state.list_hotel_package_city}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                removeClippedSubviews={true} // Unmount components when outside of window 
                                                initialNumToRender={2} // Reduce initial render amount
                                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                                maxToRenderPerBatch={100} // Increase time between renders
                                                windowSize={7} // Reduce the window size

                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
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
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView,{backgroundColor:BaseColor.bgColor}]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotel"
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



const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    }
});