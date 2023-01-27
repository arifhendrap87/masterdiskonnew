// import React, { Component } from "react";
import React, { useRef, Component } from 'react';
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

export default class SignUp extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      recaptcha: '',
      // name: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      title: "",

      loading: false,
      success: {
        firstname: true,
        lastname: true,
        username: true,
        password: true,
        passwordConfirm: true,
        email: true,
      },

      colorButton: BaseColor.greyColor,
      colorButtonText: BaseColor.whiteColor,
      disabledButton: true,
      modalVisible: false
    };
    this.getConfig();
    this.getSession();
    this.getConfigApi();

    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  //memanggil config
  getConfigApi() {
    AsyncStorage.getItem("configApi", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        this.setState({ configApi: config });
      }
    });
  }

  // componentWillMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick() {
  //     this.props.navigation.navigate('SignIn');
  //     //this.props.navigation.goBack(null);
  //     return true;
  // }

  getConfig() {
    AsyncStorage.getItem("config", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        ////console.log('getConfig',config);
        this.setState({ config: config });
      }
    });
  }
  getSession() {
    AsyncStorage.getItem("userSession", (error, result) => {
      if (result) {
        let userSession = JSON.parse(result);
        var id_user = userSession.id_user;
        this.setState({ id_user: id_user });
        this.setState({ userSession: userSession });
        this.setState({ login: true });
      }
    });
  }

  onSubmit() {
    const { navigation } = this.props;
    let {
      config,
      name,
      title,
      firstname,
      lastname,
      username,
      password,
      passwordConfirm,
      email,
      address,
      success,
    } = this.state;

    this.setState({ loading: true });
    if (
      title == "" ||
      firstname == "" ||
      lastname == "" ||
      username == "" ||
      password == "" ||
      passwordConfirm == "" ||
      email == ""
    ) {
      this.setState({
        success: {
          ...success,
          title: title != "" ? true : false,
          firstname: firstname != "" ? true : false,
          lastname: lastname != "" ? true : false,
          username: username != "" ? true : false,
          password: password != "" ? true : false,
          passwordConfirm: passwordConfirm != "" ? true : false,
          email: email != "" ? true : false,
        },
      });
    } else {
      let config = this.state.configApi;

      let baseUrl = config.apiBaseUrl;
      var url = baseUrl + 'auth/register';

      var paramSubmit = {
        title: title,
        first: firstname,
        last: lastname,
        username: username,
        email: email,
        password: password,
        referral: '',
        captcha: '',
        nationality: '',
        phone_code: '',
        phone: '',

        address: '',
        birthdate: '',
        id_province: '',
        name_province: '',
        id_city: '',
        city_name: ''
      }
      console.log('url', JSON.stringify(url));
      console.log('paramSubmit', JSON.stringify(paramSubmit));


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNjM5LCJyb2xlIjoidXNlciJ9LCJleHAiOjE2NjQwMTQyODUxMTYsImlhdCI6MTY2MzkyNzg4NX0.w9i6AA-aP0GhJRhmM5Uj9uCokoOGJ1Dj0nN3ErzlnN8");

      var raw = JSON.stringify(paramSubmit);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('resultRegister', JSON.stringify(result));
          if (result.success == false) {
            this.dropdown.alertWithType('info', 'Info', result.message);

          } else {

          }

        })
        .catch(error => {
          console.log('error', error);
        });



    }
  }

  // onLoginGoogle(param) {
  //   const { redirect, config } = this.state;
  //   const { navigation } = this.props;

  //   var url = config.baseUrl + "front/api_new/AuthLogin/login_app_google";

  //   // const param=param;
  //   // console.log('dataParamLoginGoogle',JSON.stringify(param));

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var raw = JSON.stringify(param);
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("onLoginGoogle", JSON.stringify(result));
  //       var userSession = result.userSession;
  //       userSession.loginVia = "google";
  //       this.setState({ loading: false });
  //       if (result.success == false) {
  //         this.dropdown.alertWithType(
  //           "info",
  //           "Info",
  //           JSON.stringify(result.message)
  //         );
  //         if (result.error == "not_verify") {
  //           navigation.navigate("Verify", {
  //             user: userSession,
  //             redirect: this.props.navigation.state.params.redirect,
  //             param: this.props.navigation.state.params.param,
  //           });

  //           console.log(
  //             "navverify",
  //             JSON.stringify({
  //               user: userSession,
  //               redirect: this.props.navigation.state.params.redirect,
  //               param: this.props.navigation.state.params.param,
  //             })
  //           );
  //         }
  //       }
  //     })
  //     .catch((error) => alert("Kegagalan Respon Server"));
  // }

  // validationSubmit() {
  //   this.validate({
  //     passwordConfirm: { required: true },
  //     password: { required: true },
  //     email: { required: true, email: true },
  //     username: { required: true },
  //     firstname: { required: true },
  //     lastname: { required: true },
  //   });

  //   var errorMsg = this.getErrorMessages();
  //   return errorMsg;
  // }


  validation() {
    let {
      name,
      title,
      firstname,
      lastname,
      username,
      password,
      passwordConfirm,
      email,
      address,
      success,
    } = this.state;

    var dataForm = {
      title: title,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      email: email,
    };


    if (
      title != "" &&
      firstname != "" &&
      lastname != "" &&
      username != "" &&
      password != "" &&
      passwordConfirm != "" &&
      email != ""
    ) {
      this.setState({ colorButton: BaseColor.secondColor });
      this.setState({ colorButtonText: BaseColor.primaryColor });
      this.setState({ disabledButton: false });
      //}
    } else {
      this.setState({ colorButton: BaseColor.greyColor });
      this.setState({ colorButtonText: BaseColor.whiteColor });
      this.setState({ disabledButton: true });
    }
  }

  // handleChange = (key, val, validate) => {
  //   this.setState({ [key]: val });

  //   setTimeout(() => {
  //     this.validation();
  //   }, 50);
  // };

  render() {
    const { navigation } = this.props;
    let {
      loading,
      firstname,
      lastname,
      username,
      password,
      passwordConfirm,
      email,
      success,
    } = this.state;

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
              this.setState({ modalVisible: true })
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
                  value={this.state.title}
                  onChangeText={(title) => {
                    this.setState({ title: title });
                    setTimeout(() => {
                      this.validation();
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
          isVisible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setState({ modalVisible: false })
          }}
          onSwipeComplete={() => {
            this.setState({ modalVisible: false })
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
                  value: 'mr'
                },
                {
                  key: 'mrs',
                  value: 'mrs'
                }
              ].map((item, index) => (
                <TouchableOpacity
                  style={styles.contentActionModalBottom}
                  key={item.value}
                  onPress={() => {
                    this.setState({ title: item.key });
                    this.setState({ modalVisible: false })
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
                value={this.state.firstname}
                onChangeText={(firstname) => {
                  this.setState({ firstname: firstname });
                  setTimeout(() => {
                    this.validation();
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
                value={this.state.lastname}
                onChangeText={(lastname) => {
                  this.setState({ lastname: lastname });
                  setTimeout(() => {
                    this.validation();
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
                value={this.state.username}
                onChangeText={(username) => {
                  this.setState({ username: username });
                  setTimeout(() => {
                    this.validation();
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
                validators={["required", "isEmail"]}
                errorMessages={["This field is required", "Email invalid"]}
                placeholder="e.g., johndoe@email.com"
                type="text"
                value={this.state.email}
                onChangeText={(email) => {
                  //setEmail(text.toLowerCase());
                  this.setState({ email: email.toLowerCase() });
                  setTimeout(() => {
                    this.validation();
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
                value={this.state.password}
                onChangeText={(password) => {
                  this.setState({ password: password });
                  setTimeout(() => {
                    this.validation();
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

    var formPasswordConfirm = (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity style={{ width: "100%" }}>
          <Text
            caption2
            style={{ marginTop: -15, color: BaseColor.primaryColor }}
          >
            Password Confirmation
          </Text>
          <View style={styles.contentProfile}>
            <View style={{ flex: 6 }}>
              <TextValidator
                name="passwordConfirm"
                label="text"
                secureTextEntry
                validators={["required"]}
                errorMessages={["This field is required"]}
                placeholder="********"
                type="text"
                value={this.state.passwordConfirm}
                onChangeText={(passwordConfirm) => {
                  this.setState({ passwordConfirm: passwordConfirm });
                  setTimeout(() => {
                    this.validation();
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
                ref="form"
              //onSubmit={this.onSubmit}
              >
                {formTitle}
                {formFirstname}
                {formLastname}
                {formUsername}
                {formEmail}
                {formPassword}
                {formPasswordConfirm}
                <TouchableOpacity
                  disabled={this.state.disabledButton}
                  onPress={() => this.onSubmit()}
                >
                  <View pointerEvents="none" style={styles.groupinput}>
                    <Button
                      loading={this.state.loading}
                      style={{ backgroundColor: this.state.colorButton }}
                      full
                    >
                      <Text style={{ color: this.state.colorButtonText }}>
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
}
