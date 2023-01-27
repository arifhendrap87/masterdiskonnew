import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    contain: { flexDirection: "row", width: Utils.scaleWithPixel(300) },
    imageBanner: {
        width: Utils.scaleWithPixel(100),
        height: Utils.scaleWithPixel(100)
    },
    content: {
        height: Utils.scaleWithPixel(100),
        paddingHorizontal: 10,
        // backgroundColor: '#007bff',
        justifyContent: "space-between",
        flex: 1,
          borderRadius: 10,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        backgroundColor: BaseColor.whiteColor,
    },
    contentTitle: {
        paddingTop: 5,
        justifyContent: "flex-start"
    },
    contentDate: {
        paddingBottom: 5,
        justifyContent: "flex-end"
    }
});
