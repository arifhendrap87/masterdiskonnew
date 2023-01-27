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
// import styles from "./styles";

// Load sample country data list
import { countryBrandData } from "@data";
import {PostData} from '../../services/PostData';


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


export default class SelectCountry extends Component {
    constructor(props) {
        super(props);
   
        
        
        // Temp data define
        this.state = {
            airplane: "",
            country: [],
            loading: false,
        };
    }

    componentDidMount() {   
        var selected=this.props.navigation.state.params.selected;
        this.setState({ loading_spinner: true }, () => {
            PostData('common/country_all',{'id_country':'','country_name':''})
            .then((result) => {
                    this.setState({ loading_spinner: false });
                    this.setState({country:result});
                    const { navigation } = this.props;
                    //const selected = navigation.getParam("selected");
        
                    if (selected) {
                        this.setState({
                            country: this.state.country.map(item => {
                                return {
                                    ...item,
                                    checked: item.id == selected
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

        var type=this.props.navigation.state.params.type;
        const { navigation } = this.props;
        if(type=='nationality'){
          
            this.props.navigation.state.params.setNationality(select.id,select.name,select.phoneCode);
            navigation.goBack();
              

        }else if(type=='passportCountry'){
          
            this.props.navigation.state.params.setCountry(select.id,select.name,select.phoneCode);
            navigation.goBack();
             
        }

        // this.setState({
        //     country: this.state.country.map(item => {
        //         if (item.name == select.name) {
        //             return {
        //                 ...item,
        //                 checked: true
        //             };
        //         } else {
        //             return {
        //                 ...item,
        //                 checked: false
        //             };
        //         }
               
        //     })
        // });

        // setTimeout(() => {
        //    this.onSave();
        // }, 50);

      
    }

    search(value){
        this.setState({ loading_spinner: true }, () => {
            PostData('common/country_all',{'id_country':'','country_name':value})
            .then((result) => {
                    this.setState({ loading_spinner: false });
                    this.setState({country:result});
                    const { navigation } = this.props;
                    const selected = navigation.getParam("selected");
        
                    if (selected) {
                        this.setState({
                            country: this.state.country.map(item => {
                                return {
                                    ...item,
                                    checked: item.id == selected
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
        const selected = this.state.country.filter(item => item.checked);
        var type=this.props.navigation.state.params.type;
      
        if (selected.length > 0) {
            if(type=='nationality'){
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        this.props.navigation.state.params.setNationality(selected[0].id,selected[0].name,selected[0].phoneCode);
                        navigation.goBack();
                    }
                );

            }else if(type=='passportCountry'){
              
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        this.props.navigation.state.params.setCountry(selected[0].id,selected[0].name,selected[0].phoneCode);
                        navigation.goBack();
                    }
                );

            }
           
        }
    }

    
    onClick(code,label) {
        var type=this.props.navigation.state.params.type;
        if(type=='asal'){
            this.props.navigation.state.params.setBandaraAsal(code,label);
        }else if(type=='tujuan'){
            this.props.navigation.state.params.setBandaraTujuan(code,label);
        }
        this.props.navigation.navigate('PageSearchcountry');
    }

    render() {
        const { navigation } = this.props;
        let { country, loading, airplane,loading_spinner } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >

                  
                <Header
                    title="Country"
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
                        placeholder="Search Country"
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
                            data={country}
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
                                        {/* <Image
                                            style={styles.imageBrand}
                                            source={item.image}
                                            resizeMode="contain"
                                        /> */}
                                    
                                        <View style={styles.left}>
                                            <Text caption1 semibold>
                                            {item.name}
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
