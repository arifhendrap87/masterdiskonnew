import React, { Component } from "react";
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


//import Share from 'react-native-share';
export default class Profile1 extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            DataMasterDiskon: DataMasterDiskon[0],
            kunjungan: DataKunjungan,
            //tours: TourData,
            //hotels: HotelData,
            //userData: UserData[0],
            listdata_customer: [{ "key": 1, "label": "Contact", "old": "adult", "fullname": "Mr arif pambudi", "firstname": "arif", "lastname": "pambudi", "birthday": "", "nationality": "Indonesia", "passport_number": "", "passport_country": "", "passport_expire": "", "phone": "79879879879", "title": "Mr", "email": "matadesaindotcom@gmail.com", "nationality_id": "ID", "nationality_phone_code": "62", "passport_country_id": "" }],
            login: false,
            modalVisible: false,
            avatar: Images.defaultAvatar,
            avatar_real: Images.defaultAvatar,
            option: [
                {
                    option_list: "gallery",
                    option_list_label: "From Gallery",
                    icon: "",
                },
                {
                    option_list: "camera",
                    option_list_label: "From Camera",
                    icon: "",
                },
            ],
            coupons: CouponsData,
            loadingSpinner: true,
            userSession: { "id_user": "2373", "fullname": "Mr Arif Hendra", "firstname": "Arif", "lastname": "Hendra", "birthday": "2008-12-11", "nationality": "Indonesia", "passport_number": "", "passport_country": "", "passport_expire": "", "phone": "89522115094", "title": "Mr", "email": "arifhendrap87@gmail.com", "nationality_id": "ID", "nationality_phone_code": "62", "passport_country_id": "ID", "username": "Arifhendra", "gender": "Mr", "un_nationality": null, "id_city": null, "city_name": null, "address": null, "postal_code": null, "point": "0", "avatar": null, "cart": "", "status": "customer", "referral_code": null, "loginVia": "form", "password": configApi.defPassword }

        };
        this.updateParticipant = this.updateParticipant.bind(this);
        this.updateParticipantPassword = this.updateParticipantPassword.bind(this);
        this.getConfigApi();
        this.getConfig();
        this.getSession();
        this.getPassword();

    }

    getPassword() {
        AsyncStorage.getItem('password', (error, result) => {
            if (result) {
                let password = JSON.parse(result);
                console.log('getPassword', JSON.stringify(password));
                this.setState({ password: password });
            }
        });
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
                //console.log('getConfig',config);
                this.setState({ config: config });
            }

        });
    }

    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                console.log('getSessionPROFILE', JSON.stringify(userSession));

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

    getCoupon2() {
        const { login, userSession } = this.state;

        if (userSession != null) {
            let config = this.state.configApi;
            let baseUrl = config.baseUrl;
            let url = baseUrl + "front/api_new/product/coupon";
            console.log('configApi', JSON.stringify(config));
            console.log('urlss', url);


            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "ci_session=gur1sg8tu7micu8i028lqn1sa4tcaa5k");

            var raw = "";
            var param = { "param": { "id_user": userSession.id_user } };
            var raw = JSON.stringify(param);
            console.log('paramCoupon', JSON.stringify(param));


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

                    console.log('resultCoupon', JSON.stringify(result));
                    this.setState({ coupons: result.data });

                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    alert('Kegagalan Respon Server getCoupon');
                });
        }



    }


    getCoupon() {
        const { login, userSession } = this.state;

        if (userSession != null) {

            let config = this.state.configApi;
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

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loadingSpinner: false });
                    console.log('resultCoupon', JSON.stringify(result));
                    this.setState({ coupons: result.data });

                })
                .catch(error => console.log('error', error));
        }



    }


    onLogOut() {
        var loginVia = this.state.userSession.loginVia;

        if (loginVia == 'form') {

            AsyncStorage.removeItem('userSession');
            AsyncStorage.removeItem('password');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    //this.authentication('Profile');
                    this.props.navigation.navigate("Loading", { redirect: 'Home' });
                }, 50);

            });
        } else if (loginVia == 'google') {
            this._signOut();
            AsyncStorage.removeItem('userSession');
            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    //this.authentication('Profile');
                    this.props.navigation.navigate("Loading", { redirect: 'Home' });
                }, 50);

            });


        } else if (loginVia == 'apple') {



            this.setState({ loading: true }, () => {
                this.setState({ loading: false });
                setTimeout(() => {
                    //this.authentication('Profile');
                    this._signOutApple();
                    AsyncStorage.removeItem('userSession');
                    this.props.navigation.navigate("Loading", { redirect: 'Home' });
                }, 50);

            });




        }
    }

    _signOutApple = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
            });
            const credentialState = await appleAuth.getCredentialStateForUser(
                appleAuthRequestResponse.user
            );
            console.log("Credential state ", credentialState);
            if (credentialState === AppleAuthCredentialState.REVOKED) {
                console.log("User is unauthenticated");
            }
        } catch (appleLogoutError) {
            console.warn("Apple logout error: ", appleLogoutError);
        }
    };



    _signOut = async () => {
        try {
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };



    onShare = async () => {



        //var referral_code=this.state.userSession.refferal_code;
        try {
            const result = await Share.share({
                title: 'Refferal Code',
                message: 'Master Diskon Refferal Code : ' + this.state.userSession.username,
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


    authentication(redirect = '') {

        this.setState(
            {
                loading: true
            },
            () => {
                this.props.actions.authentication(true, response => {
                    if (response.success) {
                        this.props.navigation.navigate("Loading", { redirect: redirect });
                    } else {
                        this.setState({
                            loading: false
                        });
                    }
                });
            }
        );
    }


    addDate(dt, amount, dateType) {
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

    formatDateToString(date) {
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();

        // create the format you want
        return (yyyy + "-" + MM + "-" + dd);
    }

    setUser() {

        let { userSession } = this.state;

        if (userSession != null) {


            let minDatePassport = new Date();
            minDatePassport = this.formatDateToString(minDatePassport);
            minDatePassport = minDatePassport;

            let dtDefAdult = new Date();
            dtDefAdult = this.addDate(dtDefAdult, -13, 'years');
            var def_date_adult = this.formatDateToString(dtDefAdult);

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
            this.setState({ listdata_customer: customer });
            setTimeout(() => {
            }, 50);


        }

    }

    claimCoupon2(id) {
        //const {login,userSession}=this.state;
        const { login, userSession } = this.state;
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=gur1sg8tu7micu8i028lqn1sa4tcaa5k");

        var raw = "";
        if (login == true) {
            var param = {
                "param": {
                    "id": id,
                    "id_user": userSession.id_user,
                    "platform": "app"
                }
            };
            var raw = JSON.stringify(param);

        }

        var url = "https://masterdiskon.com/front/api_new/product/claim_coupon";
        console.log('urlCoupon', url, JSON.stringify(param));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success == false) {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                } else {

                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                    this.updateClainPromo(id);
                }


            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server claimCoupon');
            });
    }

    claimCoupon(id) {
        const { login, userSession } = this.state;


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

        let config = this.state.configApi;
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

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success == false) {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));

                } else {

                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                    this.updateClainPromo(id);
                }


            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server claimCoupon');
            });

    }


    updateClainPromo(id) {
        const { coupons } = this.state;

        const newProjects = coupons.map(p =>
            p.id_coupon === id
                ? {
                    ...p,
                    claimed: 1,

                }
                : p
        );
        console.log('coupons', JSON.stringify(coupons));
        //this.setState({coupons:result.data});
        this.setState({ coupons: newProjects });

    }

    renderItemKunjungan(item, index, loading) {
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
                        <Kunjungan
                            style={[{
                                marginVertical: 0,
                                width: 200,

                            }, margin]}
                            backgroundHeader={BaseColor.primaryColor}
                            name={item.coupon_name}
                            code={item.coupon_code}
                            description={item.coupon_code}
                            valid={this.convertDateText(item.end_date)}
                            remain={priceSplitter('Rp ' + item.minimum)}
                            onPress={() => {
                                //alert(item.id_coupon);
                                this.claimCoupon(item.id_coupon);
                                //this.props.navigation.navigate("HotelDetail");
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

    renderItem(item, index, loading) {
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
                            valid={this.convertDateText(item.end_date)}
                            remain={priceSplitter('Rp ' + item.minimum)}
                            onPress={() => {
                                //alert(item.id_coupon);
                                this.claimCoupon(item.id_coupon);
                                //this.props.navigation.navigate("HotelDetail");
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

    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }


    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            setTimeout(() => {
                this.getCoupon();
                this.setUser();

            }, 20);
            //this.getSession();


        });


    }





    updateParticipant(
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
        let password = this.state.password;
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

                let config = this.state.configApi;
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


                this.getSession();
            }
        });

    }

    updateParticipantPassword(
        passwordOld, passwordNew, passwordConfirm
    ) {
        var data = {
            passwordOld: passwordOld,
            passwordNew: passwordNew,
            passwordConfirm: passwordConfirm,

        }
        const param = { "param": data }
    }


    selectImageFromCamera(item) {
        //console.log('itemss',JSON.stringify(item));
        this.setState({ modalVisible: false });
        if (item.option_list == 'gallery') {
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
                compressImageQuality: 1,
            }).then(image => {
                //console.log(image);
                this.setState({ avatar: this.state.avatar_real });
                setTimeout(() => {
                    //this._fetchImage(image);
                }, 50);
            });
        } else if (item.option_list == 'camera') {
            ImagePicker.openCamera({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
                compressImageQuality: 1,
            }).then(image => {
                //console.log(image);
                this.setState({ avatar: this.state.avatar_real });
                setTimeout(() => {
                    this._fetchImage(image);
                }, 50);
            });

        }

    }

    _fetchImage(image) {
        const config = this.state.config;
        const userSession = this.state.userSession;
        var url = config.baseUrl;
        var path = config.user_order.dir;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=2nt3oj3b2ut3uaemgtnv8ht88mahgb1b");

        var param = {
            "param": {
                "email": userSession.email,
                "id_user": userSession.id_user,
                "foto": image.data
            }
        };
        var raw = JSON.stringify(param);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://masterdiskon.com/front/api_new/user/user_avatar_update", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(JSON.stringify(result));
                var avatar = result.avatar;
                this.setState({ avatar: { uri: avatar } });

                AsyncStorage.getItem('userSession', (error, result) => {
                    if (result) {
                        var userSession = JSON.parse(result);
                        userSession.avatar = avatar;
                        //console.log('userSession',JSON.stringify(userSession));
                        AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                    }
                });
            })
            .catch(error => { alert('Kegagalan Respon Server _fetchImage'); });
    }

    render() {
        const { navigation } = this.props;
        let { tours, hotels, userData, userSession, login, coupons, loadingSpinner, kunjungan } = this.state;
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
                                        this.props.navigation.navigate("ProfileEdit", {
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

                                            updateParticipant: this.updateParticipant,
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
                                        this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}
                                
                                /> */}
                                <CardCustomProfile
                                    title={'QuickPick'}
                                    subtitle={'Isi data penumpang, dengan satu klik'}
                                    icon={'people-outline'}
                                    onPress={() => {
                                        this.props.navigation.navigate("ProfileSmart", { sourcePage: 'profile' });
                                    }}

                                />
                                {
                                    userSession.loginVia === "form" ?

                                        <CardCustomProfile
                                            title={'Ubah Kata Sandi'}
                                            subtitle={'Pesenan lebih cepat, isi data penumpang, dengan satu klik'}
                                            icon={'lock-closed-outline'}
                                            onPress={() => {
                                                this.props.navigation.navigate("ProfileEditPassword", {
                                                    updateParticipantPassword: this.updateParticipantPassword,
                                                });
                                            }}

                                        />
                                        :
                                        <View></View>
                                }



                                <CardCustomProfile
                                    title={'Handphone'}
                                    subtitle={userSession.nationality_phone_code + "-" + userSession.phone}
                                    icon={'phone-portrait-outline'}
                                    onPress={() => {
                                        //this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
                                    }}

                                />

                                <CardCustomProfile
                                    title={'Kode Referal'}
                                    subtitle={'Share kode'}
                                    icon={'ios-code-outline'}
                                    onPress={() => {
                                        this.onShare(userSession.username);
                                    }}

                                />

                                <CardCustomProfile
                                    title={'Sign Out'}
                                    subtitle={'Keluar akun'}
                                    icon={'ios-log-out-outline'}
                                    onPress={() => {
                                        this.onLogOut();
                                    }}

                                />



                                <CardCustomProfile
                                    title={Platform.OS == "android" ? this.state.DataMasterDiskon.versionInPlayStoreName : this.state.DataMasterDiskon.versionInAppStoreName}
                                    subtitle={'App Version'}
                                    icon={'ios-information-outline'}
                                    nav={false}
                                    onPress={() => {
                                        this.setState({ modalVisible: true });
                                        //this.props.navigation.navigate("ProfileSmart",{sourcePage:'profile'});
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
                                                this.props.navigation.navigate("HotelDetail");
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
                                                    this.onShare(userSession.username);
                                                    //this.props.navigation.navigate("HotelDetail");
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
                                                    //this.onShare(userSession.usernam);
                                                    //this.props.navigation.navigate("HotelDetail");
                                                    
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
                                            renderItem={({ item, index }) => this.renderItem(item, index, this.state.loadingSpinner)}
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
                            loading={this.state.loading}
                            onPress={() => this.onLogOut()}
                        >
                            Sign Out
                        </Button>
                    </View> */}

                    <Modal
                        isVisible={this.state.modalVisible}
                        onBackdropPress={() => {
                            this.setState({ modalVisible: false });
                        }}
                        onSwipeComplete={() => {
                            this.setState({ modalVisible: false });
                        }}
                        swipeDirection={["down"]}
                        style={styles.bottomModal}
                    >
                        <View style={styles.contentFilterBottom}>
                            <View style={styles.contentSwipeDown}>
                                <View style={styles.lineSwipeDown} />
                            </View>
                            {this.state.option.map((item, index) => (
                                <TouchableOpacity
                                    style={styles.contentActionModalBottom}
                                    key={item.value}
                                    onPress={() => {
                                        //this.onSelect(item)
                                        this.selectImageFromCamera(item);

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
                    </Modal>
                </ScrollView>

                {
                    Platform.OS == 'android' ?

                        <View style={{ alignItems: "center", backgroundColor: BaseColor.primaryColor, paddingBottom: 10 }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => {
                                    //this.setState({modalVisible:true});
                                    //this.selectImageFromCamera();
                                    alert('Masih Perbaikan');
                                }}
                            >
                                <Icon
                                    name="pencil-alt"
                                    size={20}
                                    color={BaseColor.primaryColor}
                                    style={{ top: 20, left: 100 }}
                                />
                                <Image source={this.state.avatar} style={styles.image} />
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
                        this.props.navigation.navigate("ProfileEdit",{
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

                            updateParticipant: this.updateParticipant,
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
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
