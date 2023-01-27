import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

export default class ProfileDetail extends Component {
    render() {
        const {
            style,
            image,
            styleLeft,
            styleThumb,
            styleRight,
            onPress,
            textFirst,
            point,
            textSecond,
            textThird,
            icon,
            viewImage
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={[styles.contentLeft, styleLeft]}>
                    {viewImage && (
                        <View>
                            <Image
                                source={image}
                                style={[styles.thumb, styleThumb]}
                            />
                            <View style={styles.point}>
                                <Text overline whiteColor semibold>
                                    {point}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View>
                        <Text caption1 grayColor numberOfLines={1}>
                            {textFirst}
                        </Text>
                        <Text caption1 semibold numberOfLines={1}>
                            {textSecond}
                        </Text>
                        {/* <Text
                            body2
                            style={{
                                marginTop: 3,
                                paddingRight: 10
                            }}
                            numberOfLines={1}
                        >
                            {textThird}
                        </Text> */}

                    </View>
                </View>
                <View style={[styles.contentRight, styleRight]}>
                    <Icon
                        name={icon}
                        size={14}
                        color={BaseColor.primaryColor}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

ProfileDetail.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    textFirst: PropTypes.string,
    point: PropTypes.string,
    textSecond: PropTypes.string,
    textThird: PropTypes.string,
    styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.string,
    viewImage: PropTypes.bool,
    onPress: PropTypes.func
};

ProfileDetail.defaultProps = {
    image: "",
    textFirst: "",
    textSecond: "",
    icon: "pencil-alt",
    viewImage: true,
    point: "",
    style: {},
    styleLeft: {},
    styleThumb: {},
    styleRight: {},
    onPress: () => { }
};
