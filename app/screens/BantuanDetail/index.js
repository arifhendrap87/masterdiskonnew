import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, FlatList, AsyncStorage, Image, StatusBar } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Tag, CardCustomTopic, CardCustomArticle } from "@components";
import styles from "./styles";
// Load sample data
import { DataNotif } from "@data";
import { View } from "react-native-animatable";
import CardCustomReview from "../../components/CardCustomReview";
import NotYetLogin from "../../components/NotYetLogin";
import DataEmpty from "../../components/DataEmpty";
import AnimatedLoader from "react-native-animated-loader";
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modal";

import {
    DataBantuan,
    DataTopic
} from "@data";
////import SvgUri from 'react-native-svg-uri';

export default function BantuanDetail(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);

    const [refreshing, setRefresing] = useState(false);
    const [category, setCategory] = useState(DataBantuan);
    const [article, setArticle] = useState(DataTopic);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [idBantuan, setIdBantuan] = useState((navigation.state.params && navigation.state.params.idBantuan) ? navigation.state.params.idBantuan : '');

    useEffect(() => {
        getArticle();
        // const isFocused = navigation.isFocused();
        // if (isFocused) {
        //     getArticle();

        // }

        // const navFocusListener = navigation.addListener('didFocus', () => {
        //     getArticle();
        // });

        // return () => {
        //     navFocusListener.remove();
        // };



    }, []);

    function modalShow(id) {

    }


    async function getArticle() {
        setLoadingSpinner(true);
        try {


            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "help/articles/" + idBantuan;
            console.log('urlss', url);

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('getArticle', JSON.stringify(result));
                    setLoadingSpinner(false);
                    setArticle(result.data);

                })
                .catch(error => {
                    console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
                });




        } catch (error) {
            console.log(error);
        }

    }



    var contents = <View />
    var content = <View></View>
    if (category.length == 0) {
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
            data={category}
            keyExtractor={(item, index) => item.id_notification}
            renderItem={({ item, index }) => (
                <View style={{ flex: 1, width: '90%', marginBottom: 10, marginHorizontal: 20, borderRadius: 5, borderColor: BaseColor.primaryColor, borderWidth: 1 }}>
                    {/* <View style={{ paddingBottom: 10, alignItems: 'center' }}>
                        <SvgUri
                            width="150"
                            height="150"
                            source={{ uri: item.icon }}
                            style={{ alignSelf: 'center' }}
                        />
                    </View> */}
                    <View
                        style={{
                            borderBottomColor: BaseColor.primaryColor,
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                        <Text bold body1>{item.title}</Text>
                    </View>
                </ View>

            )}
        />
    }


    var contentTopic = <View></View>
    if (article.length == 0) {
        contentTopic = <DataEmpty />
    } else {
        contentTopic = <View><FlatList
            refreshControl={
                <RefreshControl
                    colors={[BaseColor.primaryColor]}
                    tintColor={BaseColor.primaryColor}
                    //refreshing={setRefresing}
                    onRefresh={() => { }}
                />
            }
            data={article}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <CardCustomArticle title={item.article_title} content={item.article_content} />

            )}
        />
        </View>
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
                {/* {content} */}
                {contentTopic}
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
                title="BantuanDetail"
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
