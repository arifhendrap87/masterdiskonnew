import React, { Component } from "react";
import { View, FlatList, Switch, ScrollView, TouchableOpacity } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    BookingTime,
    Tag
} from "@components";
import RangeSlider from "rn-range-slider";
import * as Utils from "@utils";
import styles from "./styles";

export default class ProductFilter extends Component {
    constructor(props) {
        super(props);
        var listdata = this.props.navigation.state.params.listdata;
        var productTag = this.props.navigation.state.params.productTag;
        console.log('productTag', JSON.stringify(productTag));
        var productCity = this.props.navigation.state.params.productCity;

        console.log('productCity', JSON.stringify(productCity));
        console.log("----------------listdata asli baru ------------------------------------");
        console.log(JSON.stringify(listdata));


        this.state = {
            round: true,
            scrollEnabled: true,
            priceBegin: 0,
            priceEnd: 10000000,
            durationBegin: 0,
            durationEnd: 18,
            productTag: productTag,
            productCity: productCity,
            facilities: [
                { id: "1", name: "Economy", checked: true },
                { id: "2", name: "Business" },
                { id: "3", name: "First" },
                { id: "4", name: "Normal" }
            ],
            transit: [
                { id: "1", name: "Direct", checked: true },
                { id: "2", name: "1 Transit" },
                { id: "3", name: "2 Transits" },
                { id: "4", name: "+2 Transits" }
            ],
            airline: [
                // { id: "ALL", selected: true, title: "All" },
                { id: "QG", selected: false, title: "Citilink" },
                { id: "SJ", selected: false, title: "Sriwijaya" },
                { id: "GA", selected: false, title: "Garuda Indonesia" },
                { id: "JT", selected: false, title: "Lion Air" },
                { id: "ID", selected: false, title: "Batik Air" },
                { id: "QZ", selected: false, title: "Air Asia" },
            ],
            transits: [
                // { id: "ALL", selected: true, title: "All" },
                { id: 0, selected: false, title: "Direct" },
                { id: 1, selected: false, title: "1 Transit" },
                { id: 2, selected: false, title: "2 Transits" },
                { id: 3, selected: false, title: "+2 Transits" },
            ],
            facilitiess: [
                // { id: "ALL", selected: true, title: "All" },
                { id: "baggage", selected: false, title: "Bagasi" },
                { id: "entertainment", selected: false, title: "Hiburan" },
                { id: "meal", selected: false, title: "Makanan" },
            ],

            departureTime: [
                // { id: "ALL", selected: true, title: "All" },
                { id: 0, selected: false, title: "00:00 - 06:00", time: { min: 0, max: 6 } },
                { id: 1, selected: false, title: "06:00 - 12:00", time: { min: 6, max: 12 } },
                { id: 2, selected: false, title: "12:00 - 18:00", time: { min: 12, max: 18 } },
                { id: 3, selected: false, title: "18:00 - 24:00", time: { min: 18, max: 24 } },
                { id: 4, selected: true, title: "Semua Waktu", time: { min: 0, max: 24 } },
            ],

            arrivalTime: [
                // { id: "ALL", selected: true, title: "All" },
                { id: 0, selected: false, title: "00:00 - 06:00", time: { min: 0, max: 6 } },
                { id: 1, selected: false, title: "06:00 - 12:00", time: { min: 6, max: 12 } },
                { id: 2, selected: false, title: "12:00 - 18:00", time: { min: 12, max: 18 } },
                { id: 3, selected: false, title: "18:00 - 24:00", time: { min: 18, max: 24 } },
                { id: 4, selected: true, title: "Semua Waktu", time: { min: 0, max: 24 } },
            ],

            //listdata:listdata,

            filtersParam: {},
            filterAirline: [],
            filterDepartureTime: [{ min: 0, max: 24 }],
            filterArrivalTime: [{ min: 0, max: 24 }],
            filterTransits: [],
            filterBaggage: "0",
            filterEntertainment: false,
            filterMeal: "1",

            filterproductCity: [],
            filterproductTag: []


        };
    }



    onSelectTransits(selected) {
        this.setState({
            transits: this.state.transits.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });

        setTimeout(() => {
            var filterTransits = [];
            var transits = this.state.transits;
            for (const item of transits) {
                if (item.selected == true) {
                    filterTransits.push(item.id);
                }
            }
            console.log('filterTransits', JSON.stringify(filterTransits));
            this.setState({ filterTransits: filterTransits });
        }, 50);
    }

    onSelectproductTag(selected) {
        this.setState({
            productTag: this.state.productTag.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });

        setTimeout(() => {
            var filterproductTag = [];
            var productTag = this.state.productTag;
            for (const item of productTag) {
                if (item.selected == true) {
                    filterproductTag.push(item.id);
                }
            }
            this.setState({ filterproductTag: filterproductTag });
        }, 50);

    }

    onSelectproductCity(selected) {
        this.setState({
            productCity: this.state.productCity.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });

        setTimeout(() => {
            var filterproductCity = [];
            var productCity = this.state.productCity;
            for (const item of productCity) {
                if (item.selected == true) {
                    filterproductCity.push(item.id);
                }
            }
            this.setState({ filterproductCity: filterproductCity });
        }, 50);

    }

    onSelectAirline(selected) {
        this.setState({
            airline: this.state.airline.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });

        setTimeout(() => {
            var filterAirline = [];
            var airline = this.state.airline;
            for (const item of airline) {
                if (item.selected == true) {
                    filterAirline.push(item.id);
                }
            }
            this.setState({ filterAirline: filterAirline });
        }, 50);

    }

    onSelectDepartureTime(selected) {
        this.setState({
            departureTime: this.state.departureTime.map(item => {

                if (item.id == selected.id) {
                    return {
                        ...item,
                        selected: true
                    };
                } else {
                    return {
                        ...item,
                        selected: false
                    };
                }


            })
        });
        console.log('onSelectDepartureTime', JSON.stringify(selected));

        setTimeout(() => {
            var filterDepartureTime = [];
            var departureTime = this.state.departureTime;
            for (const item of departureTime) {
                if (item.selected == true) {
                    filterDepartureTime.push(item.time);
                }
            }
            this.setState({ filterDepartureTime: filterDepartureTime });
        }, 50);

    }

    onSelectArrivalTime(selected) {
        this.setState({
            arrivalTime: this.state.arrivalTime.map(item => {

                if (item.id == selected.id) {
                    return {
                        ...item,
                        selected: true
                    };
                } else {
                    return {
                        ...item,
                        selected: false
                    };
                }


            })
        });

        setTimeout(() => {
            var filterArrivalTime = [];
            var arrivalTime = this.state.arrivalTime;
            for (const item of arrivalTime) {
                if (item.selected == true) {
                    filterArrivalTime.push(item.time);
                }
            }
            this.setState({ filterArrivalTime: filterArrivalTime });
            console.log('filterArrivalTime', JSON.stringify(filterArrivalTime));
        }, 50);

    }

    onSelectFacilitiess(selected) {
        this.setState({
            facilitiess: this.state.facilitiess.map(item => {
                return {
                    ...item,
                    selected:
                        selected.id == item.id ? !item.selected : item.selected
                };
            })
        });

        setTimeout(() => {
            //console.log('facilitiess',JSON.stringify(this.state.facilitiess));
            var facilitiess = this.state.facilitiess;

            if (facilitiess[0].selected == true) {
                this.setState({ filterBaggage: "1" });
            } else if (facilitiess[0].selected == false) {
                this.setState({ filterBaggage: "2" });
            }

            if (facilitiess[1].selected == true) {
                this.setState({ filterEntertainment: true });
            } else if (facilitiess[1].selected == false) {
                this.setState({ filterEntertainment: false });
            }

            if (facilitiess[2].selected == true) {
                this.setState({ filterMeal: "1" });
            } else if (facilitiess[2].selected == false) {
                this.setState({ filterMeal: "0" });
            }

        }, 50);
    }


    convertArrayTag(arrayTag, title) {
        var str = "";


        for (a = 0; a < arrayTag.length; a++) {
            str += "&" + title + "[]=" + arrayTag[a];
        }

        return str;

    }


    submitFilter() {
        const { navigation } = this.props;
        const { priceBegin, priceEnd, filterproductCity, filterproductTag } = this.state;
        //const {filterAirline,filterTransits,filterEntertainment,filterMeal,filterBaggage,priceBegin,priceEnd,filterDepartureTime,filterArrivalTime}=this.state;

        // const filter = {
        //     //filter_airline_code: filter_airline_code => filterAirline.includes(filter_airline_code.toUpperCase()),
        //     filter_airline_codes: filterAirline,

        //     //filter_transit: filter_transit => filterTransits.includes(filter_transit),
        //     filter_transits: filterTransits,

        //     //filter_entertainment : filter_entertainment =>  filter_entertainment === filterEntertainment,
        //     filter_entertainments : filterEntertainment,

        //     //filter_baggage : filter_baggage =>  filter_baggage != filterBaggage,
        //     filter_baggages : filterBaggage,

        //     //filter_meal : filter_meal =>  filter_meal != filterMeal,
        //     filter_meals : filterMeal,

        //     filter_departure_time: filterDepartureTime,

        //     filter_arrival_time: filterArrivalTime,

        //     filter_prices: [priceBegin,priceEnd]

        //   };
        //   console.log('filter',JSON.stringify(filter));

        //   var filtersParam={}

        //   //var filterAirline=[];
        //   if(filterAirline.length != 0)
        //   {
        //   filtersParam.filter_airline_code=filter_airline_code => filterAirline.includes(filter_airline_code.toUpperCase());
        //   }

        //   //var filterTransits=[];
        //   if(filterTransits.length != 0)
        //   {
        //   filtersParam.filter_transit=filter_transit => filterTransits.includes(filter_transit);
        //   }

        //   //var filterEntertainment=false;
        //   if (filterEntertainment==true){
        //   filtersParam.filter_entertainment=filter_entertainment => filter_entertainment === filterEntertainment;
        //   }

        //   //var filterBaggage="0";
        //   if(filterBaggage != "0"){
        //   filtersParam.filter_baggage=filter_baggage => filter_baggage != filterBaggage;

        //   }

        //   //var filterMeal="1";
        //   if(filterMeal == "0"){
        //   filtersParam.filter_meal=filter_meal => filter_meal != filterMeal;

        //   }

        //   filtersParam.filter_departure_time=filter_departure_time => filter_departure_time <= filterDepartureTime[0].max && filter_departure_time >= filterDepartureTime[0].min;  
        //   filtersParam.filter_arrival_time=filter_arrival_time => filter_arrival_time <= filterArrivalTime[0].max && filter_arrival_time >= filterArrivalTime[0].min;  


        //   filtersParam.filter_price=filter_price => filter_price <= priceEnd && filter_price >= priceBegin;       
        //   const filters = filtersParam;





        //console.log('filterproductCity',JSON.stringify(filterproductCity));

        var strCity = "";
        if (filterproductCity.length != 0) {
            strCity = this.convertArrayTag(filterproductCity, 'id_city');
        }

        var strTag = "";
        if (filterproductTag.length != 0) {
            strTag = this.convertArrayTag(filterproductTag, 'tag');
        }

        var strPrice = '&price_from=' + priceBegin + '&price_to=' + priceEnd;
        var paramOrder = '&order=price&order_type=ASC';
        var params = strPrice + strTag + strCity;
        const filters = {
            paramPrice: strPrice,
            paramCity: strCity,
            paramTag: strTag,
            paramOrder: paramOrder,

        };

        //console.log('params',params);
        // navigation.navigate('ProductList',{
        //     title:title,
        //     type:'category',

        //     paramPrice:strPrice,
        //     paramCategory:paramCategory,
        //     paramCity:strCity,
        //     paramTag:strTag,
        //     paramOrder:'',

        // });
        this.props.navigation.state.params.filterProcess(filters);
        navigation.goBack();

    }

    render() {
        const { navigation } = this.props;
        const {
            round,
            scrollEnabled,
            priceBegin,
            priceEnd,
            durationBegin,
            durationEnd,
            facilities,
            facilitiess,
            transit,
            transits,
            airline,
            departureTime,
            arrivalTime,
            productTag,
            productCity
        } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Filtering"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="chevron-back-outline"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        return (
                            <Text caption1 whiteColor numberOfLines={1}>
                                Apply
                            </Text>

                        );
                    }}
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => this.submitFilter()}
                />
                <ScrollView
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={(contentWidth, contentHeight) =>
                        this.setState({
                            scrollEnabled: Utils.scrollEnabled(
                                contentWidth,
                                contentHeight
                            )
                        })
                    }
                >
                    <View style={styles.contain}>
                        {
                            productTag.length != 0 ?
                                <View>
                                    <View style={styles.roundLine}>
                                        <Text caption1 semibold>
                                            Tag
                                        </Text>
                                    </View>
                                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                                        {productTag.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index.toString()}
                                                    style={styles.lineCategory}
                                                    onPress={() => this.onSelectproductTag(item)}
                                                >
                                                    <Icon
                                                        name={
                                                            item.selected
                                                                ? "checkmark-circle-outline"
                                                                : "ellipse-outline"
                                                        }
                                                        size={24}
                                                        color={BaseColor.primaryColor}
                                                    />
                                                    <Text caption1 style={{ marginLeft: 10 }}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                                :
                                <View />
                        }

                        {
                            productCity.length != 0 ?
                                <View>
                                    <View style={styles.roundLine}>
                                        <Text caption1 semibold>
                                            City
                                        </Text>
                                    </View>
                                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                                        {productCity.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index.toString()}
                                                    style={styles.lineCategory}
                                                    onPress={() => this.onSelectproductCity(item)}
                                                >
                                                    <Icon
                                                        name={
                                                            item.selected
                                                                ? "checkmark-circle-outline"
                                                                : "ellipse-outline"
                                                        }
                                                        size={24}
                                                        color={BaseColor.primaryColor}
                                                    />
                                                    <Text caption1 style={{ marginLeft: 10 }}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                                :
                                <View />
                        }

                        {/* <View style={styles.roundLine}>
                            <Text caption1 semibold>
                                Maskapai
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {airline.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectAirline(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text caption1 style={{ marginLeft: 10 }}>
                                        {item.title} ({item.id})
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View> */}


                        {/* <View style={styles.roundLine}>
                            <Text caption1 semibold>
                            Transit
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {transits.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectTransits(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text caption1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>

                        <View style={styles.roundLine}>
                            <Text caption1 semibold>
                            Fasilitas
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {facilitiess.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectFacilitiess(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text caption1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View> */}


                        {/* <View style={styles.roundLine}>
                            <Text caption1 semibold>
                            Jam Berangkat
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {departureTime.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectDepartureTime(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text caption1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>


                        <View style={styles.roundLine}>
                            <Text caption1 semibold>
                            Jam Kedatangan
                            </Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                        {arrivalTime.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index.toString()}
                                    style={styles.lineCategory}
                                    onPress={() => this.onSelectArrivalTime(item)}
                                >
                                    <Icon
                                        name={
                                            item.selected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={24}
                                        color={BaseColor.primaryColor}
                                    />
                                    <Text caption1 style={{ marginLeft: 10 }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View> */}




                        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                            <Text caption1 semibold>
                                BUDGET
                            </Text>
                            <View style={styles.contentRange}>
                                <Text caption1 grayColor>
                                    Rp 100.000
                                </Text>
                                <Text caption1 grayColor>
                                    Rp 10.000.000
                                </Text>
                            </View>
                            <RangeSlider
                                style={{
                                    width: "100%",
                                    height: 40
                                }}
                                thumbRadius={12}
                                lineWidth={5}
                                gravity={"center"}
                                labelStyle="none"
                                min={100000}
                                max={10000000}
                                step={1}
                                selectionColor={BaseColor.primaryColor}
                                blankColor={BaseColor.textSecondaryColor}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({
                                        priceBegin: low,
                                        priceEnd: high
                                    });
                                }}
                                onTouchStart={() => {
                                    this.setState({
                                        scrollEnabled: false
                                    });
                                }}
                                onTouchEnd={() => {
                                    this.setState({
                                        scrollEnabled: true
                                    });
                                }}
                            />
                            <View style={styles.contentResultRange}>
                                <Text caption1>Range Price</Text>
                                <Text caption1>
                                    IDR {priceSplitter(priceBegin)} - IDR {priceSplitter(priceEnd)}
                                </Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
