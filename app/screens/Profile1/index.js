import React, { Component, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,
  Share,
  StatusBar,
  Linking,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";

import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Tag,
  Button,
  HelpBlock,
  Coupon,
  Kunjungan,
  IconIons
} from "@components";
import styles from "./styles";
import CardCustomProfile from "../../components/CardCustomProfile";
import NotYetLogin from "../../components/NotYetLogin";
import AnimatedLoader from "react-native-animated-loader";
import { DataMasterDiskon } from "@data";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Modal from "react-native-modal";
// import appleAuth, {
//   AppleButton,
//   AppleAuthError,
//   AppleAuthRequestScope,
//   AppleAuthRequestOperation,
// } from "@invertase/react-native-apple-authentication";
import CardCustomTitle from "../../components/CardCustomTitle";
import CouponCard from "../../components/CouponCard";
// Load sample data
import {
  UserData,
  HotelData,
  TourData,
  CouponsData,
  DataKunjungan,
} from "@data";
import ImagePicker from "react-native-image-crop-picker";
import DropdownAlert from "react-native-dropdownalert";
import { GetSocialUI, InvitesView } from "getsocial-react-native-sdk";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import ProductListCommon from "../../components/ProductList/Common.js";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions, ApplicationActions } from "@actions";
import { set } from "react-native-reanimated";

export default function Profile1(props) {
  let { navigation } = props;
  const dispatch = useDispatch();
  const login = useSelector((state) => state.application.loginStatus);
  const userSession = useSelector((state) => state.application.userSession);
  const configApi = useSelector((state) => state.application.configApi);
  const config = useSelector((state) => state.application.config);
  console.log("loginProfile1", JSON.stringify(login));
  console.log("userSessionProfile1", JSON.stringify(userSession));
  console.log("configApi", JSON.stringify(configApi));

  const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
  const [coupons, setCoupons] = useState(CouponsData);
  const [modalDelAccount, setModalDelAccount] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [point, setPoint] = useState(0);
  const [profile, setProfile] = useState({});
  const [listDataCustomer, setListDataCustomer] = useState([
    {
      key: 1,
      label: "Contact",
      old: "adult",
      fullname: "Mr arif pambudi",
      firstname: "arif",
      lastname: "pambudi",
      birthday: "",
      nationality: "Indonesia",
      passport_number: "",
      passport_country: "",
      passport_expire: "",
      phone: "79879879879",
      title: "Mr",
      email: "matadesaindotcom@gmail.com",
      nationality_id: "ID",
      nationality_phone_code: "62",
      passport_country_id: "",
    },
  ]);
  useEffect(() => {
    if (login == true) {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        getCoupon();
        setUser();
        getProfile();
      }

      const navFocusListener = navigation.addListener("didFocus", () => {
        getCoupon();
        setUser();
        getProfile();
      });

      return () => {
        navFocusListener.remove();
      };
    }
  }, []);

  async function getCoupon() {
    setLoadingSpinner(true);
    if (login == true) {
      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url =
        baseUrl + "promotion/coupon/active?id_user=" + userSession.id_user;
      console.log("configApi", JSON.stringify(config));
      console.log("urlss", url);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + config.apiToken);

      var raw = "";

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("getCouponResult", JSON.stringify(result));
          setLoadingSpinner(false);
          setCoupons(result.data);
        })
        .catch((error) => {
          console.log(
            "error",
            "Error",
            "Internet connection problem ! make sure you have an internet connection."
          );
        });
    } else {
      setLoadingSpinner(false);
    }
  }

  async function getProfile() {




    if (login == true) {

      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "user/profile";
      console.log("configApigetprofile", JSON.stringify(config));
      console.log("urlgetProfile", url);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + config.apiToken);


      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };


      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('getprofileresult', JSON.stringify(result));
          setPoint(result.data.point);
          setProfile(result.data);

        })
        .catch(error => console.log('error', error));

    }

  }

  async function setUser() {
    if (login == true) {
      let minDatePassport = new Date();
      minDatePassport = formatDateToString(minDatePassport);
      minDatePassport = minDatePassport;

      let dtDefAdult = new Date();
      dtDefAdult = addDate(dtDefAdult, -13, "years");
      var def_date_adult = formatDateToString(dtDefAdult);

      var def_passport_number = "12345678";
      var def_passport_country = "Indonesia";
      var def_passport_expire = minDatePassport;
      var def_passport_country_id = "ID";
      var def_phone = "12345678";
      var def_email = "email@gmail.com";

      var customer = [];
      for (var i = 1; i <= 1; i++) {
        var obj = {};
        obj["key"] = i;
        obj["label"] = "Contact";
        obj["old"] = "adult";

        obj["fullname"] = userSession.fullname;
        obj["firstname"] = userSession.firstname;
        obj["lastname"] = userSession.lastname;
        obj["birthday"] = "";
        obj["nationality"] = userSession.nationality;
        obj["passport_number"] = "";
        obj["passport_country"] = "";
        obj["passport_expire"] = "";
        obj["phone"] = userSession.phone;
        obj["title"] = userSession.title;
        obj["email"] = userSession.email;

        obj["nationality_id"] = userSession.nationality_id;
        obj["nationality_phone_code"] = userSession.nationality_phone_code;

        obj["passport_country_id"] = "";

        customer.push(obj);
      }
      console.log('customerss', JSON.stringify(customer));
      AsyncStorage.setItem("setDataCustomer", JSON.stringify(customer));
      setListDataCustomer(customer);
    }
  }

  async function _signOut() {
    try {
      //await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
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

  function deleteAccount() {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthVerify/setNonActive?e=" + userSession.email;
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
        onLogOut();
        // console.log("resultunverify", JSON.stringify(result));

      })
      .catch((error) => alert("Kegagalan Respon Server"));
  }


  async function onLogOut() {
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

    var redirect = "Home";
    var param = {};
    navigation.navigate("Loading", { redirect: redirect, param: param });

    _signOut();

    //_signOutApple();

  }

  onShare = async () => {
    try {
      const result = await Share.share({
        title: "Refferal Code",
        message: "Master Diskon Refferal Code : " + userSession.username,
        //url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function addDate(dt, amount, dateType) {
    switch (dateType) {
      case "days":
        return dt.setDate(dt.getDate() + amount) && dt;
      case "weeks":
        return dt.setDate(dt.getDate() + 7 * amount) && dt;
      case "months":
        return dt.setMonth(dt.getMonth() + amount) && dt;
      case "years":
        return dt.setFullYear(dt.getFullYear() + amount) && dt;
    }
  }

  function formatDateToString(date) {
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();

    // create the format you want
    return yyyy + "-" + MM + "-" + dd;
  }

  async function claimCoupon(id) {
    var raw = "";
    if (login == true) {
      var param = {
        id: id,
        id_user: userSession.id_user,
        platform: "app",
      };
      var raw = JSON.stringify(param);
      console.log("claimCoupon", raw);
    }

    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "promotion/coupon/claim";
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == false) {
          dropdown.alertWithType(
            "info",
            "Info",
            JSON.stringify(result.message)
          );
        } else {
          dropdown.alertWithType(
            "success",
            "Success",
            JSON.stringify(result.message)
          );
          updateClainPromo(id);
        }
      })
      .catch((error) => {
        console.log(
          "error",
          "Error",
          "Internet connection problem ! make sure you have an internet connection."
        );
      });
  }

  async function updateClainPromo(id) {
    const newProjects = coupons.map((p) =>
      p.id_coupon === id
        ? {
          ...p,
          claimed: 1,
        }
        : p
    );
    console.log("coupons", JSON.stringify(coupons));
    setCoupons(newProjects);
  }

  function renderItem(item, index, loading) {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (index == 0) {
      var margin = { marginLeft: 0, marginRight: 10 };
    } else {
      var margin = { marginRight: 10 };
    }
    return (
      <View>
        {loading == true ? (
          <View />
        ) : (
          <Coupon
            style={[
              {
                marginVertical: 0,
                width: 200,
              },
              margin,
            ]}
            backgroundHeader={BaseColor.primaryColor}
            name={item.coupon_name}
            code={item.coupon_code}
            description={item.coupon_code}
            valid={convertDateText(item.end_date)}
            remain={priceSplitter("Rp " + item.minimum)}
            onPress={() => {
              //alert(item.id_coupon);
              claimCoupon(item.id_coupon);
              //props.navigation.navigate("HotelDetail");
            }}
            quantity={item.quantity}
            claimed={item.claimed}
            usedKuota={item.usedKuota}
            claimable={item.claimed}
            usedCoupon={false}
          />
        )}
      </View>
    );
  }

  function convertDateText(date) {
    var d = new Date(date);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  function updateParticipant(
    key,
    fullname,
    firstname,
    lastname,
    birthday,
    nationality,
    passport_number,
    passport_country,
    passport_expire,
    phone,
    title,
    email,
    nationality_id,
    nationality_phone_code,
    passport_country_id,
    type
  ) {
    let userSessionUpdate = userSession;
    userSessionUpdate.birthday = birthday;
    userSessionUpdate.firstname = firstname;
    userSessionUpdate.fullname = fullname;
    userSessionUpdate.lastname = lastname;
    userSessionUpdate.nationality = nationality;
    userSessionUpdate.nationality_id = nationality_id;
    userSessionUpdate.nationality_phone_code = nationality_phone_code;
    userSessionUpdate.passport_country = passport_country;
    userSessionUpdate.passport_country_id = passport_country_id;
    userSessionUpdate.passport_expire = passport_expire;
    userSessionUpdate.passport_number = passport_number;
    userSessionUpdate.phone = phone;
    userSessionUpdate.title = title;

    AsyncStorage.setItem("userSession", JSON.stringify(userSessionUpdate));
    dispatch(
      ApplicationActions.onChangeUserSession(userSessionUpdate, (response) => {
        console.log("responseReduxAuth", JSON.stringify(response));
      })
    );

    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/user/user_update";
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    var params = { param: userSessionUpdate };
    console.log("userSessionUpdate", JSON.stringify(params));

    var param = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };

    fetch(url, param)
      .then((response) => response.json())
      .then((result) => {
        console.log("resultuserSessionUpdate", JSON.stringify(result));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        alert("Kegagalan Respon Server updateParticipant");
      });
  }

  function updateParticipantPassword(
    passwordOld,
    passwordNew,
    passwordConfirm
  ) {
    var data = {
      passwordOld: passwordOld,
      passwordNew: passwordNew,
      passwordConfirm: passwordConfirm,
    };
    const param = { param: data };
  }



  function sendWhatsApp() {
    //let msg = 'Halo Kak, Saya mau tanya produk' + product.product_name;

    var msg = "";
    msg = "Halo Kak, Saya mau tanya produk";

    let phoneWithCountryCode = "62";

    let mobile =
      Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  }

  var contents = <View />;
  if (loadingSpinner == true) {
    contents = (
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
            source={require("app/assets/loader_wait.json")}
            animationStyle={{ width: 250, height: 250 }}
            speed={1}
          />
        </View>
      </View>
    );
  } else {
    if (login == true) {
      const priceSplitter = (number) =>
        number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      contents = (
        <ScrollView style={{ marginBottom: 0 }}>
          <View style={{ marginTop: 0 }}>

            <View style={styles.headerContainer}>
              <View style={styles.userRow}>
                <Image
                  style={styles.userImage}
                  source={{ uri: "https://masterdiskon.com/_next/image?url=https%3A%2F%2Fcdn.masterdiskon.com%2Fmasterdiskon%2Ficon%2Ffe%2Fuser.png&w=3840&q=75" }}
                />
                <View style={styles.userNameRow}>
                  <Text style={styles.userNameText}>{profile?.name}</Text>
                </View>
                <View style={styles.userBioRow}>
                  <Text style={styles.userBioText} bold>Jumlah Point :{priceSplitter(profile?.point)}</Text>
                </View>
              </View>

            </View>
            <CardCustomProfile
              title={"Profile"}
              subtitle={"Edit Profiles"}
              icon={"user"}
              onPress={() => {
                props.navigation.navigate("ProfileEdit", {
                  sourcePage: "profile",
                  key: 1,
                  label: "",
                  fullname: userSession.fullname,
                  firstname: userSession.firstname,
                  lastname: userSession.lastname,
                  birthday: userSession.birthday,
                  nationality: userSession.nationality,
                  passport_number: userSession.passport_number,
                  passport_country: userSession.passport_country,
                  passport_expire: userSession.passport_expire,
                  phone: userSession.phone,
                  title: userSession.title,
                  email: userSession.email,

                  nationality_id: userSession.nationality_id,
                  nationality_phone_code: userSession.nationality_phone_code,

                  passport_country_id: userSession.passport_country_id,

                  updateParticipant: updateParticipant,
                  type: "guest",
                  old: "",
                  typeProduct: "",
                });
              }}
            />

            {/* <CardCustomProfile
              title={"Point :" + point}
              subtitle={"Poin user"}
              icon={"code"}
              nav={false}
              onPress={() => {
                setState({ modalVisible: true });
              }}
            /> */}

            <CardCustomProfile
              title={"QuickPick"}
              subtitle={"Isi data penumpang, dengan satu klik"}
              icon={"users"}
              onPress={() => {
                props.navigation.navigate("ProfileSmart", {
                  sourcePage: "profile",
                });
              }}
            />

            {/* <CardCustomProfile
              title={"Review"}
              subtitle={
                userSession.nationality_phone_code + "-" + userSession.phone
              }
              icon={"star"}
              onPress={() => {
                props.navigation.navigate("Review", { sourcePage: "profile" });
              }}
            />

            <CardCustomProfile
              title={"Favorite"}
              subtitle={
                userSession.nationality_phone_code + "-" + userSession.phone
              }
              icon={"heart"}
              onPress={() => {
                props.navigation.navigate("ProductList", {
                  sourcePage: "profile",
                });
              }}
            /> */}

            <CardCustomProfile
              title={"Bantuan"}
              subtitle={"Apa yang bisa kami bantu?"}
              icon={"hands-helping"}
              onPress={() => {
                props.navigation.navigate("Bantuan");
              }}
            />

            <CardCustomProfile
              title={"Handphone"}
              subtitle={
                userSession.nationality_phone_code + "-" + userSession.phone
              }
              icon={"phone"}
              onPress={() => {
                //props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
              }}
            />

            <CardCustomProfile
              title={"Kode Referal"}
              subtitle={"Share kode"}
              icon={"share"}
              onPress={() => {
                onShare(userSession.username);
              }}
            />


            <CardCustomProfile
              title={"Kontak Kami"}
              subtitle={"Tanyakan kami bila ada kendala"}
              icon={"phone"}
              onPress={() => {
                sendWhatsApp();

              }}
            />



            <CardCustomProfile
              title={"Delete Account"}
              subtitle={"Hapus akun anda"}
              icon={"user-minus"}
              onPress={() => {
                setModalDelAccount(true);
              }}
            />

            <Modal isVisible={modalDelAccount}
            >
              <View style={{ flexDirection: 'column', backgroundColor: BaseColor.whiteColor, padding: 20 }}>
                <Text body1>Delete Account</Text>
                <Text caption1 >Anda yakin mau delete akun Anda ?</Text>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TouchableOpacity
                    style={{ marginRight: 20 }}
                    activeOpacity={0.9}
                    onPress={() => {

                      deleteAccount();
                    }}
                  >
                    <Text body2 bold>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setModalDelAccount(false);
                    }}
                  >
                    <Text body2 bold>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <CardCustomProfile
              title={"Sign Out"}
              subtitle={"Keluar akun"}
              icon={"sign-out-alt"}
              onPress={() => {
                onLogOut();
              }}
            />

            <CardCustomProfile
              title={
                Platform.OS == "android"
                  ? dataMasterDiskon.versionInPlayStoreName
                  : dataMasterDiskon.versionInAppStoreName
              }
              subtitle={"App Version"}
              icon={"code"}
              nav={false}
              onPress={() => {
                setState({ modalVisible: true });
              }}
            />

            {/* {coupons.length != 0 ? (
              <View>
                <CardCustomTitle
                  style={{ marginLeft: 20 }}
                  title={"Promo"}
                  desc={""}
                  more={false}
                  onPress={() => navigation.navigate("HotelCity")}
                />

                <View style={{ marginLeft: 20 }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={coupons}
                    keyExtractor={(item, index) => item.id_coupon}
                    renderItem={({ item, index }) =>
                      renderItem(item, index, loadingSpinner)
                    }
                  />
                </View>
              </View>
            ) : (
              <View></View>
            )} */}
          </View>
        </ScrollView>
      );
    } else {
      contents = <NotYetLogin redirect={"Home"} navigation={navigation} />;
    }
  }
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        { backgroundColor: BaseColor.primaryColor, marginBottom: 50 },
      ]}
      forceInset={{ top: "always" }}
    >
      <StatusBar backgroundColor={BaseColor.primaryColor} />

      <Header
        title="Profile"
        renderLeft={() => {
          return (
            <Icon name="md-arrow-back" size={20} color={BaseColor.whiteColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>{contents}</View>
      <DropdownAlert
        ref={(ref) => (dropdown = ref)}
        messageNumOfLines={10}
        closeInterval={10000}
      />
    </SafeAreaView>
  );
}
