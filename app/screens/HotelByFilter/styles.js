import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
});
