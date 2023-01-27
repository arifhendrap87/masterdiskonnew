import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
// import styles from "./styles";

import CountDown from 'react-native-countdown-component';
import moment from 'moment';



export default class NotYetLogin extends Component {
    constructor(props) {
        super(props);


        this.state = {
            backgroundColor: BaseColor.fieldColor,
            loading: false
        };

    }

    render() {
        const {
            style,
            // onPress.
            redirect,
            navigation,
            type,
            param
        } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', padding: 20
                }}
            >
                <Image
                    source={Images.login}
                    style={{ width: "60%", height: "60%" }}
                    resizeMode="cover"
                />
                <View><Text>Anda Belum Login</Text></View>
                <Button
                    full
                    style={{
                        marginTop: 20,
                        borderRadius: 18,
                        // backgroundColor: BaseColor.fieldColor,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}
                    loading={this.state.loading}
                    onPress={() => {
                        navigation.navigate("SignIn", { redirect: redirect, param: param })
                    }
                    }
                >
                    Sign In
                         </Button>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 25
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp", { redirect: redirect, param: param })}
                    >
                        <Text caption1 grayColor>
                            Haven’t registered yet?
                                 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp", { redirect: redirect, param: param })}
                    >
                        <Text caption1 primaryColor>
                            Join Now
                                 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

NotYetLogin.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    redirect: PropTypes.string,
    navigation: PropTypes.object,
    param: PropTypes.string,
};

NotYetLogin.defaultProps = {
    style: {},
    redirect: "Home",
    onPress: () => { },
    navigation: {},
    param: ''
};
