// import React, { Component } from "react";
import React, { useEffect, useState } from "react";
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
import Recaptcha from 'react-native-recaptcha-that-works';
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button, Text } from "@components";
// import styles from "./styles";
import DropdownAlert from "react-native-dropdownalert";
import ValidationComponent from "react-native-form-validator";
import InputText from "../../components/InputText";
import { Form, TextValidator } from "react-native-validator-form";
import Modal from "react-native-modal";


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

  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  contentFilterBottom: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: "center",
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  contentActionModalBottom: {
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
});



export default function SignUp(props) {

  let { navigation, auth } = props;
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    title: true,
    firstname: true,
    lastname: true,
    username: true,
    password: true,
    email: true,
  });
  const [param, setParam] = useState(props.navigation.state.params.param);
  const [redirect, setRedirect] = useState(
    props.navigation.state.params.redirect
  );
  const [colorButton, setColorButton] = useState(BaseColor.greyColor);
  const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
  const [disabledButton, setDisabledButton] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const configApi = useSelector((state) => state.application.configApi);
  const config = useSelector((state) => state.application.config);


  useEffect(() => {

    return () => { };
  }, []);


  const send = () => {
    console.log('send!');
    // recaptcha.current.open();
  }

  const onVerify = token => {
    console.log('success!', token);
  }

  const onExpire = () => {
    console.warn('expired!');
  }

  var formTitle = (
    <View style={{ marginBottom: 20 }}>
      <View style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Title
        </Text>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            setModalVisible(true);
          }}

        >
          <View style={styles.contentProfile} pointerEvents='none'>
            <View style={{ flex: 6 }}>
              <TextValidator
                name="title"
                label="text"
                validators={["required"]}
                errorMessages={["This field is required"]}
                placeholder="e.g., Mr"
                type="text"
                value={title}
                onChangeText={(title) => {
                  setTitle(title);
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
                    ? {
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: "black",
                      marginBottom: 0,
                    }
                    : {}
                }
              />
            </View>
          </View>
        </TouchableOpacity>

      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View
          style={[
            styles.contentFilterBottom,
            { paddingBottom: 20 },
            { height: 400 },
          ]}
        >
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View style={{ flexDirection: "column", marginVertical: 2 }}>

            {[
              {
                key: 'mr',
                value: 'Mr / Tuan'
              },
              {
                key: 'mrs',
                value: 'Mrs / Nyonya'
              }
            ].map((item, index) => (
              <TouchableOpacity
                style={styles.contentActionModalBottom}
                key={item.value}
                onPress={() => {
                  setTitle(item.key);
                  setModalVisible(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ marginLeft: 10 }} caption2 bold>
                    {item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
        </View>
      </Modal>
    </View>
  );

  var formFirstname = (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Firstname
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="firstname"
              label="text"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="e.g., John"
              type="text"
              value={firstname}
              onChangeText={(firstname) => {
                setFirstname(firstname);
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
                  ? {
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    marginBottom: 0,
                  }
                  : {}
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  var formLastname = (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Lastname
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="lastname"
              label="text"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="e.g., Doe"
              type="text"
              value={lastname}
              onChangeText={(lastname) => {
                setLastname(lastname);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              style={
                Platform.OS === "ios"
                  ? {
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    marginBottom: 0,
                  }
                  : {}
              }
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  var formUsername = (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Username
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="username"
              label="text"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="e.g., johndoe"
              type="text"
              value={username}
              onChangeText={(username) => {
                setUsername(username);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              style={
                Platform.OS === "ios"
                  ? {
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    marginBottom: 0,
                  }
                  : {}
              }
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  var formEmail = (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Email
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="email"
              label="email"
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="e.g., johndoe@email.com"
              type="text"
              value={email}
              onChangeText={(email) => {
                //setEmail(text.toLowerCase());
                setEmail(email);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              style={
                Platform.OS === "ios"
                  ? {
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    marginBottom: 0,
                  }
                  : {}
              }
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  var formPassword = (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity style={{ width: "100%" }}>
        <Text
          caption2
          style={{ marginTop: -15, color: BaseColor.primaryColor }}
        >
          Password
        </Text>
        <View style={styles.contentProfile}>
          <View style={{ flex: 6 }}>
            <TextValidator
              name="password"
              label="text"
              secureTextEntry
              validators={["required"]}
              errorMessages={["This field is required"]}
              placeholder="********"
              type="text"
              value={password}
              onChangeText={(password) => {
                setPassword(password);
                setTimeout(() => {
                  validation();
                }, 50);
              }}
              style={
                Platform.OS === "ios"
                  ? {
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    marginBottom: 0,
                  }
                  : {}
              }
              errorStyle={{
                underlineValidColor: BaseColor.textPrimaryColor,
                text: { color: BaseColor.thirdColor },
                underlineInvalidColor: BaseColor.thirdColor,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  function validation() {



    if (
      title != "" &&
      firstname != "" &&
      lastname != "" &&
      username != "" &&
      password != "" &&
      email != ""
    ) {

      setColorButton(BaseColor.secondColor);
      setColorButtonText(BaseColor.primaryColor);
      setDisabledButton(false);
      //}
    } else {

      setColorButton(BaseColor.greyColor);
      setColorButtonText(BaseColor.whiteColor);
      setDisabledButton(true);
    }
  }

  function onSubmit() {

    setLoading(true);
    if (
      title == "" ||
      firstname == "" ||
      lastname == "" ||
      username == "" ||
      password == "" ||
      email == ""
    ) {
      setSuccess({
        ...success,
        firstname: firstname != "" ? true : false,
        firstname: firstname != "" ? true : false,
        lastname: lastname != "" ? true : false,
        username: username != "" ? true : false,
        password: password != "" ? true : false,
        email: email != "" ? true : false,
      });

    } else {
      let config = configApi;
      let baseUrl = config.baseUrl;
      let url = baseUrl + "front/api_new/AuthRegister/registrasi_proses_app";
      console.log("configApi", JSON.stringify(config));
      console.log("urlss", url);

      var data = {
        title: title,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        passwordConfirm: password,
        email: email.toLowerCase(),
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
          console.log('registrasi_proses_app', JSON.stringify(param));

          setLoading(false);
          if (result.success == false) {
            if (result.error == "not_same") {
              this.dropdown.alertWithType(
                "info",
                "Info",
                JSON.stringify(result.message)
              );
            } else if (result.error == "already_register") {
              this.dropdown.alertWithType(
                "info",
                "Info",
                JSON.stringify(result.message)
              );
            }
          } else {
            getPrivateToken(email, password, {});
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    }
  }

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
    console.log('details', JSON.stringify(details));

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
            if (result?.status == 4011) {
              cekLoginForm(email, password);
            } else {
              this.dropdown.alertWithType(
                "info",
                "Info",
                result.message
              );
            }

          } else {

            // registrasi_proses_app(dataUser);
          }

        }



      })
      .catch(error => {

      });

  }


  function cekLoginFormAuth(email2, password2, dataUser = {}, type = "form") {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let apiBaseUrl = config.apiBaseUrl;
    //let url = baseUrl + "front/api_new/AuthLogin/get_private_token";
    let url = apiBaseUrl + "auth/token";

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

        if (result.success == false) {
          //setLoading(false);
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
      });
  }

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        { backgroundColor: BaseColor.primaryColor },
      ]}
      forceInset={{ top: "always" }}
    >
      <Header
        title="Sign Up"
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
          //navigation.navigate('SignIn');
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
        <ScrollView>
          <View style={styles.contain}>
            <Form
            //ref="form"
            //onSubmit={this.onSubmit}
            >
              {formTitle}
              {formFirstname}
              {formLastname}
              {formUsername}
              {formEmail}
              {formPassword}

              <TouchableOpacity
                disabled={disabledButton}
                onPress={() => onSubmit()}
              >
                <View pointerEvents="none" style={styles.groupinput}>
                  <Button
                    loading={loading}
                    style={{ backgroundColor: colorButton }}
                    full
                  >
                    <Text style={{ color: colorButtonText }}>
                      Sign Up
                    </Text>
                  </Button>
                </View>
              </TouchableOpacity>

            </Form>
          </View>
        </ScrollView>
        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          messageNumOfLines={10}
          closeInterval={10000}
        />
      </View>
    </SafeAreaView>
  );

}