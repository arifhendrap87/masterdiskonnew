import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { View, ScrollView, TouchableOpacity, AsyncStorage, Platform } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor, BaseStyle } from "@config";
import SplashScreen from "react-native-splash-screen";
import { DataMasterDiskon } from "@data";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";
import { Form, TextValidator } from 'react-native-validator-form';
import DropdownAlert from 'react-native-dropdownalert';
import AnimatedLoader from "react-native-animated-loader";
import auth from '@react-native-firebase/auth';
import appleAuth, {
    AppleButton,
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
//import appleSigninAuth from 'apple-signin-auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import jwt_decode from "jwt-decode";


async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

async function onSignOut() {
    // await GoogleSignin.revokeAccess();
    // await GoogleSignin.signOut();

    let userInfo = await GoogleSignin.signIn();
    await GoogleSignin.clearCachedToken(userInfo.idToken);
    const tokens = await GoogleSignin.getTokens();

}



class SignIn extends Component {
    constructor(props) {
        super(props);
        //alert('asd');
        var param = this.props.navigation.state.params.param;
        var redirect = this.props.navigation.state.params.redirect;
        console.log('param', JSON.stringify(param));
        this.state = {
            email: "",
            password: "",
            loading: false,
            loading_spinner: true,
            success: {
                email: true,
                password: true
            },

            redirect: '',
            colorButton: BaseColor.greyColor,
            colorButtonText: BaseColor.whiteColor,
            disabledButton: true,
            DataMasterDiskon: DataMasterDiskon[0],
            param: param,
            redirect: redirect


        }
        this.getConfigApi();
        this.getConfig();
        this.getSession();
    }



    //memanggil config
    getConfigApi() {
        AsyncStorage.getItem('configApi', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ configApi: config });
            }
        });
    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }

    //memanggil session
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('userSessions', JSON.stringify(userSession));
                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }


    checkSession() {
        this.setState({ loading_spinner: true }, () => {
            let { navigation, auth } = this.props;
            AsyncStorage.getItem('userSession', (error, result) => {

                if (result) {
                    let userSession = JSON.parse(result);
                    console.log('getSession', JSON.stringify(userSession));

                    if (userSession.hasOwnProperty('password') == true) {
                        navigation.navigate('Home');
                    } else {
                        this.setState({ loading_spinner: false });
                    }



                } else {
                    //AsyncStorage.setItem('config', JSON.stringify(config));
                    this.setState({ loading_spinner: false });
                }
            });


        });
    }



    cekLoginFormAuth() {

        const { email, password, success, redirect } = this.state;
        const { navigation } = this.props;
        this.setState({ loading: true });
        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let apiBaseUrl = config.apiBaseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/get_private_token";
        let urlapiBaseUrl = apiBaseUrl + "auth/token";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        console.log('url', url);
        var data = { "email": email, "password": password, "url": urlapiBaseUrl }
        const param = { "param": data }
        console.log('url', url);
        console.log('param', JSON.stringify(param));


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(param);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.access_token) {
                    console.log('access_token', JSON.stringify(result.access_token));
                    this.cekLoginForm();
                } else {
                    this.dropdown.alertWithType('info', 'Info', "Email dan Password tidak sesuai");
                }

            })
            .catch(error => {
                console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
            });


    }


    cekLoginForm() {

        const { email, password, success, redirect } = this.state;
        const { navigation } = this.props;
        this.setState({ loading: true });
        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/login_proses_app";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        console.log('url', url);
        var data = { "email": email, "password": password }
        const param = { "param": data }
        console.log('url', url);
        console.log('param', JSON.stringify(param));


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(param);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('login', JSON.stringify(result));

                if (result.success == false) {
                    this.setState({ loading: false });
                    if (result.error == 'not_verify') {
                        var userSession = result.userSession;
                        userSession.loginVia = "form";
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        navigation.navigate("Verify", { user: userSession, redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param });
                    } else if (result.error == 'wrong') {
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                    }

                } else if (result.success == true) {
                    var userSession = result.userSession;
                    userSession.loginVia = "form";
                    userSession.password = password;
                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));

                    AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    AsyncStorage.setItem('password', JSON.stringify(password));
                    AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                    this.setState({ password: password });
                    setTimeout(() => {
                        this.setConfig();
                    }, 20);


                    //navigation.navigate("Loading", { redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param });


                }
            })
            .catch(error => {
                console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');

                //this.dropdown.alertWithType('info', 'Info','Internet connection problem ! make sure you have an internet connection.');
            });


    }


    setConfig() {
        console.log('setConfig');
        let { navigation, auth } = this.props;
        const { DataMasterDiskon } = this.state;
        var url = DataMasterDiskon.baseUrl + DataMasterDiskon.dir;

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                var params = { "param": { "username": userSession.email, "password": this.state.password } };
            } else {
                var params = { "param": { "username": DataMasterDiskon.username, "password": DataMasterDiskon.password } };
            }
            console.log('urlloadingsetConfig', url);
            console.log('paramsLoadingsetConfig', JSON.stringify(params));
            var param = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
            fetch(url, param)
                .then(response => response.json())
                .then(result => {
                    console.log('resultLogin', JSON.stringify(result));
                    this.setState({ loading: false });
                    var config = result;
                    var configApi = this.generateConfigApi(config);
                    console.log('config', JSON.stringify(config));
                    console.log('configApi', JSON.stringify(configApi));
                    this.setState({ config: config });
                    this.setState({ loading_spinner: false });
                    AsyncStorage.setItem('config', JSON.stringify(config));
                    AsyncStorage.setItem('configApi', JSON.stringify(configApi));
                    console.log("Loading", { redirect: this.state.redirect, param: this.state.param });
                    navigation.navigate("Loading", { redirect: this.state.redirect, param: this.state.param });

                })
                .catch(error => {
                    this.setState({ error: true });
                });
        });

    }

    generateConfigApi(config) {
        const { DataMasterDiskon } = this.state;
        let configApi = {};
        if (DataMasterDiskon.status == "production") {
            configApi.apiBaseUrl = config.apiBaseUrl;
            configApi.apiToken = config.tokenMDIAccess;
            configApi.apiTokenRefresh = config.tokenMDIRefresh;

            configApi.midtransUrl = config.midtransUrl;
            configApi.midtransUrlSnap = config.midtransUrlSnap;
            configApi.midtransUrlToken = config.midtransUrlToken;
            configApi.midtransKey = config.midtransKey;

            configApi.baseUrl = config.baseUrl;

        } else {
            configApi.apiBaseUrl = config.apiBaseUrlDev;
            configApi.apiToken = config.tokenMDIAccessDev;
            configApi.apiTokenRefresh = config.tokenMDIRefreshDev;

            configApi.midtransUrl = config.midtransUrlDev;
            configApi.midtransUrlSnap = config.midtransUrlSnapDev;
            configApi.midtransUrlToken = config.midtransUrlTokenDev;
            configApi.midtransKey = config.midtransKeyDev;

            configApi.baseUrl = config.baseUrlDev;
        }
        return configApi;


    }



    componentDidMount() {

        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {

            this._revokeApple();
            SplashScreen.hide();
            let { navigation, auth } = this.props;
            let status = auth.login.success;
            setTimeout(() => {
                this.checkSession();
            }, 20);



            GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
                webClientId: '399787116352-dn2atq6g9rilkq8img7f3qu22mr27a2t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                hostedDomain: '', // specifies a hosted domain restriction
                loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
                forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
                accountName: '', // [Android] specifies an account name on the device that should be used
                iosClientId: '399787116352-0djq47u48nrknq7mqquln95dngbspqgv.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
                //iosClientId: '280725445152-tpro37vo520dhhc4ncbiplh4l8qc9ien.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)

            });





            this.getCurrentUserInfo();
        });


    }

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
            this.authenticationCustom();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('getCurrentUserInfoa', JSON.stringify(error));
                // user has not signed in yet
            } else {
                console.log('getCurrentUserInfob', JSON.stringify(error));
                // some other error
            }
        }
    };






    _signIn = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            var email = userInfo.user.email;
            console.log('email_signIn', JSON.stringify(userInfo));
            var sp = email.split('@');
            var username = sp[0];

            var dataUser = {
                "firstname": userInfo.user.givenName,
                "lastname": userInfo.user.familyName,
                "username": username,
                "password": configApi.defPassword,
                "email": userInfo.user.email,
                "loginVia": "google"
            }


            this.onLoginGoogle(dataUser);
        } catch (error) {
            console.log('errorlogingoogle', JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            //alert(JSON.stringify(error));
        }

    }

    _signOutApple = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
            });
            const credentialState = await appleAuth.getCredentialStateForUser(
                appleAuthRequestResponse.user
            );
            console.log("Credential state ", credentialState);
            if (credentialState === AppleAuthCredentialState.REVOKED) {
                console.log("User is unauthenticated");
            }
        } catch (appleLogoutError) {
            console.warn("Apple logout error: ", appleLogoutError);
        }
    };


    _revokeApple = async () => {
        return appleAuth.onCredentialRevoked(async () => {
            console.warn('If this function executes, User Credentials have been Revoked');
        });
    };



    _signOut = async () => {
        try {
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    onLoginSubmit() {

        this.cekLoginFormAuth();
        //this.cekLoginForm();    

    }


    onLoginGoogle(dataUser) {

        // let config = JSON.parse(result);
        const { navigation } = this.props;

        //const { redirect,config } = this.state;

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/login_app_google";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);
        AsyncStorage.removeItem('userSession');
        AsyncStorage.removeItem('id_user');
        this._signOut();

        this.setState({ loading: true }, () => {
            const param = { "param": dataUser };
            console.log('dataParamLoginGoogle', JSON.stringify(param));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(param);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('onLoginGoogles', JSON.stringify(result));
                    var userSession = result.userSession;
                    userSession.loginVia = dataUser.loginVia;
                    this.setState({ loading: false });
                    if (result.success == false) {
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        if (result.error == 'not_verify') {
                            navigation.navigate("Verify", { user: userSession, redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param });
                        }
                    } else if (result.success == true) {
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                        AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                        setTimeout(() => {
                            this.setConfig();
                        }, 20);

                    }

                })
                .catch(error => {
                    console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
                });
        });

    }

    onLoginApple(dataUser) {
        const { redirect } = this.state;
        const { navigation } = this.props;
        AsyncStorage.removeItem('userSession');
        AsyncStorage.removeItem('id_user');
        //this._signOutApple();

        //var url=config.baseUrl+"front/api_new/AuthLogin/login_app_apple";

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/login_app_apple";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);



        this.setState({ loading: true }, () => {
            const param = { "param": dataUser };
            console.log('dataParamLoginGoogle', url, JSON.stringify(param));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(param);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('onLoginApp', JSON.stringify(result));
                    var userSession = result.userSession;
                    userSession.loginVia = dataUser.loginVia;
                    this.setState({ loading: false });
                    if (result.success == false) {
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        if (result.error == 'not_verify') {
                            navigation.navigate("Verify", { user: userSession, redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param });

                        }
                    } else if (result.success == true) {
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                        AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
                        navigation.navigate("Loading", { redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param });
                    }

                })
                .catch(error => {
                    console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
                });


        });



    }




    validation() {
        var email = this.state.email;
        var password = this.state.password;

        if (email != '' && password != '') {
            this.setState({ colorButton: BaseColor.secondColor });
            this.setState({ colorButtonText: BaseColor.primaryColor });
            this.setState({ disabledButton: false });
        } else {
            this.setState({ colorButton: BaseColor.greyColor });
            this.setState({ colorButtonText: BaseColor.whiteColor });
            this.setState({ disabledButton: true });

        }
    }
    onAppleButtonPress = async () => {
        //async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        console.log('appleAuthRequestResponse', JSON.stringify(appleAuthRequestResponse));
        const { email, email_verified, is_private_email, sub } = jwt_decode(appleAuthRequestResponse.identityToken);
        var sp = email.split('@');
        var username = sp[0];

        //console.log('email',email);
        if (credentialState === appleAuth.State.AUTHORIZED) {
            if (appleAuthRequestResponse.email != null) {
                //var email = appleAuthRequestResponse.email;


                var dataUser = {
                    "firstname": appleAuthRequestResponse.fullName.givenName,
                    "lastname": appleAuthRequestResponse.fullName.familyName,
                    "username": username,
                    "password": configApi.defPassword,
                    "email": email,
                    "id_apple": appleAuthRequestResponse.user,
                    "loginVia": "apple"
                }

            } else {


                var dataUser = {
                    "firstname": "",
                    "lastname": "",
                    "username": username,
                    "password": "",
                    "email": email,
                    "id_apple": appleAuthRequestResponse.user,
                    "loginVia": "apple"
                }


            }

            console.log('dataUser', JSON.stringify(dataUser));


            this.onLoginApple(dataUser);



        }
    }

    render() {
        const { navigation } = this.props;
        let { loading, loading_spinner } = this.state;

        var formEmail = <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
                style={{ width: '100%' }}
            >
                <Text caption2 style={{ marginTop: -15 }}>
                    Email
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email invalid']}
                            placeholder="e.g., example@email.com"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(email) => {
                                this.setState({ email: email })
                                setTimeout(() => {
                                    this.validation();
                                }, 50);
                            }}
                            errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }


                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>


        var formPassword = <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
                style={{ width: '100%' }}
            >
                <Text caption2 style={{ marginTop: -15 }}>
                    Password
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="password"
                            label="text"
                            placeholder="e.g., ******"
                            secureTextEntry
                            type="text"
                            value={this.state.password}
                            onChangeText={(password) => {
                                this.setState({ password: password })
                                setTimeout(() => {
                                    this.validation();
                                }, 50);
                            }}
                            errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>

                </View>
            </TouchableOpacity>



        </View>


        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign In"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                    {
                        loading_spinner ?

                            <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 220,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >

                                    <AnimatedLoader
                                        visible={true}
                                        overlayColor="rgba(255,255,255,0.1)"
                                        source={require("app/assets/loader_paperline.json")}
                                        animationStyle={{ width: 300, height: 300 }}
                                        speed={1}
                                    />
                                    <Text>
                                        Waiting .....
                                    </Text>
                                </View>
                            </View>
                            :
                            <ScrollView>
                                <View style={styles.contain}>
                                    <Image
                                        source={Images.logo_masdis}
                                        style={{
                                            // height: 50,
                                            // width: 50,
                                            height: 255 / 7,
                                            width: 600 / 7
                                        }}
                                    />
                                    <Text header bold>Welcome To</Text>
                                    <Text header bold>Master Diskon</Text>
                                    <Text>Kami menyediakan penawaran paket perjalanan dan pendukungnya dengan harga yang kompetitif</Text>

                                </View>
                                <View style={styles.contain2}>
                                    <Form
                                        ref="form"
                                    >
                                        {formEmail}
                                        {formPassword}

                                        <View style={{
                                            marginVertical: 5,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("ForgotPassword", { redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param })}
                                            >
                                                <Text caption1 grayColor>
                                                    Lupa kata sandi?
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <TouchableOpacity disabled={this.state.disabledButton} onPress={() => this.onLoginSubmit()} >
                                            <View pointerEvents='none' style={styles.groupinput}>
                                                <Button
                                                    loading={this.state.loading}
                                                    style={{ backgroundColor: this.state.colorButton }}
                                                    full
                                                >
                                                    <Text style={{ color: this.state.colorButtonText }}>Sign In</Text>
                                                </Button>
                                            </View>
                                        </TouchableOpacity>
                                    </Form>


                                    {/* {
                                (Platform.OS != 'ios') ?  */}

                                    {/* <View style={{ width: "100%" }}>
                                    <GoogleSigninButton
                                        style={{ width: "100%", height: 48 }}
                                        size={GoogleSigninButton.Size.Wide}
                                        color={GoogleSigninButton.Color.Dark}
                                        onPress={this._signIn}
                                        disabled={this.state.isSigninInProgress} />
                                </View> */}
                                    {/* :
                            <View />
                            } */}


                                    {
                                        (Platform.OS === 'ios') ?

                                            <AppleButton
                                                buttonStyle={AppleButton.Style.BLACK}
                                                buttonType={AppleButton.Type.SIGN_IN}
                                                style={{
                                                    marginVertical: 5,
                                                    height: 56,
                                                    backgroundColor: BaseColor.secondColor,
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    paddingHorizontal: 20,
                                                    borderRadius: 28,
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,
                                                    elevation: 5,
                                                }}
                                                onPress={() => {
                                                    this.onAppleButtonPress();
                                                    //this._signOutApple();
                                                    // setTimeout(() => {
                                                    //     this.onAppleButtonPress();
                                                    // }, 50);

                                                }}
                                            />
                                            :
                                            <View />
                                    }

                                    <View style={{ width: "100%" }}>
                                        {/* <Button
                                title="Google Sign-In"
                                onPress={() => {onSignOut()}}
                                /> */}
                                    </View>



                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 25
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("SignUp", { redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param })}
                                        >
                                            <Text caption1 grayColor>
                                                Haven’t registered yet?
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("SignUp", { redirect: this.props.navigation.state.params.redirect, param: this.props.navigation.state.params.param })
                                            }}
                                        >
                                            <Text caption1 primaryColor>
                                                Join Now
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                    }

                    <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
        //actions: bindActionCreators({AuthActions,ApplicationActions}, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);