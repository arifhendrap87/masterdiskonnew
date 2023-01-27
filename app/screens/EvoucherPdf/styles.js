import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    // inputItem: {
    //     flex: 6.5,
    //     marginLeft: 10,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     height: 46,
    //     backgroundColor: BaseColor.fieldColor,
    //     borderRadius: 5,
    //     padding: 10
    // },
    
    
    contain: {
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20,
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
    contentButtonBottomBank: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center"
    },
    contentButtonBottom: {
        // borderTopColor: BaseColor.textSecondaryColor,
        // borderTopWidth: 1,
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
        paddingBottom: 20,
        paddingTop: 20
    },
    
    
    contentTop: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 0,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: '4%'
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        marginBottom:10,
        borderStyle: "dashed"
    },
    lineFlight: {
        width: "50%",
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
    image: { width: 32, height: 32, marginRight: 10, borderRadius: 16 }
});
