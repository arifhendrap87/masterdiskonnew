/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Animated, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet, AsyncStorage, Image, BackHandler, Share } from "react-native";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem,
    StarRating
} from "@components";
// import TicketModal from "react-native-ticket-modal";
import { BaseStyle, BaseColor, Images } from "@config";
import Barcode from "react-native-barcode-builder";
import AnimatedLoader from "react-native-animated-loader";
import FastImage from 'react-native-fast-image';
import { WebView } from 'react-native-webview';

import ViewShot from 'react-native-view-shot';
const styles = StyleSheet.create({
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    blockView: {
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    }
});


export default class Eticket extends Component {
    constructor(props) {
        super(props);


        var param = {};
        if (this.props.navigation.state.params.param) {
            param = this.props.navigation.state.params.param;
        }

        var config = {};
        if (this.props.navigation.state.params.config) {
            config = this.props.navigation.state.params.config;
        }

        var dataDetail = {};
        if (this.props.navigation.state.params.dataDetail) {
            dataDetail = this.props.navigation.state.params.dataDetail;

        }
        // var filePdf='https://masterdiskon.com/assets/upload/order/'+dataDetail.product.toLowerCase()+'/'+dataDetail.order.evoucher_upload;
        var filePdf = 'https://masterdiskon.com/front/order/evoucher/detail/' + dataDetail.id_order;
        console.log('dataDetail', JSON.stringify(dataDetail));
        console.log('param', JSON.stringify(param));
        console.log('filePdf', JSON.stringify(filePdf));


        this.state = {

            dataDetail: dataDetail,
            param: param,
            config: config,
            download: false,
            filePdf: filePdf

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();

        return true;
    }




    convertDate(date) {
        var dateString = date.toString();

        var MyDate = new Date(dateString);
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate());
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        var dates = MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
        return dates;
    }

    componentDidMount() {
        const { order_id_aero } = this.state;

    }


    // convertDate(date){
    //   var d = new Date(date);
    //   var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //   var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //   //return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    //   return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    // }

    captureAndShareScreenshot() {
        this.refs.viewShot.capture().then((uri) => {
            RNFS.readFile(uri, 'base64').then((res) => {
                let urlString = 'data:image/jpeg;base64,' + res;
                let options = {
                    title: 'Share Title',
                    message: 'Share Message',
                    url: urlString,
                    type: 'image/jpeg',
                };
                Share.open(options)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
            });
        });
    };

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }


    render() {
        const { navigation } = this.props;
        const { dataFlight, order_id_aero, type, loading_spinner, dataDetail } = this.state;
        var product = dataDetail.product;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));



        var productName = dataDetail.product_name;



        var scedules = <View />

        if (product == 'Hotelpackage') {

            scedules = <View style={styles.blockView}>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Check-In</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            Check-In
                                    </Text>
                        <Text caption1 grayColor>
                            {dataDetail.detail[0].order.start_date}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Check-Out</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            Check-In
                                    </Text>
                        <Text caption1 grayColor>
                            {dataDetail.detail[0].order.end_date}
                        </Text>
                    </View>
                </View>
            </View>

        } else if (product == 'Hotel') {

            scedules = <View style={styles.blockView}>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Check-In</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            Check-In
                                        </Text>
                        <Text caption1 grayColor>
                            {this.convertDateText(dataDetail.detail[0].order.checkin)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Check-Out</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            Check-Out
                                        </Text>
                        <Text caption1 grayColor>
                            {this.convertDateText(dataDetail.detail[0].order.checkout)}
                        </Text>
                    </View>
                </View>
            </View>
        } else if (product == 'Trip') {

            scedules = <View style={styles.blockView}>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Berangkat</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            Berangkat
                                        </Text>
                        <Text caption1 grayColor>
                            {this.convertDateText(dataDetail.detail[0].order.start_date)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Duration</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >

                        <Text caption2 bold>
                            {dataDetail.detail[0].order.duration} hari
                                        </Text>
                    </View>
                </View>
            </View>
        } else if (product == 'Activities') {

            scedules = <View style={styles.blockView}>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Start</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            {this.convertDateText(dataDetail.detail[0].order.start_date)}
                        </Text>

                    </View>
                </View>
                <View
                    style={{ flexDirection: "row", marginTop: 10 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>End</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption2 bold>
                            {this.convertDateText(dataDetail.detail[0].order.end_date)}
                        </Text>

                    </View>
                </View>
            </View>
        }





        if (product == 'Hotel') {
            var item = dataDetail.detail[0].pax[0];
            var paxs = <View style={{ marginBottom: 10 }}>
                <Text caption1 bold style={{ marginBottom: 5 }}>
                    {item.title}. {item.firstname}  {item.lastname}
                </Text>
                <View
                    style={{ flexDirection: "row", marginTop: 0 }}
                >
                    <View style={{ flex: 1 }}>
                        <Text caption2>Nationality</Text>
                    </View>
                    <View
                        style={{ flex: 1, alignItems: "flex-end" }}
                    >
                        <Text caption1 grayColor>
                            {item.nationality}
                        </Text>
                    </View>
                </View>


            </View>
        } else {


            var paxs = [];
            var a = 1;
            dataDetail.detail[0].pax.map((item, index) => (
                paxs.push(
                    <View style={{ marginBottom: 10 }}>
                        <Text caption1 bold style={{ marginBottom: 5 }}>
                            {item.title}. {item.firstname}  {item.lastname}
                        </Text>
                        <View
                            style={{ flexDirection: "row", marginTop: 0 }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text caption2>Nationality</Text>
                            </View>
                            <View
                                style={{ flex: 1, alignItems: "flex-end" }}
                            >
                                <Text caption1 grayColor>
                                    {item.nationality}
                                </Text>
                            </View>
                        </View>


                    </View>
                )

            ))

        }


        var optionSelect = <View />
        if (product == 'Hotelpackage') {
            optionSelect = <View style={styles.blockView}>
                <Text caption2 style={{ marginBottom: 10 }}>
                    Room
                            </Text>
                <Text caption1 bold style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.detail_name} (x{dataDetail.detail[0].order.qty_room})
                            </Text>
                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.bed_type} - {dataDetail.detail[0].order.bath_type}
                </Text>

            </View>
        } else if (product == 'Hotel') {
            optionSelect = <View style={styles.blockView}>
                <Text caption2 style={{ marginBottom: 10 }}>
                    Room
                                </Text>
                <Text caption1 bold style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.room_type} ({dataDetail.detail[0].order.qty_room} unit) ({dataDetail.detail[0].order.night} night(s))
                                </Text>
                {/* <Text caption2 grayColor style={{ marginBottom: 5 }}>
                                {dataDetail.detail[0].order.bed_type} - {dataDetail.detail[0].order.bath_type} 
                                </Text>
                                 */}
            </View>
        }

        var desc = <View />
        var htmlContent = '';
        if (product == 'Activities') {
            htmlContent = dataDetail.detail[0].order.description
            //desc=<HTML source={{ html: htmlContent }} contentWidth={100} />
            // desc=<Text caption2 grayColor style={{ marginBottom: 5 }}>
            //                 {dataDetail.detail[0].order.description}
            //                 </Text>

        }

        var info = <View />
        if (product == 'Hotelpackage') {
            info = <View style={styles.blockView}>
                <Text caption2 style={{ marginBottom: 10 }}>
                    Info
                            </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Include
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.include}
                </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Term
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.term}
                </Text>

            </View>
        } else if (product == 'Trip') {
            info = <View style={styles.blockView}>
                <Text caption2 style={{ marginBottom: 10 }}>
                    Info
                            </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Include
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.include}
                </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Exclude
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.exclude}
                </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Term
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.term}
                </Text>

            </View>
        } else if (product == 'Activities') {
            info = <View style={styles.blockView}>
                <Text caption2 style={{ marginBottom: 10 }}>
                    Info
                            </Text>

                <Text caption1 bold style={{ marginBottom: 5 }}>
                    Description
                            </Text>

                <Text caption2 grayColor style={{ marginBottom: 5 }}>
                    {dataDetail.detail[0].order.description}
                </Text>


            </View>
        }











        if (product == 'Hotelpackage') {
            var productDetail = dataDetail.product_detail;
            var barcode = <Barcode value={'123'} format="CODE128" width={50} height={30} />
            var textLabel1 = 'EVoucher';
            var textLabel2 = 'Paket Hotel';



            var productDesc = <View
                style={{ flex: 1, flexDirection: 'column' }} >
                <Text caption2 bold>
                    {productDetail.hotelname}
                </Text>
                <Text caption1>
                    {productDetail.address},{productDetail.cityname},{productDetail.countryname}
                </Text>
            </View>


        } else if (product == 'Hotel') {
            var productDetail = dataDetail.product_detail;
            var barcode = <Barcode value={productDetail.referenceno} format="CODE128" width={1} height={30} />
            var refCode = <Text caption1 bold style={{ textAlign: 'center' }}>Ref Code : {dataDetail.detail[0]['order']['internalreference']}</Text>
            var voucherCode = <Text caption1 bold style={{ textAlign: 'center' }}>Voucher Code : {dataDetail.detail[0]['order']['referenceno']}</Text>
            var textLabel1 = 'EVoucher';
            var textLabel2 = 'Hotel';

            var productDesc = <View
                style={{ flex: 1, flexDirection: 'column' }} >
                <View style={{ flexDirection: 'row' }}>
                    <Text caption2 bold>
                        {productDetail.hotelname}
                    </Text>
                    <StarRating
                        disabled={true}
                        starSize={12}
                        maxStars={productDetail.rating}
                        rating={productDetail.rating}
                        //selectedStar={rating => {}}
                        fullStarColor={BaseColor.yellowColor}
                    />
                </View>
                <Text caption1>
                    {productDetail.address},{productDetail.cityname},{productDetail.countryname}
                </Text>
            </View>
        } else if (product == 'Trip') {
            var productDetail = dataDetail.product_detail;
            var barcode = <Barcode value={dataDetail.order_code} format="CODE128" width={1} height={30} />
            var refCode = <Text caption1 bold style={{ textAlign: 'center' }}>Ref Code : {dataDetail.order_code}</Text>
            var voucherCode = <Text caption1 bold style={{ textAlign: 'center' }}>Voucher Code :  {dataDetail.order_code}</Text>

            var textLabel1 = 'EVoucher';
            var textLabel2 = 'Trip';

            var productDesc = <View
                style={{ flex: 1, flexDirection: 'column' }} >
                <Text caption2 bold>
                    {productDetail.title_trip}
                </Text>
                <Text caption1>
                    {productDetail.country}
                </Text>
            </View>
        } else if (product == 'Activities') {
            var productDetail = dataDetail.product_detail;
            var barcode = <Barcode value={productDetail.activities_code} format="CODE128" width={1} height={30} />
            var refCode = <Text caption1 bold style={{ textAlign: 'center' }}>Ref Code : {dataDetail.order_code}</Text>
            var voucherCode = <Text caption1 bold style={{ textAlign: 'center' }}>Voucher Code : {dataDetail.detail[0]['order']['activities_code']}</Text>

            var textLabel1 = 'EVoucher';
            var textLabel2 = 'Aktifities';

            var productDesc = <View
                style={{ flex: 1, flexDirection: 'column' }} >
                <Text caption2 bold>
                    {productDetail.activities_name}
                </Text>
                <Text caption1>
                    {productDetail.address},{productDetail.cityname},{productDetail.countryname}
                </Text>
            </View>


        }


        var label = <View
            style={{ flex: 1, flexDirection: 'column', backgroundColor: BaseColor.primaryColor, padding: 5, justifyContent: "center", alignItems: "center", marginTop: 5 }} >
            <Text caption2 bold whiteColor>
                {textLabel1}
            </Text>
            <Text caption1 whiteColor>
                {textLabel2}
            </Text>
        </View>

        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: BaseColor.primaryColor }}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Evouchers"
                    // subTitle={'No.Order :'+this.state.dataBooking[0].order_code}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Icon
                                name="download"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        this.setState({ download: true });

                    }}
                />
                <ScrollView>

                    {
                        loading_spinner ?

                            <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 220,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >

                                    <AnimatedLoader
                                        visible={true}
                                        overlayColor="rgba(255,255,255,0.1)"
                                        source={require("app/assets/loader_paperline.json")}
                                        animationStyle={{ width: 300, height: 300 }}
                                        speed={1}
                                    />
                                    <Text>
                                        Connecting.. to Masterdiskon
                                    </Text>
                                </View>
                            </View>


                            :

                            <View style={{ flex: 1 }}>
                                <View style={{ padding: "1%" }}>

                                    {/* <Text style={{ color: "white", alignSelf: 'center', marginTop: "1%", fontSize: 16, textAlign: 'center' }}>Eticket {type} {'\n'} Order ID : {order_id_aero}</Text> */}
                                    <View style={{ marginVertical: "0%", paddingBottom: 10, marginHorizontal: "5%", backgroundColor: 'white', borderTopStartRadius: 16, borderTopEndRadius: 16, borderBottomStartRadius: 16, borderBottomEndRadius: 16, elevation: 10, }}>
                                        <View style={{ paddingHorizontal: 20 }}>

                                            <View
                                                style={{ flexDirection: "row", marginTop: 10 }}
                                            >
                                                <View style={{ flex: 4, flexDirection: 'row' }}>
                                                    <FastImage
                                                        style={{ width: '60%', height: 30 }}
                                                        source={{
                                                            uri: 'https://masterdiskon.com/assets/front/img/icon/masterdiskon_logo_big.png',
                                                            headers: { Authorization: 'someAuthToken' },
                                                            priority: FastImage.priority.normal,
                                                        }}
                                                        resizeMethod={'scale'}
                                                    >
                                                    </FastImage>
                                                </View>
                                                <View
                                                    style={{ flex: 6, alignItems: "flex-end" }}
                                                >
                                                    <Text caption2 bold style={{ textAlign: 'right' }}>
                                                        PT. Master Diskon Internasional
                                        </Text>
                                                    {/* <Text overline grayColor style={{textAlign:'right'}}>
                                        Jl. H Baping No 100,Ciracas, Jakarta Timur,
                                        </Text>
                                        <Text overline grayColor style={{textAlign:'right'}}>
                                        Jakarta, Indonesia, 13740
                                        </Text>
                                        <Text overline grayColor style={{textAlign:'right'}}>
                                        Email : ticket@masterdiskon.com
                                        </Text> */}
                                                </View>
                                            </View>
                                            {label}
                                            <View style={styles.blockView}>
                                                <Text caption2 style={{ marginBottom: 10 }}>
                                                    {dataDetail.product}
                                                </Text>
                                                {productDesc}
                                                {/* <Text caption1 bold>
                                    {productName}
                                    </Text> */}
                                                {/* <HTML source={{ html: htmlContent }} contentWidth={100} /> */}
                                                {/* <HTMLView
                                        value={htmlContent}
                                    /> */}

                                            </View>

                                            <View style={{ backgroundColor: 'white', paddingTop: "2%", paddingBottom: "2%", borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                                                <View style={{ height: 80, width: 300, alignSelf: 'center', }}>
                                                    {/* <Image source={require('../../../Image/barcode.png')} style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} /> */}
                                                    {refCode}
                                                    {barcode}
                                                    {voucherCode}
                                                </View>
                                            </View>
                                            {/* Code */}


                                            {/* <View style={styles.blockView}>
                                    
                                    <View
                                        style={{ flexDirection: "row", marginTop: 10 }}
                                    >
                                        <View style={{ flex: 1,alignItems: "flex-start"}}>
                                          <Barcode value={'123'} format="CODE128" />
                                        </View>
                                        <View
                                            style={{ flex: 1, alignItems: "flex-end" }}
                                        >
                                            <Barcode value={'123'} format="CODE128" />
                                        </View>
                                    </View>
                                </View> */}

                                            {scedules}
                                            {optionSelect}




                                            <View style={{ height: 30, justifyContent: 'center' }}>
                                                <View style={{
                                                    height: 15, justifyContent: 'center',
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1
                                                }}></View>
                                                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, left: -40, alignSelf: 'center', justifyContent: 'center' }}></View>
                                                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, right: -40, alignSelf: 'center', justifyContent: 'center' }}></View>
                                            </View>

                                            <View style={styles.blockView}>
                                                <Text caption2 style={{ marginBottom: 10 }}>
                                                    Contact’s Name
                                    </Text>
                                                <Text caption1 bold style={{ marginBottom: 5 }}>
                                                    {dataDetail.contact.contact_title}. {dataDetail.contact.contact_first}  {dataDetail.contact.contact_last}
                                                </Text>
                                                <View
                                                    style={{ flexDirection: "row", marginTop: 10 }}
                                                >
                                                    <View style={{ flex: 1 }}>
                                                        <Text caption2>Phone</Text>
                                                    </View>
                                                    <View
                                                        style={{ flex: 1, alignItems: "flex-end" }}
                                                    >
                                                        <Text caption1 grayColor>
                                                            ({dataDetail.contact.phone_code}) {dataDetail.contact.contact_phone}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View
                                                    style={{ flexDirection: "row", marginTop: 10 }}
                                                >
                                                    <View style={{ flex: 1 }}>
                                                        <Text caption2>Email</Text>
                                                    </View>
                                                    <View
                                                        style={{ flex: 1, alignItems: "flex-end" }}
                                                    >
                                                        <Text caption1 grayColor>
                                                            {dataDetail.contact.contact_email}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.blockView}>
                                                <Text caption2 style={{ marginBottom: 10 }}>
                                                    Pax / Guest
                                    </Text>
                                                {paxs}
                                            </View>
                                            {info}


                                        </View>
                                    </View>
                                </View>
                            </View>

                    }
                </ScrollView>
                {
                    this.state.download == true ?
                        <WebView style={{}} source={{ uri: this.state.filePdf }} />
                        :
                        <View />
                }
            </SafeAreaView>
        );
    }
}


