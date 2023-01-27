import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    blockView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: BaseColor.whiteColor,

        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        // shadowColor: "#000",
        // shadowOffset: {
        //         width: 0,
        //         height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // padding:20,
        marginBottom: 10
    },

    containField: {
        margin: 20,
        marginTop: 90,
        flexDirection: "row",
        height: 140,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 10
    },
    contentLeftItem: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    tagFollow: { width: 150, margin: 10 },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: Utils.getWidthDevice() / 3
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    containProfileItem: {
        paddingLeft: 20,
        paddingRight: 20
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },


    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    blockView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: BaseColor.whiteColor,

        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // padding:20,
        marginBottom: 10,
        borderRadius: 10,
    }
});
