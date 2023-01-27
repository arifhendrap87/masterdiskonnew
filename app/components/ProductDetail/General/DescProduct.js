import React, { Component } from "react";
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
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  StarRating,
  Tag,
} from "@components";
import * as Utils from "@utils";
import Share from "react-native-share";
import ImgToBase64 from "react-native-image-base64";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

// Load sample data
import HTML from "react-native-render-html";
import { DataConfig } from "@data";

import AnimatedLoader from "react-native-animated-loader";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";

export default class DescProduct extends Component {
  constructor(props) {
    super(props);

    var data = props.data;
    console.log("datass", JSON.stringify(data));
    this.state = {
      img_featured: Images.doodle,
      //product:props.data,
      loading: true,
      item: data,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { loading, item } = this.state;
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    console.log("product_detail_type", typeof item.product_detail);

    var statusProductDetail = typeof item.product_detail;
    console.log("statusProductDetail", statusProductDetail);
    return loading == true ? (
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    ) : item.product_detail == false ||
      item.product_detail === null ||
      item.product_detail === undefined ? (
      <View />
    ) : (
      <View style={{ backgroundColor: BaseColor.whiteColor }}>
        <View style={{ marginHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text body2 bold style={{ color: BaseColor.primaryColor }}>
              {item.product_name}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              body2
              style={{ marginRight: 10, textDecorationLine: "line-through" }}
            >
              Rp{" "}
              {item.product_detail.length != 0
                ? priceSplitter(item.product_detail[0].normal_price)
                : 0}
            </Text>
            <Text
              body2
              bold
              style={{ color: BaseColor.primaryColor }}
              style={{ marginRight: 10 }}
            >
              Rp{" "}
              {item.product_detail.length != 0
                ? priceSplitter(item.product_detail[0].price)
                : 0}
            </Text>
            <View
              style={{
                backgroundColor: BaseColor.thirdColor,
                paddingHorizontal: 3,
                paddingVertical: 3,
                borderRadius: 5
              }}
            >
              <Text caption1 whiteColor>
                {item.product_detail.length != 0
                  ? item.product_detail[0].discount
                  : 0}{" "}
                %
              </Text>
            </View>
          </View>
          <Text caption1>{item.address}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignContent: "stretch",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "flex-start",
              borderTopWidth: 0.3,
              borderTopColor: BaseColor.dividerColor,

              borderRightWidth: 0.3,
              borderRightColor: BaseColor.dividerColor,

              paddingHorizontal: 20,
            }}
            onStartShouldSetResponder={() => true}
            onResponderGrant={() => {
              this.props.handleShare();
            }}
          >
            <Icon
              name="pricetag-outline"
              color={BaseColor.lightPrimaryColor}
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text caption1>Share Product</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "flex-start",
              borderTopWidth: 0.3,
              borderTopColor: BaseColor.dividerColor,

              paddingHorizontal: 20,
            }}
            onStartShouldSetResponder={() => true}
            onResponderGrant={() => {
              this.props.sendWhatsApp();
            }}
          >
            <Icon
              name="help-circle-outline"
              color={BaseColor.lightPrimaryColor}
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text caption1>Tanyakan Produk</Text>
          </View>
        </View>
      </View>
    );
  }
}
