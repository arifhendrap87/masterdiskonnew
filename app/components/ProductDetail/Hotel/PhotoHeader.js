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
import Swiper from "react-native-swiper";
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { width } = Dimensions.get('window');
import FastImage from "react-native-fast-image";
const heightImageBanner = Utils.scaleWithPixel(300, 1);

export default class PhotoHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img_featured: Images.doodle,
      item: props.data,
      itemImg: [],
      imgMain: {
        uri: "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10024860-1200x716-FIT_AND_TRIM-e4c4fc26b3e76a132ec7eee0f79de809.jpeg?tr=q-40,w-740,h-465&_src=imagekit",
        headers: { Authorization: "someAuthToken" },
        priority: FastImage.priority.normal,
      },
      currentIndex: 0
    };
  }
  componentDidMount() {
    this.rebuild(this.state.item);
  }

  rebuild(item) {
    if (item.detail != undefined) {
      var listdata_new = [];
      var listdata_sort = [];
      var a = 1;
      item.detail.images.map(function (item, i) {
        var obj = {};
        obj["img"] = item;
        obj["key"] = i;
        obj["id"] = i;
        obj["image"] = item;
        listdata_new.push(obj);
        a++;
      });
      this.setState({ itemImg: listdata_new });

      var propImg = {
        uri: listdata_new[0].img,
        headers: { Authorization: "someAuthToken" },
        priority: FastImage.priority.normal,
      };
      this.setState({ imgMain: propImg });
      //console.log('itemImg', JSON.stringify(listdata_new))
    }
  }
  getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )

  scrollToIndex = (i) => {
    this.flatListRef.scrollToIndex({ animated: true, index: i });
    // let randomIndex = Math.floor(Math.random(Date.now()) * this.state.itemImg.length);
    // this.flatListRef.scrollToIndex({ animated: true, index: randomIndex });
    // console.log('index', randomIndex);
    // this.setState({ currentIndex: randomIndex });
  }

  scrollToItem = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * this.state.itemImg.length);
    this.flatListRef.scrollToIndex({ animated: true, index: "" + randomIndex });
    console.log('index', randomIndex);
    this.setState({ currentIndex: randomIndex });
  }



  render() {
    const { navigation, data } = this.props;
    const { item, itemImg } = this.state;
    return (
      <View style={{ height: heightImageBanner + 5 }}>
        {item.detail != undefined ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: BaseColor.primaryColor,
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
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.currentIndex != 0) {
                      var numNew = this.state.currentIndex - 1;
                      console.log('numNew', numNew);
                      this.setState({ currentIndex: numNew });
                      this.scrollToIndex(numNew);
                      var propImg = {
                        uri: this.state.itemImg[numNew].img,
                        headers: { Authorization: "someAuthToken" },
                        priority: FastImage.priority.normal,
                      };
                      this.setState({ imgMain: propImg })
                    }
                  }}
                  style={{
                    width: 30,
                    height: heightImageBanner - 60,
                    backgroundColor: BaseColor.blackColor,
                    opacity: 0.5,
                    padding: 3,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200,
                    position: 'absolute',
                    left: 0,

                  }}
                >
                  <Icon
                    name="chevron-back-outline"
                    size={30}
                    color={BaseColor.whiteColor}

                  >
                  </Icon>
                </TouchableOpacity>

                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  cacheControl={FastImage.cacheControl.cacheOnly}
                  resizeMethod={"scale"}
                  style={{ width: "100%", height: heightImageBanner - 60 }}
                  source={this.state.imgMain}
                ></FastImage>


                <TouchableOpacity
                  onPress={() => {
                    var numNew = this.state.currentIndex + 1;

                    if (numNew != this.state.itemImg.length) {
                      this.setState({ currentIndex: numNew });
                      this.scrollToIndex(numNew);
                      var propImg = {
                        uri: this.state.itemImg[numNew].img,
                        headers: { Authorization: "someAuthToken" },
                        priority: FastImage.priority.normal,
                      };
                      this.setState({ imgMain: propImg })
                    }
                  }}
                  style={{
                    width: 30,
                    height: heightImageBanner - 60,
                    backgroundColor: BaseColor.blackColor,
                    opacity: 0.5,
                    padding: 3,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200,
                    position: 'absolute',
                    right: 0,
                  }}
                >
                  <Icon
                    name="chevron-forward-outline"
                    size={20}
                    color={BaseColor.whiteColor}

                  >
                  </Icon>

                </TouchableOpacity>
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

                  ref={(ref) => { this.flatListRef = ref; }}
                  //keyExtractor={item => item}
                  horizontal={true}
                  data={this.state.itemImg}
                  showsHorizontalScrollIndicator={false}
                  //initialScrollIndex={50}
                  initialNumToRender={2}
                  //keyExtractor={(index) => item.id}
                  keyExtractor={(item, index) => String(index)}
                  getItemLayout={this.getItemLayout}
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
                        this.setState({ imgMain: propImg })
                        this.setState({ currentIndex: index });
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
                          borderColor: BaseColor.whiteColor,
                          borderWidth: index == this.state.currentIndex ? 1 : 0
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
        ) : (
          <FastImage
            style={{
              width: "100%",
              height: heightImageBanner,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={this.state.img_featured}
            resizeMode={FastImage.resizeMode.stretch}
            cacheControl={FastImage.cacheControl.cacheOnly}
            resizeMethod={"scale"}
            onLoad={(evt) => {
              this.setState({
                img_featured: {
                  uri: data.image,
                  headers: { Authorization: "someAuthToken" },
                  priority: FastImage.priority.normal,
                },
              });
            }}
          ></FastImage>
        )
        }
      </View>
    );
  }
}
