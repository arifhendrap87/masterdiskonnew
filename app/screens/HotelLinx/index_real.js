import React, { Component } from "react";
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

export default class HotelLinx extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    var param = {};
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.param
    ) {
      param = this.props.navigation.state.params.param;
    }

    var paramOriginal = {};
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.paramOriginal
    ) {
      paramOriginal = this.props.navigation.state.params.paramOriginal;
    }

    console.log("paramHotelLinx", JSON.stringify(param));
    console.log("paramHotelLinxoRIGINAL", JSON.stringify(paramOriginal));

    this.state = {
      param: param,
      paramOriginal: paramOriginal,
      listdata_product_hotel_linx: DataHotelLinx,
      listdata_product_hotel_linx_original: DataHotelLinx,
      config: DataConfig,

      refreshing: false,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
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
      ),
      loadingCheckRoom: false,
      loadingCheckRoomFile: require("app/assets/hotel.json"),
      loadingCheckRoomTitle:
        "Mohon tunggu, kami sedang mencari kamar yang kosong",
      loading_product_hotel_linx: true,

      currentPage: 1,

      abort: false,
      banyakData: 0,
      banyakPage: 0,
      arrayPrice: [
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
      ],
      arrayPriceOriginal: [
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
      ],
      progressBarProgress: 0.0,
    };

    this.getConfig();
    this.getConfigApi();
    this.getSession();
    this.filterProcess = this.filterProcess.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.sortProcess = this.sortProcess.bind(this);
    this.setPagination = this.setPagination.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    this.props.navigation.goBack();
    return true;
  }

  rebuild(listdata) {
    var listdata_new = [];
    var a = 1;
    listdata.map((item) => {
      var obj = {};
      obj["num"] = a.toString();
      obj["nums"] = a;

      obj["filter_price"] = "loading";
      obj["filter_rating"] = parseInt(item.rating);
      obj["filter_recommended"] =
        item.IsRecomondedHotel == "FALSE" ? "" : "Recommended";

      obj["hotelid"] = item.hotelid;
      obj["newPrice"] = item.newPrice;
      obj["rating"] = item.rating;
      obj["hotelname"] = item.hotelname;
      obj["longitude"] = item.longitude;
      obj["latitude"] = item.latitude;
      obj["address"] = item.address;

      obj["description"] = item.description;
      obj["IsRecomondedHotel"] = item.IsRecomondedHotel;
      obj["gambar"] = item.gambar;
      obj["paramTombolToDetail"] = item.paramTombolToDetail;
      obj["cityname"] = item.cityname;

      listdata_new.push(obj);
      a++;
    });

    return listdata_new;
  }

  rebuildArrayPrice(listdata) {
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

  sortProcess(selected) {
    this.setState({ currentPage: 1 });
    const { param } = this.state;

    if (selected == "low_price") {
      param.shortData = "asc";
      param.startkotak = "0";
      console.log("sortProcessAsc", JSON.stringify(param));
      this.setState({ param: param });
    } else if (selected == "hight_price") {
      param.shortData = "desc";
      param.startkotak = "0";
      console.log("sortProcessDesc", JSON.stringify(param));
      this.setState({ param: param });
    }
    setTimeout(() => {
      this.getProductHotelList(param);
    }, 50);
    // setTimeout(() => {
    //     if(param.typeSearch != 'area'){
    //         this.getProductHotelList(param);
    //     }else{
    //         this.getProductHotelListPerArea(param);
    //     }
    // }, 50);
  }

  onFilter() {
    const { navigation } = this.props;
    navigation.navigate("HotelLinxFilter", {
      param: this.state.param,
      filterProcess: this.filterProcess,
    });
  }

  onClear() {
    const { param } = this.state;
    param.ratingH = "";
    param.rHotel = "";
    param.srcdata = "";
    param.minimbudget = "0";
    param.maximbudget = "15000000";
    param.shortData = "";
    param.startkotak = "0";

    console.log("paramOriginal", JSON.stringify(param));

    this.setState({ arrayPrice: this.state.arrayPriceOriginal });
    setTimeout(() => {
      if (param.typeSearch != "area") {
        this.getProductHotelList(param);
      } else {
        this.getProductHotelListPerArea(param);
      }

      // this.getProductHotelList(param);
    }, 50);
  }

  filterProcess(param) {
    console.log("paramProcess", JSON.stringify(param));
    this.setState({ arrayPrice: this.state.arrayPriceOriginal });
    this.setState({ param: param });
    this.setState({ currentPage: 1 });

    setTimeout(() => {
      this.getProductHotelList(param);
    }, 50);
  }

  getConfigApi() {
    AsyncStorage.getItem("configApi", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        console.log("configApi", JSON.stringify(config));
        this.setState({ configApi: config });
      }
    });
  }

  getConfig() {
    AsyncStorage.getItem("config", (error, result) => {
      if (result) {
        let config = JSON.parse(result);
        console.log("config", JSON.stringify(config));
        this.setState({ config: config });
      }
    });
  }

  //memanggil session
  getSession() {
    AsyncStorage.getItem("userSession", (error, result) => {
      if (result) {
        let userSession = JSON.parse(result);
        console.log("userSessions", JSON.stringify(userSession));

        var id_user = userSession.id_user;
        this.setState({ id_user: id_user });
        this.setState({ userSession: userSession });
        this.setState({ login: true });
      }
    });
  }

  getProductHotelLinxDetail() {
    const { param, paramOriginal } = this.state;
    const { config } = this.state;
    const { navigation } = this.props;
    const data = {
      hotelid: param.hotelid,
    };
    const paramSearch = { param: data };
    this.setState({ loading_product_hotel_linx: true }, () => {
      let config = this.state.configApi;
      let baseUrl = config.baseUrl;
      let url = baseUrl + "front/api_new/product/product_hotel_linx_detail";
      console.log("configApi", JSON.stringify(config));
      console.log("urlss", url);

      // var url=config.baseUrl;
      // var path="front/api_new/product/product_hotel_linx_detail";
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(paramSearch);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("ProductDetailss", JSON.stringify(result));
          this.setState({ progressBarProgress: 0.0 });
          this.setState({ loading_product_hotel_linx: false });
          param.city = result[0].product_place_id;
          console.log(
            "HotelLinxSS",
            JSON.stringify({
              param: param,
              paramOriginal: paramOriginal,
              product: result[0],
              product_type: "hotelLinx",
            })
          );
          navigation.navigate("ProductDetail", {
            param: param,
            paramOriginal: paramOriginal,
            product: result[0],
            product_type: "hotelLinx",
          });
        })
        .catch((error) => {
          alert("Kegagalan Respon Server");
        });
    });
  }

  reformatDate(dateStr) {
    dArr = dateStr.split("-"); // ex input "2010-01-18"
    return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
  }

  getProductHotelList(param) {
    console.log("paramgetProductHotelList", JSON.stringify(param));
    this.setState({ loading_product_hotel_linx: true }, () => {
      let config = this.state.configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "product/hotel/hllist";
      console.log("configApi", JSON.stringify(config));
      console.log("urlss", url);

      // let config=this.state.configApi;
      // let baseUrl=config.baseUrl;

      console.log("config.apiToken", config.apiToken);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + config.apiToken);
      myHeaders.append("Content-Type", "application/json");

      const { currentPage } = this.state;

      var raw = JSON.stringify({
        page: currentPage,
        minimbudget: 0,
        maximbudget: param.maximbudget,
        rHotel: false,
        ratingH: param.ratingH,
        orderType: param.shortData,
        search: param.srcdata,
        checkin: this.reformatDate(param.tglAwal),
        checkout: this.reformatDate(param.tglAkhir),
        adult: parseInt(param.adults),
        children: parseInt(param.child),
        string_adult: param.stringAdults,
        stringh_anak: param.stringChild,
        //"umurank": param.umurank.replace(",", ","),
        umurank: param.umurank,
        room: param.room,
        citySeach: parseInt(param.city),
      });
      console.log("paramhllist", raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("resultgetProductHotelList2", JSON.stringify(result));
          if (result.success == true) {
            //console.log('resultgetProductHotelList2',JSON.stringify(result));
            this.setState({ loading_product_hotel_linx: false });
            this.setState({
              listdata_product_hotel_linx: this.rebuild(result.data),
            });
            this.setState({ arrayPrice: this.rebuildArrayPrice(result.data) });
            this.setState({
              listdata_product_hotel_linx_original: this.rebuild(result.data),
            });
            this.setState({ banyakData: result.meta.total });
            this.setState({ banyakPage: result.meta.total_page });
          } else {
            this.setState({ loading_product_hotel_linx: false });
            this.setState({ listdata_product_hotel_linx: [] });
            this.setState({ arrayPrice: [] });
            this.setState({ listdata_product_hotel_linx_original: [] });
            this.setState({ banyakData: 0 });
            this.setState({ banyakPage: 0 });
            this.dropdown.alertWithType("info", "Info", result.message);
          }
        })
        .catch((error) => {});
    });
  }

  // hasilSatuanPrice(itemPrice) {
  //     if (this.state.abort == false) {

  //         var paramPrice = { "param": itemPrice };
  //         console.log('paramPrice', JSON.stringify(paramPrice));
  //         var myArray = this.state.listdata_product_hotel_linx;

  //         var myHeaders = new Headers();
  //         myHeaders.append("Content-Type", "application/json");

  //         var raw = JSON.stringify(paramPrice);

  //         var requestOptions = {
  //             method: 'POST',
  //             headers: myHeaders,
  //             body: raw,
  //             redirect: 'follow'
  //         };

  //         return fetch("https://masterdiskon.com/front/product/hotel/getPricePerHotel/app", requestOptions)
  //             .then(response => response.json())
  //             .then(result => {
  //                 return result;
  //             })
  //             .catch(error => {
  //                 this.dropdown.alertWithType('info', 'Info', 'Gagal memperbarui harga, jaringan kurang lancar');

  //                 //alert('Kegagalan Respon Server');
  //                 //alert('Terjadi kesalahan jaringan, coba ulangi lagi')
  //             });

  //     }

  // }

  // async getPrice(arrPrice) {
  //     var myArray = this.state.listdata_product_hotel_linx;

  //     for (a = 0; a < arrPrice.length; a++) {

  //         let result = await this.hasilSatuanPrice(arrPrice[a]);
  //         console.log('getPrice', JSON.stringify(result));
  //         this.updateArrayPrice(result, a);

  //         if (result) {
  //             continue;
  //         }

  //     }
  // }

  updateArrayPrice(objPrice, a) {
    var arrayPrice = this.state.arrayPrice;
    var x = a + 1;
    this.setState({ progressBarProgress: x / 10 });
    console.log("urut", JSON.stringify(a));
    console.log("arrayPriceOld", JSON.stringify(arrayPrice));
    console.log("objPrice", JSON.stringify(objPrice));

    var myArray = arrayPrice;
    objIndex = myArray.findIndex((obj) => obj.HotelId == objPrice.HotelId);
    myArray[objIndex].hargaminPrice = objPrice.hargaminPrice;
    console.log("After update: ", JSON.stringify(myArray));
    this.setState({ arrayPrice: myArray });
  }

  changeProgress = () => {
    this.setState({
      progressBarProgress: parseFloat(Math.random().toFixed(1)),
    });
    setTimeout(() => {
      console.log("progressBarProgress", this.state.progressBarProgress);
    }, 50);
  };

  componentDidMount() {
    let { param } = this.state;
    const { navigation } = this.props;
    console.log("parammxxx", JSON.stringify(param));

    setTimeout(() => {
      this.getProductHotelList(param);
    }, 20);
  }

  renderItem(item, index) {
    const { navigation } = this.props;
    const { config, param } = this.state;

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

  // renderItemPromo(item, index, length) {
  //     const { navigation } = this.props;
  //     const { config, param } = this.state;

  //     const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  //     return (
  //         <CardCustom
  //             propImage={{ height: wp("40%"), url: item.img_featured_url }}
  //             propInframe={{ top: item.product_desc, bottom: this.convertDateText(item.product_time) + '-' + this.convertDateText(item.product_time2) }}
  //             propTitle={{ text: item.product_name }}
  //             propDesc={{ text: '' }}
  //             propPrice={{ price: 'empty', startFrom: false }}
  //             propPriceCoret={{ price: '' }}

  //             propStar={{ rating: '', enabled: false }}
  //             propLeftRight={{ left: '', right: '' }}
  //             propCopyPaste={{ left: item.product_code, right: item.product_time, enabled: false }}
  //             onPress={() => {
  //                 console.log('item', JSON.stringify(item));
  //                 navigation.navigate("PromoDetail", { product: item });
  //             }

  //             }

  //             loading={this.state.loading_dashboard}
  //             propOther={{ inFrame: true, horizontal: true, width: length != 1 ? (width - 0) / 2 : (width - 40) / 1 }}
  //             style={[
  //                 length != 1 ?
  //                     index == 0
  //                         ? { marginLeft: 20, marginRight: 10 }
  //                         : { marginRight: 10 }
  //                     :
  //                     { marginLeft: 20 }

  //             ]}
  //         />
  //     );

  // }

  renderContent() {
    const { config, param } = this.state;
    const { navigation } = this.props;

    const { height, width } = Dimensions.get("window");

    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
      <View>
        {this.state.listdata_product_hotel_linx.length != 0 ? (
          <View>
            <View style={{ marginHorizontal: 20, marginBottom: 5 }}></View>

            <FlatList
              //    horizontal={true}
              //    showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 20 }}
              data={this.state.listdata_product_hotel_linx}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
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
                <CardCustom
                  propImage={{
                    height: wp("30%"),
                    url:
                      item.gambar != ""
                        ? item.gambar
                        : "https://masterdiskon.com/assets/images/image-not-found.png",
                  }}
                  propTitle={{ text: item.hotelname }}
                  propPrice={{
                    price:
                      this.state.loading_product_hotel_linx == true
                        ? "loading"
                        : this.state.arrayPrice[index].hargaminPrice,
                    startFrom: true,
                  }}
                  propPriceCoret={{
                    price: "",
                    discount: "",
                    discountView: true,
                  }}
                  propInframe={{ top: item.cityname, bottom: "" }}
                  propTitle={{ text: item.hotelname }}
                  propDesc={{ text: "" }}
                  //propDesc={{ text: item.address }}

                  propType={"hotel"}
                  propStar={{ rating: item.rating, enabled: true }}
                  propLeftRight={{ left: "", right: "" }}
                  onPress={() => {
                    param.hotelid = item.hotelid;
                    this.getProductHotelLinxDetail();
                  }}
                  loading={this.state.loading_product_hotel_linx}
                  propOther={{
                    inFrame: true,
                    horizontal: false,
                    width: "100%",
                  }}
                  propIsCampaign={false}
                  propPoint={0}
                  propHotelDesc1={item.address}
                  propHotelDesc2={item.description}
                  propHotelDesc3={{}}
                  propHotelPrice={{}}
                  propHotelHightLight={item.filter_recommended}
                  propHotelPriceCoret={{
                    price: item.newPrice,
                    priceDisc: item.newPrice,
                    discount: "",
                    discountView: false,
                  }}
                  style={[{ marginBottom: 10 }]}
                  sideway={true}
                />
              )}
            />
          </View>
        ) : (
          <DataEmpty />
        )}
      </View>
    );
  }

  setPagination(currentPage) {
    const { param, banyakPage } = this.state;
    if (currentPage <= banyakPage) {
      this.setState({ arrayPrice: this.state.arrayPriceOriginal });
    }

    if (currentPage != 1) {
      var startkotak = (currentPage - 1) * 10 + 1;
      this.setState({ startkotak: startkotak.toString() });
    } else {
      var startkotak = 0;
      this.setState({ startkotak: startkotak.toString() });
    }

    setTimeout(() => {
      if (currentPage <= banyakPage) {
        this.setState({ currentPage: currentPage });
        param.startkotak = this.state.startkotak;
        this.getProductHotelList(param);
      }
    }, 50);
  }

  render() {
    const { navigation } = this.props;
    const {
      loading_product_hotel_linx,
      listdata_product_hotel_linx,
      param,
    } = this.state;

    var banyakPage = 10;
    var currentPage = this.state.currentPage;
    var dataPage = [];
    for (x = 1; x <= banyakPage; x++) {
      dataPage.push(x);
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
                    {param.searchTitle} - {param.room} kamar, {param.jmlTamu}{" "}
                    tamu
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text caption1 whiteColor>
                      {param.checkin} - {param.checkout}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("HotelSearchAgain", {
                          param: this.state.param,
                          filterProcess: this.filterProcess,
                        });
                      }}
                    >
                      <Icon
                        name="create-outline"
                        size={16}
                        color={BaseColor.secondColor}
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ flex: 2 }} />
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

            <ScrollView
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { y: this._deltaY },
                  },
                },
              ])}
              onContentSizeChange={() =>
                this.setState({
                  heightHeader: Utils.heightHeader(),
                })
              }
              scrollEventThrottle={8}
              style={[styles.scrollView, { flex: 0.8 }]}
              contentContainerStyle={styles.contentContainer}
            >
              {loading_product_hotel_linx == true ? (
                <View style={{ flex: 1 }}>
                  <View style={{ marginHorizontal: 20, flex: 1 }}>
                    {this.renderItem(listdata_product_hotel_linx[0], 0)}
                    {this.renderItem(listdata_product_hotel_linx[1], 0)}
                    {this.renderItem(listdata_product_hotel_linx[1], 0)}
                    {this.renderItem(listdata_product_hotel_linx[1], 0)}
                    {this.renderItem(listdata_product_hotel_linx[1], 0)}
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1 }}>{this.renderContent()}</View>
              )}
            </ScrollView>

            <FilterSortHotelLinxBottom
              onFilter={this.onFilter}
              onClear={this.onClear}
              sortProcess={this.sortProcess}
              banyakData={this.state.banyakData}
              banyakPage={this.state.banyakPage}
              setPagination={this.setPagination}
              value={this.state.currentPage}
              valueMin={1}
              valueMax={
                this.state.currentPage <= this.state.banyakPage ? false : true
              }
              style={[{ marginHorizontal: 15, flex: 0.05 }]}
            />
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
}
