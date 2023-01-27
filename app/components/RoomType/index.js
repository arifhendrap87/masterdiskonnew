import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon,Button } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import styles from "./styles";
export default class RoomType extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            style,
            image,
            url,
            name,
            available,
            services,
            price,
            amenities,
            onPress,
            onPressBookNow,
            buttonBookNow
        } = this.props;
        
        var availableString='';
        if(available=="1"){
            availableString='Tersedia';
        }else{
            availableString='Kosong';
        }
        
        
        //var strServices = services;
        
        // var str = "How,are,you,doing,today?";
        // var res = str.split(",");
        
        var str=amenities;
        var res = str.split(", ");
        var amenitiesArray=[];
        for (i = 0; i < res.length; i++) {
            amenitiesArray.push(<View style={styles.tag}>
                            {/* <Icon
                                name={item.icon}
                                size={12}
                                color={BaseColor.accentColor}
                            /> */}
                            <Text
                                overline
                                grayColor
                                numberOfLines={1}
                                style={{ marginLeft: 5 }}
                            >
                                {res[i]}
                            </Text>
                        </View>
            )
        } 
        
        return (
            <View style={[styles.listContent, style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={{uri:url+image}} style={styles.listImage} />
                </TouchableOpacity>
                <View style={styles.listContentRight}>
                    <Text headline semibold numberOfLines={6}>
                         {name}
                    </Text>
                    <Text headline semibold numberOfLines={6}>
                         {amenities}
                    </Text>
                    {/* {amenitiesArray} */}
                     <View style={styles.listContentService}>
                        {amenitiesArray}
                       
                    </View> 
                    <Text
                        title3
                        primaryColor
                        semibold
                        style={{ paddingTop: 10, paddingBottom: 5 }}
                    >
                        {price}
                    </Text>
                    <Text
                        footnote
                        accentColor
                        numberOfLines={1}
                        style={{
                            marginTop: 5
                        }}
                        style={{color:BaseColor.primaryColor}}
                    >
                        {availableString}
                    </Text>
                    {buttonBookNow && (
                         <Button
                         onPress={onPressBookNow}
                         style={{ height: 30,borderRadius:10,width:'60%' }}
                        
                     >
                         Book Now
                     </Button>
                    )}
                                       
                </View>
            </View>
        );
    }
}

RoomType.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    url: PropTypes.url,
    name: PropTypes.string,
    price: PropTypes.string,
    available: PropTypes.string,
    amenities: PropTypes.string,
    services: PropTypes.array,
    onPress: PropTypes.func,
    onPressBookNow: PropTypes.func,
    buttonBookNow:PropTypes.bool
};

RoomType.defaultProps = {
    style: {},
    image: "",
    url: "",
    name: "",
    price: "",
    amenities: "",
    available: "",
    services: [],
    onPress: () => {},
    onPressBookNow: () => {},
    buttonBookNow: false
};
