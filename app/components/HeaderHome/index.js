import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { Text, Image } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseStyle, BaseColor } from "@config";
import { Images } from "@config";
import * as Utils from "@utils";
import FormSearch from "../../components/FormSearch";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default class HeaderHome extends Component {
  constructor(props) {
    super(props);

  }

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

    const HEADER_HEIGHT = 200;
    return (
      <View style={{ backgroundColor: '#18c5f4', height: Dimensions.get('window').height < 800 ? Dimensions.get('window').height / 7 + 20 : Dimensions.get('window').height / 7 }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ flex: 5 }}>
            <Image
              source={Images.logo_masdis}
              style={{
                height: 255 / 5,
                width: 600 / 5
              }}
            />
          </View>

          <View style={{ flex: 7, alignItems: 'flex-end' }}>
            <Text whiteColor style={{ textAlign: 'left', fontStyle: 'italic' }}>Travel, Live, Discover</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, flex: 1, flexDirection: 'column', marginTop: 0 }}>
          <View style={{ flex: 1, marginBottom: 10 }}>
            <FormSearch
              label={'Mau kemana'}
              title={'City, hotel, place to go'}
              icon={'search-outline'}
              onPress={() => {
                this.props.navigation.navigate("SelectHotelLinxHome");
              }}
            />
          </View>
        </View>

      </View>
    );
  }
}

HeaderHome.propTypes = {
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
  transparent: PropTypes.bool
};

HeaderHome.defaultProps = {
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
  transparent: false
};
