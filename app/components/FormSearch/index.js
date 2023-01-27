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
        //borderBottomColor: BaseColor.fieldColor,
        //borderBottomWidth: 2,
        //backgroundColor: '#6c757d',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',


    },
});


export default class FormSearch extends Component {
    render() {
        const {
            style,
            to,
            onPress,
            label,
            title,
            icon
        } = this.props;
        return (
            <View >
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.contentForm, style]}
                    onPress={onPress}
                >
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}

                        >
                            <Icon
                                name={icon}
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
                                {label}
                            </Text>
                            <Text caption2 semibold numberOfLines={1}>
                                {title}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

FormSearch.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    icon: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string
};

FormSearch.defaultProps = {
    style: {},
    onPress: () => { },
    icon: "check",
    label: "SYD",
    title: ""
};
