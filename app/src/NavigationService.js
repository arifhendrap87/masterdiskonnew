import React, { Component } from "react";
import { RefreshControl, FlatList,TouchableOpacity,AsyncStorage,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text,Button,CommentItem} from "@components";

class NavigationService extends Component {
    constructor(props) {
        super(props);
        
    }
  

    currentRoute = () => {
        const {
            navigation,
        } = this.props;
        var currentScreen=navigation.state.routeName;

        return currentScreen;
    }

    
}

export const navigationService = new NavigationService()
