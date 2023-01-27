import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, BackHandler, Platform } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button, Text } from "@components";
// import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';
import ValidationComponent from 'react-native-form-validator';
import InputText from "../../components/InputText";
import { Form, TextValidator } from 'react-native-validator-form';


const styles = StyleSheet.create({
    contain: {
        //alignItems: "center",
        paddingVertical: 50,
        paddingHorizontal: 20,
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        width: "100%"
    },



    tabBar: {
        borderTopWidth: 1
    },
    bodyPaddingDefault: {
        paddingHorizontal: 20
    },
    bodyMarginDefault: {
        marginHorizontal: 20
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        justifyContent: "center"
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: BaseColor.whiteColor
    },
    contentProfile: {
        paddingVertical: 5

    }
});



export default class ForgotPassword extends ValidationComponent {
    constructor(props) {
        super(props);

        var user = '';
        if (this.props.navigation.state.params.user) {
            user = this.props.navigation.state.params.user;
        }
        this.state = {

            password: "",
            passwordConfirm: "",
            email: "",

            user: user,
            code: '',
            referral: '',

            colorButton: BaseColor.greyColor,
            colorButtonText: BaseColor.whiteColor,
            disabledButton: true
        };
        this.getConfig();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        //this.props.navigation.navigate('SignIn');
        this.props.navigation.goBack(null);
        return true;
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

    onResend() {
        const { email, password, success, redirect, config, code } = this.state;
        const { navigation } = this.props;
        var url = config.baseUrl;
        var myHeaders = new Headers();
        //myHeaders.append("Cookie", "ci_session=e30beo9broapl8qr0c9nvgmlegu31rlg");
        this.setState({ loading_ForgotPassword: true });
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url + "front/api_new/AuthLogin/revermail?email=" + this.state.email, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading_ForgotPassword: false });
                this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));

            })
            .catch(error => alert('Kegagalan Respon Server'));

    }

    onSubmit() {
        const { navigation } = this.props;
        let { config, password, passwordConfirm, email, success } = this.state;
        this.setState({ loading: true });
        if (password == "" || passwordConfirm == "" || email == "") {
            this.setState({
                success: {
                    ...success,
                    password: password != "" ? true : false,
                    passwordConfirm: passwordConfirm != "" ? true : false,
                    email: email != "" ? true : false,
                }
            });
        } else {
            var url = config.baseUrl + "front/api_new/AuthRegister/forgot_password";
            var data = { "password": password, "passwordConfirm": passwordConfirm, "email": email }
            const param = { "param": data }

            console.log("------------------paramforgotpassword--------------");
            console.log(url, JSON.stringify(param));

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
                    console.log('resultChanhe', JSON.stringify(result));
                    var param = result;
                    console.log(JSON.stringify(param));

                    this.setState({ loading: false });
                    console.log(JSON.stringify(result));
                    if (result.success == false) {

                        if (result.error == 'not_same') {
                            this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        } else if (result.error == 'not_register') {
                            this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        }
                    } else {
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        setTimeout(() => {
                            navigation.navigate('SignIn');
                        }, 50);
                        //this.onLoginGoogle(param);
                    }

                })
                .catch(error => {
                    this.setState({ loading: false });
                    alert('Kegagalan Respon Server')
                });

        }
    }

    validation() {
        let { name, firstname, lastname, username, password, passwordConfirm, email, address, success } = this.state;

        //var errorMsg=this.getErrorMessages();
        var dataForm = {
            password: password,
            passwordConfirm: passwordConfirm,
            email: email,
        }

        //console.log(JSON.stringify(dataForm));

        if (password != "" && passwordConfirm != "" && email != "") {
            // if(errorMsg !=''){
            //             //console.log('not yet');
            //             this.setState({colorButton:BaseColor.greyColor});
            //             this.setState({colorButtonText:BaseColor.whiteColor});
            //             this.setState({disabledButton:true});
            //         }else{
            console.log('perfect');
            this.setState({ colorButton: BaseColor.secondColor });
            this.setState({ colorButtonText: BaseColor.primaryColor });
            this.setState({ disabledButton: false });
            //}
        } else {
            console.log('not yet');
            this.setState({ colorButton: BaseColor.greyColor });
            this.setState({ colorButtonText: BaseColor.whiteColor });
            this.setState({ disabledButton: true });

        }
    }


    render() {
        const { navigation } = this.props;
        let { } = this.state;


        var formCode = <View style={{ marginBottom: 10 }}>
            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                    style={{ width: '100%' }}
                >
                    <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                        Email
                                            </Text>
                    <View style={styles.contentProfile}>
                        <View style={{ flex: 6 }}>
                            <TextValidator
                                name="email"
                                label="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                placeholder="e.g., johndoe@email.com"
                                type="text"
                                value={this.state.email}
                                onChangeText={(email) => {
                                    this.setState({ email: email })
                                    setTimeout(() => {
                                        this.validation();
                                    }, 50);
                                }}
                                errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                                style={
                                    Platform.OS === 'ios' ?
                                        { height: 40, borderBottomWidth: 1, borderColor: 'black', marginBottom: 0 }
                                        :
                                        {}
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                    style={{ width: '100%' }}
                >
                    <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                        Password
                                            </Text>
                    <View style={styles.contentProfile}>
                        <View style={{ flex: 6 }}>
                            <TextValidator
                                name="password"
                                label="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                placeholder="e.g., password"
                                type="text"
                                value={this.state.password}
                                onChangeText={(password) => {
                                    this.setState({ password: password })
                                    setTimeout(() => {
                                        this.validation();
                                    }, 50);
                                }}
                                errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                                style={
                                    Platform.OS === 'ios' ?
                                        { height: 40, borderBottomWidth: 1, borderColor: 'black', marginBottom: 0 }
                                        :
                                        {}
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
                    style={{ width: '100%' }}
                >
                    <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                        Konfirmasi Password
                                            </Text>
                    <View style={styles.contentProfile}>
                        <View style={{ flex: 6 }}>
                            <TextValidator
                                name="passwordConfirm"
                                label="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                placeholder="e.g., passwordConfirm"
                                type="text"
                                value={this.state.passwordConfirm}
                                onChangeText={(passwordConfirm) => {
                                    this.setState({ passwordConfirm: passwordConfirm })
                                    setTimeout(() => {
                                        this.validation();
                                    }, 50);
                                }}
                                errorStyle={{ underlineValidColor: BaseColor.textPrimaryColor, text: { color: BaseColor.thirdColor }, underlineInvalidColor: BaseColor.thirdColor }}
                                style={
                                    Platform.OS === 'ios' ?
                                        { height: 40, borderBottomWidth: 1, borderColor: 'black', marginBottom: 0 }
                                        :
                                        {}
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>


        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Forgot Password"
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
                        //navigation.goBack();
                        navigation.navigate('SignIn');
                    }}
                />
                <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>
                <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>

                    <ScrollView>

                        <View style={styles.contain}>
                            <Text body2 bold>Lupa kata sandi</Text>
                            <Form
                                ref="form"
                                //onSubmit={this.onSubmit}
                                style={{ marginTop: 50 }}
                            >
                                {formCode}

                                <TouchableOpacity disabled={this.state.disabledButton} onPress={() => this.onSubmit()} >
                                    <View pointerEvents='none' style={styles.groupinput}>
                                        <Button
                                            loading={this.state.loading}
                                            style={{ backgroundColor: this.state.colorButton }}
                                            full
                                        >
                                            <Text style={{ color: this.state.colorButtonText }}>Reset</Text>
                                        </Button>
                                    </View>
                                </TouchableOpacity>
                            </Form>






                        </View>
                    </ScrollView>
                    <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
                </View>
            </SafeAreaView>
        );
    }
}
