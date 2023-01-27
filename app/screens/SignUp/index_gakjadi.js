// import React, { Component } from "react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions, ApplicationActions } from "@actions";
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    BackHandler,
    Platform,
} from "react-native";
import Recaptcha from 'react-native-recaptcha-that-works';
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button, Text } from "@components";
// import styles from "./styles";
import DropdownAlert from "react-native-dropdownalert";
import ValidationComponent from "react-native-form-validator";
import InputText from "../../components/InputText";
import { Form, TextValidator } from "react-native-validator-form";
import Modal from "react-native-modal";


const styles = StyleSheet.create({
    contain: {
        //alignItems: "center",
        paddingVertical: 50,
        paddingHorizontal: 20,
        width: "100%",
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        width: "100%",
    },

    tabBar: {
        borderTopWidth: 1,
    },
    bodyPaddingDefault: {
        paddingHorizontal: 20,
    },
    bodyMarginDefault: {
        marginHorizontal: 20,
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
        justifyContent: "center",
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: BaseColor.whiteColor,
    },
    contentProfile: {
        paddingVertical: 5,
    },

    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },

    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor,
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center",
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor,
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
    },
});



export default function SignUp(props) {

    let { navigation, auth } = props;
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState({
        firstname: true,
        lastname: true,
        username: true,
        password: true,
        passwordConfirm: true,
        email: true,
    });
    const [colorButton, setColorButton] = useState(BaseColor.greyColor);
    const [colorButtonText, setColorButtonText] = useState(BaseColor.whiteColor);
    const [disabledButton, setDisabledButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const configApi = useSelector((state) => state.application.configApi);
    const config = useSelector((state) => state.application.config);


    useEffect(() => {

        return () => { };
    }, []);


    const send = () => {
        console.log('send!');
        // recaptcha.current.open();
    }

    const onVerify = token => {
        console.log('success!', token);
    }

    const onExpire = () => {
        console.warn('expired!');
    }

    var formTitle = (
        <View style={{ marginBottom: 20 }}>
            <View style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Title
                </Text>
                <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => {
                        setModalVisible(true);
                    }}

                >
                    <View style={styles.contentProfile} pointerEvents='none'>
                        <View style={{ flex: 6 }}>
                            <TextValidator
                                name="title"
                                label="text"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                placeholder="e.g., Mr"
                                type="text"
                                value={title}
                                onChangeText={(title) => {
                                    setTitle(title);
                                    setTimeout(() => {
                                        validation();
                                    }, 50);
                                }}
                                errorStyle={{
                                    underlineValidColor: BaseColor.textPrimaryColor,
                                    text: { color: BaseColor.thirdColor },
                                    underlineInvalidColor: BaseColor.thirdColor,
                                }}
                                style={
                                    Platform.OS === "ios"
                                        ? {
                                            height: 40,
                                            borderBottomWidth: 1,
                                            borderColor: "black",
                                            marginBottom: 0,
                                        }
                                        : {}
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                swipeDirection={["down"]}
                style={styles.bottomModal}
            >
                <View
                    style={[
                        styles.contentFilterBottom,
                        { paddingBottom: 20 },
                        { height: 400 },
                    ]}
                >
                    <View style={styles.contentSwipeDown}>
                        <View style={styles.lineSwipeDown} />
                    </View>
                    <View style={{ flexDirection: "column", marginVertical: 2 }}>

                        {[
                            {
                                key: 'mr',
                                value: 'mr'
                            },
                            {
                                key: 'mrs',
                                value: 'mrs'
                            }
                        ].map((item, index) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.value}
                                onPress={() => {
                                    this.setState({ title: item.key });
                                    this.setState({ modalVisible: false })
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ marginLeft: 10 }} caption2 bold>
                                        {item.value}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>
            </Modal>
        </View>
    );

    var formFirstname = (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Firstname
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="firstname"
                            label="text"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            placeholder="e.g., John"
                            type="text"
                            value={firstname}
                            onChangeText={(firstname) => {
                                setFirstname(firstname);
                                setTimeout(() => {
                                    validation();
                                }, 50);
                            }}
                            errorStyle={{
                                underlineValidColor: BaseColor.textPrimaryColor,
                                text: { color: BaseColor.thirdColor },
                                underlineInvalidColor: BaseColor.thirdColor,
                            }}
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                        marginBottom: 0,
                                    }
                                    : {}
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    var formLastname = (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Lastname
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="lastname"
                            label="text"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            placeholder="e.g., Doe"
                            type="text"
                            value={lastname}
                            onChangeText={(lastname) => {
                                setLastname(lastname);
                                setTimeout(() => {
                                    validation();
                                }, 50);
                            }}
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                        marginBottom: 0,
                                    }
                                    : {}
                            }
                            errorStyle={{
                                underlineValidColor: BaseColor.textPrimaryColor,
                                text: { color: BaseColor.thirdColor },
                                underlineInvalidColor: BaseColor.thirdColor,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    var formUsername = (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Username
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="username"
                            label="text"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            placeholder="e.g., johndoe"
                            type="text"
                            value={username}
                            onChangeText={(username) => {
                                setUsername(username);
                                setTimeout(() => {
                                    validation();
                                }, 50);
                            }}
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                        marginBottom: 0,
                                    }
                                    : {}
                            }
                            errorStyle={{
                                underlineValidColor: BaseColor.textPrimaryColor,
                                text: { color: BaseColor.thirdColor },
                                underlineInvalidColor: BaseColor.thirdColor,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    var formEmail = (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Email
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="email"
                            label="email"
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "Email invalid"]}
                            placeholder="e.g., johndoe@email.com"
                            type="text"
                            value={email}
                            onChangeText={(email) => {
                                //setEmail(text.toLowerCase());
                                setEmail(email.toLowerCase());
                                setTimeout(() => {
                                    svalidation();
                                }, 50);
                            }}
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                        marginBottom: 0,
                                    }
                                    : {}
                            }
                            errorStyle={{
                                underlineValidColor: BaseColor.textPrimaryColor,
                                text: { color: BaseColor.thirdColor },
                                underlineInvalidColor: BaseColor.thirdColor,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    var formPassword = (
        <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={{ width: "100%" }}>
                <Text
                    caption2
                    style={{ marginTop: -15, color: BaseColor.primaryColor }}
                >
                    Password
                </Text>
                <View style={styles.contentProfile}>
                    <View style={{ flex: 6 }}>
                        <TextValidator
                            name="password"
                            label="text"
                            secureTextEntry
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            placeholder="********"
                            type="text"
                            value={password}
                            onChangeText={(password) => {
                                setPassword(password);
                                setTimeout(() => {
                                    validation();
                                }, 50);
                            }}
                            style={
                                Platform.OS === "ios"
                                    ? {
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                        marginBottom: 0,
                                    }
                                    : {}
                            }
                            errorStyle={{
                                underlineValidColor: BaseColor.textPrimaryColor,
                                text: { color: BaseColor.thirdColor },
                                underlineInvalidColor: BaseColor.thirdColor,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    function validation() {



        if (
            title != "" &&
            firstname != "" &&
            lastname != "" &&
            username != "" &&
            password != "" &&
            passwordConfirm != "" &&
            email != ""
        ) {

            setColorButton(BaseColor.secondColor);
            setColorButtonText(BaseColor.primaryColor);
            setDisabledButton(false);
            //}
        } else {

            setColorButton(BaseColor.greyColor);
            setColorButtonText(BaseColor.whiteColor);
            setDisabledButton(true);
        }
    }


    return (
        <SafeAreaView
            style={[
                BaseStyle.safeAreaView,
                { backgroundColor: BaseColor.primaryColor },
            ]}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Sign Up"
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
                    //navigation.navigate('SignIn');
                }}
            />
            <View
                style={{
                    position: "absolute",
                    backgroundColor: "#FFFFFF",
                    flex: 1,
                    height: 45,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            ></View>
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <ScrollView>
                    <View style={styles.contain}>
                        <Form
                            ref="form"
                        //onSubmit={this.onSubmit}
                        >
                            {formTitle}
                            {formFirstname}
                            {formLastname}
                            {formUsername}
                            {formEmail}
                            {formPassword}

                            <TouchableOpacity
                                disabled={disabledButton}
                                onPress={() => onSubmit()}
                            >
                                <View pointerEvents="none" style={styles.groupinput}>
                                    <Button
                                        loading={loading}
                                        style={{ backgroundColor: colorButton }}
                                        full
                                    >
                                        <Text style={{ color: colorButtonText }}>
                                            Sign Up
                                        </Text>
                                    </Button>
                                </View>
                            </TouchableOpacity>

                        </Form>
                    </View>
                </ScrollView>
                <DropdownAlert
                    ref={(ref) => (this.dropdown = ref)}
                    messageNumOfLines={10}
                    closeInterval={10000}
                />
            </View>
        </SafeAreaView>
    );

}