import React, { Component } from "react";
import { View, ScrollView, Animated,Dimensions,ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import * as Utils from "@utils";
// import styles from "./styles";
import { DataMasterDiskon } from "@data";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
// import DownloadFile from "../../components/DownloadFile";
import ScreenShotFile from "../../components/ScreenShotFile";




export default class EvoucherPdf extends Component {
    constructor(props) {
        // var url=props.navigation.state.params.url;
        // var title=props.navigation.state.params.title;
        // var subTitle=props.navigation.state.params.subTitle;
        var param=props.navigation.state.params.param;
        // var url='https://masterdiskon.com/front/user/purchase/detail/'+id_order+'?access=app';
        //alert(url);
        //console.log('url',url);
        super(props);
        this.state = {
            url:param.url,
            title:param.title,
            subTitle:param.subTitle
        };
    }

    render() {
        const { navigation} = this.props;
        return (
        
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        > 
        <Header
                    title={this.state.title}
                    subTitle={this.state.subTitle}
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
                    }}
                    
                    // renderRight={() => {
                    //     return (
                    //         <Icon
                    //             name="reload-outline"
                    //             size={20}
                    //             color={BaseColor.blackColor}
                    //         />
                            
                    //     );
                    // }}
                    
                    // renderRightSecond={() => {
                    //     return (
                    //         <Icon
                    //             name="home"
                    //             size={24}
                    //             color={BaseColor.blackColor}
                    //         />
                    //     );
                    // }}
                    
                    onPressRight={() => {
                        var redirect='EvoucherPdf';
                        var param={
                            url:this.state.url,
                            title:this.state.title,
                            subTitle:this.state.subTitle
                        }
                        navigation.navigate("Loading",{redirect:redirect,param:param});
                    }}
                    
                    onPressRightSecond={() => {
                        navigation.navigate("Home");
                    }}
                />
                
               
        
                <View style={{flex:1,marginTop:20}}>
                    {/* <Text>{this.state.url}</Text> */}
                    <WebView style={{}} source={{ uri: this.state.url }} />
                </View>
                {/* <DownloadFile file={'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png'} /> */}
                <ScreenShotFile file={{uri: this.state.url}} />

        </SafeAreaView>
        );
    }
}
