import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon, Text } from "@components";

import { BaseColor } from "@config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentRow: { flexDirection: "row", marginBottom: 10 },
    centerView: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: BaseColor.fieldColor,
        height: 50,
        width: 50,
        marginTop: 10,
        borderRadius: 50

    },
    colCenter: { flex: 1, alignItems: "center" },
    contentForm: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        borderBottomColor: BaseColor.fieldColor,
        borderBottomWidth: 2,

    },
});


export default class FlightPlanCustom extends Component {
    render() {
        const {
            style,
            from,
            fromCode,
            to,
            toCode,
            onPressFrom,
            onPressTo,
            icon,
            label
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={[styles.contentForm, style]}
                    onPress={onPressFrom}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}

                        >
                            <Icon
                                name={'airplane-outline'}
                                size={14}
                                color={BaseColor.primaryColor}
                            />
                        </View>
                        <View style={{
                            flex: 11,
                            justifyContent: "center",
                        }}

                        >
                            <Text caption2 light style={{ marginBottom: 0 }}>
                                From
                            </Text>
                            <Text caption2 semibold numberOfLines={1}>
                                {fromCode} ({from})
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.contentForm, style]}
                    onPress={onPressTo}
                >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}

                        >
                            <Icon
                                name={'airplane-outline'}
                                size={14}
                                color={BaseColor.primaryColor}
                            />
                        </View>
                        <View style={{
                            flex: 11,
                            justifyContent: "center",
                        }}

                        >
                            <Text caption2 light style={{ marginBottom: 0 }}>
                                To
                            </Text>
                            <Text caption2 semibold numberOfLines={1}>
                                {toCode} ({to})
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

FlightPlanCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    round: PropTypes.bool,
    fromCode: PropTypes.string,
    toCode: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    onPressFrom: PropTypes.func,
    onPressTo: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.string,
};

FlightPlanCustom.defaultProps = {
    style: {},
    round: true,
    fromCode: "SIN",
    toCode: "SYD",
    from: "Singapore",
    to: "Sydney",
    onPressFrom: () => { },
    onPressTo: () => { },
    icon: "check",
    label: "SYD",
};
