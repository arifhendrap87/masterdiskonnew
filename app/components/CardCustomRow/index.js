import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Animated,StyleSheet } from "react-native";
import { Image, Text, Icon, StarRating, Tag } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
// import styles from "./styles";
import * as Utils from "@utils";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

const styles = StyleSheet.create({
    
});

export default class CardCustomRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      
    }



    renderDefault() {
       

    }
    

    render() {

      const {
            listData,
            onPress,
            loading,
            title,
            desc
    } = this.props;

        return (

          <View>
                                <View style={{marginTop: 20,marginLeft: 20,marginBottom: 10}}>
                                    <Text caption2 bold>
                                        {title}
                                    </Text>
                                    <Text caption2 grayColor>
                                    {desc}
                                    </Text>
                                </View>
                                <View>
                                <FlatList
                                        contentContainerStyle={{
                                            paddingRight: 20
                                        }}
                                        horizontal={true}
                                        data={listData}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item, index }) => (
                                        
                                            <CardCustom
                                                propImage={{height:100,url:item.img_featured_url}}
                                                propInframe={{top:'top',bottom:'bottom'}}
                                                propTitle={{text:item.product_name}}
                                                propDesc={{text:'Temukan penerbangan nyaman dengan penawaran terbaik'}}
                                                propPrice={{price:'2000',startFrom:true}}
                                                propStar={{rating:10,enabled:true}}
                                                propLeftRight={{left:'ss',right:'dsf'}}
                                                onPress={() =>
                                                    navigation.navigate("TourDetailCustom",{product:item})
                                                }
                                                loading={this.state.loading_product_trip}
                                                propOther={{inFrame:false,horizontal:true,width:Utils.scaleWithPixel(100)}}
                                            />
                                        
                                        )}
                                    />
                                    
                                    
                                </View>
                            </View>
        )
    }
}

CardCustomRow.propTypes = {
    listData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress : PropTypes.func,
    loading : PropTypes.bool,
    title:PropTypes.string,
    desc:PropTypes.string
};

CardCustomRow.defaultProps = {
    listData:{},
    onPress: () => {},
    loading : true,
    title:"",
    desc:""
};
