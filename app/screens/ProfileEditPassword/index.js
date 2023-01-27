import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import { Form, TextValidator } from 'react-native-validator-form';
import DropdownAlert from 'react-native-dropdownalert';

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


export default class ProfileEditPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordOld: '',
            passwordNew: '',
            passwordConfirm: '',
            colorButton: BaseColor.secondColor,
            colorButtonText: BaseColor.primaryColor,
        };
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


    updateParticipantPassword() {
        var config = this.state.config;
        var passwordOld = this.state.passwordOld;
        var passwordNew = this.state.passwordNew;
        var passwordConfirm = this.state.passwordConfirm;
        var userSession = this.state.userSession;

        this.props.navigation.state.params.updateParticipantPassword(
            passwordOld,
            passwordNew,
            passwordConfirm,
        );

        var url = config.baseUrl;
        var path = 'front/api_new/user/user_update_password';
        var params = { "param": { "email": userSession.email, "oldPassword": this.state.passwordOld, "password": this.state.passwordNew, "passwordConfirm": this.state.passwordConfirm } }
        console.log('userUpdatePassword', JSON.stringify(params));


        var param = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }


        fetch(url + path, param)
            .then(response => response.json())
            .then(result => {
                //console.log('resultuserUpdatePassword',JSON.stringify(result));
                if (result.success == false) {
                    this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                } else {
                    this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));

                    setTimeout(() => {
                        this.props.navigation.goBack();
                    }, 50);

                }

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                alert('Kegagalan Respon Server');
            });




    }




    componentDidMount() {

    }


    render() {
        const { navigation } = this.props;
        let { } = this.state;

        var formPasswordNew = <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
                disabled={true}
                style={{ width: '100%' }}
            >
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="passwordNew"
                            label="passwordNew"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., password new"
                            type="text"
                            value={this.state.passwordNew}
                            onChangeText={(passwordNew) => {
                                this.setState({ passwordNew: passwordNew })
                            }}


                        />
                    </View>

                </View>
            </TouchableOpacity>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                New Password
                                            </Text>

        </View>


        var formPasswordOld = <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
                disabled={true}
                style={{ width: '100%' }}
            >
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="passwordOld"
                            label="passwordOld"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., password Old"
                            type="text"
                            value={this.state.passwordOld}
                            onChangeText={(passwordOld) => {
                                this.setState({ passwordOld: passwordOld })
                            }}


                        />
                    </View>

                </View>
            </TouchableOpacity>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Old Password
                                        </Text>

        </View>


        var formPasswordConfirm = <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
                disabled={true}
                style={{ width: '100%' }}
            >
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="passwordConfirm"
                            label="passwordConfirm"
                            validators={['required']}
                            errorMessages={['This field is required']}
                            placeholder="e.g., password confirm"
                            type="text"
                            value={this.state.passwordConfirm}
                            onChangeText={(passwordConfirm) => {
                                this.setState({ passwordConfirm: passwordConfirm })
                            }}


                        />
                    </View>

                </View>
            </TouchableOpacity>
            <Text caption2 style={{ marginTop: -15, color: BaseColor.primaryColor }}>
                Confirm Password
                                            </Text>

        </View>


        var contentForm = <View style={{ width: '100%' }}>
            {formPasswordOld}
            {formPasswordNew}
            {formPasswordConfirm}
        </View>

        //var contentForm=contentFormGuestInternational;
        // var contentForm=<View></View>

        // if(type=='customer'){
        //     contentForm=contentFormCustomer;
        // }else if(type=='guest'){
        //     if(typeFlight=='domestic' || typeProduct=='trip'){
        //         contentForm=contentFormGuestDomestic;
        //     }else{
        //         contentForm=contentFormGuestInternational;
        //     }
        // }else{
        //     contentForm=contentFormComplete;
        // }


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >

                <Header
                    title="Change Passowrd"
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
                    <TouchableOpacity onPress={() => this.updateParticipantPassword()} >
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
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} />


            </SafeAreaView>
        );
    }
}
