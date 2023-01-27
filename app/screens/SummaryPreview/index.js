import React, { Component, useEffect, useState, useCallback } from "react";
import { AuthActions, ApplicationActions } from "@actions";

import {
    BackHandler,
    View,
    ScrollView,
    Animated,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Switch,
    Image,
    TextInput,
    ImageBackground,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    FlightPlan,
    Text,
    Button,
    ProfileDetail,
    FlightDetailVia
} from "@components";
import Spinner from 'react-native-loading-spinner-overlay';

import { AsyncStorage, Platform } from "react-native";
import { PackageData } from "@data";
import DropdownAlert from "react-native-dropdownalert";
import { UserData } from "@data";
import AnimatedLoader from "react-native-animated-loader";
import NotYetLogin from "../../components/NotYetLogin";
import Modal from "react-native-modal";
// import { TSpan } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { set } from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import CardCustom from "../../components/CardCustom";
import SignIn from "app/components/Signin";
const styles = StyleSheet.create({
    contain: {
        padding: 20,
        width: "100%",
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed",
        marginTop: 15,
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center",
    },

    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%",
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    contentProfile: {
        flexDirection: "row",
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 5,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: BaseColor.fieldColor,
        padding: 5,
    },
    searchIcon: {
        flex: 1,
        padding: 10,
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
        margin: 0,
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor,
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center",
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor,
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
    },
    blockView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: BaseColor.whiteColor,

        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // padding:20,
        marginBottom: 10,
    },
});

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SummaryPreview(props) {
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    let { navigation } = props;
    const dispatch = useDispatch();

    const [login, setLogin] = useState(
        useSelector((state) => state.application.loginStatus) ? true : false
    );
    const userSession = useSelector((state) => state.application.userSession);
    const configApi = useSelector((state) => state.application.configApi);
    //console.log('paramsemuanya', JSON.stringify(navigation.state.params))
    const [paramAll, setParamAll] = useState(
        navigation.state.params && navigation.state.params.param
            ? navigation.state.params.param
            : []
    );
    const [param] = useState(paramAll.param);
    const [product] = useState(paramAll.product);
    const [productPart] = useState(paramAll.productPart);
    const [extra, setExtra] = useState(paramAll.extra);
    const [resultVia] = useState(paramAll.resultVia);
    const [spinner, setSpinner] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(false);
    const [expandedProduct1, setExpandedProduct1] = useState(false);


    const [listdataCustomer] = useState(
        navigation.state.params && navigation.state.params.listdataCustomer
            ? navigation.state.params.listdataCustomer
            : []
    );

    const [listdataParticipant] = useState(
        navigation.state.params && navigation.state.params.listdataParticipant
            ? navigation.state.params.listdataParticipant
            : []
    );

    const [dataCount] = useState(
        navigation.state.params && navigation.state.params.dataCount
            ? navigation.state.params.dataCount
            : []
    );

    const [couponCodeListId] = useState(
        navigation.state.params && navigation.state.params.couponCodeListId
            ? navigation.state.params.couponCodeListId
            : []
    );


    const [Platform] = useState(
        navigation.state.params && navigation.state.params.Platform
            ? navigation.state.params.Platform
            : []
    );

    const [arr_old] = useState(
        navigation.state.params && navigation.state.params.arr_old
            ? navigation.state.params.arr_old
            : []
    );

    const [ssr] = useState(
        navigation.state.params && navigation.state.params.ssr
            ? navigation.state.params.ssr
            : []
    );
    const [discountCoupon] = useState(
        navigation.state.params && navigation.state.params.discountCoupon
            ? navigation.state.params.discountCoupon
            : []
    );

    const [note] = useState(
        navigation.state.params && navigation.state.params.note
            ? navigation.state.params.note
            : ""
    );

    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingSpinnerFile, setLoadingSpinnerFile] = useState(
        require("app/assets/loader_flight.json")
    );
    const [loadingSpinnerTitle, setLoadingSpinnerTitle] = useState(
        "Connecting with masterdiskon"
    );

    const priceSplitter = (number) =>
        number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    function rebuildParticipant(participant) {
        var participant_new = [];
        var a = 1;
        participant.map((item) => {
            var obj = {};

            var newArray = ssr.filter(function (el) {
                return el.number === a;
            });

            obj["type"] = item.type;
            obj["title"] = item.title;
            obj["firstName"] = item.firstName;
            obj["lastName"] = item.lastName;
            obj["dob"] = item.dob;
            obj["guestnum"] = item.guestnum;
            // obj['ssr'] = this.filterArray(ssr, a);//ssr;
            // obj['ssr1'] = ssr;
            obj["ssr"] = extraFilter(newArray);
            obj["passport"] = item.passport;
            //obj['ssr'] = newArray;
            //obj['ssr'] = this.groupBy(ssr, (c) => c.number);

            participant_new.push(obj);
            a++;
        });

        return participant_new;
    }
    function extraFilter(ssr) {
        let filter = ssr.filter((d) => d.code != "");
        console.log("filter", JSON.stringify(filter));
        return filter;
    }
    function convertDateDMY(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + "-" + mm + "-" + yyyy;
        return today;
    }
    function convertOldVia(oldType) {
        if (oldType == "ADT") {
            old = "adult";
        } else if (oldType == "CHD") {
            old = "child";
        } else if (oldType == "INF") {
            old = "infant";
        }
        return old;
    }

    function cekLoginForm(email2, password2) {
        let config = configApi;
        let baseUrl = config.baseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/login_proses_app";

        var data = { email: email2, password: password2 };
        const paramUser = { param: data };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(paramUser);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("loginUsersession", JSON.stringify(result));



            })
            .catch((error) => {
                alert(error);
                //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connection.');
            });
    }

    function cekLoginFormAuth(email2, password2, dataUser, type = "form") {
        setLoadingSpinner(true);
        let config = configApi;
        let baseUrl = config.baseUrl;
        let apiBaseUrl = config.apiBaseUrl;
        let url = baseUrl + "front/api_new/AuthLogin/get_private_token";
        let urlapiBaseUrl = apiBaseUrl + "auth/token";

        var data = { email: email2.toLowerCase(), password: password2, url: urlapiBaseUrl };
        const param = { param: data };
        console.log("paramcekLoginFormAuth", JSON.stringify(param));
        console.log("url", url);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(param);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("access_token", JSON.stringify(result));

                if (result.access_token) {
                    cekLoginForm(email2, password2);
                } else {
                    if (type == "form") {
                        setLoadingSpinner(false);
                        this.dropdown.alertWithType(
                            "info",
                            "Info",
                            "Email dan Password tidak sesuai"
                        );
                    } else {
                        registrasi_proses_app(dataUser);
                    }

                }
            })
            .catch((error) => {
                //console.log('error', 'Error', 'Internet connection problem ! make sure you have an internet connections.');
            });
    }

    function submit() {
        var customer = listdataCustomer;
        var guest = listdataParticipant;
        //console.log('login', login);
        setSpinner(true);
        submitOrder()
        // if (login == true) {
        //     submitOrder()
        // } else {
        //     cekLoginForm(customer[0].email, configApi.defPassword);
        // }

    }

    function submitOrder() {
        var customer = listdataCustomer;
        var guest = listdataParticipant;
        console.log("guest", JSON.stringify(guest));

        var contact = {
            title: customer[0].title,
            firstName: customer[0].firstname.replace(/[^A-Za-z]+/g, ''),
            lastName: customer[0].lastname.replace(/[^A-Za-z]+/g, ''),
            //"country": customer[0].nationality_id,
            phoneCode: customer[0].nationality_phone_code,
            phone: customer[0].phone,
            email: customer[0].email,
        };

        var participant = [];
        var a = 1;
        guest.map((item) => {
            var obj = {};
            obj["type"] = convertOldVia(arr_old[a]);
            obj["title"] = item.title;
            obj["firstName"] = item.firstname;
            obj["lastName"] = item.lastname;
            obj["dob"] = convertDateDMY(item.birthday);
            obj["guestnum"] = a;
            obj["passport"] = {
                nat: item.passport_country_id,
                num: item.passport_number,
            };


            participant.push(obj);
            a++;
        });

        console.log("param", JSON.stringify(param));
        console.log("contact", JSON.stringify(contact));
        console.log("guestSubmit", JSON.stringify(guest));
        console.log("participant", JSON.stringify(participant));
        console.log("dataCount", JSON.stringify(dataCount));

        setLoadingSpinnerFile(require("app/assets/loader_flight.json"));
        setLoadingSpinnerTitle("Connecting to Maskapai");

        let config = configApi;
        console.log('configApi', JSON.stringify(config));
        let baseUrl = config.apiBaseUrl;
        var url = baseUrl + "booking/checkout";
        if (param.type == "hotel") {
            if (config.apiHotel == "traveloka") {
                url = baseUrl + "apitrav/booking/checkout";
            }
        }

        console.log("configApi", JSON.stringify(config));
        console.log("urlss", url);

        var paramCheckout = {};
        paramCheckout.product = param.type;
        paramCheckout.key = param.key;
        if (param.type == "general") {
            paramCheckout.qty = param.Qty;
        }
        paramCheckout.price = {
            subtotal: dataCount.subtotal,
            insurance: dataCount.insurance,
            tax: dataCount.tax,
            iwjr: dataCount.iwjr,
            fee: dataCount.fee,
            fee2: dataCount.fee2,
            addon: dataCount.addon,
            discount: dataCount.discount.grandTotal,
            point: dataCount.point,
            total: dataCount.total,
        };
        paramCheckout.paymentMethod = 0;
        paramCheckout.contact = contact;
        paramCheckout.guest = rebuildParticipant(participant);
        paramCheckout.coupon = couponCodeListId;
        paramCheckout.platform = Platform.OS;
        paramCheckout.specialRequest = note;
        console.log("paramCheckout", JSON.stringify(paramCheckout));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + config.apiToken);

        var raw = JSON.stringify(paramCheckout);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        let timeout = 10000;
        let timeout_err = {
            ok: false,
            status: 408,
        };

        return new Promise(function (resolve, reject) {
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log("resultcheckout", JSON.stringify(result));
                    setLoadingSpinner(false);
                    setSpinner(false)
                    if (result.success == true) {
                        console.log("resultcheckout", JSON.stringify(result));
                        var redirect = "Pembayaran";
                        var id_order = result.data.id_order;

                        var param = {
                            id_order: id_order,
                            dataPayment: {},
                            back: "",
                        };
                        console.log("paramPembayaran", JSON.stringify(param));
                        navigation.navigate("Pembayaran", { param: param });
                    } else {
                        console.log("Error", JSON.stringify(result));
                        this.dropdown.alertWithType(
                            "info",
                            "InfosubmitOrder",
                            JSON.stringify(result)
                        );
                    }
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    this.dropdown.alertWithType(
                        "info",
                        "InfosubmitOrder",
                        JSON.stringify(error)
                    );
                });

            setTimeout(() => {
                reject.bind(null, timeout_err);
                setLoadingSpinner(false);
                setSpinner(false);

            }, timeout);
        });



    }

    function contentPotonganCoupon() {

        var coupon = dataCount.coupon;
        if (coupon != undefined) {
            if (coupon.length != 0) {
                var contentCodeCouponList = coupon.map((item) => {
                    return (
                        <View
                            style={{
                                flexDirection: "row",
                                marginBottom: 3,
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                subhead
                                style={{ color: BaseColor.thirdColor }}
                            >
                                {item.name}
                            </Text>
                            <View
                                style={{
                                    flex: 6,
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                }}

                            >

                                <Text
                                    caption1
                                    semibold
                                    numberOfLines={1}
                                    style={{ color: BaseColor.thirdColor }}
                                >
                                    (Rp {priceSplitter(item.amount)})
                                </Text>
                            </View>
                        </View>
                    );
                });
            } else {
                var contentCodeCouponList = <View />;
            }
        }

        return contentCodeCouponList;
    }





    var dataDeparture = <View />;
    var dataReturn = <View />;
    var contentPrice = <View></View>;
    var contentDiscount = <View></View>;
    var contentBiayaPenanganan = <View />;
    var contents = <View />;

    var contentProduct = <View></View>;

    contentDiscount = (
        <View style={{ flexDirection: "column" }}>
            <View
                style={{
                    flexDirection: "row",
                    flex: 10,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <View
                    style={{
                        flex: 6,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <View>
                        <Text
                            footnote
                            numberOfLines={1}
                            style={{ color: BaseColor.thirdColor }}
                        >
                            Potongan Point
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 6,
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <Text
                        footnote
                        semibold
                        numberOfLines={1}
                        style={{ color: BaseColor.thirdColor }}
                    >
                        {"IDR " + priceSplitter(dataCount.point)}
                    </Text>
                </View>
            </View>

            {discountCoupon != 0 ? (
                <View
                    style={{
                        flexDirection: "row",
                        flex: 10,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingTop: 5,
                        paddingBottom: 5,
                    }}
                >
                    <View
                        style={{
                            flex: 6,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text
                                subhead
                                numberOfLines={1}
                                style={{ color: BaseColor.thirdColor }}
                            >
                                Potongan Kupon
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 6,
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text
                            caption1
                            semibold
                            numberOfLines={1}
                            style={{ color: BaseColor.thirdColor }}
                        >
                            {"IDR " + priceSplitter(discountCoupon)}
                        </Text>
                    </View>
                </View>
            ) : (
                <View />
            )}
        </View>
    );

    //-----------------contentFlight----------------//
    if (param.type == "flight") {
        dataDeparture = <View>
            <Text body2 bold>Berangkat</Text>
            <FlightDetailVia select={{ detail: resultVia?.data?.detail?.onwardFlight }} />
        </View>


        if (resultVia.data.detail.returnFlight != null) {
            dataReturn = (
                <View>
                    <Text body2 bold>Pulang</Text>
                    <FlightDetailVia select={{ detail: resultVia?.data?.detail?.returnFlight }} />
                </View>
            )

        }

        contentProduct = (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                    marginBottom: 20,
                }}
            >
                <FlightPlan
                    round={param.IsReturn}
                    fromCode={param.Origin}
                    toCode={param.Destination}
                    from={param.bandaraAsalLabel}
                    to={param.bandaraTujuanLabel}
                />

                {
                    expandedProduct == false ?
                        <View>
                            <Button
                                style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                                onPress={() => {
                                    setExpandedProduct(true);

                                }}
                            >
                                <Text bold>Lihat Detail Penerbangan</Text>
                            </Button>
                        </View>
                        :
                        <View />
                }

                {
                    expandedProduct == true ?
                        <View>
                            {dataDeparture}
                            {dataReturn}
                        </View>
                        :
                        <View />
                }

                {
                    expandedProduct == true ?
                        <View>
                            <Button
                                style={{ height: 30, marginTop: 10, width: '100%', borderRadius: 10 }}


                                onPress={() => {
                                    setExpandedProduct(false);

                                }}
                            >
                                <Text bold>Tutup</Text>
                            </Button>
                        </View>
                        :
                        <View />
                }
            </View>
        );
    }
    //-----------------ccontentFlight---------------//

    //-----------------contentGeneral---------------//
    if (param.type == "general") {
        contentProduct = (
            <View style={{ flex: 1 }}>
                <CardCustom
                    propImage={{
                        height: wp("50%"),
                        url:
                            paramAll.product.img_featured_url != ""
                                ? paramAll.product.img_featured_url
                                : "https://masterdiskon.com/assets/images/image-not-found.png",
                    }}
                    propTitle={{ text: paramAll.product.product_name }}
                    propPrice={{ price: "empty", startFrom: false }}
                    propInframe={{
                        top: paramAll.product.product_category.name_product_category,
                        topTitle: "",
                        topHighlight: false,
                        topIcon: "",
                        bottom: "",
                        bottomTitle: "",
                    }}
                    propReview={0}
                    propIsPromo={false}
                    propDesc={''}
                    propType={"hotel"}
                    propStar={{ rating: "", enabled: false }}
                    propLeftRight={{
                        left: paramAll.product.vendor.display_name,
                        right: "",
                    }}
                    onPress={() => { }}
                    loading={loading}
                    propOther={{ inFrame: true, horizontal: false, width: "100%" }}
                    propIsCampaign={{}}
                    propPoint={0}
                    propDesc1={paramAll.product.address}
                    propDesc2={paramAll.product.description}
                    propDesc3={paramAll.product.term}
                    propHotelHightLight={
                        paramAll.product.product_category.name_product_category
                    }
                    propPriceCoret={{
                        price: 0,
                        priceDisc: 0,
                        discount: "",
                        discountView: false,
                    }}
                    propFacilities={[]}
                    propAmenities={[]}
                    style={[{ marginBottom: 10 }]}
                    sideway={true}
                />
            </View>
        );
    }
    //-----------------contentGeneral---------------//

    //-----------------contentHotel---------------//
    if (param.type == "hotel") {
        contentProduct = (
            <View style={{ flex: 1, marginBottom: 15 }}>
                <View style={{ marginHorizontal: -5 }}>
                    <CardCustom
                        propImage={{
                            height: wp("25%"),
                            url: paramAll.product.detail.images[0],
                        }}
                        propTitle={{ text: paramAll.product.name }}
                        propPrice={{ price: 1000, startFrom: true }}
                        propInframe={{
                            top: '',
                            topTitle: "",
                            topHighlight: false,
                            topIcon: "",
                            bottom: "",
                            bottomTitle: "",
                        }}
                        propReview={0}
                        propIsPromo={false}
                        propDesc={{ text: "" }}
                        propType={""}
                        propStar={{ rating: paramAll.product.class, enabled: false }}
                        onPress={() => { }}
                        loading={false}
                        propOther={{ inFrame: true, horizontal: false, width: "100%" }}
                        propIsCampaign={false}
                        propPoint={0}
                        propDesc1={paramAll.product.detail.city}
                        propDesc2={''}
                        propDesc3={"Jumlah Kamar"}
                        propLeftRight={{
                            left: "Checkin",
                            right: paramAll.param.checkin,
                            display: true,
                        }}
                        propLeftRight2={{
                            left: "Checkout",
                            right: paramAll.param.checkout,
                            display: true,
                        }}
                        propLeftRight3={{ left: "Lama", right: paramAll?.param?.noofnights + " malam", display: true }}
                        propLeftRight4={{ left: "", right: "", display: false }}
                        propTopDown={{
                            top: "Fasilitas",
                            down: paramAll.productPart.detail[0].facilities,
                            display: false,
                        }}
                        propTopDown2={{ top: "", down: "", display: true }}
                        propTopDown3={{ top: "", down: "", display: true }}
                        propTopDown4={{ top: "", down: "", display: true }}
                        propHightLight={""}
                        propPriceCoret={{
                            price: 0,
                            priceDisc: 0,
                            discount: "",
                            discountView: false,
                        }}
                        propFacilities={[]}
                        propAmenities={[]}
                        style={[{ marginBottom: 10 }]}
                        sideway={true}
                    />
                </View>
                <View
                    style={[

                        {
                            flex: 1,
                            backgroundColor: "white",
                            borderRadius: 10,
                            marginBottom: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            padding: 10,
                            marginBottom: 20,

                        },
                    ]}
                >
                    <Text subhead bold style={{}} >
                        Detail Kamar
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text footnote>Tipe Kamar</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end", textAlign: 'right' }}>
                            <Text footnote numberOfLines={2} style={{ textAlign: 'right' }}>
                                {paramAll.productPart.name}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text footnote>Tipe Kasur</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end", textAlign: 'right' }}>
                            <Text footnote numberOfLines={1} >
                                {paramAll.productPart.roomType}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text footnote>Fasilitas Sarapan</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                            <Text footnote >
                                {paramAll.productPart.breakfastIncluded == true ? 'Termasuk Sarapan' : 'Tidak Termasuk'}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text footnote>Tamu</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                            <Text footnote >
                                {paramAll.param.jmlTamu} Orang
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text footnote>Kamar</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-end" }}>
                            <Text footnote >
                                {paramAll.param.room} kamar
                            </Text>
                        </View>
                    </View>

                </View>

                <View
                    style={[
                        {
                            flex: 1,
                            backgroundColor: "white",
                            borderRadius: 10,
                            marginBottom: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            padding: 10,
                        },
                    ]}
                >
                    <Text subhead bold>
                        Catatan
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text subhead>{note}</Text>
                    </View>
                </View>


            </View>

        );
    }
    //-----------------contentHotel---------------//








    var contentButton = (
        <View
            style={{
                borderRadius: 8,
                width: "100%",
                marginBottom: 20,
                marginTop: 20,
            }}
        >
            <TouchableOpacity

                onPress={() => {
                    submit();
                }}
            >
                <View pointerEvents="none" style={styles.groupinput}>
                    <Button
                        loading={loading}
                        style={{ backgroundColor: BaseColor.primaryColor }}
                        full
                    >
                        <Text style={{ color: BaseColor.whiteColor }}>Order Now</Text>
                    </Button>
                </View>
            </TouchableOpacity>
        </View>
    );

    var contentContact = <View />
    var contentPayment = <View />
    var contentGuest = <View />
    var contentRoom = <View />
    var contentPrice = <View />
    var paxs = [];
    var contact = listdataCustomer[0];

    // if (param.type == "general") {
    //     <View
    //         style={[
    //             styles.blockView,
    //             {
    //                 marginTop: 10,
    //                 backgroundColor: "white",
    //                 borderRadius: 10,
    //                 marginBottom: 5,
    //                 shadowColor: "#000",
    //                 shadowOffset: {
    //                     width: 0,
    //                     height: 2,
    //                 },
    //                 shadowOpacity: 0.25,
    //                 shadowRadius: 3.84,
    //                 elevation: 5,
    //                 padding: 10,
    //             },
    //         ]}
    //     >
    //         <Text body2 bold style={{ marginBottom: 10 }}>
    //             Detail Kamar
    //         </Text>

    //         <View style={{ flexDirection: "row", marginTop: 10 }}>
    //             <View style={{ flex: 1 }}>
    //                 <Text subhead>Room Type</Text>
    //             </View>
    //             <View style={{ flex: 1, alignItems: "flex-end" }}>
    //                 <Text subhead >
    //                     {dataDetail.options[0].name}
    //                 </Text>
    //             </View>
    //         </View>

    //         <View style={{ flexDirection: "row", marginTop: 10 }}>
    //             <View style={{ flex: 1 }}>
    //                 <Text subhead>Fasilitas Sarapan</Text>
    //             </View>
    //             <View style={{ flex: 1, alignItems: "flex-end" }}>
    //                 <Text subhead >
    //                     {dataDetail.room.breakfastIncluded == false ? "Tidak termasuk sarapan" : "Termasuk Sarapan"}
    //                 </Text>
    //             </View>
    //         </View>

    //         <View style={{ flexDirection: "row", marginTop: 10 }}>
    //             <View style={{ flex: 1 }}>
    //                 <Text subhead>Tamu</Text>
    //             </View>
    //             <View style={{ flex: 1, alignItems: "flex-end" }}>
    //                 <Text subhead >
    //                     {dataDetail.room.numOfAdults} Tamu
    //                 </Text>
    //             </View>
    //         </View>

    //         <View style={{ flexDirection: "row", marginTop: 10 }}>
    //             <View style={{ flex: 1 }}>
    //                 <Text subhead>Kamar</Text>
    //             </View>
    //             <View style={{ flex: 1, alignItems: "flex-end" }}>
    //                 <Text subhead >
    //                     {dataDetail.room.numOfRoom} Kamar
    //                 </Text>
    //             </View>
    //         </View>

    //         <View style={{ flexDirection: "row", marginTop: 10 }}>
    //             <View style={{ flex: 1 }}>
    //                 <Text subhead>Permintaan Khusus</Text>
    //             </View>
    //             <View style={{ flex: 1, alignItems: "flex-end" }}>
    //                 <Text subhead >
    //                     -
    //                 </Text>
    //             </View>
    //         </View>

    //         <View style={{ flexDirection: "column", marginTop: 10 }}>
    //             <View style={{ flex: 2 }}>
    //                 <Text subhead bold style={{ color: BaseColor.thirdColor }}>Kebijakan Pembatalan</Text>
    //             </View>
    //             <View style={{ flex: 2 }}>
    //                 <Text caption1>
    //                     {dataDetail.room.cancellationPolicy}
    //                 </Text>
    //             </View>
    //         </View>
    //     </View>
    // }


    contentPrice = (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 10,
                marginTop: 10

            }}
        >
            <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
                <View
                    style={{
                        flexDirection: "row",
                        flex: 10,
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flex: 5,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text footnote numberOfLines={1}>
                                Jumlah Pembayaran
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 5,
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text footnote semibold numberOfLines={1}>
                            {"IDR " + priceSplitter(dataCount.subtotal)}
                        </Text>
                    </View>
                </View>
            </View>

            {contentDiscount}
            {contentPotonganCoupon()}

            {param.type == "flight" ? (
                <View
                    style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 10,
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 5,
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <View>
                                <Text subhead grayColor numberOfLines={1}>
                                    Pajak dan Lainnya
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 5,
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            <Text caption1 semibold numberOfLines={1}>
                                {"IDR " + priceSplitter(dataCount.tax)}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View />
            )}

            {param.type == "flight" ? (
                dataCount.addon != 0 ? (
                    <View
                        style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                flex: 10,
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flex: 5,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <View>
                                    <Text subhead grayColor numberOfLines={1}>
                                        Tambahan
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 5,
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Text caption1 semibold numberOfLines={1}>
                                    {"IDR " + priceSplitter(dataCount.addon)}
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View />
                )
            ) : (
                <View />
            )}

            <View style={{ flexDirection: "row", paddingTop: 5, paddingBottom: 5 }}>
                <View
                    style={{
                        flexDirection: "row",
                        flex: 10,
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flex: 5,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text footnote numberOfLines={1}>
                                Total
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 5,
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text caption1 semibold numberOfLines={1}>
                            {"IDR " + priceSplitter(dataCount.total)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    listdataParticipant.map((item, index) =>
        paxs.push(
            <View style={{ marginBottom: 10 }}>
                <Text footnote bold style={{ marginBottom: 5 }}>
                    {item.title}. {item.firstname} {item.lastname}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                    <View style={{ flex: 1 }}>
                        <Text footnote>Nationality</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text footnote grayColor>
                            {item.nationality}
                        </Text>
                    </View>
                </View>
            </View>
        )
    );

    contentGuest = <View
        style={[
            //styles.blockView,
            {
                marginTop: 10,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 10,
            },
        ]}
    >
        <Text subhead bold style={{ marginBottom: 10 }}>
            Pax / Guest
        </Text>
        {paxs}
    </View>

    contentContact = <View
        style={[
            //styles.blockView,
            {
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 10,
            },
        ]}
    >
        <Text subhead bold style={{ marginBottom: 10 }}>
            Contact Name
        </Text>
        <Text footnote>
            {contact.title}. {contact.firstname}{" "}
            {contact.lastname}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
                <Text footnote>Phone</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text footnote grayColor>
                    {contact.phone}

                </Text>
            </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
                <Text footnote>Email</Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
                <Text footnote grayColor>
                    {contact.email}
                </Text>
            </View>
        </View>
    </View>

    contents = (
        <ScrollView>
            <View style={styles.contain}>
                {contentProduct}
                {contentContact}
                {contentGuest}
                {contentPrice}
                {contentButton}








            </View>
        </ScrollView>
    );


    return (
        <SafeAreaView
            style={[
                BaseStyle.safeAreaView,
                { backgroundColor: BaseColor.primaryColor },
            ]}
            forceInset={{ top: "always" }}
        >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={{
                    color: '#FFF'
                }}
            />
            <Header
                title="Review Booking"
                subTitle={""}
                renderLeft={() => {
                    return (
                        <Icon name="md-arrow-back" size={20} color={BaseColor.whiteColor} />
                    );
                }}
                // renderRight={() => {


                renderRightSecond={() => {
                    return <Icon name="home" size={20} color={BaseColor.whiteColor} />;
                }}
                onPressLeft={() => {
                    //navigation.goBack(null);
                    navigation.goBack();
                }}


                onPressRightSecond={() => {
                    var redirect = "Home";
                    var param = {};
                    navigation.navigate("Loading", { redirect: redirect, param: param });
                }}
            />
            <View
                style={{
                    position: "absolute",
                    backgroundColor: "#FFFFFF",
                    flex: 1,
                    height: 45,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            ></View>
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>

                {contents}


                <DropdownAlert
                    ref={(ref) => (this.dropdown = ref)}
                    messageNumOfLines={10}
                    closeInterval={2000}
                />
            </View>
        </SafeAreaView>
    );
}
