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
        // paddingLeft: 20,
        // paddingRight: 20,
    },
    contain: {
        flexDirection: "row",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        //borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //elevation: 5,
        padding: 20,
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

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
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
                        Start Date :
                            {/* {item.detail[0].order.checkin} */}
                    </Text>
                </View>
                <View
                    style={{ flexDirection: 'row', flex: 6, justifyContent: "flex-end", alignItems: "center" }}
                >
                    <Text caption2 style={{ color: BaseColor.redColor }}>
                        End Date :
                            {/* {item.detail[0].order.start_date} */}
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


            if (item.product == 'Flight' || item.product == 'Hotel' || item.product == 'Activities' || item.product == 'Hotelpackage' || item.product == 'Trip') {
                //countDown=<Text>{expiredTime}</Text>
                if (item.order_status.order_status_slug == 'paid') {
                    countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
                } else if (item.order_status.order_status_slug == 'booked') {
                    countDown = <View style={{ backgroundColor: BaseColor.primaryColor, padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
                } else if (item.order_status.order_status_slug == 'complete') {
                    countDown = <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 5 }}><Text caption2 whiteColor>{item.order_status.order_status_desc}</Text></View>
                } else {


                    if (expiredTime > 0) {
                        if (item.order_status.order_status_slug == 'process' || item.order_status.order_status_slug == 'new') {
                            countDown = <Text>{expiredTime}</Text>
                            countDown = <CountDown
                                size={10}
                                until={expiredTime}
                                style={{ float: 'left' }}
                                digitStyle={{ backgroundColor: expiredTime < 300 ? BaseColor.thirdColor : BaseColor.secondColor }}
                                digitTxtStyle={{ color: expiredTime < 300 ? BaseColor.whiteColor : BaseColor.blackColor }}
                                timeLabelStyle={{ color: BaseColor.primaryColor }}
                                separatorStyle={{ color: BaseColor.blackColor }}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                        }

                    } else {
                        if (item.order_status.order_status_slug == 'new') {
                            countDown = <Text
                                overline
                                numberOfLines={1}
                                style={{
                                    color: BaseColor.whiteColor,
                                    alignItems: "center", backgroundColor: BaseColor.redColor, width: 'auto', borderRadius: 5, paddingHorizontal: 5
                                }}
                            >
                                Expired
                                </Text>
                        }



                    }
                }

            }
            // else if(item.product=='Trip'){


            //     if(expiredTime > 0){
            //         if(item.order_status.order_status_slug == 'process'){
            //             countDown=<CountDown
            //                 size={10}
            //                 until={expiredTime}
            //                 style={{float:'left'}}
            //                 digitStyle={{backgroundColor: BaseColor.secondColor}}
            //                 digitTxtStyle={{color: BaseColor.blackColor}}
            //                 timeLabelStyle={{color: BaseColor.primaryColor}}
            //                 separatorStyle={{color: BaseColor.blackColor}}
            //                 timeToShow={['H', 'M', 'S']}
            //                 timeLabels={{m: null, s: null}}
            //                 showSeparator
            //             />
            //         }

            //     }else{

            //         if(item.order_status.order_status_slug == 'new' ){
            //             countDown=<Text
            //                     overline
            //                     numberOfLines={1}
            //                     style={{
            //                         color:BaseColor.whiteColor,
            //                         alignItems: "center",backgroundColor:BaseColor.redColor,width:'auto',borderRadius:5,paddingHorizontal:5
            //                     }}
            //                 >
            //                     Menunggu Konfirmasi
            //                 </Text>

            //         }else if(item.order_status.order_status_slug == 'process' ){
            //                     countDown=<Text
            //                     overline
            //                     numberOfLines={1}
            //                     style={{
            //                         color:BaseColor.whiteColor,
            //                         alignItems: "center",backgroundColor:BaseColor.redColor,width:'auto',borderRadius:5,paddingHorizontal:5
            //                     }}
            //                 >
            //                     Expired
            //                 </Text>
            //          }



            //     }
            // }





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
                var urlRedirect = 'Pembayaran';

            }
            status_name = item.order_status.order_status_name;
            var param = {
                id_order: item.id_order,
                dataPayment: dataPayment, back: ''
            }



        }
        else {
            status_name = item.order_status.order_status_name;
            var param = {
                id_order: item.id_order,
                dataPayment: {}, back: ''
            }

            var urlRedirect = 'Pembayaran';
        }



        var icon_name_type = '';
        if (item.product == 'Flight') {
            icon_name_type = 'airplane-outline';
        } else if (item.product == 'Trip') {
            icon_name_type = 'suitcase';
        } else if (item.product == 'Hotel') {
            icon_name_type = 'md-bed-outline';
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
            <View style={{ flexDirection: 'row', flex: 5, justifyContent: "flex-start", alignItems: "center" }}>
                <Icon
                    name={icon_name_type}
                    size={14}
                    color={BaseColor.primaryColor}
                    style={{ textAlign: "left", marginRight: 10 }}
                />
                <Text body2 bold>
                    {item.product}
                    {/* {item.order_status.order_status_name} */}
                </Text>
            </View>


            <View
                style={{ flexDirection: 'row', flex: 7, justifyContent: "flex-end", alignItems: "center" }}
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



        var content = '';

        var urlImage = 'https://masterdiskon.com/assets/upload/product/hotelpackage/2020/4be994f3bf41842cbef6626c815d18a5.jpg';
        if (loading == true) {
            content = <View style={styles.contain}>
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
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                // padding:20,
                marginBottom: 10
            }}>
                <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 20 }}>
                    {title_product}
                </View>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <View>
                        <Text caption1 bold style={{ color: BaseColor.thirdColor }}>Code Booking : {item.order_code}</Text>
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <View>
                        <Text body2 bold>{item.product_name} {item.product == 'Flight' ? '(' + item.product_detail.type_name + ')' : ''}</Text>
                    </View>
                </View>

                {
                    item.product == 'Flight' ?
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <View>
                                <Text caption1>{item.product_detail.airline_name} ({item.product_detail.airline_code})</Text>
                            </View>
                            <View>
                                <Text caption1>{item.detail[0].order_detail[0].cabin_name}</Text>
                            </View>
                        </View>
                        :

                        <View />
                }

                {
                    item.product == 'Flight' ?
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                            <View>
                                <Text caption1 style={{ color: BaseColor.primaryColor }}>Waktu Berangkat : {this.convertDateText(item.detail[0].order_detail[0].departure_date)}, {item.detail[0].order_detail[0].departure_time}</Text>
                            </View>

                            <View>
                                <Text caption1 style={{ color: BaseColor.primaryColor }}>Pax / Guest : {item.detail[0].pax.length}</Text>
                            </View>
                        </View>
                        :

                        <View style={{ flex: 1, flexDirection: "row", marginTop: 10, justifyContent: 'space-between', paddingHorizontal: 20 }}>

                            {
                                item.detail.length != 0 ?
                                    <View>
                                        <Text caption1 style={{ color: BaseColor.primaryColor }}>Waktu  :
                                {/* {this.convertDateText(item.detail[0].order.start_date)} */}
                                            {this.convertDateText(item.detail[0].order.start_date)}
                                        </Text>
                                    </View>
                                    :
                                    <View />
                            }


                            <View>
                                <Text caption1 style={{ color: BaseColor.primaryColor }}>Pax / Guest :
                                 {item.pax_people}
                                </Text>
                            </View>
                        </View>
                }





                <View style={{ flex: 1, flexDirection: "row", marginTop: 10, backgroundColor: BaseColor.secondColor, paddingVertical: 7 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <View>
                            <Text body2 bold>Rp {priceSplitter(item.total_price)}</Text>
                        </View>
                        <View>
                            <Text body2 bold>Lihat Detail ></Text>
                        </View>

                    </View>

                </View>


                {/* <View style={{ flex: 1,flexDirection: "row"}}>
                            <View>
                                {product_name}
                                {total_price}
                            </View>
                        </View> */}
            </View>
        }

        var page = '';

        if (item.order_status == 'complete') {
            page = 'FlightTicket';
        } else {
            page = 'Pembayaran';
        }

        var contentAll = <View />
        if (item.detail.length != 0 || item.pax_people != "0") {
            contentAll = content;
        }

        return (
            item.detail.length != 0 ?
                <TouchableOpacity
                    style={[styles.item, style]}
                    onPress={() => {
                        console.log(urlRedirect, JSON.stringify({ param: param }));
                        //aslinya
                        this.props.navigation.navigate(urlRedirect, { param: param });
                    }}
                    activeOpacity={0.9}
                >
                    {content}
                </TouchableOpacity>
                :
                <View />
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
