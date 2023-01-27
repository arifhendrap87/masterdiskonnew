import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions, ApplicationActions } from "@actions";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Platform,
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button, Text } from "@components";
// import styles from "./styles";
import DropdownAlert from "react-native-dropdownalert";
import ValidationComponent from "react-native-form-validator";
import InputText from "../../components/InputText";
import { Form, TextValidator } from "react-native-validator-form";

const styles = StyleSheet.create({
  contain: {
    //alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },

  tabBar: {
    borderTopWidth: 1,
  },
  bodyPaddingDefault: {
    paddingHorizontal: 20,
  },
  bodyMarginDefault: {
    marginHorizontal: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    justifyContent: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
  },
  contentProfile: {
    paddingVertical: 5,
  },
});

export default function Verify(props) {

  let { navigation, auth } = props;
  const dispatch = useDispatch();
  const configApi = useSelector((state) => state.application.configApi);
  const config = useSelector((state) => state.application.config);
  const userSession = useSelector((state) => state.application.userSession);
  const [param, setParam] = useState(props.navigation.state.params.param);

  const [user, setUser] = useState(
    props.navigation.state.params.user ? props.navigation.state.params.user : ""
  );

  const [email, setEmail] = useState(
    props.navigation.state.params.email.toLowerCase() ? props.navigation.state.params.email.toLowerCase() : ""
  );

  const [password, setPassword] = useState(
    props.navigation.state.params.password ? props.navigation.state.params.password : ""
  );
  const [redirect, setRedirect] = useState(
    props.navigation.state.params.redirect
  );



  // const [email, setEmail] = useState(user.email);

  const [code, setCode] = useState("");
  const [referral, setReferral] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const aceEditorRef = useRef();
  useEffect(() => {
    // 👇️ this is reference to input element

  }, []);
  function onResend() {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/revermail?email=" + email;
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    // var url = config.baseUrl;
    var myHeaders = new Headers();
    //myHeaders.append("Cookie", "ci_session=e30beo9broapl8qr0c9nvgmlegu31rlg");
    //this.setState({ loadingVerify: true });
    setLoadingVerify(true);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoadingVerify(false);
        this.dropdown.alertWithType(
          "success",
          "Success",
          JSON.stringify(result.message)
        );
      })
      .catch((error) => alert("Kegagalan Respon Server"));
  }

  function onSubmit() {
    setLoading(true);

    let config = configApi;
    let baseUrl = config.baseUrl;
    let url =
      baseUrl +
      "front/api_new/AuthVerify/app?e=" +
      email +
      "&tk=" +
      code +
      "&referral_code=" +
      referral;
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log(url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("resullts", JSON.stringify(result));
        setLoading(false);
        if (result.success == false) {
          this.dropdown.alertWithType(
            "info",
            "Info",
            JSON.stringify(result.message)
          );
        } else if (result.success == true) {
          console.log('berhasil verifikasi');
          cekLoginFormAuth(email, password);

        }
      })
      .catch((error) => alert("Kegagalan Respon Server"));
  }


  function cekLoginFormAuth(email2, password2, dataUser = {}, type = "form") {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let apiBaseUrl = config.apiBaseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/get_private_token";
    let urlapiBaseUrl = apiBaseUrl + "auth/token";

    var data = { email: email2, password: password2, url: urlapiBaseUrl };
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
        }
      })
      .catch((error) => {
        //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connections.');
      });
  }

  function cekLoginForm(email2, password2) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/login_proses_app";


    var data = { email: email2, password: password2 };
    const paramUser = { param: data };
    console.log('data', JSON.stringify(data));

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
        // setLoadingSpinner(false);

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

      })
      .catch((error) => {
        alert(error);
      });
  }

  var formCode = (
    <View style={{ marginBottom: 10 }}>
      <View style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Kode Verifikasi (wajib)
        </Text>

        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="code"
              label="code"
              placeholder="Kode terkirim via email"
              type="text"
              value={code}
              onChangeText={(code) => {


                setCode(code);
              }}
              style={
                Platform.OS === "ios"
                  ? { height: 50, borderBottomWidth: 1, borderColor: "black" }
                  : {}
              }
            />
          </View>
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 10 }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Kode referral
        </Text>

        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="referral"
              label="referral"
              placeholder="Kode referral"
              type="text"
              value={referral}
              onChangeText={(referral) => {
                setReferral(referral);
              }}
              style={
                Platform.OS === "ios"
                  ? { height: 50, borderBottomWidth: 1, borderColor: "black" }
                  : {}
              }
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title="Verifikasi Code"
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
          //navigation.navigate("SignIn");
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <Text>
            Masukkan Kode 6 digit yang sudah kami kirim ke email{" "}
            {email} untuk verifikasi akun Anda
          </Text>
          <Form
            //ref="form"
            //onSubmit={this.onSubmit}
            style={{ marginTop: 50 }}
          >
            {formCode}
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Button
                loading={loading}
                style={{ backgroundColor: BaseColor.primaryColor, width: '50%' }}

                onPress={() => {
                  onSubmit();
                }}
              >
                <Text style={{ color: BaseColor.whiteColor }}>Verifikasi</Text>
              </Button>

              <Button
                loading={loadingVerify}
                style={{ backgroundColor: BaseColor.secondColor, width: '50%' }}

                onPress={() => {
                  onResend();
                }}
              >
                <Text>Kirim Ulang</Text>
              </Button>
            </View>
          </Form>
        </View>
      </ScrollView>
      <DropdownAlert
        ref={(ref) => (this.dropdown = ref)}
        messageNumOfLines={10}
        closeInterval={10000}
      />
    </SafeAreaView>
  );
}
