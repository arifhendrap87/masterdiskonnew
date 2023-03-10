import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        shadowOffset: { height: 1 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0,
    },
    nameContent: {
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderBottomColor: BaseColor.whiteColor,
        //backgroundColor: BaseColor.primaryColor,
        //borderTopRightRadius: 8,
        //borderTopLeftRadius: 8
    },
    validContent: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 2,
        backgroundColor: BaseColor.whiteColor,
        //justifyContent: "space-between",
        //borderBottomRightRadius: 8,
        //borderBottomLeftRadius: 8
    },
    mainContent: { backgroundColor: BaseColor.whiteColor, padding: 12 }
});
