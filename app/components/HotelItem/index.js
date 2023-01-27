import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Animated } from "react-native";
import { Image, Text, Icon, StarRating, Tag } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import styles from "./styles";


import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";


export default class HotelItem extends Component {
    constructor(props) {
        super(props);
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




    /**
     * Display hotel item as block
     */
    renderBlock() {
        const {
            style,
            image,
            name,
            location,
            price,
            available,
            rate,
            rateStatus,
            onPress,
            onPressTag,
            services,
            url,
            loading,
            type
        } = this.props;
        return (
            <View style={style}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={{uri : url+image}} style={styles.blockImage} />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text
                        title2
                        semibold
                        style={{ marginTop: 5 }}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                    <View style={styles.blockContentAddress}>
                        <Icon
                            name="map-marker-alt"
                            color={BaseColor.lightPrimaryColor}
                            size={10}
                        />
                        <Text
                            caption1
                            grayColor
                            style={{
                                marginLeft: 3
                            }}
                            numberOfLines={1}
                        >
                            {location}
                        </Text>
                    </View>
                    <View style={styles.blockContentDetail}>
                        <View>
                            <Text title3 primaryColor semibold>
                                {price}
                            </Text>
                            <Text
                                caption1
                                accentColor
                                style={{
                                    marginTop: 3
                                }}
                                numberOfLines={1}
                            >
                                {available}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <Tag onPress={onPressTag} rate>
                                {rate}
                            </Tag>
                            <View
                                style={{
                                    marginLeft: 10
                                }}
                            >
                                <Text
                                    caption1
                                    grayColor
                                    semibold
                                    style={{ paddingBottom: 5 }}
                                >
                                    {rateStatus}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    starSize={10}
                                    maxStars={5}
                                    rating={rate}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.contentService}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={services}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                            <View
                                style={styles.serviceItemBlock}
                                key={"block" + index}
                            >
                                <Icon
                                    name={item.icon}
                                    size={16}
                                    color={BaseColor.accentColor}
                                />
                                <Text
                                    overline
                                    grayColor
                                    style={{ marginTop: 4 }}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                            width: 16
                        }}
                    >
                        <Icon
                            name="angle-right"
                            size={16}
                            color={BaseColor.textSecondaryColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    /**
     * Display hotel item as list
     */
    renderList() {
        const {
            style,
            image,
            name,
            location,
            price,
            available,
            rate,
            rateCount,
            onPress,
            url,
            loading,
            type
        } = this.props;
        return (
            <View style={[styles.listContent, style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={{uri : url+image}} style={styles.listImage} />
                </TouchableOpacity>
                <View style={styles.listContentRight}>
                    <Text headline semibold numberOfLines={1}>
                        {name}
                    </Text>
                    <View style={styles.listContentRow}>
                        <Icon
                            name="map-marker-alt"
                            color={BaseColor.lightPrimaryColor}
                            size={10}
                        />
                        <Text
                            caption1
                            grayColor
                            style={{
                                marginLeft: 3
                            }}
                            numberOfLines={1}
                        >
                            {location}
                        </Text>
                    </View>
                    <View style={styles.listContentRow}>
                        <StarRating
                            disabled={true}
                            starSize={10}
                            maxStars={5}
                            rating={rate}
                            selectedStar={rating => {}}
                            fullStarColor={BaseColor.yellowColor}
                        />
                        <Text
                            caption1
                            grayColor
                            semibold
                            style={{
                                marginLeft: 10,
                                marginRight: 3
                            }}
                        >
                            Ratting
                        </Text>
                        <Text caption1 primaryColor semibold>
                            {rateCount}
                        </Text>
                    </View>
                    <Text
                        title3
                        primaryColor
                        semibold
                        style={{ marginTop: 5, marginBottom: 5 }}
                    >
                        {price}
                    </Text>
                    <Text caption1 semibold>
                        night / room
                    </Text>
                    <Text footnote accentColor style={{ marginTop: 3 }}>
                        {available}
                    </Text>
                </View>
            </View>
        );
    }

    /**
     * Display hotel item as grid
     */
    renderGrid() {
        const {
            style,
            image,
            name,
            location,
            price,
            rate,
            numReviews,
            onPress,
            url,
            loading,
            type
        } = this.props;
        return (
            <View style={[styles.girdContent, style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={{uri : url+image}} style={styles.girdImage} />
                </TouchableOpacity>
                <View style={styles.girdContentLocation}>
                    <Icon
                        name="map-marker-alt"
                        color={BaseColor.primaryColor}
                        size={10}
                    />
                    <Text
                        caption2
                        grayColor
                        style={{
                            marginLeft: 3
                        }}
                        numberOfLines={1}
                    >
                        {location}
                    </Text>
                </View>
                <Text
                    body2
                    semibold
                    style={{
                        marginTop: 5
                    }}
                >
                    {name}
                </Text>
                <View style={styles.girdContentRate}>
                    <StarRating
                        disabled={true}
                        starSize={10}
                        maxStars={5}
                        rating={rate}
                        selectedStar={rating => {}}
                        fullStarColor={BaseColor.yellowColor}
                    />
                    <Text caption2 grayColor>
                        {numReviews} reviews
                    </Text>
                </View>
                <Text
                    title3
                    primaryColor
                    semibold
                    style={{
                        marginTop: 5
                    }}
                >
                    {price}
                </Text>
            </View>
        );
    }




     /**
     * Display hotel item as grid
     */
    renderBlog() {
        const {
            style,
            image,
            name,
            location,
            price,
            rate,
            numReviews,
            onPress,
            url,
            loading,
            type
        } = this.props;


          const {
          placeholderColor,
          source
        } = this.props

        const {
          imageOpacity,
          placeholderOpacity,
          placeholderScale
        } = this.state


        return (
            <View style={[styles.girdContent, style]}>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={{uri : url+image}} style={styles.girdImage} onLoad={this._onLoad} />
                     {!this.state.loaded &&
                        <Animated.View
                          style={[
                            styles.girdImage,
                            {
                              backgroundColor: placeholderColor || BaseColor.fieldColor,
                              opacity: placeholderOpacity,
                              position: 'absolute',
                              transform: [{ scale: placeholderScale }]
                            }
                          ]} />
                        
                      }
                </TouchableOpacity>

                {
                    loading ?

                    <Placeholder
                                      Animation={Fade}
                                      style={{marginTop: 5}}
                                    >
                                        <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0,borderRadius: 5}} />
                                        <PlaceholderLine width={100} style={{marginTop: 2,marginBottom:0}} />
                                        <PlaceholderLine width={50} style={{marginTop: 2,marginBottom:0}} />
                                    </Placeholder>
 

                :             
                <View>       
                <View style={styles.girdContentLocation}>
                    <Text
                        caption2
                        grayColor
                        style={{
                            marginLeft: 0
                        }}
                        numberOfLines={1}
                    >
                        {location}
                    </Text>
                </View>
                <Text
                    body2
                    semibold
                    style={{
                        marginTop: 0
                    }}
                >
                    {name}
                </Text>
                <View style={styles.girdContentRate}>
                    <Text caption2 grayColor>
                        {numReviews} reviews
                    </Text>
                </View>
                <Text
                    title3
                    primaryColor
                    semibold
                    style={{
                        marginTop: 0
                    }}
                >
                    {price}
                </Text>
               
                </View>
                 }
            </View>
        );
    }


    render() {
        let { block, grid, type } = this.props;

        if (type=='blog'){
            return this.renderBlog();
        }else{
            if (grid) return this.renderGrid();
            else if (block) return this.renderBlock();
            else return this.renderList();
        }
    }
}

HotelItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    list: PropTypes.bool,
    block: PropTypes.bool,
    grid: PropTypes.bool,
    name: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    available: PropTypes.string,
    rate: PropTypes.number,
    rateCount: PropTypes.string,
    rateStatus: PropTypes.string,
    numReviews: PropTypes.number,
    services: PropTypes.array,
    onPress: PropTypes.func,
    onPressTag: PropTypes.func,
    url: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.string,
};

HotelItem.defaultProps = {
    style: {},
    image: "",
    list: true,
    block: false,
    grid: false,
    name: "",
    location: "",
    price: "",
    available: "",
    rate: 0,
    rateCount: "",
    rateStatus: "",
    numReviews: 0,
    services: [],
    onPress: () => {},
    onPressTag: () => {},
     url: "",
     loading: true,
     type:""
};
