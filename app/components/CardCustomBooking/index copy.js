import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon } from "@components";
import { BaseColor, Images } from "@config";
import PropTypes from "prop-types";
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const styles = StyleSheet.create({
    item: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    contain: {
        flexDirection: "row",
        flex: 1,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    thumb: { width: 48, height: 48, marginRight: 10, borderRadius: 24 },
    content: {
        flex: 1,
        flexDirection: "row",
    },

    leftSub: {
        flex: 5,
        alignItems: "flex-start",
        justifyContent: "center",
        //marginLeft:30

    },
    rightSub: {
        flex: 5,
        alignItems: "flex-end",
        justifyContent: "center"
    },


    left: {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    right: {
        flex: 9,
    }
});

export default class CardCustomBooking extends Component {
    duration(expirydate) {

        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;

    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }



    render() {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { style, item, loading } = this.props;


        var fieldsArray = [];
        item.detail.map(item => {
            fieldsArray.push(
                <View>
                    <View style={styles.line} />
                    <View style={styles.validContent}>
                        <View style={{ flex: 1 }}>
                            <Text caption3>
                                {item.product_name} ({item.type})
                                </Text>
                        </View>
                    </View>
                </View>
            );
        });

        var countDown = <View></View>;
        var order_payment_recent = item.order_payment_recent;
        var total_price = <View></View>
        var desc = <View></View>

        if (item.product == 'Flight') {
            desc = <Text
                overline
                numberOfLines={1}
                style={{
                    color: BaseColor.greyColor
                }}
            >
                {item.detail[0].type}, {item.detail[0].order_detail[0].cabin_name} Class, {item.detail[0].pax.length} orang
            </Text>
        } else if (item.product == 'Trip') {
            desc = <Text
                overline
                numberOfLines={1}
                style={{
                    color: BaseColor.greyColor
                }}
            >
                {item.detail[0].order.country}, {item.detail[0].order.duration} hari, {item.detail[0].pax.length} orang
            </Text>
        } else if (item.product == 'Hotel') {
            desc = <Text
                caption1
                numberOfLines={1}
                style={{
                    color: BaseColor.greyColor
                }}
            >
                {item.product_name}
            </Text>
        } else if (item.product == 'Hotelpackage') {
            desc = <Text
                caption1
                numberOfLines={1}
                style={{
                    color: BaseColor.greyColor
                }}
            >
                {item.product_name}
            </Text>
        } else if (item.product == 'Voucher') {
            desc = <Text
                caption1
                numberOfLines={1}
                style={{
                    color: BaseColor.greyColor
                }}
            >
                {item.product_name}
            </Text>
        }






        if (item.product == 'Flight') {
            schedule = <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        Start Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
            </View>
        } else if (item.product == 'Trip') {
            schedule = <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        Start Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
            </View>
        } else if (item.product == 'Hotel') {
            schedule = <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        Start Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
            </View>
        } else if (item.product == 'Hotelpackage') {
            schedule = <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        Start Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
            </View>
        } else if (item.product == 'Voucher') {
            schedule = <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        Start Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date : {item.detail[0].order.start_date}
                    </Text>
                </View>
            </View>
        }

        total_price = <Text
            title3
            numberOfLines={1}
            style={{ color: BaseColor.primaryColor }}
        >
            Rp {priceSplitter(item.total_price)}
        </Text>

        if (order_payment_recent != null) {
            var expiredTime = this.duration(order_payment_recent.expired);

            no_tagihan = <Text
                note
                numberOfLines={2}
                style={{
                    paddingTop: 5
                }}
            >
                No.Tagihan  {order_payment_recent.id_invoice}
            </Text>



            if (expiredTime > 0) {
                if (item.order_status.order_status_slug != 'cancel' || item.order_status.order_status_slug != 'expired' || item.order_status.order_status_slug != 'deny') {
                    countDown = <CountDown
                        size={10}
                        until={expiredTime}
                        style={{ float: 'left' }}
                        digitStyle={{ backgroundColor: BaseColor.secondColor }}
                        digitTxtStyle={{ color: BaseColor.blackColor }}
                        timeLabelStyle={{ color: BaseColor.primaryColor }}
                        separatorStyle={{ color: BaseColor.blackColor }}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                    />

                }

                if (order_payment_recent.payment_type == "" || order_payment_recent.payment_type == "user") {
                    var dataPayment = {};
                    var urlRedirect = 'Pembayaran';

                } else {
                    var dataPayment = {
                        payment_type: order_payment_recent.payment_type,
                        payment_type_label: order_payment_recent.payment_type_label,
                        payment_sub: order_payment_recent.payment_sub,
                        payment_sub_label: order_payment_recent.payment_sub_label,
                    };
                    var urlRedirect = 'PembayaranDetail';

                }
                status_name = item.order_status.order_status_name;
                var param = {
                    id_order: item.id_order,
                    dataPayment: dataPayment, back: ''
                }
            } else {
                countDown = <Text
                    overline
                    numberOfLines={1}
                    style={{
                        color: BaseColor.whiteColor,
                        alignItems: "center", backgroundColor: BaseColor.redColor, width: 'auto', borderRadius: 5, paddingHorizontal: 5
                    }}
                >
                    Waktu Habis
                        </Text>

                if (item.order_status.order_status_slug == 'new') {
                    status_name = 'Expired';
                    var param = {
                        id_order: item.id_order,
                        dataPayment: {}, back: ''
                    }

                    var urlRedirect = 'Pembayaran';
                } else {
                    status_name = item.order_status.order_status_name;
                    var param = {
                        id_order: item.id_order,
                        dataPayment: {}, back: ''
                    }

                    var urlRedirect = 'Pembayaran';
                }

            }


            masa_tagihan = <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.leftSub}>
                    <Text
                        numberOfLines={1}
                        overline
                        style={{ color: BaseColor.greyColor }}
                    >
                        Masa Tagihan
                                    </Text>
                </View>
                <View style={styles.rightSub}>
                    {countDown}
                </View>

            </View>
        } else {
            status_name = item.order_status.order_status_name;
            var param = {
                id_order: item.id_order,
                dataPayment: {}, back: ''
            }

            var urlRedirect = 'Pembayaran';
        }



        var icon_name_type = '';
        if (item.product == 'Flight') {
            icon_name_type = 'plane';
        } else if (item.product == 'Trip') {
            icon_name_type = 'suitcase';
        } else if (item.product == 'Hotel') {
            icon_name_type = 'hotel';
        } else if (item.product == 'Hotelpackage') {
            icon_name_type = 'bed';
        } else if (item.product == 'Voucher') {
            icon_name_type = 'gift';
        } else if (item.product == 'Activities') {
            icon_name_type = 'map-signs';
        }

        var icon_type = <View></View>;
        icon_type = <Icon
            name={icon_name_type}
            color={BaseColor.primaryColor}
            size={18}
            solid
            style={{
                marginLeft: -10, marginTop: 60, position: 'absolute', width: 40, height: 40,
                backgroundColor: "#fff",
                borderRadius: 18,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 10,
            }}
        />


        var title_product = <View></View>;
        title_product = <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }} >
            <View style={{ flexDirection: 'row', flex: 8, justifyContent: "flex-start", alignItems: "center" }}>
                <Icon
                    name={icon_name_type}
                    size={18}
                    color={BaseColor.primaryColor}
                    style={{ textAlign: "left", marginRight: 10 }}
                />
                <Text>
                    {item.product}
                </Text>
            </View>
            <View
                style={{ flexDirection: 'row', flex: 4, justifyContent: "flex-end", alignItems: "center" }}
            >
                {countDown}
            </View>
        </View>

        var no_order = <Text
            note
            numberOfLines={2}
            style={{
                paddingTop: 5
            }}
        >
            No.Order {item.order_code}
        </Text>

        var product_name = <Text
            note
            numberOfLines={2}
            style={{
                paddingTop: 5
            }}
        >
            {item.product_name}
        </Text>

        var statusOrder = <Text
            note
            numberOfLines={2}
            style={{
                padding: 5, alignItems: "center", backgroundColor: 'yellow', width: 'auto', borderRadius: 5
            }}
        >
            {item.order_status.order_status_name}
        </Text>

        var content = '';

        var urlImage = 'https://masterdiskon.com/assets/upload/product/hotelpackage/2020/4be994f3bf41842cbef6626c815d18a5.jpg';
        if (loading == true) {
            content = <View style={styles.contain}>
                {/* <Icon
                                    name={'spinner'}
                                    color={BaseColor.primaryColor}
                                    size={18}
                                    solid
                                    style={{ marginLeft: -10,marginTop:10,position:'absolute',width:40,height:40,
                                    backgroundColor: "#fff",
                                    borderRadius: 18,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                    padding:10,
                                         }}
                                /> */}
                <View style={styles.content}>
                    <View style={styles.left}>
                        <PlaceholderLine width={50} />
                        <PlaceholderLine width={100} />
                    </View>
                    <View style={styles.right}>
                        <PlaceholderLine width={40} />
                        <PlaceholderLine width={50} />
                    </View>
                </View>
            </View>
        } else {

            content = <View style={{
                borderBottomColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                backgroundColor: "#fff",
                borderRadius: 18,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                //elevation: 5,
                padding: 10,
            }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {title_product}
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.right}>
                        {product_name}
                        {desc}
                        {total_price}
                    </View>
                </View>
            </View>


        }

        var page = '';

        if (item.order_status == 'complete') {
            page = 'FlightTicket';
        } else {
            page = 'Pembayaran';
        }

        return (
            <TouchableOpacity
                style={[styles.item, style]}
                onPress={() => {
                    //aslinya
                    this.props.navigation.navigate(urlRedirect, { param: param });
                }}
                activeOpacity={0.9}
            >
                {content}
            </TouchableOpacity>
        );
    }
}

CardCustomBooking.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    rate: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    comment: PropTypes.string,
    onPress: PropTypes.func,
    status: PropTypes.func,
    loading: PropTypes.bool
};

CardCustomBooking.defaultProps = {
    item: {},
    style: {},
    image: Images.profile2,
    name: "",
    rate: 0,
    date: "",
    title: "",
    comment: "",
    onPress: () => { },
    status: "",
    loading: true,
};
