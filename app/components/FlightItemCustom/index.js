import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon } from "@components";
import { BaseColor, Images } from "@config";
import styles from "./styles";

export default class FlightItemCustom extends Component {
    timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);

        if(rhours<10){
            if(rhours==1){
                rhours='00';
            }else{
                rhours='0'+rhours;
            }
        }else{
            rhours=rhours;
        }

        if(rminutes==0){
            rminutes='00';
        }else if(rminutes<=10){
            rminutes='0'+rminutes;
        }
        return rhours + ":"+rminutes;
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
            type,
            price,
            onPress
        } = this.props;

        var routeKet='';
        if(route==0){
            routeKet='Direct';
        }else if(route>=0){
            routeKet=route+ "transit";
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

        return (
            <TouchableOpacity style={[styles.content, style]} onPress={onPress}>
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
                        </Text>
                        <View style={styles.contentLine}>
                            <View style={styles.line} />
                            <Icon
                                name="plane"
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
                            source={{uri: image}}
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
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text title3 semibold primaryColor>
                            {price}
                        </Text>
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            Pax
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

FlightItemCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    from: PropTypes.object,
    to: PropTypes.object,
    fromHour: PropTypes.object,
    toHour: PropTypes.object,
    fromFlight: PropTypes.object,
    toFlight: PropTypes.object,
    totalHour: PropTypes.number,
    brand: PropTypes.string,
    image: PropTypes.node.isRequired,
    type: PropTypes.string,
    price: PropTypes.string,
    route: PropTypes.string,
    onPress: PropTypes.func
};

FlightItemCustom.defaultProps = {
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
    image: Images.airline2,
    type: "Economy",
    price: "$499,99",
    route: "Non Stop",
    fromHour: "xx",
    toHour: "yy",
    fromFlight: "xx",
    toFlight: "yy",
    onPress: () => { }
};
