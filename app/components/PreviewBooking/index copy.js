import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Clipboard,
  AsyncStorage,
  ActivityIndicator
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
  Accordion
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

  timeline_from(item, origin, destination) {
    var data = {
      time: item.departure_time,
      title: item.destination_id + " - " + origin.name,
      operation: "Dioperasikan oleh " + item.airline_name,
      description:
        "Departure at :" + item.departure_date + " " + item.departure_time,
      lineColor: "#009688",
      icon: item.airline_logo,
      imageUrl: item.airline_logo,
      // entertainment: item.inflight_entertainment,
      // baggage: item.baggage,
      // meal: item.meal,
      type: "from",
    };
    return data;
  }

  timeline_to(item, origin, destination) {
    var data = {
      time: item.arrival_time,
      title: item.origin_id + " - " + destination.name,
      operation: "",
      description: "Arrive at :" + item.arrival_date + " " + item.arrival_time,
      icon: item.airline_logo,
      imageUrl: item.airline_logo,
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
            <Text caption1 grayColor style={{ marginLeft: 5 }}>
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
            <Text caption1 grayColor style={{ marginLeft: 5 }}>
              : {meal}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.contentFilter}>
            <Icon name="film" size={16} color={BaseColor.grayColor} solid />
            <Text caption1 grayColor style={{ marginLeft: 5 }}>
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
            this.rebuildPayment(result.data);
            this.setState({ payment: this.rebuildPayment(result.data) });
            this.setState({ paymentReal: this.rebuildPayment(result.data) });
            this.setState({ paymentParent: this.rebuildParentPayment(result.data) });
            this.setState({ loadingPaymentList: false });
            // this.setState({rebuildPayment(result.data)});
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

  rebuildPayment(listdata) {
    console.log('listdata', JSON.stringify(listdata));

    var listdata_new = [];
    var a = 1;
    listdata.map((item) => {
      var obj = {};
      obj["title"] = item.name_category;
      obj["value"] = false;
      obj["data"] = this.rebuildPaymentSub(item.payment_method);
      listdata_new.push(obj);
      a++;
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
            // style={{
            //   borderWidth: 1,
            //   borderColor: BaseColor.textSecondaryColor,
            //   borderRadius: 10,
            //   marginBottom: 10,
            //   padding: 10,
            // }}

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
                    <Text caption1 bold>Batas Waktu Pembayaran</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 7,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text caption1 bold>{this.props.dataDetail?.status?.timelimit}</Text>
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
          icon={"bookmark-outline"}
          onPress={() => {
            console.log('bookingDoc', this.props.dataDetail?.doc?.eticket);
            this.props.navigation.navigate("Eticket", {
              bookingDoc: this.props.dataDetail?.doc?.eticket,
            });
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

              style={{ marginTop: 10, flex: 1 }}
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
                    height: 30,
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
                  height: 30,
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


          <TouchableOpacity
            onPress={() => {

              this.props.setModalVisibleCancel(true);

            }}
            style={{ marginTop: 10, flex: 1 }}
          >
            <View pointerEvents="none">
              <Button
                style={{
                  backgroundColor: BaseColor.thirdColor,
                  height: 30,
                }}
                full
              >
                <Text style={{ color: BaseColor.whiteColor }}>
                  Batalkan Pesanan
                </Text>
              </Button>
            </View>
          </TouchableOpacity>

        </View>
      );

    } else {
      content = <View />

    }



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
                {renderAccordions()}
                <View style={{ paddingVertical: 3 }}>
                  <View style={{}}>
                    <Text bold>
                      Metode Pembayaran : {this.state.paymentPilih.key == '' ? 'Belum dipilih' : this.state.paymentPilih.key}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.bookingPayment(this.state.paymentPilih.id);
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <View pointerEvents="none">
                      <Button
                        style={{
                          backgroundColor: BaseColor.primaryColor,
                          height: 30,
                        }}
                        full
                      >
                        <Text style={{ color: BaseColor.whiteColor }}>
                          Simpan Perubahan
                        </Text>
                      </Button>
                    </View>
                  </TouchableOpacity>
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
  //                   <Text style={{}} caption2 bold>
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
  //                   <Text style={{ marginLeft: 10 }} caption2 bold>
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
  //                 <Text style={{}} caption2 bold>
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
  //                       <Text caption1 bold>
  //                         Pembayaran via
  //                       </Text>
  //                     </View>
  //                     <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                       <Text caption2 bold primaryColor>
  //                         {order_payment_recent.payment_sub_label}
  //                       </Text>
  //                     </View>
  //                   </View>
  //                   {order_payment_recent.payment_form == "screenSelf" ? (
  //                     <View>
  //                       <View style={{ flexDirection: "row", marginTop: 10 }}>
  //                         <View style={{ flex: 1 }}>
  //                           <Text caption1 bold>
  //                             Virtual Account
  //                           </Text>
  //                         </View>
  //                         <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                           <View style={{ flexDirection: "row" }}>
  //                             <Text caption2 bold primaryColor>
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
  //                             <Text caption1 bold>
  //                               Penyedia Jasa
  //                             </Text>
  //                           </View>
  //                           <View style={{ flex: 1, alignItems: "flex-end" }}>
  //                             <View style={{ flexDirection: "row" }}>
  //                               <Text caption2 bold primaryColor>
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
  //         <Text caption2>{status_name}</Text>
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


    // console.log('guest', JSON.stringify(dataDetail.guest));
    var paxs = [];
    var info = <View />;



    //------------opendataPaxss---------//

    if (dataDetail.product == "flight") {
      var paxs = [];
      dataDetail?.guest?.map((item, index) =>
        paxs.push(
          <View>
            <Text caption2 style={{ marginBottom: 5 }}>
              {item.title}. {item.firstName} {item.lastName}
            </Text>
            {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Nationality</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption1 grayColor>
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
      console.log('xxxxx', JSON.stringify(dataDetail.guest));
      dataDetail?.guest?.map((item, index) =>
        paxs.push(
          <View style={{ marginBottom: 10 }}>
            <Text caption1 bold style={{ marginBottom: 5 }}>
              {item.title}. {item.firtName} {item.lastName}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 0 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Nationality</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption1 grayColor>
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
            <Text body2 bold>
              {" "}
              Rp {priceSplitter(dataDetail.price.subtotal)}

            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                if (this.state.minimizePrice == true) {
                  this.setState({ minimizePrice: false });
                } else {
                  this.setState({ minimizePrice: true });
                }
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
                <Text caption2>Subtotal</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Pajak</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Discount</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Point</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Fee</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Total</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
        <Text caption2>
          {dataDetail.contact.title}. {dataDetail.contact.firstName}{" "}
          {dataDetail.contact.lastName}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text caption2>Phone</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text caption2 grayColor>
              ({dataDetail.contact.phoneCode}){" "}
              {dataDetail.contact.phone}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text caption2>Email</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text caption2 grayColor>
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

      //   var data_timelineDeparture = [];
      //   var a = 0;
      //   for (const item of dataBooking.detail[0].order_detail[0].flight_schedule) {
      //     data_timelineDeparture.push(
      //       this.timeline_from(
      //         item,
      //         flightDepartureOrigin,
      //         flightDepartureDestination
      //       )
      //     );
      //     data_timelineDeparture.push(
      //       this.timeline_to(
      //         item,
      //         flightDepartureOrigin,
      //         flightDepartureDestination
      //       )
      //     );
      //   }

      //   dataDeparture = (
      //     <View
      //       style={{
      //         flexDirection: "row",
      //         marginTop: 10,
      //         justifyContent: "space-between",
      //       }}
      //     >
      //       <View style={{ flexDirection: "row", alignItems: "center" }}>
      //         <Image
      //           style={{
      //             width: 32,
      //             height: 32,
      //             marginRight: 10,
      //             borderRadius: 16,
      //           }}
      //           resizeMode="contain"
      //           source={{ uri: flightDepartureSchedule.airline_logo }}
      //         />
      //         <View>
      //           <Text caption1>{flightDepartureSchedule.airline_name}</Text>
      //           <Text caption2>
      //             {flightDepartureSchedule.origin_id} -
      //             {flightDepartureSchedule.destination_id} |
      //             {flightDepartureSchedule.arrival_date} |
      //             {flightDepartureSchedule.arrival_time}
      //           </Text>
      //         </View>
      //       </View>
      //       <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      //         <Text caption2 semibold primaryColor>
      //           Departure
      //         </Text>
      //       </View>
      //     </View>
      //   );

      //   if (dataBooking.product_detail.type != "OW") {
      //     var flightArrival = dataBooking.detail[0].order_detail[1];
      //     var flightArrivalSchedule =
      //       dataBooking.detail[0].order_detail[1].flight_schedule[0];
      //     var flightArrivalOrigin =
      //       dataBooking.detail[0].order_detail[1].origin_airport;
      //     var flightArrivalDestination =
      //       dataBooking.detail[0].order_detail[1].destination_airport;
      //     var data_timelineArrival = [];
      //     var a = 0;
      //     for (const item of dataBooking.detail[0].order_detail[1]
      //       .flight_schedule) {
      //       data_timelineArrival.push(
      //         this.timeline_from(
      //           item,
      //           flightArrivalOrigin,
      //           flightArrivalDestination
      //         )
      //       );
      //       data_timelineArrival.push(
      //         this.timeline_to(
      //           item,
      //           flightArrivalOrigin,
      //           flightArrivalDestination
      //         )
      //       );
      //     }
      //     dataReturn = (
      //       <View
      //         style={{
      //           flexDirection: "row",
      //           marginTop: 10,
      //           justifyContent: "space-between",
      //         }}
      //       >
      //         <View style={{ flexDirection: "row", alignItems: "center" }}>
      //           <Image
      //             style={{
      //               width: 32,
      //               height: 32,
      //               marginRight: 10,
      //               borderRadius: 16,
      //             }}
      //             resizeMode="contain"
      //             source={{ uri: flightArrivalSchedule.airline_logo }}
      //           />
      //           <View>
      //             <Text caption1>{flightArrivalSchedule.airline_name}</Text>
      //             <Text caption2>
      //               {flightArrivalSchedule.origin_id} -
      //               {flightArrivalSchedule.destination_id} |
      //               {flightArrivalSchedule.arrival_date} |
      //               {flightArrivalSchedule.arrival_time}
      //             </Text>
      //           </View>
      //         </View>
      //         <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      //           <Text caption2 semibold primaryColor>
      //             Arrival
      //           </Text>
      //         </View>
      //       </View>
      //     );
      //   }

      //   contentProduct = (
      //     <View
      //       style={{
      //         flex: 1,
      //         backgroundColor: "white",
      //         borderRadius: 10,
      //         marginBottom: 5,
      //         shadowColor: "#000",
      //         shadowOffset: {
      //           width: 0,
      //           height: 2,
      //         },
      //         shadowOpacity: 0.25,
      //         shadowRadius: 3.84,
      //         elevation: 5,
      //         padding: 10,
      //         marginTop: 10,
      //         //marginBottom: 20
      //       }}
      //     >
      //       <FlightPlan
      //         round={dataBooking.product_detail.type == "OW" ? false : true}
      //         fromCode={flightDeparture.origin_id}
      //         toCode={flightDeparture.destination_id}
      //         from={flightDepartureOrigin.name}
      //         to={flightDepartureDestination.name}
      //       />
      //       {/* {flightDeparture.origin_id} -
      //             {flightDeparture.destination_id} | */}

      //       {dataDeparture}
      //       <Timeline
      //         data={data_timelineDeparture}
      //         circleSize={20}
      //         circleColor={BaseColor.primaryColor}
      //         lineColor={BaseColor.primaryColor}
      //         timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
      //         timeStyle={{
      //           textAlign: "center",
      //           backgroundColor: "#ff9797",
      //           color: "white",
      //           padding: 5,
      //           borderRadius: 13,
      //         }}
      //         descriptionStyle={{ color: "gray" }}
      //         options={{
      //           style: { paddingTop: 5 },
      //         }}
      //         //innerCircle={'icon'}
      //         onEventPress={this.onEventPress}
      //         renderDetail={this.renderDetail}
      //       />
      //       {dataReturn}
      //       <Timeline
      //         data={data_timelineArrival}
      //         circleSize={20}
      //         circleColor={BaseColor.primaryColor}
      //         lineColor={BaseColor.primaryColor}
      //         timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
      //         timeStyle={{
      //           textAlign: "center",
      //           backgroundColor: "#ff9797",
      //           color: "white",
      //           padding: 5,
      //           borderRadius: 13,
      //         }}
      //         descriptionStyle={{ color: "gray" }}
      //         options={{
      //           style: { paddingTop: 5 },
      //         }}
      //         //innerCircle={'icon'}
      //         onEventPress={this.onEventPress}
      //         renderDetail={this.renderDetail}
      //       />
      //     </View>
      //   );
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
              top: dataDetail.detail.city,
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
            propImage={{ height: wp("40%"), url: dataDetail.image }}
            propTitle={{ text: dataDetail.name }}
            propInframe={{
              top: dataDetail.detail.city,
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
            propPriceCoret={{
              price: dataDetail.price.subtotal,
              priceDisc: 0,
              discount: "",
              discountView: false,
            }}
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
            style={[{ marginBottom: 10 }]}
            sideway={true}
          />
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
              Detail Kamar
            </Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Room Type</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 >
                  {dataDetail.options[0].name}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Fasilitas Sarapan</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 >
                  {dataDetail.room.breakfastIncluded == false ? "Tidak termasuk sarapan" : "Termasuk Sarapan"}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Tamu</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 >
                  {dataDetail.room.numOfAdults} Tamu
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Kamar</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 >
                  {dataDetail.room.numOfRoom} Kamar
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text caption2>Permintaan Khusus</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 >
                  -
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <View style={{ flex: 2 }}>
                <Text caption2 bold style={{ color: BaseColor.thirdColor }}>Kebijakan Pembatalan</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text caption1>
                  {dataDetail.room.cancellationPolicy}
                </Text>
              </View>
            </View>
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
        </Text>


      </View>
    }

    var contentStatusPesanan = <View />
    contentStatusPesanan = <View
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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text body2 bold style={{ marginBottom: 5 }}>
            Status Pesanan
          </Text>
          <View style={{}}>
            <Text
              whiteColor
              caption2
              style={{
                backgroundColor: this.converColor(dataDetail?.status?.color),
                padding: 5,
                borderRadius: 5,
                alignSelf: 'center',

              }}
            >
              {dataDetail?.status?.name}
            </Text>
            <Text caption2>{dataDetail?.status?.description}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', }}>
          <Text body2 bold style={{ marginBottom: 5, justifyContent: 'flex-end' }}>
            Rincian Pembayaran
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              // borderBottomColor: BaseColor.bgColor,
              // borderBottomWidth: 2,
              paddingBottom: 10,
              justifyContent: 'flex-end'
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
        </View>
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
                <Text caption2>Subtotal</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Pajak</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Discount</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Point</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Fee</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
                <Text caption2>Total</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text caption2 bold>
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
          {contentPaymentSelect}
          {this.contentEvoucher()}
          {contentProduct}
          {contentContact}

          {/* {scedules} */}
          {/* {optionSelect} */}

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

          {/* {contentPayment} */}

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
