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
import CardCustom from "app/components/CardCustom";
import * as Utils from "@utils";

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

// Load sample data
import HTML from "react-native-render-html";
import { DataConfig } from "@data";

import AnimatedLoader from "react-native-animated-loader";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
const heightImageBanner = Utils.scaleWithPixel(300, 1);
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default class Rekomendasi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img_featured: Images.doodle,
      expanded: true,
      item: props.data,
      param: props.param,
      modalImages: false,
      paramOriginal: props.paramOriginal
    };
  }
  componentDidMount() {
    //console.log('item', JSON.stringify(this.state.item));
    this.rebuild(this.state.item.recommendasiHotel);
  }



  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  rebuild(listdata) {




    var listdata_new = [];
    var a = 1;
    listdata.map(item => {
      var obj = {};

      obj['name'] = item.name;
      obj['propertyImages'] = this.rebuildImages(item.propertyImages);

      listdata_new.push(obj);
      a++;
    });
    //console.log('listdata_new', JSON.stringify(listdata_new[0]))

    return listdata_new;
  }

  rebuildImages(data) {
    //var finalData = json.replace(/\\/g, "");
    //var images = JSON.parse(json);

    //console.log('finalData', JSON.parse(json)[0].entries[0].url);

    //return images[0].entries[0].url;
    //var listdata = JSON.parse(json);

    // var listdata_new = [];
    // var a = 1;
    // listdata.map(item => {
    //   var obj = {};

    //   obj['url'] = item.url;

    //   listdata_new.push(obj);
    //   a++;
    // });
    //console.log('listdata_new', JSON.stringify(listdata_new[0]))

    return JSON.parse(data);
  }
  render() {
    const { navigation, data } = this.props;
    const { item, param, paramOriginal } = this.state;
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
      <View
        style={{
          backgroundColor: BaseColor.whiteColor,
          marginTop: 10,
          flex: 1,
          marginBottom: item.options.length != 0 ? 300 : 200
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
                Hotel Rekomendasi
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
          item?.recommendasiHotel ? (
            <View
            // style={{
            //   marginHorizontal: 15,
            //   paddingVertical: 20,
            //   marginBottom: 150,
            //   flex: 1,
            // }}
            >
              <FlatList
                data={item.recommendasiHotel}
                contentContainerStyle={{
                  paddingRight: 20,
                }}
                style={{ marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                //keyExtractor={(item, index) => String(item.id)}
                getItemLayout={(item, index) => (
                  { length: 70, offset: 70 * index, index }
                )}
                horizontal={true}
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
                      height: wp("30%"),
                      url:
                        item?.propertyImages
                          ? JSON.parse(item.propertyImages)?.[0]?.entries[0]?.url
                          : "https://masterdiskon.com/assets/images/image-not-found.png",
                    }}
                    //propTitle={{ text: item.name }}
                    propTitle={{ text: item.name }}

                    propPrice={""}
                    propInframe={{
                      top: '',
                      topTitle: "",
                      topHighlight: item.isPromo,
                      topIcon: "",
                      bottom: "",
                      bottomTitle: "",
                    }}
                    propReview={item.reviewScore}
                    propIsPromo={item.isPromo}
                    propDesc={{ text: "" }}
                    propType={item.propertyType}
                    propTypeProduct={'hotel'}
                    propStar={{ rating: item.starRating, enabled: true }}
                    onPress={() => {
                      this.rebuildImages(item?.propertyImages);
                      param.hotelid = item.hotelId;
                      param.product_type = "hotel";
                      var paramAll = {
                        param: param,
                        paramOriginal: param,
                        paramProduct: item,
                        product_type: "hotel",
                      }


                      navigation.navigate("Loading",
                        {
                          redirect: 'ProductDetailNew',
                          param: paramAll,
                        }
                      )

                    }}
                    loading={false}
                    propOther={{ inFrame: true, horizontal: true, width: wp("45%") }}
                    propIsCampaign={false}
                    propPoint={0}
                    propDesc1={''}
                    propDesc2={''}
                    propDesc3={''}
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
                    style={[{ marginBottom: 10 }]}
                    sideway={false}
                    style={[
                      index == 0
                        ? { marginLeft: 5, marginRight: 0 }
                        : { marginRight: 0 }
                    ]}
                  />
                )}
              />
            </View>
          ) : (
            <View
              style={{ marginHorizontal: 20, paddingVertical: 20, flex: 1 }}
            >
              <Text>Belum ada Rekomendasi</Text>
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
