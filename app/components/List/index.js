import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground, TouchableWithoutFeedback } from "react-native";
import { Image, Text, StarRating } from "@components";
import { BaseColor, Images } from "@config";
import PropTypes from "prop-types";
import * as Utils from "@utils";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import FastImage from 'react-native-fast-image';
import ImageSize from 'react-native-image-size';

const styles = StyleSheet.create({
});

export default class CardCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        uri: 'https://masterdiskon.com/assets/front/img/app/doodle.png',
        headers: { Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
      }
    }

  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  getMeta(url) {
    var img = new Image();
    img.onload = function () {
      //alert( this.width+' '+ this.height );
      console.log('getMeta', this.width);
    };
    img.src = url;
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }



  renderDefault() {
    const {

      style,
      propImage,
      propInframe,
      propTitle,
      propDesc,
      propPrice,
      propStar,
      propLeftRight,
      onPress,
      propOther,
      loading,
    } = this.props;



    var contentImage = <View></View>
    var contentStar = <View></View>
    var contentText = <View></View>

    var contenInframeBottom = <View></View>
    var contenInframeTop = <View></View>

    var contentTextTitle = <View></View>
    var contentTextTitleDesc = <View></View>
    var contentTextTitlePrice = <View></View>
    var contentStartFrom = <View></View>
    var contentPrice = <View></View>

    var contentTextTitleLeftRight = <View></View>
    var contentLeft = <View></View>
    var contentRight = <View></View>
    var contentStar = <View></View>

    //---------content untuk inframe---------//
    if (propInframe.top != "") {
      contenInframeTop = <View style={{ margin: 10, position: "absolute", top: 0 }}

      >
        <Text
          body2
          bold
          style={{ color: BaseColor.whiteColor }}
        >
          {propInframe.top}
        </Text>
      </View>
    }


    if (propInframe.bottom != "") {
      contenInframeBottom = <View style={{ margin: 10, position: "absolute", bottom: 0, padding: 2, backgroundColor: 'yellow', width: 'auto', borderRadius: 5 }}>
        <Text
          caption2
          bold
        >
          {(this.capitalize(propInframe.bottom.replace(/_/gi, ' ')))}
        </Text>
      </View>
    }

    //---------content untuk inframe---------//


    //---------content untuk image-----------//
    if (loading == true) {
      contentImage = <Placeholder
        Animation={Fade}
        style={{ marginTop: 5 }}
      >
        <PlaceholderLine width={100} height={Utils.scaleWithPixel(propImage.height)} style={{ marginTop: 2, marginBottom: 0, borderRadius: 5 }} />
      </Placeholder>
    } else {
      var styleCustomImage = {
        borderRadius: 0,
        height: Utils.scaleWithPixel(propImage.height),
        width: "100%",
        backgroundColor: BaseColor.lightPrimaryColor
      }
      if (propOther.inFrame == true) {
        styleCustomImage.borderTopRightRadius = 8;
        styleCustomImage.borderTopLeftRadius = 8;
        styleCustomImage.borderWidth = 1;
        styleCustomImage.borderColor = BaseColor.dividerColor;
      } else {
        styleCustomImage.borderRadius = 8;
      }
      contentImage = <View style={{ flex: 1 }}>
        <FastImage
          style={styleCustomImage}
          source={{
            uri: propImage.url,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          cacheControl={FastImage.cacheControl.immutable}

        >
        </FastImage>

        {contenInframeTop}
        {contenInframeBottom}
      </View>
    }


    //---------content untuk image-----------//



    //---------content untuk text-----------//
    if (loading == true) {
      contentText = <Placeholder
        Animation={Fade}
        style={{ marginTop: 5 }}
      >
        <PlaceholderLine width={50} style={{ marginTop: 2, marginBottom: 0, borderRadius: 0 }} />
        <PlaceholderLine width={100} style={{ marginTop: 2, marginBottom: 0 }} />
        <PlaceholderLine width={50} style={{ marginTop: 2, marginBottom: 0 }} />
      </Placeholder>
    } else {

      if (propTitle.text != "") {
        contentTextTitle = <View style={{ marginTop: 10 }}>
          <Text
            body2
            bold
            numberOfLines={1}
          >
            {propTitle.text}
          </Text>
        </View>
      }


      if (propDesc.text != "") {
        contentTextTitleDesc = <View style={{ marginTop: 0 }}>
          <Text
            caption2 grayColor
            numberOfLines={2}
          >
            {propDesc.text}
          </Text>
        </View>
      }





      if (propPrice.startFrom == true) {


        if (propPrice.price != 'Kamar Penuh') {
          contentStartFrom = <Text
            overline
            style={{ marginTop: 2 }}
          >
            Start From
                            </Text>
        }

      }


      if (propPrice.price != "") {
        var styles = {}
        if (propPrice.startFrom == true) {

          if (propPrice.price != 'Kamar Penuh') {
            styles = { marginLeft: 10, color: BaseColor.thirdColor }
          } else {
            styles = { marginLeft: 0, color: BaseColor.thirdColor }
          }

        } else {
          styles = { marginLeft: 0, color: BaseColor.thirdColor }
        }
        if (propPrice.price == 'Kamar Penuh') {
          contentPrice = <Text
            footnote
            bold
            style={styles}
          >
            Kamar Penuh
                            </Text>
        } else {
          contentPrice = <Text
            footnote
            bold
            style={styles}
          >
            Rp {propPrice.price}
          </Text>

        }


        // if(propOther.horizontal==false){
        //   contentPrice=<Text
        //   footnote
        //                     bold
        //                     style={styles}
        //                 >
        //                     Rp {propPrice.price}
        //                 </Text>
        // }else{
        //   contentPrice=<Text
        //   footnote
        //                     bold
        //                     style={styles}
        //                 >
        //                     Rp {propPrice.price}
        //                 </Text>

        // }

      }


      contentTextTitlePrice = <View style={{ flex: 1, flexDirection: "row" }}>{contentStartFrom}{contentPrice}</View>

      if (propLeftRight.left != "") {
        contentLeft = <View style={{
          flex: 5,
          alignItems: "flex-start",
          justifyContent: "center",
        }}

        >
          <Text
            body2
            bold
          >
            {propLeftRight.left}
          </Text>
        </View>
      }


      if (propLeftRight.right != "") {
        contentRight = <View style={{
          flex: 5,
          alignItems: "flex-end",
          justifyContent: "center",
        }}

        >
          <Text
            body2
            bold
          >
            {propLeftRight.right}
          </Text>
        </View>
      }


      contentTextTitleLeftRight = <View style={{ flex: 1, flexDirection: "row" }}>{contentLeft}{contentRight}</View>

      if (propStar.enabled == true) {
        contentStar = <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <StarRating
            disabled={true}
            starSize={12}
            maxStars={5}
            rating={propStar.rating}
            //selectedStar={rating => {}}
            fullStarColor={BaseColor.yellowColor}
          />
        </View>
      }

      var styleCustomText = { flex: 1, marginTop: -5 }
      if (propOther.inFrame == true) {
        styleCustomText.paddingHorizontal = 10;
        styleCustomText.borderBottomRightRadius = 8;
        styleCustomText.borderBottomLeftRadius = 8;
        styleCustomText.borderWidth = 1;
        styleCustomText.borderTopWidth = 0;
        styleCustomText.borderColor = BaseColor.dividerColor;
        styleCustomText.borderStyle = "solid";
        styleCustomText.paddingBottom = 20;
        styleCustomText.backgroundColor = BaseColor.whiteColor;
        //styleCustomText.elevation=5;
        styleCustomText.shadowColor = "#000";
        styleCustomText.shadowOpacity = 0.25;
        styleCustomText.shadowRadius = 3.84;


      }
      contentText = <View style={styleCustomText}>
        {contentTextTitle}
        {contentTextTitleDesc}
        {contentTextTitlePrice}
        {contentStar}
        {contentTextTitleLeftRight}
      </View>

    }

    //---------content untuk text-----------//
    var marginBottom = 0;
    var styleCustom = {};
    if (propOther.horizontal == false) {
      //styleCustom.marginBottom=10;
      styleCustom.width = propOther.width;
    } else {
      styleCustom.marginLeft = 20;
      styleCustom.borderRadius = 5;
      styleCustom.width = propOther.width;
      styleCustom.marginLeft = 20;
    }
    return (
      <TouchableOpacity activeOpacity={0.7} style={[styleCustom, style]} onPress={onPress}>
        {contentImage}
        {contentText}
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
  propDesc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propPrice: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propLeftRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propStar: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  propOther: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  grid: PropTypes.bool,
};

CardCustom.defaultProps = {
  style: {},
  propImage: {},
  propInframe: {},
  propTitle: {},
  propDesc: {},
  propPrice: {},
  propLeftRight: {},
  propStar: {},
  propOther: {},
  onPress: () => { },
  loading: true,
  grid: false,
};
