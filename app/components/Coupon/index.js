import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";
import { BaseColor } from "@config";


export default class Coupon extends Component {

    render() {
        const {
            style,
            name,
            code,
            description,
            valid,
            remain,
            onPress,
            quantity,
            claimed,
            usedKuota,
            claimable,
            usedCoupon,
            backgroundHeader

        } = this.props;

        var action = <View />

        if (usedCoupon == true) {
            action = <View>
                <Button
                    style={{
                        height: 20,
                        borderRadius: 5,
                        marginVertical: 0

                    }}
                    onPress={onPress}
                ><Text caption2>Gunakan Kupon</Text></Button>
            </View>
        } else {

            if (usedKuota <= quantity) {
                if (claimed == 0) {
                    action = <View>
                        <Button
                            style={{
                                height: 20,
                                borderRadius: 5,
                                marginVertical: 0,
                                width: '100%'

                            }}
                            onPress={onPress}
                        ><Text caption2>Klaim</Text></Button>
                    </View>
                } else {
                    action = <View><Text caption2 style={{ color: BaseColor.thirdColor }}>Sudah Diklaim</Text></View>
                }
            } else if (usedKuota >= quantity) {
                action = <View><Text caption2>Kuota habis</Text></View>
            }

        }






        return (
            <View
                style={[style, {
                    borderWidth: 1,
                    borderColor: BaseColor.primaryColor,
                    borderRadius: 10
                }]}
            //onPress={onPress}
            //activeOpacity={0.9}
            >
                <View style={[styles.nameContent, { backgroundColor: backgroundHeader, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]}>
                    <Text caption1 semibold whiteColor>
                        {name}
                    </Text>
                </View>
                {/* <View style={styles.mainContent}>
                    {
                        code != '' ? 
                        <Text body1>
                        {code}
                        </Text>
                        :
                        <View />
                    }



                        {
                        description != '' ? 
                        <Text caption2 >
                        {description}
                        </Text>
                        :
                        <View />
                    }
                    
                    
                </View> */}
                <View style={{
                    flex: 1,
                    backgroundColor: BaseColor.whiteColor,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10

                }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text caption2>
                            Berlaku Hingga
                        </Text>
                        <Text caption2>
                            Min. Transaksi
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text caption1 bold>
                            {valid}
                        </Text>
                        <Text caption1 bold>
                            {remain}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: BaseColor.dividerColor, paddingVertical: 5, marginTop: 5 }}>
                        {action}
                    </View>
                </View>


            </View>
        );
    }
}

Coupon.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    code: PropTypes.string,
    description: PropTypes.string,
    valid: PropTypes.string,
    remain: PropTypes.string,
    onPress: PropTypes.func,
    action: PropTypes.string,
    quantity: PropTypes.number,
    claimed: PropTypes.number,
    usedKuota: PropTypes.number,
    claimable: PropTypes.bool,
    coupon: PropTypes.bool,
    false: PropTypes.bool,
    backgroundHeader: PropTypes.string,

};

Coupon.defaultProps = {
    style: {},
    name: "",
    code: "",
    description: "",
    valid: "",
    remain: "",
    onPress: () => { },
    action: "",
    quantity: 5,
    claimed: 1,
    usedKuota: 1,
    claimable: true,
    coupon: true,
    usedCoupon: false,
    backgroundHeader: BaseColor.primaryColor
};
