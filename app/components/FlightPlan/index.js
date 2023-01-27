import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon, Text } from "@components";
import styles from "./styles";
import { BaseColor } from "@config";

export default class FlightPlan extends Component {
    render() {
        const {
            style,
            from,
            fromCode,
            to,
            toCode,
            round,
            onPressFrom,
            onPressTo
        } = this.props;
        return (
            <View style={[styles.contentRow, style]}>
                <TouchableOpacity
                    style={styles.colCenter}
                    onPress={onPressFrom}
                    activeOpacity={0.9}
                >
                    <Text caption1 light>
                        From
                    </Text>
                    <Text header semibold>
                        {fromCode}
                    </Text>
                    <Text style={{justifyContent: 'center',alignItems: "center",textAlignVertical: "center",textAlign: "center"}}>{from}</Text>
                </TouchableOpacity>
                <View style={styles.centerView}>
                    <Icon
                        name="airplane-outline"
                        color={BaseColor.primaryColor}
                        size={14}
                        solid
                    />
                    {round && (
                        <Icon
                            name="airplane-outline"
                            color={BaseColor.primaryColor}
                            size={14}
                            solid
                            style={{
                                transform: [{ rotate: "180deg" }],
                                marginTop: 5
                            }}
                        />
                    )}
                </View>
                <TouchableOpacity
                    style={styles.colCenter}
                    onPress={onPressTo}
                    activeOpacity={0.9}
                >
                    <Text caption1 light>
                        To
                    </Text>
                    <Text header semibold>
                        {toCode}
                    </Text>
                    <Text style={{justifyContent: 'center',alignItems: "center",textAlignVertical: "center",textAlign: "center"}}>{to}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

FlightPlan.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    round: PropTypes.bool,
    fromCode: PropTypes.string,
    toCode: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    onPressFrom: PropTypes.func,
    onPressTo: PropTypes.func
};

FlightPlan.defaultProps = {
    style: {},
    round: true,
    fromCode: "SIN",
    toCode: "SYD",
    from: "Singapore",
    to: "Sydney",
    onPressFrom: () => {},
    onPressTo: () => {}
};
