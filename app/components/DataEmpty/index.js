import React, { Component } from "react";
import { View, TouchableOpacity, Image,StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
// import styles from "./styles";

import CountDown from 'react-native-countdown-component';
import moment from 'moment';



export default class DataEmpty extends Component {
    constructor(props) {
        super(props);


        this.state = {
            backgroundColor:BaseColor.fieldColor,
            loading:false
        };

    }

    render() {
        const {
            style,
            // onPress.
            redirect,
            navigation,
            type,
            param
        } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <View
                 style={{flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                         height: '100%',padding: 50}}
                 >       
                 <Image
                     source={Images.dataempty}
                     style={{ 
                         height: 255,
                        width: 255,
                     }}
                     resizeMode="cover"
                 />
                 <View><Text>Data Kosong</Text></View>
                 
                        
            </View>  
        );
    }
}

DataEmpty.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    redirect: PropTypes.string,
    navigation: PropTypes.object,
    param: PropTypes.string,
};

DataEmpty.defaultProps = {
    style: {},
    redirect:'',
    onPress: () => { },
    navigation: {},
    param:''
};
