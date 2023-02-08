import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Clipboard,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  TextInput,
  Linking
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  Image,
  FlightPlan,
  Accordion,
  StarRating
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import Timeline from "react-native-timeline-flatlist";
// import HTMLView from 'react-native-htmlview';
import HTML from "react-native-render-html";
import CardCustom from "../../components/CardCustom";
import AnimatedLoader from "react-native-animated-loader";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import moment from "moment";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import DropdownAlert from "react-native-dropdownalert";
import DataImage from "../../components/DataImage";
import CountDown from "react-native-countdown-component";
import CardCustomProfile from "../../components/CardCustomProfile";

import {
  DataLoading,
  DataConfig,
  DataTrip,
  DataHotelPackage,
  DataHotelPackageCity,
  DataActivities,
  DataDashboard,
  DataSlider,
  DataBooking,
  DataBookingDetail,
} from "@data";
import { DataReview } from "app/data";

export default class PreviewBooking extends Component {
  constructor(props) {
    super(props);

    var param = {};
    if (this.props.param) {
      param = this.props.param;
    }

    var config = {};
    if (this.props.config) {
      config = this.props.config;
    }


    var dataBookingAero = {};
    if (this.props.dataBookingAero) {
      dataBookingAero = this.props.dataBookingAero;
    }



    this.state = {
      expandedProduct: false,
      expandedProduct1: false,
      modalVisibleRinci: false,
      loadingSpinner: this.props.loadingSpinner,
      dataDetail: {},
      guest: [],
      paymentPilih: { "id": '', "key": "", "value": true },
      minimizePrice: false,
      payment: [],
      paymentReal: [],
      paymentParent: [],
      loadingPaymentList: true,


      //review paramater
      reviewTitle: '',
      reviewContent: '',
      rateHelpful: 0,
      rateRating: 0,
      rateLayanan: 0,
      rateKebersihan: 0,
      rateKenyamanan: 0,
      rateLokasi: 0,
      rateFasilitas: 0,
      rateStaff: 0,
      rateHarga: 0,
      rateParkir: 0,


      menu: [
        {
          title: 'Non Veg Biryanis',
          data: [
            { key: 'Chicken Biryani', value: false },
            { key: 'Mutton Biryani', value: false },
            { key: 'Prawns Biryani', value: false },
          ]
        },
        {
          title: 'Pizzas',
          data: [
            { key: 'Chicken Dominator', value: false },
            { key: 'Peri Peri Chicken', value: false },
            { key: 'Indie Tandoori Paneer', value: false },
            { key: 'Veg Extraveganza', value: false }
          ]
        },
        {
          title: 'Drinks',
          data: [
            { key: 'Cocktail', value: false },
            { key: 'Mocktail', value: false },
            { key: 'Lemon Soda', value: false },
            { key: 'Orange Soda', value: false }
          ]
        },
        {
          title: 'Deserts',
          data: [
            { key: 'Choco Lava Cake', value: false },
            { key: 'Gulabjamun', value: false },
            { key: 'Kalajamun', value: false },
            { key: 'Jalebi', value: false }
          ]
        },
      ]

    };
    this.default_Payment = this.default_Payment.bind(this);
    this.checkExpand = this.checkExpand.bind(this);
    this.setChoose = this.setChoose.bind(this);
    this.content_bank = this.content_bank.bind(this);
    this.duration = this.duration.bind(this);
    this.durationFromText = this.durationFromText.bind(this);
    console.log('datadetail', JSON.stringify(this.props.dataDetail))
  }


  convertDateText(date) {
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

   removeChar(str, startIndex, count) {
    return str.substr(0, startIndex) + str.substr(startIndex + count);
  }


  timeline_from(item) {
    var data = {
      time: this.removeChar(item.departure.time,5,3),
      title: item.departure.code + " - " + item.departure.name,
      operation: "Dioperasikan oleh " + item.name,
      description:
        "Departure at :" + item.departure.date + " " + item.departure.time,
      lineColor: "#009688",
      icon: item.image,
      imageUrl: item.image,
      // entertainment: item.inflight_entertainment,
      // baggage: item.baggage,
      // meal: item.meal,
      type: "from",
    };
    return data;
  }

  timeline_to(item) {
    var data = {
      time: this.removeChar(item.arrival.time,5,3),
      title: item.arrival.code + " - " + item.arrival.name,
      operation: "",
      description: "Arrive at :" + item.arrival.date + " " + item.arrival.time,
      icon: item.image,
      imageUrl: item.image,
      // entertainment: item.inflight_entertainment,
      // baggage: item.baggage,
      // meal: item.meal,
      type: "to",
    };
    return data;
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;

    if (rowData.type == "from") {
      if (rowData.description && rowData.imageUrl)
        desc = (
          <View style={styles.descriptionContainer}>
            <Image
              source={{ uri: rowData.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.textDescription]}>{rowData.description}</Text>
            <Text style={[styles.textDescription]}>{rowData.operation}</Text>
          </View>
        );
    } else {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={{ marginLeft: 0, color: "black" }}>
            {rowData.description}
          </Text>
        </View>
      );
    }

    var baggage = "0";
    if (rowData.type == "from") {
      baggage = rowData.baggage;
    }

    var meal = "No";
    if (rowData.type == "from") {
      if (rowData.meal != "0") {
        meal = "Yes";
      }
    }

    var entertainment = "No";
    if (rowData.type == "from") {
      if (rowData.entertainment == "true") {
        entertainment = "Yes";
      }
    }

    var facility = null;
    if (rowData.type == "from") {
      facility = (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.contentFilter}>
            <Icon name="suitcase" size={16} color={BaseColor.grayColor} solid />
            <Text footnote grayColor style={{ marginLeft: 5 }}>
              : {baggage} kg
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.contentFilter}>
            <Icon
              name="hamburger"
              size={16}
              color={BaseColor.grayColor}
              solid
            />
            <Text footnote grayColor style={{ marginLeft: 5 }}>
              : {meal}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.contentFilter}>
            <Icon name="film" size={16} color={BaseColor.grayColor} solid />
            <Text footnote grayColor style={{ marginLeft: 5 }}>
              : {entertainment}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
        {/* {facility} */}
      </View>
    );
  }

  convertDate(date) {
    var dateString = date.toString();

    var MyDate = new Date(dateString);
    var MyDateString = "";
    MyDate.setDate(MyDate.getDate());
    var tempoMonth = MyDate.getMonth() + 1;
    var tempoDate = MyDate.getDate();
    if (tempoMonth < 10) tempoMonth = "0" + tempoMonth;
    if (tempoDate < 10) tempoDate = "0" + tempoDate;

    var dates = MyDate.getFullYear() + "-" + tempoMonth + "-" + tempoDate;
    return dates;
  }

  duration(expirydate) {
    var date = moment();
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    return d;
  }



  getDataPayments() {
    const { dataDetail } = this.props;

    this.setState({ loadingPaymentList: true });
    AsyncStorage.getItem('configApi', (error, result) => {
      if (result) {
        let configApi = JSON.parse(result);

        let config = configApi;
        var baseUrl = config.apiBaseUrl;
        var url = baseUrl + "order/payment/category";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);
        var raw = JSON.stringify();
        console.log("paramOrder", raw);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("detailPaymentMasterss", JSON.stringify(result));
            this.setState({ payment: this.rebuildPayment(result.data) });
            console.log("paymentchildren", JSON.stringify(this.rebuildPayment(result.data)));
            this.setState({ paymentReal: this.rebuildPayment(result.data) });
            this.setState({ paymentParent: this.rebuildParentPayment(result.data) });
            this.setState({ loadingPaymentList: false });

            if (dataDetail?.payments?.selected) {
              setTimeout(() => {
                this.onChangePayment(dataDetail?.payments?.selected);
              }, 200);
            }



          })
          .catch((error) => {
            console.log('error', JSON.stringify(error));
          });
      }
    });

  }

  rebuildParentPayment(listdata) {
    var listdata_new = [];
    var a = 1;
    listdata.map(item => {
      var obj = {};
      obj["title"] = item.name_category;
      obj["value"] = false;

      listdata_new.push(obj);
      a++;
    });


    return listdata_new;
  }

  rebuildPaymentFlat(listdata) {
    const res = [].concat(...listdata.map(x => x.map(x => x[0])))
    console.log('rebuildPaymentFlat', JSON.stringify(res))
  }

  rebuildPayment(listdata) {
    console.log('listdata', JSON.stringify(listdata));

    var listdata_new = [];
    var a = 1;
    listdata.map((itemparent) => {
      itemparent.payment_method.map((item) => {
        var obj = {};
        obj["key"] = item.name_payment_method;
        obj["id"] = item.id_payment_method;
        obj["category"] = itemparent.name_category;
        obj["checked"] = false;
        listdata_new.push(obj);
      });
    });
    console.log("resultrebuid", JSON.stringify(listdata_new));
    return listdata_new;
  }

  rebuildPaymentSub(listdata) {

    var listdata_new = [];
    var a = 1;
    listdata.map((item) => {
      var obj = {};
      obj["key"] = item.name_payment_method;
      obj["id"] = item.id_payment_method;

      obj["value"] = false;
      listdata_new.push(obj);
      a++;
    });
    console.log("resultrebuid", JSON.stringify(listdata_new));
    return listdata_new;
  }



  default_Payment() {
    const { payment } = this.state;
    console.log("paymentreal", JSON.stringify(this.state.paymentReal));
    console.log("payment", JSON.stringify(this.state.payment));
    this.setState({ payment: this.state.paymentReal });
  }
  checkExpand(title, value, index) {
    console.log(title, value);
    array = this.state.payment.map(function (item) {
      item.value = false;
      return item;
    });



    const temp = this.state.payment.slice()
    temp[index].value = !temp[index].value
    this.setState({ payment: temp })
    setTimeout(() => {
      console.log('parentpayment', JSON.stringify(this.state.payment));

    }, 500);


  }
  setChoose(pilih) {
    console.log('pilih', pilih);
    this.setState({ paymentPilih: pilih });
  }
  converColor(status) {
    var color = '';
    if (status === 'danger') {
      color = BaseColor.danger;
    } else if (status === 'info') {
      color = BaseColor.info;

    } else if (status === 'primary') {
      color = BaseColor.primary;

    } else if (status === 'success') {
      color = BaseColor.success;

    } else if (status === 'warning') {
      color = BaseColor.warning;
    }
    return color;

  }


  duration(expirydate) {
    var date = moment();
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    return d;
  }

  durationFromText(expirydate) {
    var date = moment(expirydate, 'DD MMM YYYY HH:mm:ss')
    return date.format('YYYY-MM-DD HH:mm:ss');



  }

  content_countdown() {
    var countDown = <View />
    if (this.props.dataDetail?.status?.timelimit) {
      if (
        this.props.dataDetail?.status?.id == 5 ||
        this.props.dataDetail?.status?.id == 7 ||
        this.props.dataDetail?.status?.id == 9 ||
        this.props.dataDetail?.status?.id == 11 ||
        this.props.dataDetail?.status?.id == 13 ||
        this.props.dataDetail?.status?.id == 15 ||
        this.props.dataDetail?.status?.id == 17 ||
        this.props.dataDetail?.status?.id == 19 ||
        this.props.dataDetail?.status?.id == 21 ||
        this.props.dataDetail?.status?.id == 22 ||
        this.props.dataDetail?.status?.id == 23 ||
        this.props.dataDetail?.status?.id == 24 ||
        this.props.dataDetail?.status?.id == 25

      ) {
        countDown = <View />
      } else {
        countDown = (
          <View


            style={[
              styles.blockView,
              {
                marginTop: 10,
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
                    flex: 7,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text footnote bold>Batas Waktu Pembayaran</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 7,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text footnote bold>{this.props.dataDetail?.status?.timelimit}</Text>
                  {/* <Text>{this.durationFromText(this.props.dataDetail?.status?.timelimit)}</Text> */}
                  {/* <CountDown
                    size={12}
                    until={this.props.timeLimit}
                    // until={this.duration(this.durationFromText(this.props.dataDetail.status.timelimit))}
                    // onFinish={() => alert('Finished')}
                    style={{ float: "left" }}
                    digitStyle={{
                      backgroundColor: "#FFF",
                      borderWidth: 2,
                      borderColor: BaseColor.primaryColor,
                    }}
                    digitTxtStyle={{ color: BaseColor.primaryColor }}
                    timeLabelStyle={{
                      color: BaseColor.primaryColor,
                      fontWeight: "bold",
                    }}
                    separatorStyle={{ color: BaseColor.primaryColor }}
                    timeToShow={["H", "M", "S"]}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                  /> */}
                </View>
              </View>
            </View>
          </View>)
      }
    }

    return (
      <View>
        {countDown}
      </View>
    )

  }

  contentEvoucher() {
    var content = <View />
    if (this.props.dataDetail?.status?.id == 9) {
      content = (
        <CardCustomProfile
          title={"Evoucher"}
          subtitle={"Check tiket keberangkatan Anda"}
          //icon={"ticket"}
          onPress={() => {
            console.log('bookingDoc', this.props.dataDetail?.doc?.eticket);
            // this.props.navigation.navigate("Eticket", {
            //   bookingDoc: this.props.dataDetail?.doc?.eticket,
            // });
            Linking.openURL(this.props.dataDetail?.doc?.eticket);
          }}
        />)
    }
    return (

      <View

      >
        {content}
      </View>
    );


  }

  onChangePayment(selected) {
    console.log('selectpayment', JSON.stringify(selected));
    this.setChoose(selected);
    const { payment } = this.state;
    this.setState({
      payment: payment.map(item => {
        return {
          ...item,
          checked: item.id == selected.id
        };
      })
    });


  }


  content_bank() {
    const { payment } = this.state;
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var content_bank = [];

    var content = <View></View>;
    var title = <View></View>;
    renderAccordions = () => {
      const items = [];
      var a = 0;
      for (item of payment) {
        console.log('expannnd', item.value)

        items.push(
          <Accordion
            title={item.title}
            data={item.data}
            index={a}
            expand={item.value}
            paymentPilih={this.state.paymentPilih}
            checkExpand={this.checkExpand}
            setChoose={this.setChoose}
          />
        );
        a++;
      }
      return items;
    }


    //1,2 -> tombol refresh
    if (this.props.dataDetail?.status?.id == 1 || this.props.dataDetail?.status?.id == 2) {

      //3 -> sudah ada tombol bayar
    } else if (this.props.dataDetail?.status?.id == 3) {
      content = (
        <View style={{ flexDirection: 'row' }}>
          {this.props.dataDetail?.payments?.token != "" ?
            <TouchableOpacity
              s style={{ marginTop: 10, flex: 1 }}
              onPress={() => {
                var redirect = "PembayaranDetail";
                var params = {
                  title: '',
                  subTitle: '',
                  idOrder: this.props.idOrder,
                  link: 'https://app.midtrans.com/snap/v2/vtweb/' + this.props.dataDetail.payments.token
                };

                this.props.navigation.navigate("PembayaranDetail", {
                  param: params,
                });
              }}
            >
              <View pointerEvents="none">
                <Button
                  style={{
                    backgroundColor: BaseColor.success,
                    height: 40,
                  }}
                  full
                >
                  <Text style={{ color: BaseColor.whiteColor }}>
                    Lanjut Bayar
                  </Text>
                </Button>
              </View>
            </TouchableOpacity>
            :
            <View />
          }

          <TouchableOpacity
            onPress={() => {
              this.getDataPayments();
              this.props.setModalVisible(true);
              this.props.setModalContentType("parent");
              console.log(this.state, 'ini state default')
            }}
            style={{ marginTop: 10, flex: 1 }}
          >
            <View pointerEvents="none">
              <Button
                style={{
                  backgroundColor: BaseColor.primaryColor,
                  height: 40,
                }}
                full
              >
                <Text style={{ color: BaseColor.whiteColor }}>
                  {this.props.dataDetail?.payments?.token == "" ? "Pilih Metode Pembayaran" : "Ganti Pembayaran"}
                </Text>
              </Button>
            </View>
          </TouchableOpacity>

        </View>
      );

      //9 -> ada tombol batal
    } else if (this.props.dataDetail?.status?.id == 9) {
      content = (
        <View style={{ flexDirection: 'row' }}>


          {/* <TouchableOpacity
            onPress={() => {
              this.props.setModalVisibleReview(true);

            }}
            style={{ marginVertical: 10, flex: 1 }}
          >
            <View pointerEvents="none">
              <Button
                style={{
                  backgroundColor: BaseColor.primaryColor,
                  height: 40,
                }}
                full
              >
                <Text style={{ color: BaseColor.whiteColor }}>
                  Berikan Review
                </Text>
              </Button>
            </View>
          </TouchableOpacity> */}

        </View>
      );

    } else {
      content = <View />

    }


    var content_modal_review = (
      <Modal
        isVisible={this.props.modalVisibleReview}
        onBackdropPress={() => {
          this.props.setModalVisibleReview(false);
        }}
        onSwipeComplete={() => {
          this.props.setModalVisibleReview(false);
        }}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View style={[styles.contentFilterBottom, { paddingBottom: 100 }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View style={{ flexDirection: "column", marginVertical: 2 }}>
            <Text footnote>Judul</Text>
            <TextInput
              footnote
              style={[BaseStyle.textInput]}
              onChangeText={(text) => {
                this.setState({ reviewTitle: text });
              }}
              autoCorrect={false}
              multiline={true}
              numberOfLines={5}
              placeholder="Judul"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View>

          {/* <View style={{ flexDirection: "column", marginVertical: 2 }}>
            <Text footnote>Content</Text>
            <TextInput
              footnote
              style={[BaseStyle.textInput]}
              onChangeText={(text) => {
                this.setState({ reviewContent: text });
              }}
              autoCorrect={false}
              multiline={true}
              numberOfLines={5}
              placeholder="Content"
              placeholderTextColor={BaseColor.grayColor}
              selectionColor={BaseColor.primaryColor}
            />
          </View> */}

          <View style={{ flexDirection: "column", marginVertical: 2 }}>
            {/* <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Helpfull</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateHelpful}
                    selectedStar={(rating) => {
                      this.setState({
                        rateHelpful: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Rating</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateRating}
                    selectedStar={(rating) => {
                      this.setState({
                        rateRating: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
            </View> */}


            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Kebersihan</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateKebersihan}
                    selectedStar={(rating) => {
                      this.setState({
                        rateKebersihan: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Layanan</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateLayanan}
                    selectedStar={(rating) => {
                      this.setState({
                        rateLayanan: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Staff</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateStaff}
                    selectedStar={(rating) => {
                      this.setState({
                        rateStaff: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Fasilitas</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateFasilitas}
                    selectedStar={(rating) => {
                      this.setState({
                        rateFasilitas: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
            </View>

            {/* <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Lokasi</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateLokasi}
                    selectedStar={(rating) => {
                      this.setState({
                        rateLokasi: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>


              </View>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Harga</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateHarga}
                    selectedStar={(rating) => {
                      this.setState({
                        rateHarga: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
            </View> */}

            {/* <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Layanan</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateLayanan}
                    selectedStar={(rating) => {
                      this.setState({
                        rateLayanan: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <View style={{ width: '70%' }}>
                  <Text footnote>Parkir</Text>
                  <StarRating
                    disabled={false}
                    starSize={20}
                    maxStars={5}
                    rating={this.state.rateParkir}
                    selectedStar={(rating) => {
                      this.setState({
                        rateParkir: rating
                      });
                    }}
                    fullStarColor={BaseColor.yellowColor}
                  />
                </View>
              </View>
            </View> */}


            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  var dataReview = {
                    "id_order": this.props.idOrder,
                    "id_review_type": 2,
                    "title_review": this.state.reviewTitle,
                    "content_review": this.state.reviewTitle,
                    "helpful": 4,
                    "rating": 4,
                    "fullreview": {
                      "layanan": this.state.rateLayanan,
                      "kebersihan": this.state.rateKebersihan,
                      "kenyamanan": 4,
                      "lokasi": 4,
                      "fasilitas": this.state.rateFasilitas,
                      "staff": this.state.rateStaff,
                      "harga": 4,
                      "parkir": 4,
                    }
                  }
                  this.props.sendReview(dataReview);
                  console.log(JSON.stringify(this.props.dataDetail));
                }}
                style={{ marginTop: 10, flex: 1 }}
              >
                <View pointerEvents="none">
                  <Button
                    style={{
                      backgroundColor: BaseColor.primaryColor,
                      height: 40,
                    }}
                    full
                  >
                    <Text style={{ color: BaseColor.whiteColor }}>
                      Kirim Review
                    </Text>
                  </Button>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >

    )

    var content_modal = (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={() => {
          this.props.setModalVisible(false);
        }}
        onSwipeComplete={() => {
          this.props.setModalVisible(false);
        }}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View style={[styles.contentFilterBottom, { paddingBottom: 50 }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>

          {
            this.state.loadingPaymentList == true ?

              <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Menunggu ....</Text>
              :

              <View>
                {/* {renderAccordions()} */}
                <FlatList
                  data={this.state.payment}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        paddingTop: 7,
                        paddingBottom: 7,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: BaseColor.fieldColor
                      }}
                      onPress={() => this.onChangePayment(item)}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View style={{ flex: 1 }}>
                            <Text
                              body1
                              bold
                              style={{
                                paddingTop: 5
                              }}
                            >
                              {item.key}
                            </Text>
                            <Text
                              note
                              numberOfLines={1}
                              footnote
                              style={{
                                paddingTop: 5
                              }}
                            >
                              {item.category}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                            {item.checked ?
                              (
                                <Icon
                                  name="checkmark-circle"
                                  size={25}
                                  color={BaseColor.primaryColor}

                                />
                              )
                              :
                              (
                                <Icon
                                  name="ellipse-outline"
                                  size={25}
                                  color={BaseColor.primaryColor}

                                />
                              )
                            }
                          </View>
                        </View>
                      </View>


                    </TouchableOpacity>
                  )}
                />
                <View style={{ paddingVertical: 3 }}>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.setModalVisible(false);
                        this.props.bookingPayment(this.state.paymentPilih.id);
                      }}
                      style={{ marginTop: 10, width: '50%' }}
                    >
                      <View pointerEvents="none">
                        <Button
                          style={{
                            backgroundColor: BaseColor.primaryColor,
                            height: 40,
                          }}
                          full
                        >
                          <Text style={{ color: BaseColor.whiteColor }}>
                            Simpan Perubahan
                          </Text>
                        </Button>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.setModalVisible(false);
                      }}
                      style={{ marginTop: 10, width: '50%' }}
                    >
                      <View pointerEvents="none">
                        <Button
                          style={{
                            backgroundColor: BaseColor.thirdColor,
                            height: 40,
                          }}
                          full
                        >
                          <Text style={{ color: BaseColor.whiteColor }}>
                            Close
                          </Text>
                        </Button>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          }



        </View>
      </Modal>
    );
    return (
      <View>
        {title}
        {content}
        {content_modal}
        {content_modal_review}
      </View>

    );

  }
  // content_bank2() {
  //   var item = this.state.dataDetail;
  //   var order_payment_recent = item.order_payment_recent;
  //   var order_expired = item.order_expired;
  //   var expiredTime = this.duration(order_expired);
  //   var status_name = "";
  //   var img = "";
  //   const priceSplitter = (number) =>
  //     number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //   var content_bank = [];

  //   var content = <View></View>;

  //   var content_modal = (
  //     <Modal
  //       isVisible={this.props.modalVisible}
  //       onBackdropPress={() => {
  //         this.props.setModalVisible(false);
  //       }}
  //       onSwipeComplete={() => {
  //         this.props.setModalVisible(false);
  //       }}
  //       swipeDirection={["down"]}
  //       style={styles.bottomModal}
  //     >
  //       <View style={[styles.contentFilterBottom, { paddingBottom: 50 }]}>
  //         <View style={styles.contentSwipeDown}>
  //           <View style={styles.lineSwipeDown} />
  //         </View>
  //         {this.props.modalContentType == "child" ? (
  //           <TouchableOpacity
  //             onPress={() => {
  //               this.props.setModalContentType("parent");
  //             }}
  //           >
  //             <Icon
  //               name="md-arrow-back"
  //               size={20}
  //               color={BaseColor.primaryColor}
  //             />
  //           </TouchableOpacity>
  //         ) : (
  //           <View />
  //         )}

  //         {this.props.modalContentType == "parent"
  //           ? this.props.payment.map((item, index) => (
  //             <TouchableOpacity
  //               style={styles.profileItem}
  //               onPress={() => {
  //                 if (this.props.loadingPaymantMethod == false) {
  //                   //alert(item.option);
  //                   if (item.option == true) {
  //                     this.props.setModalContentType("child");
  //                     this.props.modalShow(true, item);
  //                   } else {
  //                     //alert('gotoPaymentDetail');
  //                     this.props.setModalVisible(false);
  //                     this.props.gotoPaymentDetail(item);
  //                   }
  //                 }
  //               }}
  //             >
  //               {this.props.loadingPaymantMethod == true ? (
  //                 <PlaceholderLine width={100} />
  //               ) : (
  //                 <View style={{ flexDirection: "row" }}>
  //                   <Text style={{}} footnote bold>
  //                     {item.payment_type_label}
  //                   </Text>
  //                 </View>
  //               )}
  //               {this.props.loadingPaymantMethod == true ? (
  //                 <View />
  //               ) : (
  //                 <View
  //                   style={{
  //                     flexDirection: "row",
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <Text style={{ marginLeft: 10 }} footnote bold>
  //                     Rp {priceSplitter(item.subPayment[0].fee)}
  //                   </Text>
  //                   <Icon
  //                     name="chevron-forward-outline"
  //                     color={BaseColor.primaryColor}
  //                     style={{ marginLeft: 5 }}
  //                   />
  //                 </View>
  //               )}
  //             </TouchableOpacity>
  //           ))
  //           : this.props.option.map((item, index) => (
  //             <TouchableOpacity
  //               style={styles.contentActionModalBottom}
  //               key={item.value}
  //               onPress={() => {
  //                 this.props.setModalVisible(false);
  //                 this.props.gotoPaymentDetailSub(item);
  //               }}
  //             >
  //               <View style={{ flexDirection: "row" }}>
  //                 {/* <Image
  //                                       source={{ uri: item.icon }}
  //                                       style={{
  //                                           height: 20,
  //                                           width: 80,
  //                                           marginRight: 5
  //                                       }}
  //                                   /> */}
  //                 <Text style={{}} footnote bold>
  //                   {item.payment_sub_label}
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           ))}
  //       </View>
  //     </Modal>
  //   );

  //   if (order_payment_recent != null) {
  //     var expiredTime = this.duration(order_payment_recent.expired);
  //     if (item.aero_status == "BLOCKINGINPROGRESS") {
  //       status_name = "Menunggu Konfirmasi";
  //       content = (
  //         <View>
  //           {/* <DataImage img={Images.waiting} text={status_name} /> */}
  //           <Button
  //             full
  //             style={{
  //               borderRadius: 0,
  //               backgroundColor: BaseColor.primaryColor,
  //               marginTop: 10,
  //             }}
  //             loading={this.props.loadingButton}
  //             onPress={() => {
  //               var redirect = "Pembayaran";
  //               var paramx = {
  //                 id_order: this.state.dataDetail.id_order,
  //                 dataPayment: {},
  //               };
  //               this.props.navigation.navigate("Loading", {
  //                 redirect: redirect,
  //                 param: paramx,
  //               });
  //             }}
  //           >
  //             <Text whiteColor>Refresh / Cek Order</Text>
  //           </Button>
  //         </View>
  //       );
  //     } else {
  //       if (this.props.loadingSpinner == false) {
  //         if (
  //           order_payment_recent.payment_type == "" ||
  //           order_payment_recent.payment_type == "user"
  //         ) {
  //           var title = <Text>Metode Pembayaran</Text>;
  //         } else {
  //           var title = <Text>Metode Pembayaran Terpilih</Text>;
  //         }
  //       }

  //       if (item.order_status.order_status_slug == "paid") {
  //         title = <View />;
  //         content = <View />;
  //       } else if (item.order_status.order_status_slug == "booked") {
  //         title = <View />;
  //         content = <View />;
  //       } else if (item.order_status.order_status_slug == "complete") {
  //         title = <View />;
  //         content = <View />;
  //       } else {
  //         if (expiredTime > 0) {
  //           if (
  //             order_payment_recent.payment_type == "" ||
  //             order_payment_recent.payment_type == "user"
  //           ) {
  //             if (
  //               item.order_status.order_status_slug == "process" ||
  //               item.order_status.order_status_slug == "new"
  //             ) {
  //               status_name = item.order_status.order_status_name;
  //               content = (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     this.props.setModalVisible(true);
  //                     this.props.setModalContentType("parent");
  //                   }}
  //                   style={{ marginTop: 10 }}
  //                 >
  //                   <View pointerEvents="none">
  //                     <Button
  //                       style={{
  //                         backgroundColor: BaseColor.primaryColor,
  //                         height: 30,
  //                       }}
  //                       full
  //                     >
  //                       <Text style={{ color: BaseColor.whiteColor }}>
  //                         Pilih Metode Pembayaran
  //                       </Text>
  //                     </Button>
  //                   </View>
  //                 </TouchableOpacity>
  //               );
  //             } else {
  //               status_name = item.order_status.order_status_name;
  //               content = <DataImage img={Images.timeout} text={status_name} />;
  //             }
  //           } else {
  //             var content_lanjut_bayar = <View />;
  //             if (order_payment_recent.payment_type == "Indodana") {
  //               if (this.props.statusIndodana == true) {
  //                 if (this.props.loadingIndodana == false) {
  //                   content_lanjut_bayar = (
  //                     <View
  //                       style={{
  //                         flex: 1,
  //                         justifyContent: "center",
  //                         alignItems: "flex-start",
  //                         width: "30%",
  //                       }}
  //                     >
  //                       <Button
  //                         full
  //                         style={{
  //                           borderRadius: 0,
  //                           backgroundColor: BaseColor.primaryColor,
  //                           marginTop: 10,
  //                         }}
  //                         loading={loadingButton}
  //                         onPress={() => {
  //                           var redirect = "Pembayaran";
  //                           var paramx = {
  //                             id_order: id_order,
  //                             dataPayment: {},
  //                           };
  //                           this.props.navigation.navigate("Loading", {
  //                             redirect: redirect,
  //                             param: paramx,
  //                           });
  //                         }}
  //                       >
  //                         <Text whiteColor>Refresh / Cek Order</Text>
  //                       </Button>
  //                     </View>
  //                   );
  //                 } else {
  //                   content_lanjut_bayar = (
  //                     <View
  //                       style={{
  //                         flex: 1,
  //                         justifyContent: "center",
  //                         alignItems: "flex-start",
  //                         width: "30%",
  //                       }}
  //                     >
  //                       <Text>Menunggu Perubahan Status</Text>
  //                     </View>
  //                   );
  //                 }
  //               } else {
  //                 if (this.props.loadingIndodana == false) {
  //                   content_lanjut_bayar = (
  //                     <View
  //                       style={{
  //                         flex: 1,
  //                         justifyContent: "center",
  //                         alignItems: "flex-start",
  //                         width: "30%",
  //                       }}
  //                     >
  //                       <Button
  //                         style={{
  //                           borderRadius: 0,
  //                           marginVertical: 0,
  //                           height: 30,
  //                           backgroundColor: BaseColor.fourthColor,
  //                         }}
  //                         full
  //                         onPress={() => {
  //                           this.props.gotoFormPayment();
  //                         }}
  //                       >
  //                         Lanjut Bayar
  //                       </Button>
  //                     </View>
  //                   );
  //                 }
  //               }
  //             } else {
  //               content_lanjut_bayar = (
  //                 <View
  //                   style={{
  //                     flex: 1,
  //                     justifyContent: "center",
  //                     alignItems: "flex-start",
  //                     width: "30%",
  //                   }}
  //                 >
  //                   <Button
  //                     style={{
  //                       borderRadius: 0,
  //                       marginVertical: 0,
  //                       height: 30,
  //                       backgroundColor: BaseColor.fourthColor,
  //                     }}
  //                     full
  //                     onPress={() => {
  //                       this.props.gotoFormPayment();
  //                     }}
  //                   >
  //                     Lanjut Bayar
  //                   </Button>
  //                 </View>
  //               );
  //             }

  //             content = (
  //               <View style={{ flexDirection: "column" }}>
  //                 <View style={{ flex: 1 }}>
  //                   <View style={{ flexDirection: "row", marginTop: 10 }}>
  //                     <View style={{ flex: 1 }}>
  //                       <Text footnote bold>
  //                         Pembayaran via
  //                       </Text>
  //                     </View>
  //                     <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                       <Text footnote bold primaryColor>
  //                         {order_payment_recent.payment_sub_label}
  //                       </Text>
  //                     </View>
  //                   </View>
  //                   {order_payment_recent.payment_form == "screenSelf" ? (
  //                     <View>
  //                       <View style={{ flexDirection: "row", marginTop: 10 }}>
  //                         <View style={{ flex: 1 }}>
  //                           <Text footnote bold>
  //                             Virtual Account
  //                           </Text>
  //                         </View>
  //                         <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                           <View style={{ flexDirection: "row" }}>
  //                             <Text footnote bold primaryColor>
  //                               {
  //                                 order_payment_recent.payment_va_or_code_or_link
  //                               }
  //                             </Text>

  //                             <TouchableOpacity
  //                               onPress={() => {
  //                                 Clipboard.setString(
  //                                   order_payment_recent.payment_va_or_code_or_link
  //                                 );
  //                                 this.dropdown.alertWithType(
  //                                   "success",
  //                                   "Copy Text Invoice",
  //                                   order_payment_recent.payment_va_or_code_or_link
  //                                 );
  //                               }}
  //                             >
  //                               <Icon
  //                                 name="copy"
  //                                 size={14}
  //                                 style={{ marginLeft: 10 }}
  //                               />
  //                             </TouchableOpacity>
  //                           </View>
  //                         </View>
  //                       </View>
  //                       {order_payment_recent.payment_sub_label == "Mandiri" ? (
  //                         <View style={{ flexDirection: "row", marginTop: 10 }}>
  //                           <View style={{ flex: 1 }}>
  //                             <Text footnote bold>
  //                               Penyedia Jasa
  //                             </Text>
  //                           </View>
  //                           <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                             <View style={{ flexDirection: "row" }}>
  //                               <Text footnote bold primaryColor>
  //                                 Midtrans (70012)
  //                               </Text>
  //                             </View>
  //                           </View>
  //                         </View>
  //                       ) : (
  //                         <View />
  //                       )}
  //                     </View>
  //                   ) : (
  //                     <View />
  //                   )}
  //                 </View>
  //                 <View style={{ flexDirection: "row", marginTop: 10 }}>
  //                   {order_payment_recent.payment_form != "screenSelf" ? (
  //                     content_lanjut_bayar
  //                   ) : (
  //                     <View />
  //                   )}
  //                   {order_payment_recent.payment_type != "Indodana" ? (
  //                     <View
  //                       style={{
  //                         flex: 2,
  //                         justifyContent: "center",
  //                         alignItems: "flex-start",
  //                         width: "60%",
  //                         flexDirection: "row",
  //                       }}
  //                     >
  //                       <View
  //                         style={{
  //                           flex: 1,
  //                           justifyContent: "center",
  //                           alignItems: "flex-start",
  //                           width: "30%",
  //                         }}
  //                       >
  //                         <Button
  //                           style={{
  //                             borderRadius: 0,
  //                             marginVertical: 0,
  //                             height: 30,
  //                           }}
  //                           full
  //                           //loading={loading}
  //                           onPress={() => {
  //                             Alert.alert(
  //                               "Confirm",
  //                               "Ingin mengganti metode pembayaran ?",
  //                               [
  //                                 {
  //                                   text: "NO",
  //                                   onPress: () => console.warn("NO Pressed"),
  //                                   style: "cancel",
  //                                 },
  //                                 {
  //                                   text: "YES",
  //                                   onPress: () => this.props.submitChange(),
  //                                 },
  //                               ]
  //                             );
  //                           }}
  //                         >
  //                           Ganti
  //                         </Button>
  //                       </View>
  //                       <View
  //                         style={{
  //                           flex: 1,
  //                           justifyContent: "center",
  //                           alignItems: "flex-start",
  //                           width: "30%",
  //                         }}
  //                       >
  //                         <Button
  //                           style={{
  //                             borderRadius: 0,
  //                             marginVertical: 0,
  //                             height: 30,
  //                             backgroundColor: BaseColor.primaryColor,
  //                           }}
  //                           full
  //                           onPress={() => {
  //                             this.props.cekStatusMidtrans(
  //                               item.order_payment_recent.id_invoice,
  //                               true
  //                             );
  //                           }}
  //                         >
  //                           <Text style={{ color: BaseColor.whiteColor }}>
  //                             Cek Bayar
  //                           </Text>
  //                         </Button>
  //                       </View>
  //                     </View>
  //                   ) : (
  //                     <></>
  //                   )}
  //                 </View>
  //               </View>
  //             );
  //           }
  //         } else {
  //           if (item.order_status.order_status_slug == "new") {
  //             if (order_payment_recent.expired == "") {
  //               status_name = "Menunggu Konfirmasi";
  //               content = <DataImage img={Images.waiting} text={status_name} />;
  //             } else {
  //               status_name = "Expireds";
  //               content = <DataImage img={Images.timeout} text={status_name} />;
  //             }
  //           } else if (item.order_status.order_status_slug == "process") {
  //             status_name = "Menunggu Payment";
  //             content = <View />;
  //           } else if (item.order_status.order_status_slug == "paid") {
  //             status_name = "Paid";
  //             content = <DataImage img={Images.paid} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "booked") {
  //             status_name = "Booked";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "complete") {
  //             status_name = "Complete";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "cancel") {
  //             status_name = "Cancel";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "expired") {
  //             status_name = "Expired";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "billed") {
  //             status_name = "Billed";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "deny") {
  //             status_name = "Deny";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "error") {
  //             status_name = "Error";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "dropped") {
  //             status_name = "Dropped";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           } else if (item.order_status.order_status_slug == "refunded") {
  //             status_name = "Refunded";
  //             content = <DataImage img={Images.timeout} text={status_name} />;
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     status_name = item.order_status.order_status_name;
  //     content = (
  //       <View
  //         style={{
  //           borderWidth: 1,
  //           borderColor: BaseColor.textSecondaryColor,
  //           borderRadius: 10,
  //           marginBottom: 10,
  //           padding: 10,
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Icon name="check-circle" size={50} color={"green"} solid />
  //         <Text footnote>{status_name}</Text>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View
  //       style={[
  //         this.props.loadingSpinner == false ? styles.blockView : "",
  //         { marginTop: 10 },
  //       ]}
  //     >
  //       {title}
  //       {content}
  //       {content_modal}
  //       {/* {content_modal_sub} */}
  //     </View>
  //   );
  // }

  render() {
    const { navigation } = this.props;

    const { dataDetail, loadingSpinner, guest, dataBooking } = this.props;
    console.log('datadetailss', JSON.stringify(dataDetail));

    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var contentContact = <View />
    var contentPayment = <View />
    var contentProduct = <View></View>;
    var dataDeparture = <View />;
    var dataReturn = <View />;
    //var dataDetail = this.props.dataDetail;
    var product = dataDetail.product;


    // console.log('datadetailPreviewbooking', JSON.stringify(dataDetail));
    // console.log('loadingSpinner', JSON.stringify(loadingSpinner));
    // console.log('product', product);


    console.log('datadetail', JSON.stringify(dataDetail));
    var paxs = [];
    var info = <View />;



    //------------opendataPaxss---------//

    if (dataDetail.product == "flight") {
      var paxs = [];
      dataDetail?.guest?.map((item, index) =>
        paxs.push(
          <View>
            <Text footnote style={{ marginBottom: 5 }}>
              {item.title}. {item.firstName} {item.lastName}
            </Text>
            {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Nationality</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote grayColor>
                  {item.nationality_name}
                </Text>
              </View>
            </View> */}
          </View>
        )
      );
    } else {
      var paxs = [];
      var a = 1;
      dataDetail?.guest?.map((item, index) =>
        paxs.push(
          <View style={{ marginBottom: 10 }}>
            <Text footnote bold style={{ marginBottom: 5 }}>
              {item.title}. {item.firstName} {item.lastName}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 0 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Nationality</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote grayColor>
                  {item.nationality}
                </Text>
              </View>
            </View>
          </View>
        )
      );
    }

    //------------closeDataPax---------//
    if (dataDetail.price) {
      contentPayment = <View
        style={[
          styles.blockView,
          {
            marginTop: 10,
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
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            borderBottomColor: BaseColor.bgColor,
            borderBottomWidth: 2,
            paddingBottom: 10,
          }}
        >
          <View>
            <Text subhead bold style={{ marginBottom: 10 }}>
              Detail Pembayaran
            </Text>
          </View>
        </View>
        {/* {dataDetail.payments.history.length == 0 ? (
          <TouchableOpacity onPress={() => { }}>
            <View pointerEvents="none">
              <Button
                //loading={loading}
                style={{
                  backgroundColor: this.state.colorButton,
                  height: 30,
                }}
                full
              >
                <Text style={{ color: this.state.colorButtonText }}>
                  Belum Pilih Metode Pembayaran
                    </Text>
              </Button>
            </View>
          </TouchableOpacity>
        ) : (
            <View />
          )} */}

        {this.state.minimizePrice == false ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Subtotal</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail.price.subtotal)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Pajak</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Include
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Discount</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail.price.discount)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Point</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail.price.point)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Fee</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp{" "}
                  {dataDetail.fee == 0
                    ? "-"
                    : priceSplitter(dataDetail.price.fee)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Total</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail.price.total)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    }
    //----------contectContact-----------//
    if (dataDetail.contact) {
      contentContact = <View
        style={[
          styles.blockView,
          {
            marginTop: 10,
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
        <Text body2 bold style={{ marginBottom: 10 }}>
          Contact’s Name
        </Text>
        <Text footnote>
          {dataDetail.contact.title}. {dataDetail.contact.firstName}{" "}
          {dataDetail.contact.lastName}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text footnote>Phone</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text footnote grayColor>
              ({dataDetail.contact.phoneCode}){" "}
              {dataDetail.contact.phone}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text footnote>Email</Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <Text footnote grayColor>
              {dataDetail.contact.email}
            </Text>
          </View>
        </View>
      </View>
    }


    //-----------------contentFlight----------------//
    if (product == "flight") {
      //   var flightDeparture = dataBooking.detail[0].order_detail[0];
      //   var flightDepartureSchedule = dataBooking.detail[0].order_detail[0].flight_schedule[0];
      //   var flightDepartureOrigin = dataBooking.detail[0].order_detail[0].origin_airport;
      //   var flightDepartureDestination = dataBooking.detail[0].order_detail[0].destination_airport;

      var data_timelineDeparture = [];
      var a = 0;
      for (const item of dataDetail?.detail?.onwardFlight?.flight) {
        data_timelineDeparture.push(
          this.timeline_from(item)
        );
        data_timelineDeparture.push(
          this.timeline_to(
            item
          )
        );

      }

      dataDeparture = (
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 32,
                height: 32,
                marginRight: 10,
                borderRadius: 16,
              }}
              resizeMode="contain"
              source={{ uri: dataDetail?.detail?.onwardFlight?.flight[0]?.image }}
            />
            <View>
              <Text footnote>{dataDetail?.detail?.onwardFlight?.flight[0]?.name}</Text>
              <Text footnote>
                {dataDetail?.detail?.onwardFlight?.from?.code} -
                {dataDetail?.detail?.onwardFlight?.to?.code} |
                {dataDetail?.detail?.onwardFlight?.date}
                {/* {flightDepartureSchedule.arrival_time} */}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text footnote semibold primaryColor>
              Departure
            </Text>
          </View>
        </View>
      );

      if (dataDetail?.detail?.returnFlight) {

        var data_timelineReturn = [];
        var a = 0;
        for (const item of dataDetail?.detail?.returnFlight?.flight) {
          data_timelineReturn.push(
            this.timeline_from(item)
          );
          data_timelineReturn.push(
            this.timeline_to(
              item
            )
          );

        }

        dataReturn = (
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 10,
                  borderRadius: 16,
                }}
                resizeMode="contain"
                source={{ uri: dataDetail?.detail?.returnFlight?.flight[0]?.image }}
              />
              <View>
                <Text footnote>{dataDetail?.detail?.returnFlight?.flight[0]?.name}</Text>
                <Text footnote>
                  {dataDetail?.detail?.returnFlight?.from?.code} -
                  {dataDetail?.detail?.returnFlight?.to?.code} |
                  {dataDetail?.detail?.returnFlight?.date}
                  {/* {flightReturnSchedule.arrival_time} */}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text footnote semibold primaryColor>
                Return
              </Text>
            </View>
          </View>
        );
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
            marginTop: 10,
            //marginBottom: 20
          }}
        >
          <FlightPlan
            round={dataDetail?.detail?.returnFlight ? true : false}
            fromCode={dataDetail?.detail?.onwardFlight?.from?.code}
            toCode={dataDetail?.detail?.onwardFlight?.to?.code}
            from={dataDetail?.detail?.onwardFlight?.from?.name}
            to={dataDetail?.detail?.onwardFlight?.to?.name}
          />

          {
            this.state.expandedProduct == false ?
              <View>
                <Button
                  style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                  onPress={() => {
                    this.setState({ expandedProduct: true })

                  }}
                >
                  <Text bold>Lihat Detail Penerbangan</Text>
                </Button>
              </View>
              :
              <View />
          }
          {
            this.state.expandedProduct == true ?

              <View>
                {dataDeparture}
                <Timeline
                  data={data_timelineDeparture}
                  circleSize={20}
                  circleColor={BaseColor.primaryColor}
                  lineColor={BaseColor.primaryColor}
                  timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
                  timeStyle={{
                    textAlign: "center",
                    backgroundColor: "#ff9797",
                    color: "white",
                    padding: 5,
                    borderRadius: 13,
                  }}
                  descriptionStyle={{ color: "gray" }}
                  options={{
                    style: { paddingTop: 5 },
                  }}
                  //innerCircle={'icon'}
                  onEventPress={this.onEventPress}
                  renderDetail={this.renderDetail}
                />
                {dataReturn}
                <Timeline
                  data={data_timelineReturn}
                  circleSize={20}
                  circleColor={BaseColor.primaryColor}
                  lineColor={BaseColor.primaryColor}
                  timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
                  timeStyle={{
                    textAlign: "center",
                    backgroundColor: "#ff9797",
                    color: "white",
                    padding: 5,
                    borderRadius: 13,
                  }}
                  descriptionStyle={{ color: "gray" }}
                  options={{
                    style: { paddingTop: 5 },
                  }}
                  //innerCircle={'icon'}
                  onEventPress={this.onEventPress}
                  renderDetail={this.renderDetail}
                />
              </View>
              :
              <View />
          }
          {
            this.state.expandedProduct == true ?
              <View>
                <Button
                  style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                  onPress={() => {
                    this.setState({ expandedProduct: false })

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
    if (product == "product") {
      contentProduct = (
        <View style={{ flex: 1 }}>
          <CardCustom
            propImage={{ height: wp("50%"), url: dataDetail.image }}
            propTitle={{ text: dataDetail.name }}
            propInframe={{
              top: false,
              topTitle: "",
              topHighlight: false,
              topIcon: "",
              bottom: "",
              bottomTitle: "",
            }}
            propReview={0}
            propIsPromo={false}
            propDesc={{ text: "" }}
            propType={"product"}
            propStar={{ rating: 0, enabled: false }}
            onPress={() => { }}
            loading={false}
            propOther={{ inFrame: true, horizontal: false, width: "100%" }}
            propIsCampaign={false}
            propPoint={0}
            propDesc1={dataDetail.detail.address}
            propDesc2={dataDetail.detail.description}
            propDesc3={{}}
            propHightLight={""}
            propPriceCoret={{
              price: dataDetail.price.subtotal,
              priceDisc: 0,
              discount: "",
              discountView: false,
            }}
            propLeftRight={{
              left: "Checkin",
              right: '',
              display: false,
            }}
            propLeftRight2={{
              left: "Checkout",
              right: '',
              display: false,
            }}
            style={[{ marginBottom: 10 }]}
            sideway={true}
          />
        </View>
      );
    }
    //-----------------contentGeneral---------------//

    //-----------------contentHotel---------------//
    if (product == "hotel") {
      contentProduct = (
        <View style={{ flex: 1 }}>
          <CardCustom
            propImage={{ height: wp("25%"), url: dataDetail.image }}
            propTitle={{ text: dataDetail.name }}
            propInframe={{
              top: false,
              topTitle: "",
              topHighlight: false,
              topIcon: "",
              bottom: "",
              bottomTitle: "",
            }}
            propReview={0}
            propIsPromo={false}
            propDesc={{ text: "" }}
            propType={"hotel"}
            propStar={{ rating: 0, enabled: false }}
            onPress={() => { }}
            loading={false}
            propOther={{ inFrame: true, horizontal: false, width: "100%" }}
            propIsCampaign={false}
            propPoint={0}
            propDesc1={dataDetail.detail.address}
            propDesc2={dataDetail.detail.description}
            propDesc3={{}}
            propHightLight={""}
            propLeftRight={{
              left: "Checkin",
              right: dataDetail.period.dateFrom,
              display: true,
            }}
            propLeftRight2={{
              left: "Checkout",
              right: dataDetail.period.dateTo,
              display: true,
            }}

            propLeftRight3={{ left: "", right: "", display: false }}
            propLeftRight4={{ left: "", right: "", display: false }}
            propTopDown={{
              top: "Fasilitas",
              down: '',
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
          <View
            style={[
              styles.blockView,
              {
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
            <Text subhead bold style={{ marginBottom: 10 }}>
              Detail Kamar
            </Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Room Type</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote numberOfLines={1} >
                  {dataDetail.options[0].name}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Fasilitas Sarapan</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote >
                  {dataDetail.room.breakfastIncluded == false ? "Tidak termasuk sarapan" : "Termasuk Sarapan"}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Tamu</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote >
                  {dataDetail.room.numOfAdults} Tamu
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Kamar</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote >
                  {dataDetail.room.numOfRoom} Kamar
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text footnote>Permintaan Khusus</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote >
                  {dataDetail.specialRequest}
                </Text>
              </View>
            </View>

            {/* <View style={{ flexDirection: "column", marginTop: 10 }}>
              <View style={{ flex: 2 }}>
                <Text footnote bold style={{ color: BaseColor.thirdColor }}>Kebijakan Pembatalan</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text footnote>
                  {dataDetail.room.cancellationPolicy}
                </Text>
              </View>
            </View> */}
          </View>
        </View>
      );
    }
    //-----------------contentHotel---------------//

    var contentPaymentSelect = <View />
    if (dataDetail?.payments?.selected?.name) {
      contentPaymentSelect = <View
        style={[
          styles.blockView,
          {
            marginTop: 10,
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
        <Text body2 bold style={{ color: BaseColor.primaryColor }}>
          Pembayaran yang dipilih : {dataDetail?.payments?.selected?.name}
          {/* {JSON.stringify(dataDetail?.payments?.selected)} */}
        </Text>


      </View>
    }

    var contentStatusPesanan = <View />
    contentStatusPesanan = <View
      style={[
        styles.blockView,
        {
          marginTop: 10,
          //borderWidth:2,
          //borderColor:this.converColor(dataDetail?.status?.color),
          //backgroundColor: this.converColor(dataDetail?.status?.color),
          backgroundColor: BaseColor.whiteColor,
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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text body2 bold style={{ marginBottom: 5, alignSelf: 'center' }}>
            Status Pesanan
          </Text>

          <View style={{}}>
            <View style={{}}>
              <Text
                body1 bold style={{ marginBottom: 5, alignSelf: 'center', color: this.converColor(dataDetail?.status?.color) }}
              >
                {dataDetail?.status?.name}
              </Text>
            </View>

            <Text
              footnote
              style={{ marginBottom: 5, alignSelf: 'center', color: this.converColor(dataDetail?.status?.color) }}

            >{dataDetail?.status?.description}</Text>
          </View>
        </View>
        {/* <View style={{ flex: 2 }}>
          <View style={{}}>
            <Text body2 bold style={{ marginBottom: 5 }}>
              Rincian Pembayaran
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View>
              <Text body2 bold>
                {" "}
                Rp {priceSplitter(dataDetail?.price?.total)}

              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisibleRinci: true });
                }}
              >
                <Icon
                  name="chevron-down-outline"
                  size={20}
                  color={BaseColor.primaryColor}
                  style={{ marginTop: -2 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>
      <Modal
        isVisible={this.state.modalVisibleRinci}
        onBackdropPress={() => {
          this.setState({ modalVisibleRinci: false })
          //this.props.setModalVisible(false);
        }}
        onSwipeComplete={() => {
          this.setState({ modalVisibleRinci: false })
          //this.props.setModalVisible(false);
        }}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View style={[styles.contentFilterBottom, { paddingBottom: 50 }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Subtotal</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail?.price?.subtotal)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Pajak</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail?.price?.tax ? dataDetail?.price?.tax : 0)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Discount</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail?.price?.discount)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Point</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail?.price?.point)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Fee</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp{" "}
                  {dataDetail.fee == 0
                    ? "-"
                    : priceSplitter(dataDetail?.price?.fee)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Fee 2</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp{" "}
                  {dataDetail.fee == 0
                    ? "-"
                    : priceSplitter(dataDetail?.price?.fee2 ? dataDetail?.price?.fee2 : 0)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Add On</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp{" "}
                  {dataDetail.fee == 0
                    ? "-"
                    : priceSplitter(dataDetail?.price?.addon ? dataDetail?.price?.addon : 0)}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                borderBottomColor: BaseColor.bgColor,
                borderBottomWidth: 2,
                paddingBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text footnote>Total</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote bold>
                  Rp {priceSplitter(dataDetail?.price?.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>


    return (

      <View style={{ marginTop: 10 }}>

        <View style={{}}>
          {
            this.content_countdown()
          }
          {contentStatusPesanan}
          {
            this.content_bank()
          }
          {contentPayment}

          {contentPaymentSelect}
          {this.contentEvoucher()}
          {contentProduct}
          {contentContact}


          {dataDetail?.guest
            ?
            <View
              style={[
                styles.blockView,
                {
                  marginTop: 10,
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
              <Text body2 bold style={{ marginBottom: 10 }}>
                Pax / Guest {dataDetail?.guest?.length}
              </Text>
              {paxs}
            </View>
            :
            <View />
          }
          {info}

          {contentPayment}

        </View>

        <DropdownAlert
          ref={(ref) => (this.dropdown = ref)}
          messageNumOfLines={10}
          closeInterval={1000}
        />
      </View>
    );
  }
}
