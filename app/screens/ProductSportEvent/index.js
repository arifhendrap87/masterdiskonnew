import React, { Component, useEffect, useState, useCallback } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    InteractionManager,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import FilterSortHotelLinxBottom from "../../components/FilterSortHotelLinxBottom";
import DataEmpty from "../../components/DataEmpty";

// import { Calendar } from 'react-native-big-calendar'

import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    Button,
    StarRating,
    Tag,
    FilterSort
} from "@components";
import * as Utils from "@utils";
import FilterSortProduct from "../../components/FilterSortProduct";
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import FastImage from 'react-native-fast-image';
import BlogList from "../../components/BlogList";






import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


// Load sample data


import {
    DataLoading,
    DataConfig,
    DataTrip,
    DataHotelPackage,
    DataIcon,
    DataHotelPackageCity,
    DataActivities,
    DataDashboard,
    DataSlider,
    DataBlog, DataMenu, DataCard, DataPromo
} from "@data";
import { set } from "react-native-reanimated";


const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;
import { useSelector, useDispatch } from 'react-redux';


export default function ProductList({ navigation }) {



    //let { navigation } = props;
    const login = useSelector(state => state.application.loginStatus);
    const userSession = useSelector(state => state.application.userSession);
    const configApi = useSelector(state => state.application.configApi);
    const [product, setProduct] = useState(DataCard);
    const [productOriginal, setProductOriginal] = useState(DataCard);
    const [productTag, setProductTag] = useState([]);
    const [productCity, setProductCity] = useState([]);
    const [productMeta, setProductMeta] = useState([]);
    const [loading, setLoading] = useState(false);
    const events = [
        {
            title: 'Meeting',
            start: new Date(2022, 6, 11, 10, 0),
            end: new Date(2022, 6, 10, 10, 30),
        },
        {
            title: 'Coffee break',
            start: new Date(2020, 1, 11, 15, 45),
            end: new Date(2020, 1, 11, 16, 30),
        },
    ]





    useEffect(() => {



    }, [navigation]);




    return (
        loading == true ?
            <View style={{
                position: "absolute",
                top: 220,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ActivityIndicator size="large" color={BaseColor.primaryColor} />
                <Text>Sedang memuat data</Text>
            </View>
            :
            <SafeAreaView
                style={[BaseStyle.safeAreaView, { backgroundColor: BaseColor.primaryColor }]}
                forceInset={{ top: "always" }}

            >
                <View style={{ position: 'absolute', backgroundColor: BaseColor.bgColor, flex: 1, height: 45, left: 0, right: 0, bottom: 0 }}></View>

                <Header
                    title={'Event sport'}
                    renderLeft={() => {
                        return (
                            <Icon
                                name="md-arrow-back"
                                size={20}
                                color={BaseColor.whiteColor}
                            />
                        );
                    }}

                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>



                    <ScrollView
                        style={[styles.scrollView, { flex: 0.8 }]}
                    >
                        {/* <Calendar events={events} height={600} /> */}





                    </ScrollView>


                </View>
            </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    cardGroup: {
        //marginTop:20,
        width: '100%',
        //backgroundColor: BaseColor.whiteColor,
        paddingBottom: 20
    },
    cardGroupTransparent: {
        marginTop: 20,
        width: '100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom: 20
    },
});
