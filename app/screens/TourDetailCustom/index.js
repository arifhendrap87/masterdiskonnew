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


export default class TourDetailCustom extends Component {
    constructor(props) {
        super(props);
        var product = this.props.navigation.state.params.product;
        // //console.log('TourDetailCustom',JSON.stringify(product));

        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 7);
        var tglAwal = this.convertDate(minDate);

        // Temp data define
        this.state = {
            heightHeader: Utils.heightHeader(),
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
            img_featured: {
                uri: 'https://masterdiskon.com/assets/front/img/app/doodle.png',
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            },
            info_trip: [
                {
                    "title": "Ketentuan",
                    "content": "Pembayaran paket perjalanan dilakukan dua kali. DP saat melakukan pesanan dan pelunasan sebelum H-10 keberangkatan"
                },
                {
                    "title": "Syarat dan Ketentuan",
                    "content": "\r\n                                               1.Periode pembelian voucher sampai dengan 31 March 2021 (sesuai ketersediaan)<br>\r\n                                               2.Voucher berlaku untuk periode menginap : sampai dengan 15 December 2021<br>\r\n                                               3.Voucher berlaku untuk 2 orang per room&nbsp;<br>\r\n                                               4.Voucher berlaku setiap hari, termasuk hari libur nasional dan long weekend<br>\r\n                                               5.Pembayaran penuh di muka diperlukan pada saat pembelian dan bersifat non-refundable<br>\r\n                                               6.Upgrade ke type kamar lainnya tersedia dengan biaya tambahan<br>\r\n                                               7.Voucher dapat dipindah tangankan sebagai hadiah kepada teman maupun keluarga"
                }
            ]
        };
        this._deltaY = new Animated.Value(0);
        this.setPrice = this.setPrice.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setMinPerson = this.setMinPerson.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.setTglAkhir = this.setTglAkhir.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        this.getInfoProduct();


    }


    getInfoProduct() {


        AsyncStorage.getItem('info_trip', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                this.setState({ info_trip: result });
            }
        });
    }


    setBookingTime(tglAwal, tglAkhir, round) {
        //console.log(tglAwal);
        //console.log(tglAkhir);
        if (round == true) {
            this.setState({ tglAwal: tglAwal });
            this.setState({ tglAkhir: tglAkhir });

        } else {
            this.setState({ tglAwal: tglAwal });
            this.setState({ tglAkhir: null });
        }
    }


    setTglAwal(dateConversion, dateNumber) {
        this.setState({ tglAwal: dateConversion });
        this.setState({ tglAwalNumber: dateNumber });
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
        }, 50);
    }

    setJumlahAnak(jml) {
        this.setState({ anak: jml });
        setTimeout(() => {
            var minPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            this.setState({ minPerson: minPerson });
            var totalPrice = parseInt(minPerson) * parseInt(this.state.minPrice);
            this.setState({ totalPrice: totalPrice });
        }, 50);
    }

    setJumlahBayi(jml) {
        this.setState({ bayi: jml });
        setTimeout(() => {
            var minPerson = parseInt(this.state.dewasa) + parseInt(this.state.anak) + parseInt(this.state.bayi);
            this.setState({ minPerson: minPerson });
            var totalPrice = parseInt(minPerson) * parseInt(this.state.minPrice);
            this.setState({ totalPrice: totalPrice });
        }, 50);
    }

    setMinPerson(jml) {
        var product = this.state.product;
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
        // AsyncStorage.getItem('userSession', (error, result) => {
        //     if (result) {
        //         this.setState({login:true});
        //      }else{
        //         this.setState({login:false});

        //      }
        // });
        setTimeout(() => {
            this.setState({ dewasa: this.state.minPerson });
        }, 50);
    }

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

        var param = {
            param: param,
            product: product,
            productPart: select
        }
        this.props.navigation.navigate(link,
            {
                param: param
            });
        // //console.log('paramHotel',JSON.stringify(param));
        // //console.log('productHotel',JSON.stringify(product));
        // //console.log('productPartHotel',JSON.stringify(select));
    }



    render() {
        const { navigation } = this.props;
        const { heightHeader, product, minPerson, minPrice, totalPrice, login } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

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
                        setBookingTime={this.setBookingTime}
                        tglAwal={this.state.tglAwal}
                        tglAkhir={this.state.tglAkhir}
                        round={false}
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
                        setMinPerson={this.setMinPerson}
                        minPersonDef={this.state.minPersonDef}
                        minPerson={this.state.minPerson}
                        minPrice={this.state.minPrice}
                        totalPrice={this.state.totalPrice}
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
                    {/* <Image
                        source={{ uri: product.img_featured_url }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    /> */}

                    <FastImage
                        style={{ width: "100%", height: "100%" }}
                        source={{
                            uri: this.state.product.img_featured_url,
                            headers: { Authorization: 'someAuthToken' },
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
                            <Tag
                                primary
                                style={{ marginRight: 15 }}
                            >
                                {product.product_detail.name_trip_category}
                            </Tag>
                        </View>
                        {/* END */}


                        {/* START */}
                        <View
                            style={[
                                { paddingHorizontal: 20, paddingTop: 0 },
                            ]}
                        >
                            <Text
                                body1
                                bold
                            >
                                {product.product_name}
                            </Text>
                        </View>
                        {/* END */}


                        {/* START */}
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



                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 10 }}>
                            <Text body2 bold style={{ color: BaseColor.thirdColor }}>Pilihan Produk</Text>
                            <Icon
                                name="angle-down"
                                color={BaseColor.thirdColor}
                                size={20}
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                        {/* END */}



                        <Hotel
                            product={this.state.product}
                            setPrice={this.setPrice}
                        />

                        <Include
                            product={this.state.product}
                        />

                        <Exclude
                            product={this.state.product}
                        />

                        <Itinerary
                            product={this.state.product}
                        />

                        <Informasi
                            data={this.state.info_trip[0].content}
                            title={this.state.info_trip[0].title}
                        />

                    </ScrollView>
                    {contentButton}
                </SafeAreaView>

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
                    <Text caption1 style={{ color: BaseColor.greyColor }}>
                        Minimum: {item.count_minimum}
                    </Text>
                    <View style={styles.iconRight}>
                        <Text
                            caption1
                            style={{ color: BaseColor.greyColor }}
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
        const { product_option } = this.state;
        const { navigation } = this.props;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{
                borderColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                marginHorizontal: 20,
                marginBottom: 10
            }}
            >

                <FlatList
                    data={product_option}
                    keyExtractor={(item, index) => item.id_trip_option}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.onChange(item)

                            }

                            }
                        >
                            <View style={[styles.itemPrice, { backgroundColor: BaseColor.secondColor == BaseColor.whiteColor ? item.checked : null }]}>
                                <View style={styles.linePrice}>
                                    <Text body bold>
                                        {item.name_trip_option}
                                    </Text>


                                    {
                                        item.checked ?
                                            <View style={styles.iconRight, { flexDirection: 'column' }}>

                                                <Icon
                                                    name="check-circle"
                                                    size={30}
                                                    color={'green'}
                                                />
                                                <Text caption2 style={{ color: 'green' }}>Dipilih</Text>
                                            </View>
                                            :
                                            <View style={styles.iconRight}>
                                                <Icon
                                                    name="circle"
                                                    size={30}
                                                    color={'grey'}
                                                />
                                            </View>
                                    }

                                </View>

                                <View style={styles.linePriceMinMax}>
                                    {this.contentTripMinimum(item)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

class Informasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            title: props.title
        };
    }



    render() {
        const { data, title } = this.state;
        const { navigation, product } = this.props;
        // var informasi='Biaya penambahan orang dalam kamar mungkin berlaku dan berbeda-beda menurut kebijakan properti.Tanda pengenal berfoto yang dikeluarkan oleh pemerintah dan kartu kredit, kartu debit, dan deposit uang tunai diperlukan saat check-in untuk biaya tidak terduga.Pemenuhan permintaan khusus bergantung pada ketersediaan sewaktu check-in dan mungkin menimbulkan biaya tambahan. Permintaan khusus tidak dijamin akan terpenuhi.';

        return (
            <View style={{ marginHorizontal: 20 }}>
                <View style={styles.linePrice}>
                    <Text body2 bold>
                        {title}
                    </Text>
                </View>
                <HTML
                    html={'<div style="font-size:10">' + data + '</div>'}
                    imagesMaxWidth={Dimensions.get("window").width}
                />
            </View>
        );
    }
}




class Include extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        const { } = this.state;
        const { navigation, product } = this.props;
        var product_detail = product.product_detail;

        return (
            <View style={{
                borderColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                marginHorizontal: 20,
                marginBottom: 10
            }}>
                <View>
                    <Text body2 bold>
                        Include
                    </Text>
                </View>
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

        };
    }

    componentDidMount() {
    }

    render() {
        const { } = this.state;
        const { navigation, product } = this.props;
        var product_detail = product.product_detail;



        return (
            <View style={{
                borderColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                marginHorizontal: 20,
                marginBottom: 10
            }}>
                <View>
                    <Text body2 bold>
                        Exclude
                    </Text>
                </View>
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
        };
    }

    componentDidMount() {
    }

    render() {
        const { } = this.state;
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
                    <HTML
                        html={product_itinerary[a].desc_day}
                        imagesMaxWidth={Dimensions.get("window").width}
                    />
                </View>

            );
            b++;
        }

        return (
            <View style={{
                borderColor: BaseColor.textSecondaryColor,
                borderBottomWidth: 1,
                marginHorizontal: 20,
                marginBottom: 10
            }}>
                <View>
                    <Text body2 bold>
                        Itinerary
                    </Text>
                </View>
                {contentIntinerary}
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