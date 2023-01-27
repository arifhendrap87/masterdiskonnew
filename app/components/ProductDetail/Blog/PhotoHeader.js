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
    AsyncStorage
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

import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


// Load sample data
import HTML from "react-native-render-html";
import {
    DataConfig,
} from "@data";

import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import Modal from "react-native-modal";
const heightImageBanner = Utils.scaleWithPixel(250, 1);

export default class PhotoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img_featured: Images.doodle,
            item: props.data
        };
    }



    render() {
        const { navigation, data } = this.props;
        const { item } = this.state;
        console.log('productssPromo',JSON.stringify(item));

        return (
            <View style={{ height: heightImageBanner }}>
               
                <FastImage
                    style={{width: "100%",
                    height: heightImageBanner,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                    source={this.state.img_featured}
                    resizeMode={FastImage.resizeMode.stretch}
                    cacheControl={FastImage.cacheControl.cacheOnly}
                    resizeMethod={'scale'}
                    onLoad={evt =>{
                        this.setState({img_featured:{
                            uri:data.img,
                          headers:{ Authorization: 'someAuthToken' },
                          priority: FastImage.priority.normal,
                        }
                      
        
                        })
                      }
                    }
                    
                    >
                    </FastImage>
   
            </View>
        );
    }
}
