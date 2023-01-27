import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
export default class PostItem extends Component {
    render() {
        const {
            style,
            children,
            title,
            description,
            onPress,
            image,
            url
        } = this.props;
        return (
            <View style={style}>
                {children}
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    {/* <Image style={styles.imagePost} source={image} /> */}
                    <Image source={{uri : url+image}} style={styles.imagePost} />
                    <Icon
                        name="bookmark"
                        solid
                        size={24}
                        color={BaseColor.blackColor}
                        style={{ position: "absolute", top: 10, right: 10 }}
                    />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text headline semibold style={{ marginBottom: 6 }}>
                        {title}
                    </Text>
                    <Text caption2>{description}</Text>
                </View>
            </View>
        );
    }
}

PostItem.propTypes = {
    url: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func
};

PostItem.defaultProps = {
    url:'',
    image: "",
    title: "",
    description: "",
    style: {},
    onPress: () => {}
};
