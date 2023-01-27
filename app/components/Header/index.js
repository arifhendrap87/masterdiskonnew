import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import { Text, Image } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseStyle, BaseColor } from "@config";
import { Images } from "@config";
import * as Utils from "@utils";

export default class Header extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(this.props.barStyle, false);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      styleRightSecond,
      title,
      subTitle,
      onPressLeft,
      onPressRight,
      onPressRightSecond,
      transparent
    } = this.props;

    var bgColor = BaseColor.primaryColor;
    if (transparent == true) {
      bgColor = 'transparent';
    }

    var contentTitle = <View></View>
    if (title != '') {
      contentTitle = <Text body2 bold style={{ color: transparent == false ? BaseColor.whiteColor : '#000000', textAlign: 'center' }}>{title}</Text>
    } else {
      contentTitle = <Image
        source={Images.logo_masdis}
        style={{
          // height: 255/7,
          // width: 255/7,

          height: 255 / 7,
          width: 600 / 7
        }}
      />
    }
    return (
      <View style={[{ height: 45, flexDirection: "row", backgroundColor: bgColor }, style]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.contentLeft, styleLeft]}
            onPress={onPressLeft}
          >
            {this.props.renderLeft()}
          </TouchableOpacity>
        </View>
        <View style={[{
          justifyContent: "center",
          alignItems: "center",
          textAlign: 'center',
          //backgroundColor:'red'
        },
          styleCenter]}>

          {contentTitle}
          {/* <Text title2 style={{color:BaseColor.primaryColor}}>{title}</Text> */}
          {subTitle != "" && (
            <Text caption2 light style={{
              color: BaseColor.whiteColor,
              textAlign: "center",
              justifyContent: "center",
              width: '100%'
            }}>
              {subTitle}
            </Text>
          )}
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            style={[styles.contentRightSecond, styleRightSecond]}
            onPress={onPressRightSecond}
          >
            {this.props.renderRightSecond()}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentRight, styleRight]}
            onPress={onPressRight}
          >
            {this.props.renderRight()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  transparent: PropTypes.bool,
  isIconHome: PropTypes.bool
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => { },
  renderRight: () => { },
  renderRightSecond: () => { },
  onPressLeft: () => { },
  onPressRight: () => { },
  onPressRightSecond: () => { },
  title: "Title",
  subTitle: "",
  barStyle: "dark-content",
  transparent: false,
  isIconHome: false
};
