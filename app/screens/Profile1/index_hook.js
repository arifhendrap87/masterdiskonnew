import React, { Component, useEffect, useState } from "react";
import { View, ScrollView, AsyncStorage, TouchableOpacity, Platform, FlatList, Share, StatusBar } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";

import {
    Image,
    Header,
    SafeAreaView,
    Icon,
    Text,
    Tag,
    Button,
    HelpBlock,
    Coupon,
    Kunjungan
} from "@components";
import styles from "./styles";
import CardCustomProfile from "../../components/CardCustomProfile";
import NotYetLogin from "../../components/NotYetLogin";
import AnimatedLoader from "react-native-animated-loader";
import { DataMasterDiskon } from "@data";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import Modal from "react-native-modal";
import appleAuth, {
    AppleButton,
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import CardCustomTitle from "../../components/CardCustomTitle";
import CouponCard from "../../components/CouponCard";
// Load sample data
import { UserData, HotelData, TourData, CouponsData, DataKunjungan } from "@data";
import ImagePicker from 'react-native-image-crop-picker';
import DropdownAlert from 'react-native-dropdownalert';
import { GetSocialUI, InvitesView } from 'getsocial-react-native-sdk';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import ProductListCommon from "../../components/ProductList/Common.js";
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions, ApplicationActions } from "@actions";


export default function Profile1(props) {
    let { navigation } = props;
    const dispatch = useDispatch();
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);
    console.log('loginProfile1', JSON.stringify(login));
    console.log('userSessionProfile1', JSON.stringify(userSession));
    console.log('configApi', JSON.stringify(configApi));


    const [dataMasterDiskon, setDataMasterDiskon] = useState(DataMasterDiskon[0]);
    const [coupons, setCoupons] = useState(CouponsData);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const [listDataCustomer, setListDataCustomer] = useState([{ "key": 1, "label": "Contact", "old": "adult", "fullname": "Mr arif pambudi", "firstname": "arif", "lastname": "pambudi", "birthday": "", "nationality": "Indonesia", "passport_number": "", "passport_country": "", "passport_expire": "", "phone": "79879879879", "title": "Mr", "email": "matadesaindotcom@gmail.com", "nationality_id": "ID", "nationality_phone_code": "62", "passport_country_id": "" }]);
    useEffect(() => {
        if (login == true) {
            const isFocused = navigation.isFocused();
            if (isFocused) {
                getCoupon();
                setUser();
            }

            const navFocusListener = navigation.addListener('didFocus', () => {
                getCoupon();
                setUser();
            });

            return () => {
                navFocusListener.remove();
            };
        }



    }, []);

    async function getCoupon() {
        setLoadingSpinner(true);
        if (login == true) {

            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "promotion/coupon/active?id_user=" + userSession.id_user;
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + config.apiToken);


            var raw = "";

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            return fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('getCouponResult', JSON.stringify(result));
                    setLoadingSpinner(false);
                    setCoupons(result.data);
                })
                .catch(error => {
                    console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
                });


        } else {
            setLoadingSpinner(false);
        }



    }

    async function setUser() {


        if (login == true) {


            let minDatePassport = new Date();
            minDatePassport = formatDateToString(minDatePassport);
            minDatePassport = minDatePassport;

            let dtDefAdult = new Date();
            dtDefAdult = addDate(dtDefAdult, -13, 'years');
            var def_date_adult = formatDateToString(dtDefAdult);

            var def_passport_number = "12345678";
            var def_passport_country = "Indonesia";
            var def_passport_expire = minDatePassport;
            var def_passport_country_id = "ID";
            var def_phone = "12345678";
            var def_email = "email@gmail.com";


            var customer = [];
            for (var i = 1; i <= 1; i++) {
                var obj = {};
                obj['key'] = i;
                obj['label'] = "Contact";
                obj['old'] = 'adult';

                obj['fullname'] = userSession.fullname;
                obj['firstname'] = userSession.firstname;
                obj['lastname'] = userSession.lastname;
                obj['birthday'] = '';
                obj['nationality'] = userSession.nationality;
                obj['passport_number'] = '';
                obj['passport_country'] = '';
                obj['passport_expire'] = '';
                obj['phone'] = userSession.phone;
                obj['title'] = userSession.title;
                obj['email'] = userSession.email;

                obj['nationality_id'] = userSession.nationality_id;
                obj['nationality_phone_code'] = userSession.nationality_phone_code;

                obj['passport_country_id'] = '';


                customer.push(obj)
            }
            AsyncStorage.setItem('setDataCustomer', JSON.stringify(customer));
            setListDataCustomer(customer);



        }

    }



    async function onLogOut() {
        var loginVia = userSession.loginVia;

        if (loginVia == 'form') {

            AsyncStorage.removeItem('userSession');
            AsyncStorage.removeItem('password');
            dispatch(
                ApplicationActions.onChangeLoginStatus(false, response => {
                    console.log('authlOGIN', JSON.stringify(response));

                }),
            );

            dispatch(
                ApplicationActions.onChangeUserSession(null, response => {
                    console.log('responseReduxAuth', JSON.stringify(response));

                }),
            );
            var redirect = 'Home';
            var param = {}
            navigation.navigate("Loading", { redirect: redirect, param: param });


            //navigation.navigate("Loading", { redirect: 'Home' });

        }
        // else if (loginVia == 'google') {
        //     _signOut();
        //     AsyncStorage.removeItem('userSession');
        //     setState({ loading: true }, () => {
        //         setState({ loading: false });
        //         setTimeout(() => {
        //             //authentication('Profile');
        //             props.navigation.navigate("Loading", { redirect: 'Home' });
        //         }, 50);

        //     });


        // } else if (loginVia == 'apple') {



        //     setState({ loading: true }, () => {
        //         setState({ loading: false });
        //         setTimeout(() => {
        //             //authentication('Profile');
        //             _signOutApple();
        //             AsyncStorage.removeItem('userSession');
        //             props.navigation.navigate("Loading", { redirect: 'Home' });
        //         }, 50);

        //     });




        // }
    }

    onShare = async () => {



        //var referral_code=userSession.refferal_code;
        try {
            const result = await Share.share({
                title: 'Refferal Code',
                message: 'Master Diskon Refferal Code : ' + userSession.username,
                //url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    function addDate(dt, amount, dateType) {
        switch (dateType) {
            case 'days':
                return dt.setDate(dt.getDate() + amount) && dt;
            case 'weeks':
                return dt.setDate(dt.getDate() + (7 * amount)) && dt;
            case 'months':
                return dt.setMonth(dt.getMonth() + amount) && dt;
            case 'years':
                return dt.setFullYear(dt.getFullYear() + amount) && dt;
        }
    }

    function formatDateToString(date) {
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();

        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
    }




    async function claimCoupon(id) {


        var raw = "";
        if (login == true) {
            var param = {
                "id": id,
                "id_user": userSession.id_user,
                "platform": "app"
            };
            var raw = JSON.stringify(param);
            console.log('claimCoupon', raw);

        }

        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + "promotion/coupon/claim";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success == false) {
                    dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                } else {

                    dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                    updateClainPromo(id);
                }
            })
            .catch(error => {
                console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
            });



    }


    async function updateClainPromo(id) {

        const newProjects = coupons.map(p =>
            p.id_coupon === id
                ? {
                    ...p,
                    claimed: 1,

                }
                : p
        );
        console.log('coupons', JSON.stringify(coupons));
        setCoupons(newProjects);

    }


    function renderItem(item, index, loading) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        if (index == 0) {
            var margin = { marginLeft: 0, marginRight: 10 }
        } else {
            var margin = { marginRight: 10 }
        }
        return (
            <View>
                {
                    loading == true ?
                        <View />
                        :
                        <Coupon
                            style={[{
                                marginVertical: 0,
                                width: 200,

                            }, margin]}
                            backgroundHeader={BaseColor.primaryColor}
                            name={item.coupon_name}
                            code={item.coupon_code}
                            description={item.coupon_code}
                            valid={convertDateText(item.end_date)}
                            remain={priceSplitter('Rp ' + item.minimum)}
                            onPress={() => {
                                //alert(item.id_coupon);
                                claimCoupon(item.id_coupon);
                                //props.navigation.navigate("HotelDetail");
                            }}
                            quantity={item.quantity}
                            claimed={item.claimed}
                            usedKuota={item.usedKuota}
                            claimable={item.claimed}
                            usedCoupon={false}
                        />
                }

            </View>
        );
    }

    function convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    function updateParticipant(
        key,
        fullname,
        firstname,
        lastname,
        birthday,
        nationality,
        passport_number,
        passport_country,
        passport_expire,
        phone,
        title,
        email,
        nationality_id,
        nationality_phone_code,
        passport_country_id,
        type
    ) {
        let password = password;
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                //console.log('getSession',userSession);
                var id_user = userSession.id_user;

                var userSessionUpdate = {
                    address: userSession.address,
                    avatar: userSession.avatar,
                    birthday: birthday,
                    cart: userSession.cart,
                    city_name: userSession.city_name,
                    email: userSession.email,
                    firstname: firstname,
                    fullname: fullname,
                    gender: userSession.gender,
                    id_city: userSession.id_city,
                    id_user: userSession.id_user,
                    lastname: lastname,
                    loginVia: userSession.loginVia,
                    nationality: nationality,
                    nationality_id: nationality_id,
                    nationality_phone_code: nationality_phone_code,
                    passport_country: passport_country,
                    passport_country_id: passport_country_id,
                    passport_expire: passport_expire,
                    passport_number: passport_number,
                    phone: phone,
                    postal_code: userSession.postal_code,
                    status: userSession.status,
                    title: title,
                    un_nationality: userSession.un_nationality,
                    username: userSession.username,
                }
                userSessionUpdate.password = password;
                AsyncStorage.setItem('userSession', JSON.stringify(userSessionUpdate));

                let config = configApi;
                let baseUrl = config.baseUrl;
                let url = baseUrl + 'front/api_new/user/user_update';
                console.log('configApi', JSON.stringify(config));
                console.log('urlss', url);


                var params = { "param": userSessionUpdate }
                console.log('userSessionUpdate', JSON.stringify(params));


                var param = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                }


                fetch(url, param)
                    .then(response => response.json())
                    .then(result => {
                        console.log('resultuserSessionUpdate', JSON.stringify(result));

                    })
                    .catch(error => {
                        console.log(JSON.stringify(error));
                        alert('Kegagalan Respon Server updateParticipant');
                    });


                getSession();
            }
        });

    }

    function updateParticipantPassword(
        passwordOld, passwordNew, passwordConfirm
    ) {
        var data = {
            passwordOld: passwordOld,
            passwordNew: passwordNew,
            passwordConfirm: passwordConfirm,

        }
        const param = { "param": data }
    }


    var contents = <View />
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

            contents = <ScrollView style={{ marginBottom: 0 }}>
                <View style={{}}>
                    <View style={{ width: "100%" }}>
                        <View>
                            <CardCustomProfile
                                title={'Profile'}
                                subtitle={'Edit Profiles'}
                                icon={'ios-person-outline'}
                                onPress={() => {
                                    props.navigation.navigate("ProfileEdit", {
                                        sourcePage: 'profile',
                                        key: 1,
                                        label: '',
                                        fullname: userSession.fullname,
                                        firstname: userSession.firstname,
                                        lastname: userSession.lastname,
                                        birthday: userSession.birthday,
                                        nationality: userSession.nationality,
                                        passport_number: userSession.passport_number,
                                        passport_country: userSession.passport_country,
                                        passport_expire: userSession.passport_expire,
                                        phone: userSession.phone,
                                        title: userSession.title,
                                        email: userSession.email,

                                        nationality_id: userSession.nationality_id,
                                        nationality_phone_code: userSession.nationality_phone_code,

                                        passport_country_id: userSession.passport_country_id,

                                        updateParticipant: updateParticipant,
                                        type: 'guest',
                                        old: '',
                                        typeProduct: ''


                                    });
                                }}

                            />

                            {/* <CardCustomProfile 
                                    title={'Promo Kupon'}
                                    subtitle={'Silakan klaim kupon'}
                                    icon={'gift'}
                                    onPress={() => {
                                        props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                
                                /> */}
                            <CardCustomProfile
                                title={'QuickPick'}
                                subtitle={'Isi data penumpang, dengan satu klik'}
                                icon={'people-outline'}
                                onPress={() => {
                                    props.navigation.navigate("ProfileSmart", { sourcePage: 'profile' });
                                }}

                            />
                            {/* {
                                userSession.loginVia === "form" ?

                                    <CardCustomProfile
                                        title={'Ubah Kata Sandi'}
                                        subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                        icon={'lock-closed-outline'}
                                        onPress={() => {
                                            props.navigation.navigate("ProfileEditPassword", {
                                                updateParticipantPassword: updateParticipantPassword,
                                            });
                                        }}

                                    />
                                    :
                                    <View></View>
                            } */}



                            <CardCustomProfile
                                title={'Handphone'}
                                subtitle={userSession.nationality_phone_code + "-" + userSession.phone}
                                icon={'phone-portrait-outline'}
                                onPress={() => {
                                    //props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                }}

                            />

                            <CardCustomProfile
                                title={'Kode Referal'}
                                subtitle={'Share kode'}
                                icon={'ios-code-outline'}
                                onPress={() => {
                                    onShare(userSession.username);
                                }}

                            />

                            <CardCustomProfile
                                title={'Sign Out'}
                                subtitle={'Keluar akun'}
                                icon={'ios-log-out-outline'}
                                onPress={() => {
                                    onLogOut();
                                }}

                            />



                            <CardCustomProfile
                                title={Platform.OS == "android" ? dataMasterDiskon.versionInPlayStoreName : dataMasterDiskon.versionInAppStoreName}
                                subtitle={'App Version'}
                                icon={'ios-information-outline'}
                                nav={false}
                                onPress={() => {
                                    setState({ modalVisible: true });
                                }}

                            />


                            {/* <HelpBlock
                                title={'Bantuan'}
                                description={'Apa yang bisa kami bantu?'}
                                phone={'021 - 87796010'}
                                email={'cs@masterdiskon.com'}
                                style={{ margin: 20 }}
                                onPress={() => {
                                    // navigation.navigate("ContactUs");
                                }}
                                /> */}

                            {/* <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}}>
                                    <View style={{flex:4}}>
                                        <CouponCard
                                            style={{
                                                marginVertical: 10,
                                                marginRight: 5,
                                                borderRadius:10,
                                            }}
                                            name={'Handphone'}
                                            //code={userSession.email}
                                            description={userSession.nationality_phone_code+"-"+userSession.phone}
                                            // valid={'ad'}
                                            // remain={'ad'}
                                            
                                            onPress={() => {
                                                props.navigation.navigate("HotelDetail");
                                            }}
                                            clickAction={false}
                            
                                        />
                                    </View>
                                    <View style={{flex:8}}>
                                            <CouponCard
                                                style={{
                                                    marginVertical: 10,
                                                    marginLeft: 5
                                                }}
                                                name={'Kode Referal'}
                                                //code={'as'}
                                                description={userSession.username}
                                                // valid={'ad'}
                                                // remain={'ad'}
                                                onPress={() => {
                                                    //alert(userSession.refferal_code);
                                                    onShare(userSession.username);
                                                    //props.navigation.navigate("HotelDetail");
                                                }}
                                                clickAction={true}
                                
                                            />
                                    </View>
                                </View> */}

                            {/* <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}}>
                                
                                    <View style={{flex:12}}>
                                    {
                                    Platform.OS=='android' ?
                    
                                            <CouponCard
                                                style={{
                                                    marginVertical: 10,
                                                    marginLeft: 5
                                                }}
                                                name={'Invite'}
                                                //code={'as'}
                                                description={'Undang teman Anda'}
                                                // valid={'ad'}
                                                // remain={'ad'}
                                                onPress={() => {
                                                    new InvitesView().show();
                                                    //alert(userSession.refferal_code);
                                                    //onShare(userSession.usernam);
                                                    //props.navigation.navigate("HotelDetail");
                                                    
                                                }}
                                                clickAction={true}
                                
                                            />
                                        :
                                        <View />
                                        }
                                    </View>
                                </View> */}





                        </View>
                    </View>
                    {/* <ProductListCommon navigation={navigation} slug={'hotels'} title={'Tempat yang pernah dikunjungi'} /> */}


                    {
                        coupons.length != 0 ?

                            <View>
                                <CardCustomTitle
                                    style={{ marginLeft: 20 }}
                                    title={'Promo'}
                                    desc={''}
                                    more={false}
                                    onPress={() =>
                                        navigation.navigate("HotelCity")
                                    }
                                />

                                <View style={{ marginLeft: 20 }}>
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={coupons}
                                        keyExtractor={(item, index) => item.id_coupon}
                                        renderItem={({ item, index }) => renderItem(item, index, loadingSpinner)}
                                    />
                                </View>
                            </View>
                            :
                            <View></View>
                    }
                </View>

                {/* <View style={{ marginHorizontal: 20}}>
                        <Button
                            full
                            loading={loading}
                            onPress={() => onLogOut()}
                        >
                            Sign Out
                        </Button>
                    </View> */}

                {/* <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        setState({ modalVisible: false });
                    }}
                    onSwipeComplete={() => {
                        setState({ modalVisible: false });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {option.map((item, index) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.value}
                                onPress={() => {
                                    //onSelect(item)
                                    selectImageFromCamera(item);

                                }}
                            >
                                <Text
                                    body2
                                    semibold
                                    primaryColor={item.checked}
                                >
                                    {item.option_list_label}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </Modal> */}
            </ScrollView>

            {
                Platform.OS == 'android' ?

                    <View style={{ alignItems: "center", backgroundColor: BaseColor.primaryColor, paddingBottom: 10 }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                //setState({modalVisible:true});
                                //selectImageFromCamera();
                                alert('Masih Perbaikan');
                            }}
                        >
                            <Icon
                                name="pencil-alt"
                                size={20}
                                color={BaseColor.primaryColor}
                                style={{ top: 20, left: 100 }}
                            />
                            <Image source={avatar} style={styles.image} />
                        </TouchableOpacity>
                        <Text caption1 whiteColor>
                            {userSession.fullname}
                        </Text>
                        <Text subhead whiteColor>
                            {userSession.email}
                        </Text>
                        {/* <Text subhead grayColor>
                    Ref. Code : {userSession.referral_code}
                    </Text> */}
                        {/* <Tag primary style={styles.tagFollow}
                    onPress={() => {
                        props.navigation.navigate("ProfileEdit",{
                            sourcePage:'profile',
                            key:1,
                            label:'',
                            fullname:userSession.fullname,
                            firstname:userSession.firstname,
                            lastname:userSession.lastname,
                            birthday:userSession.birthday,
                            nationality:userSession.nationality,
                            passport_number:userSession.passport_number,
                            passport_country:userSession.passport_country,
                            passport_expire:userSession.passport_expire,
                            phone:userSession.phone,
                            title:userSession.title,
                            email:userSession.email,

                            nationality_id:userSession.nationality_id,
                            nationality_phone_code:userSession.nationality_phone_code,
                            
                            passport_country_id:userSession.passport_country_id,

                            updateParticipant: updateParticipant,
                            type:'guest',
                            old:'',
                            typeProduct:''
                            
                        
                        });
                    }}
                    >
                        Edit
                    </Tag> */}
                    </View>
                    :
                    <View />
            }




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
                title="Profile"
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
            <DropdownAlert ref={ref => dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

        </SafeAreaView>
    );




}
