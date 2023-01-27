import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon } from "@components";
import styles from "./styles";
import { BaseStyle, BaseColor } from "@config";
import PropTypes from "prop-types";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


export default class ListThumbCircle extends Component {
    convertDate(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    convertDay(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return days[d.getDay()];
    }


    render() {
        const {
            style,
            imageStyle,
            image,
            txtLeftTitle,
            txtContent,
            txtRight,
            onPress,
            loading
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.item, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                {

                    loading ?
                        <View style={styles.contain}>
                            <Icon
                                name={'spinner'}
                                color={BaseColor.primaryColor}
                                size={18}
                                solid
                                style={{
                                    marginLeft: -10, marginTop: 20, position: 'absolute', width: 40, height: 40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding: 10,
                                }}
                            />
                            <View style={styles.content}>
                                <View style={styles.left}>
                                    <PlaceholderLine width={50} />
                                    <PlaceholderLine width={100} />
                                </View>
                                <View style={styles.right}>
                                    <PlaceholderLine width={40} />
                                    <PlaceholderLine width={50} />
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.contain}>
                            <Icon
                                name={'paper-plane'}
                                color={BaseColor.primaryColor}
                                size={18}
                                solid
                                style={{
                                    marginLeft: -10, marginTop: 20, position: 'absolute', width: 40, height: 40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding: 10,
                                }}
                            />
                            <View style={styles.content}>
                                <View style={styles.left}>
                                    <Text headline semibold>
                                        {txtLeftTitle}
                                    </Text>
                                    <Text
                                        note
                                        numberOfLines={2}
                                        // footnote
                                        grayColor
                                        style={{
                                            paddingTop: 5
                                        }}
                                    >
                                        {txtContent}
                                    </Text>
                                </View>
                                <View style={styles.right}>
                                    <Text caption2 grayColor style={{ fontSize: 14, fontWeight: "bold" }}>
                                        {this.convertDay(txtRight)}
                                    </Text>
                                    <Text caption2 grayColor>
                                        {this.convertDate(txtRight)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                }
            </TouchableOpacity>
        );
    }
}

ListThumbCircle.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    imageStyle: PropTypes.object,
    image: PropTypes.node.isRequired,
    txtLeftTitle: PropTypes.string,
    txtContent: PropTypes.string,
    txtRight: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool
};

ListThumbCircle.defaultProps = {
    style: {},
    imageStyle: {},
    image: "",
    txtLeftTitle: "",
    txtContent: "",
    txtRight: "",
    onPress: () => { },
    loading: true,
};
