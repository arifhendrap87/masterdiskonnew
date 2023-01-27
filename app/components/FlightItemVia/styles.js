import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({

    item: {
        paddingHorizontal: 5,
        marginBottom: 10
    },
    //   content: {
    //     flex: 1,
    //     flexDirection: "row"
    //   },
    //   contain: {
    //     flexDirection: "column",
    //     borderColor: BaseColor.textSecondaryColor,
    //     borderWidth: 1,
    //     backgroundColor: "#fff",
    //     borderRadius: 18,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 3,
    //     padding: 20,
    //   },




    content: {
        flexDirection: "column",
        borderColor: BaseColor.textSecondaryColor,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        padding: 10,
    },
    contentTop: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed"
    },
    contentLine: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: BaseColor.primaryColor,
        position: "absolute"
    },
    contentBottom: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    bottomLeft: { flexDirection: "row", alignItems: "center" },
    bottomRight: { flexDirection: 'row', justifyContent: 'flex-end' },
    image: { width: 50, height: 50, marginRight: 10, borderRadius: 16 }
});
