import React from "react";
import { StyleSheet } from "react-native";
import { BaseStyle,BaseColor } from "@config";

export default StyleSheet.create({
    contain: { height: 45, flexDirection: "row",backgroundColor:BaseColor.primaryColor},
    contain2: { height: 45, flexDirection: "row",backgroundColor:BaseColor.primaryColor},
    textWhite: {color:BaseColor.primaryColor},
    contentLeft: {
        // flex: 1,
        // justifyContent: "center",
        // paddingLeft: 20,
        // width: 60,

        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20,
        //paddingRight: 20,
        height: "100%"
    },
    contentCenter: {
        // flex: 2,
        // alignItems: "center",
        // justifyContent: "center",
        flex: 2,
        justifyContent: "center",
        paddingLeft: 0,
        marginLeft:-60,
        width: 60
    },
    contentRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: 10,
        paddingRight: 20,
        height: "100%"
    },
    contentRightSecond: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingLeft: 10,
        paddingRight: 10,
        height: "100%"
    },
    right: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});
