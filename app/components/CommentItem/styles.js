import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    // contain: {
    //     shadowOffset: { height: 1 },
    //     shadowColor: BaseColor.grayColor,
    //     shadowOpacity: 1.0
    // },
    // nameContent: {
    //     borderBottomWidth: 1,
    //     paddingHorizontal: 12,
    //     paddingVertical: 7,
    //     borderBottomColor: BaseColor.whiteColor,
    //     backgroundColor: BaseColor.darkPrimaryColor,
    //     borderTopRightRadius: 8,
    //     borderTopLeftRadius: 8
    // },
    // validContent: {
    //     flexDirection: "row",
    //     paddingHorizontal: 12,
    //     paddingVertical: 7,
    //     backgroundColor: BaseColor.fieldColor,
    //     justifyContent: "space-between",
    // },

    // validContentRed: {
    //     flexDirection: "row",
    //     paddingHorizontal: 12,
    //     paddingVertical: 7,
    //     backgroundColor: BaseColor.fieldColor,
    //     justifyContent: "space-between",
    //     color:'red'
    // },

    // validContentGreen: {
    //     flexDirection: "row",
    //     paddingHorizontal: 12,
    //     paddingVertical: 7,
    //     backgroundColor: BaseColor.fieldColor,
    //     justifyContent: "space-between",
    //     color:'green'
    // },
    // mainContent: {
    //     backgroundColor: BaseColor.darkPrimaryColor,
    //     paddingHorizontal: 12,
    //     paddingVertical: 6,
    //     flexDirection: "row"
    // },
    // line: {
    //     width: "100%",
    //     height: 1,
    //     borderWidth: 0.5,
    //     borderColor: BaseColor.dividerColor,
    //     borderStyle: "dashed",
    // },


    //-----------------------------------------//

     item: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
       
    },
    contain: {
        flexDirection: "row",
        flex: 1,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 18,
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
        flexDirection: "row",
    },
    left: {
        flex: 7.5,
        alignItems: "flex-start",
        justifyContent: "center",
        //marginLeft:30
        
    },
    right: {
        flex: 2.5,
        alignItems: "flex-end",
        justifyContent: "center"
    }
});
