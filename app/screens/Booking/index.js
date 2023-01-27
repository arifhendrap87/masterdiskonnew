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
import FilterSortOrder from "../../components/FilterSortOrder";

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
  // console.log("configApiBooking", JSON.stringify(configApi));
  // console.log("userSessionBooking", JSON.stringify(userSession));
  // console.log("loginBooking", JSON.stringify(login));
  const [refreshing, setRefresing] = useState(false);
  const [dataBooking, setDataBooking] = useState(DataBooking);
  const [dataBookingOriginal, setDataBookingOriginal] = useState(DataBooking);
  const [orderStatus, setOrderStatus] = useState([
    {
      id: 1,
      name: "New Order",
      checked: false
    },
    {
      id: 3,
      name: "Processed",
      checked: false
    },
    {
      id: 5,
      name: "Paid",
      checked: false
    },
    {
      id: 7,
      name: "Booked",
      checked: false
    },
    {
      id: 9,
      name: "Complete",
      checked: false
    },
    {
      id: 11,
      name: "Canceled",
      checked: false
    },
    {
      id: 13,
      name: "Expired",
      checked: false
    },
    {
      id: 19,
      name: "Error",
      checked: false
    },
    {
      id: 22,
      name: "Failed",
      checked: false
    },
    {
      id: 24,
      name: "Re-Issued",
      checked: false
    },
    {
      id: 25,
      name: "Cancel Process",
      checked: false
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [banyakData, setBanyakData] = useState(0);
  const [banyakPage, setBanyakPage] = useState(0);
  const [startkotak, setStartKotak] = useState("1");
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(currentPage);
  const [status, setStatus] = useState("");
  const [param, setParam] = useState({
    keyword: keyword,
    limit: limit,
    page: page,
    status: status,
  });



  const [loadingSpinner, setLoadingSpinner] = useState(false);



  async function getDataOrder(param) {
    setLoadingSpinner(true);
    try {
      if (login != false) {
        let config = configApi;
        var baseUrl = config.apiBaseUrl;
        var url = baseUrl + "user/purchase?keyword=" + param.keyword + "&limit=" + param.limit + "&page=" + param.page + "&q=" + param.keyword + "&status=" + param.status;

        console.log("paramGetOrder", JSON.stringify(param));

        console.log("configgetProductHotelList", JSON.stringify(config));
        console.log("urlssgetProductHotelList", url);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);
        var raw = JSON.stringify({});
        console.log("paramhllist", raw);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          // body: raw,
          redirect: "follow",
        };

        const response = await fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.success == true) {
              console.log("resultOrderNew", JSON.stringify(result));
              setLoadingSpinner(false);
              setDataBooking(result.data);
              setDataBookingOriginal(result.data);
              setBanyakData(result.meta.total);
              setBanyakPage(result.meta.maxPage);
              //setOrderStatus(result.meta.orderStatus);
            } else {
              setLoadingSpinner(false);
              setDataBooking([]);
              setDataBookingOriginal([]);
              setBanyakData(0);
              setBanyakPage(0);
              //setOrderStatus(result.meta.orderStatus);

            }
          })
          .catch((error) => {
            // this.dropdown.alertWithType("info", "Info", JSON.stringify(error));
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  function setPagination(currentPage) {
    console.log("currentpage", currentPage);
    if (currentPage <= banyakPage) {
      //this.setState({ arrayPrice: this.state.arrayPriceOriginal });
    }

    if (currentPage != 1) {
      var startkotak = (currentPage - 1) * 10 + 1;
      setStartKotak(startkotak.toString());
      // this.setState({ startkotak: startkotak.toString() });
    } else {
      var startkotak = 0;
      // this.setState({ startkotak: startkotak.toString() });
      setStartKotak(startkotak.toString());
    }

    if (currentPage <= banyakPage) {
      setCurrentPage(currentPage);
      param.startkotak = startkotak;
      param.currentPage = currentPage;
      param.page = currentPage;
      console.log('param', JSON.stringify(param));
      setTimeout(() => {
        //getProductHotelList(param);
        getDataOrder(param);
      }, 50);
    }
  }

  function onFilter(status, keyword) {
    setOrderStatus(
      orderStatus.map(item => {

        if (item.id == status) {
          return {
            ...item,
            checked: true
          };
        } else {
          return {
            ...item,
            checked: false
          };
        }


      })
    );

    param.status = status;
    param.keyword = keyword;
    console.log('paramFilter', JSON.stringify(param));
    setTimeout(() => {
      getDataOrder(param);
    }, 50);

  }

  function onClear() {
    param.ratingH = "";
    param.rHotel = "";
    param.srcdata = "";
    param.minimbudget = "0";
    param.maximbudget = "15000000";
    param.shortData = "";
    param.startkotak = "0";

    console.log("paramOriginal", JSON.stringify(param));

    setArrayPrice(arrayPriceOriginal);

    setTimeout(() => {
      if (param.typeSearch != "area") {
        getProductHotelList(param);
      } else {
        getProductHotelListPerArea(param);
      }
    }, 50);
  }

  function filterProcess(param) {
    console.log("paramProcessFilter", JSON.stringify(param));

    setArrayPrice(arrayPriceOriginal);
    setParam(param);
    setCurrentPage(1);

    setTimeout(() => {
      getProductHotelList(param);
    }, 50);
  }

  useEffect(() => {
    if (login == true) {
      console.log('parambooking', JSON.stringify(param));
      console.log('currentPage', currentPage);
      const isFocused = navigation.isFocused();
      if (isFocused) {
        param.keyword = "";
        param.limit = 5;
        param.page = 1;
        param.status = "";
        getDataOrder(param);

      }

      const navFocusListener = navigation.addListener("didFocus", () => {

        param.keyword = "";
        param.limit = 5;
        param.page = 1;
        param.status = "";
        getDataOrder(param);
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
        renderItem={({ item, index }) => (
          //   <Text>asd</Text>
          <CardCustomBooking
            // style={{ marginTop: 10 }}
            item={item}
            loading={loadingSpinner}
            navigation={navigation}
          />
        )}
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
      contents = <View style={{ flex: 1, flexDirection: "column" }}>
        <FilterSortOrder
          onFilter={onFilter}
          onClear={onClear}
          // sortProcess={sortProcess}
          filterParam={param}
          banyakData={banyakData}
          banyakPage={banyakPage}
          setPagination={setPagination}
          value={param.page}
          valueMin={1}
          orderStatus={orderStatus}
          valueMax={currentPage <= banyakPage ? false : true}
          style={[
            { paddingHorizontal: 15, backgroundColor: "white" },
          ]}
        />
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          {content}
        </View>

      </View>;
    } else {
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
