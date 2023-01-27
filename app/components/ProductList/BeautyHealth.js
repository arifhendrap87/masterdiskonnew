import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, AsyncStorage, Dimensions, ImageBackground } from "react-native";
import {
    Text,
    SafeAreaView,
    Header,
    Image,
    Icon,
    Tag,
    FormOption,
    Button
} from "@components";
import PropTypes from "prop-types";
// import styles from "./styles";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    DataMenu, DataMasterDiskon, DataCard
} from "@data";

import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-svg-uri';
import CardCustom from "../../components/CardCustom";
import CardCustomTitle from "../../components/CardCustomTitle";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2;


const styles = StyleSheet.create({
    itemService: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingTop: 10
    },

    iconContentColor: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 5,
        marginBottom: 5,
        //backgroundColor: BaseColor.primaryColor,
    },
    cardGroup: {
        marginTop: 20,
        width: '100%',
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 20
    },
    cardGroupTransparent: {
        marginTop: 20,
        width: '100%',
        //backgroundColor:BaseColor.whiteColor,
        paddingBottom: 20
    },
});
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

export default class BeautyHealth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            icons: DataMenu,
            img_featured: Images.doodle,
            configLocal: DataMasterDiskon[0],
            loading: true,
            DataCard: DataCard

        }
    }

    componentDidMount() {
        this.setState({ loading: false });
        // AsyncStorage.getItem('config', (error, result) => {
        //     if (result) {    
        //         let config = JSON.parse(result);
        //         var url=config.apiBaseUrl+"product?limit=4&tag=&category=hotels";

        //         var myHeaders = new Headers();
        //         myHeaders.append("Authorization", "Bearer "+config.apiToken);

        //         var requestOptions = {
        //         method: 'GET',
        //         headers: myHeaders,
        //         redirect: 'follow'
        //         };

        //         fetch(url, requestOptions)
        //          .then(response => response.json())
        //          .then(result => {
        //              console.log('datas',JSON.stringify(result));
        //             this.setState({DataCard:result.data});
        //             this.setState({loading:false});
        //         })
        //         .catch(error => {alert('Kegagalan Respon Server')});
        //     }
        // });
    }

    render() {
        const {

        } = this.props;
        const { icons, loading, DataCard } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

        return (

            DataCard.length != 0 ?
                <View style={styles.cardGroup}>
                    <ImageBackground source={{ uri: "https://masterdiskon.com/assets/upload/promotion/slider/homepage_banner_-_Virtual_Live_Tours.png" }} style={{
                        flex: 1,
                        resizeMode: "cover",
                        justifyContent: "center"
                    }}>

                        <View style={{ flex: 1, paddingVertical: 10 }}>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}

                                data={DataCard}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id}
                                getItemLayout={(item, index) => (
                                    { length: 70, offset: 70 * index, index }
                                )}
                                removeClippedSubviews={true} // Unmount components when outside of window 
                                initialNumToRender={2} // Reduce initial render amount
                                maxToRenderPerBatch={1} // Reduce number in each render batch
                                maxToRenderPerBatch={100} // Increase time between renders
                                windowSize={7} // Reduce the window size
                                renderItem={({ item, index }) => (

                                    index == 0 ?
                                        <View style={{ width: (width - 120) / 2 }}></View>
                                        :

                                        <CardCustom
                                            propImage={{ height: wp("20%"), url: item.img_featured_url }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propPrice={{ price: 20, startFrom: false }}
                                            propPriceCoret={{ price: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].normal_price) : 0, priceDisc: item.product_detail.length != 0 ? priceSplitter(item.product_detail[0].price) : 0, discount: 0, discountView: false }}

                                            propInframe={{ top: item.product_discount, bottom: '' }}
                                            propTitle={{ text: item.product_name }}
                                            propDesc={{ text: '' }}
                                            propStar={{ rating: '', enabled: false }}
                                            propLeftRight={{ left: '', right: '' }}
                                            onPress={() =>
                                                navigation.navigate("ProductDetailNew", { product: item, product_type: 'hotelpackage' })
                                            }
                                            loading={false}
                                            propOther={{ inFrame: true, width: (width - 60) / 2 }}
                                            propIsCampaign={item.product_is_campaign}
                                            propPoint={0}

                                            style={[
                                                index == 0
                                                    ? { marginLeft: 20, marginRight: 10 }
                                                    : { marginRight: 10 }
                                            ]}
                                        />
                                )}


                            />
                        </View>
                    </ImageBackground>
                </View>
                :
                <View></View>

        );
    }
}

BeautyHealth.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

BeautyHealth.defaultProps = {
    style: {},

};
