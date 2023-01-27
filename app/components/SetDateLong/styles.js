import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contentPicker: {
        padding: 10,
        borderRadius: 8,
        flex: 1,
        //backgroundColor: BaseColor.fieldColor,
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    contentForm: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
});
