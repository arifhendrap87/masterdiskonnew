import React, { useEffect, useState } from 'react';
import { Animated, View, Dimensions, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, Image } from "@components";
import { BaseStyle, BaseColor } from "@config";
import { Images } from "@config";
import * as Utils from "@utils";
import FormSearch from "../../components/FormSearch";
const HEADER_HEIGHT = 95;

const HeaderHome = ({ navigation, animatedValue }) => {
  const insets = useSafeAreaInsets();



  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp'
  });


  const topPositionForm = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 36],
    extrapolate: 'clamp'
  });



  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: '#18c5f4'
      }}
    >



      <View style={{ backgroundColor: '#18c5f4', height: Dimensions.get('window').height < 800 ? Dimensions.get('window').height / 10 : Dimensions.get('window').height / 10 }}>

        <View style={{ flexDirection: 'row', marginHorizontal: 20, paddingVertical: 15 }}>
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

        <Animated.View
          style={{
            position: 'absolute',
            marginTop: topPositionForm,
            top: -70,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: headerHeight,
            //backgroundColor: 'lightblue'
          }}
        >
          <View style={{ paddingHorizontal: 20, flex: 1, flexDirection: 'column', marginTop: 0 }}>
            <View style={{ flex: 1, marginBottom: 10 }}>
              <FormSearch
                label={'Mau kemana'}
                title={'City, hotel, place to go'}
                icon={'search-outline'}
                onPress={() => {
                  navigation.navigate("SelectHotelLinxHome");
                }}
                style={{ height: 60, borderRadius: 10 }}
              />
            </View>


          </View>
        </Animated.View>

      </View>
    </Animated.View>


  );
};


export default HeaderHome;
