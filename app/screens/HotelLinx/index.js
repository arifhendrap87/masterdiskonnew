import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProgressBarAndroid,
  ProgressViewIOS,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  View,
  Animated,
  ScrollView,
  StyleSheet,
  BackHandler,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  IconIons,
  HotelItem,
  Text,
  Button,
} from "@components";
import * as Utils from "@utils";
import { AsyncStorage } from "react-native";
import CardCustom from "../../components/CardCustom";
import FilterSortHotelLinxBottom from "../../components/FilterSortHotelLinxBottom";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DropdownAlert from "react-native-dropdownalert";

// Load sample data
import { DataConfig, DataHotelLinx } from "@data";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import DataEmpty from "../../components/DataEmpty";
const { height, width } = Dimensions.get("window");
var screenWidth = Dimensions.get("window").width; //full screen width
const itemWidth = (width - 30) / 2;

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
  },
});
export default function HotelLinx(props) {
  let { navigation, auth } = props;
  const configApi = useSelector((state) => state.application.configApi);
  const config = useSelector((state) => state.application.config);
  const userSession = useSelector((state) => state.application.userSession);
  const login = useSelector((state) => state.application.loginStatus);

  const dispatch = useDispatch();

  const [param, setParam] = useState(
    navigation.state.params && navigation.state.params.param
      ? navigation.state.params.param
      : {}
  );
  //console.log('param', JSON.stringify(param));
  const [paramOriginal, setParamOriginal] = useState(
    navigation.state.params && navigation.state.params.paramOriginal
      ? navigation.state.params.paramOriginal
      : {}
  );
  const [listdataProduct, setListdataProduct] = useState(DataHotelLinx);
  const [listdataProductOriginal, setListdataProductOriginal] = useState(
    DataHotelLinx
  );
  const [filterParam, setFilterParam] = useState({});

  const [refreshing, setRefreshing] = useState(false);
  const [scrollAnim, setScrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim, setOffsetAnim] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnim
      ),
      0,
      40
    )
  );
  const [loadingCheckRoom, setLoadingCheckRoom] = useState(false);
  const [loadingCheckRoomFile, setLoadingCheckRoomFile] = useState(
    require("app/assets/hotel.json")
  );
  const [loadingCheckRoomTitle, setLoadingCheckRoomTitle] = useState(
    "Mohon tunggu, kami sedang mencari kamar yang kosong"
  );
  const [loadingProduct, setloadingProduct] = useState(true);

  const [abort, setAbort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [banyakData, setBanyakData] = useState(0);
  const [banyakPage, setBanyakPage] = useState(0);
  const [startkotak, setStartKotak] = useState("1");
  const [progressBarProgress] = useState(0.0);
  const [arrayPrice, setArrayPrice] = useState([
    { nums: 0, HotelId: "22881", hargaminPrice: "loading" },
    { nums: 1, HotelId: "1242092", hargaminPrice: "loading" },
    { nums: 2, HotelId: "1225729", hargaminPrice: "loading" },
    { nums: 3, HotelId: "22858", hargaminPrice: "loading" },
    { nums: 4, HotelId: "22921", hargaminPrice: "loading" },
    { nums: 5, HotelId: "22937", hargaminPrice: "loading" },
    { nums: 6, HotelId: "1100835", hargaminPrice: "loading" },
    { nums: 7, HotelId: "23240", hargaminPrice: "loading" },
    { nums: 8, HotelId: "1285575", hargaminPrice: "loading" },
    { nums: 9, HotelId: "107307", hargaminPrice: "loading" },
  ]);
  const [arrayPriceOriginal, setaArrayPriceOriginal] = useState([
    { nums: 0, HotelId: "22881", hargaminPrice: "loading" },
    { nums: 1, HotelId: "1242092", hargaminPrice: "loading" },
    { nums: 2, HotelId: "1225729", hargaminPrice: "loading" },
    { nums: 3, HotelId: "22858", hargaminPrice: "loading" },
    { nums: 4, HotelId: "22921", hargaminPrice: "loading" },
    { nums: 5, HotelId: "22937", hargaminPrice: "loading" },
    { nums: 6, HotelId: "1100835", hargaminPrice: "loading" },
    { nums: 7, HotelId: "23240", hargaminPrice: "loading" },
    { nums: 8, HotelId: "1285575", hargaminPrice: "loading" },
    { nums: 9, HotelId: "107307", hargaminPrice: "loading" },
  ]);
  const [heightHeader, setHeightHeader] = useState();

  const [filterToDo, setFilterToDo] = useState([{ "id": 1189, "name": "barbecue grill", "slug": 1189, "facilities_name": "barbecue grill", "id_property_facilities": 1189 }]);
  const [filterFacilities, setFilterFacilities] = useState([]);
  const [filterRoomFacilities, setFilterRoomFacilities] = useState([]);
  const [filterDisability, setFilterDisability] = useState();
  const [filterBrand, setFilterBrand] = useState();
  const [filterPropertyType, setPropertyType] = useState();

  this._deltaY = new Animated.Value(0);

  function convertIcon(key) {
    var icon = "fast-food-outline";
    if (key == "breakfastIncluded") {
      icon = "utensils";
    } else if (key == "wifiIncluded") {
      icon = "wifi";
    } else if (key == "parkingIncluded") {
      icon = "car";
    } else if (key == "bathtubIncluded") {
      icon = "bath";
    } else if (key == "poolIncluded") {
      icon = "swimmer";
    }
    return icon;
  }

  function rebuildFacilities(facility) {
    var keys = [];
    const objectArray = Object.entries(facility);

    objectArray.forEach(([key, value]) => {
      var obj = {};
      obj["key"] = key;
      obj["value"] = value;
      obj["icon"] = convertIcon(key);
      keys.push(obj);
    });
    return keys;
  }
  function rebuild(listdata) {
    let config = configApi;
    var listdata_new = [];
    var a = 1;
    listdata.map((item) => {
      var obj = {};
      obj["num"] = a.toString();
      obj["nums"] = a;

      obj["filter_price"] = "loading";
      obj["filter_rating"] = parseInt(item.class);
      obj["filter_recommended"] = item.IsRecomondedHotel == "FALSE" ? "" : "";

      obj["hotelid"] = item.id;
      //obj['newPrice'] = item.price;
      obj["isPromo"] = config.apiHotel == "traveloka" ? item.isPromo : false;
      obj["price"] = item.price;
      obj["type"] = item.type;
      obj["pricePromo"] = config.apiHotel == "traveloka" ? item.promoPrice : 0; // item.promoPrice;
      obj["reviewScore"] = item.reviewScore;

      obj["rating"] = item.class;
      obj["hotelname"] = item.name;
      obj["longitude"] = item.detail.longitude;
      obj["latitude"] = item.detail.latitude;
      obj["address"] = item.detail.region;

      obj["description"] = item.detail.description;
      obj["IsRecomondedHotel"] = item.IsRecomondedHotel;
      obj["gambar"] = item.image;
      obj["paramTombolToDetail"] = item.paramTombolToDetail;
      obj["cityname"] = item.detail.city;
      obj["amenities"] = ["swimming", "smoke"];
      obj["facilities"] =
        config.apiHotel == "traveloka"
          ? rebuildFacilities(item.facilities)
          : []; // item.promoPrice;

      listdata_new.push(obj);
      a++;
    });
    //console.log("resultrebuid", JSON.stringify(listdata_new));
    return listdata_new;
  }

  useEffect(() => {
    getProductHotelList(param);
    getFilterFacilities();

    // getFilterToDo();
    // getFilterRoomFacilities();

    // getFilterDisability();
    // getFilterBrand();
    // getFilterPropertyType();

    return () => { };
  }, []);

  // function getFilterToDo() {
  //   let config = configApi;
  //   let baseUrl = config.apiBaseUrl;
  //   var url = baseUrl + "booking/filter?product=hotel&type=to_do";

  //   if (config.apiHotel == "traveloka") {
  //     url = baseUrl + "apitrav/booking/filter?product=hotel&type=to_do";
  //   }
  //   //console.log('configApi', JSON.stringify(config));
  //   //console.log('urlss', url);

  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(url, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setFilterToDo(result.data);
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  function getFilterFacilities() {
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "booking/filter?product=hotel&type=facilities";

    if (config.apiHotel == "traveloka") {
      url = baseUrl + "apitrav/booking/filter?product=hotel&type=facilities";
    }

    //console.log('configApi', JSON.stringify(config));
    //console.log('urlss', url);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("resultFacilities", JSON.stringify(result));
        setFilterFacilities(result.data[0].items);
        setFilterRoomFacilities(result.data[1].items);
        console.log('TodoOri', JSON.stringify(result.data[3].items));
        setFilterToDo(rebulidTodo(result.data[3].items));
      })
      .catch((error) => console.log("error", error));
  }

  function rebulidTodo(listdata) {
    var listdata_new = [];
    var a = 0;
    listdata.map((item) => {
      var obj = {};
      obj["id"] = item.id_property_facilities;
      obj["name"] = item.name;
      obj["slug"] = item.slug;
      obj["facilities_name"] = item.name;
      obj["id_property_facilities"] = item.id_property_facilities;
      obj["selected"] = false;

      listdata_new.push(obj);
      a++;
    });
    console.log('rebulidTodo', JSON.stringify(listdata_new));

    return listdata_new;
  }


  function getFilterRoomFacilities() {
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "booking/filter?product=hotel&type=room_facilities";

    if (config.apiHotel == "traveloka") {
      url =
        baseUrl + "apitrav/booking/filter?product=hotel&type=room_facilities";
    }
    //console.log('configApi', JSON.stringify(config));
    //console.log('urlss', url);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFilterRoomFacilities(result.data);
      })
      .catch((error) => console.log("error", error));
  }

  // function getFilterDisability() {
  //     let config = configApi;
  //     let baseUrl = config.apiBaseUrl;
  //     let url = baseUrl + 'booking/filter?product=hotel&type=disability';
  //     //console.log('configApi', JSON.stringify(config));
  //     //console.log('urlss', url);

  //     var requestOptions = {
  //         method: 'GET',
  //         redirect: 'follow'
  //     };

  //     fetch(url, requestOptions)
  //         .then(response => response.json())
  //         .then(result => {
  //             setFilterDisability(result.data);
  //         })
  //         .catch(error => console.log('error', error));
  // }

  // function getFilterBrand() {
  //     let config = configApi;
  //     let baseUrl = config.apiBaseUrl;
  //     let url = baseUrl + 'booking/filter?product=hotel&type=brands';
  //     //console.log('configApi', JSON.stringify(config));
  //     //console.log('urlss', url);

  //     var requestOptions = {
  //         method: 'GET',
  //         redirect: 'follow'
  //     };

  //     fetch(url, requestOptions)
  //         .then(response => response.json())
  //         .then(result => {
  //             setFilterBrand(result.data);
  //         })
  //         .catch(error => console.log('error', error));
  // }

  // function getFilterPropertyType() {
  //     let config = configApi;
  //     let baseUrl = config.apiBaseUrl;
  //     let url = baseUrl + 'booking/filter?product=hotel&type=property_type';
  //     //console.log('configApi', JSON.stringify(config));
  //     //console.log('urlss', url);

  //     var requestOptions = {
  //         method: 'GET',
  //         redirect: 'follow'
  //     };

  //     fetch(url, requestOptions)
  //         .then(response => response.json())
  //         .then(result => {
  //             setPropertyType(result.data);
  //         })
  //         .catch(error => console.log('error', error));
  // }

  function rebuildArrayPrice(listdata) {
    var listdata_new = [];
    var a = 0;
    listdata.map((item) => {
      var obj = {};
      obj["nums"] = a;
      obj["HotelId"] = item.hotelid;
      obj["hargaminPrice"] = item.newPrice;
      listdata_new.push(obj);
      a++;
    });

    return listdata_new;
  }

  function sortProcess(selected) {
    setCurrentPage(1);

    if (selected == "low_price") {
      param.shortData = "asc";
      param.startkotak = "0";
      console.log("sortProcessAsc", JSON.stringify(param));
      setParam(param);
    } else if (selected == "hight_price") {
      param.shortData = "desc";
      param.startkotak = "0";
      console.log("sortProcessDesc", JSON.stringify(param));
      setParam(param);
    } else {
      param.shortData = "";
      param.startkotak = "0";
      console.log("sortProcessDesc", JSON.stringify(param));
      setParam(param);
    }
    setTimeout(() => {
      getProductHotelList(param);
    }, 50);
  }

  function onFilter() {
    var paramFilter = {
      filterToDo: filterToDo,
      filterFacilities: filterFacilities,
      filterRoomFacilities: filterRoomFacilities,
      filterDisability: filterDisability,
      filterBrand: filterBrand,
      filterPropertyType: filterPropertyType,
    };
    console.log(
      "onfilterParam",
      JSON.stringify({
        param: param,
        paramFilter: paramFilter,
        filterProcess: filterProcess,
      })
    );
    navigation.navigate("HotelLinxFilter", {
      param: param,
      paramFilter: paramFilter,
      filterProcess: filterProcess,
      filterParam: filterParam

    });
  }

  function onClear() {
    param.search = "";
    param.currentPage = 1;
    param.shortData = "";
    param.minimbudget = 0;
    param.maximbudget = 50000000;
    param.ratingH = "";
    param.amenities = [];

    // param.ratingH = "";
    // param.rHotel = "";
    // param.srcdata = "";
    // param.minimbudget = "0";
    // param.maximbudget = "15000000";
    // param.shortData = "";
    // param.startkotak = "0";

    console.log("paramOriginal", JSON.stringify(param));

    //setArrayPrice(arrayPriceOriginal);

    setTimeout(() => {
      getProductHotelList(param);
      // if (param.typeSearch != "area") {
      //   getProductHotelList(param);
      // } else {
      //   getProductHotelListPerArea(param);
      // }
    }, 50);
  }

  function filterProcess(param, filter) {
    console.log("paramProcessFilter", JSON.stringify(param));

    setArrayPrice(arrayPriceOriginal);
    setParam(param);
    setCurrentPage(1);
    setFilterParam(filter);


    setTimeout(() => {
      getProductHotelList(param);
    }, 50);
  }

  function reformatDate(dateStr) {
    dArr = dateStr.split("-"); // ex input "2010-01-18"
    return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
  }

  function convertDateDMY(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  }

  function convertStrToArray(item) {
    //"2_2,0,2sss".replace("_", ",");
    //item.split(",");
    return item;
  }
  async function getProductHotelList(param) {
    setloadingProduct(true);
    let config = configApi;
    var baseUrl = config.apiBaseUrl;
    var url = url = baseUrl + "apitrav/booking/search";
    console.log("paramOri", JSON.stringify(param));


    console.log("paramhotellist", JSON.stringify(param));

    console.log("configgetProductHotelList", JSON.stringify(config));
    console.log("urlssgetProductHotelList", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      room: parseInt(param.room),
      adult: parseInt(param.Adults),
      child: parseInt(param.Children),
      infant: parseInt(param.Infants),
      childAge: param.umurank.split(",").map(parseFloat),
      product: "hotel",
      //productDetail: "",
      from: param.city,
      //to: "",
      dateFrom: convertDateDMY(param.DepartureDate),
      dateTo: convertDateDMY(param.ReturnDate),
      pax: {
        room: parseInt(param.room),
        adult: parseInt(param.Adults),
        child: parseInt(param.Children),
        infant: parseInt(param.Infants),
        childAge: param.umurank.split(",").map(parseFloat),
      },
      keyword: param.keyword,
      classFrom: "0",
      classTo: "5",
      showDetail: false,
      filter: {
        search: param.search,
        page: param.currentPage,
        limit: 26,
        orderType: param.shortData,
        priceFrom: param.minimbudget,
        priceTo: param.maximbudget,
        //"class": param.ratingH == "" ? [1, 2, 3, 4, 5] : param.ratingH.split(',').map(parseFloat),
        class:
          param.ratingH == "" ? [] : param.ratingH.split(",").map(parseFloat),
        recomendedOnly: false,
        amenities: param.amenities,
      },
    });
    console.log("paramhllist", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("resultgetProductHotelList2", JSON.stringify(result));
        if (result.success == true) {
          setloadingProduct(false);
          setListdataProduct(result.data.productOptions);
          setListdataProductOriginal(result.data.productOptions);
          // setListdataProduct(rebuild(result.data.productOptions));
          // setListdataProductOriginal(rebuild(result.data.productOptions));
          setBanyakData(result.meta.total);
          setBanyakPage(result.meta.maxPage);
        } else {
          setloadingProduct(false);
          setListdataProduct([]);
          setListdataProductOriginal([]);
          setBanyakData(0);
          setBanyakPage(0);

          this.dropdown.alertWithType("info", "Info", result.message);
        }
      })
      .catch((error) => {
        this.dropdown.alertWithType("info", "Info", JSON.stringify(error));
      });
  }

  function renderItem(item, index) {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (
      item !== null &&
      typeof item === "object" &&
      Array.isArray(item) === false
    ) {
      item = item;
    } else {
      item = DataHotelLinx[0];
    }
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          backgroundColor: BaseColor.whiteColor,
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ flex: 3, padding: 10 }}>
          <PlaceholderLine width={80} style={{ height: 100 }} />
        </View>
        <View style={{ flex: 7, padding: 10 }}>
          <PlaceholderLine width={50} />
          <PlaceholderLine width={100} />
          <PlaceholderLine width={50} />
        </View>
      </View>
    );
  }

  function renderContent() {
    const { height, width } = Dimensions.get("window");

    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
      <View>
        {listdataProduct.length != 0 ? (
          <FlatList
            data={listdataProduct}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            //keyExtractor={(item, index) => String(item.id)}
            getItemLayout={(item, index) => ({
              length: 70,
              offset: 70 * index,
              index,
            })}
            //kalo vertikal
            // numColumns={2}
            // columnWrapperStyle={{
            //   flex: 1,
            //   justifyContent: 'space-evenly',
            //   marginBottom: 10
            // }}

            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            maxToRenderPerBatch={100} // Increase time between renders
            windowSize={7} // Reduce the window size
            renderItem={({ item, index }) => (
              <CardCustom
                propImage={{
                  height: wp("40%"),
                  url:
                    item.gambar != ""
                      ? item.gambar
                      : "https://masterdiskon.com/assets/images/image-not-found.png",
                }}
                propTitle={{ text: item.name }}
                propPrice={""}
                propInframe={{
                  top: item.isPromo === false ? "" : "",
                  topTitle: "",
                  topHighlight: item.isPromo,
                  topIcon: "",
                  bottom: "",
                  bottomTitle: "",
                }}
                propReview={item.reviewScore}
                propIsPromo={item.isPromo}
                propDesc={{ text: "" }}
                propType={item.type}
                propTypeProduct={'hotel'}
                propStar={{ rating: item.class, enabled: true }}
                onPress={() => {
                  param.hotelid = item.id;
                  param.product_type = "hotel";
                  var paramAll = {
                    param: param,
                    paramOriginal: paramOriginal,
                    paramProduct: item,
                    product_type: "hotel",
                  }
                  console.log('paramAll', JSON.stringify(paramAll));
                  navigation.navigate("ProductDetailNew", paramAll);

                }}
                loading={listdataProduct}
                propOther={{ inFrame: true, horizontal: false, width: "100%" }}
                propIsCampaign={false}
                propPoint={0}
                propDesc1={item?.detail?.region}
                propDesc2={item.description}
                propDesc3={{}}
                propLeftRight={{ left: "", right: "" }}
                propLeftRight2={{ left: "", right: "" }}
                propLeftRight3={{ left: "", right: "" }}
                propLeftRight4={{ left: "", right: "" }}
                propTopDown={{ top: "", down: "" }}
                propTopDown2={{ top: "", down: "" }}
                propTopDown3={{ top: "", down: "" }}
                propTopDown4={{ top: "", down: "" }}
                propHightLight={""}
                propPriceCoret={{
                  price: item.price,
                  priceDisc: item.promoPrice,
                  discount: "",
                  discountView: item.isPromo,
                }}
                propFacilities={[]}
                propAmenities={[["swimming", "smoke"]]}
                style={[{ marginBottom: 0 }]}
                sideway={true}
                propIsOverlay={false}
              />
            )}
          />
        ) : (
          <DataEmpty />
        )}
      </View>
    );
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
      setTimeout(() => {
        getProductHotelList(param);
      }, 50);
    }
  }

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        { backgroundColor: BaseColor.primaryColor },
      ]}
      forceInset={{ top: "always" }}
    >
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

      <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              flex: 0.05,
              backgroundColor: BaseColor.primaryColor,
              paddingVertical: 5,
            }}
          >
            <View style={{ flex: 2, justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginLeft: 20 }}
              >
                <Icon
                  name="md-arrow-back"
                  size={20}
                  color={BaseColor.whiteColor}
                  style={{}}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 8 }}>
              <View
                style={{
                  paddingBottom: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text caption1 whiteColor>
                  {param.searchTitle} - {param.room} kamar, {param.jmlTamu} tamu
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text caption1 whiteColor>
                    {param.checkin} - {param.checkout}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  var paramSearchAgain = {
                    searchDetailAgain: true,
                    param: param,
                    filterProcess: filterProcess,
                  };

                  console.log('parampparamSearchAgainroduct', JSON.stringify(paramSearchAgain));


                  navigation.navigate("HotelSearchAgain", {
                    searchDetailAgain: false,
                    param: param,
                    filterProcess: filterProcess,
                  });
                }}
              >
                <Icon
                  name="create-outline"
                  size={24}
                  color={BaseColor.whiteColor}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: BaseColor.secondColor,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  paddingBottom: 5,
                  paddingTop: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text caption1 bold>
                  Silahkan Pilih Hotel
                </Text>
              </View>
            </View>
          </View>

          {loadingProduct == true ? (
            <View style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 20, flex: 1, marginBottom: 50 }}>
                {renderItem(listdataProduct[0], 0)}
                {renderItem(listdataProduct[1], 0)}
                {renderItem(listdataProduct[1], 0)}
                {renderItem(listdataProduct[1], 0)}
                {renderItem(listdataProduct[1], 0)}
              </View>
            </View>
          ) : (
            <View style={{ marginHorizontal: 20, flex: 1 }}>
              {renderContent()}
            </View>
          )}

          {loadingProduct ? (
            <View
              style={[
                { paddingHorizontal: 15, flex: 0.05, backgroundColor: "white" },
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Placeholder Animation={Fade} style={{ marginTop: 5 }}>
                  <PlaceholderLine width={80} height={10} />
                </Placeholder>
              </View>

              <View style={{ flex: 1 }}>
                <Placeholder Animation={Fade} style={{ marginTop: 5 }}>
                  <PlaceholderLine width={80} height={10} />
                </Placeholder>
              </View>

              <View style={{ flex: 1 }}>
                <Placeholder Animation={Fade} style={{ marginTop: 5 }}>
                  <PlaceholderLine width={80} height={10} />
                </Placeholder>
              </View>
            </View>
          ) : (
            <FilterSortHotelLinxBottom
              onFilter={onFilter}
              onClear={onClear}
              sortProcess={sortProcess}
              banyakData={banyakData}
              banyakPage={banyakPage}
              setPagination={setPagination}
              value={currentPage}
              valueMin={1}
              valueMax={currentPage <= banyakPage ? false : true}
              style={[
                { paddingHorizontal: 15, flex: 0.05, backgroundColor: "white" },
              ]}
            />
          )}
        </View>
        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          messageNumOfLines={10}
          closeInterval={10000}
        />
      </View>
    </SafeAreaView>
  );
}
