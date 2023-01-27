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



export default class ColectionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img_featured:Images.doodle,
            expanded:true
        };
    }

    toggleExpand=()=>{
        this.setState({expanded : !this.state.expanded})
    }


    

    render() {
        const { navigation,data} = this.props;
        console.log('dataCollection',JSON.stringify(data));
        
        return (
            <View style={{backgroundColor:BaseColor.whiteColor,marginTop:10,flex:1}}>
                <View style={{marginHorizontal:20,paddingVertical:20,flex:1}}>
                    <TouchableOpacity
                            onPress={() => 
                            {
                                this.toggleExpand()
                            }}
                        >
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            }}>
                            <Text body1>Ditampilkan di koleksi</Text>
                            <Icon
                                        name={this.state.expanded ? 'chevron-up' : 'chevron-down'}
                                        color={BaseColor.dividedColor}
                                        size={14}
                                />
                        </View>
                    </TouchableOpacity>
                    
                    
                </View>

                {
                    this.state.expanded &&
                    <View
                    style={{
                        borderBottomColor: BaseColor.dividerColor,
                        borderBottomWidth: 0.5,
                    }}
                    />
                }

                
                {
                    this.state.expanded &&
                    <View style={{marginHorizontal:20,paddingVertical:20,flex:1}}>
                        <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        data={data.tag}
                        
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item,index }) => {
                            return (
                               

                                <TouchableOpacity
                                    style={[
                                    index == 0
                                        ? { marginLeft: 20,marginRight:10 }
                                        : { marginRight: 10 }
                                    ]}
                                    activeOpacity={0.9}
                                    onPress={() => {    
                                        //console.log(JSON.stringify(item));
                                        this.props.navigation.navigate('ProductList',{type:'tag',slug:item.slug_product_tag,title:item.name_product_tag});
                                    }}
                                >   
                                        <View style={{backgroundColor:BaseColor.primaryColor,paddingHorizontal:5,paddingVertical:5,borderRadius:5}}>
                                            <Text overline whiteColor style={{textAlign:"center"}}>
                                                {item.name_product_tag}
                                            </Text>
                                        </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    </View>
                }
                
            </View>


            
        );
    }
}
