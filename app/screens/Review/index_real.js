import React, { Component } from "react";
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


export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            login: false,
            loadingSpinner: true,
            notification: DataNotif,
            statuses: [
                { id: "0", name: "Belum Dilihat", checked: true },
                { id: "1", name: "Sudah Dilihat" },
            ],
            idParam: "0",
            status: "belum_dilihat",
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

    getData() {
        const { idParam, login, userSession } = this.state;

        if (userSession != null) {
            console.log('userSession', JSON.stringify(userSession));
            let config = this.state.configApi;
            let baseUrl = config.baseUrl;
            let url = baseUrl + "front/api_new/user/notif";
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);

            var id_user = userSession.id_user;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var param = { "param": { "id_user": id_user, "seen": "0" } };
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
                    console.log('notif', JSON.stringify(result));
                    this.setState({ loadingSpinner: false });
                    this.setState({ notification: result });
                })
                .catch(error => {
                    alert('Kegagalan Respon Server');
                });
        }

    }

    notif_update(id) {
        const { idParam, id_user } = this.state;
        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + 'front/api_new/user/notif_update';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        // var url=config.baseUrl;
        // var path='front/api_new/user/notif_update';
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

    componentDidMount() {

        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            console.log('Screen', 'Notification');
            setTimeout(() => {
                this.getData();
            }, 20);

        });
    }

    render() {
        const { navigation } = this.props;
        let { notification, statuses, login, loadingSpinner } = this.state;
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
                        refreshing={this.state.refreshing}
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
                        loading={this.state.loadingSpinner}
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
                                back: 'Notification'
                            }
                            var id = item.id_notification;
                            this.notif_update(id);
                            this.props.navigation.navigate("Pembayaran", { redirect: redirect, param: param });

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
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <StatusBar
                    backgroundColor={BaseColor.primaryColor}
                />
                <Header
                    title="Notification"
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
}
