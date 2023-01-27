import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    location: {
        flexDirection: "row",
        marginTop: 10
    },
    contentTag: {
        marginLeft: 20,
        marginTop: 10,
        width: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    contentUser: {
        marginBottom: 30,
        flexDirection: "row"
    },
    imgBanner: {
        height: 335,
        width: "100%",
        position: "absolute"
    },
    imgUser: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: BaseColor.whiteColor
    },
    contentLeftUser: {
        flex: 1,
        justifyContent: "flex-end"
    },


    
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    contain: {
        alignItems: "center",
        // padding: 20,
        width: "100%",
        height:'100%'
    },
    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
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
    contentActionBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },


    searchForm: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        backgroundColor: BaseColor.whiteColor,
        width: "90%",
        shadowColor: "black",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1
    },

    imageBackground: {
        height: 140,
        width: "100%",
        position: "absolute"
    },

    contentBoxTop: {
        padding: 10,
        height: 120,
        width: "90%",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: BaseColor.whiteColor,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0,
        elevation: 5
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    }
});
