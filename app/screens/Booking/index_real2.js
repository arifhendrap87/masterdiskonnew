import React, { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  FlatList,
  AsyncStorage,
  StatusBar,
  ScrollView,
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Tag, Text } from "@components";
import { View } from "react-native-animatable";
import AnimatedLoader from "react-native-animated-loader";
import styles from "./styles";
import { DataBooking } from "@data";

import DataEmpty from "../../components/DataEmpty";
import NotYetLogin from "../../components/NotYetLogin";
import CardCustomBooking from "../../components/CardCustomBooking";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

import { useSelector, useDispatch } from "react-redux";

export default function Booking(props) {
  let { navigation } = props;
  const login = useSelector((state) => state.application.loginStatus);
  const userSession = useSelector((state) => state.application.userSession);
  const configApi = useSelector((state) => state.application.configApi);
  console.log("configApiBooking", JSON.stringify(configApi));
  console.log("userSessionBooking", JSON.stringify(userSession));
  console.log("loginBooking", JSON.stringify(login));
  const [param, setParam] = useState({
    keyword: "",
    limit: "",
    page: "",
    status: "",
  });

  const [refreshing, setRefresing] = useState(false);
  const [dataBooking, setDataBooking] = useState(DataBooking);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  async function getData() {
    setLoadingSpinner(true);
    try {
      if (login != false) {
        let config = configApi;
        let baseUrl = config.baseUrlx;
        let url = baseUrl + "front/api_new/order/get_booking_history";
        console.log("urlss", url);

        var id_user = userSession.id_user;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var param = {
          param: {
            id: id_user,
            id_order: "",
            id_order_status: "",
            product: "",
          },
        };
        console.log("paramBooking", JSON.stringify(param));
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
            console.log("getdata", JSON.stringify(result));
            setLoadingSpinner(false);
            setDataBooking(result);
          })
          .catch((error) => {
            console.log(
              "error",
              "Error",
              "Internet connection problem ! make sure you have an internet connection."
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (login == true) {
      const isFocused = navigation.isFocused();
      if (isFocused) {
        getData();
      }

      const navFocusListener = navigation.addListener("didFocus", () => {
        getData();
      });

      return () => {
        navFocusListener.remove();
      };
    }
  }, []);

  var contents = <View />;
  var content = <View></View>;
  if (dataBooking.length == 0) {
    content = <DataEmpty />;
  } else {
    content = (
      <FlatList
        data={dataBooking}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        //keyExtractor={(item, index) => String(item.id)}
        getItemLayout={(item, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
        renderItem={({ item, index }) =>
          item.detail.length != 0 ? (
            <CardCustomBooking
              // style={{ marginTop: 10 }}
              item={item}
              loading={loadingSpinner}
              navigation={navigation}
            />
          ) : (
            <View />
          )
        }
      />
    );
  }

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
      contents = <View style={{ marginHorizontal: 20 }}>{content}</View>;
    } else {
      //contents=<View />
      contents = <NotYetLogin redirect={"Booking"} navigation={navigation} />;
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
      <View
        style={{
          position: "absolute",
          backgroundColor: "red",
          flex: 1,
          height: 45,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></View>

      <Header
        title="Booking"
        subTitle={""}
        renderLeft={() => {
          return (
            <Icon name="md-arrow-back" size={20} color={BaseColor.whiteColor} />
          );
        }}
        renderRight={() => {
          return login ? (
            <Icon
              name="reload-outline"
              size={20}
              color={BaseColor.whiteColor}
            />
          ) : (
            <View />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          var redirect = "Booking";
          var param = {};
          navigation.navigate("Loading", { redirect: redirect, param: param });
        }}
      />
      <View
        style={{
          backgroundColor:
            login == true ? BaseColor.bgColor : BaseColor.whiteColor,
          flex: 1,
        }}
      >
        {contents}
      </View>
    </SafeAreaView>
  );
}
