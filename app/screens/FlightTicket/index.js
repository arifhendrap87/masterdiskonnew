import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, FlightPlan, Tag, Image } from "@components";
import styles from "./styles";

import Timeline from 'react-native-timeline-flatlist';

export default class FlightTicket extends Component {
    constructor(props) {
        super(props);
        this.state={
            ticket:  {
                order_id: "0008520062600007",
                orders: [
                    {
                        product_id: 1,
                        product_name: "Flight",
                        items: [
                            {
                                transaction_id: "6a58bfcb-4066-49b1-944a-4373ef11db9a",
                                status: "Issued",
                                total_price: 740800.0,
                                date: "2020-06-26T08:14:22.329439",
                                time_limit: "2020-06-26T09:47:43",
                                notes: "Issued",
                                action: "N/A",
                                departure: {
                                    item_id: "2318f1f8-4032-454f-af9f-4546236115f4",
                                    origin: "CGK",
                                    origin_name: "Soekarno-Hatta International Airport",
                                    destination: "DPS",
                                    destination_name: "Ngurah Rai (Bali) International Airport",
                                    url_logo: "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                    airline: "CITILINK INDONESIA",
                                    airline_code: "QG",
                                    pnr: "NH2YWK",
                                    gmt_departure: "2020-06-27T14:40:00",
                                    gmt_arrival: "2020-06-27T17:00:00",
                                    departure_time: "21:40:00",
                                    arrival_time: "01:00:00",
                                    flight_segment: null,
                                    price_pax: [
                                        {
                                            pax_type: "ADT",
                                            count: 1,
                                            price: 740800.0
                                        },
                                        {
                                            pax_type: "ADT",
                                            count: 1,
                                            price: 740800.0
                                        }
                                    ],
                                    trans_information_details: [
                                        {
                                            cabinClass: "Economy",
                                            subClass: "N",
                                            paxName: "HamdansAwaludin",
                                            paxType: "Adult",
                                            ticketNumber: "QG31142504267",
                                            picEmail: "dahaaw@gmail.com",
                                            baggage: "20",
                                            requestStatus: false,
                                            insurance: false
                                        }
                                    ]
                                },
                                returns: {
                                    item_id: "dfd3a936-ef2d-4581-9422-6917d19bec0f",
                                    origin: "DPS",
                                    origin_name: "Ngurah Rai (Bali) International Airport",
                                    destination: "CGK",
                                    destination_name: "Soekarno-Hatta International Airport",
                                    url_logo: "https://megaelectra-dev.oss-ap-southeast-5.aliyuncs.com/83493b9f-84ee-4c46-9408-7ef9aca29442.logo",
                                    airline: "CITILINK INDONESIA",
                                    airline_code: "QG",
                                    pnr: "FGGR6H",
                                    gmt_departure: "2020-06-30T06:40:00",
                                    gmt_arrival: "2020-06-30T08:30:00",
                                    departure_time: "14:40:00",
                                    arrival_time: "15:30:00",
                                    flight_segment: null,
                                    price_pax: [
                                        {
                                            pax_type: "ADT",
                                            count: 1,
                                            price: 2694800.0
                                        },
                                        {
                                            pax_type: "CHD",
                                            count: 1,
                                            price: 2694800.0
                                        },
                                        {
                                            pax_type: "ADT",
                                            count: 1,
                                            price: 2694800.0
                                        },
                                        {
                                            pax_type: "CHD",
                                            count: 1,
                                            price: 2694800.0
                                        }
                                    ],
                                    trans_information_details: [
                                        {
                                            cabinClass: "Economy",
                                            subClass: "N",
                                            paxName: "MataDesain",
                                            paxType: "Adult",
                                            ticketNumber: "QG31759721309",
                                            picEmail: "matadesaindotcom@gmail.com",
                                            baggage: "20",
                                            requestStatus: false,
                                            insurance: false
                                        },
                                        {
                                            cabinClass: "Economy",
                                            subClass: "N",
                                            paxName: "aasdjhkjk",
                                            paxType: "Child",
                                            ticketNumber: "QG73669526328",
                                            picEmail: "matadesaindotcom@gmail.com",
                                            baggage: "20",
                                            requestStatus: false,
                                            insurance: false
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                ],
                action: "N/A"
            }
        }
    }

    render() {
        const { navigation } = this.props;
        const {ticket}=this.state;
        var bookingCode=ticket.orders[0].items[0].departure.pnr;
        var departure=ticket.orders[0].items[0].departure;
        var returns=ticket.orders[0].items[0].returns;
        var passanger=ticket.orders[0].items[0].departure.trans_information_details;
        var orderId=ticket.order_id;
        var items=ticket.orders[0].items[0];
        
        var timelineDeparture=[
            {time: departure.departure_time, title: departure.origin_name+'('+departure.origin+')', description: null},
            {time: departure.arrival_time, title: departure.destination_name+'('+departure.destination+')', description: null},
          ]
        
        
        
        contentDeparture=<View></View>
        contentDeparture=<View>
                            <View style={{ flexDirection: "row"}}>
                                <View style={{ flex: 1 }}>

                                    <Text caption1 light>
                                        {departure.airline} {departure.airline_code}
                                    </Text>
                                    <Image source={{uri: departure.url_logo}} style={{width: 100,height: 50,borderRadius: 25}} resizeMode="contain"/>

                                    <Text caption1 light>
                                        Class {departure.trans_information_details[0].cabinClass}
                                    </Text>
                                   
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text caption1 light>
                                        booking Code
                                    </Text>
                                    <Text caption1 style={{ marginTop: 5 }}>
                                        {departure.pnr}
                                    </Text>
                                    <Text caption1 style={{ marginTop: 5 }}>
                                        {items.status}
                                    </Text>
                                    
                                </View>
                            </View>
                            
                            
                            <View style={{ flexDirection: "row",marginTop:25}}>
                               
                                <View style={{ flex: 1 }}>
                                    <Text caption1 style={{ marginTop: 5 }}>
                                        {departure.gmt_departure}
                                    </Text>
                                    <Timeline
                                      data={timelineDeparture}
                                    />
                                </View>
                            </View>
                        </View>
        
        var contentReturns=<View></View>
        if(returns != null){
            contentReturns=<View>
            <View style={{ flexDirection: "row"}}>
                <View style={{ flex: 1 }}>

                    <Text caption1 light>
                        {returns.airline} {returns.airline_code}
                    </Text>
                    <Image source={{uri: returns.url_logo}} style={{width: 100,height: 50,borderRadius: 25}} resizeMode="contain"/>

                    <Text caption1 light>
                        Class {returns.trans_information_details[0].cabinClass}
                    </Text>
                   
                </View>
                <View style={{ flex: 1 }}>
                    <Text caption1 light>
                        booking Code
                    </Text>
                    <Text caption1 style={{ marginTop: 5 }}>
                        {returns.pnr}
                    </Text>
                    <Text caption1 style={{ marginTop: 5 }}>
                        {items.status}
                    </Text>
                    
                </View>
            </View>
            
            
            <View style={{ flexDirection: "row",marginTop:25}}>
               
                <View style={{ flex: 1 }}>
                    <Text caption1 style={{ marginTop: 5 }}>
                        {returns.gmt_departure}
                    </Text>
                    <Timeline
                      data={timelineDeparture}
                    />
                </View>
            </View>
        </View>
        }
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Ticket"
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
                    <View style={styles.contain}>
                        <View style={styles.classContent}>
                            <Tag outline round>
                                {'ID : #'+orderId}
                            </Tag>
                        </View>
                        {/* <FlightPlan
                            round={false}
                            fromCode="SIN"
                            toCode="SYD"
                            from="Singapore"
                            to="Sydney"
                        /> */}
                        {/* <View style={styles.line} /> */}
                        {/* <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Passenger
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    Steve Garrett
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Date
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    Thu, 15 Aug 09
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25 }}>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Flight
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    SIN1009
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Gate
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    22A
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25 }}>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Class
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    Economic Class
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text caption1 light>
                                    Seat
                                </Text>
                                <Text caption1 style={{ marginTop: 5 }}>
                                    21D
                                </Text>
                            </View>
                        </View> */}
                        
                        {contentDeparture}
                        {contentReturns}
                        <View style={styles.line} />
                        <View style={styles.code}>
                            <Text header whiteColor>
                                {bookingCode}
                            </Text>
                        </View>
                        <Text
                            caption1
                            light
                            style={{ textAlign: "center", marginTop: 15 }}
                        >
                            0944 0923 1238 9801
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
