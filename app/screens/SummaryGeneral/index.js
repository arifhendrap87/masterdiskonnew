import React, { Component, useEffect, useState, useCallback } from "react";
import { AuthActions, ApplicationActions } from "@actions";

import {
  BackHandler,
  View,
  ScrollView,
  Animated,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Switch,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  FlightPlan,
  Text,
  Button,
  ProfileDetail,
  FlightDetailVia
} from "@components";
import Spinner from 'react-native-loading-spinner-overlay';

import { AsyncStorage, Platform } from "react-native";
import { PackageData } from "@data";
import DropdownAlert from "react-native-dropdownalert";
import { UserData } from "@data";
import AnimatedLoader from "react-native-animated-loader";
import NotYetLogin from "../../components/NotYetLogin";
import Modal from "react-native-modal";
// import { TSpan } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { set } from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import CardCustom from "../../components/CardCustom";
import SignIn from "app/components/Signin";
const styles = StyleSheet.create({
  contain: {
    padding: 20,
    width: "100%",
  },
  line: {
    width: "100%",
    height: 1,
    borderWidth: 0.5,
    borderColor: BaseColor.dividerColor,
    borderStyle: "dashed",
    marginTop: 15,
  },
  contentButtonBottom: {
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center",
  },

  textInput: {
    height: 56,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  contentProfile: {
    flexDirection: "row",
    //backgroundColor: BaseColor.fieldColor,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: BaseColor.greyColor,
    padding: 5,
  },
  searchIcon: {
    flex: 1,
    padding: 10,
  },

  contentForm: {
    padding: 10,
    borderRadius: 8,
    width: "100%",
    //backgroundColor: BaseColor.fieldColor
    borderRadius: 8,
    borderWidth: 3,
    borderColor: BaseColor.fieldColor,
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
  blockView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    backgroundColor: BaseColor.whiteColor,

    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // padding:20,
    marginBottom: 10,
  },
});

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SummaryGeneral(props) {
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);

  let { navigation } = props;
  const dispatch = useDispatch();

  const [login, setLogin] = useState(
    useSelector((state) => state.application.loginStatus) ? true : false
  );
  const userSession = useSelector((state) => state.application.userSession);
  const configApi = useSelector((state) => state.application.configApi);

  const [paramAll, setParamAll] = useState(
    navigation.state.params && navigation.state.params.param
      ? navigation.state.params.param
      : []
  );


  //------------------------parameter untuk flight------------------------//
  const [selectDataDeparture] = useState(paramAll.selectDataDeparture);
  const [selectDataReturn] = useState(paramAll.selectDataReturn);
  const [departurePost] = useState(paramAll.departurePost);
  const [returnPost] = useState(paramAll.returnPost);
  const [extra, setExtra] = useState(paramAll.extra);
  const [resultVia] = useState(paramAll.resultVia);
  const [productBooking] = useState(paramAll.productBooking);

  //------------------------parameter inti------------------------//
  const [product] = useState(paramAll.product);
  const [productPart] = useState(paramAll.productPart);
  const [param] = useState(paramAll.param);
  console.log('productPart', JSON.stringify(paramAll.productPart));
  console.log('param', JSON.stringify(paramAll.param));

  //------------------------parameter flight------------------------//
  var jumlahPenumpang = param.Qty;
  console.log("jumlahPenumpang", jumlahPenumpang);

  var tambahanBagasix = {};
  var extraBaggagex = [];
  var extraMealx = [];
  var ssrx = [];
  var tambahanMakananx = {};

  if (param.type == "flight") {
    tambahanBagasix.desc = "Tidak tambah bagasi";
    tambahanBagasix.code = "";
    tambahanBagasix.amount = 0;

    tambahanMakananx.desc = "Tidak tambah makanan";
    tambahanMakananx.code = "";
    tambahanMakananx.amount = 0;

    if (extra.baggage.length != 0) {
      extraBaggagex.push(tambahanBagasix);
      Array.prototype.push.apply(extraBaggagex, extra.baggage[0].data);
      console.log("extraBaggagex", JSON.stringify(extraBaggagex));
      for (a = 1; a <= jumlahPenumpang; a++) {
        var obj = {};
        obj["number"] = a;
        obj["num"] = a.toString() + "-baggage";
        obj["desc"] = tambahanBagasix.desc;
        obj["code"] = tambahanBagasix.code;
        // obj['amount'] = tambahanBagasi.amount;
        obj["key"] = extra.baggage[0].key;
        obj["ssrType"] = "baggage";
        ssrx.push(obj);
      }
    }

    if (extra.meal.length != 0) {
      extraMealx.push(tambahanMakananx);
      Array.prototype.push.apply(extraMealx, extra.meal[0].data);
      console.log("extraMealx", JSON.stringify(extraMealx));
      for (a = 1; a <= jumlahPenumpang; a++) {
        var obj = {};
        obj["number"] = a;
        obj["num"] = a.toString() + "-meal";
        obj["desc"] = tambahanMakananx.desc;
        obj["code"] = tambahanMakananx.code;
        // obj['amount'] = tambahanMakanan.amount;
        obj["key"] = extra.meal[0].key;
        obj["ssrType"] = "meal";
        ssrx.push(obj);
      }
    }
  }

  //------------------------parameter flight----------------------//


  const [colorButton, setColorButton] = useState(BaseColor.greyColor);
  const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
  const [disabledButton, setDisabledButton] = useState(true);

  const [dataCount, setDataCount] = useState({});
  const [listdataCustomer, setListdataCustomer] = useState([]);
  const [listdataParticipant, setListdataParticipant] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [spinner, setSpinner] = useState(false)
  const [loadingSpinnerFile, setLoadingSpinnerFile] = useState(
    require("app/assets/loader_flight.json")
  );
  const [loadingSpinnerTitle, setLoadingSpinnerTitle] = useState(
    "Connecting with masterdiskon"
  );

  const [couponCode] = useState("Pilih kupon");
  const [couponCodeList, setCouponCodeList] = useState([]);

  const [couponCodeListId, setCouponCodeListId] = useState([]);
  const [loadingCheckCoupon] = useState(false);
  const [discountPoint, setDiscountPoint] = useState(0);
  const [discountPointSisa, setDiscountPointSisa] = useState(0);
  const [discountCoupon, setDiscountCoupon] = useState(0);

  const [reminders, setReminders] = useState(false);
  const [remindersInsurance, setRemindersInsurance] = useState(false);

  const [usePointUser, setUsePointUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(false);

  const [errorFormCustomer, setErrorFormCustomer] = useState(false);
  const [styleFormCustomer, setStyleFormCustomer] = useState({
    flexDirection: "row",
    backgroundColor: BaseColor.fieldColor,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: BaseColor.fieldColor,
    padding: 5,
  });
  const [typeFlight, setTypeFlight] = useState("");
  const [arr_old] = useState(convertOld(param));
  const [errorValidationCustomer, setErrorValidationCustomer] = useState([
    {
      'key': 1,
      'statusError': false
    },
    {
      'key': 2,
      'statusError': false
    },
    {
      'key': 3,
      'statusError': false
    },
    {
      'key': 4,
      'statusError': false
    },
    {
      'key': 5,
      'statusError': false
    },
    {
      'key': 1,
      'statusError': false
    },
  ]);
  const [errorValidationParticipant, setErrorValidationParticipant] = useState([
    {
      'key': 1,
      'statusError': false
    },
    {
      'key': 2,
      'statusError': false
    },
    {
      'key': 3,
      'statusError': false
    },
    {
      'key': 4,
      'statusError': false
    },
    {
      'key': 5,
      'statusError': false
    },
    {
      'key': 1,
      'statusError': false
    },
  ]);


  const [ssr, setSsr] = useState(ssrx);
  const [extraBaggage, setExtraBaggage] = useState(extraBaggagex);
  const [extraMeal, setExtraMeal] = useState(extraMealx);
  const [modalTambahanBagasi, setModalTambahanBagasi] = useState(false);
  const [modalTambahanMakanan, setModalTambahanMakanan] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);
  const [activeExtra, setActiveExtra] = useState(0);
  const [modalCoupon, setModalCoupon] = useState(false);
  const [msgCoupon, setMsgCoupon] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(false);
  const [expandedProduct1, setExpandedProduct1] = useState(false);

  const priceSplitter = (number) =>
    number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  useEffect(() => {
    console.log("userSession", userSession);
    console.log("login", login);


    if (login == true) {
      cekLoginForm(userSession.email, userSession.password);
      setLoadingSpinner(false);
    } else {
      count(ssr);
      if (param.type == "flight") {
        typeFlightF(param);
      }
      setParticipant();
      setLoadingSpinner(false);
    }
    return () => { };
  }, []);

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

        var userSessionData = result.userSession;
        userSessionData.loginVia = "form";
        userSessionData.password = password2;

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

        count(ssr);
        if (param.type == "flight") {
          typeFlightF(param);
        }
        setParticipant();
      })
      .catch((error) => {
        alert(error);
        ////console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
      });
  }

  //-----------functionFlight---------//

  function typeFlightF(param) {
    const data = {
      fromCode: param.Origin,
      toCode: param.Destination,
    };
    const paramData = { param: data };

    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/api/get_type_flight";
    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);
    var param = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramData),
    };

    fetch(url, param)
      .then((response) => response.json())
      .then((result) => {
        console.log("typeFlightsss", JSON.stringify(result));
        setTypeFlight(result.typeFlight);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.dropdown.alertWithType(
          "info",
          "InfotypeFlightF",
          JSON.stringify(error)
        );
      });
  }



  function extraUpdate(num, item) {
    console.log("itemUpdate", num, JSON.stringify(item));
    //var ssr = this.state.ssr;
    const ssrNew = ssr.map((p) =>
      p.num === num
        ? {
          ...p,
          desc: item.desc,
          code: item.code,
        }
        : p
    );

    console.log("ssrNew", JSON.stringify(ssrNew));
    return ssrNew;
  }

  function updateParticipantExtra(key, extraItem, extraType) {
    var resultParsed = listdataParticipant;

    const newProjects = resultParsed.map((p) =>
      p.key === key
        ? {
          ...p,
          //ssr: p.ssr.push(extraItem),
          nationality: "xxxx",
        }
        : p
    );

    setListdataParticipant(newProjects);
  }

  function contentTambahanBagasi(index) {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var contentTambahanBagasi = <View />;
    if (extra.baggage.length != 0 || extraBaggage.length != 0) {
      contentTambahanBagasi = (
        <View style={[styles.contentProfile]}>
          <ProfileDetail
            textFirst={"Tambahan Bagasi"}
            textSecond={filterValue(ssr, "num", index, "-baggage").desc}
            icon={"create-outline"}
            onPress={() => {
              setActiveExtra(index);
              setModalTambahanBagasi(true);
            }}
            viewImage={false}
            style={{ flex: 10, marginRight: 10 }}
          />
          <Modal
            isVisible={modalTambahanBagasi}
            onBackdropPress={() => {
              setActiveExtra(0);
              setModalTambahanBagasi(false);
            }}
            onSwipeComplete={() => {
              setActiveExtra(0);
              setModalTambahanBagasi(false);
            }}
            swipeDirection={["down"]}
            style={styles.bottomModal}
          >
            <View style={styles.contentFilterBottom}>
              <View style={styles.contentSwipeDown}>
                <View style={styles.lineSwipeDown} />
              </View>
              {extraBaggage.map((item) => (
                <TouchableOpacity
                  style={styles.contentActionModalBottom}
                  //key={index2}
                  onPress={() => {
                    console.log(
                      "itemTambahanBagasi" + activeExtra,
                      JSON.stringify(item)
                    );
                    var ssrNew = extraUpdate(
                      activeExtra.toString() + "-baggage",
                      item
                    );

                    updateParticipantExtra(activeExtra, item, "baggage");

                    console.log("ssrNew", JSON.stringify(ssrNew));
                    setSsr(ssrNew);
                    //setTambahBagasi(item);
                    setModalTambahanBagasi(false);
                    setActiveExtra(0);

                    setTimeout(() => {
                      count(ssrNew);
                    }, 20);
                  }}
                >
                  <Text>{item.desc}</Text>
                  <Text> {"IDR " + priceSplitter(item.amount)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      );
    }
    return contentTambahanBagasi;
  }

  function contentTambahanMakanan(index) {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    var contentTambahanMakanan = <View />;
    if (extra.meal.length != 0 || extraMeal.length != 0) {
      var contentTambahanMakanan = (
        <View style={styles.contentProfile}>
          <ProfileDetail
            textFirst={"Tambah makanan"}
            textSecond={filterValue(ssr, "num", index, "-meal").desc}
            icon={"create-outline"}
            onPress={() => {
              setActiveExtra(index);
              setModalTambahanMakanan(true);
            }}
            viewImage={false}
            style={{ flex: 10, marginRight: 10 }}
          />
          <Modal
            isVisible={modalTambahanMakanan}
            onBackdropPress={() => {
              setActiveExtra(0);
              setModalTambahanMakanan(false);
            }}
            onSwipeComplete={() => {
              setActiveExtra(0);
              setModalTambahanMakanan(false);
            }}
            swipeDirection={["down"]}
            style={styles.bottomModal}
          >
            <View style={styles.contentFilterBottom}>
              <View style={styles.contentSwipeDown}>
                <View style={styles.lineSwipeDown} />
              </View>
              {extraMeal.map((item) => (
                <TouchableOpacity
                  style={styles.contentActionModalBottom}
                  key={item.desc}
                  onPress={() => {
                    console.log(
                      "itemTambahanMakanan" + activeExtra,
                      JSON.stringify(item)
                    );
                    var ssrNew = extraUpdate(
                      activeExtra.toString() + "-meal",
                      item
                    );

                    console.log("ssrNew", JSON.stringify(ssrNew));
                    setSsr(ssrNew);
                    setTambahMakanan(item);
                    setModalTambahanMakanan(false);
                    setActiveExtra(0);

                    setTimeout(() => {
                      count(ssrNew);
                    }, 20);
                  }}
                >
                  <Text>{item.desc}</Text>
                  <Text> {"IDR " + priceSplitter(item.amount)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      );
    }
    return contentTambahanMakanan;
  }

  //-------------------functionFlight-------------------//

  function setParticipant() {
    let typeProduct = param.type;

    let dtDefPassportExpired = new Date();
    dtDefPassportExpired = addDate(dtDefPassportExpired, -7, "months");
    var def_passport_expire = formatDateToString(dtDefPassportExpired);

    let dtDefAdult = new Date();
    dtDefAdult = addDate(dtDefAdult, -13, "years");
    var def_date_adult = formatDateToString(dtDefAdult);

    var def_passport_number = "12345678";
    var def_passport_country = "Indonesia";
    var def_passport_country_id = "ID";
    var def_phone = "12345678";
    var def_email = "email@gmail.com";
    var customer = [];


    if (login == true) {

      for (var i = 1; i <= 1; i++) {
        var obj = {};
        obj["key"] = i;
        obj["label"] = "Contact";
        obj["old"] = "adult";
        obj["fullname"] = userSession.fullname;
        obj["firstname"] = userSession.firstname;
        obj["lastname"] = userSession.lastname;
        obj["birthday"] = def_date_adult;
        obj["nationality"] = userSession.nationality;
        obj["passport_number"] = def_passport_number;
        obj["passport_country"] = def_passport_country;
        obj["passport_expire"] = def_passport_expire;
        obj["phone"] = userSession.phone;
        obj["title"] = userSession.title;
        obj["email"] = userSession.email;
        obj["nationality_id"] = userSession.nationality_id;
        obj["nationality_phone_code"] = userSession.nationality_phone_code;
        obj["passport_country_id"] = def_passport_country_id;

        customer.push(obj);
      }
    } else {

      for (var i = 1; i <= 1; i++) {
        var obj = {};
        obj["key"] = i;
        obj["label"] = "Contact";
        obj["old"] = "adult";
        obj["fullname"] = "";
        obj["firstname"] = "";
        obj["lastname"] = "";
        obj["birthday"] = def_date_adult;
        obj["nationality"] = "";
        obj["passport_number"] = def_passport_number;
        obj["passport_country"] = def_passport_country;
        obj["passport_expire"] = def_passport_expire;
        obj["phone"] = "";
        obj["title"] = "";
        obj["email"] = "";
        obj["nationality_id"] = "";
        obj["nationality_phone_code"] = "";
        obj["passport_country_id"] = def_passport_country_id;

        customer.push(obj);
      }

    }
    AsyncStorage.setItem("setDataCustomer", JSON.stringify(customer));
    setListdataCustomer(customer);
    console.log('lisdataCustomer', JSON.stringify(customer));






    if (typeFlight == "domestic" || typeProduct == "trip") {
      def_passport_number = def_passport_number;
      def_passport_country = def_passport_country;
      def_passport_expire = def_passport_expire;
      def_phone = def_phone;
      def_email = def_email;
      def_passport_country_id = def_passport_country_id;
    }

    var participant = [];
    for (
      var i = 1;
      i <= (param.type != "general" ? param.Qty : param.qtyProduct);
      i++
    ) {
      if (param.participant == true) {
        if (arr_old[i] == "ADT") {
          old = "adult";
        } else if (arr_old[i] == "CHD") {
          old = "children";
        } else if (arr_old[i] == "INF") {
          old = "baby";
        }
      } else {
        old = "adult";
      }

      var labeldetail = "Penumpang ";
      if (param.type != "flight") {
        labeldetail = "Treveller ";
      }

      var obj = {};
      obj["key"] = i;
      obj["id"] = 0;
      obj["label"] = labeldetail + i + " : " + old;
      obj["old"] = old;

      obj["fullname"] = "";
      obj["firstname"] = "";
      obj["lastname"] = "";
      obj["birthday"] = "";
      obj["nationality"] = "";
      obj["passport_number"] = def_passport_number;
      obj["passport_country"] = def_passport_country;
      obj["passport_expire"] = def_passport_expire;
      obj["phone"] = def_phone;
      obj["title"] = "";
      obj["email"] = def_email;

      obj["nationality_id"] = "";
      obj["nationality_phone_code"] = "";

      obj["passport_country_id"] = def_passport_country_id;
      obj["ssr"] = ssr;

      participant.push(obj);
    }
    AsyncStorage.setItem("setDataParticipant", JSON.stringify(participant));
    setListdataParticipant(participant);

    validation(customer, participant);

    setTimeout(() => {
      console.log("listdata_participant", JSON.stringify(listdataParticipant));
    }, 20);
  }

  async function count(ssr, type = "", pointUse = false) {
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "booking/count";
    console.log("configApi", JSON.stringify(config));
    console.log("urlsscount", url);

    //let param = param;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);
    var paramCount = {};
    paramCount.product = param.type;
    paramCount.key = param.key;
    paramCount.point = pointUse;
    paramCount.insurance = remindersInsurance;
    paramCount.coupon = couponCodeListId;
    paramCount.paymentMethod = 0;
    paramCount.platform = "app";
    paramCount.ssr = extraFilter(ssr);
    if (param.type == "general") {
      paramCount.qty = param.Qty;
    }

    console.log("paramCount", JSON.stringify(paramCount));
    var raw = JSON.stringify(paramCount);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("countssss", JSON.stringify(result));
        console.log("typecoupon", type);
        if (result.success == false) {
          //this.dropdown.alertWithType('info', 'Infocountresult', JSON.stringify(result.message));
          setModalCoupon(true);
          setMsgCoupon(result.message);
          setLoadingSpinner(false);
          if (type == "couponCode") {
            const filteredCoupon = couponCodeListId.filter(
              (coupon) => coupon !== result.note
            );
            setCouponCodeListId(filteredCoupon);
          }
        } else {
          console.log("resultCountss", JSON.stringify(result));
          setLoadingSpinner(false);
          //var dataCount=result.data;

          var dataCount = {
            required_dob: false,
            required_passport: false,
            total_price: result.data.total,
            subtotal_price: result.data.subtotal,
            nett_price: result.data.subtotal,
            iwjr: result.data.iwjr,
            insurance_total: result.data.insurance,
            transaction_fee: result.data.fee,
            transaction_fee2: result.data.fee2,
            tax_fee: result.data.tax,
            point_user: result.data.point,
            addon: result.data.addon,
          };
          setDataCount(result.data);
          ////console.log('countResult', JSON.stringify(result));
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.dropdown.alertWithType(
          "info",
          "Infocounterror",
          JSON.stringify(error)
        );
      });
  }

  function extraFilter(ssr) {
    let filter = ssr.filter((d) => d.code != "");
    console.log("filter", JSON.stringify(filter));
    return filter;
  }

  function convertDateDMY(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  }

  function convertOld(param) {
    var x = 1;
    var y = param.Adults;

    var obj_adult = [];
    for (a = x; a <= y; a++) {
      obj_adult[a] = "ADT";
    }

    var obj_children = [];
    var x = parseInt(param.Adults) + 1;
    var y = parseInt(param.Adults) + parseInt(param.Children);
    for (a = x; a <= y; a++) {
      obj_children[a] = "CHD";
    }

    var obj_infant = [];
    var x = parseInt(param.Adults) + parseInt(param.Children) + 1;
    var y = parseInt(x) + parseInt(param.Infants);
    for (a = x; a < y; a++) {
      obj_infant[a] = "INF";
    }

    var obj_Old = obj_adult.concat(obj_children, obj_infant);

    var a = 1;
    var arrOldGuest = [];
    obj_Old.map((item) => {
      arrOldGuest[a] = item;
      a++;
    });

    return arrOldGuest;
  }

  function rebuildParticipant(participant) {
    var participant_new = [];
    var a = 1;
    participant.map((item) => {
      var obj = {};

      var newArray = ssr.filter(function (el) {
        return el.number === a;
      });

      obj["type"] = item.type;
      obj["title"] = item.title;
      obj["firstName"] = item.firstName;
      obj["lastName"] = item.lastName;
      obj["dob"] = item.dob;
      obj["guestnum"] = item.guestnum;
      // obj['ssr'] = this.filterArray(ssr, a);//ssr;
      // obj['ssr1'] = ssr;
      obj["ssr"] = extraFilter(newArray);
      obj["passport"] = item.passport;
      //obj['ssr'] = newArray;
      //obj['ssr'] = this.groupBy(ssr, (c) => c.number);

      participant_new.push(obj);
      a++;
    });

    return participant_new;
  }

  function getDateDiff(dateOne, dateTwo) {
    if ((dateOne.charAt(2) == "-") & (dateTwo.charAt(2) == "-")) {
      dateOne = new Date(formatDate(dateOne));
      dateTwo = new Date(formatDate(dateTwo));
    } else {
      dateOne = new Date(dateOne);
      dateTwo = new Date(dateTwo);
    }
    let timeDiff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let diffMonths = Math.ceil(diffDays / 31);
    let diffYears = Math.ceil(diffMonths / 12);

    let message =
      "Difference in Days: " +
      diffDays +
      " " +
      "Difference in Months: " +
      diffMonths +
      " " +
      "Difference in Years: " +
      diffYears;
    return diffMonths;
  }

  function convertOldVia(oldType) {
    if (oldType == "ADT") {
      old = "adult";
    } else if (oldType == "CHD") {
      old = "child";
    } else if (oldType == "INF") {
      old = "infant";
    }
    return old;
  }

  function onSubmit() {
    var customer = listdataCustomer[0];
    var participant = listdataParticipant;
    var typeFlight = typeFlight;
    var typeProduct = param.type;

    var valueArr = participant.map(function (item) {
      return item.fullname;
    });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });

    var check = [];
    var a = 1;
    var expiredPasportMonth = "";
    participant.map((item) => {
      var obj = {};
      if (typeFlight == "international") {
        expiredPasportMonth = expiredPasportMonth(item.passport_expire);
        console.log(item.passport_expire, expiredPasportMonth);
        if (expiredPasportMonth <= 6) {
          obj["Penumpang " + a] = "Passpor minimal expired harus 6 bulan";
          check.push(obj);
        }
      }

      a++;
    });

    var key = 1;
    var fullname = customer.fullname;
    var firstname = customer.firstname;
    var lastname = customer.lastname;
    var birthday = customer.birthday;
    var nationality = customer.nationality;
    var passport_number = customer.passport_number;
    var passport_country = customer.passport_country;
    var passport_expire = customer.passport_expire;
    var phone = customer.phone;
    var title = customer.title;
    var email = customer.email;
    var nationality_id = customer.nationality_id;
    var nationality_phone_code = customer.nationality_phone_code;
    var passport_country_id = customer.passport_country_id;
    var type = "guest";

    if (
      firstname == "" ||
      lastname == "" ||
      title == null ||
      email == "" ||
      phone == "" ||
      nationality == null ||
      nationality_phone_code == null
    ) {
      this.dropdown.alertWithType(
        "info",
        "InfoonSubmit",
        "Pastikan data pemesan terisi semua"
      );
    } else if (isDuplicate == true) {
      this.dropdown.alertWithType(
        "info",
        "InfoonSubmit",
        "Data tamu / penumpang tidak boleh double"
      );
    } else if (check.length > 0) {
      this.dropdown.alertWithType(
        "info",
        "InfoonSubmit",
        JSON.stringify(check)
      );
    } else {
      ////console.log('ParamAll', JSON.stringify(paramAll));
      setLoading(true);
      //submitOrder();
      // var paramPreview = {
      //   param: paramAll,
      //   listdataCustomer: listdataCustomer,
      //   listdataParticipant: listdataParticipant,
      //   dataCount: dataCount,
      //   couponCodeListId: couponCodeListId,
      //   Platform: Platform,
      //   arr_old: arr_old,
      //   ssr: ssr

      // };
      // //console.log('paramPreview', JSON.stringify(paramPreview));
      // navigation.navigate('SummaryPreview', paramPreview
      // );
      //console.log('login', login);
      if (login == true) {
        //submitOrder();
        var paramPreview = {
          param: paramAll,
          listdataCustomer: listdataCustomer,
          listdataParticipant: listdataParticipant,
          dataCount: dataCount,
          couponCodeListId: couponCodeListId,
          Platform: Platform,
          arr_old: arr_old,
          ssr: ssr,
          discountCoupon: discountCoupon,
          note: note

        };
        //console.log('paramPreview', JSON.stringify(paramPreview));
        navigation.navigate('SummaryPreview', paramPreview
        );
      } else {
        setSpinner(true);
        cekLoginFormAuth(email, configApi.defPassword, {}, "google");
      }
    }
  }

  function cekLoginFormAuth(email2, password2, dataUser, type = "form") {
    //setLoadingSpinner(true);
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
          configApi.apiToken = result.access_token;
          AsyncStorage.setItem("configApi", JSON.stringify(configApi));
          dispatch(ApplicationActions.onChangeConfigApi(configApi));
          cekLoginFormGuest(email2, password2);
        }
        else {
          var customer = listdataCustomer[0];
          var dataUser = {
            firstname: customer.firstname,
            lastname: customer.lastname,
            username: customer.firstname,
            password: configApi.defPassword,
            passwordConfirm: configApi.defPassword,
            email: customer.email,
          };
          registrasi_proses_app(dataUser);
        }
      })
      .catch((error) => {
        ////console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connections.');
      });
  }

  function cekLoginFormGuest(email2, password2) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthLogin/login_proses_app_guest";

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


        if (result.success == false) {


          this.dropdown.alertWithType(
            "info",
            "Info",
            JSON.stringify(result.message)
          );

        } else if (result.success == true) {
          var userSessionData = result.userSession;
          userSessionData.loginVia = "form";
          userSessionData.password = password2;


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

          var paramPreview = {
            param: paramAll,
            listdataCustomer: listdataCustomer,
            listdataParticipant: listdataParticipant,
            dataCount: dataCount,
            couponCodeListId: couponCodeListId,
            Platform: Platform,
            arr_old: arr_old,
            ssr: ssr,
            discountCoupon: discountCoupon,
            note: note

          };
          setSpinner(false);
          //console.log('paramPreview', JSON.stringify(paramPreview));
          navigation.navigate('SummaryPreview', paramPreview
          );
          //navigation.navigate("Loading", { redirect: redirect, param: param });
        }
      })
      .catch((error) => {
        alert(error);
        ////console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
      });
  }


  function registrasi_proses_app(dataUser) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/AuthRegister/registrasi_proses_app_booking";
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
        //cekLoginFormGuest(dataUser.email, dataUser.password);
        cekLoginFormAuth(dataUser.email, configApi.defPassword, {}, "google");



      })
      .catch((error) => {
        this.setState({ loading: false });
        alert("Kegagalan Respon Server");
      });
  }

  function submitOrder() {
    var customer = listdataCustomer;
    var guest = listdataParticipant;
    console.log("guest", JSON.stringify(guest));

    var contact = {
      title: customer[0].title,
      firstName: customer[0].firstname.replace(/[^A-Za-z]+/g, ''),
      lastName: customer[0].lastname.replace(/[^A-Za-z]+/g, ''),
      //"country": customer[0].nationality_id,
      phoneCode: customer[0].nationality_phone_code,
      phone: customer[0].phone,
      email: customer[0].email,
    };

    var participant = [];
    var a = 1;
    guest.map((item) => {
      var obj = {};
      obj["type"] = convertOldVia(arr_old[a]);
      obj["title"] = item.title;
      obj["firstName"] = item.firstname;
      obj["lastName"] = item.lastname;
      obj["dob"] = convertDateDMY(item.birthday);
      obj["guestnum"] = a;
      obj["passport"] = {
        nat: item.passport_country_id,
        num: item.passport_number,
      };


      participant.push(obj);
      a++;
    });

    console.log("param", JSON.stringify(param));
    console.log("contact", JSON.stringify(contact));
    console.log("guestSubmit", JSON.stringify(guest));
    console.log("participant", JSON.stringify(participant));
    console.log("dataCount", JSON.stringify(dataCount));

    setLoadingSpinnerFile(require("app/assets/loader_flight.json"));
    setLoadingSpinnerTitle("Connecting to Maskapai");

    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    var url = baseUrl + "booking/checkout";
    if (param.type == "hotel") {
      if (config.apiHotel == "traveloka") {
        url = baseUrl + "apitrav/booking/checkout";
      }
    }

    console.log("configApi", JSON.stringify(config));
    console.log("urlss", url);

    var paramCheckout = {};
    paramCheckout.product = param.type;
    paramCheckout.key = param.key;
    if (param.type == "general") {
      paramCheckout.qty = param.Qty;
    }
    paramCheckout.price = {
      subtotal: dataCount.subtotal,
      insurance: dataCount.insurance,
      tax: dataCount.tax,
      iwjr: dataCount.iwjr,
      fee: dataCount.fee,
      fee2: dataCount.fee2,
      addon: dataCount.addon,
      discount: dataCount.discount.grandTotal,
      point: dataCount.point,
      total: dataCount.total,
    };
    paramCheckout.paymentMethod = 0;
    paramCheckout.contact = contact;
    paramCheckout.guest = rebuildParticipant(participant);
    paramCheckout.coupon = couponCodeListId;
    paramCheckout.platform = Platform.OS;
    console.log("paramCheckout", JSON.stringify(paramCheckout));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var raw = JSON.stringify(paramCheckout);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("resultcheckout", JSON.stringify(result));
        setLoadingSpinner(false);

        if (result.success == true) {
          console.log("resultcheckout", JSON.stringify(result));
          var redirect = "Pembayaran";
          var id_order = result.data.id_order;

          var param = {
            id_order: id_order,
            dataPayment: {},
            back: "",
          };
          console.log("paramPembayaran", JSON.stringify(param));
          navigation.navigate("Pembayaran", { param: param });
        } else {
          console.log("Error", JSON.stringify(result));
          this.dropdown.alertWithType(
            "info",
            "InfosubmitOrder",
            JSON.stringify(result)
          );
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        this.dropdown.alertWithType(
          "info",
          "InfosubmitOrder",
          JSON.stringify(error)
        );
      });
  }




  function contentPotonganCoupon() {
    if (loadingSpinner == false) {
      var coupon = dataCount.coupon;
      if (coupon != undefined) {
        if (coupon.length != 0) {
          var contentCodeCouponList = coupon.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 3,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  footnote
                  style={{ color: BaseColor.thirdColor }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    flex: 6,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}

                >

                  <Text
                    footnote
                    semibold
                    numberOfLines={1}
                    style={{ color: BaseColor.thirdColor }}
                  >
                    (Rp {priceSplitter(item.amount)})
                  </Text>
                </View>
              </View>
            );
          });
        } else {
          var contentCodeCouponList = <View />;
        }
      }
    }
    return contentCodeCouponList;
  }




  function contentModalSignIn() {

    var contentModalSignIn = <View />;

    contentModalSignIn = (
      <Modal
        isVisible={modalSignIn}
        onBackdropPress={() => {

          setModalSignIn(false);
        }}
        onSwipeComplete={() => {
          setModalSignIn(false);
        }}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View style={styles.contentFilterBottom}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <SignIn />
        </View>
      </Modal>

    );

    return contentModalSignIn;
  }

  function convertParticipantBirthday(old) {
    let maxDate = new Date();
    let minDate = new Date();
    if (old === "adult") {
      maxDate = this.addDate(maxDate, -12, "years");
      maxDate = this.formatDateToString(maxDate);

      minDate = this.addDate(minDate, -80, "years");
      minDate = this.formatDateToString(minDate);
      type = "ADT";
    } else if (old === "children") {
      maxDate = this.addDate(maxDate, -2, "years");
      maxDate = this.formatDateToString(maxDate);

      minDate = this.addDate(minDate, -11, "years");
      minDate = this.formatDateToString(minDate);
      type = "CHD";
    } else if (old === "baby") {
      maxDate = this.addDate(maxDate, -3, "months");
      maxDate = this.formatDateToString(maxDate);

      minDate = this.addDate(minDate, -24, "months");
      minDate = this.formatDateToString(minDate);
      type = "INF";
    }
    return maxDate;
    //var arr=array[minDate,type];
    // return arr;
  }

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

  function saveParticipant(
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
    old
  ) {
    let config = configApi;
    let baseUrl = config.baseUrl;
    let url = baseUrl + "front/api_new/user/participant_update";
    console.log("configApi", JSON.stringify(config));
    console.log("urlsssaveParticipantsseer", url);

    const data = {
      id: key,
      id_user: userSession.id_user,
      fullname: fullname,
      firstname: firstname,
      lastname: lastname,
      birthday: convertParticipantBirthday(old),
      nationality: nationality,
      passport_number: passport_number,
      passport_country: passport_country,
      passport_expire: passport_expire,
      phone: phone,
      title: title,
      email: email,
      nationality_id: nationality_id,
      nationality_phone_code: nationality_phone_code,
      passport_country_id: passport_country_id,
      type: convertParticipantType(old),
    };
    const param = { param: data };
    console.log("paramSaveParticipant", JSON.stringify(param));
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
        console.log("saveParticipantresult", JSON.stringify(result));

      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        // this.dropdown.alertWithType(
        //   "info",
        //   "InfosaveParticipant",
        //   JSON.stringify(error)
        // );
      });
  }

  function convertParticipantBirthday(old) {
    let maxDate = new Date();
    let minDate = new Date();
    if (old === "adult") {
      maxDate = addDate(maxDate, -12, "years");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -80, "years");
      minDate = formatDateToString(minDate);
      type = "ADT";
    } else if (old === "children") {
      maxDate = addDate(maxDate, -2, "years");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -11, "years");
      minDate = formatDateToString(minDate);
      type = "CHD";
    } else if (old === "baby") {
      maxDate = addDate(maxDate, -3, "months");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -24, "months");
      minDate = formatDateToString(minDate);
      type = "INF";
    }
    return maxDate;
    //var arr=array[minDate,type];
    // return arr;
  }

  function convertParticipantType(old) {
    let maxDate = new Date();
    let minDate = new Date();
    if (old === "adult") {
      maxDate = addDate(maxDate, -12, "years");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -80, "years");
      minDate = formatDateToString(minDate);
      type = "ADT";
    } else if (old === "children") {
      maxDate = addDate(maxDate, -2, "years");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -11, "years");
      minDate = formatDateToString(minDate);
      type = "CHD";
    } else if (old === "baby") {
      maxDate = addDate(maxDate, -3, "months");
      maxDate = formatDateToString(maxDate);

      minDate = addDate(minDate, -24, "months");
      minDate = formatDateToString(minDate);
      type = "INF";
    }
    //return minDate;
    //var arr=array[minDate,type];
    return type;
  }

  function filterArray(array, number) {
    var aquaticCreatures = array.filter(function (creature) {
      return creature.number == number;
    });

    return aquaticCreatures;
  }

  function rebuildParticipant(participant) {
    var participant_new = [];
    var a = 1;
    participant.map((item) => {
      var obj = {};

      var newArray = ssr.filter(function (el) {
        return el.number === a;
      });

      obj["type"] = item.type;
      obj["title"] = item.title;
      obj["firstName"] = item.firstName.replace(/[^A-Za-z]+/g, '');
      obj["lastName"] = item.lastName.replace(/[^A-Za-z]+/g, '');
      obj["dob"] = item.dob;
      obj["guestnum"] = item.guestnum;
      // obj['ssr'] = this.filterArray(ssr, a);//ssr;
      // obj['ssr1'] = ssr;
      obj["ssr"] = extraFilter(newArray);
      obj["passport"] = item.passport;
      //obj['ssr'] = newArray;
      //obj['ssr'] = this.groupBy(ssr, (c) => c.number);

      participant_new.push(obj);
      a++;
    });

    return participant_new;
  }

  function filterValue(obj, key, value, type) {
    return obj.find(function (v) {
      return v[key] === value + type;
    });
    //return key + value;
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
    type,
    old,
    old_select
  ) {
    //const { userSession } = this.state;

    console.log("type", type);
    if (type == "guest") {
      AsyncStorage.getItem("setDataParticipant", (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result);
          let persons = resultParsed;

          var date1 = passport_expire;
          var today = new Date();
          var date2 =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          var expiredPasportMonth = getDateDiff(date2, date1);
          var countPersons = persons.filter(
            (item) => item.fullname === fullname
          );


          if (login == true) {
            const checkParticipant = async () => {
              try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append(
                  "Cookie",
                  "ci_session=okaepmldisibk8nnb05ktaa7nvft3kn8"
                );

                var param = {
                  param: {
                    id: "",
                    id_user: userSession.id_user,
                    fullname: "",
                    firstname: firstname,
                    lastname: lastname,
                    birthday: "",
                    nationality: "",
                    passport_number: "",
                    passport_country: "",
                    passport_expire: "",
                    phone: "",
                    title: title,
                    email: "",
                    nationality_id: "",
                    nationality_phone_code: "",
                    passport_country_id: "",
                    type: "",
                  },
                };
                console.log("paramCheckParticipantss", JSON.stringify(param));
                var raw = JSON.stringify(param);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                let config = configApi;
                let baseUrl = config.baseUrl;
                let url = baseUrl + "front/api_new/user/participant_check";
                console.log("urlss", url);

                let response = await fetch(url, requestOptions);
                let json = await response.json();
                console.log("checkParticipant", JSON.stringify(json));

                var id = 0;
                if (json.length != 0) {
                  id = json[0].id_passenger;
                }

                const newProjects = resultParsed.map((p) =>
                  p.key === key
                    ? {
                      ...p,
                      fullname: fullname,
                      firstname: firstname,
                      lastname: lastname,
                      birthday: convertParticipantBirthday(old),
                      nationality: nationality,
                      passport_number: passport_number,
                      passport_country: passport_country,
                      passport_expire: passport_expire,
                      phone: phone,
                      title: title,
                      email: email,
                      nationality_id: nationality_id,
                      nationality_phone_code: nationality_phone_code,

                      passport_country_id: passport_country_id,
                      id: id,
                    }
                    : p
                );

                AsyncStorage.setItem(
                  "setDataParticipant",
                  JSON.stringify(newProjects)
                );
                setListdataParticipant(newProjects);
                console.log("newProjectsxxxyy", JSON.stringify(newProjects));

                setTimeout(() => {
                  validation(listdataCustomer, newProjects);
                }, 500);

                saveParticipant(
                  id,
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
                  old
                );
              } catch (error) {
                //console.error('ERROR', 'error');
                console.log(JSON.stringify(error));
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
              }
            };
            checkParticipant();
          } else {


            const newProjects = resultParsed.map((p) =>
              p.key === key
                ? {
                  ...p,
                  fullname: fullname,
                  firstname: firstname,
                  lastname: lastname,
                  birthday: convertParticipantBirthday(old),
                  nationality: nationality,
                  passport_number: passport_number,
                  passport_country: passport_country,
                  passport_expire: passport_expire,
                  phone: phone,
                  title: title,
                  email: email,
                  nationality_id: nationality_id,
                  nationality_phone_code: nationality_phone_code,

                  passport_country_id: passport_country_id,
                  // id: id,
                }
                : p
            );

            AsyncStorage.setItem(
              "setDataParticipant",
              JSON.stringify(newProjects)
            );
            setListdataParticipant(newProjects);
            console.log("newProjectsxxxyy", JSON.stringify(newProjects));



            setTimeout(() => {
              validation(listdataCustomer, newProjects);
            }, 500);

          }
        }
      });
    } else if (type == "customer") {
      //let password = this.state.password;
      AsyncStorage.getItem("setDataCustomer", (error, result) => {
        if (result) {
          let resultParsed = JSON.parse(result);
          console.log("setDataCustomer", JSON.stringify(resultParsed));
          const newProjects = resultParsed.map((p) =>
            p.key === key
              ? {
                ...p,
                fullname: fullname,
                firstname: firstname,
                lastname: lastname,
                birthday: birthday,
                nationality: nationality,
                passport_number: passport_number,
                passport_country: passport_country,
                passport_expire: passport_expire,
                phone: phone,
                title: title,
                email: email,
                nationality_id: nationality_id,
                nationality_phone_code: nationality_phone_code,

                passport_country_id: passport_country_id,
              }
              : p
          );

          AsyncStorage.setItem("setDataCustomer", JSON.stringify(newProjects));
          setListdataCustomer(newProjects);

          setTimeout(() => {
            validation(newProjects, listdataParticipant);
          }, 500);

          if (login == true) {

            //jika logig
            userSession.fullname = fullname;
            userSession.firstname = firstname;
            userSession.lastname = lastname;
            userSession.title = title;
            userSession.nationality_phone_code = nationality_phone_code;
            userSession.phone = phone;
            userSession.nationality = nationality;
            userSession.nationality_id = nationality_id;
            console.log("userSessionNew", JSON.stringify(userSession));
            AsyncStorage.setItem("userSession", JSON.stringify(userSession));

            let config = configApi;
            let baseUrl = config.baseUrl;
            let url = baseUrl + "front/api_new/user/user_update";
            console.log("configApi", JSON.stringify(config));
            console.log("urlss", url);

            var params = { param: userSession };
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
        }
      });


      setStyleFormCustomer({
        style_form_customer: {
          flexDirection: "row",
          backgroundColor: BaseColor.fieldColor,
          marginBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: BaseColor.fieldColor,
          padding: 5,
        },
      });
      setErrorFormCustomer(false);

    }
  }

  function validaton_participant(listdataParticipant) {
    var hasil = false;
    const products = listdataParticipant;
    console.log("productsss", JSON.stringify(products));

    const filters = {
      title: (title) => title == "",
      //fullname: (fullname) => fullname == "",
    };

    const filtered = filterArray(products, filters);
    var jml = filtered.length;
    console.log(
      "----------------validation participant------------------------------------"
    );
    console.log(JSON.stringify(filtered));
    return jml;
  }

  function validaton_customer() {
    var hasil = false;
    const products = listdataCustomer;

    const filters = {
      title: (title) => title == "",
      fullname: (fullname) => fullname == "",
    };

    const filtered = filterArray(products, filters);
    var jml = filtered.length;
    console.log(
      "----------------validation customer------------------------------------"
    );
    console.log(JSON.stringify(filtered));
    return jml;
  }

  toggleSwitch = (value) => {
    setReminders(value);
    var customer = listdataCustomer[0];
    console.log('customertoggleSwitch', JSON.stringify(customer));
    console.log('valuetoggleSwitch', value);

    if (value == true) {
      console.log('value', value);
      var key = 1;
      var fullname = customer.fullname;
      var firstname = customer.firstname;
      var lastname = customer.lastname;
      var birthday = customer.birthday;
      var nationality = customer.nationality;
      var passport_number = customer.passport_number;
      var passport_country = customer.passport_country;
      var passport_expire = customer.passport_expire;
      var phone = customer.phone;
      var title = customer.title;
      var email = customer.email;
      var nationality_id = customer.nationality_id;
      var nationality_phone_code = customer.nationality_phone_code;
      var passport_country_id = customer.passport_country_id;
      var type = "guest";
      var old = "adult";


      if (
        firstname == "" ||
        lastname == "" ||
        title == ""
        // email == "" ||
        // phone == "" ||
        // nationality == null ||
        // nationality_phone_code == null
      ) {
        console.log("valuextoglefalse");
        setStyleFormCustomer({
          flexDirection: "row",
          backgroundColor: BaseColor.fieldColor,
          marginBottom: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "red",
          padding: 5,
        });
        setErrorFormCustomer(true);
        setTimeout(() => {
          validation(listdataCustomer, listdataParticipant);
        }, 500);

        setReminders(false);
      } else {
        console.log("valuextogletrue");
        updateParticipant(
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
          type,
          old,
          ""
        );
      }
    } else {
      console.log('value', value);
      var key = 1;
      var fullname = "";
      var firstname = "";
      var lastname = "";
      var birthday = "";
      var nationality = "";
      var passport_number = "";
      var passport_country = "";
      var passport_expire = "";
      var phone = "";
      var title = "";
      var email = "";
      var nationality_id = "";
      var nationality_phone_code = "";
      var passport_country_id = "";
      // var passport_country_phone_code='';
      var type = "guest";
      console.log("valuextoglefalse");
      updateParticipant(
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
        type,
        old,
        ""
      );
    }
  };

  function checkData(data) {
    var error = false;
    if (data.title != '' || data.firstname != '' || data.lastname != '') {
      error = false;
    } else {
      error = true;
    }
    return error;
  }

  function checkIfError(myArray, id) {
    var item = myArray.find(item => item.key == id);
    return item;
  }

  function validation(customer, participant) {
    var errCustomer = [];
    customer.map((item) => {
      var obj = {};
      obj['key'] = item.key;
      obj['statusError'] = checkData(item);
      errCustomer.push(obj);
    });
    console.log('errCustomer', JSON.stringify(errCustomer));
    setErrorValidationCustomer(errCustomer);

    errCustomerCheck = errCustomer.filter(custCheck => custCheck.statusError == true);
    var errCustomerCheckCount = errCustomerCheck.length;
    console.log('errCustomerCheckCount', JSON.stringify(errCustomerCheckCount));


    var errParticipant = [];
    participant.map((item) => {
      var obj = {};
      obj['key'] = item.key;
      obj['statusError'] = checkData(item);
      errParticipant.push(obj);
    });
    console.log('errParticipant', JSON.stringify(errParticipant));
    setErrorValidationParticipant(errParticipant);


    errParticipantCheck = errParticipant.filter(partCheck => partCheck.statusError == true);
    var errParticipantCheckCount = errParticipantCheck.length;
    console.log('errParticipantCheckCount', JSON.stringify(errParticipantCheckCount));


    if (errCustomerCheckCount != 0 || errParticipantCheckCount != 0) {
      console.log('statusdisable', false);


      setColorButton(BaseColor.greyColor);
      setColorButtonText(BaseColor.whiteColor);
      setDisabledButton(true);
    } else {
      console.log('statusdisable', true);
      setColorButton(BaseColor.secondColor);
      setColorButtonText(BaseColor.primaryColor);
      setDisabledButton(false);
    }

  }

  function useCoupon(item) {
    couponCodeListId.push(item.id_coupon.toString());
    setCouponCodeListId(couponCodeListId);
    setTimeout(() => {
      count(ssr, "couponCode");
    }, 20);
  }

  function useCouponForm(couponCode) {
    couponCodeListId.push(couponCode);
    setCouponCodeListId(couponCodeListId);
    setTimeout(() => {
      count(ssr, "couponCode");
    }, 20);
  }

  function getCouponDetail() {
    navigation.navigate("SelectCoupon", {
      userSession: userSession,
      param: param,
      useCoupon: useCoupon,
      useCouponForm: useCouponForm,
    });
  }

  toggleSwitchPointUser = (value) => {
    console.log("valuepoint", value);
    console.log("ssr", ssr);
    //setPointUser(value);
    // // const { param } = this.state;
    setUsePointUser(value);
    // // this.setState({ usePointUser: value });
    // // var userPoint = this.state.userSession.point;
    if (value == true) {
      count(ssr, "", true);
      //setPointUser(false);
      //setPointUser
    } else {
      count(ssr, "", false);
      //setPointUser(true);
    }
    // setTimeout(() => {
    //   //this.totalPrice();
    //   console.log("usePointUser", usePointUser);
    //   console.log("pointUser", pointUser);
    //   //count(ssr);
    // }, 500);
  };

  function removeItem2(item) {
    //let couponCodeListId = this.state.couponCodeListId;
    console.log("item", item);
    console.log("couponCodeListId", JSON.stringify(couponCodeListId));
    let array = couponCodeListId;
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }

    // //this.setState({ couponCodeListId: array });
    setCouponCodeList(array);

    setTimeout(() => {
      console.log("couponCodeListId", JSON.stringify(couponCodeListId));
      count(ssr);
    }, 20);
  }

  //if (login == true) {
  //buatguest
  if (loadingSpinner == false) {
    var coupon = dataCount.coupon;
    if (coupon != undefined) {
      if (coupon.length != 0) {
        var contentCodeCouponList = coupon.map((item) => {
          return (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 3,
                justifyContent: "space-between",
              }}
            >
              <Text
                footnote
                style={{ fontStyle: "italic", color: BaseColor.primaryColor }}
              >
                ({item.name}) - (Rp {priceSplitter(item.amount)})
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderRadius: 3,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  backgroundColor: BaseColor.thirdColor,
                }}
                onPress={() => {
                  //this.removeItem(couponCodeList, "couponCode", item);
                  if (item.type == "unik") {
                    removeItem2(item.id.toString());
                  } else {
                    removeItem2(item.code);
                  }

                }}
              >

                <Text footnote whiteColor>
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
          );
        });
      } else {
        var contentCodeCouponList = <View />;
      }
    }
  }

  var contentFormCoupon = <View />
  if (login == true) {
    var contentFormCoupon = (
      <View>
        <View style={[{ flexDirection: "column" }]} />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 9, justifyContent: "center" }}>
            <Text subhead bold>{couponCode}</Text>
          </View>
          <Button
            loading={loadingCheckCoupon}
            style={[
              { backgroundColor: BaseColor.primaryColor },
              { flex: 3, borderRadius: 5, height: 40, marginTop: 0 },
            ]}
            onPress={() => {
              getCouponDetail();
            }}
          >
            <Text style={{ color: BaseColor.whiteColor }}>Gunakan</Text>
          </Button>
        </View>
        <View>{contentCodeCouponList}</View>

        <Modal
          isVisible={modalCoupon}
          onBackdropPress={() => {
            setMsgCoupon("");
            setModalCoupon(false);
          }}
          onSwipeComplete={() => {
            setMsgCoupon("");
            setModalCoupon(false);
          }}
          swipeDirection={["down"]}
          style={styles.bottomModal}
        >
          <View
            style={[
              styles.contentFilterBottom,
              { paddingBottom: 50, flexDirection: "column" },
            ]}
          >
            <View
              style={{
                marginTop: -50,
                backgroundColor: BaseColor.whiteColor,
                width: "auto",
                alignSelf: "center",
                borderRadius: 100 / 2,
                padding: 10,
              }}
            >
              <Icon
                name="information-circle-outline"
                size={70}
                color={BaseColor.primaryColor}
                style={{ alignSelf: "center" }}
              />
            </View>
            <View>
              <Text body2 bold style={{ alignSelf: "center" }}>
                {msgCoupon}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  var contentFormPoint = <View />
  if (login == true) {
    contentFormPoint = (
      <View>
        <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 6,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View>
                <Text footnote numberOfLines={1}>
                  Point
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 6,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text footnote semibold numberOfLines={1}>
                {"IDR " + priceSplitter(userSession.point)}
              </Text>
            </View>
          </View>
        </View>

        {discountPointSisa != 0 ? (
          <View
            style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 10,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 6,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    footnote
                    numberOfLines={1}
                    style={{ color: BaseColor.thirdColor }}
                  >
                    Sisa Point
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 6,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  footnote
                  semibold
                  numberOfLines={1}
                  style={{ color: BaseColor.thirdColor }}
                >
                  {"IDR " + priceSplitter(discountPointSisa)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              flex: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View>
              <Text footnote grayColor numberOfLines={1}>
                Gunakan point untuk pemotongan pembayaran
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Switch
              name="angle-right"
              size={18}
              onValueChange={toggleSwitchPointUser}
              value={usePointUser}
            />
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  }

  const contentFormCustomer = listdataCustomer.map((item, index) => {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.contentProfile,
          {
            flex: 6,
            borderColor: checkIfError(errorValidationCustomer, item.key).statusError == true ? BaseColor.thirdColor : BaseColor.greyColor,


          }]}>
            <ProfileDetail
              textFirst={item.label}
              textSecond={item.fullname}
              icon={"create-outline"}
              onPress={() =>
                navigation.navigate("DetailContact", {
                  key: item.key,
                  label: item.label,
                  fullname: item.fullname,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  birthday: item.birthday,
                  nationality: item.nationality,
                  passport_number: item.passport_number,
                  passport_country: item.passport_country,
                  passport_expire: item.passport_expire,
                  phone: item.phone,
                  title: item.title,
                  email: item.email,

                  nationality_id: item.nationality_id,
                  nationality_phone_code: item.nationality_phone_code,

                  passport_country_id: item.passport_country_id,

                  updateParticipant: updateParticipant,
                  type: "customer",
                  old: item.old,
                  typeProduct: param.type,
                })
              }
              viewImage={false}
              style={{ flex: 10, marginRight: 10 }}
            />
          </View>
          {
            login == true ?

              <View style={[styles.contentProfile,
              {
                flex: 1,
                backgroundColor: BaseColor.primaryColor,
                borderColor: BaseColor.primaryColor,
                borderWidth: 1

              }]}

              >
                <TouchableOpacity
                  style={[styles.searchIcon]}
                  onPress={() => {
                    navigation.navigate("ProfileSmart", {
                      sourcePage: "summary",
                      item: item,
                      old: item.old,
                      type: "customer",
                      updateParticipant: updateParticipant,
                    });
                  }}
                >
                  <Icon
                    name="search"
                    size={18}
                    color={BaseColor.whiteColor}
                    style={{ textAlign: "center" }}
                  />
                </TouchableOpacity>
              </View>
              :
              <View />
          }
        </View>
        {
          checkIfError(errorValidationCustomer, item.key).statusError == true ?
            <Text style={{ color: BaseColor.thirdColor }}>Pastikan data terisi semua</Text>
            :
            <View />
        }
      </View>
    );
  });
  const contentformParticipant = listdataParticipant.map((item, index) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>

            <View style={[styles.contentProfile, {
              flex: 6,
              borderColor: checkIfError(errorValidationParticipant, item.key).statusError == true ? BaseColor.thirdColor : BaseColor.greyColor,


            }]}>
              <ProfileDetail
                textFirst={item.label}
                textSecond={item.fullname}
                icon={"create-outline"}
                onPress={() => {
                  navigation.navigate("DetailContact", {
                    key: item.key,
                    label: item.label,
                    fullname: item.fullname,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    birthday: item.birthday,
                    nationality: item.nationality,
                    passport_number: item.passport_number,
                    passport_country: item.passport_country,
                    passport_expire: item.passport_expire,
                    phone: item.phone,
                    title: item.title,
                    email: item.email,

                    nationality_id: item.nationality_id,
                    nationality_phone_code: item.nationality_phone_code,

                    passport_country_id: item.passport_country_id,

                    updateParticipant: updateParticipant,
                    type: "guest",
                    old: item.old,
                    typeFlight: typeFlight,
                    typeProduct: param.type,
                    dataCount: dataCount,
                    dataPrice: paramAll.dataPrice,
                  });
                }}
                viewImage={false}
                style={{ flex: 10, marginRight: 10 }}
              />

            </View>
            {
              login == true ?

                <View style={[styles.contentProfile,
                {
                  flex: 1,
                  backgroundColor: BaseColor.primaryColor,
                  borderColor: BaseColor.primaryColor,
                  borderWidth: 1

                }]}

                >
                  <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() => {
                      navigation.navigate("ProfileSmart", {
                        sourcePage: "summary",
                        item: item,
                        old: item.old,
                        type: "guest",
                        updateParticipant: updateParticipant,
                        listdataParticipant: listdataParticipant,
                      });
                    }}
                  >
                    <Icon
                      name="search"
                      size={18}
                      color={BaseColor.whiteColor}
                      style={{ textAlign: "center" }}
                    />
                  </TouchableOpacity>

                </View>
                :
                <View />
            }
          </View>
          {
            checkIfError(errorValidationParticipant, item.key).statusError == true ?
              <Text style={{ color: BaseColor.thirdColor }}>Pastikan data terisi semua</Text>
              :
              <View />
          }
        </View>
        {param.type == "flight" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                flex: 10,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {contentTambahanBagasi(index + 1)}
              </View>
              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {contentTambahanMakanan(index + 1)}
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  });

  var dataDeparture = <View />;
  var dataReturn = <View />;
  var contentPrice = <View></View>;
  var contentDiscount = <View></View>;
  var contentBiayaPenanganan = <View />;
  var contents = <View />;

  var contentProduct = <View></View>;

  //-----------------contentFlight----------------//
  if (param.type == "flight") {
    //console.log('resultVia', JSON.stringify(resultVia));
    dataDeparture = <View>
      <Text body2 bold>Berangkat</Text>
      <FlightDetailVia select={{ detail: resultVia?.data?.detail?.onwardFlight }} />
    </View>

    if (resultVia.data.detail.returnFlight != null) {
      dataReturn = (
        <View>
          <Text body2 bold>Pulang</Text>
          <FlightDetailVia select={{ detail: resultVia?.data?.detail?.returnFlight }} />
        </View>
      )

    }

    contentProduct = (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <FlightPlan
          round={param.IsReturn}
          fromCode={param.Origin}
          toCode={param.Destination}
          from={param.bandaraAsalLabel}
          to={param.bandaraTujuanLabel}
        />
        {
          expandedProduct == false ?
            <View>
              <Button
                style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                onPress={() => {
                  setExpandedProduct(true);

                }}
              >
                <Text bold>Lihat Detail Penerbangan</Text>
              </Button>
            </View>
            :
            <View />
        }

        {
          expandedProduct == true ?
            <View>
              {dataDeparture}
              {dataReturn}
            </View>
            :
            <View />
        }

        {
          expandedProduct == true ?
            <View>
              <Button
                style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                onPress={() => {
                  setExpandedProduct(false);

                }}
              >
                <Text bold>Tutup</Text>
              </Button>
            </View>
            :
            <View />
        }



      </View>
    );
  }
  //-----------------ccontentFlight---------------//

  //-----------------contentGeneral---------------//
  if (param.type == "general") {
    contentProduct = (
      <View style={{ flex: 1 }}>
        <CardCustom
          propImage={{
            height: wp("50%"),
            url:
              paramAll.product.img_featured_url != ""
                ? paramAll.product.img_featured_url
                : "https://masterdiskon.com/assets/images/image-not-found.png",
          }}
          propTitle={{ text: paramAll.product.product_name }}
          propPrice={{ price: "empty", startFrom: false }}
          propInframe={{
            top: paramAll.product.product_category.name_product_category,
            topTitle: "",
            topHighlight: false,
            topIcon: "",
            bottom: "",
            bottomTitle: "",
          }}
          propReview={0}
          propIsPromo={false}
          propDesc={''}
          propType={"hotel"}
          propStar={{ rating: "", enabled: false }}
          propLeftRight={{
            left: paramAll.product.vendor.display_name,
            right: "",
          }}
          onPress={() => { }}
          loading={false}
          propOther={{ inFrame: true, horizontal: false, width: "100%" }}
          propIsCampaign={{}}
          propPoint={0}
          propDesc1={paramAll.product.address}
          propDesc2={paramAll.product.description}
          propDesc3={paramAll.product.term}
          propHotelHightLight={
            paramAll.product.product_category.name_product_category
          }
          propPriceCoret={{
            price: 0,
            priceDisc: 0,
            discount: "",
            discountView: false,
          }}
          propFacilities={[]}
          propAmenities={[]}
          style={[{ marginBottom: 10 }]}
          sideway={true}
        />
      </View>
    );
  }
  //-----------------contentGeneral---------------//

  //-----------------contentHotel---------------//
  if (param.type == "hotel") {
    contentProduct = (
      <View style={{ flex: 1, marginBottom: 15 }}>
        <View style={{ marginHorizontal: -5 }}>
          <CardCustom
            propImage={{
              height: wp("25%"),
              url: paramAll.product.detail.images[0],
            }}
            propTitle={{ text: paramAll.product.name }}
            propPrice={{ price: 1000, startFrom: true }}
            propInframe={{
              top: '',
              topTitle: "",
              topHighlight: false,
              topIcon: "",
              bottom: "",
              bottomTitle: "",
            }}
            propReview={0}
            propIsPromo={false}
            propDesc={{ text: "" }}
            propType={""}
            propStar={{ rating: paramAll.product.class, enabled: false }}
            onPress={() => { }}
            loading={false}
            propOther={{ inFrame: true, horizontal: false, width: "100%" }}
            propIsCampaign={false}
            propPoint={0}
            propDesc1={paramAll.product.detail.city}
            propDesc2={''}
            propDesc3={"Jumlah Kamar"}
            propLeftRight={{
              left: "Checkin",
              right: paramAll.param.checkin,
              display: true,
            }}
            propLeftRight2={{
              left: "Checkout",
              right: paramAll.param.checkout,
              display: true,
            }}
            propLeftRight3={{ left: "Lama", right: paramAll?.param?.noofnights + " malam", display: true }}
            propLeftRight4={{ left: "", right: "", display: false }}
            propTopDown={{
              top: "Fasilitas",
              down: paramAll.productPart.detail[0].facilities,
              display: false,
            }}
            propTopDown2={{ top: "", down: "", display: true }}
            propTopDown3={{ top: "", down: "", display: true }}
            propTopDown4={{ top: "", down: "", display: true }}
            propHightLight={""}
            propPriceCoret={{
              price: 0,
              priceDisc: 0,
              discount: "",
              discountView: false,
            }}
            propFacilities={[]}
            propAmenities={[]}
            style={[{ marginBottom: 10 }]}
            sideway={true}
          />
        </View>
        <View
          style={[

            {
              flex: 1,
              backgroundColor: "white",
              borderRadius: 10,
              marginBottom: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              padding: 10,
              marginBottom: 20,

            },
          ]}
        >
          <Text subhead bold >
            Detail Kamar
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text footnote>Tipe Kamar</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end", textAlign: 'right' }}>
              <Text footnote numberOfLines={2} style={{ textAlign: 'right' }}>
                {paramAll.productPart.name}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text footnote>Tipe Kasur</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end", textAlign: 'right' }}>
              <Text footnote numberOfLines={1} >
                {paramAll.productPart.roomType}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text footnote>Fasilitas Sarapan</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text overline >
                {paramAll.productPart.breakfastIncluded == true ? 'Termasuk Sarapan' : 'Tidak Termasuk'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text footnote>Tamu</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text footnote >
                {paramAll.param.jmlTamu} Orang
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Text footnote>Kamar</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text footnote >
                {paramAll.param.room} kamar
              </Text>
            </View>
          </View>

        </View>

        <View
          style={[
            {
              flex: 1,
              backgroundColor: "white",
              borderRadius: 10,
              marginBottom: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              padding: 10,
            },
          ]}
        >
          <Text subhead bold>
            Catatan
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TextInput
              style={{
                width: '100%',
                height: 60,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: BaseColor.greyColor,
                padding: 10,
              }}
              multiline
              numberOfLines={4}
              onChangeText={text => {
                setNote(text);
                setTimeout(() => {
                  // //console.log('note', note);
                }, 20);
              }}
              value={note}
            />
          </View>
        </View>


      </View>

    );
  }
  //-----------------contentHotel---------------//

  contentDiscount = (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          flex: 10,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            flex: 6,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              footnote
              numberOfLines={1}
              style={{ color: BaseColor.thirdColor }}
            >
              Potongan Point
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text
            footnote
            semibold
            numberOfLines={1}
            style={{ color: BaseColor.thirdColor }}
          >
            {"IDR " + priceSplitter(dataCount.point)}
          </Text>
        </View>
      </View>



      {discountCoupon != 0 ? (
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flex: 6,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                footnote
                numberOfLines={1}
                style={{ color: BaseColor.thirdColor }}
              >
                Potongan Kupon
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text
              footnote
              semibold
              numberOfLines={1}
              style={{ color: BaseColor.thirdColor }}
            >
              {"IDR " + priceSplitter(discountCoupon)}
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );

  contentPrice = (
    <View>
      <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View>
              <Text footnote numberOfLines={1}>
                Jumlah Pembayaran
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text footnote semibold numberOfLines={1}>
              {"IDR " + priceSplitter(dataCount.subtotal)}
            </Text>
          </View>
        </View>
      </View>

      {contentDiscount}
      {contentPotonganCoupon()}
      {param.type == "flight" ? (
        <View
          style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 10,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View>
                <Text footnote grayColor numberOfLines={1}>
                  Pajak dan Lainnya
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text footnote semibold numberOfLines={1}>
                {"IDR " + priceSplitter(dataCount.tax)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}

      {param.type == "flight" ? (
        dataCount.addon != 0 ? (
          <View
            style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 10,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 5,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text footnote grayColor numberOfLines={1}>
                    Tambahan
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text footnote semibold numberOfLines={1}>
                  {"IDR " + priceSplitter(dataCount.addon)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )
      ) : (
        <View />
      )}

      <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View>
              <Text footnote numberOfLines={1}>
                Total
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text footnote semibold numberOfLines={1}>
              {"IDR " + priceSplitter(dataCount.total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  if (param.total == 0) {
    var contentBiayaPenanganan = (
      <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View>
              <Text footnote grayColor numberOfLines={1}>
                Biaya Penanganan
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text footnote semibold numberOfLines={1}>
              {"IDR " + priceSplitter(10000)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  var contentButton = (
    <View
      style={{
        borderRadius: 8,
        width: "100%",
        marginBottom: 20,
        marginTop: 20,
      }}
    >
      <TouchableOpacity
        disabled={disabledButton}
        onPress={() => {
          onSubmit();
        }}
      >
        <View pointerEvents="none" style={styles.groupinput}>
          <Button
            loading={false}
            style={{ backgroundColor: colorButton }}
            full
          >
            <Text style={{ color: colorButtonText }}>Book Now</Text>
          </Button>
        </View>
      </TouchableOpacity>
    </View>
  );

  var labeldetail = "Detail Penumpang";
  if (param.type != "flight") {
    labeldetail = "Detail Tamu";
  }

  contents = (
    <ScrollView>

      <View style={styles.contain}>
        {contentProduct}

        {/* --------------------------------- */}

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 10,
            marginBottom: 20,
          }}
        >
          <Text subhead bold>
            Detail Pemesan
          </Text>
          {contentFormCustomer}

        </View>

        {/* <View style={styles.line} /> */}

        {/* --------------------------------- */}

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 10,
            marginBottom: 20,
          }}
        >
          <Text subhead bold>
            {labeldetail}
          </Text>
          <View style={[styles.profileItem], { flexDirection: 'column', marginBottom: 10 }}>
            <View style={[styles.profileItem]}>
              <Text footnote>Sama dengan pemesan</Text>
              <Switch
                name="angle-right"
                size={14}
                onValueChange={this.toggleSwitch}
                value={reminders}
              />
            </View>
            {errorFormCustomer ? (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 10,
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ color: BaseColor.thirdColor }}>
                      Pastikan detail pemesan terisi semua, apabila ingin mengcopy data pemesan.
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          {contentformParticipant}

        </View>

        {
          login == true ?

            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 10,
                marginBottom: 20,
              }}
            >
              {contentFormCoupon}
              {couponCodeList.length == 0 ? (
                <View />
              ) : (
                <View style={styles.line} />
              )}
              {
                contentFormPoint
              }


            </View>
            :
            <View />
        }

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 10,
            marginBottom: 20,
          }}
        >
          {contentPrice}
          {contentBiayaPenanganan}
          {contentButton}
          {contentModalSignIn()}
        </View>
      </View>
    </ScrollView>
  );
  //}
  // else
  // {
  //   contents = (
  //     <NotYetLogin
  //       redirect={"SummaryGeneral"}
  //       navigation={navigation}
  //       param={paramAll}
  //     />
  //   );
  // }

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        { backgroundColor: BaseColor.primaryColor },
      ]}
      forceInset={{ top: "always" }}
    >
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF'
        }}
      />
      <Header
        title="Booking"
        subTitle={""}
        renderLeft={() => {
          return (
            <Icon name="md-arrow-back" size={20} color={BaseColor.whiteColor} />
          );
        }}
        // renderRight={() => {
        //     return (
        //         <Icon
        //             name="reload-outline"
        //             size={20}
        //             color={BaseColor.whiteColor}
        //         />

        //     );
        // }}

        renderRightSecond={() => {
          return <Icon name="home" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          //navigation.goBack(null);
          navigation.goBack();
        }}
        // onPressRight={() => {
        //     var redirect = 'Summary';
        //     var param = paramAll;
        //     //console.log('paramSummary', JSON.stringify(param));
        //     navigation.navigate("Loading", { redirect: redirect, param: param });
        // }}

        onPressRightSecond={() => {
          var redirect = "Home";
          var param = {};
          navigation.navigate("Loading", { redirect: redirect, param: param });
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
                source={loadingSpinnerFile}
                animationStyle={{ width: 250, height: 250 }}
                speed={1}
              />
              <Text>{loadingSpinnerTitle}</Text>
            </View>
          </View>
        ) : (
          contents
        )}

        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          messageNumOfLines={10}
          closeInterval={2000}
        />
      </View>
    </SafeAreaView>
  );
}
