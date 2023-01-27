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
// import appleAuth, {
//     AppleButton,
//     AppleAuthError,
//     AppleAuthRequestScope,
//     AppleAuthRequestOperation,
// } from "@invertase/react-native-apple-authentication";
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
    const configApi = useSelector((state) => state.application.configApi);
    const config = useSelector((state) => state.application.config);
    const userSession = useSelector((state) => state.application.userSession);
    const login = useSelector((state) => state.application.loginStatus);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [success, setSuccess] = useState({
        email: true,
        password: true,
    });
    const [typeModule, setTypeModule] = useState('signIn');
    const [error, setError] = useState();
    const [colorButton, setColorButton] = useState(BaseColor.greyColor);
    const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
    const [disabledButton, setDisabledButton] = useState(true);
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [isSigninInProgress] = useState(false);
    const [via, setVia] = useState();

    _signOut = async () => {
        try {
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            //this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

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
        _signOut();
        revokeAccess();

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

        return () => { };
    }, []);

    _signIn = async () => {

        console.log('ggoogle');
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

    var content = <View />

    var contentForgotPassword = <View
        style={{
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <TouchableOpacity
            onPress={() => {
                setTypeModule('signIn');
            }
            }
        >
            <Text caption1 grayColor>
                sign In
            </Text>
        </TouchableOpacity>
    </View>


    var contentSignIn = (<View>
        <View style={styles.contain}>

            <Text>
                Email pemasan sudah pernah terdaftar.
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
                        onPress={() => {
                            setTypeModule('forgotPassword');


                        }
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



        </View>
        <DropdownAlert
            ref={(ref) => (this.dropdown = ref)}
            messageNumOfLines={10}
            closeInterval={10000}
        />
    </View>

    )

    if (typeModule == 'signIn') {
        content = contentSignIn;
    } else if (typeModule == 'forgotPassword') {
        content = contentForgotPassword;
    }

    return (

        <View>
            {content}

        </View>




    );
}
