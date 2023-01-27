import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, AsyncStorage, Platform, StatusBar } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import { Form, TextValidator } from 'react-native-validator-form';
import DropdownAlert from "react-native-dropdownalert";

// Load sample data
import { UserData } from "@data";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    contain: {
        padding: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        color: BaseColor.grayColor
    },
    thumb: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },

    contentProfile: {
        flexDirection: "row",
        marginBottom: 15,
        width: '100%',
    },
    searchIcon: {
        flex: 0.4,
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10
    },
    searchIconSplit: {
        flex: 0.9,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10
    },
});


export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        var typeFlight = "";
        if (this.props.navigation.state.params.typeFlight) {
            typeFlight = this.props.navigation.state.params.typeFlight;
        }

        var typeProduct = "";
        if (this.props.navigation.state.params.typeProduct) {
            typeProduct = this.props.navigation.state.params.typeProduct;
        }

        var type = "";
        if (this.props.navigation.state.params.type) {
            type = this.props.navigation.state.params.type;
        }

        var fullname = "";
        if (this.props.navigation.state.params.fullname) {
            fullname = this.props.navigation.state.params.fullname;
        }

        var firstname = "";
        if (this.props.navigation.state.params.firstname) {
            firstname = this.props.navigation.state.params.firstname;
        }

        var lastname = "";
        if (this.props.navigation.state.params.lastname) {
            lastname = this.props.navigation.state.params.lastname;
        }

        var birthday = "";
        if (this.props.navigation.state.params.birthday) {
            birthday = this.props.navigation.state.params.birthday;
        }

        var nationality = "";
        if (this.props.navigation.state.params.nationality) {
            nationality = this.props.navigation.state.params.nationality;
        }

        var passport_number = "";
        if (this.props.navigation.state.params.passport_number) {
            passport_number = this.props.navigation.state.params.passport_number;
        }

        var passport_country = "";
        if (this.props.navigation.state.params.passport_country) {
            passport_country = this.props.navigation.state.params.passport_country;
        }

        var passport_expire = "";
        if (this.props.navigation.state.params.passport_expire) {
            passport_expire = this.props.navigation.state.params.passport_expire;
        }

        var phone = "";
        if (this.props.navigation.state.params.phone) {
            phone = this.props.navigation.state.params.phone;
        }

        var title = "";
        if (this.props.navigation.state.params.title) {
            title = this.props.navigation.state.params.title;
        }

        var email = "";
        if (this.props.navigation.state.params.email) {
            email = this.props.navigation.state.params.email;
        }

        var nationality_id = "";
        if (this.props.navigation.state.params.nationality_id) {
            nationality_id = this.props.navigation.state.params.nationality_id;
        }

        var nationality_phone_code = "";
        if (this.props.navigation.state.params.nationality_phone_code) {
            nationality_phone_code = this.props.navigation.state.params.nationality_phone_code;
        }

        var passport_country_id = "";
        if (this.props.navigation.state.params.passport_country_id) {
            passport_country_id = this.props.navigation.state.params.passport_country_id;
        }

        var old = "";
        if (this.props.navigation.state.params.old) {
            old = this.props.navigation.state.params.old;
        }


        let maxDate = new Date();
        let minDate = new Date();

        if (old === 'adult') {
            maxDate = this.addDate(maxDate, -12, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -80, 'years');
            minDate = this.formatDateToString(minDate);
        } else if (old === 'children') {
            maxDate = this.addDate(maxDate, -2, 'years');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -11, 'years');
            minDate = this.formatDateToString(minDate);

        } else if (old === 'baby') {
            maxDate = this.addDate(maxDate, -3, 'months');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -24, 'months');
            minDate = this.formatDateToString(minDate);
        } else {
            maxDate = this.addDate(maxDate, -3, 'months');
            maxDate = this.formatDateToString(maxDate);

            minDate = this.addDate(minDate, -80, 'years');
            minDate = this.formatDateToString(minDate);
        }

        let maxDatePassport = new Date();
        maxDatePassport = this.addDate(maxDatePassport, +10, 'years');
        maxDatePassport = this.formatDateToString(maxDatePassport);
        maxDatePassport = maxDatePassport;

        let minDatePassport = new Date();
        minDatePassport = this.formatDateToString(minDatePassport);
        minDatePassport = minDatePassport;

        var dataForm = {
            fullname: title + " " + firstname + " " + lastname,
            firstname: firstname,
            lastname: lastname,
            birthday: birthday,
            nationality: nationality,
            passport_number: passport_number,
            passport_country: passport_country,
            passport_expire: passport_expire,
            phone: phone,
            title: title,
            email: email,
            nationality_id: nationality_id,
            passport_country_id: passport_country_id,
            nationality_phone_code: nationality_phone_code
        }

        //console.log(JSON.stringify(dataForm));


        this.state = {
            fullname: fullname,
            firstname: firstname,
            lastname: lastname,
            birthday: birthday,
            nationality: nationality,
            passport_number: passport_number,
            passport_country: passport_country,
            passport_expire: passport_expire,
            phone: phone,
            title: title,
            email: email,
            nationality_id: nationality_id,
            nationality_phone_code: nationality_phone_code,
            passport_country_id: passport_country_id,
            old: old,
            minDate: minDate,
            maxDate: maxDate,

            minDatePassport,
            maxDatePassport,

            typeFlight: typeFlight,
            typeProduct: typeProduct,

            colorButton: BaseColor.secondColor,
            colorButtonText: BaseColor.blackColor,
            disabledButton: false


        };
        this.setCountry = this.setCountry.bind(this);
        this.setNationality = this.setNationality.bind(this);
        this.setPhoneCode = this.setPhoneCode.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.getConfig();
        this.getSession();

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
                //console.log('userSession',userSession);
                var id_user = userSession.id_user;
                this.setState({ id_user: id_user });
                this.setState({ userSession: userSession });
                this.setState({ login: true });
            }
        });
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

    minmaxDate(value, dateType) {
        let dt = new Date();
        dt = this.addDate(dt, -value, dateType);
        var date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
        return date;
    }


    setCountry(id_country, country_name, phone_code) {
        //console.log('passport_country_ids',id_country);
        this.setState({ passport_country_id: id_country });
        this.setState({ passport_country: country_name });
        setTimeout(() => {
            //this.validation();
        }, 50);
    }

    setNationality(id_country, country_name, phone_code) {
        this.setState({ nationality_id: id_country });
        this.setState({ nationality: country_name });
        setTimeout(() => {
            //this.validation();
        }, 50);
    }


    setPhoneCode(phone_code) {
        //console.log('phonecodes',phone_code);
        this.setState({ nationality_phone_code: phone_code });
        setTimeout(() => {
            //this.validation();
        }, 50);
    }


    setTitle(title) {
        this.setState({ title: title });
        setTimeout(() => {
            //this.validation();
        }, 50);
    }


    setDate(date) {

        var date = new Date(date);
        var tempoMonth = (date.getMonth() + 1);
        var tempoDate = (date.getDate());
        var finaldate = "";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return finaldate = date.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    };

    setDateLocal(date) {

        if (date != "") {
            var date = new Date(date);
            var tempoMonth = (date.getMonth() + 1);
            var tempoDate = (date.getDate());
            var finaldate = "";
            return finaldate = tempoDate + '/' + tempoMonth + '/' + date.getFullYear();
        } else {
            return "Set Tanggal"
        }
    };

    updateParticipant() {
        var key = this.props.navigation.state.params.key;
        var fullname = this.state.title + " " + this.state.firstname + " " + this.state.lastname;
        var firstname = this.state.firstname;
        var lastname = this.state.lastname;
        var birthday = this.state.birthday;
        var nationality = this.state.nationality;
        var passport_number = this.state.passport_number;
        var passport_country = this.state.passport_country;
        var passport_expire = this.state.passport_expire;
        var phone = this.state.phone;
        var title = this.state.title;
        var email = this.state.email;

        var nationality_id = this.state.nationality_id;
        var nationality_phone_code = this.state.nationality_phone_code;

        var passport_country_id = this.state.passport_country_id;
        var type = this.props.navigation.state.params.type;

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
            //   passport_country_phone_code,
            type
        );
        this.dropdown.alertWithType(
            "info",
            "Info",
            "Berhasil Diperbarui"
        );
        setTimeout(() => {
            this.props.navigation.goBack();


        }, 1000);

        // const {config,login,id_user,idParam} =this.state;

        //     var paramProfile={
        //         "id_user": id_user,
        //         "fullname": fullname,
        //         "firstname": firstname,
        //         "lastname": lastname,
        //         "birthday": birthday,
        //         "nationality": nationality,
        //         "passport_number": passport_number,
        //         "passport_country": passport_country,
        //         "passport_expire": passport_expire,
        //         "phone": phone,
        //         "title": title,
        //         "email": email,
        //         "nationality_id": nationality_id,
        //         "nationality_phone_code": nationality_phone_code,
        //         "passport_country_id": passport_country_id
        //     }

        //     var url=config.baseUrl;
        //     var path=config.user_order.dir;

        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({"param":paramProfile});

        //     var requestOptions = {
        //       method: 'POST',
        //       headers: myHeaders,
        //       body: raw,
        //       redirect: 'follow'
        //     };

        //     fetch(url+path, requestOptions)
        //       .then(response => response.json())
        //       .then(result => {
        //         this.setState({loading_spinner: false });
        //         this.setState({dataBooking: result});
        //       })
        //       .catch(error => //{ alert('Kegagalan Respon Server');});
    }

    renderPicker() {
        if (this.state.picker) {
            return (
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
            );
        }
    }



    componentDidMount() {

    }






    render() {
        const { navigation } = this.props;
        let { typeFlight, typeProduct, userSession } = this.state;

        var type = this.props.navigation.state.params.type;

        var formFullName = <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 6, marginRight: 15 }}>
                    <Text caption2 style={{ marginTop: -20, color: BaseColor.primaryColor }}>
                        Firstname
                    </Text>
                    <TouchableOpacity
                        style={{ width: '100%', flexDirection: "row" }}
                    >
                        <View style={styles.contentProfile}>
                            <View style={{ flex: 6 }}>
                                <TextValidator
                                    name="firstname"
                                    label="lastname"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    placeholder="e.g., firstname"
                                    type="text"
                                    // keyboardType="email-address"
                                    value={this.state.firstname}
                                    onChangeText={(firstname) => {
                                        this.setState({ firstname: firstname })
                                    }}
                                    style={
                                        Platform.OS === 'ios' ?
                                            { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                            :
                                            {}
                                    }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 6 }}>
                    <Text caption2 style={{ marginTop: -20, color: BaseColor.primaryColor }}>
                        Lastname
                    </Text>
                    <TouchableOpacity
                        style={{ width: '100%', flexDirection: "row" }}
                    >
                        <View style={styles.contentProfile}>
                            <View style={{ flex: 6 }}>
                                <TextValidator
                                    name="lastname"
                                    label="lastname"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    placeholder="e.g., lastname"
                                    type="text"
                                    value={this.state.lastname}
                                    onChangeText={(lastname) => {
                                        this.setState({ lastname: lastname })
                                    }}
                                    style={
                                        Platform.OS === 'ios' ?
                                            { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                            :
                                            {}
                                    }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        </View>

        var formTitle = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Title
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => this.props.navigation.navigate('SelectTitle',
                    {
                        setTitle: this.setTitle,
                        pageReturn: 'ProfileEdit',
                        selected: this.state.title,
                        old: this.state.old
                    })}>

                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., MR"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.title}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>

        </View>

        var formBirthday = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Date of birth
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                    this.datePickerRef.onPressDate()
                }}
            >

                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., 1987-09-18"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.birthday}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>
                </View>
                <DatePicker
                    style={{ display: 'none' }}
                    date={this.state.birthday}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    confirmBtnText="Confirm"
                    animationType={"fade"}
                    androidMode={"spinner"}
                    cancelBtnText="Cancel"
                    showIcon={false}
                    hideText={true}
                    ref={(ref) => this.datePickerRef = ref}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            display: 'none',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                        }
                    }}
                    onDateChange={(date) => {
                        this.setState({ birthday: date });
                    }}
                    style={
                        Platform.OS === 'ios' ?
                            { width: 320, backgroundColor: "white", height: 0 }
                            :
                            { width: 320, backgroundColor: "white", height: 0 }
                    } //add this
                />
            </TouchableOpacity>

        </View>

        var formEmail = <View style={{ marginBottom: 10 }}>
            {/* <TouchableOpacity  disabled={this.state.disabledButton} onPress={() => this.updateParticipant()} >
                                    <View pointerEvents='none' style={styles.groupinput}> */}

            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Email
            </Text>
            <TouchableOpacity
                disabled={true}
                style={{ width: '100%' }}
            >
                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email invalid']}
                            placeholder="e.g., example@email.com"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(email) => {
                                this.setState({ email: email })
                            }}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }

                        />
                    </View>

                </View>
            </TouchableOpacity>


        </View>

        var formPhone = <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 4, marginRight: 15 }}>
                    <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                        Phone Code
                    </Text>
                    <TouchableOpacity
                        style={{ width: '100%', flexDirection: "row" }}
                        onPress={() => this.props.navigation.navigate('SelectPhoneCode',
                            {
                                setPhoneCode: this.setPhoneCode,
                                pageReturn: 'ProfileEdit',
                                selected: this.state.nationality_phone_code,
                                // type:'nationality'
                            })}>
                        <View style={styles.contentProfile} pointerEvents='none'>
                            <View style={{ flex: 6 }}>
                                <TextValidator
                                    name="nationality_phone_code"
                                    label="nationality_phone_code"
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    placeholder="e.g., 021"
                                    type="text"
                                    keyboardType="email-address"
                                    value={this.state.nationality_phone_code}
                                    onChangeText={(nationality_phone_code) => {
                                        this.setState({ nationality_phone_code: nationality_phone_code })
                                    }}
                                    style={
                                        Platform.OS === 'ios' ?
                                            { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                            :
                                            {}
                                    }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 8 }}>
                    <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                        Phone Number
                    </Text>
                    <TouchableOpacity
                        style={{ width: '100%', flexDirection: "row" }}
                    >
                        <View style={styles.contentProfile}>
                            <View style={{ flex: 6 }}>
                                <TextValidator
                                    name="phone"
                                    label="phone"
                                    validators={['required', 'isNumber']}
                                    errorMessages={['This field is required', 'Number invalid']}
                                    placeholder="e.g., 80808080"
                                    type="text"
                                    keyboardType="email-address"
                                    value={this.state.phone}
                                    onChangeText={(phone) => {
                                        this.setState({ phone: phone })
                                        setTimeout(() => {
                                            //this.validation();
                                        }, 50);
                                    }}
                                    style={
                                        Platform.OS === 'ios' ?
                                            { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                            :
                                            {}
                                    }
                                    errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}


                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        </View>

        var formNationality = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Nationality
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => this.props.navigation.navigate('SelectCountry',
                    {
                        setNationality: this.setNationality,
                        pageReturn: 'ProfileEdit',
                        selected: this.state.nationality_id,
                        type: 'nationality'
                    })}>


                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="nationality"
                            label="nationality"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., Indonesia"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.nationality}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>

        </View>

        var formPassportNumber = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Passport Number
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
            >

                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>

                        <TextValidator
                            name="passport_number"
                            label="passport_number"
                            validators={['required', 'isNumber']}
                            errorMessages={['This field is required', 'Number invalid']}
                            placeholder="e.g.,80808080"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.passport_number}
                            onChangeText={(passport_number) => {
                                this.setState({ passport_number: passport_number })
                            }}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                            errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}

                        />
                    </View>


                </View>
            </TouchableOpacity>

        </View>

        var formPassportExpired = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Passport Expired
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => { this.datePickerRef2.onPressDate() }}
            >

                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>
                        <Text>{this.state.passport_expire}</Text>
                        <TextValidator
                            name="Passport Expired"
                            label="passport_expire"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g.,1987-09-18"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.passport_expire}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>
                </View>
                <DatePicker
                    style={{ display: 'none' }}
                    date={this.state.passport_expire}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.minDatePassport}
                    maxDate={this.state.maxDatePassport}
                    confirmBtnText="Confirm"
                    animationType={"fade"}
                    androidMode={"spinner"}
                    cancelBtnText="Cancel"
                    showIcon={false}
                    hideText={true}
                    ref={(ref) => this.datePickerRef2 = ref}
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            display: 'none',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                        }
                    }}
                    onDateChange={(date) => {
                        this.setState({ passport_expire: date });
                    }}
                    style={
                        Platform.OS === 'ios' ?
                            { width: 320, backgroundColor: "white", height: 0 }
                            :
                            { width: 320, backgroundColor: "white", height: 0 }
                    } //add this

                />
            </TouchableOpacity>

        </View>

        var formPassportCountry = <View style={{ marginBottom: 10 }}>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Passport Country
            </Text>
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => this.props.navigation.navigate('SelectCountry',
                    {
                        setCountry: this.setCountry,
                        pageReturn: 'ProfileEdit',
                        selected: this.state.passport_country_id,
                        type: 'passportCountry'
                    })}>



                <View style={styles.contentProfile} pointerEvents='none'>
                    <View style={{ flex: 6 }}>


                        <TextValidator
                            name="passport_country"
                            label="passport_country"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., Indonesia"
                            type="text"
                            keyboardType="email-address"
                            value={this.state.passport_country}
                            style={
                                Platform.OS === 'ios' ?
                                    { height: 50, borderBottomWidth: 1, borderColor: 'black' }
                                    :
                                    {}
                            }
                        />
                    </View>

                </View>
            </TouchableOpacity>

        </View>

        var contentFormComplete = <View style={{ width: '100%' }}>
            {formFullName}
            {formTitle}
            {formBirthday}
            {formEmail}
            {formPhone}
            {formNationality}
            {formPassportNumber}
            {formPassportExpired}
            {formPassportCountry}
        </View>

        var contentFormCustomer = <View style={{ width: '100%' }}>
            {formFullName}
            {formTitle}
            {formEmail}
            {formPhone}
            {formNationality}
        </View>

        var contentFormGuestDomestic = <View style={{ width: '100%' }}>
            {formFullName}
            {formTitle}
            {formBirthday}
            {formNationality}

        </View>

        var contentFormGuestInternational = <View style={{ width: '100%' }}>
            {formTitle}
            {formFullName}
            {formBirthday}
            {formEmail}
            {formPhone}
            {formNationality}
            {formPassportNumber}
            {formPassportExpired}
            {formPassportCountry}
        </View>

        //var contentForm=contentFormGuestInternational;
        var contentForm = <View></View>

        if (type == 'customer') {
            contentForm = contentFormCustomer;
        } else if (type == 'guest') {
            if (typeFlight == 'domestic' || typeProduct == 'trip') {
                contentForm = contentFormGuestDomestic;
            } else {
                contentForm = contentFormGuestInternational;
            }
        } else {
            contentForm = contentFormComplete;
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
                    title="Edit Profile"
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
                    onPressRight={() => { }}
                />
                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                    <ScrollView>

                        <View style={styles.contain}>
                            <Form
                                ref="form"
                                onSubmit={this.submit}
                            >
                                {contentForm}
                            </Form>
                        </View>

                    </ScrollView>
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateParticipant()

                            }}

                        >
                            <View pointerEvents='none' style={styles.groupinput}>
                                <Button
                                    loading={this.state.loading}
                                    style={{ backgroundColor: this.state.colorButton }}
                                    full
                                >
                                    <Text style={{ color: this.state.colorButtonText }}>Save</Text>
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <DropdownAlert
                    ref={(ref) => (this.dropdown = ref)}
                    messageNumOfLines={10}
                    closeInterval={10000}
                />

            </SafeAreaView>
        );
    }
}
