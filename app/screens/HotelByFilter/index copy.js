import React, { Component } from "react";
import { FlatList, RefreshControl, View, Animated,Text} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, HotelItem, FilterSort,Image } from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { Images } from "@config";

// Load sample data
import { HotelData,DataMasterDiskon } from "@data";
import {PostDataProduct} from '../../services/PostDataProduct';

export default class Hotel extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);
        //var paramUrl=this.props.navigation.state.params.paramUrl;
        //var paramOther=this.props.navigation.state.params.paramOther;
        var param=this.props.navigation.state.params.param;
        //console.log('PARAM hotel',JSON.stringify(param));
        //var city=this.props.navigation.state.params.city;
        // Temp data define
        this.state = {
            refreshing: false,
            loading: false,
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
            modeView: "list",
            hotels: HotelData,
            // paramUrl:paramUrl,
            // city:city,
            param:param,
            //paramOther:paramOther,
            DataMasterDiskon:DataMasterDiskon[0],
        };

        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
    }
    
    
    getHotel(){
        var param=this.state.param;
        //var paramUrl=this.state.paramUrl;
        //var city=this.state.city;
        var paramUrl='checkin='+param.DepartureDate+'&checkout='+param.ReturnDate+'&adults='+param.Adults+'&children='+param.Children+'&room='+param.Qty;
        param.paramUrl=paramUrl;
        this.setState({param:param});
        this.setState({ loading_spinner: true }, () => {
            PostDataProduct('hotel/search_app?city='+param.cityId+'&'+paramUrl)
            .then((result) => {
                    this.setState({ loading_spinner: false });
                  
                    var hotels=result.result;
                   
                    //console.log('hotellsx',JSON.stringify(hotels));
                    this.setState({hotels:hotels});
                   
        
                },
                (error) => {
                    this.setState({ error });
                }
            );
            


        });
    }
    componentDidMount(){
        this.getHotel();
    }
    onSelect(item){
        const{param}=this.state;
        
        param.slug=item.slug_hotel;
        
        this.props.navigation.navigate(
            "ProductDetail",{
            param:param,
            product:item
            }
        );
    }
    
    
    onChangeSort() {}

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("Filter");
    }

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeView() {
        let { modeView } = this.state;
        Utils.enableExperimental();
        switch (modeView) {
            case "block":
                this.setState({
                    modeView: "grid"
                });
                break;
            case "grid":
                this.setState({
                    modeView: "list"
                });
                break;
            case "list":
                this.setState({
                    modeView: "block"
                });
                break;
            default:
                this.setState({
                    modeView: "block"
                });
                break;
        }
    }

    /**
     * @description Render container view
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderContent() {
        const { modeView, hotels, refreshing, clampedScroll } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        switch (modeView) {
            case "block":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={hotels}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                
                                <HotelItem
                                    block
                                    image={item.image}
                                    name={item.name_hotel}
                                    location={item.location}
                                    price={item.price}
                                    available={item.available}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    services={item.services}
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() =>
                                        navigation.navigate("ProductDetail")
                                    }
                                    onPressTag={() =>
                                        navigation.navigate("Review")
                                    }
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            case "grid":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            columnWrapperStyle={{
                                marginHorizontal: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            numColumns={2}
                            data={hotels}
                            key={"grid"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <HotelItem
                                    grid
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    available={item.available}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    services={item.services}
                                    onPress={() =>
                                        navigation.navigate("ProductDetail")
                                    }
                                    style={{
                                        marginBottom: 10,
                                        marginLeft: index % 2 ? 15 : 0
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            case "list":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={hotels}
                            key={"list"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <HotelItem
                                    list
                                    image={item.img_featured}
                                    url={this.state.DataMasterDiskon.site+'assets/upload/product/hotel/img/featured/'}
                                    name={item.name_hotel}
                                    location={item.city_name}
                                    price={'Rp '+priceSplitter(item.price_from)}
                                    available={'Inclusive of Taxes'}
                                    rate={item.stars}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    services={item.services}
                                    rateCount={item.rating+'of 100'}
                                    style={{
                                        marginHorizontal: 20,
                                        marginBottom: 20
                                    }}
                                    onPress={() => {
                                        this.onSelect(item);
                                        
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                paddingTop: 50,
                                paddingBottom: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={hotels}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <HotelItem
                                    block
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    available={item.available}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    services={item.services}
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() =>
                                        navigation.navigate("ProductDetail")
                                    }
                                    onPressTag={() =>
                                        navigation.navigate("Preview")
                                    }
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Hotels"
                    //subTitle="24 Dec 2018, 2 Nights, 1 Room"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.primaryColor}
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
{/*               
                <View
                    style={{flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',padding: 20}}
                    >       
                    <Image
                        source={Images.login}
                        style={{ width: "60%", height: "60%" }}
                        resizeMode="cover"
                    />
                    <View><Text>Masih dalam pengembangan</Text></View>

                </View>     */}
                 {this.renderContent()}
            </SafeAreaView>
        );
    }
}
