import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        width: "100%"
    },
    contain: {
        //alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
        width: "100%"
    },
    contain2: {
        //alignItems: "center",
        paddingVertical: 50,
        paddingHorizontal: 20,
        width: "100%"
    },

    contentProfile: {
        // marginTop: 15,
        flexDirection: "row",
        // backgroundColor: BaseColor.fieldColor,
        marginBottom: 15,
        width: '100%',

    },


    passwordContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        //paddingBottom: 10,
    },
    inputStyle: {
        flex: 1,
    },





    formGroupContainer: {
        height: 55,
        position: 'relative',
        width: '100%',
        marginTop: 15
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: -15,
        left: 25,
        padding: 5,
        zIndex: 50,

    },
    labelContainerText: {
        color: BaseColor.greyColor
    },
    labelContainerTextError: {
        color: BaseColor.thirdColor
    },

    iconContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: 20,
        right: 25,
        zIndex: 50,
    },

    errorContainer: {
        textAlign: "left",
        flex: 1,
        paddingHorizontal: 10,
        color: BaseColor.thirdColor,
    },

    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: BaseColor.greyColor,
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingRight: 45,
    },

    textInputError: {
        flex: 1,
        borderWidth: 1,
        borderColor: BaseColor.thirdColor,
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingRight: 45,
    },
    appleButton: {
        width: '100%',
        height: 45,
        shadowColor: '#555',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginVertical: 15,
    }
});
