import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Text } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  contain: {
    flexDirection: "row",
  },
  contentLeft: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  contentCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contentRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },

});
import LinearGradient from 'react-native-linear-gradient';


export default class CardCustomTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }


  render() {

    const {
      title,
      desc,
      onPress,
      more,
      darkMode
    } = this.props;
    var contentDesc = <View></View>
    if (desc != "") {
      contentDesc = <Text caption2 grayColor>
        {desc}
      </Text>
    }


    var contentMore = <View></View>

    if (more == true) {
      contentMore = <View style={[styles.contentRight]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <View style={{
            bottom: 0,
            paddingVertical: 2,
            paddingHorizontal: 5,
            width: 'auto',
            borderRadius: 5,
            borderWidth: 0,
            //borderColor: BaseColor.secondaryColor,
            backgroundColor: BaseColor.secondColor,
          }}>
            <Text caption2>
              See More
            </Text>

          </View>
        </TouchableOpacity>
      </View>

    }

    var colorText = {}

    if (darkMode == true) {
      colorText = { color: BaseColor.whiteColor }
    }



    return (
      <View>
        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
          <View style={[styles.contain]} >
            <View style={[styles.contentLeft]}>
              <LinearGradient
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 5,
                  paddingRight: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  //padding: 10
                }}


                colors={['#rgb(253, 185, 51)', '#rgb(255, 211, 99)', '#rgb(255, 211, 99)', '#rgb(255, 211, 99)', '#rgb(255, 211, 99)', '#rgb(253, 185, 51)']}

                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
              >
                <Text
                  //body2 
                  style={{
                    //fontFamily: 'Blogger Sans-Bold',

                    color: '#rgb(65, 64, 66)'
                  }}
                >
                  {title}
                </Text>
              </LinearGradient>
            </View>
            {contentMore}
          </View>


          {contentDesc}
        </View>
      </View>
    )
  }
}

CardCustomTitle.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  onPress: PropTypes.func,
  more: PropTypes.bool,
  darkMode: PropTypes.bool

};

CardCustomTitle.defaultProps = {
  title: "",
  desc: "",
  onPress: () => { },
  more: false,
  darkMode: false

};
