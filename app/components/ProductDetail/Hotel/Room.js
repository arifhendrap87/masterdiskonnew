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
  Icon, IconIons,
  Text,
  Button,
  StarRating,
  Tag,
} from "@components";
import PhotoDetailKamar from "./PhotoDetailKamar";

import * as Utils from "@utils";

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

// Load sample data
import HTML from "react-native-render-html";
import { DataConfig } from "@data";

import AnimatedLoader from "react-native-animated-loader";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
const heightImageBanner = Utils.scaleWithPixel(300, 1);

export default class Room extends Component {
  constructor(props) {

    super(props);
    this.state = {
      img_featured: Images.doodle,
      expanded: true,
      item: props.data,
      param: props.param,
      modalImages: false
    };
  }
  componentDidMount() {
    //this.rebuild(this.state.item);
  }



  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { navigation, data } = this.props;
    const { item, param } = this.state;
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



      console.log('item.options',JSON.stringify(item.options));
      console.log('param',JSON.stringify(param));

    return (
      <View
        style={{
          backgroundColor: BaseColor.whiteColor,
          marginTop: 10,
          flex: 1,
          marginBottom: item.options.length != 0 ? 0 : 0
        }}
      >
        <View style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}>
          <TouchableOpacity
          // onPress={() => {
          //     this.toggleExpand()
          // }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text body2 bold>
                Kamar
              </Text>
              {/* <Icon
                                name={this.state.expanded ? 'chevron-up' : 'chevron-down'}
                                color={BaseColor.dividedColor}
                                size={14}
                            /> */}
            </View>
          </TouchableOpacity>
        </View>

        {this.state.expanded && (
          <View
            style={{
              borderBottomColor: BaseColor.dividerColor,
              borderBottomWidth: 0.5,
            }}
          />
        )}

        {this.state.expanded && item.detail != undefined ? (
          item.options.length != 0 ? (

            <View
              style={{
                marginHorizontal: 20,
                paddingVertical: 20,
                marginBottom: item.options.length != 0 ? 0 : 150,
                flex: 1,
              }}
            >

              <FlatList
                data={item.options}
                //keyExtractor={(item, index) => item.id}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.itemPrice,
                      {
                        backgroundColor:
                          BaseColor.secondColor == BaseColor.whiteColor
                            ? item.checked
                            : null,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-start",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          body2
                          bold
                          style={{ color: BaseColor.primaryColor }}
                        >
                          {item.name}
                        </Text>
                        <View
                          style={{ marginBottom: 10, flexDirection: "column" }}
                        >

                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <View
                              style={{
                                flex: 3,
                                alignItems: "flex-start",
                                marginTop: 5,

                              }}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "row", marginRight: 10, marginBottom: 10 }}>
                                  <Icon
                                    name={"people"}
                                    color={BaseColor.dividedColor}
                                    size={14}
                                    style={{ marginRight: 5 }}
                                  />
                                  <Text caption1 bold>
                                    {item.guest} Tamu
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                  <Icon
                                    name={"bed-outline"}
                                    color={BaseColor.dividedColor}
                                    size={14}
                                    style={{ marginRight: 5 }}
                                  />
                                  <Text caption1 bold>
                                    {item.roomType}
                                  </Text>
                                </View>
                              </View>


                              <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ modalImages: true });

                                  }}
                                  style={{
                                    // alignItems: "center",
                                    // marginTop: 20,
                                    width: '100%'
                                  }}
                                >
                                  <FastImage
                                    style={{
                                      width: '100%',
                                      height: 120,
                                      borderRadius: 10
                                    }}
                                    source={{ uri: item?.detail[0]?.images[0] }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    cacheControl={FastImage.cacheControl.cacheOnly}
                                  >
                                    <View
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                        //backgroundColor: "black",
                                        opacity: 0,
                                        zIndex: 0,
                                      }}
                                    />
                                  </FastImage>
                                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                      name={"add-circle-outline"}
                                      color={BaseColor.whiteColor}
                                      size={20}
                                      style={{ marginRight: 5 }}
                                    />
                                  </View>
                                </TouchableOpacity>
                                <Modal
                                  isVisible={this.state.modalImages}
                                  onBackdropPress={() => {
                                    this.setState({ modalImages: false });

                                  }}
                                  onSwipeComplete={() => {
                                    this.setState({ modalImages: false });
                                  }}
                                  swipeDirection={["down"]}
                                  style={styles.bottomModal}
                                >
                                  <View style={[styles.contentFilterBottom, { paddingBottom: 50 }]}>
                                    <View style={styles.contentSwipeDown}>
                                      <View style={styles.lineSwipeDown} />
                                    </View>

                                    <View style={{ flexDirection: "row", paddingTop: 5 }}>
                                      <View style={{ flex: 5, justifyContent: "center" }}>
                                        <PhotoDetailKamar images={item?.detail[0]?.images} />
                                      </View>
                                    </View>
                                  </View>
                                </Modal>

                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  console.log('itemcancel', JSON.stringify(item));
                                  this.props.cancellation(item);
                                }}
                                style={{ alignItems: "center", marginTop: 10 }}
                              >
                                <Text
                                  caption1
                                  style={{ color: BaseColor.thirdColor }}
                                >
                                  Kebijakan Pembatalan
                                </Text>

                              </TouchableOpacity>
                            </View>
                            {item.isFull == true ? (
                              <View
                                style={{
                                  flex: 2,
                                  alignItems: "flex-end",
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  body2
                                  bold
                                  style={{ color: BaseColor.thirdColor }}
                                >
                                  Kamar penuh
                                </Text>
                              </View>
                            ) : (
                              <View
                                style={{
                                  flex: 2,
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  marginTop: 30,
                                }}
                              >
                                <View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <Icon
                                        name={"wifi"}
                                        color={item.wifiIncluded == false ? 'black' : 'green'}
                                        size={12}
                                        style={{ marginRight: 5 }}
                                      />
                                      <Text caption2 style={{ color: item.wifiIncluded == false ? 'black' : 'green' }}>
                                        {item.wifiIncluded == false ? 'Tanpa Wifi' : 'Wifi'}
                                      </Text>
                                    </View>


                                    {item.detail[0].facilities?.toLowerCase().includes('bathtub') ?
                                      <View style={{ flexDirection: "row", marginLeft: 5 }}>
                                        <Text caption1 style={{ color: 'green' }}>
                                          Bathtub
                                        </Text>
                                      </View>
                                      :
                                      <View />
                                    }

                                    {item.detail[0].facilities?.toLowerCase().includes('televisi') ?
                                      <View style={{ flexDirection: "row", marginLeft: 5 }}>
                                        <IconIons
                                          name={"tv"}
                                          color={'green'}
                                          size={12}
                                          style={{ marginRight: 5 }}
                                        />
                                        <Text caption2 style={{ color: 'green' }}>
                                          TV
                                        </Text>
                                      </View>
                                      :
                                      <View />
                                    }



                                  </View>

                                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <IconIons
                                        name={"utensils"}
                                        color={item.breakfastIncluded == false ? 'black' : 'green'}
                                        size={12}
                                        style={{ marginRight: 5 }}
                                      />
                                      <Text caption2 style={{ color: item.breakfastIncluded == false ? 'black' : 'green' }}>
                                        {item.breakfastIncluded == false ? 'Tanpa Sarapan' : 'Termasuk Sarapan'}
                                      </Text>
                                    </View>


                                  </View>

                                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                    <View style={{ flexDirection: "row" }}>
                                      <Text caption2 style={{ color: item.smokingPreference == 'NON_SMOKING' ? 'black' : 'green' }}>
                                        {item.smokingPreference == 'NON_SMOKING' ? 'Non Smoking' : ''}
                                      </Text>
                                    </View>

                                  </View>
                                </View>


                                <View style={{ marginTop: 10 }}>
                                  {item.isPromo == true ? (
                                    <Text
                                      caption1
                                      bold
                                      style={{
                                        textDecorationLine: "line-through",
                                        color: BaseColor.thirdColor,
                                        alignSelf: "flex-end",
                                      }}
                                    >
                                      Rp {priceSplitter(parseInt(item.price))}
                                    </Text>
                                  ) : (
                                    <View />
                                  )}

                                  {item.isPromo == true ? (
                                    <Text
                                      body2
                                      bold
                                      style={{
                                        alignSelf: "flex-end",
                                        color: BaseColor.primaryColor,
                                      }}
                                    >
                                      Rp{" "}
                                      {priceSplitter(parseInt(item.promoPrice))}
                                    </Text>
                                  ) : (
                                    <Text
                                      body2
                                      bold
                                      style={{
                                        alignSelf: "flex-end",
                                        color: BaseColor.primaryColor,
                                      }}
                                    >
                                      Rp {priceSplitter(parseInt(item.price))}
                                    </Text>
                                  )}
                                  <Text caption2 style={{}}>
                                    {param.room} kamar {Math.round(param.noofnights)} malam
                                    {/* /malam/kamar */}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>

                                  <Button
                                    style={{
                                      height: 40,
                                      width: "80%",
                                      borderRadius: 10,
                                    }}
                                    onPress={() => {
                                      this.props.getAvailHotel(item);
                                    }}
                                  >
                                    <Text bold>Pesan</Text>
                                  </Button>
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <View
              style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}
            >
              <Text bold body1 style={{ color: BaseColor.thirdColor }}>Kamar tidak tersedia</Text>
            </View>
          )
        ) : (
          <View />
        )}
      </View>
    );
  }
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
    borderTopColor: BaseColor.textSecondaryColor,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingTop: 10,

    //paddingHorizontal: 20,
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
    flexDirection: "column",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: BaseColor.whiteColor,
    //height:200
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
    //flexDirection:'column',
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
