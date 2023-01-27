/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Animated, Dimensions, ActivityIndicator, TouchableOpacity, StyleSheet, AsyncStorage, Image, BackHandler } from "react-native";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util'
// import TicketModal from "react-native-ticket-modal";
import { BaseStyle, BaseColor, Images } from "@config";
import Barcode from "react-native-barcode-builder";
import { PostDataNew } from '../../services/PostDataNew';
import AnimatedLoader from "react-native-animated-loader";
import Timeline from 'react-native-timeline-flatlist';
import FastImage from 'react-native-fast-image';
import { WebView } from 'react-native-webview';


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
        var dataFlight = "";
        if (this.props.navigation.state.params.dataFlight) {
            dataFlight = this.props.navigation.state.params.dataFlight;
        }


        var order_id_aero = "";
        if (this.props.navigation.state.params.order_id_aero) {
            order_id_aero = this.props.navigation.state.params.order_id_aero;
        }


        var type = '';
        if (this.props.navigation.state.params.type) {
            type = this.props.navigation.state.params.type;
        }


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
            console.log('dataDetail', JSON.stringify(dataDetail));
        }

        if (type == 'Departure') {
            var flightSchedule = dataDetail.detail[0]['order_detail'][0]['flight_schedule'];

        } else if (type = 'Return') {
            var flightSchedule = dataDetail.detail[0]['order_detail'][1]['flight_schedule'];

        }

        var data_timeline = [];
        var a = 0;
        for (const item of flightSchedule) {
            data_timeline.push(this.timeline_from(item));
            data_timeline.push(this.timeline_to(item));

        }

        //var filePdf='https://masterdiskon.com/assets/upload/order/'+dataDetail.product.toLowerCase()+'/'+dataDetail.order.evoucher_upload;
        var filePdf = 'https://masterdiskon.com/front/order/evoucher/detail/' + dataDetail.id_order;



        this.state = {
            dataFlight: dataFlight,
            order_id_aero: order_id_aero,
            type: type,

            dataDetail: dataDetail,
            param: param,
            config: config,
            download: false,
            filePdf: filePdf,

            flightSchedule: flightSchedule,
            data_timeline: data_timeline
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


    timeline_from(item) {
        var imageUrl = '';
        if (item.airline_code == 'GA') {
            imageUrl = 'https:' + item.airline_logo;
        } else {
            imageUrl = item.airline_logo;
        }

        var data = {
            time: item.departure_time,
            title: item.origin_id,
            operation: 'Dioperasikan oleh ' + item.airline_name,
            description: 'Departure at :' + this.convertDateText(item.departure_date) + ' ' + item.departure_time,
            lineColor: '#009688',
            icon: Images.dot,
            imageUrl: imageUrl,
            type: 'from'
        }
        return data;

    }


    timeline_to(item) {
        var imageUrl = '';
        if (item.airline_code == 'GA') {
            imageUrl = 'https:' + item.airline_logo;
        } else {
            imageUrl = item.airline_logo;
        }
        var data = {
            time: item.arrival_time,
            title: item.destination_id,
            operation: '',
            description: 'Arrive at :' + this.convertDateText(item.arrival_date) + ' ' + item.arrival_time,
            icon: Images.dot,
            imageUrl: item.airline_logo,
            type: 'to'
        }
        return data
    }

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null;

        if (rowData.type == 'from') {
            if (rowData.description && rowData.imageUrl)
                desc = (
                    <View style={styles.descriptionContainer}>
                        <Image source={{ uri: rowData.imageUrl }} style={styles.image} resizeMode="contain" />
                        <Text caption1 style={[styles.textDescription]}>{rowData.description}</Text>
                        <Text caption1 style={[styles.textDescription]}>{rowData.operation}</Text>
                    </View>
                )
        } else {
            desc = (
                <View style={styles.descriptionContainer}>
                    <Text caption1 style={{ marginLeft: 0, color: 'black' }}>{rowData.description}</Text>
                </View>
            )
        }



        var baggage = '0';
        if (rowData.type == 'from') {
            baggage = rowData.baggage;
        }

        var meal = 'No';
        if (rowData.type == 'from') {
            if (rowData.meal != '0') {
                meal = 'Yes';
            }
        }


        var entertainment = 'No';
        if (rowData.type == 'from') {
            if (rowData.entertainment == 'true') {
                entertainment = 'Yes';
            }
        }


        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        )
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
        //this.checkBooking(order_id_aero);
    }

    checkBooking(order_code) {
        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {


                    let config = JSON.parse(result);
                    var access_token = config.token;
                    var url = config.aeroUrl;

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Authorization", "Bearer " + access_token);


                    var raw = JSON.stringify();
                    var requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    PostDataNew(url, 'crm/MyOrder/v3/' + order_code, requestOptions)
                        .then((result) => {
                            console.log("---------------checkBooking  ------------");
                            console.log(JSON.stringify(result));
                            this.setState({ loading_spinner: false });

                            if (this.state.type == 'Departure') {
                                this.setState({ dataFlight: result.data.orders[0].items[0].departure });
                            } else {
                                this.setState({ dataFlight: result.data.orders[0].items[0].returns });
                            }


                        },
                            (error) => {
                                this.setState({ error });
                            }
                        );




                }
            });
        });
    }

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


        var fieldsArray = [];
        dataFlight.trans_information_details.map(item => {
            fieldsArray.push(
                <View style={{ paddingHorizontal: "8%", marginTop: '2%' }}>
                    <Text>{item.paxName} ({item.paxType}) - {item.cabinClass}({item.subClass})</Text>
                    <Text>Ticket : {item.ticketNumber}</Text>
                </View>
            );
        });

        var productName = '';
        productName = dataDetail.product_name + ' ( ' + type + ' )';



        var scedules = <View />
        if (this.state.type == 'Departure') {
            scedules = <View style={{ paddingVertical: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <View>
                        <Text caption2>Departure - Booking Code ({dataDetail.detail[0].order_detail[0].booking_code})</Text>
                        <Text caption1 bold style={{ marginBottom: 5 }}>
                            {dataDetail.detail[0].order_detail[0].airline_code}-{dataDetail.detail[0].order_detail[0].airline_name}
                        </Text>
                    </View>

                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <View
                            style={{ flex: 1, alignItems: "flex-start" }}
                        >
                            <Text caption2 bold>
                                {this.convertDateText(dataDetail.detail[0].order_detail[0].departure_date)}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].departure_time}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].origin_airport.name}
                            </Text>
                            <Text caption1 bold>
                                ({dataDetail.detail[0].order_detail[0].origin_id})
                                        </Text>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: "flex-end" }}
                        >
                            <Text caption2 bold>
                                {this.convertDateText(dataDetail.detail[0].order_detail[0].arrival_date)}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].arrival_time}
                            </Text>
                            <Text caption2 bold style={{ textAlign: 'right' }}>
                                {dataDetail.detail[0].order_detail[0].destination_airport.name}
                            </Text>
                            <Text caption1 bold>
                                ({dataDetail.detail[0].order_detail[0].destination_id})
                                        </Text>
                        </View>
                    </View>
                </View>
            </View>
        } else {
            scedules = <View style={{ paddingVertical: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <View>
                        <Text caption2>Return - Booking Code ({dataDetail.detail[0].order_detail[1].booking_code})</Text>
                        <Text caption1 bold style={{ marginBottom: 5 }}>
                            {dataDetail.detail[0].order_detail[1].airline_code}-{dataDetail.detail[0].order_detail[1].airline_name}
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <View
                            style={{ flex: 1, alignItems: "flex-start" }}
                        >
                            <Text caption2 bold>
                                {this.convertDateText(dataDetail.detail[0].order_detail[1].departure_date)}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[1].departure_time}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[1].origin_airport.name}
                            </Text>
                            <Text caption1 grayColor>
                                {dataDetail.detail[0].order_detail[1].origin_id}
                            </Text>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: "flex-end" }}
                        >
                            <Text caption2 bold>
                                {this.convertDateText(dataDetail.detail[0].order_detail[1].arrival_date)}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[1].arrival_time}
                            </Text>
                            <Text caption2 bold style={{ textAlign: 'right' }}>
                                {dataDetail.detail[0].order_detail[1].destination_airport.name}
                            </Text>
                            <Text caption1 grayColor>
                                {dataDetail.detail[0].order_detail[1].destination_id}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        }


        var paxs = []
        dataDetail.detail[0].pax.map((item, index) => (
            paxs.push(
                <View>
                    <Text caption1 bold style={{ marginBottom: 5 }}>
                        {item.title}. {item.first_name}  {item.last_name}
                    </Text>
                    <View
                        style={{ flexDirection: "row", marginTop: 10 }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text caption2>Nationality</Text>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: "flex-end" }}
                        >
                            <Text caption1 grayColor>
                                {item.nationality_name}
                            </Text>
                        </View>
                    </View>


                </View>
            )
        ))

        var label = <View
            style={{ flex: 1, flexDirection: 'column', backgroundColor: BaseColor.primaryColor, padding: 5, justifyContent: "center", alignItems: "center", marginTop: 5 }} >
            <Text caption2 bold whiteColor>
                Eticket
                </Text>
            <Text caption1 whiteColor>
                Flight
                </Text>
        </View>

        var productDetail = dataDetail.product_detail;
        var barcode = <Barcode value={dataFlight.pnr} format="CODE128" height={30} />

        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: BaseColor.primaryColor }}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Evoucher"
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

                                    <View style={{ marginVertical: "0%", paddingBottom: 10, marginHorizontal: "5%", backgroundColor: 'white', borderTopStartRadius: 16, borderTopEndRadius: 16, borderBottomStartRadius: 16, borderBottomEndRadius: 16, elevation: 10, }}>
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <View
                                                style={{ flexDirection: "row", marginTop: 10 }}
                                            >
                                                <View style={{ flex: 4, flexDirection: 'row' }}>
                                                    <FastImage
                                                        style={{ width: '65%', height: 30 }}
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
                                                    style={{ flex: 8, alignItems: "flex-end" }}
                                                >
                                                    <Text caption2 bold>
                                                        PT. Master Diskon Internasional
                                        </Text>
                                                    {/* <Text overline grayColor>
                                        Jl. H Baping No 100,Ciracas, Jakarta Timur,
                                        </Text>
                                        <Text overline grayColor>
                                        Jakarta, Indonesia, 13740
                                        </Text>
                                        <Text overline grayColor>
                                        Email : ticket@masterdiskon.com
                                        </Text> */}
                                                </View>
                                            </View>
                                            {label}

                                            <View style={styles.blockView}>
                                                <Text caption2 style={{ marginBottom: 10 }}>
                                                    {dataDetail.product}
                                                </Text>
                                                <Text caption1 bold>
                                                    {productName}
                                                </Text>
                                            </View>

                                            <View style={{ backgroundColor: 'white', paddingTop: "2%", paddingBottom: "2%", borderTopStartRadius: 16, borderTopEndRadius: 16 }}>
                                                <View style={{ height: 50, width: 150, alignSelf: 'center', }}>

                                                    {/* <Barcode value={dataFlight.pnr} format="CODE128" /> */}
                                                    {barcode}
                                                    <Text caption1 bold style={{ textAlign: 'center' }}>PNR CODE : {dataFlight.pnr}</Text>
                                                </View>
                                            </View>
                                            {/* Code */}

                                            {scedules}
                                            <View style={{ height: 30, justifyContent: 'center' }}>
                                                <View style={{
                                                    height: 15, justifyContent: 'center',
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1
                                                }}></View>
                                                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, left: -40, alignSelf: 'center', justifyContent: 'center' }}></View>
                                                <View style={{ height: 30, width: 30, borderRadius: 200, backgroundColor: BaseColor.primaryColor, position: 'absolute', top: 8, bottom: 0, right: -40, alignSelf: 'center', justifyContent: 'center' }}></View>
                                            </View>

                                            {product == 'Flight' ?
                                                <View>
                                                    <Timeline
                                                        data={this.state.data_timeline}
                                                        circleSize={20}
                                                        circleColor={BaseColor.primaryColor}
                                                        lineColor={BaseColor.primaryColor}
                                                        timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
                                                        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                                                        descriptionStyle={{ color: 'gray' }}
                                                        options={{
                                                            style: { paddingTop: 5 }
                                                        }}
                                                        onEventPress={this.onEventPress}
                                                        renderDetail={this.renderDetail}
                                                    />
                                                </View>
                                                : <View />
                                            }

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


