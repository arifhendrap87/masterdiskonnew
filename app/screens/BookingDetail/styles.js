import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        padding: 20,
        width: "100%"
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
        marginTop: 15
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
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
        //paddingBottom: 20,
        //paddingTop: 20
    },
    
    
    
    
    
    contains: { flexDirection: "row",
    // borderBottomColor: BaseColor.textSecondaryColor,
    // borderBottomWidth: 1,
    // paddingBottom: 20,
        // paddingTop: 20
    },
    contentLeft: {
        flex: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    thumb: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    contentRight: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    point: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: BaseColor.lightPrimaryColor,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 9,
        bottom: 0
    }
});
