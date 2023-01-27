import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationActions, AuthActions } from "@actions";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Text } from "@components";
import { DataMasterDiskon } from "@data";
import { AsyncStorage, Linking } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";

export default function Loading(props) {
    let { navigation, auth } = props;
    const login = useSelector((state) => state.application.loginStatus);
    const userSession = useSelector((state) => state.application.userSession);
    const configApi = useSelector((state) => state.application.configApi);
    console.log("loginLoading", JSON.stringify(login));
    console.log("userSessionLoading", JSON.stringify(userSession));
    const dispatch = useDispatch();
    const [param, setParam] = useState(
        props.navigation.state.params && props.navigation.state.params.param
            ? props.navigation.state.params.param
            : {}
    );
    const [redirect, setRedirect] = useState(
        props.navigation.state.params && props.navigation.state.params.redirect
            ? props.navigation.state.params.redirect
            : "Home"
    );

    console.log("redirectDefault", JSON.stringify(redirect));

    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState(null);
    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [config, setConfig] = useState({});
    console.log("proploading", JSON.stringify(props));

    function getPublicToken(urlLinking) {
        var url = dataMasterDiskon.apiBaseUrl + "auth/token";
        var details = {
            'client_id': 'MDIcid',
            'client_secret': 'MDIcs',
            'grant_type': 'client_credentials'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then(response => response.json())
            .then(result => {
                console.log('resultTokenPublic', JSON.stringify(result));
                var configApi = generateConfigApi(result);
                console.log("configsetConfig", JSON.stringify(result));
                console.log("configApisetConfig", JSON.stringify(configApi));
                setConfig(result);
                setLoadingSpinner(false);
                AsyncStorage.setItem("config", JSON.stringify(result));
                AsyncStorage.setItem("configApi", JSON.stringify(configApi));
                dispatch(ApplicationActions.onChangeConfigApi(configApi));
                dispatch(ApplicationActions.onChangeConfig(result));

                if (urlLinking != null) {
                    var parUrl = urlLinking.split("//");
                    var parScreen = parUrl[1].split("/");
                    var screen = parScreen[1].split("?")[0];
                    var parSlug = parScreen[1].split("=");
                    var slugs = parSlug[1];

                    console.log("urlLinking", urlLinking);
                    console.log("parUrl", parUrl);
                    console.log("parScreen", parScreen);
                    console.log("screen", screen);
                    console.log("parSlug", parSlug);
                    console.log("slug", slugs);
                    navigation.navigate("ProductDetailNew", {
                        slug: slugs,
                        product_type: "general",
                        fromPage: "linking",
                    });
                } else {
                    if (redirect === "") {
                        navigation.navigate("Home");
                    } else {
                        console.log("redirect", redirect);
                        console.log("param", param);
                        navigation.navigate(redirect, { param: param });
                    }
                }


            })
            .catch(error => {

            });

    }

    function getPrivateToken(email, password, urlLinking) {
        var url = dataMasterDiskon.apiBaseUrl + "auth/token";
        var details = {
            'username': email,
            'password': password,
            'client_id': 'MDIcid',
            'client_secret': 'MDIcs',
            'grant_type': 'client_credentials',

        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then(response => response.json())
            .then(result => {
                console.log('resultTokenPrivate', JSON.stringify(result));
                var configApi = generateConfigApi(result);
                console.log("configsetConfig", JSON.stringify(result));
                console.log("configApisetConfig", JSON.stringify(configApi));
                setConfig(result);
                setLoadingSpinner(false);
                AsyncStorage.setItem("config", JSON.stringify(result));
                AsyncStorage.setItem("configApi", JSON.stringify(configApi));
                dispatch(ApplicationActions.onChangeConfigApi(configApi));
                dispatch(ApplicationActions.onChangeConfig(result));

                if (urlLinking != null) {
                    var parUrl = urlLinking.split("//");
                    var parScreen = parUrl[1].split("/");
                    var screen = parScreen[1].split("?")[0];
                    var parSlug = parScreen[1].split("=");
                    var slugs = parSlug[1];

                    console.log("urlLinking", urlLinking);
                    console.log("parUrl", parUrl);
                    console.log("parScreen", parScreen);
                    console.log("screen", screen);
                    console.log("parSlug", parSlug);
                    console.log("slug", slugs);
                    navigation.navigate("ProductDetailNew", {
                        slug: slugs,
                        product_type: "general",
                        fromPage: "linking",
                    });
                } else {
                    if (redirect === "") {
                        navigation.navigate("Home");
                    } else {
                        console.log("redirect", redirect);
                        console.log("param", param);
                        navigation.navigate(redirect, { param: param });
                    }
                }


            })
            .catch(error => {

            });

    }



    async function setConfigData(urlLinking) {
        var url = dataMasterDiskon.baseUrl + dataMasterDiskon.dir;
        try {
            const result = await AsyncStorage.getItem("userSession");
            console.log("resultSession", result);
            console.log("userSession", JSON.stringify(userSession));
            if (result) {
                let userSession = JSON.parse(result);
                console.log("userSessionsetConfig", JSON.stringify(userSession));
                getPrivateToken(userSession.email, userSession.password, urlLinking);
            } else {

                getPublicToken(urlLinking);

            }


        } catch (error) {
            console.log(error);
        }
    }

    function generateConfigApi(config) {
        let configApi = {};
        if (dataMasterDiskon.status == "production") {
            configApi.baseUrl = dataMasterDiskon.baseUrl;
            configApi.apiBaseUrl = dataMasterDiskon.apiBaseUrl;
            configApi.apiToken = config.access_token;
            // configApi.apiTokenRefresh = config.tokenMDIRefresh;

            // configApi.midtransUrl = config.midtransUrl;
            // configApi.midtransUrlSnap = config.midtransUrlSnap;
            // configApi.midtransUrlToken = config.midtransUrlToken;
            // configApi.midtransKey = config.midtransKey;

            // configApi.baseUrl = config.baseUrl;
            // configApi.versionInPlayStore = config.versionInPlayStore;
            // configApi.versionInAppStore = config.versionInAppStore;
            configApi.time = new Date().getMinutes();
            //configApi.apiHotel = "hotelLinx";
            configApi.apiHotel = "traveloka";
        } else {
            configApi.baseUrl = dataMasterDiskon.baseUrl;
            configApi.apiBaseUrl = dataMasterDiskon.apiBaseUrl;
            configApi.apiToken = config.access_token;
            // configApi.apiTokenRefresh = config.tokenMDIRefreshDev;

            // configApi.midtransUrl = config.midtransUrlDev;
            // configApi.midtransUrlSnap = config.midtransUrlSnapDev;
            // configApi.midtransUrlToken = config.midtransUrlTokenDev;
            // configApi.midtransKey = config.midtransKeyDev;

            // configApi.baseUrl = config.baseUrlDev;
            // configApi.versionInPlayStore = config.versionInPlayStore;
            // configApi.versionInAppStore = config.versionInAppStore;
            configApi.time = new Date().getMinutes();
            configApi.apiHotel = "traveloka";
            // configApi.apiHotelTokenTravi = config.tokenTraviDev.access_token;
            // configApi.apiHotelAutocomplete = config.baseUrlDev + 'apitrav/product/hotel/searchByKey?keyword=';
        }
        return configApi;
    }
    async function _signOut() {
        try {
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            AsyncStorage.removeItem("userSession");
            dispatch(
                ApplicationActions.onChangeLoginStatus(false, (response) => {
                    console.log("authlOGIN", JSON.stringify(response));
                })
            );

            dispatch(
                ApplicationActions.onChangeUserSession(null, (response) => {
                    console.log("responseReduxAuth", JSON.stringify(response));
                })
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function revokeAccess() {
        try {
            await GoogleSignin.revokeAccess();
            // Google Account disconnected from your app.
            // Perform clean-up actions, such as deleting data associated with the disconnected account.
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // _signOut();
        // revokeAccess();

        setTimeout(() => {
            let urlLinking = null;
            async function getInitUrl() {
                await Linking.getInitialURL().then((URL) => {
                    urlLinking = URL;

                    setConfigData(urlLinking);
                });
            }
            getInitUrl();
            SplashScreen.hide();
        }, 1000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: 220,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.1)"
                    source={
                        error == false
                            ? require("app/assets/loader_paperline.json")
                            : require("app/assets/lostconnection.json")
                    }
                    animationStyle={{ width: 300, height: 300 }}
                    speed={1}
                />
                <Text>
                    {error == false ? "Connecting..Masterdiskon" : "Terjadi kesalahan"}
                </Text>
            </View>
        </View>
    );
}
