import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, FlatList, AsyncStorage, Image, StatusBar } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag } from "@components";
import styles from "./styles";
// Load sample data
import { DataNotif } from "@data";
import { View } from "react-native-animatable";
import CardCustomNotif from "../../components/CardCustomNotif";
import NotYetLogin from "../../components/NotYetLogin";
import DataEmpty from "../../components/DataEmpty";
import AnimatedLoader from "react-native-animated-loader";
import { useSelector, useDispatch } from 'react-redux';


export default function Favorite(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    console.log('configApiBooking', JSON.stringify(configApi));
    console.log('userSessionBooking', JSON.stringify(userSession));
    console.log('loginBooking', JSON.stringify(login));

    const [refreshing, setRefresing] = useState(false);
    const [notification, setNotification] = useState(DataNotif);
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    useEffect(() => {
        if (login == true) {
            const isFocused = navigation.isFocused();
            if (isFocused) {
                getData();
            }

            const navFocusListener = navigation.addListener('didFocus', () => {
                getData();
            });

            return () => {
                navFocusListener.remove();
            };
        }


    }, []);

    async function getData() {
        setLoadingSpinner(true);
        try {
            if (login != false) {

                let config = configApi;
                let baseUrl = config.baseUrlx;
                let url = baseUrl + "front/api_new/user/notif";
                console.log('urlss', url);

                var id_user = userSession.id_user;


                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");


                var param = { "param": { "id_user": id_user, "seen": "0" } };
                console.log('paramBooking', JSON.stringify(param));
                var raw = JSON.stringify(param);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                return fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log('getdataNotification', JSON.stringify(result));
                        setLoadingSpinner(false);
                        setNotification(result);
                    })
                    .catch(error => {
                        console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
                    });



            }
        } catch (error) {
            console.log(error);
        }

    }

    function notif_update(id) {
        let config = configApi;
        let baseUrl = config.baseUrlx;
        let url = baseUrl + 'front/api_new/user/notif_update';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "param": { "id": id } });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {

            })
            .catch(error => {
                alert('Kegagalan Respon Server');
            });
    }

    var contents = <View />
    var content = <View></View>
    if (notification.length == 0) {
        content = <DataEmpty />
    } else {
        content = <FlatList
            refreshControl={
                <RefreshControl
                    colors={[BaseColor.primaryColor]}
                    tintColor={BaseColor.primaryColor}
                    //refreshing={setRefresing}
                    onRefresh={() => { }}
                />
            }
            data={notification}
            keyExtractor={(item, index) => item.id_notification}
            renderItem={({ item, index }) => (
                <CardCustomNotif
                    image={item.image}
                    txtLeftTitle={item.title}
                    txtContent={item.content}
                    txtRight={item.date_added}
                    loading={loadingSpinner}
                    onPress={() => {
                        var param = {
                            url: item.tautan + '?access=app',
                            title: 'Order Detail',
                            subTitle: ''
                        }

                        var redirect = 'Pembayaran';
                        var id_order = item.tautan.match(/\d+$/)[0];

                        var param = {
                            id_order: id_order,
                            dataPayment: {},
                            back: 'Favorite'
                        }
                        var id = item.id_notification;
                        notif_update(id);
                        navigation.navigate("Pembayaran", { redirect: redirect, param: param });

                    }}
                />
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
            contents = <View style={{ marginTop: 20 }}>
                {content}
            </View>
        } else {

            contents = <NotYetLogin redirect={'Home'} navigation={navigation} />
        }
    }

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor, marginBottom: 50 }]}
            forceInset={{ top: "always" }}
        >
            <StatusBar
                backgroundColor={BaseColor.primaryColor}
            />
            <Header
                title="Favorite"
                renderLeft={() => {
                    return (
                        <Icon
                            name="md-arrow-back"
                            size={20}
                            color={BaseColor.whiteColor}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                {contents}
            </View>


        </SafeAreaView>
    );

}
