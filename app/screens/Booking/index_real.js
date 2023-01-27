import React, { Component } from "react";
import { RefreshControl, FlatList, AsyncStorage, StatusBar } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Tag, Text } from "@components";
import { View } from "react-native-animatable";
import AnimatedLoader from "react-native-animated-loader";

import styles from "./styles";
import { DataBooking } from "@data";

import DataEmpty from "../../components/DataEmpty";
import NotYetLogin from "../../components/NotYetLogin";
import CardCustomBooking from "../../components/CardCustomBooking";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login: false,
            dataBooking: DataBooking,
            statuses: [
                { id: "1", name: "New Order", checked: true },
                { id: "3", name: "Processed" },
                { id: "5", name: "Paid" },
                { id: "7", name: "Booked" },
                { id: "9", name: "Complete" },
                { id: "11", name: "Canceled" },
                { id: "13", name: "Expired" },
                { id: "15", name: "Billed" },
                { id: "17", name: "Deny" },
                { id: "19", name: "Error" },
                { id: "21", name: "Dropped" },
                { id: "23", name: "Refunded" }
            ],
            idParam: "1",
            id_user: "1",
            loadingSpinner: true,
            userSession: null

        };
        this.getConfigApi();
        this.getConfig();
        this.getSession();
    }

    getConfigApi() {
        AsyncStorage.getItem('configApi', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ configApi: config });
            }
        });
    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }

    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('getSession', JSON.stringify(userSession));

                if (userSession.hasOwnProperty('password') == true) {
                    console.log('password', userSession.hasOwnProperty('password'));
                    var id_user = userSession.id_user;
                    //this.setState({ loadingSpinner: false });
                    this.setState({ login: true });
                    this.setState({ id_user: id_user });
                    this.setState({ userSession: userSession });
                } else {
                    this.setState({ loadingSpinner: false });
                    this.setState({ login: false });
                }

            } else {
                this.setState({ loadingSpinner: false });
            }
        });
    }





    // fetch_num() {
    //     const { login, userSession, idParam } = this.state;

    //     if (userSession != null) {



    //         let config = this.state.configApi;
    //         let baseUrl = config.baseUrlx;
    //         let url = baseUrl + 'front/api_new/order/get_booking_history_num';
    //         console.log('configApi', JSON.stringify(config));
    //         console.log('urlss', url);

    //         var id_user = userSession.id_user;

    //         // var url=config.baseUrlx;
    //         // var path='front/api_new/order/get_booking_history_num';

    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");

    //         if (login == true) {
    //             var param = { "param": { "id": id_user, "id_order": "", "id_order_status": "", "product": "" } };
    //             var raw = JSON.stringify(param);
    //         } else {
    //             var param = { "param": { "id": "1", "id_order": "", "id_order_status": "", "product": "" } };
    //             var raw = JSON.stringify(param);
    //         }


    //         var requestOptions = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };
    //         fetch(url, requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 var arr_num = result;
    //                 var statuses = [
    //                     { id: "1", name: "New Order (" + arr_num._1 + ")", checked: true },
    //                     { id: "3", name: "Processed (" + arr_num._3 + ")" },
    //                     { id: "5", name: "Paid (" + arr_num._5 + ")" },
    //                     { id: "7", name: "Booked (" + arr_num._7 + ")" },
    //                     { id: "9", name: "Complete (" + arr_num._9 + ")" },
    //                     { id: "11", name: "Canceled (" + arr_num._11 + ")" },
    //                     { id: "13", name: "Expired (" + arr_num._13 + ")" },
    //                     { id: "15", name: "Billed (" + arr_num._15 + ")" },
    //                     { id: "17", name: "Deny (" + arr_num._17 + ")" },
    //                     { id: "19", name: "Error (" + arr_num._19 + ")" },
    //                     { id: "21", name: "Dropped (" + arr_num._21 + ")" },
    //                     { id: "23", name: "Refunded (" + arr_num._23 + ")" }
    //                 ];
    //                 this.setState({ statuses: statuses });
    //             })
    //             .catch(error => {
    //                 alert('Kegagalan Respon Servers');
    //             });

    //     }

    // }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            //this.getSession();
            setTimeout(() => {
                //this.fetch_num();
                this.getData();

            }, 20);
        });
    }




    getData() {
        const { login, userSession } = this.state;
        console.log('userSessionBooking', userSession);
        if (userSession != null) {

            let config = this.state.configApi;
            let baseUrl = config.baseUrlx;
            let url = baseUrl + "front/api_new/order/get_booking_history";
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);

            var id_user = userSession.id_user;

            // var url=config.baseUrlx;
            // var path=config.user_order.dir;


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var param = { "param": { "id": id_user, "id_order": "", "id_order_status": "", "product": "" } };
            console.log('paramBooking', JSON.stringify(param));
            var raw = JSON.stringify(param);





            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loadingSpinner: false });
                    console.log('dataBooking', JSON.stringify(result));
                    this.setState({ dataBooking: result });
                })
                .catch(error => {
                    alert('Kegagalan Respon Servers');
                });

        }

    }





    render() {
        const { navigation } = this.props;
        let { login, dataBooking, statuses, loadingSpinner } = this.state;
        var contents = <View />
        var content = <View></View>
        if (this.state.dataBooking.length == 0) {
            content = <DataEmpty />
        } else {
            content = <FlatList
                // horizontal={true}
                // showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={this.state.refreshing}
                        onRefresh={() => { }}
                    />
                }
                style={{}}
                data={this.state.dataBooking}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (

                    item.detail.length != 0 ?
                        <CardCustomBooking
                            // style={{ marginTop: 10 }}
                            item={item}
                            loading={this.state.loadingSpinner}
                            navigation={navigation}

                        />
                        :
                        <View />
                )}
            />
        }

        if (loadingSpinner == true) {
            contents = <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
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
                        source={require("app/assets/loader_wait.json")}
                        animationStyle={{ width: 250, height: 250 }}
                        speed={1}
                    />

                </View>
            </View>
        } else {
            if (login == true) {
                contents = <View style={{}}>

                    {content}
                </View>
            } else {
                //contents=<View />
                contents = <NotYetLogin redirect={'Booking'} navigation={navigation} />
            }
        }

        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <StatusBar
                    backgroundColor={BaseColor.primaryColor}
                />
                <Header
                    title="Booking"
                    subTitle={""}

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
                            this.state.login ?
                                <Icon
                                    name="reload-outline"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                                :
                                <View />

                        );
                    }}

                    onPressLeft={() => {
                        navigation.goBack();
                    }}

                    onPressRight={() => {
                        var redirect = 'Booking';
                        var param = {}
                        navigation.navigate("Loading", { redirect: redirect, param: param });
                    }}
                />
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                    {contents}
                </View>



            </SafeAreaView>
        );
    }
}