import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions, ApplicationActions } from "@actions";
import {
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Platform,
} from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor, BaseStyle } from "@config";
import SplashScreen from "react-native-splash-screen";
import { DataMasterDiskon } from "@data";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import styles from "./styles";
import { Form, TextValidator } from "react-native-validator-form";
import DropdownAlert from "react-native-dropdownalert";
import AnimatedLoader from "react-native-animated-loader";
import auth from "@react-native-firebase/auth";
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
//import appleSigninAuth from 'apple-signin-auth';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import jwt_decode from "jwt-decode";
import { set } from "react-native-reanimated";

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}



export default function SignIn(props) {
  let { navigation, auth } = props;
  const dispatch = useDispatch();

  const [param, setParam] = useState(props.navigation.state.params.param);
  const [redirect, setRedirect] = useState(
    props.navigation.state.params.redirect
  );
  const configApi = useSelector((state) => state.application.configApi);
  const config = useSelector((state) => state.application.config);
  const userSession = useSelector((state) => state.application.userSession);
  const login = useSelector((state) => state.application.loginStatus);
  console.log("paramSignIn", JSON.stringify(param));
  console.log("configApi", JSON.stringify(configApi));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [success, setSuccess] = useState({
    email: true,
    password: true,
  });
  const [error, setError] = useState();
  const [colorButton, setColorButton] = useState(BaseColor.greyColor);
  const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
  const [disabledButton, setDisabledButton] = useState(true);
  const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
  const [isSigninInProgress] = useState(false);
  const [via, setVia] = useState();


  function getPrivateToken(email, password, dataUser, type = "form") {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let apiBaseUrl = config.apiBaseUrl;
    var url = apiBaseUrl + "auth/token";
    var details = {
      'username': email,
      'password': password,
      'client_id': 'MDIcid',
      'client_secret': 'MDIcs',
      'grant_type': 'password',

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
        if (result?.access_token) {
          cekLoginForm(email, password);
        } else {
          if (type == "form") {
            setLoadingSpinner(false);
            this.dropdown.alertWithType(
              "info",
              "Info",
              "Email dan Password tidak sesuai"
            );
          } else {
            registrasi_proses_app(dataUser);
          }

        }



      })
      .catch(error => {

      });

  }


  function cekLoginFormAuth(email2, password2, dataUser, type = "form") {
    setLoadingSpinner(true);
    let config = configApi;
    let baseUrl = config.baseUrl;
    let apiBaseUrl = config.apiBaseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/get_private_token";
    let urlapiBaseUrl = apiBaseUrl + "auth/token";

    var data = { email: email2.toLowerCase(), password: password2, url: urlapiBaseUrl };
    const param = { param: data };
    console.log("paramcekLoginFormAuth", JSON.stringify(param));
    console.log("url", url);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(param);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("access_token", JSON.stringify(result));

        if (result.access_token) {
          cekLoginForm(email2, password2);
        } else {
          if (type == "form") {
            setLoadingSpinner(false);
            this.dropdown.alertWithType(
              "info",
              "Info",
              "Email dan Password tidak sesuai"
            );
          } else {
            registrasi_proses_app(dataUser);
          }

        }
      })
      .catch((error) => {
        //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connections.');
      });
  }
  function registrasi_proses_app(dataUser) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthRegister/registrasi_proses_app";
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    var data = {
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      password: dataUser.password,
      passwordConfirm: dataUser.password,
      email: dataUser.email,
    };
    const param = { param: data };

    console.log("------------------data param submit register--------------");
    console.log(url, JSON.stringify(param));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(param);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        var param = result;
        console.log("resultreg", JSON.stringify(param));
        //cekLoginFormAuth(dataUser.email, dataUser.password, dataUser);
        cekLoginForm(dataUser.email, dataUser.password);

        // this.setState({ loading: false });
        // console.log(JSON.stringify(result));
        // if (result.success == false) {
        //   if (result.error == "not_same") {
        //     this.dropdown.alertWithType(
        //       "info",
        //       "Info",
        //       JSON.stringify(result.message)
        //     );
        //   } else if (result.error == "already_register") {
        //     this.dropdown.alertWithType(
        //       "info",
        //       "Info",
        //       JSON.stringify(result.message)
        //     );
        //   }
        // } else {
        //   this.onLoginGoogle(param);
        // }
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert("Kegagalan Respon Server");
      });
  }
  function cekLoginForm(email2, password2) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/login_proses_app";

    var data = { email: email2, password: password2 };
    const paramUser = { param: data };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(paramUser);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("loginUsersession", JSON.stringify(result));
        setLoadingSpinner(false);

        if (result.success == false) {
          setLoading(false);
          if (result.error == "not_verify") {
            var userSessionData = result.userSession;
            userSessionData.loginVia = "form";

            navigation.navigate("Verify", {
              user: userSessionData,
              email: email2,
              password: password2,
              redirect: redirect,
              param: param,
            });
            console.log(
              "navverify",
              JSON.stringify({
                user: userSessionData,
                redirect: redirect,
                param: param,
              })
            );
          } else if (result.error == "wrong") {
            this.dropdown.alertWithType(
              "info",
              "Info",
              JSON.stringify(result.message)
            );
          }
        } else if (result.success == true) {
          var userSessionData = result.userSession;
          userSessionData.loginVia = "form";
          userSessionData.password = password2;
          this.dropdown.alertWithType(
            "success",
            "Success",
            JSON.stringify(result.message)
          );

          AsyncStorage.setItem("userSession", JSON.stringify(userSessionData));
          AsyncStorage.setItem("password", JSON.stringify(password2));

          console.log("userSessionUpdate", JSON.stringify(userSessionData));
          console.log("password", JSON.stringify(password2));

          dispatch(
            ApplicationActions.onChangeLoginStatus(true, (response) => {
              console.log("authlOGIN", JSON.stringify(response));
            })
          );
          dispatch(
            ApplicationActions.onChangeUserSession(
              userSessionData,
              (response) => {
                console.log("responseReduxAuth", JSON.stringify(response));
              }
            )
          );
          navigation.navigate("Loading", { redirect: redirect, param: param });
        }
      })
      .catch((error) => {
        alert(error);
        //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
      });
  }

  // async function setConfigData(userSessionData) {
  //   //const userSessionData = JSON.parse(await AsyncStorage.getItem('userSession'));

  //   //const userSession = useSelector(state => state.application.userSession);
  //   var url = dataMasterDiskon.baseUrl + dataMasterDiskon.dir;

  //   var params = {
  //     param: {
  //       username: userSessionData.email,
  //       password: userSessionData.password,
  //     },
  //   };

  //   //console.log('urlloadingsetConfig', url);
  //   //console.log('paramsLoadingsetConfig', JSON.stringify(params));
  //   var requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(params),
  //   };
  //   fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("setconfigApi", JSON.stringify(result));
  //       setLoadingSpinner(false);
  //       var configApi = generateConfigApi(result);
  //       AsyncStorage.setItem("config", JSON.stringify(result));
  //       AsyncStorage.setItem("configApi", JSON.stringify(configApi));
  //       dispatch(ApplicationActions.onChangeConfigApi(configApi));
  //       dispatch(ApplicationActions.onChangeConfig(result));

  //       //console.log("Loadings", JSON.stringify({ redirect: redirect, param: param }));

  //       console.log(
  //         "Loadings",
  //         JSON.stringify({ redirect: redirect, param: param })
  //       );
  //       setTimeout(() => {
  //         navigation.navigate("Loading", { redirect: redirect, param: param });
  //       }, 1000);

  //       //navigation.navigate("Loading", { redirect: redirect, param: param });
  //     })
  //     .catch((error) => {
  //       //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
  //     });
  // }

  // function generateConfigApi(config) {
  //   let configApi = {};
  //   if (dataMasterDiskon.status == "production") {
  //     configApi.apiBaseUrl = config.apiBaseUrl;
  //     configApi.apiToken = config.tokenMDIAccess;
  //     configApi.apiTokenRefresh = config.tokenMDIRefresh;

  //     configApi.midtransUrl = config.midtransUrl;
  //     configApi.midtransUrlSnap = config.midtransUrlSnap;
  //     configApi.midtransUrlToken = config.midtransUrlToken;
  //     configApi.midtransKey = config.midtransKey;

  //     configApi.baseUrl = config.baseUrl;
  //   } else {
  //     configApi.apiBaseUrl = config.apiBaseUrlDev;
  //     configApi.apiToken = config.tokenMDIAccessDev;
  //     configApi.apiTokenRefresh = config.tokenMDIRefreshDev;

  //     configApi.midtransUrl = config.midtransUrlDev;
  //     configApi.midtransUrlSnap = config.midtransUrlSnapDev;
  //     configApi.midtransUrlToken = config.midtransUrlTokenDev;
  //     configApi.midtransKey = config.midtransKeyDev;

  //     configApi.baseUrl = config.baseUrlDev;
  //   }
  //   return configApi;
  // }

  // getCurrentUserInfo = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently();
  //     this.authenticationCustom();
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //       //console.log('getCurrentUserInfoa', JSON.stringify(error));
  //       // user has not signed in yet
  //     } else {
  //       //console.log('getCurrentUserInfob', JSON.stringify(error));
  //       // some other error
  //     }
  //   }
  // };

  _signIn = async () => {
    //alert('asd');

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // var email = userInfo.user.email;
      console.log("email_signIn", JSON.stringify(userInfo));
      var sp = email.split("@");
      var username = sp[0];

      var dataUser = {
        firstname: userInfo.user.givenName,
        lastname: userInfo.user.familyName,
        username: username,
        password: configApi.defPassword,
        email: userInfo.user.email,
        loginVia: "google",
      };

      cekLoginFormAuth(userInfo.user.email, configApi.defPassword, dataUser, "google");
    } catch (error) {
      //console.log('errorlogingoogle', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log("errorsignin", JSON.stringify(error));
      //alert(JSON.stringify(error));
    }
  };

  _signOutApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGOUT,
      });
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      //console.log("Credential state ", credentialState);
      if (credentialState === AppleAuthCredentialState.REVOKED) {
        //console.log("User is unauthenticated");
      }
    } catch (appleLogoutError) {
      console.warn("Apple logout error: ", appleLogoutError);
    }
  };

  _revokeApple = async () => {
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        "If this function executes, User Credentials have been Revoked"
      );
    });
  };

  _signOut = async () => {
    try {
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  function onLoginSubmit(type) {
    //cekLoginFormAuth(email, password, {}, type);
    getPrivateToken(email, password, {}, type);

  }

  // function onLoginGoogle(dataUser) {

  //     const { navigation } = props;

  //     let config = configApi;
  //     let baseUrl = config.baseUrl;
  //     let url = baseUrl + "front/api_new/AuthLogin/login_app_google";
  //     //console.log('configApi', JSON.stringify(config));
  //     //console.log('urlss', url);
  //     AsyncStorage.removeItem('userSession');
  //     AsyncStorage.removeItem('id_user');
  //     this._signOut();

  //     const param = { "param": dataUser };
  //     //console.log('dataParamLoginGoogle', JSON.stringify(param));

  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     var raw = JSON.stringify(param);
  //     var requestOptions = {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: 'follow'
  //     };

  //     fetch(url, requestOptions)
  //         .then(response => response.json())
  //         .then(result => {
  //             //console.log('onLoginGoogles', JSON.stringify(result));
  //             var userSession = result.userSession;
  //             userSession.loginVia = dataUser.loginVia;
  //             setLoading(false);
  //             if (result.success == false) {
  //                 this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
  //                 if (result.error == 'not_verify') {
  //                     navigation.navigate("Verify", { user: userSession, redirect: props.navigation.state.params.redirect, param: props.navigation.state.params.param });
  //                 }
  //             } else if (result.success == true) {
  //                 this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
  //                 AsyncStorage.setItem('userSession', JSON.stringify(userSession));
  //                 AsyncStorage.setItem('id_user', JSON.stringify(userSession.id_user));
  //                 setTimeout(() => {
  //                     this.setConfig();
  //                 }, 20);

  //             }

  //         })
  //         .catch(error => {
  //             //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
  //         });

  // }

  function onLoginApple(dataUser) {
    const { navigation } = props;
    AsyncStorage.removeItem("userSession");
    AsyncStorage.removeItem("id_user");
    //this._signOutApple();

    //var url=config.baseUrl+"front/api_new/AuthLogin/login_app_apple";

    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/login_app_apple";
    //console.log('configApi', JSON.stringify(config));
    //console.log('urlss', url);

    const param = { param: dataUser };
    //console.log('dataParamLoginGoogle', url, JSON.stringify(param));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(param);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log('onLoginApp', JSON.stringify(result));
        var userSession = result.userSession;
        userSession.loginVia = dataUser.loginVia;
        setLoading(false);
        if (result.success == false) {
          this.dropdown.alertWithType(
            "info",
            "Info",
            JSON.stringify(result.message)
          );
          if (result.error == "not_verify") {
            navigation.navigate("Verify", {
              user: userSession,
              redirect: props.navigation.state.params.redirect,
              param: props.navigation.state.params.param,
            });
          }
        } else if (result.success == true) {
          this.dropdown.alertWithType(
            "success",
            "Success",
            JSON.stringify(result.message)
          );
          AsyncStorage.setItem("userSession", JSON.stringify(userSession));
          AsyncStorage.setItem("id_user", JSON.stringify(userSession.id_user));
          //dispatch(AuthActions.onChangeUserSession(userSession));
          // dispatch(
          //     AuthActions.onChangeUserSession(userSession, response => {
          //         //console.log('responseReduxAuth', JSON.stringify(response));

          //     }),
          // );
          //navigation.navigate("Loading", { redirect: props.navigation.state.params.redirect, param: props.navigation.state.params.param });
        }
      })
      .catch((error) => {
        //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
      });
  }

  function validation() {
    // var email = email;
    // var password = password;
    console.log("email", email);
    console.log("password", password);

    if (email != "" && password != "") {
      setColorButton(BaseColor.secondColor);
      setColorButtonText(BaseColor.primaryColor);
      setDisabledButton(false);
      //console.log('validation', true);
    } else {
      setColorButton(BaseColor.greyColor);
      setColorButtonText(BaseColor.whiteColor);
      setDisabledButton(true);
      //console.log('validation', false);
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
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    //console.log('appleAuthRequestResponse', JSON.stringify(appleAuthRequestResponse));
    const { email, email_verified, is_private_email, sub } = jwt_decode(
      appleAuthRequestResponse.identityToken
    );
    var sp = email.split("@");
    var username = sp[0];

    ////console.log('email',email);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (appleAuthRequestResponse.email != null) {
        //var email = appleAuthRequestResponse.email;

        var dataUser = {
          firstname: appleAuthRequestResponse.fullName.givenName,
          lastname: appleAuthRequestResponse.fullName.familyName,
          username: username,
          password: configApi.defPassword,
          email: email,
          id_apple: appleAuthRequestResponse.user,
          loginVia: "apple",
        };
      } else {
        var dataUser = {
          firstname: "",
          lastname: "",
          username: username,
          password: "",
          email: email,
          id_apple: appleAuthRequestResponse.user,
          loginVia: "apple",
        };
      }
      cekLoginFormAuth(email, configApi.defPassword, dataUser, "apple");
      console.log("dataUser", JSON.stringify(dataUser));

      //onLoginApple(dataUser);
    }
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
    setLoadingSpinner(true);
    _signOut();
    revokeAccess();

    AsyncStorage.removeItem("password");
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

    this._revokeApple();
    SplashScreen.hide();
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      //webClientId: '399787116352-dn2atq6g9rilkq8img7f3qu22mr27a2t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId:
        "689407373938-g8ordqn5omulbel22sdelaeb2ejbojq5.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)

      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // iosClientId: '280725445152-tpro37vo520dhhc4ncbiplh4l8qc9ien.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    setTimeout(() => {
      setLoadingSpinner(false);
    }, 2000);



    // this.getCurrentUserInfo();

    return () => { };
  }, []);

  var formEmail = (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text caption2 style={{ marginTop: -15 }}>
          Email
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="email"
              label="email"
              validators={["required", "isEmail"]}
              errorMessages={["This field is required", "Email invalid"]}
              placeholder="e.g., example@email.com"
              type="text"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                //setEmail(text);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
              style={
                Platform.OS === "ios"
                  ? { height: 50, borderBottomWidth: 1, borderColor: "black" }
                  : {}
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  var formPassword = (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity style={{ width: "100%" }}>
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
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
              style={
                Platform.OS === "ios"
                  ? { height: 50, borderBottomWidth: 1, borderColor: "black" }
                  : {}
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        { backgroundColor: BaseColor.primaryColor },
      ]}
      forceInset={{ top: "always" }}
    >
      <Header
        title="Sign In"
        renderLeft={() => {
          return (
            <Icon name="md-arrow-back" size={20} color={BaseColor.whiteColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "#FFFFFF",
          flex: 1,
          height: 45,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></View>
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        {loadingSpinner ? (
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
                source={require("app/assets/loader_paperline.json")}
                animationStyle={{ width: 300, height: 300 }}
                speed={1}
              />
              <Text>Waiting .....</Text>
            </View>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.contain}>
              <Image
                source={Images.logo_masdis}
                style={{
                  // height: 50,
                  // width: 50,
                  height: 255 / 7,
                  width: 600 / 7,
                }}
              />
              <Text header bold>
                Welcome To
              </Text>
              <Text header bold>
                Master Diskon
              </Text>
              <Text>
                Kami menyediakan penawaran paket perjalanan dan pendukungnya
                dengan harga yang kompetitif
              </Text>
            </View>
            <View style={styles.contain2}>
              <Form
              //ref="form"
              >
                {formEmail}
                {formPassword}

                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ForgotPassword", {
                        redirect: redirect,
                        param: param,
                      })
                    }
                  >
                    <Text caption1 grayColor>
                      Lupa kata sandi?
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  disabled={disabledButton}
                  onPress={() => onLoginSubmit("form")}
                >
                  <View pointerEvents="none" style={styles.groupinput}>
                    <Button
                      loading={loading}
                      style={{ backgroundColor: colorButton }}
                      full
                    >
                      <Text style={{ color: colorButtonText }}>Sign In</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              </Form>

              {Platform.OS != "ios" ? (
                <GoogleSigninButton
                  style={{ width: "100%", height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  //onPress={(s) => { _signIn() }}
                  onPress={() => _signIn()}
                //onPress={_signIn()}
                />
              ) : (
                <View />
              )}

              {/* {
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
                                                onAppleButtonPress();

                                            }}
                                        />
                                        :
                                        <View />
                                } */}

              <View style={{ width: "100%" }}>

              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SignUp", {
                      redirect: redirect,
                      param: param,
                    })
                  }
                >
                  <Text caption1 grayColor>
                    Haven’t registered yet?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SignUp", {
                      redirect: redirect,
                      param: param,
                    });
                  }}
                >
                  <Text caption1 primaryColor>
                    Join Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}

        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          messageNumOfLines={10}
          closeInterval={10000}
        />
      </View>
    </SafeAreaView>
  );
}
