import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        shadowOffset: { height: 1 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0
    },
    nameContent: {
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderBottomColor: BaseColor.whiteColor,
        backgroundColor: BaseColor.darkPrimaryColor,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    validContent: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: BaseColor.fieldColor,
        justifyContent: "space-between",
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8
    },

    validContentRed: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: BaseColor.fieldColor,
        justifyContent: "space-between",
        color:'red'
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8
    },

    validContentGreen: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: BaseColor.fieldColor,
        justifyContent: "space-between",
        color:'green'
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8
    },
    mainContent: {
        backgroundColor: BaseColor.darkPrimaryColor,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: "row"
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
    },
});
