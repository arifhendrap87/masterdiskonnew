/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
// import "react-native-gesture-handler";
// import { AppRegistry } from "react-native";
// import App from "app/index.js";
// import { BaseSetting } from "@config";

// AppRegistry.registerComponent(BaseSetting.name, () => App);














// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import React from "react";
import "react-native-gesture-handler";
// import { AppRegistry } from "react-native";
import App from "app/index.js";
import { BaseSetting } from "@config";



messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

// function App{) {
//   // Your application
// }

//AppRegistry.registerComponent('app', () => HeadlessCheck);
AppRegistry.registerComponent(BaseSetting.name, () => HeadlessCheck);