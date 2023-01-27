import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image } from "@components";
import { AsyncStorage } from 'react-native';

// import styles from "./styles";

// Load sample country data list
import { countryBrandData } from "@data";
import { PostData } from '../../services/PostData';


const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%"
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: BaseColor.fieldColor
    },
    imageBrand: {
        width: 32,
        height: 32,
        marginRight: 10
    }
});


export default class SelectPhoneCode extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            airplane: "",
            phoneCode: [],
            loading: false,
        };
    }

    componentDidMount() {
        var selected = this.props.navigation.state.params.selected;
        this.setState({ loading_spinner: true }, () => {
            PostData('common/phone_code_all', { 'phoneCode': '' })
                .then((result) => {
                    console.log('resultphone', JSON.stringify(result));
                    this.setState({ loading_spinner: false });
                    this.setState({ phoneCode: result });
                    const { navigation } = this.props;
                    //const selected = navigation.getParam("selected");

                    if (selected) {
                        this.setState({
                            phoneCode: this.state.phoneCode.map(item => {
                                return {
                                    ...item,
                                    checked: item.phoneCode == selected
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
    /**
     * @description Called when setting country is selected
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {object} select
     */
    onChange(select) {

        var type = this.props.navigation.state.params.type;
        const { navigation } = this.props;
        this.props.navigation.state.params.setPhoneCode(select.phoneCode);
        navigation.goBack();



    }

    searchs(value) {
        this.setState({ loading_spinner: true }, () => {

            console.log('common/phone_code_all', { 'phoneCode': value });
            PostData('common/phone_code_all', { 'phoneCode': value })
                .then((result) => {
                    console.log('common/phone_code_all_result', JSON.stringify(result));
                    this.setState({ loading_spinner: false });
                    this.setState({ phoneCode: result });
                    const { navigation } = this.props;
                    const selected = navigation.getParam("selected");

                    if (selected) {
                        this.setState({
                            phoneCode: this.state.phoneCode.map(item => {
                                return {
                                    ...item,
                                    checked: item.phoneCode == selected
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


    search(value) {
        this.setState({ loading_spinner: true }, () => {

            AsyncStorage.getItem('configApi', (error, result) => {
                if (result) {
                    let config = JSON.parse(result);
                    var access_token = config.token;
                    var path = "front/api_new/common/phone_code_all";
                    var url = config.baseUrl;

                    console.log(url + path, { 'phoneCode': value });




                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    // myHeaders.append("Cookie", "ci_session=htllmlmq1kc1inaabihi3lqeqv8jjm91");

                    var raw = JSON.stringify({ 'phoneCode': value });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url + path, requestOptions)
                        .then(response => response.json())
                        .then(result => {

                            console.log('common/phone_code_all_result', JSON.stringify(result));
                            this.setState({ loading_spinner: false });
                            this.setState({ phoneCode: result });
                            const { navigation } = this.props;
                            const selected = navigation.getParam("selected");

                            if (selected) {
                                this.setState({
                                    phoneCode: this.state.phoneCode.map(item => {
                                        return {
                                            ...item,
                                            checked: item.phoneCode == selected
                                        };
                                    })
                                });
                            }

                        })
                        .catch(error => {

                            alert('Kegagalan Respon Server')
                        });


                }
            });
        });

    }

    onSave() {
        const { navigation } = this.props;
        const selected = this.state.phoneCode.filter(item => item.checked);
        var type = this.props.navigation.state.params.type;

        if (selected.length > 0) {
            this.setState(
                {
                    loading: true
                },
                () => {
                    alert(selected[0].phoneCode);
                    // this.props.navigation.state.params.setPhoneCode(selected[0].phoneCode);
                    // navigation.goBack();
                }
            );



        }
    }


    render() {
        const { navigation } = this.props;
        let { phoneCode, loading, airplane, loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >


                <Header
                    title="Phone Code"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.blackColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        if (loading) {
                            return (
                                <ActivityIndicator
                                    size="small"
                                    color={BaseColor.primaryColor}
                                />
                            );
                        } else {
                            return (
                                <View></View>
                                // <Text caption1 primaryColor>
                                //     Save
                                // </Text>
                            );
                        }
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => this.onSave()}
                />

                <View style={styles.contain}>
                    <TextInput
                        style={BaseStyle.textInput}
                        onChangeText={text => this.search(text)}
                        autoCorrect={false}
                        placeholder="Search Phone Code"
                        placeholderTextColor={BaseColor.grayColor}
                        // value={airplane}
                        selectionColor={BaseColor.primaryColor}
                    />
                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            loading_spinner ?
                                <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                                />
                                :
                                <FlatList
                                    data={phoneCode}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.item}
                                            onPress={() => this.onChange(item)}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                            >


                                                <View style={styles.left}>
                                                    <Text caption1 semibold>
                                                        {item.phoneCode}
                                                    </Text>
                                                    <Text
                                                        note
                                                        numberOfLines={1}
                                                        footnote
                                                        grayColor
                                                        style={{
                                                            paddingTop: 5
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </View>
                                            {item.checked && (
                                                <Icon
                                                    name="check"
                                                    size={14}
                                                    color={BaseColor.primaryColor}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
