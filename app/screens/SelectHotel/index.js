import React, { Component } from "react";
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Image } from "@components";
// import styles from "./styles";

// Load sample flight data list
import {AsyncStorage} from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";
  import DataEmpty from "../../components/DataEmpty";



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

  


export default class SelectHotel extends Component {
    constructor(props) {
        super(props);
        // Temp data define
        this.state = {
            airplane: "",
            flight: [],
            loading: false,
            loading_spinner:false
        };
    }

    componentDidMount() {
        this.getProduct();
     
    }

    onChange(select) {
        const { navigation } = this.props;
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {   
                let config = JSON.parse(result);

                var url=config.baseUrl;
                var path=config.product_hotel_package.dir;

        console.log('ProductDetail',JSON.stringify(select));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ci_session=d6kdunnbc111obmivnatitrhdfgo2h8g");
        var paramUrl={"param":{
            "id_country":"",
            "id_city":"",
            "id_hotelpackage":select.id,
            "detail_category":"",
            "search":"",
            "limit":""
            }}
        console.log('paramUrl',JSON.stringify(paramUrl));
        var raw = JSON.stringify(paramUrl);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(url+path, requestOptions)
                            .then(response => response.json())
                            .then(result => {
                                console.log('resultHotel',JSON.stringify(result));
                                navigation.navigate("ProductDetail",{product:result[0],product_type:'hotelpackage'})
                            })
                            .catch(error => {
                                console.log(JSON.stringify(error));
                            });

        
        
        }
        });
        
    }

    search(value){
        this.setState({ loading_spinner: true }, () => {
        if(value.length >= 3){
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {   
                    let config = JSON.parse(result);

                    var url=config.baseUrl;
                    var path=config.product_hotel_package.dir;
                    var paramUrl={"param":{
                                "id_country":"",
                                "id_city":"",
                                "id_hotelpackage":"",
                                "detail_category":"",
                                "search":value,
                                "limit":""
                                }}
                            
                    
                    console.log('selecthotelparam',url+path,JSON.stringify(paramUrl));
                    var param={
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paramUrl),
                      }
            

                        fetch(url+path,param)
                            .then(response => response.json())
                            .then(result => {
                                this.setState({ loading_spinner: false });
                                console.log('resultSearch',JSON.stringify(result));
                                this.setState({flight:result});
                            })
                            .catch(error => {
                                console.log(JSON.stringify(error));
                            });
                }
            }); 
        }else{
            //this.setState({flight:[]});
            this.setState({ loading_spinner: false });
        }
        }); 
     }



     getProduct(){
        this.setState({ loading_spinner: true }, () => {
            AsyncStorage.getItem('config', (error, result) => {
                if (result) {   
                    let config = JSON.parse(result);

                    var url=config.baseUrl;
                    var path=config.product_hotel_package.dir;
                    var paramUrl={"param":{
                                "id_country":"",
                                "id_city":"",
                                "id_hotelpackage":"",
                                "detail_category":"",
                                "search":"",
                                "limit":""
                                }}
                            
                    
                    console.log('selecthotelparam',url+path,JSON.stringify(paramUrl));
                    var param={
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paramUrl),
                      }
            

                        fetch(url+path,param)
                            .then(response => response.json())
                            .then(result => {
                                this.setState({ loading_spinner: false });
                                console.log('resultSearch',JSON.stringify(result));
                                this.setState({flight:result});
                            })
                            .catch(error => {
                                console.log(JSON.stringify(error));
                            });
                }
            }); 
     
        }); 
     }

    
    
    

    render() {
        const { navigation } = this.props;
        let { flight, loading, airplane,loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotel"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    // renderRight={() => {
                    //     if (loading) {
                    //         return (
                    //             <ActivityIndicator
                    //                 size="small"
                    //                 color={BaseColor.primaryColor}
                    //             />
                    //         );
                    //     } else {
                    //         return (
                    //             <Text caption1 primaryColor>
                    //                 Save
                    //             </Text>
                    //         );
                    //     }
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    //onPressRight={() => this.onSave()}
                />
                <View style={styles.contain}>
                    <TextInput
                        style={BaseStyle.textInput}
                        onChangeText={text => this.search(text)}
                        autoCorrect={false}
                        placeholder="Search Hotel"
                        placeholderTextColor={BaseColor.grayColor}
                        selectionColor={BaseColor.primaryColor}
                        autoFocus
                    />
                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            loading_spinner ? 
                            <Placeholder
                                Animation={Fade}
                                
                            >
                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>

                                <View style={{ 
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: BaseColor.fieldColor}}>
                                    <PlaceholderLine width={100} height={30} style={{marginBottom:0}} />
                                    <PlaceholderLine width={100} height={15} style={{marginTop: 5,marginBottom:0}} />
                                </View>
                            </Placeholder>
                            :
                            flight.length != 0 ?
                            <FlatList
                            data={flight}
                            keyExtractor={(item, index) => item.code}
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
                                            {item.product_name}
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
                                                {item.product_place_2}
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
                            :
                            <DataEmpty />
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
