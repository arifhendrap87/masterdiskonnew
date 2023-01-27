import React, { Component } from "react";
import { ProgressBarAndroid, ProgressViewIOS, TouchableOpacity, FlatList, RefreshControl, View, Animated, ScrollView, StyleSheet, BackHandler, TouchableWithoutFeedback, Dimensions, ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, Text, Button } from "@components";
// import styles from "./styles";
import * as Utils from "@utils";
import { AsyncStorage } from 'react-native';
import CardCustom from "../../components/CardCustom";
import FilterSortHotelLinx from "../../components/FilterSortHotelLinx";
import FilterSortHotelLinxBottom from "../../components/FilterSortHotelLinxBottom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import AnimatedLoader from "react-native-animated-loader";
import DropdownAlert from 'react-native-dropdownalert';
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';


// Load sample data
import { DataLoading, DataConfig, DataHotelPackage, DataTrip, DataHotelLinx } from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import DataEmpty from "../../components/DataEmpty";
const { height, width } = Dimensions.get('window');
var screenWidth = Dimensions.get('window').width; //full screen width
const itemWidth = (width - 30) / 2;


const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    }
});


export default class HotelLinx extends Component {

    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);


        var param = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.param) {
            param = this.props.navigation.state.params.param;
        }

        var paramOriginal = {};
        if (this.props.navigation.state.params && this.props.navigation.state.params.paramOriginal) {
            paramOriginal = this.props.navigation.state.params.paramOriginal;
        }

        console.log('paramHotelLinx', JSON.stringify(param));
        console.log('paramHotelLinxoRIGINAL', JSON.stringify(paramOriginal));


        this.state = {
            param: param,
            paramOriginal: paramOriginal,
            listdata_product_hotel_linx: DataHotelLinx,
            listdata_product_hotel_linx_original: DataHotelLinx,
            config: DataConfig,

            refreshing: false,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),
            loadingCheckRoom: false,
            loadingCheckRoomFile: require("app/assets/hotel.json"),
            loadingCheckRoomTitle: 'Mohon tunggu, kami sedang mencari kamar yang kosong',
            loading_product_hotel_linx: true,


            currentPage: 1,

            abort: false,
            banyakData: 0,
            banyakPage: 0,
            arrayPrice: [{ "nums": 0, "HotelId": "22881", "hargaminPrice": "loading" }, { "nums": 1, "HotelId": "1242092", "hargaminPrice": "loading" }, { "nums": 2, "HotelId": "1225729", "hargaminPrice": "loading" }, { "nums": 3, "HotelId": "22858", "hargaminPrice": "loading" }, { "nums": 4, "HotelId": "22921", "hargaminPrice": "loading" }, { "nums": 5, "HotelId": "22937", "hargaminPrice": "loading" }, { "nums": 6, "HotelId": "1100835", "hargaminPrice": "loading" }, { "nums": 7, "HotelId": "23240", "hargaminPrice": "loading" }, { "nums": 8, "HotelId": "1285575", "hargaminPrice": "loading" }, { "nums": 9, "HotelId": "107307", "hargaminPrice": "loading" }],
            arrayPriceOriginal: [{ "nums": 0, "HotelId": "22881", "hargaminPrice": "loading" }, { "nums": 1, "HotelId": "1242092", "hargaminPrice": "loading" }, { "nums": 2, "HotelId": "1225729", "hargaminPrice": "loading" }, { "nums": 3, "HotelId": "22858", "hargaminPrice": "loading" }, { "nums": 4, "HotelId": "22921", "hargaminPrice": "loading" }, { "nums": 5, "HotelId": "22937", "hargaminPrice": "loading" }, { "nums": 6, "HotelId": "1100835", "hargaminPrice": "loading" }, { "nums": 7, "HotelId": "23240", "hargaminPrice": "loading" }, { "nums": 8, "HotelId": "1285575", "hargaminPrice": "loading" }, { "nums": 9, "HotelId": "107307", "hargaminPrice": "loading" }],
            progressBarProgress: 0.0


        };
        this.getConfig();
        this.filterProcess = this.filterProcess.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.sortProcess = this.sortProcess.bind(this);
        this.setPagination = this.setPagination.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }



    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        //this.setState({abort:true});
        this.props.navigation.goBack();
        return true;
    }



    rebuild(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;

            obj['filter_price'] = 'loading';
            obj['filter_rating'] = parseInt(item.rating);
            obj['filter_recommended'] = item.IsRecomondedHotel == "FALSE" ? '' : 'Recommended';

            obj['hotelid'] = item.hotelid;
            obj['newPrice'] = item.newPrice;
            obj['rating'] = item.rating;
            obj['hotelname'] = item.hotelname;
            obj['longitude'] = item.longitude;
            obj['latitude'] = item.latitude;
            obj['address'] = item.address;

            obj['description'] = item.description;
            obj['IsRecomondedHotel'] = item.IsRecomondedHotel;
            obj['gambar'] = item.gambar;
            obj['paramTombolToDetail'] = item.paramTombolToDetail;
            obj['cityname'] = item.cityname;


            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }


    rebuildArrayPrice(listdata) {
        var listdata_new = [];
        var a = 0;
        listdata.map(item => {
            var obj = {};
            obj['nums'] = a;
            obj['HotelId'] = item.hotelid;
            obj['hargaminPrice'] = item.newPrice;
            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }


    sortProcess(selected) {
        this.setState({ currentPage: 1 });
        const { param } = this.state;


        if (selected == 'low_price') {
            param.shortData = "asc";
            param.startkotak = "0";
            console.log('sortProcessAsc', JSON.stringify(param));
            this.setState({ param: param });

        } else if (selected == 'hight_price') {
            param.shortData = "desc";
            param.startkotak = "0";
            console.log('sortProcessDesc', JSON.stringify(param));
            this.setState({ param: param });

        }

        setTimeout(() => {
            if (param.typeSearch != 'area') {
                this.getProductHotelList(param);
            } else {
                this.getProductHotelListPerArea(param);
            }



        }, 50);

    }


    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("HotelLinxFilter",
            {
                param: this.state.param,
                filterProcess: this.filterProcess
            }
        );
    }

    onClear() {
        const { param } = this.state;
        param.ratingH = "";
        param.rHotel = "";
        param.srcdata = "";
        param.minimbudget = "0";
        param.maximbudget = "15000000";
        param.shortData = "";
        param.startkotak = "0";

        console.log('paramOriginal', JSON.stringify(param));

        this.setState({ arrayPrice: this.state.arrayPriceOriginal });
        setTimeout(() => {
            if (param.typeSearch != 'area') {
                this.getProductHotelList(param);
            } else {
                this.getProductHotelListPerArea(param);
            }

            // this.getProductHotelList(param);
        }, 50);
    }


    filterProcess(param) {
        console.log('paramProcess', JSON.stringify(param));
        this.setState({ arrayPrice: this.state.arrayPriceOriginal });
        this.setState({ param: param });
        this.setState({ currentPage: 1 });


        setTimeout(() => {
            console.log('paramUpdate', JSON.stringify(param));
            if (param.typeSearch != 'area') {
                this.getProductHotelList(param);
            } else {
                this.getProductHotelListPerArea(param);
            }

        }, 50);


    }


    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ config: config });
            }
        });
    }


    getProductHotelLinxDetail() {
        const { param, paramOriginal } = this.state;
        //this.setState({abort:true});
        const { config } = this.state;
        const { navigation } = this.props;
        const data = {
            "hotelid": param.hotelid,
        }
        const paramSearch = { "param": data };
        this.setState({ loading_product_hotel_linx: true }, () => {
            var url = config.baseUrl;
            var path = "front/api_new/product/product_hotel_linx_detail";
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(paramSearch);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(url + path, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('ProductDetail', JSON.stringify(result));
                    this.setState({ progressBarProgress: 0.0 });
                    this.setState({ loading_product_hotel_linx: false });
                    param.city = result[0].product_place_id;
                    navigation.navigate("ProductDetail", { param: param, paramOriginal: paramOriginal, product: result[0], product_type: 'hotelLinx' })
                })
                .catch(error => {
                    alert('Kegagalan Respon Server');
                });


        });
    }


    getProductHotelList(param) {
        const { config } = this.state;
        this.setState({ progressBarProgress: 0.0 });
        console.log('getProductHotelLinx2param', JSON.stringify(param));
        this.setState({ loading_product_hotel_linx: true }, () => {
            //this.setState({ abort: true }, () => {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "ci_session=jjprqnbtcsfbu89nd6ih0tdvmhqd0qia");
            var paramProduct = {
                "param": {
                    "city": param.city.toString(),
                    "checkin": param.checkin,
                    "checkout": param.checkout,
                    "adults": param.adults,
                    "child": param.child,
                    "room": param.room,
                    "newIdSlide": "",
                    "umurank": param.umurank,
                    "stringumurank": param.stringumurank,
                    "stringAdults": param.stringAdults,
                    "stringChild": param.stringChild,
                    "stringRoom": param.stringRoom,


                    "ratingH": param.ratingH,//1:3 --- rating
                    "rHotel": param.rHotel,//true atau kosong --- rekomendasi
                    "srcdata": param.srcdata,//string
                    "minimbudget": param.minimbudget,
                    "maximbudget": param.maximbudget,


                    "startkotak": param.startkotak,//->1:11/21
                    "shortData": param.shortData,//asc -> harga terendah: desc -> harga tertinggi

                }
            }
            console.log('paramProduct', JSON.stringify(paramProduct));


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "ci_session=1s0j9nb8gegvpcmnguagmrni0uqu4uec");

            var raw = JSON.stringify(paramProduct);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://masterdiskon.com/front/product/hotel/hotellist/app", requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log('hotellist', JSON.stringify(result));
                    this.setState({ loading_product_hotel_linx: false });
                    this.setState({ listdata_product_hotel_linx: this.rebuild(result.dataHotel) });
                    this.setState({ arrayPrice: this.rebuildArrayPrice(result.dataHotel) });
                    this.setState({ listdata_product_hotel_linx_original: this.rebuild(result.dataHotel) });
                    this.setState({ banyakData: result.banyakData });
                    this.setState({ banyakPage: Math.ceil(parseInt(result.banyakData) / parseInt(10)) })



                    // this.setState({abort:false});
                    // setTimeout(() => {
                    //     console.log('abort',this.state.abort);
                    //     this.getPrice(result.arrPrice);
                    // }, 50);
                })
                .catch(error => {
                    this.setState({ loading_product_hotel_linx: false });
                    this.setState({ listdata_product_hotel_linx: [] });
                });
            //});

        });
    }



    getProductHotelListPerArea(param) {
        const { config } = this.state;
        this.setState({ progressBarProgress: 0.0 });
        console.log('getProductHotelLinx2param', JSON.stringify(param));
        this.setState({ loading_product_hotel_linx: true }, () => {
            //this.setState({ abort: true }, () => {
            var myHeaders = new Headers();
            myHeaders.append("Cookie", "ci_session=jjprqnbtcsfbu89nd6ih0tdvmhqd0qia");
            var paramProduct = {
                "param": {
                    "area": param.area.trim(),
                    "country": param.country.trim(),
                    //"city": param.city.toString(),
                    "checkin": param.checkin,
                    "checkout": param.checkout,
                    "adults": param.adults,
                    "child": param.child,
                    "room": param.room,
                    "newIdSlide": "",
                    "umurank": param.umurank,
                    "stringumurank": param.stringumurank,
                    "stringAdults": param.stringAdults,
                    "stringChild": param.stringChild,
                    "stringRoom": param.stringRoom,


                    "rating": param.ratingH,//1:3 --- rating
                    "rHotel": param.rHotel,//true atau kosong --- rekomendasi
                    "srcdata": param.srcdata,//string
                    "minimbudget": param.minimbudget,
                    "maximbudget": param.maximbudget,


                    "startkotak": param.startkotak,//->1:11/21
                    "shortData": param.shortData,//asc -> harga terendah: desc -> harga tertinggi
                    "hotelid": param.hotelid

                }
            }
            console.log('paramProduct', JSON.stringify(paramProduct));


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "ci_session=1s0j9nb8gegvpcmnguagmrni0uqu4uec");

            var raw = JSON.stringify(paramProduct);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://masterdiskon.com/front/product/hotel/hotellistPerArea/app", requestOptions)
                .then(response => response.json())
                .then(result => {

                    console.log('getProductHotelListPerArea', JSON.stringify(result));
                    this.setState({ loading_product_hotel_linx: false });
                    this.setState({ listdata_product_hotel_linx: this.rebuild(result.dataHotel) });
                    this.setState({ arrayPrice: this.rebuildArrayPrice(result.dataHotel) });
                    this.setState({ listdata_product_hotel_linx_original: this.rebuild(result.dataHotel) });
                    this.setState({ banyakData: result.banyakData });
                    this.setState({ banyakPage: Math.ceil(parseInt(result.banyakData) / parseInt(10)) })



                    // this.setState({abort:false});
                    // setTimeout(() => {
                    //     console.log('abort',this.state.abort);
                    //     this.getPrice(result.arrPrice);
                    // }, 50);
                })
                .catch(error => {
                    this.setState({ loading_product_hotel_linx: false });
                    this.setState({ listdata_product_hotel_linx: [] });
                });
            //});

        });
    }



    hasilSatuanPrice(itemPrice) {
        if (this.state.abort == false) {

            var paramPrice = { "param": itemPrice };
            console.log('paramPrice', JSON.stringify(paramPrice));
            var myArray = this.state.listdata_product_hotel_linx;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(paramPrice);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            return fetch("https://masterdiskon.com/front/product/hotel/getPricePerHotel/app", requestOptions)
                .then(response => response.json())
                .then(result => {
                    return result;
                })
                .catch(error => {
                    this.dropdown.alertWithType('info', 'Info', 'Gagal memperbarui harga, jaringan kurang lancar');

                    //alert('Kegagalan Respon Server');
                    //alert('Terjadi kesalahan jaringan, coba ulangi lagi')
                });

        }

    }

    async getPrice(arrPrice) {
        var myArray = this.state.listdata_product_hotel_linx;

        for (a = 0; a < arrPrice.length; a++) {



            let result = await this.hasilSatuanPrice(arrPrice[a]);
            console.log('getPrice', JSON.stringify(result));
            this.updateArrayPrice(result, a);

            if (result) {
                continue;
            }

        }
    }

    updateArrayPrice(objPrice, a) {
        var arrayPrice = this.state.arrayPrice;
        var x = a + 1;
        this.setState({ progressBarProgress: x / 10 })
        console.log('urut', JSON.stringify(a));
        console.log('arrayPriceOld', JSON.stringify(arrayPrice));
        console.log('objPrice', JSON.stringify(objPrice));

        var myArray = arrayPrice;
        objIndex = myArray.findIndex((obj => obj.HotelId == objPrice.HotelId));
        myArray[objIndex].hargaminPrice = objPrice.hargaminPrice;
        console.log("After update: ", JSON.stringify(myArray));
        this.setState({ arrayPrice: myArray });
    }

    changeProgress = () => {
        this.setState({ progressBarProgress: parseFloat(Math.random().toFixed(1)) });
        setTimeout(() => {
            console.log('progressBarProgress', this.state.progressBarProgress);
        }, 50);
    }

    componentDidMount() {
        let { param } = this.state;
        const { navigation } = this.props;

        if (param.typeSearch != 'area') {
            this.getProductHotelList(param);
        } else {
            this.getProductHotelListPerArea(param);
        }

        // navigation.addListener ('didFocus', () =>{


        //         if(param.typeSearch != 'area'){
        //             this.getProductHotelList(param);
        //         }else{
        //             this.getProductHotelListPerArea(param);
        //         }

        // });




    }

    renderItem(item, index) {
        const { navigation } = this.props;
        const { config, param } = this.state;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        if (item !== null && typeof item === 'object' && Array.isArray(item) === false) {
            item = item;
        } else {
            item = DataHotelLinx[0];
        }
        return (


            // <CardCustom
            //                                             propImage={{height:wp("30%"),url:item.gambar}}
            //                                             propInframe={{top:item.cityname,bottom:''}}
            //                                             propTitle={{text:item.hotelname}}
            //                                             propDesc={{text:""}}
            //                                             propPrice={{price:this.state.loading_product_hotel_linx == true ? 'loading' : this.state.arrayPrice[index].hargaminPrice,startFrom:true}}
            //                                             propPriceCoret={{price:'',discount:'',discountView:true}}

            //                                             propStar={{rating:item.rating,enabled:true}}
            //                                             propLeftRight={{left:item.filter_recommended,right:''}}
            //                                             onPress={() =>
            //                                                 {
            //                                                     param.hotelid=item.hotelid;
            //                                                     this.getProductHotelLinxDetail();
            //                                                 }
            //                                             }
            //                                             loading={this.state.loading_product_hotel_linx}
            //                                             propOther={{inFrame:true,horizontal:false,width:(width - 50) / 2}}

            //                                             style={[
            //                                                 index % 2 ? { marginLeft: 10 } : {}
            //                                             ]
            //                                             }
            //                                         />

            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: BaseColor.whiteColor, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flex: 3, padding: 10 }}>
                    <PlaceholderLine width={80} style={{ height: 100 }} />
                </View>
                <View style={{ flex: 7, padding: 10 }}>
                    <PlaceholderLine width={50} />
                    <PlaceholderLine width={100} />
                    <PlaceholderLine width={50} />
                </View>

            </View>

            // <CardCustom
            //     propImage={{height:wp("20%"),url:item.gambar}}
            //     propTitle={{text:item.hotelname}}
            //     propDesc={{text:''}}
            //     propPrice={{price:this.state.loading_product_hotel_linx == true ? 'loading' : this.state.arrayPrice[index].hargaminPrice,startFrom:true}}
            //     propPriceCoret={{price:'',discount:'',discountView:true}}

            //     propInframe={{top:item.cityname,bottom:''}}
            //     propTitle={{text:item.hotelname}}
            //     propDesc={{text:""}}
            //     propStar={{rating:item.rating,enabled:true}}
            //     propLeftRight={{left:item.filter_recommended,right:''}}
            //     onPress={() =>{ 
            //         param.hotelid=item.hotelid;
            //         this.getProductHotelLinxDetail();
            //     }

            //     }
            //     loading={this.state.loading_product_hotel_linx}
            //     propOther={{inFrame:true,horizontal:false,width:'100%'}}
            //     propIsCampaign={false}
            //     propPoint={0}       

            //     style={
            //     [
            //         {marginBottom:10}
            //     ]

            //     }
            //     sideway={true}
            // />

        );
    }

    renderContent() {
        const { config, param } = this.state;
        const { navigation } = this.props;

        const { height, width } = Dimensions.get('window');

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View>

                {
                    this.state.listdata_product_hotel_linx.length != 0 ?
                        <View>
                            <View style={{ marginHorizontal: 20, marginBottom: 5 }}>
                                {/* {
                                            ( Platform.OS === 'android' )
                                            ?
                                            ( <ProgressBarAndroid progress = { this.state.progressBarProgress } styleAttr = "Horizontal" indeterminate = { false } /> )
                                            :
                                            ( <ProgressViewIOS progress = { this.state.progressBarProgress } /> )
                                        }
                                            <Text caption1 style = { styles.text }>Update harga terbaru : { this.state.progressBarProgress * 100 }%</Text> */}
                            </View>
                            {/* <FlatList
                                                numColumns={2}
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: 'space-evenly',
                                                    marginBottom:10
                                                }}
                                                style={{marginHorizontal:20}}
                                                data={this.state.listdata_product_hotel_linx}
                                                showsHorizontalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}

                                                removeClippedSubviews={true} // Unmount components when outside of window 
                                                initialNumToRender={2} // Reduce initial render amount
                                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                                maxToRenderPerBatch={1000} // Increase time between renders
                                                windowSize={7} // Reduce the window size

                                                getItemLayout={(item, index) => (
                                                    {length: 70, offset: 70 * index, index}
                                                  )}
                                                //   onScrollEndDrag={() => ////console.log("end")}
                                                //   onScrollBeginDrag={() => ////console.log("start")}
                                                  //onScroll={(e) => ////console.log(e.nativeEvent.contentOffset.y)}
                                                renderItem={({ item,index }) => this.renderItem(item,index)}


                                                
                                            /> */}


                            <FlatList
                                //    horizontal={true}
                                //    showsHorizontalScrollIndicator={false}
                                style={{ marginHorizontal: 20 }}
                                data={this.state.listdata_product_hotel_linx}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id}
                                getItemLayout={(item, index) => (
                                    { length: 70, offset: 70 * index, index }
                                )}
                                removeClippedSubviews={true} // Unmount components when outside of window 
                                initialNumToRender={2} // Reduce initial render amount
                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                maxToRenderPerBatch={100} // Increase time between renders
                                windowSize={7} // Reduce the window size
                                renderItem={({ item, index }) => (

                                    <CardCustom
                                        propImage={{ height: wp("30%"), url: item.gambar }}
                                        propTitle={{ text: item.hotelname }}
                                        propPrice={{ price: this.state.loading_product_hotel_linx == true ? 'loading' : this.state.arrayPrice[index].hargaminPrice, startFrom: true }}
                                        propPriceCoret={{ price: '', discount: '', discountView: true }}

                                        propInframe={{ top: item.cityname, bottom: '' }}
                                        propTitle={{ text: item.hotelname }}
                                        propDesc={{ text: item.address }}

                                        propStar={{ rating: item.rating, enabled: true }}
                                        propLeftRight={{ left: item.filter_recommended, right: '' }}
                                        onPress={() => {
                                            param.hotelid = item.hotelid;
                                            this.getProductHotelLinxDetail();
                                        }

                                        }
                                        loading={this.state.loading_product_hotel_linx}
                                        propOther={{ inFrame: true, horizontal: false, width: '100%' }}
                                        propIsCampaign={false}
                                        propPoint={0}

                                        style={
                                            [
                                                { marginBottom: 10 }
                                            ]

                                        }
                                        sideway={true}
                                    />

                                    // <CardCustom
                                    //     propImage={{height:wp("30%"),url:item.gambar}}
                                    //     propInframe={{top:item.cityname,bottom:''}}
                                    //     propTitle={{text:item.hotelname}}
                                    //     propDesc={{text:""}}
                                    //     propPrice={{price:this.state.loading_product_hotel_linx == true ? 'loading' : this.state.arrayPrice[index].hargaminPrice,startFrom:true}}
                                    //     propPriceCoret={{price:'',discount:'',discountView:true}}

                                    //     propStar={{rating:item.rating,enabled:true}}
                                    //     propLeftRight={{left:item.filter_recommended,right:''}}
                                    //     onPress={() =>
                                    //         {
                                    //             param.hotelid=item.hotelid;
                                    //             this.getProductHotelLinxDetail();
                                    //         }
                                    //     }
                                    //     loading={this.state.loading_product_hotel_linx}
                                    //     propOther={{inFrame:true,horizontal:false,width:(width - 50) / 2}}

                                    //     style={[
                                    //         index % 2 ? { marginLeft: 10 } : {}
                                    //     ]
                                    //     }
                                    // />
                                )}


                            />
                        </View>
                        :
                        <DataEmpty />
                }
            </View>
        );

    }



    setPagination(currentPage) {

        const { param, banyakPage } = this.state;
        if (currentPage <= banyakPage) {


            this.setState({ arrayPrice: this.state.arrayPriceOriginal });
        }

        if (currentPage != 1) {
            var startkotak = ((currentPage - 1) * 10) + 1;
            this.setState({ startkotak: startkotak.toString() });
        } else {
            var startkotak = 0;
            this.setState({ startkotak: startkotak.toString() });
        }


        setTimeout(() => {
            if (currentPage <= banyakPage) {
                this.setState({ currentPage: currentPage });
                param.startkotak = this.state.startkotak;
                this.getProductHotelList(param);

            }

        }, 50);
    }


    render() {
        const { navigation } = this.props;
        const { loading_product_hotel_linx, listdata_product_hotel_linx, param } = this.state;



        var banyakPage = 10;
        var currentPage = this.state.currentPage;
        var dataPage = [];
        for (x = 1; x <= banyakPage; x++) {
            dataPage.push(x);

        }


        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >
                {/* <Header
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
                    onPressLeft={() => {
                        //this.setState({abort:true});
                        navigation.goBack();
                    }}
                    
                /> */}


                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', flex: 0.05, backgroundColor: BaseColor.primaryColor, }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                style={{ marginLeft: 20 }}
                            >
                                <Icon
                                    name="md-arrow-back"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                    style={{}}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 8 }}>
                            <View style={{ paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text caption1 whiteColor>{param.searchTitle} - {param.room} kamar, {param.jmlTamu} tamu</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text caption1 whiteColor>{param.checkin} - {param.checkout}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("HotelSearchAgain",
                                                {
                                                    param: this.state.param,
                                                    filterProcess: this.filterProcess
                                                }
                                            );
                                        }}
                                    >
                                        <Icon
                                            name="md-pencil-sharp"
                                            size={14}
                                            color={BaseColor.whiteColor}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 2 }} />
                    </View>
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
                        style={[styles.scrollView, { flex: 0.8 }]}
                        contentContainerStyle={styles.contentContainer}
                    >

                        {
                            loading_product_hotel_linx == true ?
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginHorizontal: 20, flex: 1 }}>
                                        {this.renderItem(listdata_product_hotel_linx[0], 0)}
                                        {this.renderItem(listdata_product_hotel_linx[1], 0)}
                                        {this.renderItem(listdata_product_hotel_linx[1], 0)}
                                        {this.renderItem(listdata_product_hotel_linx[1], 0)}
                                        {this.renderItem(listdata_product_hotel_linx[1], 0)}
                                    </View>

                                    {/* <View style={{marginHorizontal:20,flex:1,flexDirection:'row'}}>
                                {this.renderItem(listdata_product_hotel_linx[0],0)}
                                {this.renderItem(listdata_product_hotel_linx[0],1)}
                                </View>

                                <View style={{marginHorizontal:20,flex:1,flexDirection:'row'}}>
                                {this.renderItem(listdata_product_hotel_linx[0],0)}
                                {this.renderItem(listdata_product_hotel_linx[0],1)}
                                </View>

                                <View style={{marginHorizontal:20,flex:1,flexDirection:'row'}}>
                                {this.renderItem(listdata_product_hotel_linx[0],0)}
                                {this.renderItem(listdata_product_hotel_linx[0],1)}
                                </View> */}
                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    {this.renderContent()}

                                </View>
                        }
                    </ScrollView>
                    <FilterSortHotelLinxBottom
                        onFilter={this.onFilter}
                        onClear={this.onClear}
                        sortProcess={this.sortProcess}
                        banyakData={this.state.banyakData}
                        banyakPage={this.state.banyakPage}
                        setPagination={this.setPagination}
                        value={this.state.currentPage}
                        valueMin={1}
                        valueMax={this.state.currentPage <= this.state.banyakPage ? false : true}

                        style={
                            [{ marginHorizontal: 15, flex: 0.05 }]
                        }
                    />
                </View>


                {/* <View style={{flex:0.05,flexDirection:'row'}}>
                            <View style={{flexDirection:'row'}}>
                            {
                                    currentPage > 1 ?

                                <TouchableOpacity 
                                    onPress={() => 
                                        {
        
                                        this.setState({currentPage:this.state.currentPage-1});
        
                                        }}
                                    style={[{
                                        padding:5,
                                        borderColor:BaseColor.primaryColor,
                                        borderWidth:1,
                                        marginHorizontal:2,
                                        backgroundColor:currentPage == x ? BaseColor.primaryColor : BaseColor.whiteColor
                                    }]}>
                                        <Text caption1 style={{color:currentPage == x ? BaseColor.whiteColor : BaseColor.primaryColor}}>Last</Text>
                                    </TouchableOpacity>
                                    :
                                    <View />
                                }
                            
                            </View>


                            <View style={{flexDirection:'row'}}>
                            {
                            dataPage.map((x) => {
                                return (
                                   currentPage > (banyakPage - 4) ? 
                                   x >= (currentPage-4) && x < currentPage ?
                                    <TouchableOpacity 
                                    onPress={() => 
                                        {
        
                                        //alert(x);
                                        console.log(x);
                                        this.setState({currentPage:x});
        
                                        }}
                                    style={[{
                                        padding:5,
                                        borderColor:BaseColor.primaryColor,
                                        borderWidth:1,
                                        marginHorizontal:2,
                                        backgroundColor:currentPage == x ? BaseColor.primaryColor : BaseColor.whiteColor
                                    }]}>
                                        <Text caption1 style={{color:currentPage == x ? BaseColor.whiteColor : BaseColor.primaryColor}}>{x}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View />
                                    :
                                    
                                    <View />
                                );
                            })}
                            </View>



                            <View style={{flexDirection:'row'}}>
                            {
                            dataPage.map((x) => {
                                return (
                                    x >= currentPage && x <= (currentPage+4) ? 
                                    
                                    <TouchableOpacity 
                                    onPress={() => 
                                        {
        
                                        //alert(x);
                                        console.log(x);
                                        this.setState({currentPage:x});
        
                                        }}
                                    style={[{
                                        padding:5,
                                        borderColor:BaseColor.primaryColor,
                                        borderWidth:1,
                                        marginHorizontal:2,
                                        backgroundColor:currentPage == x ? BaseColor.primaryColor : BaseColor.whiteColor
                                    }]}>
                                        <Text caption1 style={{color:currentPage == x ? BaseColor.whiteColor : BaseColor.primaryColor}}>{x}</Text>
                                    </TouchableOpacity>
                                    :
                                    
                                    <View />
                                );
                            })}
                            </View>

                           {

                               currentPage < (banyakPage -4) ?
                            <View style={{flexDirection:'row'}}>

                           
                                    <TouchableOpacity 
                                    onPress={() => 
                                        {
        
                                        //alert(x);
                                        console.log(x);
                                        this.setState({currentPage:x});
        
                                        }}
                                    style={[{
                                        padding:5,
                                        borderColor:BaseColor.primaryColor,
                                        borderWidth:1,
                                        marginHorizontal:2,
                                        backgroundColor:currentPage == x ? BaseColor.primaryColor : BaseColor.whiteColor
                                    }]}>
                                        <Text caption1 style={{color:currentPage == x ? BaseColor.whiteColor : BaseColor.primaryColor}}>{banyakPage}</Text>
                                    </TouchableOpacity>
                                    

                            </View>
                            :
                            <View />
                                }

                               

                        </View> */}

                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />

            </SafeAreaView>
        );
    }
}
