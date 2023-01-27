import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import { BaseStyle, BaseColor, Images } from "@config";
export default class BookingHistory extends Component {
    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
    
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    render() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const {
            style,
            name,
            checkIn,
            checkOut,
            price,
            total,
            item,
            onPress
        } = this.props;


            var fieldsArray = [];
            item.detail.map(item => {
                fieldsArray.push(
                    <View>
                        <View style={styles.line} />
                        <View style={styles.validContent}>
                            <View style={{ flex: 1 }}>
                                <Text caption3>
                                {item.product_name} ({item.type})
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                );

            });
        
        var statusPay='';
        var countDown=<View></View>;
        var current_payment=item.current_payment;
        var expiredTime=this.duration(current_payment.expired);

        if(item.status_payment=="lunas"){
                statusPay= <View style={styles.validContentRed}>
                    <Text caption3 semibold>
                        Status
                    </Text>
                    <Text grayColor>
                        Lunas
                    </Text>
                </View>


        }else{

            if(expiredTime > 0){
                statusPay= <View style={styles.validContentGreen}>
                <Text caption3 semibold>
                    Status
                </Text>
                <Text caption3 semibold>
                    Belum Lunas
                </Text>
                </View>
            }else{
                statusPay= <View style={styles.validContentGreen}>
                <Text caption3 semibold>
                    Status 
                </Text>
                <Text caption3 semibold>
                    Cancel
                </Text>
                </View>

            }


            if(expiredTime > 0){
            countDown=<View style={styles.validContent}>
            <Text caption3 semibold>
                Tagihan Pembayaran
            </Text>
                    <CountDown
                        size={12}
                        until={expiredTime}
                        // onFinish={() => alert('Finished')}
                        style={{float:'left'}}
                        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor}}
                        digitTxtStyle={{color: BaseColor.primaryColor}}
                        timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                        separatorStyle={{color: BaseColor.primaryColor}}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                    />
                
            </View>
            }

        }



            var content='';
            content=<View>
                <View style={styles.nameContent}>
                    <Text caption2 whiteColor semibold>
                    {item.product} ( ID Order {item.id_order} )
                    </Text>
                </View>
                {fieldsArray}
                <View style={styles.validContent}>
                        <Text caption3 semibold>
                            Price
                        </Text>
                        <Text caption3 semibold>
                            IDR {priceSplitter(item.total_price)}
                        </Text>
                </View>
                {countDown}
                {statusPay}
            </View>

       

        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                {content}
               
            </TouchableOpacity>
        );
    }
}

BookingHistory.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    total: PropTypes.string,
    price: PropTypes.string,
    onPress: PropTypes.func
};

BookingHistory.defaultProps = {
    item: {},
    style: {},
    name: "",
    checkIn: "",
    checkOut: "",
    total: "",
    price: "",
    onPress: () => {}
};
