import React, { Component } from "react";
import { View, TouchableOpacity,Animated} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { Image } from "@components";
import { Images,BaseColor } from "@config";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";


export default class Card extends Component {
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

        const { style, children, styleContent, image, onPress,url,loading } = this.props;
         
       
        return (
            <TouchableOpacity
                style={style}
                onPress={onPress}
                activeOpacity={0.9}
            >
                    <Image source={{uri : url+image}} style={styles.imageBanner}  onLoad={this._onLoad} />
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

                     
                    <View style={styleContent}>{children}</View>

            </TouchableOpacity>
        );
    }
}

Card.propTypes = {
    url: PropTypes.node.isRequired,
    image: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleContent: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    onPress: PropTypes.func,
    loading: PropTypes.bool
};

Card.defaultProps = {
    url:'',
    image: Images.profile2,
    style: {},
    styleContent: {
        position: "absolute",
        bottom: 0,
        padding: 10
    },
    onPress: () => {},
    loading: true,
};
