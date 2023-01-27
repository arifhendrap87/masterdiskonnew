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
import DropdownAlert from 'react-native-dropdownalert';
import FilterSortNotification from "../../components/FilterSortNotification";


export default function Notification(props) {
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
    const [currentPage, setCurrentPage] = useState(1);
    const [banyakData, setBanyakData] = useState(0);
    const [banyakPage, setBanyakPage] = useState(0);
    const [startkotak, setStartKotak] = useState("1");

    const [keyword, setKeyword] = useState("");
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(currentPage);
    const [status, setStatus] = useState("");

    const [param, setParam] = useState({
        keyword: keyword,
        limit: limit,
        page: page,
        status: status,
    });



    useEffect(() => {
        if (login == true) {
            const isFocused = navigation.isFocused();
            if (isFocused) {
                getData(param);
            }

            const navFocusListener = navigation.addListener('didFocus', () => {
                getData(param);
            });

            return () => {
                navFocusListener.remove();
            };
        }


    }, []);

    async function getData(param) {
        setLoadingSpinner(true);
        try {
            if (login != false) {

                let config = configApi;
                let baseUrl = config.apiBaseUrl;
                let url = baseUrl + "user/notification?limit=" + param.limit + "&page=" + param.page;
                var myHeaders = new Headers();
                myHeaders.append("Cookie", "access_token=" + config.apiToken);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                console.log('url', url);
                console.log('requestOptions', JSON.stringify(requestOptions));

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log('result', JSON.stringify(result));
                        setLoadingSpinner(false);
                        setNotification(result.data);
                        setBanyakData(result.meta.total);
                        setBanyakPage(result.meta.maxPage);

                    })
                    .catch(error => { console.log('error', error) });



            }
        } catch (error) {
            console.log(error);
        }

    }



    function setPagination(currentPage) {
        console.log("currentpage", currentPage);
        if (currentPage <= banyakPage) {
            //this.setState({ arrayPrice: this.state.arrayPriceOriginal });
        }

        if (currentPage != 1) {
            var startkotak = (currentPage - 1) * 10 + 1;
            setStartKotak(startkotak.toString());
            // this.setState({ startkotak: startkotak.toString() });
        } else {
            var startkotak = 0;
            // this.setState({ startkotak: startkotak.toString() });
            setStartKotak(startkotak.toString());
        }

        if (currentPage <= banyakPage) {
            setCurrentPage(currentPage);
            param.startkotak = startkotak;
            param.currentPage = currentPage;
            param.page = currentPage;
            console.log('param', JSON.stringify(param));
            setTimeout(() => {
                //getProductHotelList(param);
                getData(param);
            }, 50);
        }
    }

    function onFilter(status, keyword) {
        param.status = status;
        param.keyword = keyword;
        console.log('paramFilter', JSON.stringify(param));
        setTimeout(() => {
            getData(param);
        }, 50);

    }

    function onClear() {
        param.ratingH = "";
        param.rHotel = "";
        param.srcdata = "";
        param.minimbudget = "0";
        param.maximbudget = "15000000";
        param.shortData = "";
        param.startkotak = "0";

        console.log("paramOriginal", JSON.stringify(param));

        setArrayPrice(arrayPriceOriginal);

        setTimeout(() => {
            if (param.typeSearch != "area") {
                getProductHotelList(param);
            } else {
                getProductHotelListPerArea(param);
            }
        }, 50);
    }

    function notif_update(id) {
        let config = configApi;
        let baseUrl = config.baseUrl;
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
                            back: 'Notification'
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
            contents = <View style={{ flex: 1, flexDirection: "column" }}>
                <View
                    style={[
                        { paddingHorizontal: 15, backgroundColor: BaseColor.whiteColor },

                    ]}
                >
                    <FilterSortNotification
                        onFilter={onFilter}
                        onClear={onClear}
                        // sortProcess={sortProcess}
                        banyakData={banyakData}
                        banyakPage={banyakPage}
                        setPagination={setPagination}
                        value={currentPage}
                        valueMin={1}
                        orderStatus={''}
                        valueMax={currentPage <= banyakPage ? false : true}
                        style={[
                            { alignSelf: 'center', alignItems: 'center' }
                        ]}
                    />
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    {content}
                </View>

            </View>;
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
            <View style={{
                backgroundColor:
                    login == true ? BaseColor.bgColor : BaseColor.whiteColor,
                flex: 1,
            }}>
                {contents}
            </View>
            <DropdownAlert ref={ref => dropdown = ref} messageNumOfLines={10} closeInterval={10000} />


        </SafeAreaView>
    );

}
