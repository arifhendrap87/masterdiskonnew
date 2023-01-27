import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon } from "@components";
import { BaseColor, Images } from "@config";
import styles from "./styles";

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import Modal from "react-native-modal";

export default class FlightItem extends Component {
    timeConvert(n) {
        var num = n;
        // var hours = (num / 60);
        // var rhours = Math.floor(hours);
        // var minutes = (hours - rhours) * 60;
        // var rminutes = Math.round(minutes);

        // if(rhours<10){
        //     if(rhours==1){
        //         rhours='00';
        //     }else{
        //         rhours='0'+rhours;
        //     }
        // }else{
        //     rhours=rhours;
        // }

        // if(rminutes==0){
        //     rminutes='00';
        // }else if(rminutes<=10){
        //     rminutes='0'+rminutes;
        // }
        // return rhours + ":"+rminutes;

//         var hours = Math.floor(num / 60);  
//   var minutes = num % 60;

  d = Math.floor(num/1440); // 60*24
  h = Math.floor((num-(d*1440))/60);
  m = Math.round(num%60);

  if(d>0){
    return(d + " d, " + h + " h, "+m+" m");
  }else{
    return(h + " h, "+m+" m");
  }


  //return hours + " h "+" : " + minutes+" m"; 
    }

    
    
    
    
    
    
    render() {
        const {
            style,
            from,
            to,
            fromHour,
            toHour,
            fromFlight,
            toFlight,
            totalHour,
            route,
            image,
            brand,
            brandCode,
            type,
            price,
            onPress,
            onPressDetail,
            loading,
            flight_schedule
        } = this.props;

        var routeKet='Langsung';
        if(flight_schedule.length==0 || flight_schedule.length==1){
            routeKet='Langsung';
        }else if(flight_schedule.length>=1){
            routeKet=flight_schedule.length-1 + " Transit";
        }

        var kelas='';
        if(type=='E'){
            kelas="Economy Class";
        }else if(type=='S'){
            kelas="Premium Economy";
        }else if(type=='B'){
            kelas="Business Class";
        }else if(type=='F'){
            kelas="First Class";
        }
        var imageUrl='';
        if(brandCode=='GA'){
            imageUrl='https:'+image;
        }else{
            imageUrl=image;
        }


        return (
            <View style={[styles.content, style]}>
                {
                    loading ? 
                    <View>
                    <View style={styles.contentTop}>
                        <View style={{ flex: 1 }}>
                            <PlaceholderLine width={50} />
                            <PlaceholderLine width={30} />
                        </View>
                        <View style={{ flex: 1.5, alignItems: "center" }}>
                            <PlaceholderLine width={50} />
                            <View style={styles.contentLine}>
                                <View style={styles.line} />
                                <Icon
                                    name="airplane-outline"
                                    color={BaseColor.dividerColor}
                                    size={24}
                                    solid
                                />
                                <View style={styles.dot} />
                            </View>
                            <PlaceholderLine width={50} />
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <PlaceholderLine width={50} />
                            <PlaceholderLine width={30} />
                        </View>
                    </View>
                    <View style={styles.contentBottom}>
                        <View style={styles.bottomLeft}>
                            <PlaceholderLine width={50} />
                        </View>
                        <View
                            style={styles.bottomRight}
                        >
                            <PlaceholderLine width={50} />
                        </View>
                    </View>
                </View>
                    :
                <View>
                    <TouchableOpacity  onPress={onPress}>
                        <View style={styles.contentTop}>
                            <View style={{ flex: 1 }}>
                                <Text title2>{fromHour}</Text>
                                <Text footnote light>
                                    {fromFlight}
                                </Text>
                            </View>
                            <View style={{ flex: 1.5, alignItems: "center" }}>
                                <Text caption1 light>
                                    {this.timeConvert(totalHour)}
                                    {/* {totalHour} */}
                                </Text>
                                <View style={styles.contentLine}>
                                    <View style={styles.line} />
                                    <Icon
                                        name="airplane-outline"
                                        color={BaseColor.dividerColor}
                                        size={24}
                                        solid
                                    />
                                    <View style={styles.dot} />
                                </View>
                                <Text caption1 light>
                                    {routeKet}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Text title2>{toHour}</Text>
                                <Text footnote light>
                                    {toFlight}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentBottom}>
                            <View style={styles.bottomLeft}>
                                <Image
                                    style={styles.image}
                                    resizeMode="contain"
                                    source={{uri: imageUrl}}
                                    // source={image}
                                />
                                <View>
                                    <Text caption1 semibold accentColor>
                                        {brand}
                                    </Text>
                                    <Text caption2 light>
                                        {kelas}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={styles.bottomRight}
                            >
                                <Text caption2 light  primaryColor>
                                    {price}
                                </Text>
                                <Text caption1 light style={{ marginLeft: 5 }}>
                                    / Pax
                                </Text>
                            </View>
                        </View>
                       
                    </TouchableOpacity>
                 
                     <TouchableOpacity style={styles.contentBottom} onPress={onPressDetail}>
                         <View style={{ flex: 1.5, alignItems: "center" }}>
                                 {/* <Icon
                                     name="angle-down"
                                     color={BaseColor.dividerColor}
                                     size={24}
                                     solid
                                 />
                                  */}
                                 <Text caption1 light>
                                    Detail
                                </Text>
                                <View style={styles.contentLine}>
                                    <Icon
                                        name="ios-arrow-down-circle-outline"
                                        color={BaseColor.primaryColor}
                                        size={24}
                                        solid
                                    />
                                </View>
                         </View>
                     </TouchableOpacity>
                 </View>
                }
            </View>
        );
    }
}

FlightItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    from: PropTypes.object,
    to: PropTypes.object,
    fromHour: PropTypes.object,
    toHour: PropTypes.object,
    fromFlight: PropTypes.object,
    toFlight: PropTypes.object,
    totalHour: PropTypes.number,
    brand: PropTypes.string,
    brandCode: PropTypes.string,
    image: PropTypes.node.isRequired,
    type: PropTypes.string,
    price: PropTypes.string,
    route: PropTypes.string,
    onPress: PropTypes.func,
    onPressDetail: PropTypes.func,
    loading: PropTypes.bool,
    flight_schedule:PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

FlightItem.defaultProps = {
    style: {},
    from: {
        name: "United State",
        value: "USA",
        image: Images.airline1,
        hour: "05:00"
    },
    to: {
        name: "Singapore",
        value: "SIN",
        image: Images.airline2,
        hour: "18:00"
    },
    totalHour: 13.5,
    brand: "Vietjet",
    brandCode: "Vietjet",
    image: Images.airline2,
    type: "Economy",
    price: "$499,99",
    route: "Non Stop",
    fromHour: "xx",
    toHour: "yy",
    fromFlight: "xx",
    toFlight: "yy",
    onPress: () => { },
    onPressDetail: () => { },
    loading: true,
    flight_schedule:[]
    
};
