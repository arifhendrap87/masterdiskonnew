import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Main from "./main";
import Loading from "./../screens/Loading";
import SignIn from "./../screens/SignIn";
import SignUp from "./../screens/SignUp";
import Verify from "./../screens/Verify";
import { AsyncStorage } from 'react-native';
import { BaseStyle, BaseColor, Images } from "@config";


const AppNavigator = createSwitchNavigator(
    {
        // SignIn: SignIn,
        Loading: {
            screen: Loading,
            path: 'linking/:link',
            // navigationOptions: ({ navigation, screenProps }) => {
            //     return {
            //         param: navigation.state.params
            //     }
            // }
        },
        // SignUp: SignUp,
        // Verify: Verify,
        Main: Main
    },
    {
        initialRouteName: "Loading"
    }
);

//export default createAppContainer(AppNavigator);

const AppContainer = createAppContainer(AppNavigator)

export default () => {
    const prefix = 'masterdiskon://'
    return <AppContainer uriPrefix={prefix} />
}
