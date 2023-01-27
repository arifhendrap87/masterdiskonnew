import React, { Component } from "react";
import { View, TouchableOpacity, Image,StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
// import styles from "./styles";

import CountDown from 'react-native-countdown-component';
import moment from 'moment';



export default class DataImage extends Component {
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
                         //height: '30%',padding: 50,top:50
                        }}
                 >       
                 <Image
                     source={this.props.img}
                     style={{ 
                        height: 200,
                        width: 200,
                     }}
                     resizeMode="cover"
                 />
                 <View><Text body1>{this.props.text}</Text></View>
                 {/* <View><Text footnote style={{textAlign:"center"}}>Terima kasih, pesanan Anda telah kami terima, kami akan melakukan pengecekan terlebih dahulu pada produk yang Anda pesan.</Text></View> */}
                 
                        
            </View>  
        );
    }
}

DataImage.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    redirect: PropTypes.string,
    navigation: PropTypes.object,
    param: PropTypes.string,
};

DataImage.defaultProps = {
    style: {},
    redirect:'',
    onPress: () => { },
    navigation: {},
    param:''
};
