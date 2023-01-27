import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import DropdownAlert from 'react-native-dropdownalert';

// Load sample data
import { UserData } from "@data";

export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        var userSession = this.props.navigation.state.params.userSession;
        this.state = {
            username: userSession.username,
            firstname: userSession.first,
            lastname: userSession.last,
            id_user: userSession.id_user,
            // name: UserData[0].name,
            // email: UserData[0].email,
            // address: UserData[0].address,
            // image: UserData[0].image,
            loading: false,
            userSession: userSession
        };
    }

    onSubmit() {
        const { navigation } = this.props;

        this.setState({ loading: true }, () => {
            var data = { "firstname": this.state.firstname, "lastname": this.state.lastname, "id_user": this.state.id_user }
            const param = { "param": data }


            //console.log("------------------data param update account--------------");
            //console.log(JSON.stringify(param));

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(param);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://masterdiskon.com/front/user/profil/update_app", requestOptions)
                .then(response => response.json())
                .then(result => {
                    var userSession = result.userSession;
                    this.setState({ loading: false });
                    //console.log(JSON.stringify(result));
                    if (result.success == false) {
                        this.dropdown.alertWithType('info', 'Info', JSON.stringify(result.message));
                        //this.setState({ loading: false });
                    } else if (result.success == true) {
                        this.dropdown.alertWithType('success', 'Success', JSON.stringify(result.message));
                        setTimeout(() => {
                            //alert(JSON.stringify(userSession));
                            // AsyncStorage.setItem('userSession', JSON.stringify(userSession));
                            navigation.navigate("Profile");
                        }, 50);

                    }

                })
        });


    }


    render() {
        const { navigation } = this.props;
        let { loading } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Edit Profiles"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
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
                        {/* <View>
                            <Image
                                source={this.state.image}
                                style={styles.thumb}
                            />
                        </View> */}
                        {/* <View style={styles.contentTitle}>
                            <Text caption1 semibold>
                                Account
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text => this.setState({ username: text })}
                            autoCorrect={false}
                            placeholder="Input USERNAME"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.username}
                            selectionColor={BaseColor.primaryColor}
                        /> */}


                        <View style={styles.contentTitle}>
                            <Text caption1 semibold>
                                Firstname
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text => this.setState({ firstname: text })}
                            autoCorrect={false}
                            placeholder="Input Name"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.firstname}
                            selectionColor={BaseColor.primaryColor}
                        />

                        <View style={styles.contentTitle}>
                            <Text caption1 semibold>
                                Lastname
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text => this.setState({ lastname: text })}
                            autoCorrect={false}
                            placeholder="Input Name"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.lastname}
                            selectionColor={BaseColor.primaryColor}
                        />



                        {/* <View style={styles.contentTitle}>
                            <Text caption1 semibold>
                                Email
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            autoCorrect={false}
                            placeholder="Input Name"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.email}
                        />
                        <View style={styles.contentTitle}>
                            <Text caption1 semibold>
                                Address
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text =>
                                this.setState({ address: text })
                            }
                            autoCorrect={false}
                            placeholder="Input Address"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.address}
                            selectionColor={BaseColor.primaryColor}
                        /> */}
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button
                        loading={loading}
                        full
                        onPress={() => {
                            this.onSubmit();
                        }}
                    >
                        Update
                    </Button>
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
