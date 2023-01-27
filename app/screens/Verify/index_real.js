import React, { Component } from "react";
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

export default class Verify extends ValidationComponent {
  constructor(props) {
    super(props);

    var user = "";
    if (this.props.navigation.state.params.user) {
      user = this.props.navigation.state.params.user;
    }
    this.state = {
      email: user.email,
      user: user,
      code: "",
      referral: "",
    };
    this.getConfig();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getConfigApi();
  }

  getConfigApi() {
    AsyncStorage.getItem("configApi", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        this.setState({ configApi: config });
      }
    });
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    //this.props.navigation.navigate('SignIn');
    this.props.navigation.goBack(null);
    return true;
  }

  getConfig() {
    AsyncStorage.getItem("config", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        //console.log('getConfig',config);
        this.setState({ config: config });
      }
    });
  }

  onResend() {
    const { email, password, success, redirect, code } = this.state;
    const { navigation } = this.props;

    let config = this.state.configApi;
    let baseUrl = config.baseUrl;
    let url =
      baseUrl + "front/api_new/AuthLogin/revermail?email=" + this.state.email;
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    // var url = config.baseUrl;
    var myHeaders = new Headers();
    //myHeaders.append("Cookie", "ci_session=e30beo9broapl8qr0c9nvgmlegu31rlg");
    this.setState({ loading_verify: true });
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ loading_verify: false });
        this.dropdown.alertWithType(
          "success",
          "Success",
          JSON.stringify(result.message)
        );
      })
      .catch((error) => alert("Kegagalan Respon Server"));
  }

  onSubmit() {
    const { email, password, success, redirect, code, referral } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });

    let config = this.state.configApi;
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
        this.setState({ loading: false });
        if (result.success == false) {
          this.dropdown.alertWithType(
            "info",
            "Info",
            JSON.stringify(result.message)
          );
        } else if (result.success == true) {
          var user = this.state.user;
          user.referral_code = result.refferal_code;

          this.dropdown.alertWithType(
            "success",
            "Success",
            JSON.stringify(result.message)
          );
          AsyncStorage.setItem("userSession", JSON.stringify(user));
          AsyncStorage.setItem("id_user", JSON.stringify(user.id_user));

          setTimeout(() => {
            navigation.navigate("Loading", {
              redirect: this.props.navigation.state.params.redirect,
              param: this.props.navigation.state.params.param,
            });
          }, 50);
        }
      })
      .catch((error) => alert("Kegagalan Respon Server"));
  }

  render() {
    const { navigation } = this.props;
    let { } = this.state;

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
                value={this.state.code}
                onChangeText={(code) => {
                  this.setState({ code: code });
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
                value={this.state.referral}
                onChangeText={(referral) => {
                  this.setState({ referral: referral });
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
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            //navigation.goBack();
            navigation.navigate("SignIn");
          }}
        />
        <ScrollView>
          <View style={styles.contain}>
            <Text>
              Masukkan Kode 6 digit yang sudah kami kirim ke email{" "}
              {this.state.email} untuk verifikasi akun Anda
            </Text>
            <Form
              ref="form"
              //onSubmit={this.onSubmit}
              style={{ marginTop: 50 }}
            >
              {formCode}

              <Button
                loading={this.state.loading}
                style={{ backgroundColor: BaseColor.primaryColor }}
                full
                onPress={() => {
                  this.onSubmit();
                }}
              >
                <Text style={{ color: BaseColor.whiteColor }}>Verifikasi</Text>
              </Button>

              <Button
                loading={this.state.loading_verify}
                style={{ backgroundColor: BaseColor.secondColor }}
                full
                onPress={() => {
                  this.onResend();
                }}
              >
                <Text>Kirim Ulang</Text>
              </Button>
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
}
