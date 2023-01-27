/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, ScrollView, Animated,Dimensions,ActivityIndicator,TouchableOpacity,StyleSheet,AsyncStorage,Image,BackHandler } from "react-native";
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
// import TicketModal from "react-native-ticket-modal";
import { BaseStyle, BaseColor, Images } from "@config";
import Barcode from "react-native-barcode-builder";
import {PostDataNew} from '../../services/PostDataNew';
import AnimatedLoader from "react-native-animated-loader";
import Timeline from 'react-native-timeline-flatlist';
import Pdf from 'react-native-pdf';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});


export default class PdfView extends Component {
  constructor(props) {
    super(props);


        
        var source="";
        if(this.props.navigation.state.params.source){
            source=this.props.navigation.state.params.source;
        }


      this.state = {
        source:source,
      };
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack();

    return true;
}


  
  
  componentDidMount(){
    
    
    }
  

  render() {
    const { navigation} = this.props;
    const {source}=this.state;
   

    return (
        <View style={styles.container}>
        <Pdf
            source={'https://masterdiskon.com/front/order/evoucher/detail/5873'}
            onLoadComplete={(numberOfPages,filePath)=>{
                //console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
                //console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
                console.log(error);
            }}
            onPressLink={(uri)=>{
                //console.log(`Link presse: ${uri}`)
            }}
            style={styles.pdf}/>
    </View>
    );
  }
}
