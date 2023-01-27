// import PushNotification from "react-native-push-notification";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import {Platform} from 'react-native';
import React, { Component } from "react";
import {
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions
} from "react-native";
import {
    Image,
    Text,
    Icon,
    HotelItem,
    Card,
    Button,
    SafeAreaView,
    PostListItem,
    Header,
    EventCard,
    ProfileDescription
} from "@components";
import {PostData} from '../services/PostData';
class FetchData {

    
    blog = () => {
        PostData('get_blog_new')
                .then((result) => {
                    return result;
                    // console.log('asd',JSON.stringify(result));
                    // this.setState({loading_blog: false });
                    // this.setState({listdata_blog_new: result});
                }
            );   
       
        
        
        
    }

   
}

export const fetchData = new FetchData()
