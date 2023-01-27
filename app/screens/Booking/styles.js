import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        flex: 1
    },
    contentActionBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },
    tabbar: {
        backgroundColor: "white",
        height: 40,
        // paddingHorizontal: '15%',
        // alignItems: "center",
        // justifyContent: 'center',
        //textAlign: 'center'
    },
    tab: {
        width: 100
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    noLabel: {
        display: 'none',
        height: 0
    },
    contentList: {
        flexDirection: "row",
        paddingVertical:5,
        backgroundColor:BaseColor.secondColor
    },
    
});
