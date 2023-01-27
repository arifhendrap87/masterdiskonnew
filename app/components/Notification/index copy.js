import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button} from "@components";
import styles from "./styles";
import {PostData} from '../../services/PostData';
// Load sample data
import { NotificationData,DataLoading } from "@data";
import { View } from "react-native-animatable";
import { Image } from "@components";
import { Images } from "@config";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

export default class Notification extends Component {
    constructor(props) {
        super(props);

        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                //console.log("---------------data session user  ------------");
                //console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
             }
            
        });
        
        this.state = {
            refreshing: false,
            login:true,
            notification:DataLoading,

        };
    }

    getNotif(){
        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                let userSession = JSON.parse(result);
                //console.log("---------------data session user  ------------");
                //console.log(JSON.stringify(userSession));
                this.setState({userSession:userSession});
                this.setState({login:true});
                
                var id_user=userSession.id_user;
                const data={"id_user":id_user}
                const param={"param":data}
                //console.log('-------------param notif-------------');
                //console.log(JSON.stringify(param));

                    PostData('user/notif',param)
                                .then((result) => {
                                     //console.log('-------------result notif-------------');
                                    //console.log(JSON.stringify(result));
                                    this.setState({loading_spinner: false });
                                    this.setState({notification:result});
                                },
                                (error) => {
                                    this.setState({ error });
                                }
                    ); 

             }else{
                this.setState({login:false});

             }
            
            });
        });
    }

    componentDidMount() {
        this.getNotif();
    }

    render() {
        const { navigation } = this.props;
        let { notification,login,loading_spinner } = this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Notification"
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
                />
                 {
                    login ? 
                       
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => { }}
                                />
                            }
                            data={notification}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <ListThumbCircle
                                    image={item.image}
                                    txtLeftTitle={item.title}
                                    txtContent={item.content}
                                    txtRight={item.date_added}
                                    loading={this.state.loading_spinner}
                                    //loading={true}
                                    onPress={() => {
                                        //this.props.navigation.navigate("PreviewBooking",{item:item});
                                        this.props.navigation.navigate("WebViewPage",{url:item.tautan+'?access=app',title:'Pembayaran'});
                                    }}
                                />
                            )}
                        /> 
                :
                <View
                    style={{flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',padding: 20}}
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
                                elevation: 5 }}
                                loading={this.state.loading}
                                onPress={() => navigation.navigate("SignIn",{redirect:'Booking'})}
                            >
                                Sign In
                            </Button>
                            <View style={styles.contentActionBottom}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text caption1 grayColor>
                                        Haven’t registered yet?
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("SignUp")}
                                >
                                    <Text caption1 primaryColor>
                                        Join Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                </View>
                }
                
            </SafeAreaView>
        );
    }
}
