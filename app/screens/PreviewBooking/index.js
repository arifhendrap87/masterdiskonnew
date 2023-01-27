import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, Image } from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import Timeline from 'react-native-timeline-flatlist';
// import HTMLView from 'react-native-htmlview';



export default class PreviewBooking extends Component {
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
        console.log('dataDetail', JSON.stringify(dataDetail));


        var select = {
            "num": "1",
            "nums": 1,
            "data_type": "real",
            "filter_price": 2297100,
            "filter_airline_code": "GA",
            "filter_transit": 0,
            "filter_entertainment": false,
            "filter_baggage": "20",
            "filter_meal": "1",
            "filter_departure_time": 15,
            "filter_departure_time_num": 1410,
            "filter_arrival_time": 19,
            "filter_arrival_time_num": 1840,
            "filter_seat_vailable": "9",
            "filter_origin": "CGK",
            "filter_destination": "DPS",
            "filter_duration": 210,
            "price": {
                "type": "",
                "segment": "",
                "total_price": 2297100,
                "nett_price": 2297100,
                "commission_percent": 0,
                "commission_amount": 0,
                "insurance_code": "CIU",
                "insurance_name": "CIU Insurance",
                "insurance_company": "PT Citra International Underwriters",
                "insurance_program": "Protection",
                "insurance_fee": 20500,
                "insurance_total": 20500,
                "transaction_fee": 0,
                "detail_price": [
                    {
                        "commission": 0,
                        "nett": 2297100,
                        "markup": 0,
                        "markdown": 0,
                        "insurance_fee": 20500,
                        "transaction_fee": 0,
                        "markup_detail": [],
                        "markdown_detail": [],
                        "tax": [],
                        "pax_type": "ADT",
                        "pax_count": 1,
                        "price": 1961000,
                        "total_tax": 336100,
                        "total": 2297100
                    }
                ]
            },
            "international": false,
            "combinable": true,
            "match_id": "-",
            "supplier_id": 1,
            "airline_id": 1,
            "validating_carrier": "GA",
            "from": "CGK",
            "to": "DPS",
            "adult": 1,
            "child": 0,
            "infant": 0,
            "currency": "IDR",
            "price_type": "E",
            "flight_schedule": [
                {
                    "from_city": "Jakarta",
                    "from_country": "Indonesia",
                    "from_country_code": "ID",
                    "to_city": "Yogyakarta",
                    "to_country": "Indonesia",
                    "to_country_code": "ID",
                    "supplier_id": 1,
                    "supplier_code": "GA",
                    "departure_timezone": 7,
                    "arrival_timezone": 7,
                    "gmt_departure": "2021-01-16T07:10:00",
                    "gmt_arrival": "2021-01-16T08:30:00",
                    "duration": 80,
                    "airline_id": 1,
                    "airline_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/65e8199b-9ba9-4991-982b-29e2429b38e6.logo",
                    "cabin_baggage": 7,
                    "inflight_entertainment": false,
                    "service_type": null,
                    "toc_url": "https://www.garuda-indonesia.com/id/en/contact/term-condition.page?",
                    "from": "CGK",
                    "from_name": "Bandar Udara Internasional Soekarno Hatta",
                    "from_terminal_id": "3",
                    "to": "YIA",
                    "to_name": "Bandar Udara Internasional Kulon Progo",
                    "to_terminal_id": "",
                    "cabin": "E",
                    "airline_name": "GARUDA INDONESIA",
                    "airline_code": "GA",
                    "flight_code": "GA 212",
                    "flight_number": "212",
                    "departure_date": "2021-01-16",
                    "departure_time": "14:10",
                    "arrival_date": "2021-01-16",
                    "arrival_time": "15:30",
                    "baggage": "20",
                    "meal": "1",
                    "seat_available": "9",
                    "class": "Y",
                    "key": "1610445242|2vby6s9Fd1eR5JUoiy6SWUv88vUKvwrrTCv51ByE9Vdy4vifg6cTqkLDXQrJ748vxTtvFZyd~#GA~ 212~ ~~CGK~01/16/2021 14:10~YIA~01/16/2021 15:30~|1111MZBDAwnPpTvgkU9pDJsRgj4zjkJxZHe8Z9p5XZ1xHqgTrPiGZM6hzzUDnkSoXfHcqmJ~"
                },
                {
                    "from_city": "Yogyakarta",
                    "from_country": "Indonesia",
                    "from_country_code": "ID",
                    "to_city": "Bali",
                    "to_country": "Indonesia",
                    "to_country_code": "ID",
                    "supplier_id": 1,
                    "supplier_code": "GA",
                    "departure_timezone": 7,
                    "arrival_timezone": 8,
                    "gmt_departure": "2021-01-16T09:20:00",
                    "gmt_arrival": "2021-01-16T10:40:00",
                    "duration": 80,
                    "airline_id": 1,
                    "airline_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/65e8199b-9ba9-4991-982b-29e2429b38e6.logo",
                    "cabin_baggage": 7,
                    "inflight_entertainment": false,
                    "service_type": null,
                    "toc_url": "https://www.garuda-indonesia.com/id/en/contact/term-condition.page?",
                    "from": "YIA",
                    "from_name": "Bandar Udara Internasional Kulon Progo",
                    "from_terminal_id": "",
                    "to": "DPS",
                    "to_name": "Ngurah Rai (Bali) International Airport",
                    "to_terminal_id": "D",
                    "cabin": "E",
                    "airline_name": "GARUDA INDONESIA",
                    "airline_code": "GA",
                    "flight_code": "GA 252",
                    "flight_number": "252",
                    "departure_date": "2021-01-16",
                    "departure_time": "16:20",
                    "arrival_date": "2021-01-16",
                    "arrival_time": "18:40",
                    "baggage": "20",
                    "meal": "1",
                    "seat_available": "9",
                    "class": "Y",
                    "key": "1610445242|2vby6s9Fd1eR5JUoiy6SWUv88vUKvwrrTCv51ByE9Vdy4vifg6cTqkLDXQrJ748vxTtvFZyd~#GA~ 252~ ~~YIA~01/16/2021 16:20~DPS~01/16/2021 18:40~|1111MZBDAwnPpTvgkU9pDJsRgj4zjkJxZHe8Z9p5XZ1xHqgTrPiGZM6hzzUDnkSoXfHcqmJ~"
                }
            ],
            "supplier_code": "GA",
            "airline_code": "GA",
            "reference": "13eecff5-5051-41cd-9946-23d05a8e0092",
            "subclasses": false,
            "airline_name": "GARUDA INDONESIA",
            "airline_logo": "https://megaelectra-dev-new.oss-ap-southeast-5.aliyuncs.com/65e8199b-9ba9-4991-982b-29e2429b38e6.logo",
            "departure_date": "2021-01-16",
            "departure_time": "14:10",
            "departure_timezone": "7",
            "gmt_departure": "2021-01-16T07:10:00",
            "arrival_date": "2021-01-16",
            "arrival_time": "18:40",
            "arrival_timezone": "8",
            "gmt_arrival": "2021-01-16T10:40:00",
            "duration": 210,
            "transit": 0,
            "from_name": "Bandar Udara Internasional Soekarno Hatta",
            "from_city": "Jakarta",
            "from_country": "Indonesia",
            "from_country_code": "ID",
            "to_name": "Ngurah Rai (Bali) International Airport",
            "to_city": "Bali",
            "to_country": "Indonesia",
            "to_country_code": "ID",
            "price_custom": 2297100
        }

        console.log('FlightDetail', JSON.stringify(select));
        var detailPrice = select.price.detail_price;
        var price = select.price;





        var data_timeline = [];
        var a = 0;
        for (const item of select.flight_schedule) {
            // if(item.selected==true){
            //     filterTransits.push(item.id);
            // }
            data_timeline.push(this.timeline_from(item));
            data_timeline.push(this.timeline_to(item));


        }




        this.state = {
            dataDetail: dataDetail,
            param: param,
            config: config,

            select: select,
            detailPrice: detailPrice,
            price: price,
            data_timeline: data_timeline
        };



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
            title: item.from + ' - ' + item.from_name,
            operation: 'Dioperasikan oleh ' + item.airline_name,
            description: 'Departure at :' + item.departure_date + ' ' + item.departure_time,
            lineColor: '#009688',
            icon: Images.dot,
            imageUrl: imageUrl,
            entertainment: item.inflight_entertainment,
            baggage: item.baggage,
            meal: item.meal,
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
            title: item.to + ' - ' + item.to_name,
            operation: '',
            description: 'Arrive at :' + item.arrival_date + ' ' + item.arrival_time,
            icon: Images.dot,
            imageUrl: item.airline_logo,
            entertainment: item.inflight_entertainment,
            baggage: item.baggage,
            meal: item.meal,
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
                        <Text style={[styles.textDescription]}>{rowData.description}</Text>
                        <Text style={[styles.textDescription]}>{rowData.operation}</Text>
                    </View>
                )
        } else {
            desc = (
                <View style={styles.descriptionContainer}>
                    <Text style={{ marginLeft: 0, color: 'black' }}>{rowData.description}</Text>
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


        var facility = null;
        if (rowData.type == 'from') {

            facility = <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={styles.contentFilter}
                >
                    <Icon
                        name="suitcase"
                        size={16}
                        color={BaseColor.grayColor}
                        solid
                    />
                    <Text caption1 grayColor style={{ marginLeft: 5 }}>
                        : {baggage} kg
                    </Text>

                </View>

                <View style={styles.line} />

                <View
                    style={styles.contentFilter}
                >
                    <Icon
                        name="hamburger"
                        size={16}
                        color={BaseColor.grayColor}
                        solid
                    />
                    <Text caption1 grayColor style={{ marginLeft: 5 }}>
                        : {meal}
                    </Text>

                </View>

                <View style={styles.line} />

                <View
                    style={styles.contentFilter}
                >
                    <Icon
                        name="film"
                        size={16}
                        color={BaseColor.grayColor}
                        solid
                    />
                    <Text caption1 grayColor style={{ marginLeft: 5 }}>
                        : {entertainment}
                    </Text>

                </View>
            </View>
        }

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
                {facility}
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


    render() {
        const { navigation } = this.props;
        const { dataDetail } = this.state;
        var product = dataDetail.product;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));



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
                            {dataDetail.detail[0].order.start_date}
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
                            {dataDetail.detail[0].order.start_date}
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
                            {dataDetail.detail[0].order.end_date}
                        </Text>

                    </View>
                </View>
            </View>
        } else if (product == 'Flight') {

            scedules = <View style={styles.blockView}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text caption2>Departure - Booking Code ({dataDetail.detail[0].order_detail[0].booking_code})</Text>
                        <Text caption1 bold style={{ marginBottom: 5 }}>
                            {dataDetail.detail[0].order_detail[0].airline_code}-{dataDetail.detail[0].order_detail[0].airline_name}
                        </Text>
                    </View>

                    <View
                        style={{ flexDirection: "row", }}
                    >
                        <View
                            style={{ flex: 1, alignItems: "flex-start" }}
                        >
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].departure_date}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].departure_time}
                            </Text>
                            <Text caption1 grayColor>
                                {dataDetail.detail[0].order_detail[0].origin_id}
                            </Text>
                        </View>
                        <View
                            style={{ flex: 1, alignItems: "flex-end" }}
                        >
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].arrival_date}
                            </Text>
                            <Text caption2 bold>
                                {dataDetail.detail[0].order_detail[0].arrival_time}
                            </Text>
                            <Text caption1 grayColor>
                                {dataDetail.detail[0].order_detail[0].destination_id}
                            </Text>
                        </View>
                    </View>
                </View>


                {
                    dataDetail.detail[0].type == 'Return'
                        ?
                        <View>
                            <View style={{ flex: 1 }}>
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
                                        {dataDetail.detail[0].order_detail[1].departure_date}
                                    </Text>
                                    <Text caption2 bold>
                                        {dataDetail.detail[0].order_detail[1].departure_time}
                                    </Text>
                                    <Text caption1 grayColor>
                                        {dataDetail.detail[0].order_detail[1].origin_id}
                                    </Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text caption2 bold>
                                        {dataDetail.detail[0].order_detail[1].arrival_date}
                                    </Text>
                                    <Text caption2 bold>
                                        {dataDetail.detail[0].order_detail[1].arrival_time}
                                    </Text>
                                    <Text caption1 grayColor>
                                        {dataDetail.detail[0].order_detail[1].destination_id}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View />

                }
            </View>
        }




        if (product == 'Flight') {
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
        } else {

            var paxs = [];
            var a = 1;

            if (dataDetail.detail.length != 0) {
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


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Preview Booking"
                    subTitle={'No. Order : ' + dataDetail.order_code}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={styles.blockView}>
                            <Text caption2 style={{ marginBottom: 10 }}>
                                {dataDetail.product}
                            </Text>
                            <Text caption1 bold>
                                {dataDetail.product_name}
                            </Text>
                            {/* <HTML source={{ html: htmlContent }} contentWidth={100} /> */}
                            {/* <HTMLView
                                value={htmlContent}
                            /> */}

                        </View>
                        {scedules}
                        {optionSelect}


                        {/* { product =='Flight' ?
                        <View style={styles.blockView}>
                            <Timeline 
                                //style={styles.list}
                                data={this.state.data_timeline}
                                circleSize={20}
                                circleColor={BaseColor.primaryColor}
                                lineColor={BaseColor.primaryColor}
                                timeContainerStyle={{minWidth:52, marginTop: 0}}
                                timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                                descriptionStyle={{color:'gray'}}
                                options={{
                                style:{paddingTop:5}
                                }}
                                //innerCircle={'icon'}
                                onEventPress={this.onEventPress}
                                renderDetail={this.renderDetail}
                            />
                        </View>
                        : <View />
                        } */}

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

                        <View style={{ paddingVertical: 10 }}>
                            <Text caption2 style={{ marginBottom: 10 }}>
                                Price Details
                            </Text>


                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text caption1 bold>Subtotal</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text caption2 bold primaryColor>
                                        Rp {priceSplitter(dataDetail.subtotal)}
                                    </Text>
                                </View>
                            </View>


                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text caption1 bold>Pajak</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text caption2 bold primaryColor>
                                        Include
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text caption1 bold>Fee</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text caption2 bold primaryColor>
                                        Rp {
                                            dataDetail.fee == 0 ?
                                                '-'
                                                :
                                                priceSplitter(dataDetail.fee)
                                        }
                                    </Text>
                                </View>
                            </View>


                            <View
                                style={{ flexDirection: "row", marginTop: 10 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text caption1 bold>Total</Text>
                                </View>
                                <View
                                    style={{ flex: 1, alignItems: "flex-end" }}
                                >
                                    <Text caption2 bold primaryColor>
                                        Rp {priceSplitter(dataDetail.total_price)}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
}
