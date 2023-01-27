import React, { Component } from "react";
import { View, ScrollView, Text, TouchableOpacity, AsyncStorage, StatusBar } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Tag,
    FlightPlan,
    FormOption,
    QuantityPicker,
    Button
} from "@components";
import styles from "./styles";
import NotYetLogin from "../../components/NotYetLogin";
import SetDate from "../../components/SetDate";
import SetDateLong from "../../components/SetDateLong";

import QuantityPickerHorizontal from "../../components/QuantityPickerHorizontal";

export default class FlightSearch extends Component {
    constructor(props) {
        super(props);


        var product = [];
        if (this.props.navigation.state.params && this.props.navigation.state.params.product) {
            var product = this.props.navigation.state.params.product;
        } else {
            var product = [];
        }

        var productPart = [];
        if (this.props.navigation.state.params && this.props.navigation.state.params.productPart) {
            var productPart = this.props.navigation.state.params.productPart;
        } else {
            var productPart = [];
        }




        //Start Set Variabel Search
        var type = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.type) {
            var type = this.props.navigation.state.params.type;
        } else {
            var type = '';
        }

        var tglAwal = this.getDate(0);
        var tglAkhir = this.getDate(1);

        var round = '';
        var title = '';
        if (type == 'flight') {
            round = false;
            title = 'Search Flight';
        } else if (type == 'hotelpackage') {
            round = true;
            title = 'Search Hotel Package';
        } else if (type == 'trip') {
            round = true;
            title = 'Set Tour';
        }
        //End Set Variabel Search

        this.state = {
            //item:item,
            title: title,
            product: product,
            productPart: productPart,

            login: true,
            loading: false,


            //Start Parameter Search-----------------------//
            //parameter flight//
            type: type,

            bandaraAsalCode: 'CGK',
            bandaraAsalLabel: 'Soekarno Hatta',
            bandaraTujuanCode: 'DPS',
            bandaraTujuanLabel: 'Denpasar',
            bandaraAsalIdCountry: '193',

            kelas: 'Economy Class',
            kelasId: 'E',

            listdata_kelas: [{
                value: "E",
                text: "Economy Class"
            },
            {
                value: "S",
                text: "Premium Economy"
            },
            {
                value: "B",
                text: "Business Class"
            },
            {
                value: "F",
                text: "First Class"
            }],

            //parameter hotel
            cityId: '5171',
            cityText: 'Denpasar',
            cityProvince: 'Bali',
            qty: 1,

            round: round,
            dewasa: "1",
            anak: "0",
            bayi: "0",
            tglAwal: tglAwal,
            tglAkhir: tglAkhir,
            //End Parameter Search-----------------------//

        };


        //Start Function Bind Search-----------------------//
        this.setBandaraAsal = this.setBandaraAsal.bind(this);
        this.setBandaraTujuan = this.setBandaraTujuan.bind(this);
        this.setKelasPesawat = this.setKelasPesawat.bind(this);
        this.setTglAwal = this.setTglAwal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setJumlahDewasa = this.setJumlahDewasa.bind(this);
        this.setJumlahAnak = this.setJumlahAnak.bind(this);
        this.setJumlahBayi = this.setJumlahBayi.bind(this);
        this.setBookingTime = this.setBookingTime.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setqty = this.setqty.bind(this);
        //End Function Bind Search-----------------------//
    }

    //Start Function  Search-----------------------//
    //-----function untuk hotel-----//
    setCity(id, city, province) {
        this.setState({ cityId: id });
        this.setState({ cityText: city });
        this.setState({ cityProvince: province });
    }

    setqty(jml) {
        //console.log(jml);
        this.setState({ qty: jml });
    }
    //-----function untuk hotel-----//


    setBookingTime(tglAwal, tglAkhir, round) {
        if (round == true) {
            this.setState({ tglAwal: tglAwal });
            this.setState({ tglAkhir: tglAkhir });

        } else {
            this.setState({ tglAwal: tglAwal });
            this.setState({ tglAkhir: null });
        }
    }

    getDate(num) {
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;

    }
    onSetFlightType(round) {
        this.setState({
            round: round
        });
    }

    convertDate(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    onSelectFlight(type) {
        const { navigation } = this.props;
        const { from, to } = this.state;
        switch (type) {
            case "to":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraTujuanCode,
                    setBandaraTujuan: this.setBandaraTujuan,
                    type: type
                });
                break;
            case "from":
                navigation.navigate("SelectFlight", {
                    selected: this.state.bandaraAsalCode,
                    setBandaraAsal: this.setBandaraAsal,
                    type: type
                });
                break;
            default:
                break;
        }
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

    setDateLocal(date) {
        if (date != "") {
            var date = new Date(date);
            var tempoMonth = (date.getMonth() + 1);
            var tempoDate = (date.getDate());
            return finaldate = tempoDate + '/' + tempoMonth + '/' + date.getFullYear();
        } else {
            return "Set Tanggal"
        }
    };


    onSubmit() {
        const { type, product, productPart } = this.state;
        var tgl_akhir = '';
        if (this.state.round == true) {
            tgl_akhir = this.state.tglAkhir;
        }


        var param = {
            DepartureDate: this.state.tglAwal,
            ReturnDate: tgl_akhir,
            Adults: this.state.dewasa,
            Children: this.state.anak,
            Infants: this.state.bayi,
        }

        var link = '';

        if (type == 'flight') {
            link = 'FlightResult';
            param.Origin = this.state.bandaraAsalCode;
            param.Destination = this.state.bandaraTujuanCode;
            param.IsReturn = this.state.round;
            param.CabinClass = [this.state.kelasId];
            param.CorporateCode = "";
            param.Subclasses = false;
            param.Airlines = [];
            param.type = 'flight';
            param.bandaraAsalLabel = this.state.bandaraAsalLabel;
            param.bandaraTujuanLabel = this.state.bandaraTujuanLabel;
            param.Qty = parseInt(param.Adults) + parseInt(param.Children) + parseInt(param.Infants);
            param.participant = true;

            //console.log('typeFlight',JSON.stringify(param));

            this.props.navigation.navigate(link,
                {
                    param: param,
                });

        } else if (type == 'hotelpackage') {
            link = 'Summary';
            param.type = 'hotelpackage';
            param.cityId = this.state.cityId;
            param.cityText = this.state.cityText;
            param.cityProvince = this.state.cityProvince;
            param.Qty = this.state.qty;
            param.totalPrice = parseInt(this.state.qty) * parseInt(productPart.price);
            param.participant = true;

            //console.log('paramHotel',JSON.stringify(param));
            //console.log('productHotel',JSON.stringify(product));
            //console.log('productPartHotel',JSON.stringify(productPart));


            this.props.navigation.navigate(link,
                {
                    param: param,
                    product: product,
                    productPart: productPart
                });
        } else if (type == 'trip') {
            link = 'Summary';
            param.type = 'trip';
            param.cityId = this.state.cityId;
            param.cityText = this.state.cityText;
            param.cityProvince = this.state.cityProvince;
            param.Qty = this.state.qty;
            param.participant = true;

            this.props.navigation.navigate(link,
                {
                    param: param, product: product
                });
        }
    }

    setBandaraAsal(code = '', label = '', id_country = '') {
        this.setState({ bandaraAsalCode: code });
        this.setState({ bandaraAsalLabel: label });
        this.setState({ bandaraAsalIdCountry: id_country });

    }

    setBandaraTujuan(code = '', label = '') {
        this.setState({ bandaraTujuanCode: code });
        this.setState({ bandaraTujuanLabel: label });
    }


    setJumlahDewasa(jml) {
        this.setState({ dewasa: jml });
    }

    setJumlahAnak(jml) {
        this.setState({ anak: jml });
    }

    setJumlahBayi(jml) {
        this.setState({ bayi: jml });
    }


    setKelasPesawat(kelas, kelasId) {
        this.setState({ kelas: kelas });
        this.setState({ kelasId: kelasId });
    }

    setTglAwal(tgl) {
        this.setState({ tglAwal: tgl });
    }

    setTglAkhir(tgl) {
        this.setState({ tglAkhir: tgl });
    }

    renderContentSearch() {
        var type = this.state.type;
        var content = <View></View>
        if (type == "flight") {
            content = this.renderContentSearchFlight();
        } else if (type == "hotelpackage") {
            content = this.renderContentSearchHotel();
        } else if (type == "trip") {
            content = this.renderContentSearchTour();
        }
        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );
    }

    renderContentSearchFlight() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;
        var content = <View>
            <View style={styles.flightType}>
                <Tag
                    outline={!round}
                    primary={round}
                    round
                    onPress={() => this.onSetFlightType(true)}
                    style={{ marginRight: 20 }}
                >
                    Round Trip
                </Tag>
                <Tag
                    outline={round}
                    primary={!round}
                    round
                    onPress={() => this.onSetFlightType(false)}
                >
                    One Way
                </Tag>
            </View>
            <FlightPlan
                round={round}
                fromCode={this.state.bandaraAsalCode}
                toCode={this.state.bandaraTujuanCode}
                from={this.state.bandaraAsalLabel}
                to={this.state.bandaraTujuanLabel}
                style={{ marginTop: 20 }}
                onPressFrom={() => this.onSelectFlight("from")}
                onPressTo={() => this.onSelectFlight("to")}
            />

            <View>
                <SetDateLong
                    labelTglAwal={'asd'}
                    labelTglAkhir={'asdds'}
                    setBookingTime={this.setBookingTime}
                    tglAwal={this.state.tglAwal}
                    tglAkhir={this.state.tglAkhir}
                    round={this.state.round}
                    type={'flight'}
                />
            </View>

            <FormOption
                style={{ marginTop: 20 }}
                label={'Seat Class'}
                option={this.state.listdata_kelas}
                optionSet={this.setKelasPesawat}
                optionSelectText={this.state.kelas}
                optionSelectValue={this.state.kelasId}
            />
            <View style={{ marginTop: 20, flexDirection: "row" }}>
                <QuantityPicker
                    label="Adults"
                    detail=">= 12 years"
                    value={this.state.dewasa}
                    setJumlahDewasa={this.setJumlahDewasa}
                    typeOld="1"
                />


                <QuantityPicker
                    label="Children"
                    detail="2 - 12 years"
                    value={this.state.anak}
                    style={{ marginHorizontal: 15 }}
                    setJumlahAnak={this.setJumlahAnak}
                    typeOld="2"
                />
                <QuantityPicker
                    label="Infants"
                    detail="<= 2 years"
                    value={this.state.bayi}
                    setJumlahBayi={this.setJumlahBayi}
                    typeOld="3"
                />
            </View>
        </View>

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );

    }


    renderContentSearchHotel() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;
        var content = <View>

            {
                this.state.round ?
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption2 light style={{ marginBottom: 5 }}>
                                    Check In
                                                        </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAwal)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption2 light style={{ marginBottom: 5 }}>
                                    Check Out
                                                        </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAkhir)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View tyle={{ marginTop: 20, flexDirection: "row" }}>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption light style={{ marginBottom: 5 }}>
                                    Check In
                                                        </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAwal)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{}} >
                            </TouchableOpacity>
                        </View>
                    </View>
            }



            <View style={{ marginTop: 20 }}>



                <QuantityPickerHorizontal
                    label="Rooms"
                    detail="3 tamu/room"
                    value={this.state.qty}
                    setJumlahBayi={this.setqty}
                    typeOld="3"
                />

                <QuantityPickerHorizontal
                    label="Adults"
                    detail=">= 12 years"
                    value={this.state.dewasa}
                    setJumlahDewasa={this.setJumlahDewasa}
                    typeOld="1"
                />


                <QuantityPickerHorizontal
                    label="Children"
                    detail="2 - 12 years"
                    value={this.state.anak}
                    setJumlahAnak={this.setJumlahAnak}
                    typeOld="2"
                />




            </View>
        </View>

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );

    }





    renderContentSearchTour() {
        const { round, from, to, loading, login } = this.state;
        const { navigation } = this.props;
        var content = <View>



            {
                this.state.round ?
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption2 light style={{ marginBottom: 5 }}>
                                    Check In
                                    </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAwal)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption2 light style={{ marginBottom: 5 }}>
                                    Check Out
                                    </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAkhir)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View tyle={{ marginTop: 20, flexDirection: "row" }}>
                        <View style={styles.contentPickDate}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DatePickerRange', { setBookingTime: this.setBookingTime, round: this.state.round })}
                            >
                                <Text caption light style={{ marginBottom: 5 }}>
                                    Check In
                                    </Text>
                                <Text caption1 semibold>
                                    {this.convertDate(this.state.tglAwal)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{}} >
                            </TouchableOpacity>
                        </View>
                    </View>
            }

            <View style={{ marginTop: 20, flexDirection: "row" }}>
                <QuantityPickerHorizontal
                    label="Adults"
                    detail=">= 12 years"
                    value={this.state.dewasa}
                    setJumlahDewasa={this.setJumlahDewasa}
                    typeOld="1"
                />


                <QuantityPickerHorizontal
                    label="Children"
                    detail="2 - 12 years"
                    value={this.state.anak}
                    style={{ marginHorizontal: 15 }}
                    setJumlahAnak={this.setJumlahAnak}
                    typeOld="2"
                />
                <QuantityPickerHorizontal
                    label="Infants"
                    detail="<= 2 years"
                    value={this.state.bayi}
                    setJumlahBayi={this.setJumlahBayi}
                    typeOld="3"
                />
            </View>
        </View>

        return (
            <View style={{ flex: 1 }}>
                {content}
            </View>
        );

    }

    //End Function Search-----------------------//








    componentDidMount() {
        AsyncStorage.getItem('userSession', (error, result) => {
            if (result) {
                this.setState({ login: true });
            } else {
                this.setState({ login: false });

            }
        });

    }

    render() {
        const { round, from, to, loading, login, type } = this.state;
        const { navigation } = this.props;


        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <StatusBar
                    backgroundColor={BaseColor.primaryColor}
                />
                <Header
                    title={this.state.title}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                {
                    login ?
                        <ScrollView style={styles.contain}>

                            {this.renderContentSearch()}
                            <Button
                                full
                                loading={loading}
                                onPress={() => {
                                    this.onSubmit();

                                }}
                            >
                                Search
                    </Button>
                        </ScrollView>

                        :
                        <NotYetLogin redirect={'Home'} param={this.state.type} navigation={navigation} />

                }

            </SafeAreaView>
        );
    }
}
