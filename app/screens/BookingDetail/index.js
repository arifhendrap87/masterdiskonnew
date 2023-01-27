import React, { Component } from "react";
import { View, ScrollView,Animated,RefreshControl,TouchableOpacity, ActivityIndicator,StyleSheet,Switch,Image,TextInput  } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    Button,
    ProfileDetail,
    
} from "@components";
import {AsyncStorage} from 'react-native';
import { PackageData } from "@data";
import {PostData} from '../../services/PostData';
import DropdownAlert from 'react-native-dropdownalert';
import { UserData } from "@data";
import AnimatedLoader from "react-native-animated-loader";
import {PostDataTimeout} from '../../services/PostDataTimeout';
import CountDown from 'react-native-countdown-component';
import { DataBooking} from "@data";
const styles = StyleSheet.create({
    contain: {
        padding: 20,
        width: "100%"
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
        marginTop: 15
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
  
    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    contentProfile: {
        flexDirection: "row",
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,

        borderWidth: 1, 
       borderRadius: 10,
       borderColor: BaseColor.fieldColor,
       padding: 5,
    },
    searchIcon: {
        flex: 1,
        padding: 10,
    },
});

export default class BookingDetail extends Component {
    constructor(props) {
        super(props);
        
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        var param={};
        if(this.props.navigation.state.params.param){
            param=this.props.navigation.state.params.param;
        }

        var config={};
        if(this.props.navigation.state.params.config){
            config=this.props.navigation.state.params.config;
        }

        var dataDetail={};
        if(this.props.navigation.state.params.dataDetail){
            dataDetail=this.props.navigation.state.params.dataDetail;
        }
        console.log('dataDetail',JSON.stringify(dataDetail));

        this.state = {
            dataDetail:dataDetail,
            param:param,
            config:config
        };



    }
   

    render() {
        const { navigation } = this.props;
        let {dataDetail,param,config} = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var detail=dataDetail.detail[0];
        var detail_order=detail.order;
        var detail_order_detail=detail.order_detail;
        var pax=detail.pax;
        var contact=dataDetail.contact;



        var contentFormCustomer =<View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        {/* <Image
                                            style={{width: 32, height: 32, marginRight: 10, borderRadius: 16}}
                                            resizeMode="contain"
                                            source={{uri: detail_order_detail[0].flight_schedule[1].airline_logo}}
                                        /> */}
                                        <View>
                                            <Text caption1>
                                                {contact.contact_title} {contact.contact_first} {contact.contact_last}
                                            </Text>
                                            <Text body3>
                                            <Icon
                                                name="id-card"
                                                color={BaseColor.primaryColor}
                                            /> ({contact.phone_code}) {contact.contact_phone} | {contact.contact_email}

                                            </Text>
                                        </View>
                                    </View>
                                </View>
        
        var contentformParticipant=<View></View>
        if(this.state.param.type != 'flight')
        {
            contentformParticipant = pax.map((item) => {
                return (
                    <View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            {/* <Image
                                                style={{width: 32, height: 32, marginRight: 10, borderRadius: 16}}
                                                resizeMode="contain"
                                                source={{uri: detail_order_detail[0].flight_schedule[1].airline_logo}}
                                            /> */}
                                            <View>
                                                <Text caption1>
                                                    {item.title} {item.firstname} {item.lastname}
                                                </Text>
                                                <Text body3>
                                                <Icon
                                                    name="id-card"
                                                    color={BaseColor.primaryColor}
                                                /> {item.nationality}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                )
            })
        }else{
            contentformParticipant = pax.map((item) => {
                return (
                    <View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <View>
                                                <Text caption1>
                                                    {item.title} {item.first_name} {item.last_name}
                                                </Text>
                                                <Text body3>
                                                <Icon
                                                    name="id-card"
                                                    color={BaseColor.primaryColor}
                                                /> {item.nationality_name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                )
            })

        }
        

        if(this.state.param.type != 'flight')
        {
            contentProduct=<View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                            <View style={{ flex: 3,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                                <View>
                                    <Image
                                        style={{width: 70, height: 70, marginRight: 10, borderRadius: 16}}
                                        resizeMode="contain"
                                        source={{uri:detail.order.img_featured_url}}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 9}}>
                                   
                                <View>
                                    <View>
                                        <Text>
                                            {detail.product_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {detail_order.country_name}
                                        </Text>
                                        <Text body3 style={{color:BaseColor.prima}}>
                                            {detail_order.start_date}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
        }else{
            
            var round=false;

            if(detail_order.type=='RT'){
                round=true;
            }
            var dataDeparture=<View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View>
                                        <Text caption1>
                                            {detail_order_detail[0].flight_schedule[0].airline_name}
                                        </Text>
                                        <Text body3>
                                            {detail_order_detail[0].flight_schedule[0].origin_id} - 
                                            {detail_order_detail[0].flight_schedule[0].destination_id} | 
                                            {detail_order_detail[0].flight_schedule[0].departure_date} | 
                                            {detail_order_detail[0].flight_schedule[0].departure_time}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                                >
                                    <Text footnote semibold primaryColor>
                                        Departure
                                    </Text>
                                </View>
                            </View>
            
    
            var dataReturn=null;
            if(detail_order.type=='RT'){
                dataReturn=<View style={{flexDirection: "row",marginTop: 10,justifyContent: "space-between"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View>
                                        <Text caption1>
                                            {detail_order_detail[1].flight_schedule[0].airline_name}
                                        </Text>
                                        <Text body3>
                                            {detail_order_detail[1].flight_schedule[0].origin_id} - 
                                            {detail_order_detail[1].flight_schedule[0].destination_id} | 
                                            {detail_order_detail[1].flight_schedule[0].departure_date} | 
                                            {detail_order_detail[1].flight_schedule[0].departure_time}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                                >
                                    <Text footnote semibold primaryColor>
                                        Return
                                    </Text>
                                </View>
                            </View>
            }

            
            contentProduct=<View><FlightPlan
                            round={round}
                            fromCode={detail_order_detail[0].flight_schedule[0].origin_id}
                            toCode={detail_order_detail[0].flight_schedule[0].destination_id}
                            from={detail_order_detail[0].origin_airport.location}
                            to={detail_order_detail[0].destination_airport.location}
                        />
                        
                            
                            {dataDeparture}
                            {dataReturn}
                            
                        </View>
                        
                        
        }


        var contentPrice=<View></View>
        var contentCicil=<View></View>
        var contentDiscount=<View></View>
        

        if(dataDetail.discount != "0"){
            contentDiscount=<View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
            <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                <View style={{ flex: 6,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                    <View>
                        <Text footnote grayColor numberOfLines={1}>
                            Discount
                        </Text>
                    </View>
                </View>
                <View style={{flex: 6,justifyContent: "center",alignItems: "flex-end"}}>
                       
                        <Text caption1 semibold numberOfLines={1}>
                        {'IDR '+priceSplitter(dataDetail.discount)}
                        </Text>
                </View>
            </View>
        </View>

        }


        contentPrice=<View>
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Subtotal
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text caption1 semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(dataDetail.subtotal)}
                                </Text>
                        </View>
                    </View>
                </View>



                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Insurance
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text caption1 semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(dataDetail.insurance)}
                                </Text>
                        </View>
                    </View>
                </View>

                {contentDiscount}
                
                <View style={{flexDirection:'row',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}} >
                    <View style={{flexDirection:'row',flex: 10,justifyContent: "flex-start",alignItems: "center"}}>
                        <View style={{ flex: 5,flexDirection: "row",justifyContent: "flex-start",alignItems: "center"}}>
                            <View>
                                <Text footnote grayColor numberOfLines={1}>
                                    Total
                                </Text>
                            
                            </View>
                        </View>
                        <View style={{flex: 5,justifyContent: "center",alignItems: "flex-end"}}>
                               
                                <Text caption1 semibold numberOfLines={1}>
                                {'IDR '+priceSplitter(dataDetail.total_price)}
                                </Text>
                        </View>
                    </View>
                </View>
            </View>
        
  



    
        var labeldetail='Detail Penumpang';
            if (param.type !='flight'){
                labeldetail='Detail Treveller';
            }
          
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >   
               
                <Header
                    title="Detail"
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
                />
                
                <ScrollView>
                    <View style={styles.contain}>
                        {contentProduct}
                        <View style={styles.line} />
                        {/* --------------------------------- */}

                        <Text caption2 style={{ paddingVertical: 10,fontSize: 12 }}>
                            Detail Pemesan
                        </Text>
                        {contentFormCustomer}
                        <View style={styles.line} />


                        <Text caption2 style={{ paddingVertical: 10,fontSize: 12 }}>
                            {labeldetail}
                        </Text>
                        {contentformParticipant}
                        <View style={styles.line} />
                       

                        
                    </View>
                    {contentPrice}
                   
                   


                </ScrollView>
            

            
            </SafeAreaView>
        );
    }
}
