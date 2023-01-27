import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    item: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
       
    },
    contain: {
        flexDirection: "row",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        // paddingTop: 5,
        // paddingBottom: 5,

         backgroundColor: "#fff",

         borderRadius: 18,
                                // backgroundColor: BaseColor.fieldColor,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                padding:10,
    },
    thumb: { width: 48, height: 48, marginRight: 10, borderRadius: 24 },
    content: {
        flex: 1,
        flexDirection: "row"
    },
    left: {
        flex: 7.5,
        alignItems: "flex-start",
        justifyContent: "center",
        marginLeft:30
    },
    right: {
        flex: 2.5,
        alignItems: "flex-end",
        justifyContent: "center"
    }
});
