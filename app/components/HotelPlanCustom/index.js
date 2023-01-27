import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon, Text } from "@components";

import { BaseColor } from "@config";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentRow: { flexDirection: "row",marginBottom:10 },
    centerView: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: BaseColor.fieldColor,
        height:50,
        width:50,
        marginTop:10,
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


export default class HotelPlanCustom extends Component {
    render() {
        const {
            style,
            to,
            onPressTo,
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={[styles.contentForm, style]}
                    onPress={onPressTo}
                >
                    <View style={{flex: 1,flexDirection: "row"}}>
                            <View style={{flex: 1,
                                            alignItems: "flex-start",
                                            justifyContent: "center",}}
                                            
                                      >
                                <Icon
                                            name={'hotel'}
                                            size={14}
                                            color={BaseColor.primaryColor}
                                />
                            </View>
                            <View style={{flex: 11,
                                            justifyContent: "center",
                                        }}
                                            
                                      >
                            <Text caption2 light style={{ marginBottom: 0 }}>
                                Cari nama hotel
                            </Text>
                            <Text caption2 semibold numberOfLines={1}>
                               {to}
                            </Text>
                            </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

HotelPlanCustom.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    to: PropTypes.string,
    onPressTo: PropTypes.func,
    icon:PropTypes.string,
    label:PropTypes.string,
};

HotelPlanCustom.defaultProps = {
    style: {},
    to: "Sydney",
    onPressTo: () => {},
    icon:"check",
    label: "SYD",
};
