import React, { Component } from "react";
//import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
// import styles from "./styles";

import CountDown from 'react-native-countdown-component';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';


export default function NotYetLoginHome(props) {
    let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);

    return (
        <View>
            {
                login == false ?

                    <View style={{ backgroundColor: BaseColor.whiteColor, flex: 1, marginVertical: 10 }}>
                        <View style={{ marginHorizontal: 20, flexDirection: 'row', paddingVertical: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={Images.login}
                                    style={{ width: "100%", height: "100%" }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flex: 3, flexDirection: 'column', paddingLeft: 20 }}>
                                <Text title3 bold style={{ marginBottom: 5 }}>Not Member Yet ?</Text>
                                <Text caption1 style={{ marginBottom: 5 }}>Join us! Masterdiskon.com members can access savings of up to 50% and earn Masdis Coins while booking.</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1, marginRight: 5 }}>
                                        <Button style={{ height: 40, }}
                                            onPress={() => {
                                                navigation.navigate("SignIn", { redirect: 'Home', param: '' })
                                            }
                                            }>Sign in</Button>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 5 }}>
                                        <Button outline style={{ height: 40 }}
                                            onPress={() => navigation.navigate("SignUp", { redirect: 'Home', param: '' })}

                                        >Register</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    <View />
            }
        </View>
    )
}
