import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    StarRating,
    PostListItem,
    HelpBlock,
    Button,
    RoomType
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";
// Load sample data
import { HelpBlockData,DataMasterDiskon } from "@data";
import {PostDataProduct} from '../../services/PostDataProduct';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        //var paramUrl=this.props.navigation.state.params.paramUrl;
        var param=this.props.navigation.state.params.param;
        //var paramOther=this.props.navigation.state.params.paramOther;
        //var slug=this.props.navigation.state.params.slug;
        var product=this.props.navigation.state.params.product;
        ////console.log('product',JSON.stringify(product));
        // Temp data define
        this.state = {
            heightHeader: Utils.heightHeader(),
            renderMapView: false,
            region: {
                latitude: 1.9344,
                longitude: 103.358727,
                latitudeDelta: 0.05,
                longitudeDelta: 0.004
            },
            roomType: [
                {
                    id: "1",
                    image: Images.room8,
                    name: "Standard Twin Room",
                    price: "$399,99",
                    available: "Hurry Up! This is your last room!",
                    services: [
                        { icon: "wifi", name: "Free Wifi" },
                        { icon: "shower", name: "Shower" },
                        { icon: "users", name: "Max 3 aduts" },
                        { icon: "subway", name: "Nearby Subway" }
                    ]
                },
                {
                    id: "2",
                    image: Images.room5,
                    name: "Delux Room",
                    price: "$399,99",
                    available: "Hurry Up! This is your last room!",
                    services: [
                        { icon: "wifi", name: "Free Wifi" },
                        { icon: "shower", name: "Shower" },
                        { icon: "users", name: "Max 3 aduts" },
                        { icon: "subway", name: "Nearby Subway" }
                    ]
                }
            ],
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
            ],
            helpBlock: HelpBlockData,
            
            //paramUrl:paramUrl,
            //slug:slug,
            param:param,
            //paramOther:paramOther,
            product:product,
            
            ProductDetail:{},
            hotelRoom:[],
            hotelData:{},
            hotelReview:{
                s_kebersihan: 15,
                c_kebersihan: 2,
                s_kenyamanan: 15,
                c_kenyamanan: 2,
                s_lokasi: 15,
                c_lokasi: 2,
                s_fasilitas: 15,
                c_fasilitas: 2,
                s_staf: 15,
                c_staf: 2,
                s_harga: 15,
                c_harga: 2,
                s_wifi: 15,
                c_wifi: 2
            },
            hotelReviewCustomer:[
                {
                    id_hotel_review: "1",
                    id_hotel: "1",
                    id_user: "9",
                    name: "Ndaru Kurniawan",
                    nationality: "Indonesia",
                    summary: "Solo Traveler,Dipesan dari Mobile,Menginap 1 malam",
                    kebersihan: "7",
                    kenyamanan: "7",
                    lokasi: "7",
                    fasilitas: "7",
                    staf: "7",
                    harga: "7",
                    wifi: "7",
                    title: "mantap",
                    pros: "Kolasi strategis",
                    cons: "Tidak banyak restoran dekat lokasi",
                    date_order: "2020-05-05",
                    date_review: "2020-05-06"
                }],
            DataMasterDiskon:DataMasterDiskon[0],
        };
        this._deltaY = new Animated.Value(0);
    }
    getHotel(){
        var param=this.state.param;
        this.setState({ loading_spinner: true }, () => {
            PostDataProduct('hotel/detail_app/'+param.slug_hotel+'?'+param.paramUrl)
            .then((result) => {
                    this.setState({ loading_spinner: false });
                    var hotelData=result;
                    var ProductDetail=result.hotel;
                    var hotelRoom=result.room;
                    var hotelReview=result.review;
                    var hotelReviewCustomer=result.review_teks;
                    //console.log('hotel',JSON.stringify(ProductDetail));
                    //console.log('room',JSON.stringify(hotelRoom));
                    this.setState({hotelData:hotelData});
                    this.setState({ProductDetail:ProductDetail});
                    this.setState({hotelRoom:hotelRoom});
                    this.setState({hotelReview:hotelReview});
                    this.setState({hotelReviewCustomer:hotelReviewCustomer});
                },
                (error) => {
                    this.setState({ error });
                }
            );
            


        });
    }
    componentDidMount() {
        this.getHotel();
        InteractionManager.runAfterInteractions(() => {
            this.setState({ renderMapView: true });
        });
    }

    render() {
        const { navigation } = this.props;
        const {
            roomType,
            heightHeader,
            helpBlock,
            todo,
            renderMapView
        } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        const marginTopBanner = heightImageBanner - heightHeader - 40;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={{ uri: 'https://masterdiskon.com/assets/upload/product/hotel/img/featured/'+this.state.ProductDetail.img_featured}}
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(200),
                                    Utils.scaleWithPixel(200)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                />
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    {/* Header */}
                    <Header
                        title=""
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
                            return (
                                <Icon
                                    name="images"
                                    size={20}
                                    color={BaseColor.blackColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => {
                            navigation.navigate("PreviewImage");
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
                        {/* Main Container */}
                        <View style={{ paddingHorizontal: 20 }}>
                            {/* Information */}
                            <View
                                style={[
                                    styles.contentBoxTop,
                                    { marginTop: marginTopBanner }
                                ]}
                            >
                                <Text
                                    title2
                                    semibold
                                    style={{ marginBottom: 7 }}
                                >
                                    {this.state.ProductDetail.name_hotel}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    starSize={14}
                                    maxStars={5}
                                    rating={this.state.ProductDetail.stars}
                                    selectedStar={rating => {}}
                                    fullStarColor={BaseColor.yellowColor}
                                />
                                <Text
                                    body2
                                    style={{
                                        marginTop: 7,
                                        textAlign: "center"
                                    }}
                                >
                                    {this.state.ProductDetail.address}
                                </Text>
                            </View>
                            {/* Rating Review */}
                            <View style={styles.blockView}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <View style={styles.circlePoint}>
                                        <Text caption2 whiteColor>
                                            {this.state.ProductDetail.rating}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            title3
                                            primaryColor
                                            style={{ marginBottom: 3 }}
                                        >
                                            Excellent
                                        </Text>
                                        <Text caption2>See 801 reviews</Text>
                                    </View>
                                </View>
                                <View style={styles.contentRateDetail}>
                                    <View
                                        style={[
                                            styles.contentLineRate,
                                            { marginRight: 10 }
                                        ]}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                caption2
                                                grayColor
                                                style={{ marginBottom: 5 }}
                                            >
                                                Kebersihan
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { width: this.state.hotelReview.s_kebersihan+"%" }
                                                ]}
                                            />
                                        </View>
                                        <Text
                                            caption2
                                            style={{ marginLeft: 15 }}
                                        >
                                           {this.state.hotelReview.s_kebersihan}
                                        </Text>
                                    </View>
                                    <View style={styles.contentLineRate}>
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                caption2
                                                grayColor
                                                style={{ marginBottom: 5 }}
                                            >
                                                Kenyamanan
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { width: this.state.hotelReview.s_kenyamanan+"%" }
                                                ]}
                                            />
                                        </View>
                                        <Text
                                            caption2
                                            style={{ marginLeft: 15 }}
                                        >
                                            {this.state.hotelReview.s_kenyamanan}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.contentRateDetail}>
                                    <View
                                        style={[
                                            styles.contentLineRate,
                                            { marginRight: 10 }
                                        ]}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                caption2
                                                grayColor
                                                style={{ marginBottom: 5 }}
                                            >
                                                Lokasi
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { width: this.state.hotelReview.s_lokasi+"%" }
                                                ]}
                                            />
                                        </View>
                                        <Text
                                            caption2
                                            style={{ marginLeft: 15 }}
                                        >
                                            {this.state.hotelReview.s_lokasi}
                                        </Text>
                                    </View>
                                    <View style={styles.contentLineRate}>
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                caption2
                                                grayColor
                                                style={{ marginBottom: 5 }}
                                            >
                                                Fasilitas
                                            </Text>
                                            <View style={styles.lineBaseRate} />
                                            <View
                                                style={[
                                                    styles.linePercent,
                                                    { width: this.state.hotelReview.s_fasilitas+"%" }
                                                ]}
                                            />
                                        </View>
                                        <Text
                                            caption2
                                            style={{ marginLeft: 15 }}
                                        >
                                            {this.state.hotelReview.s_fasilitas}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* Description */}
                            <View style={styles.blockView}>
                                <Text caption1 semibold>
                                    Hotel Description
                                </Text>
                                <Text caption2 style={{ marginTop: 5 }}>
                                    {this.state.ProductDetail.description}
                                </Text>
                            </View>
                            {/* Facilities Icon */}
                            <View style={styles.contentService}>
                                {[
                                    { key: "1", name: "wifi" },
                                    { key: "2", name: "coffee" },
                                    { key: "3", name: "bath" },
                                    { key: "4", name: "car" },
                                    { key: "5", name: "paw" }
                                ].map((item, index) => (
                                    <View
                                        style={{ alignItems: "center" }}
                                        key={"service" + index}
                                    >
                                        <Icon
                                            name={item.name}
                                            size={24}
                                            color={BaseColor.primaryColor}
                                        />
                                        <Text
                                            overline
                                            grayColor
                                            style={{ marginTop: 4 }}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            {/* Map location */}
                            <View style={styles.blockView}>
                                <Text
                                    headline
                                    style={{ marginBottom: 5 }}
                                    semibold
                                >
                                    Location
                                </Text>
                                <Text caption2 numberOfLines={2}>
                                    {this.state.ProductDetail.address}
                                </Text>
                                <View
                                    style={{
                                        height: 180,
                                        width: "100%",
                                        marginTop: 10
                                    }}
                                >
                                    {renderMapView && (
                                        <MapView
                                            provider={PROVIDER_GOOGLE}
                                            style={styles.map}
                                            region={this.state.region}
                                            onRegionChange={() => {}}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: 1.9344,
                                                    longitude: 103.358727
                                                }}
                                            />
                                        </MapView>
                                    )}
                                </View>
                            </View>
                            {/* Open Time */}
                            <View style={styles.blockView}>
                                <Text caption1 semibold>
                                    Good To Know
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 5
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text caption2 grayColor>
                                            Check in from
                                        </Text>
                                        <Text caption2 accentColor semibold style={{color:BaseColor.primaryColor}}>
                                            {this.state.ProductDetail.checkIn}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Text caption2 grayColor>
                                            Check in from
                                        </Text>
                                        <Text caption2 accentColor semibold style={{color:BaseColor.primaryColor}}>
                                            {this.state.ProductDetail.checkOut}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* Rooms */}
                            <View style={styles.blockView}>
                                <Text caption1 semibold>
                                    Room Type
                                </Text>
                                <FlatList
                                    data={this.state.hotelRoom}
                                    keyExtractor={(item, index) => item.id_hotel_room}
                                    renderItem={({ item }) => (
                                        <RoomType
                                            image={'dd32d9b188d86d6d8dc40d1ff9a0ebf6.jpg'}
                                            url={this.state.DataMasterDiskon.site+'assets/upload/product/hotel/img/featured/'}
                                            name={item.room_type}
                                            price={'Rp '+priceSplitter(item.price)}
                                            available={item.available}
                                            services={item.services}
                                            amenities={item.amenities}
                                            style={{ marginTop: 10 }}
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    "HotelInformation"
                                                );
                                            }}
                                            buttonBookNow={false}
                                            onPressBookNow={() => {
                                                this.props.navigation.navigate(
                                                    "HotelRoom"
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </View>
                            
                            {/* Todo Things */}
                            <View style={styles.blockView}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Text caption1 semibold>
                                        Review
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Post");
                                        }}
                                    >
                                        <Text caption1 grayColor>
                                            Show More
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.hotelReviewCustomer}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item }) => (
                                        <PostListItem
                                            style={{ marginRight: 20 }}
                                            title={item.name}
                                            date={item.date_review}
                                            description={item.summary}
                                            image={item.image}
                                            pros={item.pros}
                                            cons={item.cons}
                                            onPress={() => {
                                                navigation.navigate(
                                                    "PostDetail"
                                                );
                                            }}
                                        />
                                    )}
                                />
                            </View>
                            {/* Help Block Information */}
                            {/* <View style={styles.blockView}>
                                <HelpBlock
                                    title={helpBlock.title}
                                    description={helpBlock.description}
                                    phone={helpBlock.phone}
                                    email={helpBlock.email}
                                    style={{ margin: 20 }}
                                    onPress={() => {
                                        navigation.navigate("ContactUs");
                                    }}
                                />
                            </View> */}
                            {/* Other Information */}
                            {/* <View style={{ paddingVertical: 10 }}>
                                <Text caption1 semibold>
                                    4 Reason To Choose Us
                                </Text>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="map-marker-alt"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Good Location
                                        </Text>
                                        <Text caption2>
                                            Lorem ipsum dolor sit amet, nec et
                                            suas augue diceret, cu cum malis
                                            veniam democritum. Eu liber vocibus
                                            his, qui id cetero
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="pagelines"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Great Food
                                        </Text>
                                        <Text caption2>
                                            Excellent cuisine, typical dishes
                                            from the best Romagna tradition and
                                            more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="servicestack"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            Private Beach
                                        </Text>
                                        <Text caption2>
                                            Excellent cuisine, typical dishes
                                            from the best Romagna tradition and
                                            more!
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemReason}>
                                    <Icon
                                        name="trophy"
                                        size={18}
                                        color={BaseColor.accentColor}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text subhead semibold>
                                            5 Stars Hospitality
                                        </Text>
                                        <Text caption2>
                                            Romagna hospitality, typical and
                                            much
                                        </Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>
                    </ScrollView>
                    {/* Pricing & Booking Process */}
                    <View style={styles.contentButtonBottom}>
                        <View>
                            <Text caption1 semibold>
                                Price from
                            </Text>
                            <Text caption2 primaryColor semibold>
                                Rp {priceSplitter(this.state.ProductDetail.price_from)}
                            </Text>
                            <Text caption1 semibold style={{ marginTop: 5 }}>
                                kamar/Night
                            </Text>
                        </View>
                        <Button
                            style={{ height: 46 }}
                            onPress={() =>
                                {
                                navigation.navigate("HotelRoom",
                                    {
                                        hotelData:this.state.hotelData,
                                        param:this.state.param,
                                        product:this.state.product,
                                    }
                                )}
                            }
                        >
                            Pilih Kamar
                        </Button>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
