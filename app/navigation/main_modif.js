import React from "react";
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon } from "@components";
import * as Utils from "@utils";
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Bottom Screen */
import Home from "./../screens/Home";
import Booking from "./../screens/Booking";
import BookingDetail from "./../screens/BookingDetail";
import Notification from "./../screens/Notification";
import Review from "./../screens/Review";
import Favorite from "./../screens/Favorite";
import Profile1 from "./../screens/Profile1";
import SelectFlight from "./../screens/SelectFlight";
import SelectCoupon from "./../screens/SelectCoupon";
import FlightSearch from "./../screens/FlightSearch";
import Tour from "./../screens/Tour";
import FlightResult from "./../screens/FlightResult";
import FlightResultVia from "./../screens/FlightResultVia";
import FlightFilter from "./../screens/FlightFilter";
import ProductFilter from "./../screens/ProductFilter";
import Eticket from "./../screens/Eticket";
import Evoucher from "./../screens/Evoucher";
import EvoucherPdf from "./../screens/EvoucherPdf";
import FlightResultArrival from "./../screens/FlightResultArrival";
import FlightResultArrivalVia from "./../screens/FlightResultArrivalVia";
import SummaryVia from "./../screens/SummaryVia";
import SummaryGeneral from "./../screens/SummaryGeneral";
import Summary from "./../screens/Summary";
import Hotel from "./../screens/Hotel";
import Flight from "./../screens/Flight";
import HotelSearchAgain from "./../screens/HotelSearchAgain";
import FlightSearchAgain from "./../screens/FlightSearchAgain";
import HotelByFilter from "./../screens/HotelByFilter";
import HotelLinx from "./../screens/HotelLinx";
import HotelLinxFilter from "./../screens/HotelLinxFilter";
import HotelLinxGuest from "./../screens/HotelLinxGuest";
import HotelSearch from "./../screens/HotelSearch";
import HotelCity from "./../screens/HotelCity";
import SelectHotel from "./../screens/SelectHotel";
import SelectHotelLinx from "./../screens/SelectHotelLinx";
import SelectHotelLinxHome from "./../screens/SelectHotelLinxHome";
import ProductDetail from "./../screens/ProductDetail";
import PromoDetail from "./../screens/PromoDetail";
import VendorDetail from "./../screens/VendorDetail";
import ProductList from "./../screens/ProductList";
import ProductDetailNew from "./../screens/ProductDetailNew";
import TourDetailCustom from "./../screens/TourDetailCustom";
import Activities from "./../screens/Activities";
import FlightTicket from "./../screens/FlightTicket";
import Pembayaran from "./../screens/Pembayaran";
import PembayaranDetail from "./../screens/PembayaranDetail";
import WebViewPage from "./../screens/WebViewPage";
import Blog from "./../screens/Blog";
import ProfileSmart from "./../screens/ProfileSmart";
import ProfileEditPassword from "./../screens/ProfileEditPassword";
import DetailContact from "./../screens/DetailContact";
import SignUp from "./../screens/SignUp";
import SelectTitle from "./../screens/SelectTitle";
import SelectPhoneCode from "./../screens/SelectPhoneCode";
import SelectCountry from "./../screens/SelectCountry";


// /* Modal Screen only affect iOS */
import FlightDetail from "./../screens/FlightDetail";
import FlightDetailVia from "./../screens/FlightDetailVia";
import PreviewImage from "./../screens/PreviewImage";
import SignIn from "./../screens/SignIn";
import Verify from "./../screens/Verify";
import ForgotPassword from "./../screens/ForgotPassword";
import ProfileEdit from "./../screens/ProfileEdit";
import PreviewBooking from "./../screens/PreviewBooking";
import EventDetail from "./../screens/EventDetail";



//----------------------new version----------------//
import HomeV2 from "./../screens/HomeV2";
import HomeNew from "./../screens/_newversion/HomeNew";

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();


export default function Main() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="BottomTabNavigator">
            <MainStack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
            />
            <MainStack.Screen name="SelectFlight" component={SelectFlight} />
            <MainStack.Screen name="SelectCoupon" component={SelectCoupon} />
            <MainStack.Screen name="FlightSearch" component={FlightSearch} />
            <MainStack.Screen name="HomeV2" component={HomeV2} />
            <MainStack.Screen name="HomeNew" component={HomeNew} />
            <MainStack.Screen name="Tour" component={Tour} />
            <MainStack.Screen name="FlightResult" component={FlightResult} />
            <MainStack.Screen name="FlightResultVia" component={FlightResultVia} />
            <MainStack.Screen name="FlightResultArrival" component={FlightResultArrival} />
            <MainStack.Screen name="FlightResultArrivalVia" component={FlightResultArrivalVia} />
            <MainStack.Screen name="Summary" component={Summary} />
            <MainStack.Screen name="SummaryVia" component={SummaryVia} />
            <MainStack.Screen name="SummaryGeneral" component={SummaryGeneral} />
            <MainStack.Screen name="SummaryGeneral" component={SummaryGeneral} />
            <MainStack.Screen name="Hotel" component={Hotel} />
            <MainStack.Screen name="Flight" component={Flight} />
            <MainStack.Screen name="HotelSearchAgain" component={HotelSearchAgain} />
            <MainStack.Screen name="FlightSearchAgain" component={FlightSearchAgain} />
            <MainStack.Screen name="HotelByFilter" component={HotelByFilter} />
            <MainStack.Screen name="HotelLinx" component={HotelLinx} />
            <MainStack.Screen name="HotelLinxFilter" component={HotelLinxFilter} />
            <MainStack.Screen name="HotelSearch" component={HotelSearch} />
            <MainStack.Screen name="HotelCity" component={HotelCity} />
            <MainStack.Screen name="SelectHotel" component={SelectHotel} />
            <MainStack.Screen name="SelectTitle" component={SelectTitle} />
            <MainStack.Screen name="SelectPhoneCode" component={SelectPhoneCode} />
            <MainStack.Screen name="SelectCountry" component={SelectCountry} />
            <MainStack.Screen name="SelectHotelLinx" component={SelectHotelLinx} />
            <MainStack.Screen name="SelectHotelLinxHome" component={SelectHotelLinxHome} />
            <MainStack.Screen name="ProductDetail" component={ProductDetail} />
            <MainStack.Screen name="PromoDetail" component={PromoDetail} />
            <MainStack.Screen name="VendorDetail" component={VendorDetail} />
            <MainStack.Screen name="ProductList" component={ProductList} />
            <MainStack.Screen name="ProductDetailNew" component={ProductDetailNew} />
            <MainStack.Screen name="TourDetailCustom" component={TourDetailCustom} />
            <MainStack.Screen name="Activities" component={Activities} />
            <MainStack.Screen name="FlightTicket" component={FlightTicket} />
            <MainStack.Screen name="Pembayaran" component={Pembayaran} />
            <MainStack.Screen name="PembayaranDetail" component={PembayaranDetail} />
            <MainStack.Screen name="WebViewPage" component={WebViewPage} />
            <MainStack.Screen name="Blog" component={Blog} />
            <MainStack.Screen name="ProfileSmart" component={ProfileSmart} />
            <MainStack.Screen name="ProfileEditPassword" component={ProfileEditPassword} />
            <MainStack.Screen name="DetailContact" component={DetailContact} />
            <MainStack.Screen name="Review" component={Review} />
            <MainStack.Screen name="Favorite" component={Favorite} />
            <MainStack.Screen name="SignIn" component={SignIn} />
            <MainStack.Screen name="Verify" component={Verify} />
            <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
            <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
            <MainStack.Screen name="PreviewBooking" component={PreviewBooking} />
            <MainStack.Screen name="EventDetail" component={EventDetail} />

        </MainStack.Navigator>
    );
}

function BottomTabNavigator() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const font = useFont();
    const auth = useSelector(state => state.auth);
    const login = auth.login.success;
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                inactiveTintColor: BaseColor.grayColor,
                tabBarShowLabel: true,
                tabBarShowIcon: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: font,
                },
                tabBarStyle: { borderTopWidth: 1 },
            }}>
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => {
                        return <Icon color={tintColor} name="home-outline" size={20} solid />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Booking"
                component={Booking}
                options={{
                    title: 'Booking',
                    tabBarIcon: ({ color }) => {
                        return <Icon color={tintColor} name="briefcase-outline" size={20} solid />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Notification"
                component={Notification}
                options={{
                    title: "Notification",
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            solid
                            color={tintColor}
                            name="notifications-outline"
                            size={25}
                            solid
                        />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Profile1"
                component={Profile1}
                options={{
                    title: "Account",
                    tabBarIcon: ({ color }) => {
                        return (
                            <Icon
                                solid
                                color={tintColor}
                                name="person-outline"
                                size={20}
                            />
                        );
                    },
                }}
            />

        </BottomTab.Navigator>
    );
}



// const handleCustomTransition = ({ scenes }) => {
//     const nextScene = scenes[scenes.length - 1].route.routeName;
//     switch (nextScene) {
//         case "PreviewImage":
//             Utils.enableExperimental();
//             return Utils.zoomIn();
//         default:
//             return false;
//     }
// };

// const bottomTabNavigatorConfig = {
//     initialRouteName: "Home",
//     tabBarOptions: {
//         showIcon: true,
//         showLabel: true,
//         activeTintColor: BaseColor.primaryColor,
//         inactiveTintColor: BaseColor.grayColor,
//         //style: BaseStyle.tabBar,
//         style: {
//             borderTopLeftRadius: 40,
//             borderTopRightRadius: 40,
//             marginTop: -40,
//             paddintTop: 60

//         },
//         labelStyle: {
//             fontSize: 12
//         }
//     }
// };

// const routeConfigs = {
//     Home: {
//         screen: Home,
//         navigationOptions: ({ navigation }) => ({
//             title: "Home",
//             tabBarIcon: ({ focused, tintColor }) => {
//                 return <Icon color={tintColor} name="home-outline" size={20} solid />;
//             }
//         })
//     },
//     Booking: {
//         screen: Booking,
//         navigationOptions: ({ navigation }) => ({
//             title: "Order",
//             tabBarIcon: ({ focused, tintColor }) => {
//                 return (
//                     <Icon color={tintColor} name="briefcase-outline" size={20} solid />
//                 );
//             }
//         })
//     },
//     Messenger: {
//         screen: Notification,
//         navigationOptions: ({ navigation }) => ({
//             title: "Notification",
//             tabBarIcon: ({ focused, tintColor }) => {
//                 return (
//                     <Icon
//                         solid
//                         color={tintColor}
//                         name="notifications-outline"
//                         size={25}
//                         solid
//                     />
//                 );
//             }
//         })
//     },

//     Profile: {
//         screen: Profile1,
//         navigationOptions: ({ navigation }) => ({
//             title: "Account",
//             tabBarIcon: ({ focused, tintColor }) => {
//                 return (
//                     <Icon
//                         solid
//                         color={tintColor}
//                         name="person-outline"
//                         size={20}
//                     />
//                 );
//             }
//         })
//     }
// };

// const BottomTabNavigator = createBottomTabNavigator(
//     routeConfigs,
//     bottomTabNavigatorConfig
// );

// const StackNavigator = createStackNavigator(
//     {



//         BottomTabNavigator: {
//             screen: BottomTabNavigator
//         },
//         SelectFlight: {
//             screen: SelectFlight
//         },
//         SelectCoupon: {
//             screen: SelectCoupon
//         },
//         FlightSearch: {
//             screen: FlightSearch
//         },
//         HomeV2: {
//             screen: HomeV2
//         },
//         HomeNew: {
//             screen: HomeNew
//         },
//         Tour: {
//             screen: Tour
//         },
//         FlightResult: {
//             screen: FlightResult
//         },
//         FlightResultVia: {
//             screen: FlightResultVia
//         },
//         FlightResultArrival: {
//             screen: FlightResultArrival
//         },
//         FlightResultArrivalVia: {
//             screen: FlightResultArrivalVia
//         },
//         Summary: {
//             screen: Summary
//         },
//         SummaryVia: {
//             screen: SummaryVia
//         },
//         SummaryGeneral: {
//             screen: SummaryGeneral
//         },
//         Hotel: {
//             screen: Hotel
//         },
//         Flight: {
//             screen: Flight
//         },
//         HotelSearchAgain: {
//             screen: HotelSearchAgain
//         },
//         FlightSearchAgain: {
//             screen: FlightSearchAgain
//         },
//         HotelByFilter: {
//             screen: HotelByFilter
//         },
//         HotelLinx: {
//             screen: HotelLinx
//         },
//         HotelLinxFilter: {
//             screen: HotelLinxFilter
//         },

//         HotelSearch: {
//             screen: HotelSearch
//         },
//         HotelCity: {
//             screen: HotelCity
//         },
//         SelectHotel: {
//             screen: SelectHotel
//         },
//         SelectTitle: {
//             screen: SelectTitle
//         },
//         SelectPhoneCode: {
//             screen: SelectPhoneCode
//         },
//         SelectCountry: {
//             screen: SelectCountry
//         },
//         SelectHotelLinx: {
//             screen: SelectHotelLinx
//         },
//         SelectHotelLinxHome: {
//             screen: SelectHotelLinxHome
//         },
//         ProductDetail: {
//             screen: ProductDetail,
//         },
//         PromoDetail: {
//             screen: PromoDetail
//         },
//         VendorDetail: {
//             screen: VendorDetail
//         },
//         ProductList: {
//             screen: ProductList
//         },
//         ProductDetailNew: {
//             screen: ProductDetailNew
//         },
//         TourDetailCustom: {
//             screen: TourDetailCustom
//         },
//         Activities: {
//             screen: Activities
//         },
//         FlightTicket: {
//             screen: FlightTicket
//         },
//         Pembayaran: {
//             screen: Pembayaran,
//             navigationOptions: ({ navigation }) => ({
//                 headerLeft: (<HeaderBackButton onPress={_ => navigation.navigate("Booking")} />)
//             })
//         },
//         PembayaranDetail: {
//             screen: PembayaranDetail
//         },
//         WebViewPage: {
//             screen: WebViewPage
//         },
//         Blog: {
//             screen: Blog
//         },
//         ProfileSmart: {
//             screen: ProfileSmart
//         },
//         ProfileEditPassword: {
//             screen: ProfileEditPassword
//         },
//         DetailContact: {
//             screen: DetailContact
//         },

//         Review: {
//             screen: Review
//         },
//         Favorite: {
//             screen: Favorite
//         },
//         SignIn: {
//             screen: SignIn
//         },
//         Verify: {
//             screen: Verify
//         },
//         ForgotPassword: {
//             screen: ForgotPassword
//         },
//         ProfileEdit: {
//             screen: ProfileEdit
//         },

//         PreviewBooking: {
//             screen: PreviewBooking
//         },

//         EventDetail: {
//             screen: EventDetail
//         },

//     },
//     {
//         headerMode: "none",
//         initialRouteName: "BottomTabNavigator"
//     }
// );

// const RootStack = createStackNavigator(
//     {
//         BookingDetail: {
//             screen: BookingDetail
//         },
//         Eticket: {
//             screen: Eticket
//         },
//         Evoucher: {
//             screen: Evoucher
//         },
//         EvoucherPdf: {
//             screen: EvoucherPdf
//         },
//         FlightFilter: {
//             screen: FlightFilter
//         },
//         ProductFilter: {
//             screen: ProductFilter
//         },
//         HotelLinxGuest: {
//             screen: HotelLinxGuest
//         },
//         FlightDetail: {
//             screen: FlightDetail
//         },
//         FlightDetailVia: {
//             screen: FlightDetailVia
//         },

//         PreviewImage: {
//             screen: PreviewImage
//         },
//         SignUp: {
//             screen: SignUp
//         },

//         StackNavigator: {
//             screen: StackNavigator
//         }
//     },
//     {
//         mode: "modal",
//         headerMode: "none",
//         initialRouteName: "StackNavigator",
//         transitionConfig: screen => {
//             return handleCustomTransition(screen);
//         }
//     }
// );

// export default RootStack;
