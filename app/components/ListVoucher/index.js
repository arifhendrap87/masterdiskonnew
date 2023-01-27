import React, { Component } from "react";
import { View, TouchableOpacity,StyleSheet } from "react-native";
import { Text } from "@components";
import PropTypes from "prop-types";
// import styles from "./styles";



const styles = StyleSheet.create({
    contain: {
        shadowOffset: { height: 1 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0
    },
    nameContent: {
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderBottomColor: BaseColor.whiteColor,
        backgroundColor: BaseColor.darkPrimaryColor,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    validContent: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: BaseColor.fieldColor,
        justifyContent: "space-between",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    },
    mainContent: {
        backgroundColor: BaseColor.darkPrimaryColor,
        paddingHorizontal: 12,
        paddingVertical: 20,
        flexDirection: "row"
    }
});


export default class BookingDetailFlight extends Component {
    render() {
        const {
            style,
            name,
            checkIn,
            checkOut,
            price,
            total,
            onPress
        } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.nameContent}>
                    <Text caption2 whiteColor semibold>
                        {name}
                    </Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={{ flex: 1 }}>
                        <Text caption2 whiteColor>
                            Check In
                        </Text>
                        <Text caption1 whiteColor semibold>
                            {checkIn}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text caption2 whiteColor>
                            Check Out
                        </Text>
                        <Text caption1 whiteColor semibold>
                            {checkOut}
                        </Text>
                    </View>
                </View>
                <View style={styles.validContent}>
                    <Text overline semibold>
                        {total}
                    </Text>
                    <Text overline semibold>
                        {price}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

BookingDetailFlight.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    total: PropTypes.string,
    price: PropTypes.string,
    onPress: PropTypes.func
};

BookingDetailFlight.defaultProps = {
    style: {},
    name: "",
    checkIn: "",
    checkOut: "",
    total: "",
    price: "",
    onPress: () => {}
};
