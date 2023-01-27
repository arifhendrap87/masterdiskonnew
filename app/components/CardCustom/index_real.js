import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  Clipboard,
} from "react-native";
import { Image, Text, StarRating, Icon, IconIons } from "@components";
import { BaseColor, Images } from "@config";
import PropTypes from "prop-types";
import * as Utils from "@utils";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import FastImage from "react-native-fast-image";
import ImageSize from "react-native-image-size";
import DropdownAlert from "react-native-dropdownalert";
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 30) / 2;

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
    flexDirection: "row",
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


});

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

export default class CardCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: Images.doodle,
    };
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  getMeta(url) {
    var img = new Image();
    img.onload = function () {
      //alert( this.width+' '+ this.height );
      console.log("getMeta", this.width);
    };
    img.src = url;
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  convertReview(value) {
    var status = '';
    // {hotel.reviewScore >= 8.0 ? 'Very Good' : hotel.reviewScore >= 7.0 ? 'Good' : 'Review Score'}
    if (value >= 8) {
      status = 'Very Good';
    } else if (value >= 7) {
      status = 'Very Good';
    }
    return status;
  }

  renderDefault() {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const {
      style,
      propImage,
      propInframe,
      propTitle,
      propReview,
      propDesc,
      propPrice,
      propAmenities,
      propPriceCoret,
      propStar,
      propLeftRight,
      propLeftRight2,
      propLeftRight3,
      propLeftRight4,

      propTopDown,
      propTopDown2,
      propTopDown3,
      propTopDown4,

      propPoint,
      propIsCampaign,
      propIsPromo,
      propDarkMode,
      onPress,
      propOther,
      loading,
      sideway,
      propCopyPaste,
      propType,
      propTypeProduct,
      propDesc1,
      propDesc2,
      propDesc3,
      propDesc4,
      propHightLight,
      propFacilities,
      propIsOverlay
    } = this.props;

    var contentImage = <View></View>;
    var contentStar = <View></View>;
    var contentStarBintanggnya = <View></View>;

    var contentText = <View></View>;

    var contenInframeBottom = <View></View>;
    var contenInframeTop = <View></View>;

    var contentTextTitle = <View></View>;
    var contentTextTitleDesc = <View></View>;
    var contentStartFrom = <View></View>;
    var contentPrice = <View></View>;
    var contentPriceCoret = <View></View>;

    var contentTextTitleLeftRight = <View></View>;
    var contentTextTitleLeftRight2 = <View></View>;

    var contentTextTitleLeftRight3 = <View></View>;
    var contentTextTitleLeftRight4 = <View></View>;

    var contentTextTitleTopDown = <View></View>;
    var contentTextTitleTopDown2 = <View></View>;
    var contentTextTitleTopDown3 = <View></View>;
    var contentTextTitleTopDown4 = <View></View>;

    var contentLeft = <View></View>;
    var contentRight = <View></View>;

    var contentLeft2 = <View></View>;
    var contentRight2 = <View></View>;

    var contentLeft3 = <View></View>;
    var contentRight3 = <View></View>;

    var contentLeft4 = <View></View>;
    var contentRight4 = <View></View>;

    var contentTop = <View></View>;
    var contentDown = <View></View>;

    var contentTop2 = <View></View>;
    var contentDown2 = <View></View>;

    var contentTop3 = <View></View>;
    var contentDown3 = <View></View>;

    var contentTop4 = <View></View>;
    var contentDown4 = <View></View>;

    var contentPoint = <View></View>;
    var contentCampaingn = <View />;

    var colorText = {};
    var colorTextYellow = {};
    var discount = <View />;
    var contentReview = <View />;

    const contentFacilities = () => {
      return (
        <View style={{}}>
          <Text>asd</Text>
        </View>
      );
    };

    if (propDarkMode == true) {
      colorText = { color: BaseColor.whiteColor };
    }

    if (propDarkMode == true) {
      colorTextYellow = { color: BaseColor.secondColor };
    }

    //--------contentCampaign---------//
    if (propIsCampaign.active == "1") {
      contentCampaingn = (
        <View
          style={{
            backgroundColor: BaseColor.primaryColor,
            paddingHorizontal: 5,
            borderRadius: 5,
            marginRight: 10,
            width: "auto",
          }}
        >
          <Text caption2 style={[{ color: BaseColor.whiteColor }]}>
            {propIsCampaign.name_campaign}
          </Text>
        </View>
      );
    }

    if (propPoint != 0) {
      contentPoint = (
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
          <Text overline style={[colorText]}>
            Dapatkan point diskon {propPoint} poin
          </Text>
        </View>
      );
    }

    //---------content untuk inframe---------//
    if (propInframe.top != "" || propInframe.top != false) {
      contenInframeTop = (
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 2,
            width: "100%",
            borderRadius: 5,
            padding: propInframe.topHighlight == true ? 0 : 2,
            margin: propInframe.topHighlight == true ? 0 : 10,
          }}
        >
          {propInframe.topTitle != "" ? (
            <View style={{ flexDirection: 'row' }}>
              <Text body2 bold style={{ color: BaseColor.whiteColor }}>
                {propInframe.topTitle}
              </Text>
              {propInframe.topIcon != "" ? (
                <Icon
                  name={propInframe.topIcon}
                  size={16}
                  style={{ color: BaseColor.whiteColor, marginLeft: 10, marginTop: 2 }}
                />
              ) : (
                <></>
              )}
            </View>
          ) : (
            <View />
          )}
          <View style={{ flex: 1, flexDirection: "row" }}>

            <Text
              caption1
              bold
              style={[
                {
                  color: BaseColor.whiteColor,
                  backgroundColor:
                    propInframe.topHighlight == true
                      ? BaseColor.thirdColor
                      : "transparent",
                  padding: propInframe.topHighlight == true ? 5 : 0,
                  borderBottomRightRadius: 10,
                },
              ]}
            >
              {propInframe.top}
            </Text>

          </View>
        </View>
      );
    }

    if (propInframe.bottom != "") {
      contenInframeBottom = (
        <View
          style={{
            margin: 10,
            position: "absolute",
            bottom: 0,
            padding: 2,
            zIndex: 2,
            width: "auto",
            borderRadius: 5,
          }}
        >
          {propInframe.bottomTitle != "" ? (
            <Text body2 bold style={{ color: BaseColor.whiteColor }}>
              {propInframe.bottomTitle}
            </Text>
          ) : (
            <></>
          )}
          <Text
            caption2
            bold
            style={{ color: BaseColor.whiteColor }}
            numberOfLines={2}
          >
            {propInframe.bottom}
          </Text>
        </View>
      );
    }

    //---------content untuk inframe---------//

    //---------content untuk image-----------//
    if (loading == true) {
      contentImage = (
        <Placeholder Animation={Fade} style={{ marginTop: 5 }}>
          <PlaceholderLine
            width={100}
            height={
              propOther.hasOwnProperty("height") ? propOther.height : height / 7
            }
            style={{ marginTop: 2, marginBottom: 0, borderRadius: 5 }}
          />
        </Placeholder>
      );
    } else {
      if (propOther.inCard == false) {
        var styleCustomImage = {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        };
      } else {
        if (propOther.horizontal == false) {
          var styleCustomImage = {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          };
        } else {
          var styleCustomImage = {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: propOther.inFrame == true ? 10 : 10,
            borderBottomRightRadius: propOther.inFrame == true ? 10 : 10,
          };
        }
      }

      if (sideway == true) {
        styleCustomImage.width = (width - 30) / 3;
      }

      contentImage = (
        <FastImage
          style={[
            styleCustomImage,
            {
              height: Utils.scaleWithPixel(propImage.height),
              backgroundColor: BaseColor.lightPrimaryColor,
            },
          ]}
          source={this.state.img}
          resizeMode={FastImage.resizeMode.cover}
          cacheControl={FastImage.cacheControl.cacheOnly}
          resizeMethod={"scale"}
          onLoad={(evt) => {
            //console.log('evtsss', JSON.stringify(evt));
            this.setState({
              img: {
                uri: propImage.url,
                headers: { Authorization: "someAuthToken" },
                priority: FastImage.priority.normal,
              },
            });
          }}
        >
          {contenInframeTop}

          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "black",
              opacity: propIsOverlay ? 0.4 : 0,
              zIndex: 0,
            }}
          />
          {contenInframeBottom}
        </FastImage>
      );
    }

    //---------content untuk image-----------//

    //---------content untuk text-----------//
    if (loading == true) {
      contentText = (
        <Placeholder Animation={Fade} style={{ marginTop: 5 }}></Placeholder>
      );
    } else {
      if (propTitle.text != "") {
        contentTextTitle = (
          <View style={{ marginVertical: 5 }}>
            <Text
              caption1
              bold
              numberOfLines={2}
              style={[colorText, { color: BaseColor.primaryColor }]}
            >
              {propTitle.text}
            </Text>
          </View>
        );
      }
      if (propDesc.text != "") {
        contentTextTitleDesc = (
          <View style={{ marginTop: 0 }}>
            <Text caption2 grayColor numberOfLines={1}>
              {propDesc.text}
            </Text>
          </View>
        );
      }

      if (propPrice.startFrom == true) {
        if (propPrice.price != 0) {
          contentStartFrom = (
            <Text overline style={[{ marginTop: 2 }, colorText]}>
              Start From
            </Text>
          );
        }
      }

      //if(propPrice.price != ""){
      var styles = {};
      if (propPrice.startFrom == true) {
        if (propPrice.price != 0) {
          styles = { marginLeft: 10, color: BaseColor.primaryColor };
        } else {
          styles = { marginLeft: 0, color: BaseColor.thirdColor };
        }
      } else {
        styles = { marginLeft: 0, color: BaseColor.thirdColor };
      }

      if (propLeftRight.left != "") {
        contentLeft = (
          <View
            style={{
              flex: 4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption2 bold>
              {propLeftRight.left}
            </Text>
          </View>
        );
      }

      if (propLeftRight.right != "") {
        contentRight = (
          <View
            style={{
              flex: 6,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption2 bold>
              {propLeftRight.right}
            </Text>
          </View>
        );
      }

      if (propLeftRight2.left != "") {
        contentLeft2 = (
          <View
            style={{
              flex: 4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption2 bold>
              {propLeftRight2.left}
            </Text>
          </View>
        );
      }

      if (propLeftRight2.right != "") {
        contentRight2 = (
          <View
            style={{
              flex: 6,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption2 bold>
              {propLeftRight2.right}
            </Text>
          </View>
        );
      }

      if (propLeftRight3.left != "") {
        contentLeft3 = (
          <View
            style={{
              flex: 4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propLeftRight3.left}
            </Text>
          </View>
        );
      }

      if (propLeftRight3.right != "") {
        contentRight3 = (
          <View
            style={{
              flex: 6
              ,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propLeftRight3.right}
            </Text>
          </View>
        );
      }

      if (propLeftRight4.left != "") {
        contentLeft4 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propLeftRight4.left}
            </Text>
          </View>
        );
      }

      if (propLeftRight4.right != "") {
        contentRight4 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propLeftRight4.right}
            </Text>
          </View>
        );
      }

      if (propTopDown.top != "") {
        contentTop = (
          <View
            style={{
              flex: 1,
            }}
          >
            <Text caption1 bold>
              {propTopDown.top}
            </Text>
          </View>
        );
      }

      if (propTopDown.down != "") {
        contentDown = (
          <View
            style={{
              flex: 1,
            }}
          >
            <Text caption1>{propTopDown.down}</Text>
          </View>
        );
      }

      if (propTopDown2.top != "") {
        contentTop2 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown2.top}
            </Text>
          </View>
        );
      }

      if (propTopDown2.down != "") {
        contentDown2 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown2.down}
            </Text>
          </View>
        );
      }

      if (propTopDown3.top != "") {
        contentTop3 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown3.top}
            </Text>
          </View>
        );
      }

      if (propTopDown3.down != "") {
        contentDown3 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown3.down}
            </Text>
          </View>
        );
      }

      if (propTopDown4.top != "") {
        contentTop4 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown4.top}
            </Text>
          </View>
        );
      }

      if (propTopDown4.down != "") {
        contentDown4 = (
          <View
            style={{
              flex: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text caption1 bold>
              {propTopDown4.down}
            </Text>
          </View>
        );
      }

      var contentCopyPaste = <View />;
      if (propCopyPaste.enabled == true) {
        contentCopyPaste = (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: BaseColor.thirdColor,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 0,
                  borderRadius: 5,
                }}
                onPress={() => {
                  Clipboard.setString(propCopyPaste.left);
                  //  this.dropdown.alertWithType('success', 'Copy Text Invoice', propCopyPaste.left);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text whiteColor>{propCopyPaste.left}</Text>
                  <Icon
                    name="copy"
                    size={16}
                    style={{ marginLeft: 10, color: BaseColor.whiteColor }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      if (propLeftRight.display == true) {
        contentTextTitleLeftRight = (
          <View style={{ flexDirection: "row", marginVertical: 1 }}>
            {contentLeft}
            {contentRight}
          </View>
        );
      }

      if (propLeftRight2.display == true) {
        contentTextTitleLeftRight2 = (
          <View style={{ flexDirection: "row", marginVertical: 1 }}>
            {contentLeft2}
            {contentRight2}
          </View>
        );
      }

      if (propLeftRight3.display == true) {
        contentTextTitleLeftRight3 = (
          <View style={{ flexDirection: "row", marginVertical: 1 }}>
            {contentLeft3}
            {contentRight3}
          </View>
        );
      }

      if (propLeftRight4.display == true) {
        contentTextTitleLeftRight4 = (
          <View style={{ flexDirection: "row", marginVertical: 1 }}>
            {contentLeft4}
            {contentRight4}
          </View>
        );
      }

      if (propTopDown.display == true) {
        contentTextTitleTopDown = (
          <View style={{ flexDirection: "column", marginVertical: 1 }}>
            {contentTop}
            {contentDown}
          </View>
        );
      }

      if (propTopDown2.display == true) {
        contentTextTitleTopDown2 = (
          <View style={{ flexDirection: "column", marginVertical: 1 }}>
            {contentTop2}
            {contentDown2}
          </View>
        );
      }

      if (propTopDown3.display == true) {
        contentTextTitleTopDown3 = (
          <View style={{ flexDirection: "column", marginVertical: 1 }}>
            {contentTop3}
            {contentDown3}
          </View>
        );
      }

      if (propTopDown4.display == true) {
        contentTextTitleTopDown4 = (
          <View style={{ flexDirection: "column", marginVertical: 1 }}>
            {contentTop4}
            {contentDown4}
          </View>
        );
      }




      if (propStar.enabled == true) {
        contentStar = (
          <View
            style={{
              flexDirection: "row",
              //justifyContent: "space-between"
              marginVertical: 1,
            }}
          >
            {propType != "" ? (
              <View
                style={{
                  backgroundColor: BaseColor.secondColor,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  marginRight: 5,
                }}
              >
                <Text caption2>{propType}</Text>
              </View>
            ) : (
              <View />
            )}

            <StarRating
              disabled={true}
              starSize={14}
              maxStars={propStar.rating}
              rating={propStar.rating}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
        );
      }

      var styleCustomText = {
        flex: 1,
      };
      if (propOther.inFrame == true) {
        if (propOther.horizontal == false) {
          styleCustomText.paddingHorizontal = 10;
          styleCustomText.borderTopWidth = 0;
          //styleCustomText.paddingBottom = 20;
          styleCustomText.backgroundColor = BaseColor.whiteColor;

          styleCustomText.borderBottomRightRadius = 10;
          styleCustomText.borderBottomLeftRadius = 10;
          styleCustomText.borderTopRightRadius = 10;
          styleCustomText.borderTopLeftRadius = 10;
        } else {
          styleCustomText.paddingHorizontal = 10;
          styleCustomText.borderTopWidth = 0;
          //styleCustomText.paddingBottom = 10;
          styleCustomText.backgroundColor = BaseColor.whiteColor;
          styleCustomText.borderBottomRightRadius = 10;
          styleCustomText.borderBottomLeftRadius = 10;
        }
      }

      if (propOther.inCard == false) {
        styleCustomText.paddingHorizontal = 0;
        styleCustomText.borderTopWidth = 0;
        styleCustomText.paddingBottom = 0;
        //styleCustomText.backgroundColor=BaseColor.whiteColor;
      }

      var contentDesc1 = <View />;
      if (propDesc1 != "") {
        contentDesc1 = (
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              justifyContent: "flex-start",

            }}
          >
            <FastImage
              source={Images.location}
              resizeMode={FastImage.resizeMode.cover}
              cacheControl={FastImage.cacheControl.cacheOnly}
              resizeMethod={"scale"}
              style={{ width: 15, height: 15 }}
            ></FastImage>

            <Text caption1 style={{ textAlign: "right" }} numberOfLines={1}>
              {propDesc1}
            </Text>
          </View>
        );
      }
      if (sideway == true) {
        if (propReview != 0 || propReview != "0") {

          contentReview = (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{
                backgroundColor: BaseColor.secondColor,
                borderRadius: 5,
                justifyContent: 'center', //Centered horizontally
                alignItems: 'center', //Centered vertically
                paddingHorizontal: 5,
                paddingVertical: 5,
                marginRight: 3

              }}>
                <Text bold>{propReview}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text caption2 bold style={{ marginBottom: 0 }}>{this.convertReview(parseInt(propReview))}</Text>
                <Text caption2 style={{ marginBottom: 0 }}>Review</Text>
              </View>

            </View >
          );
        }
      }

      var contentDesc2 = <View />;
      if (propDesc2 != "") {
        contentDesc2 = (
          <View style={{ marginTop: 5 }}>
            <Text caption2 numberOfLines={4} style={{}}>
              {/* {propDesc2.replace(regex, '')} */}
              {propDesc2}
            </Text>
          </View>
        );
      }

      var contentDesc3 = <View />;
      if (propDesc3 != "") {
        contentDesc3 = (
          <View style={{ marginTop: 10 }}>
            <Text
              caption1
              bold
              style={{ textAlign: "right" }}
              numberOfLines={2}
            >
              {propDesc3}
            </Text>
          </View>
        );
      }

      var contentDesc4 = <View />;
      if (propDesc4 != "") {
        contentDesc4 = (
          <View style={{ marginTop: 10 }}>
            <Text
              caption1
              bold
              style={{ textAlign: "right" }}
              numberOfLines={2}
            >
              {propDesc4}
            </Text>
          </View>
        );
      }

      var contentPriceCoret = <View />;
      if (propPriceCoret.price != 0) {
        contentPriceCoret = (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 0,
            }}
          >

            {propIsPromo == true ? (
              <Text
                caption1
                bold
                style={[
                  {
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: BaseColor.thirdColor,
                  },
                  colorText,
                ]}
              >
                Rp {priceSplitter(propPriceCoret.price)}
              </Text>
            ) : (
              <View />
            )}

            {propIsPromo == true ? (
              <Text
                body1
                bold
                style={[{ color: BaseColor.primaryColor }, colorText]}
              >
                Rp {priceSplitter(propPriceCoret.priceDisc)}
              </Text>
            ) : (
              <Text
                body1
                bold
                style={[{ color: BaseColor.primaryColor }, colorText]}
              >
                Rp {priceSplitter(propPriceCoret.price)}
              </Text>
            )}

            {propTypeProduct == "hotel" ? (
              <Text caption2 grayColor>
                per room / night
              </Text>
            ) : (
              <View />
            )}
            {propPriceCoret.discountView == true ? discount : <View />}


            {propTypeProduct == "hotel" ? (
              <View>
                <Text caption2 grayColor>
                  Include tax and fees
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        );
      } else {
        contentPriceCoret = (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              //marginVertical: 3,
            }}
          >
            {propTypeProduct == "hotel" ? (
              <Text style caption2 grayColor>
                1 room / night
              </Text>
            ) : (
              <View />
            )}
            {propPriceCoret.discountView == true ? discount : <View />}

            {propTypeProduct == "hotel" ?

              <Text
                body1
                bold
                style={[
                  {
                    //textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    color: BaseColor.thirdColor,
                  },
                  colorText,
                ]}
              >
                Full Booked
              </Text>
              :
              <View />
            }



            {propTypeProduct == "hotel" ? (
              <Text caption2 grayColor>
                Include tax and fees
              </Text>
            ) : (
              <View />
            )}
          </View>
        );

      }

      var contentHightLight = <View />;
      if (propHightLight != "" && sideway == true) {
        contentHightLight = (
          <View
            style={{
              marginTop: 5,
              // backgroundColor: BaseColor.secondColor,
              alignSelf: "flex-start",
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text
              caption2
              numberOfLines={4}
              style={{ textAlign: "right" }}
              bold
            >
              {propHightLight}
            </Text>
          </View>
        );
      }

      var contentDesc3 = <View />;

      contentText = (
        <View style={[styleCustomText, { flex: 1 }]}>
          {contentTextTitle}
          {contentTextTitleDesc}
          {contentStar}
          {contentCopyPaste}
          {contentPoint}
          {contentCampaingn}
          {contentDesc1}
          {contentReview}
          {contentDesc2}
          {contentDesc3}
          {contentDesc4}

          {contentHightLight}
          {contentPriceCoret}
          {contentTextTitleLeftRight}
          {contentTextTitleLeftRight2}
          {contentTextTitleLeftRight3}
          {contentTextTitleLeftRight4}
          {contentTextTitleTopDown}
          {contentTextTitleTopDown2}
          {contentTextTitleTopDown3}
          {contentTextTitleTopDown4}

          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            {propFacilities.length != 0 ? (
              propFacilities.map((item, index) => (
                <IconIons
                  name={item.icon}
                  color={item.value == true ? "green" : "grey"}
                  size={16}
                  style={{ marginRight: 5 }}
                />
              ))
            ) : (
              <View />
            )}
          </View>
        </View>
      );
    }

    //---------content untuk text-----------//
    var marginBottom = 0;
    var styleCustom = {};
    styleCustom.width = propOther.width;
    var card = <View />;

    if (propOther.sideway == true) {
      card = <View />;
    } else {
      card;
    }
    var flex = "column";
    if (sideway == true) {
      flex = "row";
    }
    return (
      <TouchableOpacity
        style={[
          //item
          {
            paddingHorizontal: 5,
            paddingTop: 0,
            paddingBottom: 5,
            marginBottom: 10
          },
          styleCustom,
          style,
        ]}
        onPress={onPress}
      >
        <View style={
          //contain
          {
            flex: 1,
            flexDirection: "row"
          }}>
          <View
            style={
              [
                //content
                {
                  flex: 1,
                  flexDirection: flex,

                  padding: propOther.inFrame == true ? 5 : 0,
                  backgroundColor: "white",
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 10,
                  marginBottom: 10,



                }
                ,
                style,
                styleCustom,
              ]

            }
          >
            {propTypeProduct == "hotel" ?
              <FastImage
                style={{
                  position: "absolute",
                  top: -8,
                  left: -10,
                  zIndex: 10,
                  width: 80,
                  height: 50
                }}
                source={Images.promo}
                resizeMode={FastImage.resizeMode.cover}
                cacheControl={FastImage.cacheControl.cacheOnly}
              ></FastImage>
              :
              <View />
            }
            {contentImage}
            {propOther.inFrame == true ? contentText : <View />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return this.renderDefault();
  }
}

CardCustom.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propImage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propInframe: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propAmenities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propReview: PropTypes.string,
  propDesc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propPrice: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propPriceCoret: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propLeftRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propLeftRight2: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propLeftRight3: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propLeftRight4: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  propTopDown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propTopDown2: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propTopDown3: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propTopDown4: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  propCopyPaste: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propStar: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propOther: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propIsCampaign: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propDarkMode: PropTypes.bool,
  propPoint: PropTypes.string,
  propIsPromo: PropTypes.bool,
  propIsFlashsale: PropTypes.bool,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  grid: PropTypes.bool,
  sideway: PropTypes.bool,
  propType: PropTypes.string,
  propDesc1: PropTypes.string,
  propPriceCoret: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propFacilities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propIsOverlay: PropTypes.bool,
};

CardCustom.defaultProps = {
  style: {},
  propImage: {},
  propInframe: {},
  propTitle: {},
  propReview: "0",
  propDesc: {},
  propPrice: {},
  propAmenities: {},
  propPriceCoret: { price: 0, priceDisc: 0, discount: 0, discountView: true },
  propLeftRight: { left: "", right: "", display: false },
  propLeftRight2: { left: "", right: "", display: false },
  propLeftRight3: { left: "", right: "", display: false },
  propLeftRight4: { left: "", right: "", display: false },

  propTopDown: { top: "", down: "", display: false },
  propTopDown2: { top: "", down: "", display: false },
  propTopDown3: { top: "", down: "", display: false },
  propTopDown4: { top: "", down: "", display: false },

  propCopyPaste: {},
  propStar: {},
  propOther: {},
  onPress: () => { },
  propPoint: "0",
  propIsPromo: false,
  propIsFlashsale: false,
  propDarkMode: false,
  propIsCampaign: {
    name_campaign: "0",
    slug_campaign: "0",
    valid_end: "0",
    active: "0",
    type: "0",
    type_product: "0",
    value: "0",
    price: "235000",
  },
  loading: true,
  grid: false,
  sideway: false,
  propType: "general",
  propTypeProduct: "general",
  propDesc1: "",
  propDesc2: "",
  propDesc3: "",
  propDesc4: "",
  propPriceCoret: { price: 0, priceDisc: 0, discount: 0, discountView: true },
  propFacilities: [],
  propIsOverlay: true
};
