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
    
    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
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
        backgroundColor: BaseColor.whiteColor
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
    },
    scrollView: {
        height: '20%',
        width: '80%',
        margin: 20,
        alignSelf: 'center',
        padding: 20,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'lightblue'
      },
      contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        paddingBottom: 50
      }
});
