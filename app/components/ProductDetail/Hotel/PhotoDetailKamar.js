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

import FastImage from "react-native-fast-image";
const heightImageBanner = Utils.scaleWithPixel(300, 1);

export default class PhotoDetailKamar extends Component {
  constructor(props) {
    super(props);
    this.state = {

      images: props.images,

    };
  }
  componentDidMount() {
    //console.log('hotel', JSON.stringify(this.state.images));
    this.rebuild(this.state.images);
  }

  rebuild(item) {
    //const { item } = this.state;

    var listdata_new = [];
    var listdata_sort = [];
    var a = 1;
    item.map(function (item, i) {
      var obj = {};
      obj["img"] = item;
      obj["key"] = i;
      listdata_new.push(obj);
      a++;
    });
    console.log('listdata_new', JSON.stringify(listdata_new));
    this.setState({ itemImg: listdata_new });

    var propImg = {
      uri: listdata_new[0]?.img,
      headers: { Authorization: "someAuthToken" },
      priority: FastImage.priority.normal,
    };
    this.setState({ imgMain: propImg });

  }

  render() {
    const { navigation, data } = this.props;
    const { item, itemImg } = this.state;
    return (
      <View style={{ height: heightImageBanner + 5 }}>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            //backgroundColor: BaseColor.primaryColor,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 3 }}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                cacheControl={FastImage.cacheControl.cacheOnly}
                resizeMethod={"scale"}
                style={{ width: "100%", height: heightImageBanner - 60, borderRadius: 10 }}
                source={this.state.imgMain}
              ></FastImage>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: 5,
                paddingBottom: 5,
                marginTop: 86,
              }}
            >
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                }}
                horizontal={true}
                data={this.state.itemImg}
                showsHorizontalScrollIndicator={false}
                //keyExtractor={(index) => item.id}
                keyExtractor={(item, index) => String(index)}
                getItemLayout={(item, index) => ({
                  length: 70,
                  offset: 70 * index,
                  index,
                })}
                removeClippedSubviews={true} // Unmount components when outside of window
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={7} // Reduce the window size
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      var propImg = {
                        uri: item.img,
                        headers: { Authorization: "someAuthToken" },
                        priority: FastImage.priority.normal,
                      };
                      this.setState({ imgMain: propImg });
                    }}
                  >
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      cacheControl={FastImage.cacheControl.cacheOnly}
                      resizeMethod={"scale"}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 5,
                        borderRadius: 5,
                      }}
                      source={{
                        uri: item.img,
                        headers: { Authorization: "someAuthToken" },
                        priority: FastImage.priority.normal,
                      }}
                    ></FastImage>
                  </TouchableOpacity>
                )}
              />
            </View>

          </View>

        </View>

      </View>
    );
  }
}
