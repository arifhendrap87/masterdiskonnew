import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    Platform,
    StatusBar,
    Dimensions,
    Linking,
} from "react-native";
import {
    Text,
    SafeAreaView,
    Image,
    Icon,
    Tag,
    FormOption,
    Button,
} from "@components";


import Swiper from 'react-native-swiper'
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import FlightPlanCustom from "../../components/FlightPlanCustom";
import HeaderHome from "../../components/HeaderHome";
import FormSearch from "../../components/FormSearch";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import SetDateLong from "../../components/SetDateLong";
import SetPenumpangLong from "../../components/SetPenumpangLong";
import FormOptionScreen from "../../components/FormOptionScreen";
import DropdownAlert from 'react-native-dropdownalert';
import { DataMasterDiskon } from "@data";
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ListProductMenu from "../../components/ListProductMenu";
import TopFlight from "../../components/TopFlight";
import TopCity from "../../components/TopCity";
import BlogList from "../../components/BlogList";
import Promo from "../../components/Promo";

import ProductListCommon from "../../components/ProductList/Common.js";
import NotYetLoginHome from "../../components/NotYetLoginHome";



import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBlog,
    DataPromo,
    DataTopFlight,
    DataGetProvince
} from "@data";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import Spinner from 'react-native-loading-spinner-overlay';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';



export default function Home(props) {
    let { navigation, auth } = props;
    const configApi = useSelector(state => state.application.configApi);
    console.log('configApiHome', JSON.stringify(configApi));
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);
    const dispatch = useDispatch();
    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
    const [locationName, setLocationName] = useState();
    const [visible, setVisible] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [versionInName, setVersionInName] = useState('');
    const [linkUpdate, setLinkUpdate] = useState('');
    this._deltaY = new Animated.Value(0);
    const heightImageBanner = Utils.scaleWithPixel(300, 1);
    const marginTopBanner = heightImageBanner - heightHeader;

    useEffect(() => {
        //getDataBlogList();
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {

                locationNameF(location);

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })


        return () => {
        }
    }, []);

    function getDataBlogList() {

        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "promotion/blog";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('BlogListHome', JSON.stringify(result));
                // setListData(result.data);
                // setLoading(false);

            })
            .catch(error => {
                //this.dropdown.alertWithType('info', 'Info', JSON.stringify(error));
                //console.log('errorss_configApiListMenu' + time, JSON.stringify(error));
            });


    }


    function generateTimeSay() {
        var data = [
            [0, 4, "Good night"],
            [5, 11, "Good morning"],          //Store messages in an array
            [12, 17, "Good afternoon"],
            [18, 24, "Good night"]
        ],
            hr = new Date().getHours();

        for (var i = 0; i < data.length; i++) {
            if (hr >= data[i][0] && hr <= data[i][1]) {
                console.log(data[i][2]);
                return data[i][2];
                break;
            }
        }

    }

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

    function setHotelLinxDestination(select) {
        console.log('setHotelLinxDestination', JSON.stringify(select));
        setSpinner(true);

        var item = {
            product_detail: {
                "total": select.total,
                "cityid": select.cityid,
                "cityname": select.cityname,
                "countryname": select.countryname,
                "searchType": select.searchType,
                "searchCity": select.searchCity,
                "searchHotel": select.searchHotel,
                "searchTitle": select.searchTitle,
                "searchArea": select.searchArea,
                "searchCountry": select.searchCountry,
                "searchProvince": select.searchProvince,
            }
        }
        console.log('itemsetHotelLinxDestination', JSON.stringify(item));

        console.log()
        setTimeout(() => {
            this.onSubmit('hotel', item);
        }, 20);


    }


    return (



        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
            forceInset={{ top: "always" }}
        >
            <StatusBar
                backgroundColor="transparent"
            //translucent={true} 
            />
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            <HeaderHome
                transparent={true}
                title={
                    userSession == null ?
                        'Hey, Mau Kemana ?' : userSession.fullname
                }
                // renderRight={() => {
                //     return (
                //         this.state.login ?
                //         <Icon
                //             name="bell"
                //             size={20}
                //             color={BaseColor.whiteColor}
                //         />
                //         :
                //         <View />

                //     );
                // }}

                onPressRight={() => {
                    var redirect = 'Notification';
                    var param = {}
                    navigation.navigate(redirect);
                }}
            />

            <ScrollView
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: { y: this._deltaY }
                        }
                    }
                ])}
                onContentSizeChange={() => {

                    setHeightHeader(Utils.heightHeader());
                }

                }
                scrollEventThrottle={8}
                style={{ marginBottom: 0 }}
            >
                <View style={{ marginTop: 0, marginBottom: 50 }}>
                    <View style={{ paddingHorizontal: 20, flex: 1 }}>
                        <Text caption1 bold >
                            {
                                userSession == null ?
                                    'Hello' : userSession.fullname
                            }
                            {', '}
                            {generateTimeSay()}
                        </Text>
                        <Text caption1 bold >
                            {locationName}
                        </Text>
                        <FormSearch
                            style={{ marginTop: 10 }}
                            label={'Mau kemana'}
                            //title={this.state.hotelLinxDestinationLabel}
                            title={'City, hotel, place to go'}
                            icon={'search-outline'}
                            onPress={() => {
                                // navigation.navigate("SelectHotelLinx", {
                                //     setHotelLinxDestination: setHotelLinxDestination,
                                //     fromHome: true
                                // });
                                navigation.navigate("Hotel", { fromHome: true });
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            width: '90%',
                            //alignSelf: 'center',
                        }}
                    >
                        <View>
                            <View style={{ flex: 1, backgroundColor: BaseColor.whiteColor, marginHorizontal: 20, borderRadius: 10, width: '100%', paddingVertical: 20 }}>
                                <ListProductMenu navigation={navigation} />
                            </View>
                        </View>
                    </View>
                    <Promo navigation={navigation} />

                    <NotYetLoginHome navigation={navigation} />
                    <TopFlight navigation={navigation} slug={'travel-deals'} title={'Penerbangan Popular'} />
                    <TopCity navigation={navigation} slug={'travel-deals'} title={'Kota Terbaik'} paramState={this.state} />

                    <ProductListCommon navigation={navigation} slug={'hotels'} title={'Sepuluh kota terbaik'} />
                    {/* <ProductListCommon navigation={navigation} slug={'flights'} title={'Penerbangan terpopular'} /> */}



                    <ProductListCommon navigation={navigation} slug={'travel-deals'} title={'Travel Deals'} />
                    <ProductListCommon navigation={navigation} slug={'tours'} title={'Tours'} />
                    <ProductListCommon navigation={navigation} slug={'beauty-health'} title={'Beauty & health'} />

                    <ProductListCommon navigation={navigation} slug={'gift-vouchers'} title={'Gift Vouchers'} />
                    <ProductListCommon navigation={navigation} slug={'entertainment'} title={'Entertainment'} />
                    {/* <ProductListCommon navigation={navigation} slug={'fandb'} title={'FB'} /> */}
                    <BlogList navigation={navigation} slug={'entertainment'} title={'BlogList'} />


                </View>
            </ScrollView>
            <View style={{ flex: 1 }}>

                <Modal isVisible={visible}
                //onBackdropPress={() => {this.setState({visible:false})}}
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

            <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
        </SafeAreaView>
    );
}
