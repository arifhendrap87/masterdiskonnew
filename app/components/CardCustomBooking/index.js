import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon } from "@components";
import { BaseColor, Images } from "@config";
import PropTypes from "prop-types";
import moment from "moment";
import CountDown from "react-native-countdown-component";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 5,
    marginBottom: 10
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  contain: {
    flexDirection: "column",
    borderColor: BaseColor.textSecondaryColor,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 20,
  },
  leftSub: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    //marginLeft:30
  },
  rightSub: {
    flex: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  left: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    flex: 9,
  },
});

export default class CardCustomBooking extends Component {
  duration(expirydate) {
    var date = moment();
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    return d;
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
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
  convertDateText(date) {
    var d = new Date(date.split(" ")[0]);
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

  render() {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const { style, item, loading } = this.props;

    var countDown = <View></View>;
    var order_payment = item.order_payment;
    var total_price = <View></View>;
    var desc = <View></View>;

    var icon_name_type = "";
    if (item.product == "Flight") {
      icon_name_type = "airplane-outline";
    } else if (item.product == "Trip") {
      icon_name_type = "suitcase";
    } else if (item.product == "Hotel") {
      icon_name_type = "md-bed-outline";
    } else if (item.product == "Hotelpackage") {
      icon_name_type = "bed";
    } else if (item.product == "Voucher") {
      icon_name_type = "gift";
    } else if (item.product == "Activities") {
      icon_name_type = "map-signs";
    } else {
      icon_name_type = "bed";
    }

    var icon_type = <View></View>;
    icon_type = (
      <Icon
        name={icon_name_type}
        color={BaseColor.primaryColor}
        size={18}
        solid
        style={{
          marginLeft: -10,
          marginTop: 60,
          position: "absolute",
          width: 40,
          height: 40,
          backgroundColor: "#fff",
          borderRadius: 18,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 10,
        }}
      />
    );

    var title_product = <View></View>;
    title_product = (
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 5 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 5,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Icon
            name={icon_name_type}
            size={14}
            color={BaseColor.primaryColor}
            style={{ textAlign: "left", marginRight: 10 }}
          />
          <Text body2 bold>
            {item.product}
          </Text>
        </View>
      </View>
    );

    var content = "";

    if (loading == true) {
      content = (
        <View style={styles.contain}>
          <View style={styles.content}>
            <View style={styles.left}>
              <PlaceholderLine width={50} />
              <PlaceholderLine width={100} />
            </View>
            <View style={styles.right}>
              <PlaceholderLine width={40} />
              <PlaceholderLine width={50} />
            </View>
          </View>
        </View>
      );
    } else {
      content = (
        <View style={styles.contain}>
          <View
            style={styles.content}
          >
            <View>
              <Text body2 bold style={{ color: BaseColor.primaryColor }}>
                {item.name}
              </Text>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: "row" }}
          >
            {title_product}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",

            }}
          >
            <View>
              <View>
                <Text caption1 style={{ color: BaseColor.blackColor }}>
                  Code Booking : {item.code}
                </Text>
              </View>
              <View>
                <Text caption1 style={{ color: BaseColor.blackColor }}>
                  {item.detail}
                </Text>
              </View>
              <View>
                <Text caption1 style={{ color: BaseColor.blackColor }}>
                  {item.guest}
                </Text>
              </View>
            </View>
            <View style={{
              backgroundColor: this.converColor(item.status.color),
              padding: 5,
              borderRadius: 5,
              height: 25,
              justifyContent: 'center'
            }}>
              <Text
                whiteColor
                caption2
              >
                {item.status.name}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",

              }}
            >
              <View>
                <Text body2 bold>
                  Rp {priceSplitter(item.price)}
                </Text>
              </View>
              <View>
                <Text caption1 style={{ color: BaseColor.primaryColor }}>
                  Lihat Detail >
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", flex: 1, paddingHorizontal: 20 }}
          >
            {countDown}
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.item, style]}
        onPress={() => {
          var param = {
            id_order: item.id,
            dataPayment: {},
            back: "",
          };

          var urlRedirect = "Pembayaran";



          console.log(urlRedirect, JSON.stringify({ param: param }));
          this.props.navigation.navigate(urlRedirect, { param: param });

          // var paramx = {
          //   id_order: item.id,
          //   dataPayment: {},
          // };
          // this.props.navigation.navigate("Loading", {
          //   redirect: "Pembayaran",
          //   param: paramx,
          // });
        }}
        activeOpacity={0.9}
      >
        {content}
      </TouchableOpacity>
    );
  }
}

CardCustomBooking.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  comment: PropTypes.string,
  onPress: PropTypes.func,
  status: PropTypes.func,
  loading: PropTypes.bool,
};

CardCustomBooking.defaultProps = {
  item: {},
  style: {},
  image: Images.profile2,
  name: "",
  rate: 0,
  date: "",
  title: "",
  comment: "",
  onPress: () => { },
  status: "",
  loading: true,
};
