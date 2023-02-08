import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Image, Text, Icon } from "@components";
//import styles from "./styles";
import { BaseStyle, BaseColor } from "@config";
import PropTypes from "prop-types";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import moment from 'moment';



const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 5,
        marginBottom: 10

    },
    content: {
        flex: 1,
        flexDirection: "row"
    },
    contain: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        padding: 10,
    },
    thumb: { width: 48, height: 48, marginRight: 10, borderRadius: 24 },

    left: {
        flex: 1,
        alignItems: "flex-start",
    },
    right: {
        flex: 9,
    }
});



export default class CardCustomNotif extends Component {
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
                            <View style={styles.content}>
                                <View style={styles.left}>
                                    <Icon
                                        name={'information-circle-outline'}
                                        size={25}
                                        color={BaseColor.primaryColor}
                                        solid
                                    />
                                </View>
                                <View style={styles.right}>
                                    <Text body1 bold style={{ color: BaseColor.primaryColor }}>
                                        {txtLeftTitle}
                                    </Text>

                                    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 0 }}>

                                        <Text
                                            body2
                                            style={{ marginLeft: 0 }}
                                            numberOfLines={5}

                                        >
                                            {txtContent}
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 0 }}>

                                        <Text
                                            caption1
                                            style={{ marginLeft: 0, color: 'grey' }}
                                            numberOfLines={5}

                                        >
                                            {/* {txtRight} */}
                                            {moment(txtRight).fromNow()}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                }
            </TouchableOpacity>
        );
    }
}

CardCustomNotif.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    imageStyle: PropTypes.object,
    image: PropTypes.node.isRequired,
    txtLeftTitle: PropTypes.string,
    txtContent: PropTypes.string,
    txtRight: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool
};

CardCustomNotif.defaultProps = {
    style: {},
    imageStyle: {},
    image: "",
    txtLeftTitle: "",
    txtContent: "",
    txtRight: "",
    onPress: () => { },
    loading: true,
};
