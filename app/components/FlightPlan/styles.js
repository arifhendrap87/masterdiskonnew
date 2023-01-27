import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
export default StyleSheet.create({
    contentRow: { flexDirection: "row",marginBottom:10 },
    centerView: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: BaseColor.fieldColor,
        height:50,
        width:50,
        marginTop:10,
        borderRadius: 50

    },
    colCenter: { flex: 1, alignItems: "center" }
});
