import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationActions, AuthActions } from "@actions";
import { useSelector, useDispatch } from "react-redux";
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

export default function ForgotPassword(props) {
    let { navigation, auth } = props;
    const configApi = useSelector((state) => state.application.configApi);
    const dispatch = useDispatch();
    const [param, setParam] = useState(
        props.navigation.state.params && props.navigation.state.params.param
            ? props.navigation.state.params.param
            : {}
    );
    const [redirect, setRedirect] = useState(
        props.navigation.state.params && props.navigation.state.params.redirect
            ? props.navigation.state.params.redirect
            : "Home"
    );

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageBackground, setMessageBackground] = useState('');

    function onSubmit() {
        if (email == '') {
            setMessage('Email tidak boleh kosong');
            setMessageBackground(BaseColor.thirdColor);
        } else {
            let config = configApi;
            let baseUrl = config.apiBaseUrl;
            let url = baseUrl + "auth/forgotpassword/" + email.toLowerCase() + "?from=app";
            console.log('url', url);
            var myHeaders = new Headers();


            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('resultToken', JSON.stringify(result));

                    if (result.status == 200) {

                        setMessage(result.message);
                        setMessageBackground(BaseColor.primaryColor);
                        navigation.navigate("ResetPassword", {

                            email: email,

                        });
                    } else {
                        setMessage(result.message);
                        setMessageBackground(BaseColor.thirdColor);

                    }

                })
                .catch(error => console.log('error', error));
        }
    }

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
                            value={email}
                            onChangeText={(email) => {
                                setEmail(email);

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

                            //onSubmit={this.onSubmit}
                            style={{ marginTop: 30 }}
                        >
                            {
                                message != '' ?
                                    <View style={{ marginBottom: 30, backgroundColor: messageBackground, padding: 10, borderRadius: 5 }}>
                                        <Text whiteColor>{message}</Text>
                                    </View>
                                    :
                                    <View />
                            }
                            {formCode}


                            <TouchableOpacity onPress={() => onSubmit()} >
                                <View pointerEvents='none' style={styles.groupinput}>
                                    <Button
                                        // loading={this.state.loading}
                                        style={{ backgroundColor: BaseColor.primaryColor }}
                                        full
                                    >
                                        <Text style={{ color: BaseColor.whiteColor }}>Get Token</Text>
                                    </Button>
                                </View>
                            </TouchableOpacity>
                        </Form>






                    </View>
                </ScrollView>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </View>
            <DropdownAlert
                ref={(ref) => (this.dropdown = ref)}
                messageNumOfLines={10}
                closeInterval={10000}
            />
        </SafeAreaView>
    );

}