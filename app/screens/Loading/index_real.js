import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions, ApplicationActions } from "@actions";
import { ActivityIndicator, View } from "react-native";
import { bindActionCreators } from "redux";
import { Images, BaseColor } from "@config";
import SplashScreen from "react-native-splash-screen";
import { Text } from "@components";
import { DataMasterDiskon } from "@data";
import { AsyncStorage } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataMasterDiskon: DataMasterDiskon[0],
            error: false,
        }
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

    setConfig(redirect, parameter) {
        let { navigation, auth } = this.props;
        const { DataMasterDiskon } = this.state;
        var url = DataMasterDiskon.baseUrl + DataMasterDiskon.dir;

        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('userSession', (error, result) => {
                if (result) {
                    let userSession = JSON.parse(result);
                    console.log('userSessionsetConfig', JSON.stringify(userSession));

                    if (userSession.hasOwnProperty('password') == false) {
                        var params = { "param": { "username": DataMasterDiskon.username, "password": DataMasterDiskon.password } };

                    } else {
                        //var params = { "param": { "username": userSession.email, "password": this.state.password } };
                        var params = { "param": { "username": userSession.email, "password": userSession.password } };

                    }
                } else {
                    var params = { "param": { "username": DataMasterDiskon.username, "password": DataMasterDiskon.password } };
                }
                console.log('urlloading', url);
                console.log('paramsLoading', JSON.stringify(params));
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
                        var config = result;
                        var configApi = this.generateConfigApi(config);
                        console.log('configsetConfig', JSON.stringify(config));
                        console.log('configApisetConfig', JSON.stringify(configApi));
                        this.setState({ config: config });
                        this.setState({ loading_spinner: false });
                        AsyncStorage.setItem('config', JSON.stringify(config));
                        AsyncStorage.setItem('configApi', JSON.stringify(configApi));

                        if (redirect != '') {
                            navigation.navigate(redirect, { param: parameter });
                        } else {
                            navigation.navigate('Home');
                        }
                    })
                    .catch(error => {
                        this.setState({ error: true });
                    });
            });

        });
    }

    generateConfigApi(config) {
        const { DataMasterDiskon } = this.state;
        let configApi = {};
        if (DataMasterDiskon.status == "production") {
            configApi.apiBaseUrl = config.apiBaseUrl;
            configApi.apiToken = config.tokenMDIAccess;
            configApi.apiTokenRefresh = config.tokenMDIRefresh;

            configApi.midtransUrl = config.midtransUrl;
            configApi.midtransUrlSnap = config.midtransUrlSnap;
            configApi.midtransUrlToken = config.midtransUrlToken;
            configApi.midtransKey = config.midtransKey;

            configApi.baseUrl = config.baseUrl;

        } else {
            configApi.apiBaseUrl = config.apiBaseUrlDev;
            configApi.apiToken = config.tokenMDIAccessDev;
            configApi.apiTokenRefresh = config.tokenMDIRefreshDev;

            configApi.midtransUrl = config.midtransUrlDev;
            configApi.midtransUrlSnap = config.midtransUrlSnapDev;
            configApi.midtransUrlToken = config.midtransUrlTokenDev;
            configApi.midtransKey = config.midtransKeyDev;

            configApi.baseUrl = config.baseUrlDev;
        }
        return configApi;


    }


    onProcess() {
        let { navigation, auth } = this.props;
        // let status = auth.login.success;


        if (this.props.navigation.state.params && this.props.navigation.state.params.redirect) {
            var redirect = this.props.navigation.state.params.redirect;
        } else {
            var redirect = '';
        }

        if (this.props.navigation.state.params && this.props.navigation.state.params.param) {
            var param = this.props.navigation.state.params.param;
        } else {
            var param = '';
        }

        console.log('redirect', redirect);
        // if (redirect != '') {
        //     navigation.navigate(redirect, { param: param });
        // } else {
        //     this.setConfig();
        // }

        this.setConfig(redirect, param);
    }





    // componentWillMount() {
    //     this.props.actions.authentication(false, response => {});
    // }

    componentDidMount() {
        SplashScreen.hide();
        this.onProcess();
    }

    render() {
        const { loaderJson } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
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
                        source={this.state.error == false ? require('app/assets/loader_paperline.json') : require('app/assets/lostconnection.json')}
                        animationStyle={{ width: 300, height: 300 }}
                        speed={1}
                    />
                    <Text>
                        {this.state.error == false ? 'Connecting..Masterdiskon' : 'Terjadi kesalahan'}
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //actions: bindActionCreators({AuthActions,ApplicationActions}, dispatch)
        actions: bindActionCreators(AuthActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);