import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

export default class PriceSummary extends Component {
    render() {
        const {
            textFirst,
            textSecond,
            textThird,
            
            style,
            styleLeft,
            
            styleRight,
            
            //styleThumb,
            // onPress,
            // image,
            // point,
            // icon,
            // viewImage
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={[styles.contentLeft, styleLeft]}>
                    <View>
                        <Text footnote grayColor numberOfLines={1}>
                            {textFirst}
                        </Text>
                        <Text headline semibold numberOfLines={1}>
                            {textSecond}
                        </Text>
                    </View>
                </View>
                <View style={[styles.contentRight, styleRight]}>
                        <Icon
                            name="pencil-alt"
                            size={18}
                            color={BaseColor.primaryColor}
                        />
                        <Text headline semibold numberOfLines={1}>
                            {textThird}
                        </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

PriceSummary.propTypes = {
    textFirst: PropTypes.string,
    textSecond: PropTypes.string,
    textThird: PropTypes.string,
    
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    //styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // image: PropTypes.node.isRequired,
    // point: PropTypes.string,
    // textSecond: PropTypes.string,
    // textThird: PropTypes.string,
    // icon: PropTypes.bool,
    // viewImage: PropTypes.bool,
    // onPress: PropTypes.func
};

PriceSummary.defaultProps = {
    textFirst: "",
    textSecond: "",
    textThird: "",
    style: {},
    styleLeft: {},
   
    styleRight: {},
    
    //styleThumb: {},
    // image: "",
    // icon: true,
    // viewImage: true,
    // point: "",
    
    // onPress: () => {}
};
