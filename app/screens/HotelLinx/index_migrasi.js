import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBarAndroid, ProgressViewIOS, TouchableOpacity, FlatList, RefreshControl, View, Animated, ScrollView, StyleSheet, BackHandler, TouchableWithoutFeedback, Dimensions, ActivityIndicator } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, Text, Button } from "@components";
import * as Utils from "@utils";
import { AsyncStorage } from 'react-native';
import CardCustom from "../../components/CardCustom";
import FilterSortHotelLinxBottom from "../../components/FilterSortHotelLinxBottom";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import DropdownAlert from 'react-native-dropdownalert';


// Load sample data
import {
    DataConfig,
    DataHotelLinx
} from "@data";
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
export default function HotelLinx(props) {
    let { navigation, auth } = props;
    const configApi = useSelector(state => state.application.configApi);
    const config = useSelector(state => state.application.config);
    const userSession = useSelector(state => state.application.userSession);
    const login = useSelector(state => state.application.loginStatus);

    const dispatch = useDispatch();

    const [param, setParam] = useState((navigation.state.params && navigation.state.params.param) ? navigation.state.params.param : {});
    const [paramOriginal, setParamOriginal] = useState((navigation.state.params && navigation.state.params.paramOriginal) ? navigation.state.params.paramOriginal : {});
    const [listdataProduct, setListdataProduct] = useState(DataHotelLinx);
    const [listdataProductOriginal, setListdataProductOriginal] = useState(DataHotelLinx);
    const [refreshing, setRefreshing] = useState(false);
    const [scrollAnim, setScrollAnim] = useState(new Animated.Value(0));
    const [offsetAnim, setOffsetAnim] = useState(new Animated.Value(0));
    const [clampedScroll, setClampedScroll] = useState(Animated.diffClamp(
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
    ));
    const [loadingCheckRoom, setLoadingCheckRoom] = useState(false);
    const [loadingCheckRoomFile, setLoadingCheckRoomFile] = useState(require("app/assets/hotel.json"));
    const [loadingCheckRoomTitle, setLoadingCheckRoomTitle] = useState('Mohon tunggu, kami sedang mencari kamar yang kosong');
    const [loadingProduct, setloadingProduct] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [abort, setAbort] = useState(false);
    const [banyakData, setBanyakData] = useState(0);
    const [banyakPage, setBanyakPage] = useState(0);
    const [progressBarProgress] = useState(0.0);
    const [arrayPrice, setArrayPrice] = useState([{ "nums": 0, "HotelId": "22881", "hargaminPrice": "loading" }, { "nums": 1, "HotelId": "1242092", "hargaminPrice": "loading" }, { "nums": 2, "HotelId": "1225729", "hargaminPrice": "loading" }, { "nums": 3, "HotelId": "22858", "hargaminPrice": "loading" }, { "nums": 4, "HotelId": "22921", "hargaminPrice": "loading" }, { "nums": 5, "HotelId": "22937", "hargaminPrice": "loading" }, { "nums": 6, "HotelId": "1100835", "hargaminPrice": "loading" }, { "nums": 7, "HotelId": "23240", "hargaminPrice": "loading" }, { "nums": 8, "HotelId": "1285575", "hargaminPrice": "loading" }, { "nums": 9, "HotelId": "107307", "hargaminPrice": "loading" }]);
    const [arrayPriceOriginal, setaArrayPriceOriginal] = useState([{ "nums": 0, "HotelId": "22881", "hargaminPrice": "loading" }, { "nums": 1, "HotelId": "1242092", "hargaminPrice": "loading" }, { "nums": 2, "HotelId": "1225729", "hargaminPrice": "loading" }, { "nums": 3, "HotelId": "22858", "hargaminPrice": "loading" }, { "nums": 4, "HotelId": "22921", "hargaminPrice": "loading" }, { "nums": 5, "HotelId": "22937", "hargaminPrice": "loading" }, { "nums": 6, "HotelId": "1100835", "hargaminPrice": "loading" }, { "nums": 7, "HotelId": "23240", "hargaminPrice": "loading" }, { "nums": 8, "HotelId": "1285575", "hargaminPrice": "loading" }, { "nums": 9, "HotelId": "107307", "hargaminPrice": "loading" }]);
    const [heightHeader, setHeightHeader] = useState()
    const [startkotak, setStartKotak] = useState("1");
    function rebuild(listdata) {
        var listdata_new = [];
        var a = 1;
        listdata.map(item => {
            var obj = {};
            obj['num'] = a.toString();
            obj['nums'] = a;

            obj['filter_price'] = 'loading';
            obj['filter_rating'] = parseInt(item.class);
            obj['filter_recommended'] = item.IsRecomondedHotel == "FALSE" ? '' : 'Recommended';

            obj['hotelid'] = item.id;
            obj['newPrice'] = item.price;
            obj['rating'] = item.class;
            obj['hotelname'] = item.name;
            obj['longitude'] = item.detail.longitude;
            obj['latitude'] = item.detail.latitude;
            obj['address'] = item.detail.address;

            obj['description'] = item.detail.description;
            obj['IsRecomondedHotel'] = item.IsRecomondedHotel;
            obj['gambar'] = item.image;
            obj['paramTombolToDetail'] = item.paramTombolToDetail;
            obj['cityname'] = item.detail.city;


            listdata_new.push(obj);
            a++;
        });

        return listdata_new;
    }

    useEffect(() => {
        getProductHotelList(param);
        return () => {
        }
    }, []);


    function rebuildArrayPrice(listdata) {
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

    function sortProcess(selected) {
        setCurrentPage(1);


        if (selected == 'low_price') {
            param.shortData = "asc";
            param.startkotak = "0";
            console.log('sortProcessAsc', JSON.stringify(param));
            setParam(param);

        } else if (selected == 'hight_price') {
            param.shortData = "desc";
            param.startkotak = "0";
            console.log('sortProcessDesc', JSON.stringify(param));
            setParam(param);

        }
        setTimeout(() => {
            getProductHotelList(param);

        }, 50);
    }

    function onFilter() {
        navigation.navigate("HotelLinxFilter",
            {
                param: param,
                filterProcess: filterProcess
            }
        );
    }

    function onClear() {
        param.ratingH = "";
        param.rHotel = "";
        param.srcdata = "";
        param.minimbudget = "0";
        param.maximbudget = "15000000";
        param.shortData = "";
        param.startkotak = "0";

        console.log('paramOriginal', JSON.stringify(param));

        setArrayPrice(arrayPriceOriginal);

        setTimeout(() => {
            if (param.typeSearch != 'area') {
                getProductHotelList(param);
            } else {
                getProductHotelListPerArea(param);
            }

        }, 50);
    }

    function filterProcess(param) {
        console.log('paramProcess', JSON.stringify(param));

        setArrayPrice(arrayPriceOriginal);
        setParam(param);
        setCurrentPage(1);

        setTimeout(() => {
            getProductHotelList(param);
        }, 50);


    }


    function reformatDate(dateStr) {
        dArr = dateStr.split("-");  // ex input "2010-01-18"
        return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
    }

    function convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    }

    function convertStrToArray(item) {
        //"2_2,0,2sss".replace("_", ",");
        //item.split(",");
        return item
    }
    function getProductHotelList(param) {
        console.log('paramgetProductHotelList', JSON.stringify(param));
        setloadingProduct(true);
        let config = configApi;
        let baseUrl = config.apiBaseUrl;
        let url = baseUrl + 'booking/search';
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify(
            {
                "product": "hotel",
                "productDetail": "",
                "from": param.city,
                "to": "",
                "dateFrom": convertDateDMY(param.DepartureDate),
                "dateTo": convertDateDMY(param.ReturnDate),
                "pax": {
                    "room": parseInt(param.room),
                    "adult": parseInt(param.Adults),
                    "child": 0,
                    "infant": parseInt(param.Infants),
                    "childAge": param.umurank.split(',').map(parseFloat)
                },
                "classFrom": "0",
                "classTo": "5",
                "showDetail": false,
                "filter": {
                    "search": param.srcdata,
                    "page": param.currentPage,
                    "limit": 10,
                    "orderType": "asc",
                    "priceFrom": param.minimbudget,
                    "priceTo": param.maximbudger,
                    "class": param.ratingH == "" ? [1, 2, 3, 4, 5] : param.ratingH.split(',').map(parseFloat),
                    "recomendedOnly": false
                }
            }
        );
        console.log('paramhllist', raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('resultgetProductHotelList2', JSON.stringify(result));
                if (result.success == true) {
                    //console.log('resultgetProductHotelList2',JSON.stringify(result));
                    // this.setState({ loadingProduct: false });
                    // this.setState({ listdataProduct: this.rebuild(result.data) });
                    // this.setState({ arrayPrice: this.rebuildArrayPrice(result.data) });
                    // this.setState({ listdataProduct_original: this.rebuild(result.data) });
                    // this.setState({ banyakData: result.meta.total });
                    // this.setState({ banyakPage: result.meta.total_page })

                    setloadingProduct(false);
                    setListdataProduct(rebuild(result.data.productOptions));
                    setListdataProductOriginal(rebuild(result.data.productOptions));
                    setBanyakData(result.meta.total);
                    setBanyakPage(result.meta.maxPage);

                } else {


                    setloadingProduct(false);
                    setListdataProduct([]);
                    setListdataProductOriginal([]);
                    setBanyakData(0);
                    setBanyakPage(0);


                    this.dropdown.alertWithType('info', 'Info', result.message);

                }

            })
            .catch(error => {

            });



    }

    function renderItem(item, index) {

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        if (item !== null && typeof item === 'object' && Array.isArray(item) === false) {
            item = item;
        } else {
            item = DataHotelLinx[0];
        }
        return (

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

        );
    }

    function getProductHotelLinxDetail() {
        const data = {
            "hotelid": param.hotelid,
        }
        const paramSearch = { "param": data };
        setloadingProduct(true);
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/product/product_hotel_linx_detail";
        console.log('configApi', JSON.stringify(config));
        console.log('urlss', url);



        // var url=config.baseUrl;
        // var path="front/api_new/product/product_hotel_linx_detail";
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(paramSearch);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('ProductDetailss', JSON.stringify(result));
                // this.setState({ progressBarProgress: 0.0 });
                // this.setState({ loading_product_hotel_linx: false });
                setloadingProduct(false);
                param.city = result[0].product_place_id;
                // console.log('HotelLinxSS', JSON.stringify({ param: param, paramOriginal: paramOriginal, product: result[0], product_type: 'hotelLinx' }));
                navigation.navigate("ProductDetail", { param: param, paramOriginal: paramOriginal, product: result[0], product_type: 'hotelLinx' })
            })
            .catch(error => {
                alert('Kegagalan Respon Server');
            });



    }

    function renderContent() {

        const { height, width } = Dimensions.get('window');

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View>

                {
                    listdataProduct.length != 0 ?
                        <View>
                            <View style={{ marginHorizontal: 20, marginBottom: 5 }}>
                            </View>


                            <FlatList
                                //    horizontal={true}
                                //    showsHorizontalScrollIndicator={false}
                                style={{ marginHorizontal: 20 }}
                                data={listdataProduct}
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
                                        propImage={{ height: wp("50%"), url: item.gambar != "" ? item.gambar : 'https://masterdiskon.com/assets/images/image-not-found.png' }}
                                        propTitle={{ text: item.hotelname }}
                                        propPrice={{ price: listdataProduct == true ? 'loading' : arrayPrice[index].hargaminPrice, startFrom: true }}
                                        propPriceCoret={{ price: '', discount: '', discountView: true }}

                                        propInframe={{ top: item.cityname, bottom: '' }}
                                        propTitle={{ text: item.hotelname }}
                                        propDesc={{ text: '' }}
                                        //propDesc={{ text: item.address }}

                                        propType={'hotel'}

                                        propStar={{ rating: item.rating, enabled: true }}
                                        propLeftRight={{ left: "", right: "" }}
                                        onPress={() => {
                                            param.hotelid = item.hotelid;
                                            getProductHotelLinxDetail();
                                        }

                                        }
                                        loading={listdataProduct}
                                        propOther={{ inFrame: true, horizontal: false, width: '100%' }}
                                        propIsCampaign={false}
                                        propPoint={0}

                                        propHotelDesc1={item.address}
                                        propHotelDesc2={item.description}
                                        propHotelDesc3={{}}
                                        propHotelPrice={{}}
                                        propHotelHightLight={item.filter_recommended}
                                        propHotelPriceCoret={{ price: item.newPrice, priceDisc: item.newPrice, discount: '', discountView: false }}

                                        style={
                                            [
                                                { marginBottom: 10 }
                                            ]

                                        }
                                        sideway={true}
                                    />



                                )}


                            />
                        </View>
                        :
                        <DataEmpty />
                }
            </View>
        );

    }

    function setPagination(currentPage) {
        console.log('currentpage', currentPage);
        if (currentPage <= banyakPage) {


            //this.setState({ arrayPrice: this.state.arrayPriceOriginal });
        }

        if (currentPage != 1) {
            var startkotak = ((currentPage - 1) * 10) + 1;
            setStartKotak(startkotak.toString());
            // this.setState({ startkotak: startkotak.toString() });
        } else {
            var startkotak = 0;
            // this.setState({ startkotak: startkotak.toString() });
            setStartKotak(startkotak.toString())
        }



        if (currentPage <= banyakPage) {
            setCurrentPage(currentPage)
            param.startkotak = startkotak;
            param.currentPage = currentPage;
            setTimeout(() => {

                getProductHotelList(param);
            }, 50);

        }


    }


    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
            forceInset={{ top: "always" }}
        >
            <View style={{ position: 'absolute', backgroundColor: "#FFFFFF", flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

            <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>


                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', flex: 0.05, backgroundColor: BaseColor.primaryColor, paddingVertical: 5 }}>
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
                                                    param: param,
                                                    filterProcess: filterProcess
                                                }
                                            );
                                        }}
                                    >
                                        <Icon
                                            name="create-outline"
                                            size={16}
                                            color={BaseColor.secondColor}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 2 }} />
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: BaseColor.secondColor }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ paddingBottom: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text caption1 bold>Silahkan Pilih Hotel</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        onContentSizeChange={() => {
                            setHeightHeader(Utils.heightHeader());
                        }

                        }
                        scrollEventThrottle={8}
                        style={[styles.scrollView, { flex: 0.8 }]}
                        contentContainerStyle={styles.contentContainer}
                    >

                        {
                            loadingProduct == true ?
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginHorizontal: 20, flex: 1 }}>
                                        {renderItem(listdataProduct[0], 0)}
                                        {renderItem(listdataProduct[1], 0)}
                                        {renderItem(listdataProduct[1], 0)}
                                        {renderItem(listdataProduct[1], 0)}
                                        {renderItem(listdataProduct[1], 0)}
                                    </View>

                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    {renderContent()}

                                </View>
                        }
                    </ScrollView>

                    <FilterSortHotelLinxBottom
                        onFilter={onFilter}
                        onClear={onClear}
                        sortProcess={sortProcess}
                        banyakData={banyakData}
                        banyakPage={banyakPage}
                        setPagination={setPagination}
                        value={currentPage}
                        valueMin={1}
                        valueMax={currentPage <= banyakPage ? false : true}

                        style={
                            [{ marginHorizontal: 15, flex: 0.05 }]
                        }
                    />
                </View>
                <DropdownAlert ref={ref => this.dropdown = ref} messageNumOfLines={10} closeInterval={10000} />
            </View>
        </SafeAreaView >
    );


}

