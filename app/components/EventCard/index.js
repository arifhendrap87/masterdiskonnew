import React, { Component } from "react";
import { View, TouchableOpacity,Animated } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image, Text } from "@components";
import { Images, BaseColor } from "@config";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";


export default class EventCard extends Component {
     constructor(props) {
        super(props)
        this.state = {
          loaded: false,
          imageOpacity: new Animated.Value(0.0),
          placeholderOpacity: new Animated.Value(1.0),
          placeholderScale: new Animated.Value(1.0),
        }
      }

    _onLoad = () => {
    const {
      placeholderScale,
      placeholderOpacity,
      imageOpacity
    } = this.state

    Animated.sequence([
      // Delay is just so here so it can be seen
      Animated.timing(placeholderOpacity, {
        delay: 1000,
        toValue: 1.0
      }),
      // Begin explode animation
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.setState(() => ({ loaded: true }))
    })
  }


    render() {
        const {
          placeholderColor,
          source
        } = this.props

        const {
          imageOpacity,
          placeholderOpacity,
          placeholderScale
        } = this.state



        const { style, title, location, time, image, onPress,url,loading } = this.props;

        if(!loading){
                var contetText=<View
                    style={{
                        padding: 10,
                        flexDirection: "row"
                    }}
                >
                 
                    <View style={{ flex: 1 }}>
                        <Text
                            body2
                            semibold
                            numberOfLines={3}
                            style={{ flex: 1 }}
                        >
                            {title}
                        </Text>
                        <Text overline grayColor style={{ marginVertical: 5 }}>
                            {time}
                        </Text>
                        <Text overline grayColor>
                            {image}
                        </Text>
                    </View>
                </View>
        }else{
                var contetText=<View
                    style={{
                        padding: 10,
                        flexDirection: "row"
                    }}
                >
                <Placeholder
                                      Animation={Fade}
                                      style={{marginTop: 5}}
                                    >
                                        <PlaceholderLine width={100} style={{marginTop: 2}} />
                                        <PlaceholderLine width={60} style={{marginTop: 2}} />
                                        <PlaceholderLine width={70} style={{marginTop: 2}} />
                                    </Placeholder>
                </View>
        }
        return (
            <TouchableOpacity
                style={[styles.content, style]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                {/* <Image source={image} style={styles.imageBanner} /> */}
                <Image source={{uri : url+image}} style={styles.imageBanner} />
                {!this.state.loaded &&
                        <Animated.View
                          style={[
                            styles.imageBanner,
                            {
                              backgroundColor: placeholderColor || BaseColor.fieldColor,
                              opacity: placeholderOpacity,
                              position: 'absolute',
                              transform: [{ scale: placeholderScale }]
                            }
                          ]} />
                        
                      }
               {contetText}
            </TouchableOpacity>
        );
    }
}

EventCard.propTypes = {
    url: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
    title: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
     loading: PropTypes.bool,
};

EventCard.defaultProps = {
    url:'',
    image: Images.profile2,
    title: "BBC Music Introducing",
    time: "Thu, Oct 31, 9:00am",
    location: "Tobacco Dock, London",
    style: {},
    onPress: () => {},
     loading: false
};
