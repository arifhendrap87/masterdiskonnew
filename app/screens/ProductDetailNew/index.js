import React, {
  Component,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  InteractionManager,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Linking,
} from "react-native";
import PreviewImage from "../../components/PreviewImage";

import { BaseStyle, BaseColor, Images } from "@config";
import Share from "react-native-share";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  StarRating,
  Tag,
  Coupon,
} from "@components";
import Modal from "react-native-modal";
import MapView, { Marker } from 'react-native-maps';

import * as Utils from "@utils";
import GeneralPhotoHeader from "../../components/ProductDetail/General/PhotoHeader.js";
import GeneralDescProduct from "../../components/ProductDetail/General/DescProduct.js";
import GeneralSchedule from "../../components/ProductDetail/General/Schedule.js";
import GeneralDescPartner from "../../components/ProductDetail/General/DescPartner.js";
import GeneralServices from "../../components/ProductDetail/General/Services.js";
import GeneralInformation from "../../components/ProductDetail/General/Information.js";
import GeneralHowExchange from "../../components/ProductDetail/General/HowExchange.js";
import GeneralCancelPolicy from "../../components/ProductDetail/General/CancelPolicy.js";
import GeneralLocation from "../../components/ProductDetail/General/Location.js";
import GeneralComment from "../../components/ProductDetail/General/Comment.js";
import GeneralBid from "../../components/ProductDetail/General/Bid.js";
import GeneralOption from "../../components/ProductDetail/General/Option.js";
import QuantityPickerHorizontal from "../../components/QuantityPickerHorizontal";

import HotelPhotoHeader from "../../components/ProductDetail/Hotel/PhotoHeader.js";
import HotelDescProduct from "../../components/ProductDetail/Hotel/DescProduct.js";
import HotelDescription from "../../components/ProductDetail/Hotel/Description.js";
import HotelKebijakan from "../../components/ProductDetail/Hotel/Kebijakan.js";
import HotelUlasan from "../../components/ProductDetail/Hotel/Ulasan.js";

import HotelFacilities from "../../components/ProductDetail/Hotel/Facilities.js";
import HotelPrice from "../../components/ProductDetail/Hotel/Price.js";
import HotelRoom from "../../components/ProductDetail/Hotel/Room.js";
import HotelRekomendasi from "../../components/ProductDetail/Hotel/Recomendasi.js";


import PromoPhotoHeader from "../../components/ProductDetail/Promo/PhotoHeader.js";
import PromoDescProduct from "../../components/ProductDetail/Promo/DescProduct.js";
import PromoTerm from "../../components/ProductDetail/Promo/Term.js";
import PromoDate from "../../components/ProductDetail/Promo/Date.js";
import Spinner from 'react-native-loading-spinner-overlay';
import BlogPhotoHeader from "../../components/ProductDetail/Blog/PhotoHeader.js";
import BlogDescProduct from "../../components/ProductDetail/Blog/DescProduct.js";
import ViewShot from "react-native-view-shot";
import ImgToBase64 from "react-native-image-base64";
var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;
import moment from "moment";
//import { CirclesLoader, PulseLoader, TextLoader, DotsLoader,LinesLoader } from 'react-native-indicator';
import { DataMenu, DataMasterDiskon, DataCard } from "@data";
import DropdownAlert from "react-native-dropdownalert";

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

// Load sample data
import HTML from "react-native-render-html";
import { DataConfig } from "@data";

import AnimatedLoader from "react-native-animated-loader";
import FastImage from "react-native-fast-image";
import ImageSize from "react-native-image-size";
import { useSelector, useDispatch } from "react-redux";
const { height, width } = Dimensions.get("window");

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export default function ProductList(props) {
  let { navigation } = props;
  //console.log("navigation", JSON.stringify(navigation));
  const priceSplitter = (number) =>
    number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  ////console.log('propdetailproduct', JSON.stringify(props))
  const full = useRef(null);
  const login = useSelector((state) => state.application.loginStatus);
  const userSession = useSelector((state) => state.application.userSession);
  const configApi = useSelector((state) => state.application.configApi);

  const [slug, setSlug] = useState(
    navigation.state.params && navigation.state.params.param.slug
      ? navigation.state.params.param.slug
      : ""
  );
  const [productId, setProductId] = useState(
    navigation.state.params && navigation.state.params.productId
      ? navigation.state.params.productId
      : ""
  );
  const [product, setProduct] = useState({});
  // const [productParam, setProductParam] = useState((navigation.state.params && navigation.state.params.productParam) ? navigation.state.params.productParam : '');
  ////console.log('producrssss', JSON.stringify(product));
  const [fromPage, setFromPage] = useState(
    navigation.state.params && navigation.state.params.fromPage
      ? navigation.state.params.fromPage
      : ""
  );

  const [productPart, setProductPart] = useState(
    navigation.state.params && navigation.state.params.productPart
      ? navigation.state.params.productPart
      : ""
  );
  const [productType, setProductType] = useState(
    navigation.state.params && navigation.state.params.param.product_type
      ? navigation.state.params.param.product_type
      : ""
  );
  const [productDetail, setProductDetail] = useState(
    navigation.state.params && navigation.state.params.param.product_detail
      ? navigation.state.params.param.product_detail
      : ""
  );

  const [param, setParam] = useState(
    navigation.state.params && navigation.state.params.param
      ? navigation.state.params.param
      : ""
  );
  console.log('param', JSON.stringify(param));
  const [paramOriginal, setParamOriginal] = useState(
    navigation.state.params && navigation.state.params.paramOriginal
      ? navigation.state.params.paramOriginal
      : {}
  );
  const [paramProduct, setParamProduct] = useState(
    navigation.state.params && navigation.state.params.paramProduct
      ? navigation.state.params.paramProduct
      : ""
  );
  console.log('paramProduct', JSON.stringify(paramProduct));

  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantityx] = useState(1);
  const [total, setTotal] = useState(0);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [productDetailNull, setProductDetailNull] = useState(false);
  const [modalVisibleCancel, setModalVisibleCancel] = useState(false);
  const [modalVisibleMap, setModalVisibleMap] = useState(false);
  const [loadingModalCancel, setLoadingCancel] = useState(false);
  const [loadingModalMap, setLoadingMap] = useState(false);
  const [selectOption, setSelectOption] = useState({});
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [coupons, setCoupons] = useState([]);
  const { width, height } = Dimensions.get("window");
  const [detailOption, setDetailOption] = useState({
    name: "Deluxe with Breakfast",
    id: "1007044157",
    price: 1234140,
    promoPrice: 819000,
    isPromo: true,
    combined: "",
    detailId: ["18184a435f002ff44e2a7a3d3800c327|2"],
    isFull: false,
    guest: "2",
    breakfastIncluded: true,
    wifiIncluded: true,
    smokingPreference: "NON_SMOKING",
    roomType: "1 king bed",
    view: "",
    detail: [
      {
        name: "Deluxe with Breakfast",
        id: "1007044157",
        images: [
          "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20060192-77f42d325e24803d0fe997300f963bdc.jpeg?tr=q-40,w-740,h-465&_src=imagekit",
          "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20060192-a34ee18262e0711abc35689a299bd8ed.jpeg?tr=q-40,w-740,h-465&_src=imagekit",
          "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20060192-9f9283e6c987f7e9fe9bed69086ca2df.jpeg?tr=q-40,w-740,h-465&_src=imagekit",
        ],
        facilities:
          " ruang bebas asap rokok, ac, air minum kemasan cuma-cuma, pembuat kopi / teh, kulkas, televisi, desk, microwave, dapur, air panas, kamar mandi pribadi, shower",
        price: 819000,
        cancelation: [
          {
            FromDate: "2022-09-19 02:55",
            ToDate: "2022-09-22 13:00",
            CancellationPrice: "0",
          },
          {
            FromDate: "2022-09-19 02:55",
            ToDate: "2022-09-22 13:01",
            CancellationPrice: "819000",
          },
        ],
      },
    ],
  });
  this._deltaY = new Animated.Value(0);

  useEffect(() => {
    console.log("productType", productType);

    var params = navigation.state.params;
    ////console.log("paramsxx", JSON.stringify(params));
    if (productType == "general") {
      getData();
    } else if (productType == "hotel") {
      getDataHotel(param, paramProduct);
    } else if (productType == "promo") {

      getDataPromo();
    } else if (productType == "blog") {
      getDataBlog();
    } else if (productType == "offices") {
      getDataOffice(productDetail);
    }
  }, []);

  function filterProcess(param) {
    //console.log("paramProcess", JSON.stringify(param));
    setParam(param);
    setLoading(true);
    setTimeout(() => {
      getDataHotel(param, paramProduct);
    }, 500);
  }

  async function updateClainPromo(id) {
    console.log('couponschoseid', JSON.stringify(id));
    console.log('couponslist', JSON.stringify(coupons));
    const newProjects = coupons.map((p) =>
      p.id === id
        ? {
          ...p,
          claimed: true,
        }
        : p
    );
    setCoupons(newProjects);
    setLoading(false);
    dropdown.alertWithType(
      "success",
      "Success",
      "Berhasil claim coupon"
    );


  }

  function claimCoupon(id) {
    var raw = "";
    if (login == true) {
      var param = {
        id: id,
        id_user: userSession.id_user,
        platform: "app",
      };
      var raw = JSON.stringify(param);
      //console.log("claimCoupon", raw);
    }
    setLoading(true);
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "promotion/coupon/claim";
    //console.log("configApi", JSON.stringify(config));
    //console.log("urlss", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('resultclaim', JSON.stringify(result));

        if (result.success == false) {
          console.log('errorclaimpromo', JSON.stringify(result.message));
          setLoading(false);
          dropdown.alertWithType(
            "info",
            "Info",
            "Ada Kegagalan Respon"
          );
        } else {
          // setLoading(false);

          updateClainPromo(id);

        }

        //setLoading(false);

      })
      .catch((error) => {
        console.log('error', error);


      });
  }

  async function getCoupon(idCoupon = "") {
    if (login == true) {
      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "promotion/coupon/active?id_user=" + userSession.id_user;
      //console.log("configApi", JSON.stringify(config));
      console.log("urlgetcoupon", url);

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
          console.log("getCouponResultProductDetail", JSON.stringify(result));
          // var dataFilterCoupon = result.data.filter(
          //   (element) => element.id_coupon == idCoupon
          // );
          // setCoupons(dataFilterCoupon);
          // setLoading(false);
        })
        .catch((error) => {

        });
    } else {
      //setLoadingSpinner(false);
    }
  }

  function convertDateDMY(date) {
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  }

  function getDate(num) {
    var MyDate = new Date();
    var MyDateString = "";
    MyDate.setDate(MyDate.getDate());
    var tempoMonth = MyDate.getMonth() + 1;
    var tempoDate = MyDate.getDate() + num;
    if (tempoMonth < 10) tempoMonth = "0" + tempoMonth;
    if (tempoDate < 10) tempoDate = "0" + tempoDate;

    return MyDate.getFullYear() + "-" + tempoMonth + "-" + tempoDate;
  }

  async function getData() {
    try {
      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "product/" + slug;
      //console.log("configApi", JSON.stringify(config));
      //console.log("urlss", url);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + config.apiToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //console.log("detailProduct", JSON.stringify(result.data));
          if (result.data.product_detail.length == 0) {
            setProductDetailNull(true);
          } else {
            setProduct(result.data);
            setProductPart(result.data.product_detail[0]);
            setTimeout(() => {
              setPrice(result.data.product_detail[0], 1);
            }, 20);
          }

          setLoading(false);
        })
        .catch((error) => {
          if (isEmpty(error)) {
            setLoading(false);
            this.dropdown.alertWithType("info", "Info", "Terjadi kesalahan");
            //console.log("errorss", "Terjadi kesalahan");
          }
        });
    } catch (error) {
    }
  }

  async function getDataHotel(param, paramProduct) {

    console.log('param', JSON.stringify(param));
    console.log('paramProduct', JSON.stringify(paramProduct));
    let config = configApi;
    var baseUrl = config.apiBaseUrl;
    var url = baseUrl + "booking/offerdetail";

    if (config.apiHotel == "traveloka") {
      url = baseUrl + "apitrav/booking/offerdetail";
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var raw = JSON.stringify({
      product: "hotel",
      productDetail: param.hotelid.toString(),
      from: param.city.toString(),
      to: "",
      dateFrom: convertDateDMY(param.DepartureDate),
      dateTo: convertDateDMY(param.ReturnDate),
      pax: {
        room: parseInt(param.room),
        adult: parseInt(param.Adults),
        child: parseInt(param.Children),
        infant: parseInt(param.Infants),
        childAge: param.umurank.split(",").map(parseFloat),
      },
      classFrom: "0",
      classTo: "5",

      adult: param.Adults,
      child: param.Children,
      childAge: param.umurank.split(",").map(parseFloat),
      infant: param.Infants,
      keyword: paramProduct.hotelname,
      productId: param.hotelid.toString(),
      room: param.room,
      showDetail: false,
    });
    console.log("urlparamhllistHotelDetailss", url);
    console.log("paramhllistHotelDetailss", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log("getDataHotelresult", JSON.stringify(result.data));

        setProduct(result.data);
        setLoading(false);
        const lat = result.data.detail.latitude;
        const lng = result.data.detail.longitude;
        const latDelta = 0.0043;
        const lngDelta = 0.0034;

        setCoordinate({
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        });

      })
      .catch((error) => {
        if (isEmpty(error)) {
          setLoading(false);
          //console.log("errorss", "Terjadi kesalahan Hotel");
        }
      });

  }

  async function getDataOffice(item) {
    //console.log("getDataOffice", JSON.stringify(item));
    var product_detail = {
      id_product: "",
      id_store: "",
      product_code: item.product_name,
      product_name: item.product_name,
      slug_product: item.product_name,
      type: "open_date",
      address: item.address,
      time: null,
      description: item.address,
      include: "-",
      term: "-",
      how_to_redeem: "-",
      cancelation_policy: "-",
      reservation_required: 1,
      start_date: "",
      end_date: "",
      valid_start: "",
      valid_end: "",
      start_price: 1850000,
      img_featured: "2022/product-1649218821054.jpg",
      tag: [],
      status: 1,
      vendor_store: "'79'",
      img_featured_url: item.img_featured_url,
      tag_id: "'21'",
      product_detail: [
        {
          id_product_detail: "",
          detail_name: item.product_name,
          normal_price: item.product_detail[0].price,
          price: item.product_detail[0].normal_price,
          buy_price: item.product_detail[0].normal_price,
          discount: item.product_detail[0].discount,
          description: item.address,
          available: 1,
          checked: true,
          saving: 50000,
        },
      ],
      product_img: [],
      product_category: {},
      vendor: {},
      partner: {},
      country: {},
      province: {},
      city: {},
      favourited_list: [],
      location: "",
      total_favourited: 0,
      favourited: false,
    };
    setProduct(product_detail);
    setLoading(false);
  }

  async function getDataPromo() {
    try {
      setLoading(true);
      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "promotion/promo/" + slug;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + config.apiToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("detailProductPromo", JSON.stringify(result.data));
          console.log("coupon", JSON.stringify(result.data.coupon));
          if (result?.data?.coupon) {
            setCoupons(result.data.coupon)
          }
          setProduct(result.data);
          setLoading(false);
        })
        .catch((error) => {
          if (isEmpty(error)) {
            setLoading(false);
            this.dropdown.alertWithType("info", "Info", "Terjadi kesalahan");
            //console.log("errorss", "Terjadi kesalahan");
          }
        });
    } catch (error) {
    }

  }

  async function getDataBlog() {
    try {
      let config = configApi;
      let baseUrl = config.apiBaseUrl;
      let url = baseUrl + "promotion/blog/" + slug;
      //console.log("configApi", JSON.stringify(config));
      //console.log("urlss", url);
      //console.log("product", JSON.stringify(product));
      //console.log("product_type", JSON.stringify(productType));
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + config.apiToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //console.log("detailProductBlog", JSON.stringify(result.data));
          setProduct(result.data);
          setLoading(false);
        })
        .catch((error) => {
          if (isEmpty(error)) {
            setLoading(false);
            this.dropdown.alertWithType("info", "Info", "Terjadi kesalahan");
            //console.log("errorss", "Terjadi kesalahan");
          }
        });
    } catch (error) {
      //console.log(error);
    }
  }

  async function cancellation(item) {
    setModalVisibleCancel(true);
    //console.log("itemscancel", JSON.stringify(item));
    //setSelectOption(item);
    setDetailOption(item);
  }

  async function getAvailHotel(selectOption) {
    let config = configApi;

    if (config.apiHotel == "traveloka") {
      getAvailHotelTrav(selectOption);
    } else {
      preBook(selectOption);
    }
  }

  async function getAvailHotelTrav(selectOption) {
    setLoading(true);
    //console.log("selectOption", JSON.stringify(selectOption));
    //console.log('paramproduct', JSON.stringify(paramProduct));

    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "apitrav/booking/avail";
    //console.log("configApi", JSON.stringify(config));
    //console.log("urlss", url);
    console.log("parampreBook", JSON.stringify(param));
    console.log('paramproduct', JSON.stringify(paramProduct));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var raw = JSON.stringify({
      productId: parseInt(paramProduct.id),
      dateFrom: convertDateDMY(param.DepartureDate),
      dateTo: convertDateDMY(param.ReturnDate),
      pax: {
        room: param.room.toString(),
        adult: param.Adults,
        child: param.Children,
        infant: param.Infants,
        childAge: param.umurank.split(",").map(parseFloat),
        numOfAdults: selectOption.guest,
      },
      roomId: selectOption.id,
      rateKey: selectOption.detailId[0],
    });

    console.log("rawww", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        console.log("resultAvailable", JSON.stringify(result));

        if (result.success == true) {
          if (result.data != undefined) {
            if (result.data.status == "AVAILABLE") {
              preBookTrav(selectOption, result.data);
            }
          } else {
            this.dropdown.alertWithType("info", "Info", "Tidak tersedia");
          }
        } else {
          this.dropdown.alertWithType("info", "Info", "Tidak tersedia");
        }
      })
      .catch((error) => {
        //console.log("error", JSON.stringify(error));
      });
  }

  async function preBookTrav(selectOption, dataAvail) {
    //console.log("paramProduct", JSON.stringify(paramProduct));
    //console.log("product", JSON.stringify(product));
    //console.log("param", JSON.stringify(param));
    //console.log("selectOption", JSON.stringify(selectOption));

    setLoading(true);
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "apitrav/booking/prebook";
    //console.log("configApi", JSON.stringify(config));
    //console.log("urlss", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var raw = JSON.stringify({
      product: "hotel",
      key: "",
      hotelId: product.id,
      option: selectOption.id,
      optionDetail: [dataAvail.identifier.toString()],
      id: product.id,
    });

    //console.log("paramhllistprebook", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log("detailProductHotel", JSON.stringify(result.data));

        param.key = result.data.key;
        param.type = "hotel";
        param.Qty = param.room;
        link = "SummaryGeneral";

        var paramAll = {
          param: param,
          product: product,
          productPart: selectOption,
        };

        //console.log("dataSummary", JSON.stringify(paramAll));

        navigation.navigate(link, {
          param: paramAll,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (isEmpty(error)) {
          setLoading(false);
          this.dropdown.alertWithType("info", "Info", "Terjadi kesalahan");
          //console.log("errorss", "Terjadi kesalahan");
        }
      });
  }

  async function preBook(selectOption) {
    //console.log("paramProduct", JSON.stringify(paramProduct));
    //console.log("product", JSON.stringify(product));
    //console.log("param", JSON.stringify(param));
    //console.log("selectOption", JSON.stringify(selectOption));

    setLoading(true);
    let config = configApi;
    let baseUrl = config.apiBaseUrl;
    let url = baseUrl + "booking/prebook";
    //console.log("configApi", JSON.stringify(config));
    //console.log("urlss", url);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + config.apiToken);

    var raw = JSON.stringify({
      product: "hotel",
      key: product.key.toString(),
      id: product.id.toString(),
      option: selectOption.id,
      optionDetail: selectOption.detailId,
    });
    //console.log("paramhllistprebook", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log("detailProductHotel", JSON.stringify(result.data));

        param.key = result.data.key;
        param.type = "hotel";
        param.Qty = param.room;
        link = "SummaryGeneral";

        var paramAll = {
          param: param,
          product: product,
          productPart: selectOption,
        };

        //console.log("dataSummary", JSON.stringify(paramAll));

        navigation.navigate(link, {
          param: paramAll,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (isEmpty(error)) {
          setLoading(false);
          this.dropdown.alertWithType("info", "Info", "Terjadi kesalahan");
          //console.log("errorss", "Terjadi kesalahan");
        }
      });
  }

  var isEmpty = function (data) {
    if (typeof data === "object") {
      if (JSON.stringify(data) === "{}" || JSON.stringify(data) === "[]") {
        return true;
      } else if (!data) {
        return true;
      }
      return false;
    } else if (typeof data === "string") {
      if (!data.trim()) {
        return true;
      }
      return false;
    } else if (typeof data === "undefined") {
      return true;
    } else {
      return false;
    }
  };

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];

    return item;
  }

  function setPrice(select, quantity) {
    setProductPart(select);
    setTimeout(() => {
      var totalx = select.price * quantity;
      //console.log("totalx", totalx);
      setTotal(totalx);
    }, 20);
  }

  function setQuantity(value, id) {
    setQuantityx(value);
    setTimeout(() => {
      setPrice(productPart, value);
    }, 20);
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

  function showModalMap() {

    //console.log('productMap', JSON.stringify(product));
    setModalVisibleMap(true);
  }

  function convertDateHour(myDate) {
    //return moment(myDate).format("YYYY-MM-DD HH:mm:ss");
    return moment(myDate).format("DD-MM-YYYY HH:mm");


  }
  function sendWhatsApp() {
    //let msg = 'Halo Kak, Saya mau tanya produk' + product.product_name;

    var msg = "";
    if (productType == "general") {
      msg = "Halo Kak, Saya mau tanya produk " + product.product_name;
    } else if (productType == "hotel") {
      msg = "Halo Kak, Saya mau tanya produk " + product.name;
    } else if (productType == "promo") {
      msg = "Halo Kak, Saya mau tanya produk " + product.title_promo;
    }
    let phoneWithCountryCode = "62";

    let mobile = '+6282255003525';
    //Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then((data) => {
            //console.log("WhatsApp Opened");
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

  const handleShare = () => {
    //console.log("productwa", JSON.stringify(product));
    setSpinner(true);
    setTimeout(async () => {
      try {
        // await setmodal(false)

        let img64 = "";
        await full.current.capture().then(async (uri) => {
          await ImgToBase64.getBase64String(uri)
            .then((base64String) => {
              let urlString = "data:image/jpeg;base64," + base64String;
              img64 = urlString;
              setSpinner(false);
            })
            .catch((err) => { });
        });
        var shareOptions = {};
        if (productType == "general") {
          shareOptions = {
            title: "Masterdiskon",
            message: product.product_name,
            url: img64,
          };
        } else if (productType == "hotel") {
          shareOptions = {
            title: "Masterdiskon",
            message: product.name,
            url: img64,
          };
        } else if (productType == "promo") {
          shareOptions = {
            title: "Masterdiskon",
            message: `Info Promo : ` + product.title_promo,
            url: img64,
          };
        }

        ////console.log('shareOptions', JSON.stringify(shareOptions));
        Share.open(shareOptions)
          .then((res) => {
            setSpinner(false);
            //console.log(res);
          })
          .catch((err) => {

          });
        //setmodal(false)
      } catch (error) {
        //setmodal(false)
      }
    }, 1500);
  };

  function onSubmit() {
    var paramx = {
      DepartureDate: getDate(0),
      ReturnDate: "",
      Adults: "1",
      Children: "0",
      Infants: "0",
      type: "general",
      key: productPart.id_product_detail,
      Qty: quantity,
      qtyProduct: 1,
      totalPrice: parseInt(productPart.price) * quantity,
      participant: false,
    };

    link = "SummaryGeneral";

    var param = {
      param: paramx,
      product: product,
      productPart: productPart,
    };

    //console.log("dataSummary", JSON.stringify(param));

    navigation.navigate(link, {
      param: param,
    });
    setLoading(false);
  }

  var content = <View />;
  //console.log("productTypeView", productType);
  if (productType == "general") {
    content = (
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
      >
        <ViewShot ref={full} options={{ format: "jpg" }}>
          <GeneralPhotoHeader data={product} />
          <GeneralDescProduct
            data={product}
            handleShare={handleShare}
            sendWhatsApp={sendWhatsApp}
          />
        </ViewShot>

        <GeneralOption data={product} setPrice={setPrice} quantity={quantity} />
        <GeneralBid data={product} />
        <GeneralDescPartner navigation={navigation} data={product} />
        <GeneralSchedule data={product} />
        <GeneralServices data={product} />
        <GeneralHowExchange data={product} />
        <GeneralCancelPolicy data={product} />
        <GeneralInformation data={product} />
        <GeneralLocation data={product} />
        <GeneralComment data={product} />
      </ScrollView>
    );
  } else if (productType == "offices") {
    content = (
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
      >
        <ViewShot ref={full} options={{ format: "jpg" }}>
          <GeneralPhotoHeader data={product} />
          <GeneralDescProduct
            data={product}
            handleShare={handleShare}
            sendWhatsApp={sendWhatsApp}
          />
        </ViewShot>
        {/* <GeneralDescPartner navigation={navigation} data={product} />
              <GeneralSchedule data={product} /> */}
        <GeneralServices data={product} />
        <GeneralHowExchange data={product} />
        <GeneralCancelPolicy data={product} />
        <GeneralInformation data={product} />
        <GeneralLocation data={product} />
        <GeneralComment data={product} />
      </ScrollView>
    );
  } else if (productType == "hotel") {
    content = (
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
        ref={(node) => (this.scroll = node)}
      >
        <ViewShot ref={full} options={{ format: "jpg" }}>
          <HotelPhotoHeader data={product} navigation={navigation} />

          <HotelDescProduct
            handleShare={handleShare}
            sendWhatsApp={sendWhatsApp}
            showModalMap={showModalMap}
            data={product}
            navigation={navigation}
          />
        </ViewShot>
        <HotelPrice data={product} navigation={navigation} />
        <HotelDescription data={product} navigation={navigation} />
        <HotelKebijakan data={product} navigation={navigation} />
        <HotelFacilities data={product} navigation={navigation} />
        <HotelUlasan data={product} navigation={navigation} />

        <HotelRoom
          data={product}
          param={param}
          paramOriginal={paramOriginal}
          navigation={navigation}
          cancellation={cancellation}
          preBook={preBook}
          getAvailHotel={getAvailHotel}
        />
        <HotelRekomendasi
          data={product}
          param={param}
          navigation={navigation}
          cancellation={cancellation}
          preBook={preBook}
          getAvailHotel={getAvailHotel}
        />
      </ScrollView>
    );
  } else if (productType == "promo") {
    content = (
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
      >
        <ViewShot ref={full} options={{ format: "jpg" }}>
          <PromoPhotoHeader data={product} navigation={navigation} />
          <PromoDescProduct
            handleShare={handleShare}
            sendWhatsApp={sendWhatsApp}
            data={product}
            navigation={navigation}
            coupons={coupons}
            claimCoupon={claimCoupon}
            loading={loading}
          />
        </ViewShot>
        <PromoDate data={product} navigation={navigation} />
        <PromoTerm data={product} navigation={navigation} />
      </ScrollView>
    );
  } else if (productType == "blog") {
    content = (
      <ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
      >
        <BlogPhotoHeader data={product} navigation={navigation} />
        <BlogDescProduct data={product} navigation={navigation} />
      </ScrollView>
    );
  }

  var contentModalCancel = (
    <Modal
      isVisible={modalVisibleCancel}
      onBackdropPress={() => {
        setModalVisibleCancel(false);
      }}
      onSwipeComplete={() => {
        setModalVisibleCancel(false);
      }}
      swipeDirection={["down"]}
      style={styles.bottomModal}
    >
      <View style={styles.contentFilterBottom}>
        <View style={{ paddingBottom: 50 }}>
          <View style={styles.contentActionModalBottom}>
            <Text bold body1>
              Kebijakan Pembatalan
            </Text>
          </View>

          <View style={styles.contentActionModalBottom}>
            <Text bold body1>
              Room : {detailOption.name}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 3 }}>
            <View style={{ flex: 3, alignItems: 'center', }}>
              <Text caption1 bold>From Date</Text>
            </View>
            <View style={{ flex: 3, alignItems: 'center', }}>
              <Text caption1 bold>To Date</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', }}>
              <Text caption1 bold>Charge</Text>
            </View>
          </View>
          {detailOption.detail[0].cancelation.map((item, index) => (
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 3 }}>
              <View style={{ flex: 3, alignItems: 'center' }}>
                <Text caption2>{convertDateHour(item.FromDate)}</Text>
              </View>
              <View style={{ flex: 3, alignItems: 'center' }}>
                <Text caption2>{convertDateHour(item.ToDate)}</Text>
              </View>
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Text caption2>Rp {priceSplitter(Math.ceil(item.CancellationPrice))}</Text>
              </View>
            </View>
          ))}

          {/* <View style={styles.contentActionModalBottom}>
            <Text>{convertDateHour(item.FromDate)}</Text>
            <Text>{convertDateHour(item.ToDate)}</Text>
            <Text>Rp {priceSplitter(Math.ceil(item.CancellationPrice))}</Text>
          </View> */}

          <View style={styles.contentActionModalBottom}>
            <Text caption1>
              Informasi Penting (Essential Information) Only Adults.Early
              departure.Check-in hour 14:00-.Car park YES (without additional
              debit notes).Identification card at arrival.Deposit on arrival.Due
              to the pandemic, many accommodation and service providers may
              implement processes and policies to help protect the safety of all
              of us. This may result in the unavailability or changes in certain
              services and amenities that are normally available from them. More
              info here https://cutt.ly/MT8BJcv (15/05/2020-30/06/2022) Benefits
              included: Parking, Coffee & tea, Free WiFi, Free fitness center
              access.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  var contentModalMap = (
    <Modal
      isVisible={modalVisibleMap}
      onBackdropPress={() => {
        setModalVisibleMap(false);
      }}
      onSwipeComplete={() => {
        setModalVisibleMap(false);
      }}
      swipeDirection={["down"]}
      style={{
        backgroundColor: 'white',
        margin: 15,
        alignItems: undefined,
        justifyContent: undefined,

      }}
    >
      <View style={styles.contentFilterBottom}>
        {loadingModalMap == true ? (
          <View style={styles.contentActionModalBottom}>
            <Text>Loading</Text>
          </View>
        ) : (

          <View style={[{ flex: 1, flexDirection: 'column' }]}>

            <View style={{ flex: 1 }}>

              <MapView
                style={{
                  height: height - 200,
                  position: 'absolute',
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                initialRegion={{
                  latitude: parseFloat(coordinate.latitude),
                  longitude: parseFloat(coordinate.longitude),
                  latitudeDelta: parseFloat(coordinate.latitudeDelta),
                  longitudeDelta: parseFloat(coordinate.longitudeDelta),
                }}
                customMapStyle={mapStyle}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: parseFloat(coordinate.latitude),
                    longitude: parseFloat(coordinate.longitude),
                  }}
                  onDragEnd={
                    (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                  description={'This is a description of the marker'}
                />
              </MapView>
              <View
                style={{

                  height: 50,
                  position: 'absolute',
                  top: height - 150,
                  left: 0,
                  right: 0,
                  bottom: 10,
                }}><Button
                  full
                  style={{
                    height: 40,
                    borderRadius: 10,
                    width: "100%",
                    backgroundColor: BaseColor.primaryColor,
                  }}
                  onPress={() => {
                    setModalVisibleMap(false);
                  }}
                >
                  <Text caption1 bold whiteColor>
                    Close
                  </Text>
                </Button></View>
            </View>
            <View><Text>asd</Text></View>
          </View>



        )}
      </View>
    </Modal>
  );

  return loading == true ? (
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
      <ActivityIndicator size="large" color={BaseColor.primaryColor} />
      <Text>Sedang memuat data product</Text>
    </View>
  ) : (
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
      <View
        style={{
          position: "absolute",
          backgroundColor: BaseColor.bgColor,
          flex: 1,
          height: 45,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></View>

      <View
        style={{
          flexDirection: "row",
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
        {productType == "hotel" ? (
          <View style={{ flex: 8 }}>
            <View
              style={{
                paddingBottom: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text caption1 whiteColor>
                {paramProduct.name}
              </Text>
              <Text caption1 whiteColor>
                {param.room} kamar, {param.jmlTamu} tamu
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text caption1 whiteColor>
                  {param.checkin} - {param.checkout}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 8 }}></View>
        )}

        {productType == "hotel" ? (
          <View style={{ flex: 2, justifyContent: "center" }}>
            <TouchableOpacity

            >
              <Icon
                name="create-outline"
                size={24}
                color={BaseColor.primaryColor}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}

        {/* {productType == "hotel" ? (
          <View style={{ flex: 2, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {

                // console.log('paramproduct', JSON.stringify(paramProduct));
                // param.hotelLinxDestination = paramProduct.name;
                param.hotelLinxDestination = {
                  total: "",
                  cityid: param.city,
                  cityname: "",
                  countryname: "",
                  searchType: "hotel",
                  searchCity: param.city,
                  searchHotel: "",
                  searchTitle: paramProduct.name,
                  searchArea: "",
                  searchCountry: "Indonesia",
                  searchProvince: param.city
                };
                var paramSearchAgain = {
                  searchDetailAgain: true,
                  param: param,
                  paramProduct: paramProduct,
                  filterProcess: filterProcess,
                };
                console.log('parampparamSearchAgainroduct', JSON.stringify(paramSearchAgain));
                navigation.navigate("HotelSearchAgain", {
                  searchDetailAgain: true,
                  param: param,
                  // typeSearch: 'detail',
                  paramProduct: paramProduct,
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
        ) : (
          <View />
        )} */}
      </View>
      <View style={{ backgroundColor: BaseColor.bgColor, height: height }}>
        {content}
        {contentModalCancel}
        {contentModalMap}
      </View>

      {productType == "general" ? (
        <View
          style={[
            {
              position: "absolute", //Here is the trick
              bottom: 0, //Here is the trick,
              height: height / 10,
              backgroundColor: BaseColor.whiteColor,
              flex: 1,
              width: "100%",
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
              paddingHorizontal: 20,
            },
          ]}
        >
          <View>
            <QuantityPickerHorizontal
              style={{}}
              label="Quantity"
              detail="Pesanan"
              value={1}
              minPerson={1}
              valueMin={1}
              valueMax={false}
              setQuantity={setQuantity}
              id={1}
              typeOld={"4"}
            />
          </View>
          <View>
            <Button
              full
              style={{ height: 40, borderRadius: 10, width: "auto" }}
              onPress={() => {
                onSubmit();
              }}
              pdkv2
            >
              <Text caption1 bold>
                Beli - Rp {priceSplitter(total)}
              </Text>
            </Button>
          </View>
        </View>
      ) : productType != "promo" ? (
        product.detail != undefined ? (
          product.options.length != 0 ? (
            <View
              style={[
                {
                  position: "absolute", //Here is the trick
                  bottom: 0, //Here is the trick,
                  height: height / 10,
                  backgroundColor: BaseColor.whiteColor,
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  paddingVertical: 20,
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                },
              ]}
            >
              <Button
                full
                style={{
                  height: 40,
                  borderRadius: 10,
                  width: "100%",
                  backgroundColor: BaseColor.primaryColor,
                }}
                onPress={() => {
                  this.scroll.scrollTo({ y: screenHeight });
                }}
              >
                <Text caption1 bold whiteColor>
                  Pilih Kamar
                </Text>
              </Button>
            </View>
          ) : (
            // <View />
            <View />
          )
        ) : (
          <View />
        )
      ) : (
        <View />
      )}

      <DropdownAlert
        ref={(ref) => (this.dropdown = ref)}
        messageNumOfLines={10}
        closeInterval={1000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgBanner: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  contentButtonBottom: {
    //
    //height: 100
  },

  tabbar: {
    backgroundColor: "white",
    height: 40,
  },
  tab: {
    width: 130,
  },
  indicator: {
    backgroundColor: BaseColor.primaryColor,
    height: 1,
  },
  label: {
    fontWeight: "400",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  lineInfor: {
    flexDirection: "row",
    borderColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  todoTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    alignItems: "center",
  },
  itemReason: {
    paddingLeft: 10,
    marginTop: 10,
    flexDirection: "row",
  },

  itemPrice: {
    borderBottomWidth: 1,
    borderColor: BaseColor.textSecondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  linePrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  linePriceMinMax: {
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 10,
  },
  iconRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  contentService: {
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
