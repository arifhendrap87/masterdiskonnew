import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    AsyncStorage,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    Image,
    Tag,
} from "@components";
import * as Utils from "@utils";
import SetDate from "../../components/SetDate";
import SetPenumpang from "../../components/SetPenumpang";
import NotYetLogin from "../../components/NotYetLogin";
import HTML from "react-native-render-html";
import FastImage from 'react-native-fast-image';
import ImageSize from 'react-native-image-size';


export default class  Blog extends Component {
    constructor(props) {
        super(props);
        var param = this.props.navigation.state.params.param;
        console.log('paramBlog',JSON.stringify(param));

        var urlImage='https://masterdiskon.com/assets/upload/blog/post/';
        var image_featured_url=urlImage+param.featuredImage;
        //console.log('image_featured_url',image_featured_url);

        // Temp data define
        this.state = {
            heightHeader: Utils.heightHeader(),
            param: param,
            urlImage:'https://masterdiskon.com/assets/upload/blog/post/'
            
        };
        this._deltaY = new Animated.Value(0);
        


    }


    getData(param){
        this.setState({ loading_dashboard: true }, () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNDEsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTYyMDA5MzcxOTc2MywiaWF0IjoxNjIwMDA3MzE5fQ.ttsoP_PdnnsOeRLOkVdOtnMfR8zyjcxGKkmhBfpkN_M");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api.masterdiskon.com/v1/promotion/blog/"+param.title_slug, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('getDataBlog',JSON.stringify(result));

        })
        .catch(error => {
            alert('Terjadi kesalahan jaringan');
        });
        });
    }

    componentDidMount(){
        const{param}=this.state;
        //this.getData(param);
    }

    replaceAllBackSlash(targetStr){
        var index=targetStr.indexOf("\\");
        while(index >= 0){
            targetStr=targetStr.replace("\\","");
            index=targetStr.indexOf("\\");
        }
        return targetStr;
    }

    render() {
        const { navigation } = this.props;
        const { heightHeader,param,urlImage} = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        
        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(150),
                                    Utils.scaleWithPixel(150)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                >
                   
                    <FastImage
                    style={{ width: "100%", height: "100%" }}
                    source={{
                        uri:urlImage+param.featuredImage,
                        headers:{ Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    // onLoad={evt =>{
                    //     ImageSize.getSize(this.state.product.img_featured_url)
                    //     .then(size => {
                    //         this.setState({img_featured:{
                    //                             uri:this.state.product.img_featured_url,
                    //                             headers:{ Authorization: 'someAuthToken' },
                    //                             priority: FastImage.priority.normal,
                    //                         }
                            
                    //         });
                    //     })
                    //     .catch(error => {
                    //     this.setState({img_featured:{
                    //                         uri:'https://masterdiskon.com/assets/front/img/app/notFound.png',
                    //                         headers:{ Authorization: 'someAuthToken' },
                    //                         priority: FastImage.priority.normal,
                    //                         }
                    //     });

                    //     })
                    // }
                    // }
                    >
                    </FastImage>
                   
                </Animated.View>
               
                    <SafeAreaView
                        style={BaseStyle.safeAreaView}
                        forceInset={{ top: "always" }}
                    >
                    <Header
                        title=""
                        transparent={true}
                        
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() =>
                            this.setState({
                                heightHeader: Utils.heightHeader()
                            })
                        }
                        scrollEventThrottle={8}
                    >
                        {/* START */}
                        <View
                            style={[
                                {
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                    paddingTop: 10
                                },
                                { marginTop: marginTopBanner }
                            ]}
                        >
                            <Text
                                body1
                                bold
                            >
                                {param.titleBlog}
                            </Text>
                        </View>
                        {/* END */}

                        {/* START */}
                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <HTML
                            html={this.replaceAllBackSlash(param.contentBlog)}
                            imagesMaxWidth={Dimensions.get("window").width}
                            />
                        </View>
                        {/* END */}
                        

                      

                    </ScrollView>
                </SafeAreaView>
                
            </View>
        );
    }
}




const styles = StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        //paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabbar: {
        backgroundColor: "white",
        height: 40
    },
    tab: {
        width: 130
    },
    indicator: {
        backgroundColor: BaseColor.primaryColor,
        height: 1
    },
    label: {
        fontWeight: "400"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    lineInfor: {
        flexDirection: "row",
        borderColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    todoTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center"
    },
    itemReason: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: "row"
    },

    itemPrice: {
        borderBottomWidth: 0,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
    },
    linePrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    linePriceMinMax: {
        backgroundColor: BaseColor.whiteColor,
        borderRadius: 10
    },
    iconRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },



    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        //backgroundColor: BaseColor.fieldColor
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    }
});