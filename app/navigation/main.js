import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { BaseColor, BaseStyle } from "@config";
import { Icon } from "@components";
import * as Utils from "@utils";
import { useSelector, useDispatch } from 'react-redux';

/* Bottom Screen */
import Home from "./../screens/Home";
import Booking from "./../screens/Booking";
import BookingDetail from "./../screens/BookingDetail";
import Notification from "./../screens/Notification";
import Review from "./../screens/Review";
import Favorite from "./../screens/Favorite";
import Profile1 from "./../screens/Profile1";
import Bantuan from "./../screens/Bantuan";
import BantuanDetail from "./../screens/BantuanDetail";
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
// import PdfView from "./../screens/PdfView";

import FlightResultArrival from "./../screens/FlightResultArrival";
import FlightResultArrivalVia from "./../screens/FlightResultArrivalVia";
import SummaryVia from "./../screens/SummaryVia";
import SummaryGeneral from "./../screens/SummaryGeneral";
import SummaryPreview from "./../screens/SummaryPreview";

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
import ProductSport from "./../screens/ProductSport";
import ProductSportSewa from "./../screens/ProductSportSewa";
import ProductSportEvent from "./../screens/ProductSportEvent";

import ProductOffice from "./../screens/ProductOffice";




import ProductDetailNew from "./../screens/ProductDetailNew";

import TourDetailCustom from "./../screens/TourDetailCustom";
// import Explore from "./../screens/Explore";

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
// import Filter from "./../screens/Filter";
// import FlightFilter from "./../screens/FlightFilter";
import FlightDetail from "./../screens/FlightDetail";
import FlightDetailVia from "./../screens/FlightDetailVia";

// import BusFilter from "./../screens/BusFilter";
// import Search from "./../screens/Search";
// import SearchHistory from "./../screens/SearchHistory";
import PreviewImage from "./../screens/PreviewImage";
// import SelectBus from "./../screens/SelectBus";
// import SelectCruise from "./../screens/SelectCruise";
// import CruiseFilter from "./../screens/CruiseFilter";
// import EventFilter from "./../screens/EventFilter";
// /* Stack Screen */
// import Profile2 from "./../screens/Profile2";
// import Profile3 from "./../screens/Profile3";
// import Profile4 from "./../screens/Profile4";
// import Profile5 from "./../screens/Profile5";
// import Profile6 from "./../screens/Profile6";
// import Profile7 from "./../screens/Profile7";
// import Profile8 from "./../screens/Profile8";
// import More from "./../screens/More";
// import Voucher from "./../screens/Voucher";
// import Car from "./../screens/Car";
// import OverViewCar from "./../screens/OverViewCar";
// import Review from "./../screens/Review";
// import Feedback from "./../screens/Feedback";
// import Messages from "./../screens/Messages";
// import Walkthrough from "./../screens/Walkthrough";
import SignIn from "./../screens/SignIn";
import TravelBuddy from "./../screens/TravelBuddy";

import Verify from "./../screens/Verify";
import ForgotPassword from "./../screens/ForgotPassword";
import ResetPassword from "./../screens/ResetPassword";


// import ResetPassword from "./../screens/ResetPassword";
// import ChangePassword from "./../screens/ChangePassword";
// import Static from "./../screens/Static";
import ProfileEdit from "./../screens/ProfileEdit";
// import ProfileExample from "./../screens/ProfileExample";
// import ChangeLanguage from "./../screens/ChangeLanguage";
// import HotelInformation from "./../screens/HotelInformation";
// import HotelRoom from "./../screens/HotelRoom";
// import CheckOut from "./../screens/CheckOut";
// import Eticket from "./../screens/Eticket";
// import Currency from "./../screens/Currency";
// import Coupons from "./../screens/Coupons";
// import ActivitiesDetail from "./../screens/ProductDetail";
// import ContactUs from "./../screens/ContactUs";
import PreviewBooking from "./../screens/PreviewBooking";
// import TourOrderDetail from "./../screens/TourOrderDetail";
// import PricingTable from "./../screens/PricingTable";
// import PricingTableIcon from "./../screens/PricingTableIcon";
// import BookingDetail from "./../screens/BookingDetail";
// import PostDetail from "./../screens/PostDetail";
// import Musium from "./../screens/Musium";
// import TourDetail from "./../screens/TourDetail";
// import CarDetail from "./../screens/CarDetail";
// import AboutUs from "./../screens/AboutUs";
// import OurService from "./../screens/OurService";
// import TourSet from "./../screens/TourSet";
// import SelectCity from "./../screens/SelectCity";
// import SelectTitle from "./../screens/SelectTitle";
// import SelectCountry from "./../screens/SelectCountry";
// import SelectPhoneCode from "./../screens/SelectPhoneCode";

// import SelectPayment from "./../screens/SelectPayment";
// import Cart from "./../screens/Cart";
// import CartTour from "./../screens/CartTour";
// import SubmitOrder from "./../screens/SubmitOrder";
// import VirtualAccount from "./../screens/VirtualAccount";
// import DatePickerRange from "./../screens/DatePickerRange";

// import FlightSummary from "./../screens/FlightSummary";
// import TourSummary from "./../screens/TourSummary";
// import CruiseSearch from "./../screens/CruiseSearch";
// import Cruise from "./../screens/Cruise";
// import CruiseDetail from "./../screens/CruiseDetail";
// import BusSearch from "./../screens/BusSearch";
// import BusList from "./../screens/BusList";
// import BusSelectSeat from "./../screens/BusSelectSeat";
// import PreviewBusBooking from "./../screens/PreviewBusBooking";
// import BusTicket from "./../screens/BusTicket";
// import Event from "./../screens/Event";
import EventDetail from "./../screens/EventDetail";
// import EventPreviewBooking from "./../screens/EventPreviewBooking";
// import DashboardEvent from "./../screens/DashboardEvent";
// import EventTicket from "./../screens/EventTicket";



//----------------------new version----------------//
import HomeV2 from "./../screens/HomeV2";
import HomeNew from "./../screens/_newversion/HomeNew";



// Transition for navigation by screen name
const handleCustomTransition = ({ scenes }) => {
    const nextScene = scenes[scenes.length - 1].route.routeName;
    switch (nextScene) {
        case "PreviewImage":
            Utils.enableExperimental();
            return Utils.zoomIn();
        default:
            return false;
    }
};

// Config for bottom navigator
const bottomTabNavigatorConfigTravelBuddy = {
    initialRouteName: "TravelBuddy",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        //style: BaseStyle.tabBar,
        style: {

            marginTop: -40,
            paddintTop: 60

        },
        labelStyle: {
            fontSize: 12
        }
    }
};

// Config for bottom navigator
const bottomTabNavigatorConfig = {
    initialRouteName: "Home",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        //style: BaseStyle.tabBar,
        style: {

            marginTop: -40,
            paddintTop: 60

        },
        labelStyle: {
            fontSize: 12
        }
    }
};

// Tab bar navigation
const routeConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: "Home",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="home" size={20} solid />;
            }
        })
    },
    Booking: {
        screen: Booking,
        navigationOptions: ({ navigation }) => ({
            title: "Order",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon color={tintColor} name="briefcase" size={20} solid />
                );
            }
        })
    },
    Messenger: {
        screen: Notification,
        navigationOptions: ({ navigation }) => ({
            title: "Notification",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="notifications"
                        size={25}
                        solid
                    />
                );
            }
        })
    },

    Profile: {
        screen: Profile1,
        navigationOptions: ({ navigation }) => ({
            title: "Account",
            tabBarIcon: ({ focused, tintColor }) => {
                return (
                    <Icon
                        solid
                        color={tintColor}
                        name="person"
                        size={20}
                    />
                );
            }
        })
    }
};


// Tab bar navigation


// Define bottom navigator as a screen in stack
const BottomTabNavigator = createBottomTabNavigator(
    routeConfigs,
    bottomTabNavigatorConfig
);




// Main Stack View App
const StackNavigator = createStackNavigator(
    {

        BottomTabNavigator: {
            screen: BottomTabNavigator
        },


        SelectFlight: {
            screen: SelectFlight
        },
        SelectCoupon: {
            screen: SelectCoupon
        },
        Bantuan: {
            screen: Bantuan
        },
        BantuanDetail: {
            screen: BantuanDetail
        },
        FlightSearch: {
            screen: FlightSearch
        },
        // Other: {
        //     screen: Other
        // },
        HomeV2: {
            screen: HomeV2
        },
        HomeNew: {
            screen: HomeNew
        },
        Tour: {
            screen: Tour
        },
        FlightResult: {
            screen: FlightResult
        },
        FlightResultVia: {
            screen: FlightResultVia
        },
        FlightResultArrival: {
            screen: FlightResultArrival
        },
        FlightResultArrivalVia: {
            screen: FlightResultArrivalVia
        },
        Summary: {
            screen: Summary
        },
        SummaryVia: {
            screen: SummaryVia
        },
        SummaryGeneral: {
            screen: SummaryGeneral
        },
        SummaryPreview: {
            screen: SummaryPreview
        },
        Hotel: {
            screen: Hotel
        },
        Flight: {
            screen: Flight
        },
        HotelSearchAgain: {
            screen: HotelSearchAgain
        },
        FlightSearchAgain: {
            screen: FlightSearchAgain
        },
        HotelByFilter: {
            screen: HotelByFilter
        },
        HotelLinx: {
            screen: HotelLinx
        },
        HotelLinxFilter: {
            screen: HotelLinxFilter
        },

        HotelSearch: {
            screen: HotelSearch
        },
        HotelCity: {
            screen: HotelCity
        },
        SelectHotel: {
            screen: SelectHotel
        },
        SelectTitle: {
            screen: SelectTitle
        },
        SelectPhoneCode: {
            screen: SelectPhoneCode
        },
        SelectCountry: {
            screen: SelectCountry
        },
        SelectHotelLinx: {
            screen: SelectHotelLinx
        },
        SelectHotelLinxHome: {
            screen: SelectHotelLinxHome
        },
        ProductDetail: {
            screen: ProductDetail,
            // navigationOptions: () => ({
            //     gestureResponseDistance: {
            //       horizontal: -1,
            //       vertical: -1,
            //     },
            //   }),
            // navigationOptions: {
            //     gesturesEnabled: false,
            // },
        },
        PromoDetail: {
            screen: PromoDetail
        },
        VendorDetail: {
            screen: VendorDetail
        },
        ProductList: {
            screen: ProductList
        },
        ProductSport: {
            screen: ProductSport
        },
        ProductSportEvent: {
            screen: ProductSportEvent
        },
        ProductSportSewa: {
            screen: ProductSportSewa
        },
        ProductOffice: {
            screen: ProductOffice
        },
        ProductDetailNew: {
            screen: ProductDetailNew,
        },
        TourDetailCustom: {
            screen: TourDetailCustom
        },
        // Explore: {
        //     screen: Explore
        // },
        Activities: {
            screen: Activities
        },
        FlightTicket: {
            screen: FlightTicket
        },
        Pembayaran: {
            screen: Pembayaran,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (<HeaderBackButton onPress={_ => navigation.navigate("Booking")} />)
            })
        },
        PembayaranDetail: {
            screen: PembayaranDetail
        },
        WebViewPage: {
            screen: WebViewPage
        },
        Blog: {
            screen: Blog
        },
        ProfileSmart: {
            screen: ProfileSmart
        },
        ProfileEditPassword: {
            screen: ProfileEditPassword
        },
        DetailContact: {
            screen: DetailContact
        },







        // ProfileExample: {
        //     screen: ProfileExample
        // },
        // Profile1: {
        //     screen: Profile1
        // },
        // Profile2: {
        //     screen: Profile2
        // },
        // Profile3: {
        //     screen: Profile3
        // },
        // Profile4: {
        //     screen: Profile4
        // },
        // Profile5: {
        //     screen: Profile5
        // },
        // Profile6: {
        //     screen: Profile6
        // },
        // Profile7: {
        //     screen: Profile7
        // },
        // Profile8: {
        //     screen: Profile8
        // },

        // Review: {
        //     screen: Review
        // },
        // Feedback: {
        //     screen: Feedback
        // },
        // Messages: {
        //     screen: Messages
        // },
        Review: {
            screen: Review
        },
        Favorite: {
            screen: Favorite
        },
        // Walkthrough: {
        //     screen: Walkthrough
        // },
        SignIn: {
            screen: SignIn
        },
        TravelBuddy: {
            screen: TravelBuddy
        },
        Verify: {
            screen: Verify
        },
        ForgotPassword: {
            screen: ForgotPassword
        },
        ResetPassword: {
            screen: ResetPassword
        },
        // ResetPassword: {
        //     screen: ResetPassword
        // },
        // ChangePassword: {
        //     screen: ChangePassword
        // },
        // Static: {
        //     screen: Static
        // },
        ProfileEdit: {
            screen: ProfileEdit
        },
        // ChangeLanguage: {
        //     screen: ChangeLanguage
        // },
        // HotelInformation: {
        //     screen: HotelInformation
        // },
        // HotelRoom: {
        //     screen: HotelRoom
        // },
        // CheckOut: {
        //     screen: CheckOut
        // },
        // Eticket: {
        //     screen: Eticket
        // },
        // Currency: {
        //     screen: Currency
        // },
        // Coupons: {
        //     screen: Coupons
        // },

        // ActivitiesDetail: {
        //     screen: ActivitiesDetail
        // },

        // ContactUs: {
        //     screen: ContactUs
        // },
        PreviewBooking: {
            screen: PreviewBooking
        },
        // TourOrderDetail: {
        //     screen: TourOrderDetail
        // },
        // PricingTable: {
        //     screen: PricingTable
        // },
        // PricingTableIcon: {
        //     screen: PricingTableIcon
        // },
        // BookingDetail: {
        //     screen: BookingDetail
        // },
        // PostDetail: {
        //     screen: PostDetail
        // },
        // Musium: {
        //     screen: Musium
        // },

        // TourDetail: {
        //     screen: TourDetail
        // },
        // Car: {
        //     screen: Car
        // },
        // OverViewCar: {
        //     screen: OverViewCar
        // },
        // CarDetail: {
        //     screen: CarDetail
        // },
        // AboutUs: {
        //     screen: AboutUs
        // },
        // OurService: {
        //     screen: OurService
        // },

        // TourSet: {
        //     screen: TourSet
        // },
        // VirtualAccount: {
        //     screen: VirtualAccount
        // },


        // SelectCity: {
        //     screen: SelectCity
        // },
        // SelectCountry: {
        //     screen: SelectCountry
        // },
        // SelectPhoneCode: {
        //     screen: SelectPhoneCode
        // },
        // SelectPayment: {
        //     screen: SelectPayment
        // },
        // Cart: {
        //     screen: Cart
        // },
        // CartTour: {
        //     screen: CartTour
        // },
        // SubmitOrder: {
        //     screen: SubmitOrder
        // },
        // SelectTitle: {
        //     screen: SelectTitle
        // },

        // FlightSummary: {
        //     screen: FlightSummary
        // },
        // TourSummary: {
        //     screen: TourSummary
        // },
        // CruiseSearch: {
        //     screen: CruiseSearch
        // },
        // Cruise: {
        //     screen: Cruise
        // },
        // CruiseDetail: {
        //     screen: CruiseDetail
        // },
        // BusSearch: {
        //     screen: BusSearch
        // },
        // BusList: {
        //     screen: BusList
        // },
        // BusSelectSeat: {
        //     screen: BusSelectSeat
        // },
        // PreviewBusBooking: {
        //     screen: PreviewBusBooking
        // },
        // BusTicket: {
        //     screen: BusTicket
        // },
        // Event: {
        //     screen: Event
        // },
        EventDetail: {
            screen: EventDetail
        },
        // EventPreviewBooking: {
        //     screen: EventPreviewBooking
        // },
        // EventTicket: {
        //     screen: EventTicket
        // },
        // More: {
        //     screen: More
        // },
        // Voucher: {
        //     screen: Voucher
        // },
        // Car: {
        //     screen: Car
        // },

        // DashboardEvent: {
        //     screen: DashboardEvent
        // },
        // DatePickerRange: {
        //     screen: DatePickerRange
        // }
    },
    {
        headerMode: "none",
        initialRouteName: "BottomTabNavigator"
    }
);

// Define Root Stack support Modal Screen
//const RootStack = ({ }) => createStackNavigator({
const RootStack = createStackNavigator(
    {
        // Filter: {
        //     screen: Filter
        // },
        BookingDetail: {
            screen: BookingDetail
        },
        Eticket: {
            screen: Eticket
        },
        Evoucher: {
            screen: Evoucher
        },
        EvoucherPdf: {
            screen: EvoucherPdf
        },
        // PdfView: {
        //     screen: PdfView
        // },
        FlightFilter: {
            screen: FlightFilter
        },
        ProductFilter: {
            screen: ProductFilter
        },
        HotelLinxGuest: {
            screen: HotelLinxGuest
        },
        FlightDetail: {
            screen: FlightDetail
        },
        FlightDetailVia: {
            screen: FlightDetailVia
        },
        // BusFilter: {
        //     screen: BusFilter
        // },
        // CruiseFilter: {
        //     screen: CruiseFilter
        // },
        // EventFilter: {
        //     screen: EventFilter
        // },
        // Search: {
        //     screen: Search
        // },
        // SearchHistory: {
        //     screen: SearchHistory
        // },

        // SelectBus: {
        //     screen: SelectBus
        // },
        // SelectCruise: {
        //     screen: SelectCruise
        // },
        PreviewImage: {
            screen: PreviewImage
        },
        SignUp: {
            screen: SignUp
        },

        StackNavigator: {
            screen: StackNavigator
        }
    },
    {
        mode: "modal",
        headerMode: "none",
        initialRouteName: "StackNavigator",
        transitionConfig: screen => {
            return handleCustomTransition(screen);
        }
    }
);

export default RootStack;
