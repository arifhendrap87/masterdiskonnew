import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Images, BaseColor } from "@config";
import { Text, Image, StarRating, Icon } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";
import * as Utils from "@utils";
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";



export default class CommentItem extends Component {
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

        const { style, image, name, rate, date, title, comment, item, onPress, status, loading } = this.props;
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
        var status_name = '';
        var no_tagihan = <View></View>
        var jumlah_tagihan = <View></View>

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

            jumlah_tagihan = <Text
                note
                numberOfLines={2}
                style={{
                    paddingTop: 5
                }}
            >
                Rp {priceSplitter(order_payment_recent.iv_total_amount)}
            </Text>

            if (expiredTime > 0) {
                if (item.order_status.order_status_slug != 'cancel' || item.order_status.order_status_slug != 'expired' || item.order_status.order_status_slug != 'deny') {
                    countDown = <CountDown
                        size={12}
                        until={expiredTime}
                        // onFinish={() => alert('Finished')}
                        style={{ float: 'left', paddingVertical: 5 }}
                        digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: BaseColor.primaryColor }}
                        digitTxtStyle={{ color: BaseColor.primaryColor }}
                        timeLabelStyle={{ color: BaseColor.primaryColor, fontWeight: 'bold' }}
                        separatorStyle={{ color: BaseColor.primaryColor }}
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
                    dataPayment: dataPayment,
                }
            } else {
                countDown = <Text
                    note
                    numberOfLines={2}
                    style={{
                        paddingTop: 5
                    }}
                >
                    Waktu Habis
                        </Text>

                if (item.order_status.order_status_slug == 'new') {
                    status_name = 'Expired';
                    var param = {
                        id_order: item.id_order,
                        dataPayment: {},
                    }

                    var urlRedirect = 'Pembayaran';
                } else {
                    status_name = item.order_status.order_status_name;
                    var param = {
                        id_order: item.id_order,
                        dataPayment: {},
                    }

                    var urlRedirect = 'Pembayaran';
                }

            }
        } else {
            status_name = item.order_status.order_status_name;
            var param = {
                id_order: item.id_order,
                dataPayment: {},
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
        // if(item.product=='Flight'){
        //     title_product=<Text headline semibold style={{fontSize:20}}>
        //            {item.product_name} - {item.detail[0].order_detail[0].airline_name} 
        //         </Text>
        // }else if(item.product=='Trip'){
        //     title_product=<Text headline semibold style={{fontSize:20}}>
        //             {item.product_name} 
        //         </Text>
        // }else if(item.product=='Hotelpackage'){
        //     title_product=<Text headline semibold style={{fontSize:20}}>
        //             {item.product_name} 
        //         </Text>
        // }else if(item.product=='Hotel'){
        //     title_product=<Text headline semibold style={{fontSize:20}}>
        //             {item.product_name} 
        //         </Text>
        // }else if(item.product=='Voucher'){
        //     title_product=<Text headline semibold style={{fontSize:20}}>
        //             {item.product_name} 
        //         </Text>
        // }

        title_product = <View style={{ flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: BaseColor.textSecondaryColor, borderBottomStyle: 'solid', paddingBottom: 10 }} >
            <View style={{ flexDirection: 'row', flex: 11, justifyContent: "flex-start", alignItems: "center" }}>
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
                style={{ flex: 1 }}
            >
                <Icon
                    name="ellipsis-v"
                    size={18}
                    color={BaseColor.textSecondaryColor}
                    style={{ textAlign: "right" }}
                />
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

        var content = '';
        if (loading == true) {
            content = <View style={styles.contain}>
                <Icon
                    name={'spinner'}
                    color={BaseColor.primaryColor}
                    size={18}
                    solid
                    style={{
                        marginLeft: -10, marginTop: 10, position: 'absolute', width: 40, height: 40,
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
            // content=<View style={styles.contain}>
            //             <View style={styles.content}>
            //                 {/* <View style={{flex: 1}}>
            //                 {title_product}
            //                 </View> */}

            //                 <View style={{flex: 1}}>
            //                     {title_product}
            //                     <View style={styles.left}>
            //                         {no_order}
            //                         {no_tagihan}
            //                         {jumlah_tagihan}
            //                         {countDown}
            //                     </View>
            //                     <View style={styles.right}>
            //                         <Text>asd</Text>
            //                     </View>
            //                 </View>
            //             </View>
            //         </View>

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
                elevation: 5,
                padding: 10
            }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {title_product}
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={styles.left}>
                        {no_order}
                        {no_tagihan}
                        {jumlah_tagihan}
                        {countDown}
                    </View>
                    <View style={styles.right}>
                        <Icon
                            name="chevron-right"
                            size={18}
                            color={BaseColor.textSecondaryColor}
                            style={{ textAlign: "right" }}
                        />
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
            // <TouchableOpacity
            // style={[styles.contain, style]}
            // activeOpacity={0.9}
            // onPress={onPress}
            // >

            <TouchableOpacity
                style={[styles.item, style]}
                //onPress={onPress}
                onPress={() => {
                    this.props.navigation.navigate(urlRedirect, { param: param });

                    // if(order_payment_recent != null){
                    //     if(expiredTime > 0){
                    //         var dataPayment={
                    //             payment_type:order_payment_recent.payment_type,
                    //             payment_type_label:order_payment_recent.payment_type_label,
                    //             payment_sub:order_payment_recent.payment_sub,
                    //             payment_sub_label:order_payment_recent.payment_sub_label,
                    //         }

                    //         var param={
                    //             id_order:item.id_order,
                    //             dataPayment:dataPayment
                    //         }
                    //         this.props.navigation.navigate("PembayaranDetail",{
                    //             param:param,
                    //         });

                    //     }else{
                    //         var param={
                    //             id_order:item.id_order,
                    //             dataPayment:{}
                    //         }
                    //         this.props.navigation.navigate('Pembayaran',{param:param});
                    //     }

                    // }else{

                    //     var param={
                    //         id_order:item.id_order,
                    //         dataPayment:{}
                    //     }
                    //     this.props.navigation.navigate('Pembayaran',{param:param});
                    // }



                }}
                activeOpacity={0.9}
            >
                {content}
            </TouchableOpacity>
        );
    }
}

CommentItem.propTypes = {
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

CommentItem.defaultProps = {
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
