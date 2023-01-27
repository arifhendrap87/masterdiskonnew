import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";

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
            clickAction
        } = this.props;
        return (
            <TouchableOpacity
                style={[
                    //styles.contain, 
                    style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.nameContent}>
                    <Text caption2 semibold whiteColor>
                        {name}
                    </Text>
                </View>
                <View style={styles.mainContent}>
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
                        {
                            clickAction==true ? ' [ Klik untuk Share ]' :''
                        }
                        </Text>
                        :
                        <View />
                        }
                    
                    
                </View>
                <View style={styles.validContent}>
                    {/* <Text overline semibold>
                        {valid}
                    </Text>
                    <Text overline semibold>
                        {remain}
                    </Text> */}
                </View>
            </TouchableOpacity>
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
    action:PropTypes.string,
    clickAction:PropTypes.bool
};

Coupon.defaultProps = {
    style: {},
    name: "",
    code: "",
    description: "",
    valid: "",
    remain: "",
    onPress: () => {},
    action:"",
    clickAction:false
};
