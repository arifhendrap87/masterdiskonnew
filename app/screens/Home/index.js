import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    Dimensions,
    Platform,
    Animated
} from "react-native";
import {
    Text,
    SafeAreaView,
    Image,
} from "@components";
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import FormSearch from "../../components/FormSearch";
import { DataMasterDiskon } from "@data";
import Modal from 'react-native-modal';
import ListProductMenuHorizontal from "../../components/ListProductMenuHorizontal";
import ListProductMenuHorizontalRounded from "../../components/ListProductMenuHorizontalRounded";
import TopFlight from "../../components/TopFlight";
import TopCity from "../../components/TopCity";
import TopProduct from "../../components/TopProduct";

import BlogList from "../../components/BlogList";
import Promo from "../../components/Promo";
import HeaderHome from "../../components/HeaderHome";
import NotYetLoginHome from "../../components/NotYetLoginHome";
import TravelBuddyMenu from "../../components/TravelBuddyMenu";

import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
import { DIMENTIONS } from "react-native-numeric-input";



export default function Home(props) {
    let { navigation, auth } = props;
    const configApi = useSelector(state => state.application.configApi);
    console.log('configApiHome', JSON.stringify(configApi));
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);
    const dispatch = useDispatch();
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [heightHeader, setHeightHeader] = useState();
    const [locationName, setLocationName] = useState();
    const [visible, setVisible] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [versionInName, setVersionInName] = useState('');
    const [linkUpdate, setLinkUpdate] = useState('');
    const heightImageBanner = Utils.scaleWithPixel(300, 1);
    const marginTopBanner = heightImageBanner - heightHeader;
    const offset = useRef(new Animated.Value(0)).current;
    function checkVersion() {

        var url = dataMasterDiskon.baseUrl + dataMasterDiskon.pathCheckVersion;
        var param = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }
        console.log('urlcheckversion', url);
        fetch(url, param)
            .then(response => response.json())
            .then(result => {
                console.log('resultVersion', JSON.stringify(result));
                if (Platform.OS == "android") {

                    if (parseInt(dataMasterDiskon.versionInPlayStore) < parseInt(result.versionInPlayStore)) {
                        setVisible(true);
                        setLinkUpdate('http://onelink.to/9gdqsj');
                        setVersionInName(result.versionInPlayStoreName);

                    }
                } else {


                    if (parseInt(dataMasterDiskon.versionInAppStore) < parseInt(result.versionInAppStore)) {
                        setVisible(true);
                        setLinkUpdate('http://onelink.to/9gdqsj');
                        setVersionInName(result.versionInAppStoreName);


                    }

                }

            })
            .catch(error => {
                this.setState({ error: true });
            });





    }

    useEffect(() => {
        console.log('dimension', Dimensions.get('window'))
        checkVersion();
        // GetLocation.getCurrentPosition({
        //     enableHighAccuracy: true,
        //     timeout: 15000,
        // })
        // .then(location => {

        //     locationNameF(location);

        // })
        // .catch(error => {
        //     const { code, message } = error;
        //     console.warn(code, message);
        // })


        return () => {
        }
    }, []);





    function locationNameF(location) {
        console.log('locationName', JSON.stringify(location));
        Geocoder.init("AIzaSyC_O0-LKyAboQn0O5_clZnePHSpQQ5slQU");
        Geocoder.from(location.latitude, location.longitude)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                console.log('addressComponent', JSON.stringify(addressComponent));
                //this.setState({ locationName: addressComponent });
                setLocationName(addressComponent);
            })
            .catch(error => {
                console.log('errorlocationName', JSON.stringify(error))
            });
    }



    return (


        <SafeAreaProvider>
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >

                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <View style={{ flex: 1, backgroundColor: BaseColor.bgColor }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <HeaderHome
                            animatedValue={offset}
                            navigation={navigation} />
                        <ScrollView

                            // scrollEventThrottle={8}
                            // style={[{ flex: 0.7 }]}
                            //style={{ flex: 1, backgroundColor: 'white' }}
                            // contentContainerStyle={{
                            //     alignItems: 'center',
                            //     paddingTop: 100,
                            //     //paddingHorizontal: 20
                            // }}

                            // style={{ flex: 1, backgroundColor: 'white', paddingTop: 150 }}

                            // showsVerticalScrollIndicator={false}
                            // scrollEventThrottle={16}
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: offset } } }],
                            //     { useNativeDriver: false }
                            // )}



                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={30}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: offset } } }],
                                { useNativeDriver: false }
                            )}
                        >
                            <View style={{ marginTop: 0, marginBottom: 80 }}>
                                <Promo navigation={navigation} />
                                <ListProductMenuHorizontalRounded navigation={navigation} />
                                {/* <TravelBuddyMenu navigation={navigation} /> */}
                                <TopProduct navigation={navigation} slug={'top-product'} title={'Terbaru 2022'} />
                                <TopFlight navigation={navigation} slug={'travel-deals'} title={'Penerbangan Popular'} />
                                <TopCity navigation={navigation} slug={'travel-deals'} title={'Kota Terbaik'} />
                                <BlogList navigation={navigation} slug={'entertainment'} title={'BlogList'} />



                            </View>
                        </ScrollView>
                    </View>
                    <View>

                        <Modal isVisible={visible}
                        >
                            <View style={{ flexDirection: 'column', backgroundColor: BaseColor.whiteColor, padding: 20 }}>
                                <Text body1>Versi baru ({versionInName}) telah tersedia</Text>
                                <Text caption1 >Silakan memperbarui aplikasi masterdiskon untuk menikmati fitur baru dan pengalaman aplikasi yang lebih baik</Text>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        style={{ marginRight: 20 }}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            Linking.openURL(linkUpdate);
                                        }}
                                    >
                                        <Text body2 bold>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            setVisible(false);
                                        }}
                                    >
                                        <Text body2 bold>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

                {/* <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} /> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
