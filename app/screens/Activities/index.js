import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort, Text } from "@components";
//import styles from "./styles";
import * as Utils from "@utils";
import { AsyncStorage } from 'react-native';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;


// Load sample data
import { DataLoading, DataConfig, DataActivities, DataTrip } from "@data";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import DataEmpty from "../../components/DataEmpty";

export default class Hotel extends Component {
    constructor(props) {
        super(props);

        var id_country = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.id_country) {
            id_country = this.props.navigation.state.params.id_country;
        } else {
            id_country = '';
        }

        var id_city = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.id_city) {
            id_city = this.props.navigation.state.params.id_city;
        } else {
            id_city = '';
        }

        var id_category = '';
        if (this.props.navigation.state.params && this.props.navigation.state.params.id_category) {
            id_category = this.props.navigation.state.params.id_category;
        } else {
            id_category = '';
        }







        this.state = {
            id_country: id_country,
            id_city: id_city,
            id_category: id_category,
            listdata_product_activities: DataActivities,
            config: DataConfig,
        };
        this.getConfig();

    }

    getConfig() {
        AsyncStorage.getItem('config', (error, result) => {
            if (result) {
                let config = JSON.parse(result);
                ////console.log('getConfig',config);
                this.setState({ config: config });
            }
        });
    }


    getProductActivities() {
        const { config } = this.state;

        this.setState({ loading_product_activities: true }, () => {
            var url = config.baseUrlx;
            var path = config.product_activities.dir;
            var paramUrl = {
                "param": {
                    "id_country": this.state.id_country,
                    "id_city": this.state.id_city,
                    "id_activities": "",
                    "activities_category_id": this.state.id_category,
                    "search": "",
                    "limit": ""
                }
            }


            console.log(url, path, paramUrl);
            var param = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paramUrl),
            }


            fetch(url + path, param)
                .then(response => response.json())
                .then(result => {
                    this.setState({ loading_product_activities: false });
                    this.setState({ listdata_product_activities: result });
                })
                .catch(error => { alert('Kegagalan Respon Server') });


        });
    }


    componentDidMount() {
        setTimeout(() => {
            this.getProductActivities();
        }, 50);
    }

    convertDateDM(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return d.getDate() + " " + months[d.getMonth()];
    }

    renderContent() {
        const { config } = this.state;
        const { navigation } = this.props;

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        return (
            <View style={{ marginTop: 10 }}>

                {
                    this.state.listdata_product_activities.length != 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                numColumns={2}
                                columnWrapperStyle={{
                                    flex: 1,
                                    justifyContent: 'space-evenly',
                                    marginBottom: 10
                                }}
                                style={{ marginHorizontal: 20 }}
                                //horizontal={false}
                                data={this.state.listdata_product_activities}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item, index }) => (
                                    <CardCustom
                                        propImage={{ height: wp("30%"), url: item.img_featured_url }}
                                        propInframe={{ top: this.convertDateDM(item.product_time), bottom: item.product_cat }}
                                        propTitle={{ text: item.product_name }}
                                        propDesc={{ text: '' }}
                                        propPrice={{ price: 'Rp ' + priceSplitter(item.product_price), startFrom: true }}
                                        propPriceCoret={{ price: priceSplitter(item.product_price_correct), discount: priceSplitter(item.product_discount), discountView: true }}

                                        propStar={{ rating: '', enabled: false }}
                                        propLeftRight={{ left: '', right: '' }}
                                        onPress={() => {
                                            //alert('ActivitiesDetail');
                                            navigation.navigate("ProductDetail", { product: item, product_type: 'activities' })

                                        }
                                        }
                                        loading={this.state.loading_product_activities}
                                        propOther={{ inFrame: true, horizontal: false, width: (width - 50) / 2 }}
                                        propIsCampaign={item.product_is_campaign}
                                        propPoint={item.product_point}

                                        style={[
                                            index % 2 ? { marginLeft: 10 } : {}
                                        ]
                                        }
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


    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.bgColor }]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Activities"
                    // subTitle="24 Dec 2018, 2 Nights, 1 Room"
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
                    //     return (
                    //         <Icon
                    //             name="search"
                    //             size={20}
                    //             color={BaseColor.primaryColor}
                    //         />
                    //     );
                    // }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
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
                    {this.renderContent()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({

});