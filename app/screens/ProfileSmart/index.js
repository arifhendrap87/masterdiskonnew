import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Switch, Animated, TextInput, AsyncStorage, ActivityIndicator, FlatList, RefreshControl, Alert, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActions } from "@actions";
import { BaseStyle, BaseColor, BaseSetting, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    ProfileDetail,
    ProfilePerformance
} from "@components";
import styles from "./styles";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

import * as Utils from "@utils";
// Load sample data
import { UserData } from "@data";
import { PostData } from '../../services/PostData';
import moment from "moment";
import Modal from "react-native-modal";

class ProfileSmart extends Component {
    constructor(props) {
        super(props);


        var sourcePage = "";
        if (this.props.navigation.state.params.sourcePage) {
            sourcePage = this.props.navigation.state.params.sourcePage;
        }

        //alert(sourcePage);

        var item = [];
        if (this.props.navigation.state.params.item) {
            item = this.props.navigation.state.params.item;
        }
        console.log('item', JSON.stringify(item));

        var type = "";
        if (this.props.navigation.state.params.type) {
            type = this.props.navigation.state.params.type;
        }
        var old = "";
        if (this.props.navigation.state.params.old) {
            old = this.props.navigation.state.params.old;
        }



        this.state = {
            reminders: false,
            loading: false,
            userData: UserData[0],
            participant: [],
            heightHeader: Utils.heightHeader(),
            sourcePage: sourcePage,
            item: item,
            type: type,
            old: old,
            modalVisible: false,
            option: [
                {
                    option_list: "adult",
                    option_list_label: "Adult",
                    icon: "",
                },
                {
                    option_list: "children",
                    option_list_label: "Children",
                    icon: "",
                },
                {
                    option_list: "baby",
                    option_list_label: "Baby",
                    icon: "",
                },

            ]

        };
        this._deltaY = new Animated.Value(0);
        this.updateParticipant = this.updateParticipant.bind(this);

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
                ////console.log('getConfig',config);
                this.setState({ config: config });
            }
        });
    }
    getSession() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
    }

    redirect(redirect = '') {
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

        if (key == '0') {
            this.fetch();
        } else {
        }

        this.saveParticipant(key, fullname,
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
            passport_country_id);
    }


    saveParticipant(
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
        passport_country_id) {
        const { login, id_user, idParam } = this.state;


        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant_update";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        // let config=this.state.configApi;
        // let baseUrl=config.baseUrl;
        // let url=baseUrl+"front/api_new/user/participant_update";
        // console.log('configApi',JSON.stringify(config));
        // console.log('urlss',url);

        // var url=config.baseUrl;
        // var path=config.user_participant_save.dir;

        const data = {
            "id": key,
            "id_user": id_user,
            "fullname": fullname,
            "firstname": firstname,
            "lastname": lastname,
            "birthday": birthday,
            "nationality": nationality,
            "passport_number": passport_number,
            "passport_country": passport_country,
            "passport_expire": passport_expire,
            "phone": phone,
            "title": title,
            "email": email,
            "nationality_id": nationality_id,
            "nationality_phone_code": nationality_phone_code,
            "passport_country_id": passport_country_id,
            "type": this.convertOld(birthday)
        }
        const param = { "param": data }
        console.log('paramSaveParticipant', JSON.stringify(param));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


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


            })
            .catch(error => {

                alert('Kegagalan Respon Server saveParticipant')
            });
    }


    deleteParticipant(id) {
        const { login, id_user, idParam } = this.state;

        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant_delete";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        // var url=config.baseUrl;
        // var path=config.user_participant_delete.dir;

        const data = {
            "id": id,
        }
        const param = { "param": data }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


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
                setTimeout(() => {
                    this.fetch();
                }, 50);


            })
            .catch(error => {

                alert('Kegagalan Respon Server')
            });


    }

    componentDidMount() {
        let { } = this.state;
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            setTimeout(() => {
                this.fetch();
            }, 20);

        });

    }




    fetch() {
        const { login, id_user, idParam, old, item } = this.state;
        console.log(old);



        let config = this.state.configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/user/participant";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        // var url=config.baseUrl;
        // var path=config.user_participant.dir;
        this.setState({ loading: true });
        const data = { "id": "", "id_user": id_user }
        const param = { "param": data }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

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
                this.setState({ loading: false });
                console.log('participant', JSON.stringify(result));
                //this.setState({participant: result});
                var filtersParam = {};
                if (old == 'adult') {
                    filtersParam.old = old => old === 'ADT';
                } else if (old == 'children') {
                    filtersParam.old = old => old === 'CHD';
                } else if (old == 'baby') {
                    filtersParam.old = old => old === 'INF';
                }
                var products = result;
                var filters = filtersParam;
                const filtered = this.filterArray(products, filters);
                this.setState({ participant: filtered });
                //console.log('filtered',JSON.stringify(filtered));
            })
            .catch(error => {
                alert('Kegagalan Respon Server')
            });

    }

    filterArray(array, filters) {
        const filterKeys = Object.keys(filters);
        return array.filter(item => {
            // validates all filter criteria
            return filterKeys.every(key => {
                // ignores non-function predicates
                if (typeof filters[key] !== 'function') return true;
                return filters[key](item[key]);
            });
        });
    }




    onChange(select) {

        this.setState({
            participant: this.state.participant.map(item => {
                if (item.id == select.id) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }

            })
        });

        var sourcePage = this.state.sourcePage;

        if (sourcePage == 'summary') {
            var key = this.state.item.key;
            var fullname = select.fullname;
            var firstname = select.firstname;
            var lastname = select.lastname;
            var birthday = select.birthday;
            var nationality = select.nationality;
            var passport_number = select.passport_number;
            var passport_country = select.passport_country;
            var passport_expire = select.passport_expire;
            var phone = select.phone;
            var title = select.title;
            var email = select.email;
            var nationality_id = select.nationality_id;
            var nationality_phone_code = select.nationality_phone_code;
            var passport_country_id = select.passport_country_id;

            var type = this.state.type;
            var old_select = this.convertOld2(select.old);
            ////console.log('conversi old',old_select);
            var old = this.state.old;
            this.props.navigation.state.params.updateParticipant(
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
                type,
                old,
                old_select
            );
            this.props.navigation.goBack();
        } else if (sourcePage == 'profile') {
            this.props.navigation.navigate('DetailContact', {
                key: select.id,
                label: 'xx',
                fullname: select.fullname,
                firstname: select.firstname,
                lastname: select.lastname,
                birthday: select.birthday,
                nationality: select.nationality,
                passport_number: select.passport_number,
                passport_country: select.passport_country,
                passport_expire: select.passport_expire,
                phone: select.phone,
                title: select.title,
                email: select.email,
                nationality_id: select.nationality_id,
                nationality_phone_code: select.nationality_phone_code,
                passport_country_id: select.passport_country_id,
                updateParticipant: this.updateParticipant,
                type: 'guest',
                old: select.old
            });

        }



    }

    gotoDetailContact(item) {
        this.setState({ modalVisible: false });


        this.props.navigation.navigate('DetailContact', {
            key: '0',
            label: '',
            fullname: '',
            firstname: '',
            lastname: '',
            birthday: '',
            nationality: '',
            passport_number: '',
            passport_country: '',
            passport_expire: '',
            phone: '',
            title: '',
            email: '',

            nationality_id: '',
            nationality_phone_code: '',

            passport_country_id: '',


            updateParticipant: this.updateParticipant,
            type: 'guest',
            old: item.option_list
        });


    }

    search(value) {
        this.setState({ loading_spinner: true }, () => {
            PostData('common/airport', { "param": value })
                .then((result) => {
                    this.setState({ loading_spinner: false });
                    this.setState({ flight: result });
                    const { navigation } = this.props;
                    const selected = navigation.getParam("selected");

                    if (selected) {
                        this.setState({
                            flight: this.state.flight.map(item => {
                                return {
                                    ...item,
                                    checked: item.code == selected
                                };
                            })
                        });
                    }
                },
                    (error) => {
                        this.setState({ error });
                    }
                );
        });

    }

    getAge(dateString) {
        var today = new Date();
        var DOB = new Date(dateString);
        var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
        totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
        var years = today.getFullYear() - DOB.getFullYear();
        if (DOB.getMonth() > today.getMonth())
            years = years - 1;
        else if (DOB.getMonth() === today.getMonth())
            if (DOB.getDate() > today.getDate())
                years = years - 1;

        var days;
        var months;

        if (DOB.getDate() > today.getDate()) {
            months = (totalMonths % 12);
            if (months == 0)
                months = 11;
            var x = today.getMonth();
            switch (x) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: {
                    var a = DOB.getDate() - today.getDate();
                    days = 31 - a;
                    break;
                }
                default: {
                    var a = DOB.getDate() - today.getDate();
                    days = 30 - a;
                    break;
                }
            }

        }
        else {
            days = today.getDate() - DOB.getDate();
            if (DOB.getMonth() === today.getMonth())
                months = (totalMonths % 12);
            else
                months = (totalMonths % 12) + 1;
        }
        var age = years + 'y-' + months + 'm-' + days + 'd';
        return age;




    }

    convertOld(dateString) {

        var age = parseInt(moment().diff(dateString, 'years', true));
        var old = "";
        if (age < 2) {
            old = "INF";
        } else if (age >= 2 && age <= 11) {
            old = "CHD";
        } else {
            old = "ADT";
        }
        return old;
    }

    convertOld2(old) {

        var oldNew = '';
        if (old === 'INF') {
            oldNew = 'baby';
        } else if (old === 'CHD') {
            oldNew = 'children';
        } else {
            oldNew = 'adult';
        }
        ////console.log('oldNew',oldNew);
        return oldNew;
    }



    render() {
        const { navigation } = this.props;
        const { userData, loading, heightHeader, participant, loading_spinner, sourcePage } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(140);
        const marginTopBanner = heightImageBanner - heightHeader - 70;

        var buttonAdd = <View></View>
        if (sourcePage == 'profile') {
            buttonAdd = <View style={{ padding: 20 }}>
                <Button
                    full
                    // loading={loading}
                    onPress={() => {
                        this.setState({ modalVisible: true });

                    }}
                >
                    Add Profile
                    </Button>
            </View>
        }





        var content = <View></View>

        if (this.state.loading) {

            content = <View><Placeholder
                Animation={Fade}
                style={{
                    borderBottomWidth: 1,
                    borderColor: BaseColor.textSecondaryColor,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}
            >
                <PlaceholderLine width={50} style={{ marginTop: 2, marginBottom: 0, height: 15 }} />
                <PlaceholderLine width={100} style={{ marginTop: 2, marginBottom: 0, height: 20 }} />
            </Placeholder>
                <Placeholder
                    Animation={Fade}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: BaseColor.textSecondaryColor,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <PlaceholderLine width={50} style={{ marginTop: 2, marginBottom: 0, height: 15 }} />
                    <PlaceholderLine width={100} style={{ marginTop: 2, marginBottom: 0, height: 20 }} />
                </Placeholder>
            </View>
        } else {
            if (participant.length == 0) {
                content = <View></View>
            } else {
                var icon = '';
                var buttonDelete = false;
                if (sourcePage == 'summary') {
                    icon = 'md-arrow-redo-outline';
                    buttonDelete = false
                } else {
                    icon = 'create-outline';
                    buttonDelete = true;
                }


                content = <FlatList
                    contentContainerStyle={{
                        marginHorizontal: 20
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={[BaseColor.primaryColor]}
                            tintColor={BaseColor.primaryColor}
                            refreshing={this.state.refreshing}
                            onRefresh={() => { }}
                        />
                    }
                    data={participant}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.item}>
                            <ProfileDetail
                                textFirst={this.convertOld2(this.convertOld(item.birthday)) + this.getAge(item.birthday)}
                                textSecond={item.fullname}
                                textThird={item.fullname}
                                onPress={() => {
                                    this.onChange(item)
                                }}
                                viewImage={false}
                                icon={icon}
                                style={{ flex: 11 }}
                            />
                            {
                                buttonDelete ?
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            Alert.alert(
                                                'Remove User',
                                                'Yakin ingin mau di hapus ?',
                                                [
                                                    { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                                                    { text: 'YES', onPress: () => this.deleteParticipant(item.id) },
                                                ]
                                            );
                                        }}
                                    >
                                        <Icon
                                            name="ios-trash-outline"
                                            size={18}
                                            color={BaseColor.thirdColor}
                                            style={{ textAlign: "center" }}
                                        />
                                    </TouchableOpacity>
                                    :
                                    <View></View>
                            }

                        </View>
                    )}
                />
            }
        }

        return (
            <View style={{ flex: 1 }}>


                <SafeAreaView
                    style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title="Quick Pick"
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
                        onPressRight={() => {
                            navigation.navigate("Notification");
                        }}
                        onPressRightSecond={() => {
                            navigation.navigate("Messenger");
                        }}
                    />
                    <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                    <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                        <ScrollView
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: { y: this._deltaY }
                                    }
                                }
                            ])}
                            onContentSizeChange={() =>
                                this.setState({
                                    heightHeader: Utils.heightHeader()
                                })
                            }
                            scrollEventThrottle={8}

                        >



                            <View style={styles.contain}>
                                <View style={{ width: "100%" }}>
                                    {content}
                                </View>
                            </View>
                        </ScrollView>
                        {buttonAdd}
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
                                            this.gotoDetailContact(item);

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
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSmart);
