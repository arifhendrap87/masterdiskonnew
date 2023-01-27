import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image } from "@components";
// import styles from "./styles";

// Load sample flight data list
import { FlightBrandData } from "@data";
import { PostData } from '../../services/PostData';

import { StyleSheet } from "react-native";

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



export default class SelectTitle extends Component {
    constructor(props) {
        super(props);


        var pageReturn = "";
        if (this.props.navigation.state.params.pageReturn) {
            pageReturn = this.props.navigation.state.params.pageReturn;
        }

        var old = "";
        if (this.props.navigation.state.params.old) {
            old = this.props.navigation.state.params.old;
        }

        var title = [];
        if (old == 'adult') {
            title = [
                {
                    "id": "Mr",
                    "name": "Mr"
                },
                {
                    "id": "Ms",
                    "name": "Ms"
                },
                {
                    "id": "Mrs",
                    "name": "Mrs"
                }
            ];
        } else if (old == 'children' || old == 'baby') {
            title = [
                {
                    "id": "Mstr",
                    "name": "Mstr"
                },
                {
                    "id": "Miss",
                    "name": "Miss"
                }
            ];

        } else {
            title = [
                {
                    "id": "Mr",
                    "name": "Mr"
                },
                {
                    "id": "Ms",
                    "name": "Ms"
                },
                {
                    "id": "Mrs",
                    "name": "Mrs"
                },
                {
                    "id": "Mstr",
                    "name": "Mstr"
                },
                {
                    "id": "Miss",
                    "name": "Miss"
                }
            ];

        }
        // Temp data define
        this.state = {
            airplane: "",
            flight: [],
            loading: false,

            listdata: title,
            pageReturn: pageReturn,
        };
    }

    componentDidMount() {

        const { navigation } = this.props;
        const selected = navigation.getParam("selected");

        if (selected) {
            this.setState({
                listdata: this.state.listdata.map(item => {
                    return {
                        ...item,
                        checked: item.id == selected
                    };
                })
            });
        }
    }
    /**
     * @description Called when setting flight is selected
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @param {object} select
     */
    onChange(select) {
        const { navigation } = this.props;
        this.props.navigation.state.params.setTitle(select.id);
        navigation.goBack();
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

    onSave() {
        const { navigation } = this.props;
        // var selectParent = navigation.getParam("selected");
        const selected = this.state.listdata.filter(item => item.checked);

        if (selected.length > 0) {
            this.setState(
                {
                    loading: true
                },
                () => {
                    setTimeout(() => {
                        this.props.navigation.state.params.setTitle(selected[0].id);
                        navigation.goBack();
                    }, 50);
                }
            );
        }
    }


    onClick(code, label) {
        var type = this.props.navigation.state.params.type;
        if (type == 'asal') {
            this.props.navigation.state.params.setBandaraAsal(code, label);
        } else if (type == 'tujuan') {
            this.props.navigation.state.params.setBandaraTujuan(code, label);
        }
        this.props.navigation.navigate('PageSearchFlight');
    }

    render() {
        const { navigation } = this.props;
        let { flight, loading, airplane, loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >


                <Header
                    title="Title"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
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

                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            loading_spinner ?
                                <ActivityIndicator
                                    size="large"
                                    color={BaseColor.primaryColor}
                                />
                                :
                                <FlatList
                                    data={this.state.listdata}
                                    keyExtractor={(item, index) => item.id}
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
                                                        {item.id}
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
