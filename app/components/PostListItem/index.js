import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

export default class PostListItem extends Component {
    render() {
        const { style, title, description, date, onPress, image,pros,cons } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                {/* <Image source={image} style={styles.imageBanner} /> */}
                <View style={styles.content}>
                    {title != "" && (
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                {title}
                            </Text>
                        </View>
                    )}
                    <View style={{ flex: 1 }}>
                        <Text
                            body2
                            grayColor
                            numberOfLines={3}
                            //style={{ paddingVertical: 5 }}
                        >
                            {description}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            body2
                            grayColor
                            numberOfLines={1}
                            //style={{ paddingVertical: 5 }}
                        >
                            [ + ] {pros}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            body2
                            grayColor
                            numberOfLines={1}
                            //style={{ paddingVertical: 5 }}
                        >
                            [ + ] {cons}
                        </Text>
                    </View>
                    {date != "" && (
                        <View style={styles.contentDate}>
                            <Text caption1 primaryColor>
                                {date}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

PostListItem.propTypes = {
    image: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    pros: PropTypes.string,
    cons: PropTypes.string,
    onPress: PropTypes.func
};

PostListItem.defaultProps = {
    image: "",
    title: "",
    description: "",
    date: "",
    pros: "",
    cons: "",
    style: {},
    onPress: () => {}
};
