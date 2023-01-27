import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contentForm: {
        // paddingHorizontal: 10,
        // paddingVertical: 5,
        // borderRadius: 8,
        // width: "100%",
        // //backgroundColor: BaseColor.fieldColor
        // borderRadius: 8,
        // borderWidth: 3,
        // borderColor: BaseColor.fieldColor,

        paddingHorizontal: 10,
        paddingVertical: 10,
        width: "100%",
        borderBottomColor: BaseColor.fieldColor,
        borderBottomWidth: 2,

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
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 50
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
