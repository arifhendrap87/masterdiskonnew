import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon, Text } from "@components";

import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';


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
                    style={[{}]}
                //onPress={onPressFrom}
                >
                    <LinearGradient
                        style={{
                            height: 60,
                            width: 60,
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            shadowRadius: 30,
                            shadowOffset: {
                                height: 0,
                                width: 2,
                            },
                            borderRadius: 80 / 2,
                            elevation: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: BaseColor.primaryColor,
                            borderWidth: 5,
                            borderColor: BaseColor.whiteColor,


                        }}


                        colors={['#d8145e', '#d8145e', '#d8145e', '#d8145e', '#d8145e', '#d8145e']}
                        //##f16489ee
                        //#d8145e
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                    >
                        <View style={{
                            flex: 1,
                            alignItems: "flex-end",
                            //justifyContent: "center",
                        }}

                        >
                            <Icon
                                name={'airplane-outline'}
                                size={14}
                                color={BaseColor.primaryColor}
                            />
                        </View>
                    </LinearGradient>
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
