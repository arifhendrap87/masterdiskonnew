import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    RefreshControl,
    InteractionManager,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    StatusBar
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    Image,
    RateDetail,
    CommentItem,
    PostListItem,
    HelpBlock,
    StarRating,
    Tag,
    QuantityPicker
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import * as Utils from "@utils";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SetDate from "../../components/SetDate";
import SetPenumpang from "../../components/SetPenumpang";
import NotYetLogin from "../../components/NotYetLogin";

// import styles from "./styles";

// Load sample data
import { HelpBlockData, ReviewData } from "@data";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';

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
        borderBottomWidth: 1,
        borderColor: BaseColor.textSecondaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
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


export default class TourDetailCustom extends Component {
    constructor(props) {
        super(props);
        var product = this.props.navigation.state.params.product;
        console.log('TourDetailCustom', JSON.stringify(product));

        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 7);
        var tglAwal = this.convertDate(minDate);


        // Temp data define
        this.state = {
            heightHeader: Utils.heightHeader(),
            title: "Europe Cruises",
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            service: [
                { id: "1", name: "wifi" },
                { id: "2", name: "coffee" },
                { id: "3", name: "bath" },
                { id: "4", name: "car" },
                { id: "5", name: "paw" },
                { id: "6", name: "futbol" },
                { id: "7", name: "user-secret" },
                { id: "8", name: "clock" },
                { id: "9", name: "tv" },
                { id: "10", name: "futbol" }
            ],
            index: 0,
            routes: [
                { key: "hotel", title: "Hotel" },
                { key: "itinerary", title: "Itinerary" },
                { key: "include", title: "Include" },
                { key: "exclude", title: "Exclude" },
                // { key: "information", title: "Information" },
                // { key: "review", title: "Review" },
                // { key: "feedback", title: "Feedback" }
            ],
            product: product,
            minPersonDef: 0,
            minPerson: 0,
            minPrice: 0,
            totalPrice: 0,
            modalVisiblePerson: false,
            modalVisibleDate: false,
            dewasa: "0",
            anak: "0",
            bayi: "0",
            selectedStartDate: null,
            tglAwal: tglAwal,
            tglAkhir: '',

            tglAwalNumber: 0,
            tglAkhirNumber: 0,
            login: true,



        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setMinPerson = this.setMinPerson.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.setTglAkhir = this.setTglAkhir.bind(this);
    }



    // When tab is activated, set what's index value
    _handleIndexChange = index =>
        this.setState({
            index
        });

    // Customize UI tab bar
    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View style={{ flex: 1, width: 130, alignItems: "center" }}>
                    <Text caption1 semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    setTglAwal(dateConversion, dateNumber) {
        this.setState({ tglAwal: dateConversion });
        this.setState({ tglAwalNumber: dateNumber });
        //console.log('setTglAwal',dateNumber);
        //alert(dateNumber);
    }

    setTglAkhir(dateConversion, dateNumber) {
        this.setState({ tglAkhir: dateConversion });
        this.setState({ tglAkhirNumber: dateNumber });
    }


    setPrice(select) {
        if (select.trip_minimum.length != 0) {
            var minPerson = select.trip_minimum[0].count_minimum;
            var minPrice = select.trip_minimum[0].price_minimum;
            var totalPrice = parseInt(minPerson) * parseInt(minPrice);
            var minPersonDef = select.trip_minimum[0].count_minimum;

            this.setState({ minPersonDef: minPerson });
            this.setState({ minPerson: minPerson });
            this.setState({ minPrice: minPrice });
            this.setState({ totalPrice: totalPrice });
            this.setState({ select: select });
        }
    }

    setJumlahDewasa(jml) {
        this.setState({ dewasa: jml });
        setTimeout(() => {
            var minPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            this.setState({ minPerson: minPerson });
            var totalPrice = parseInt(minPerson) * parseInt(this.state.minPrice);
            this.setState({ totalPrice: totalPrice });


            // console.log('adult :'+this.state.dewasa);
            // console.log('anak :'+this.state.anak);
            // console.log('bayi :'+this.state.bayi);
        }, 50);
    }

    setJumlahAnak(jml) {
        this.setState({ anak: jml });
        setTimeout(() => {
            var minPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            this.setState({ minPerson: minPerson });
            var totalPrice = parseInt(minPerson) * parseInt(this.state.minPrice);
            this.setState({ totalPrice: totalPrice });
            // console.log('adult :'+this.state.dewasa);
            // console.log('anak :'+this.state.anak);
            // console.log('bayi :'+this.state.bayi);
        }, 50);
    }

    setJumlahBayi(jml) {
        this.setState({ bayi: jml });
        setTimeout(() => {
            var minPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            this.setState({ minPerson: minPerson });
            var totalPrice = parseInt(minPerson) * parseInt(this.state.minPrice);
            this.setState({ totalPrice: totalPrice });

            // console.log('adult :'+this.state.dewasa);
            // console.log('anak :'+this.state.anak);
            // console.log('bayi :'+this.state.bayi);
        }, 50);
    }

    setMinPerson(jml) {


        var select = this.state.select;
        var trip_minimum = select.trip_minimum;
        var product = this.state.product;
        var select = this.state.select;
        var minPersonDef = this.state.minPersonDef;
        var minPrice = 0;
        var totalPrice = 0;




        if (jml == minPersonDef) {
            totalPrice = parseInt(this.state.minPrice) * parseInt(jml);
            minPrice = this.state.minPrice;
        } else {
            totalPrice = parseInt(product.product_price) * parseInt(jml);
            minPrice = product.product_price;
        }


        this.setState({ totalPrice: totalPrice });
        this.setState({ minPerson: jml });
        this.setState({ minPrice: minPrice });
    }


    componentDidMount() {

        StatusBar.setBackgroundColor("rgba(0,0,0,0)");
        StatusBar.setTranslucent(true);
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({ login: true });
            } else {
                this.setState({ login: false });

            }
        });


        setTimeout(() => {
            this.setState({ dewasa: this.state.minPerson });
        }, 50);
    }
    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "hotel":
                return (
                    <Hotel
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                        setPrice={this.setPrice}
                    />
                );
            case "include":
                return (
                    <Include
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "exclude":
                return (
                    <Exclude
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "information":
                return (
                    <InformationTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "itinerary":
                return (
                    <Itinerary
                        product={this.state.product}
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "feedback":
                return (
                    <Feedback
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "review":
                return (
                    <ReviewTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };

    convertDate(date) {

        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;
        return date;
    }

    setDate(date) {

        var date = new Date(date);
        var tempoMonth = (date.getMonth() + 1);
        var tempoDate = (date.getDate());
        var finaldate = "";
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return finaldate = date.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    };

    onSubmit() {

        const { type, product, select } = this.state;
        var tgl_akhir = '';


        var param = {
            DepartureDate: this.state.tglAwal,
            ReturnDate: tgl_akhir,
            Adults: this.state.dewasa,
            Children: this.state.anak,
            Infants: this.state.bayi,
        }

        var productPart = {}
        var link = '';

        link = 'Summary';
        param.type = 'trip';
        param.cityId = this.state.cityId;
        param.cityText = this.state.cityText;
        param.cityProvince = this.state.cityProvince;
        param.minPrice = this.state.minPrice;
        param.minPerson = this.state.minPerson;
        param.totalPrice = this.state.totalPrice;
        param.Qty = parseInt(param.Adults) + parseInt(param.Children) + parseInt(param.Infants);
        param.participant = true;


        this.props.navigation.navigate(link,
            {
                param: param,
                product: product,
                productPart: select
            });
        // console.log('paramHotel',JSON.stringify(param));
        // console.log('productHotel',JSON.stringify(product));
        // console.log('productPartHotel',JSON.stringify(select));
    }



    render() {
        const { navigation } = this.props;
        const { title, heightHeader, service, product, minPerson, minPrice, totalPrice, login } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        const { modalVisiblePerson, modalVisibleDate } = this.state;

        var contentButton = <View></View>
        if (product.product_option[0].trip_minimum.length != 0) {
            contentButton = <View style={styles.contentButtonBottom}>
                <View style={{
                    alignItems: "center",
                    justifyContent: 'center',
                }}>
                    <Text caption1 primaryColor >
                        Rp {priceSplitter(totalPrice)}
                    </Text>
                    <Text caption2 style={{ marginTop: -3 }}>
                        {minPerson} x Rp {priceSplitter(minPrice)}
                    </Text>

                </View>
                <View>
                    <SetDate
                        labelTglAwal={this.state.tglAwal}
                        labelTglAkhir={this.state.tglAwal}

                        tglAwalNumber={this.state.tglAwalNumber}
                        tglAwal={this.state.tglAwal}
                        setTglAwal={this.setTglAwal}

                        tglAkhirNumber={this.state.tglAkhirNumber}
                        tglAkhir={this.state.tglAkhir}
                        setTglAkhir={this.setTglAkhir}

                    />
                </View>

                <View>
                    <SetPenumpang
                        label={this.state.minPerson}
                        dewasa={this.state.dewasa}
                        anak={this.state.anak}
                        bayi={this.state.bayi}
                        setJumlahDewasa={this.setJumlahDewasa}
                        setJumlahAnak={this.setJumlahAnak}
                        setJumlahBayi={this.setJumlahBayi}
                        minPersonDef={this.state.minPersonDef}
                        minPerson={this.state.minPerson}
                        minPrice={this.state.minPrice}
                        totalPrice={this.state.totalPrice}
                        setMinPerson={this.setMinPerson}
                    />
                </View>


                <Button
                    style={{ height: 40 }}
                    onPress={() => {
                        this.onSubmit();
                    }}
                >
                    Next
                </Button>
            </View>
        }
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
                    <Image
                        source={{ uri: product.img_featured_url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />

                </Animated.View>
                {
                    login ?
                        <SafeAreaView
                            style={BaseStyle.safeAreaView}
                            forceInset={{ top: "always" }}
                        >
                            {/* Header */}
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
                                {/* Main Container */}



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
                                    <Tag
                                        primary
                                        style={{ marginRight: 15 }}
                                    >
                                        {product.product_detail.name_trip_category}
                                    </Tag>
                                </View>


                                <View
                                    style={[
                                        { paddingHorizontal: 20, paddingTop: 0 },
                                    ]}
                                >
                                    <Text
                                        style={{ marginBottom: 10 }}
                                    >
                                        {product.product_name}
                                    </Text>

                                </View>


                                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 20 }}>
                                    <Icon
                                        name="map-marker-alt"
                                        color={BaseColor.lightPrimaryColor}
                                        size={10}
                                    />
                                    <Text
                                        caption1
                                        style={{ marginLeft: 10 }}
                                        numberOfLines={1}
                                    >
                                        {product.product_detail.country_name}, {product.product_detail.capital}
                                    </Text>
                                </View>


                                <TabView
                                    lazy
                                    navigationState={this.state}
                                    renderScene={this._renderScene}
                                    renderTabBar={this._renderTabBar}
                                    onIndexChange={this._handleIndexChange}
                                />
                            </ScrollView>
                            {contentButton}
                        </SafeAreaView>
                        :
                        <NotYetLogin redirect={'Home'} param={this.state.product} navigation={navigation} />

                }
            </View>
        );
    }
}

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
class InformationTab extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text caption1 semibold>
                    Day 1: London - Somme - Paris
                </Text>
                <Image
                    source={Images.cruise1}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption1 semibold style={{ marginTop: 20 }}>
                    Day 2: Paris - Burgundy - Swiss Alps
                </Text>
                <Image
                    source={Images.cruise2}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption1 semibold style={{ marginTop: 20 }}>
                    Day 3: Swiss Alps - Strasbourg - Heidel…
                </Text>
                <Image
                    source={Images.cruise3}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                />
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
                <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text>
            </View>
        );
    }
}





class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_option: props.product.product_option
        };
    }

    componentDidMount() {
        const { navigation, product } = this.props;
        if (product.product_option[0].trip_minimum.length != 0) {
            var select = product.product_option[0];
            this.props.setPrice(select);
            const selected = select.id_trip_option;

            if (selected) {
                this.setState({
                    product_option: this.state.product_option.map(item => {
                        return {
                            ...item,
                            checked: item.id_trip_option == selected
                        };
                    })
                });
            }
        }

    }

    onChange(select) {
        const { navigation, product } = this.props;
        this.setState({
            product_option: this.state.product_option.map(item => {
                if (item.id_trip_option == select.id_trip_option) {
                    return {
                        ...item,
                        checked: true
                    };
                } else {
                    return {
                        ...item,
                        checked: false
                    };
                }

            })
        });

        this.props.setPrice(select);
    }

    contentTripMinimum(items) {
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        var fieldsArray = [];

        items.trip_minimum.map(item => {
            fieldsArray.push(
                <View style={styles.linePrice}>
                    <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                        Minimum: {item.count_minimum}
                    </Text>
                    <View style={styles.iconRight}>
                        <Text
                            style={{ paddingHorizontal: 10 }}
                        >
                            Rp {priceSplitter(item.price_minimum)}
                        </Text>
                    </View>
                </View>
            );
        });
        return fieldsArray;

    }


    render() {
        const { renderMapView, todo, helpBlock, product_option } = this.state;
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{}}>
                {/* {contentHotelOption} */}

                <FlatList
                    data={product_option}
                    keyExtractor={(item, index) => item.id_trip_option}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            // style={styles.item}
                            onPress={() => {
                                //alert(item.id_trip_option);
                                this.onChange(item)
                                //console.log('product_option',item.id_trip_option);

                            }

                            }
                        >
                            <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null }]}>
                                <View style={styles.linePrice}>
                                    <Text caption1 semibold>
                                        {item.name_trip_option}
                                    </Text>

                                    {item.checked && (
                                        <View style={styles.iconRight}>
                                            <Icon
                                                name="check"
                                                size={24}
                                                color={'green'}
                                            />
                                        </View>
                                    )}

                                </View>

                                <View style={styles.linePriceMinMax}>
                                    {this.contentTripMinimum(item)}
                                    {/* <View style={styles.linePrice}>
                                                    <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                                                        Minimum: 2
                                                                </Text>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            style={{ paddingHorizontal: 10 }}
                                                        >
                                                            Rp {priceSplitter(item.trip_minimum[0].price_minimum)}
                                                        </Text>
                                                    </View>
                                                </View> */}

                                    {/* <View style={styles.linePrice}>
                                                    <Text primaryColor semibold style={{ paddingHorizontal: 10 }}>
                                                        Minimum: 4
                                                                </Text>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            style={{ paddingHorizontal: 10 }}
                                                        >
                                                            Rp {priceSplitter(item.trip_minimum[1].price_minimum)}
                                                        </Text>
                                                    </View>
                                                </View> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}


class Include extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock } = this.state;
        const { navigation, product } = this.props;
        var product_detail = product.product_detail;



        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                    html={product_detail.include}
                    imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}



class Exclude extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock } = this.state;
        const { navigation, product } = this.props;
        var product_detail = product.product_detail;



        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <HTML
                    html={product_detail.exclude}
                    imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}


class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            helpBlock: HelpBlockData,
            todo: [
                {
                    id: "1",
                    title: "South Travon",
                    image: Images.trip1
                },
                {
                    id: "2",
                    title: "South Travon",
                    image: Images.trip2
                },
                {
                    id: "3",
                    title: "South Travon",
                    image: Images.trip3
                },
                {
                    id: "4",
                    title: "South Travon",
                    image: Images.trip4
                },
                {
                    id: "5",
                    title: "South Travon",
                    image: Images.trip5
                }
            ]
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { renderMapView, todo, helpBlock, login } = this.state;
        const { navigation, product } = this.props;
        var product_itinerary = product.product_itinerary;


        var contentIntinerary = [];
        var b = 1;
        for (a = 0; a < product_itinerary.length; a++) {
            contentIntinerary.push(
                <View style={{ marginBottom: 10 }}>
                    <Text caption1 semibold style={{ marginVertical: 10 }}>
                        Day {b}: {product_itinerary[a].title_day}
                    </Text>
                    {/* <Image
                    source={Images.cruise1}
                    style={{ height: 120, width: "100%", marginTop: 10 }}
                /> */}
                    {/* <Text caption2 style={{ marginTop: 10 }}>
                    Curabitur non nulla sit amet nisl tempus convallis quis ac
                    lectus. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Text> */}

                    <HTML
                        html={product_itinerary[a].desc_day}
                        imagesMaxWidth={Dimensions.get("window").width}
                    />
                </View>

            );
            b++;
        }



        return (
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                {contentIntinerary}
            </View>
        );
    }
}
