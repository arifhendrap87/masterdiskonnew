import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Main from "./main";
import Loading from "./../screens/Loading";
import SignIn from "./../screens/SignIn";
import SignUp from "./../screens/SignUp";
import Verify from "./../screens/Verify";
import { AsyncStorage } from 'react-native';
import { BaseStyle, BaseColor, Images } from "@config";

const RootStack = createStackNavigator();


export default function Navigator() {
    // const language = useSelector(state => state.application.language);
    // const { theme, colors } = useTheme();
    // const isDarkMode = useColorScheme() === 'dark';

    // useEffect(() => {
    //     i18n.use(initReactI18next).init({
    //         resources: BaseSetting.resourcesLanguage,
    //         lng: BaseSetting.defaultLanguage,
    //         fallbackLng: BaseSetting.defaultLanguage,
    //     });
    //     SplashScreen.hide();
    // }, []);

    // useEffect(() => {
    //     i18n.changeLanguage(language);
    // }, [language]);

    // useEffect(() => {
    //     if (Platform.OS === 'android') {
    //         StatusBar.setBackgroundColor(colors.primary, true);
    //     }
    //     StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    // }, [colors.primary, isDarkMode]);

    // const forFade = ({ current, closing }) => ({
    //     cardStyle: {
    //         opacity: current.progress,
    //     },
    // });

    return (

        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Loading">
                <RootStack.Screen
                    name="Loading"
                    component={Loading}
                    options={{ gestureEnabled: false }}
                />
                <RootStack.Screen name="Main" component={Main} />
                {/* <RootStack.Screen name="Filter" component={Filter} />
                    <RootStack.Screen name="FlightFilter" component={FlightFilter} />
                    <RootStack.Screen name="BusFilter" component={BusFilter} />
                    <RootStack.Screen name="Search" component={Search} />
                    <RootStack.Screen name="SearchHistory" component={SearchHistory} />
                    <RootStack.Screen name="PreviewImage" component={PreviewImage} />
                    <RootStack.Screen name="SelectBus" component={SelectBus} />
                    <RootStack.Screen name="SelectCruise" component={SelectCruise} />
                    <RootStack.Screen name="CruiseFilter" component={CruiseFilter} />
                    <RootStack.Screen name="EventFilter" component={EventFilter} />
                    <RootStack.Screen
                        name="SelectDarkOption"
                        component={SelectDarkOption}
                        options={{
                            presentation: 'transparentModal',
                            cardStyleInterpolator: forFade,
                            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                            gestureEnabled: false,
                        }}
                    />
                    <RootStack.Screen
                        name="SelectFontOption"
                        component={SelectFontOption}
                        options={{
                            presentation: 'transparentModal',
                            cardStyleInterpolator: forFade,
                            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                        }}
                    /> */}
            </RootStack.Navigator>
        </NavigationContainer>

    );
}



// const AppNavigator = createSwitchNavigator(
//     {
//         // SignIn: SignIn,
//         Loading: Loading,
//         // SignUp: SignUp,
//         // Verify: Verify,
//         Main: Main
//     },
//     {
//         initialRouteName: "Loading"
//     }
// );

// //export default createAppContainer(AppNavigator);

// const AppContainer = createAppContainer(AppNavigator)

// export default () => {
//     const prefix = 'masterdiskon://'
//     return <AppContainer uriPrefix={prefix} />
// }
