import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon, StarRating, Tag, ProfileDetail } from "@components";
import { BaseStyle, BaseColor } from "@config";
import PropTypes from "prop-types";
import styles from "./styles";
export default class FeedItem extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Display Tour item as block
     */
    renderBlock() {
        const {
            style,
            image,
            name,
            price,
            rate,
            rateCount,
            author,
            onPress,
            onPressUser,
            onPressBookNow
        } = this.props;
        return (
            <View style={style}>
                <View style={[BaseStyle.bodyPaddingDefault, { marginBottom: 5 }]}>
                <ProfileDetail
                        image={author.image}
                        textFirst={name}
                        textSecond={author.name}
                        point={author.point}
                        icon={false}
                        style={{ marginTop: 10 }}
                        onPress={onPressUser}
                    />
                </View>
                <View style={[BaseStyle.bodyPaddingDefault, { marginVertical: 5 }]}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                caption1
                                semibold
                                style={{
                                    marginLeft: 0,
                                    marginRight: 3
                                }}
                            >
                                Bruce Webb Today in Awesome! #amazing #travel #instagram
                                Look nice!
                            </Text>
                        </View>
                        
                    </View>
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image source={image} style={styles.blockImage} />
                    {/* <View style={styles.blockPriceContent}>
                        <Text title3 whiteColor semibold>
                            {price}
                        </Text>
                    </View> */}
                </TouchableOpacity>
                <View style={[BaseStyle.bodyPaddingDefault, { marginTop: 5 }]}>

                    <View 
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <View
                        style={{flexDirection: "row"}}
                        >
                        <Icon
                            solid
                            color={BaseColor.primaryColor}
                            name="heart-outline"
                            size={20}
                            />
                            <Text
                                    caption1
                                    grayColor
                                    semibold
                                    style={{
                                        marginLeft: 5,
                                        marginRight: 3,
                                        marginTop:2
                                    }}
                                >
                                    Suka
                                </Text>
                        </View>

                        <View
                        style={{flexDirection: "row"}}
                        >
                        <Icon
                            solid
                            color={BaseColor.primaryColor}
                            name="heart-outline"
                            size={20}
                            />
                            <Text
                                    caption1
                                    grayColor
                                    semibold
                                    style={{
                                        marginLeft: 5,
                                        marginRight: 3,
                                        marginTop:2
                                    }}
                                >
                                    Komentar
                                </Text>
                        </View>


                        <View
                        style={{flexDirection: "row"}}
                        >
                        <Icon
                            solid
                            color={BaseColor.primaryColor}
                            name="heart-outline"
                            size={20}
                            />
                            <Text
                                    caption1
                                    grayColor
                                    semibold
                                    style={{
                                        marginLeft: 5,
                                        marginRight: 3,
                                        marginTop:2
                                    }}
                                >
                                    Bagikan
                                </Text>
                        </View>

                    </View>
                    
                </View>
            </View>
        );
    }


    render() {
        let { block, grid } = this.props;
        return this.renderBlock();
       
    }
}

FeedItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    list: PropTypes.bool,
    block: PropTypes.bool,
    grid: PropTypes.bool,
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    location: PropTypes.string,
    startTime: PropTypes.string,
    price: PropTypes.string,
    travelTime: PropTypes.string,
    rateCount: PropTypes.string,
    rate: PropTypes.number,
    numReviews: PropTypes.number,
    author: PropTypes.object,
    services: PropTypes.array,
    onPress: PropTypes.func,
    onPressBookNow: PropTypes.func,
    onPressUser: PropTypes.func
};

FeedItem.defaultProps = {
    style: {},
    list: true,
    block: false,
    grid: false,
    image: "",
    name: "",
    location: "",
    price: "",
    rate: 0,
    rateCount: "",
    numReviews: 0,
    travelTime: "",
    startTime: "",
    author: {},
    services: [],
    onPress: () => {},
    onPressBookNow: () => {},
    onPressUser: () => {}
};
