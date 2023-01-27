import React, { Component } from "react";
import { View, TouchableOpacity, Image,StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor, Images } from "@config";
// import styles from "./styles";

import CountDown from 'react-native-countdown-component';
import moment from 'moment';

const styles = StyleSheet.create({
    content: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: BaseColor.fieldColor
    },
    contentTop: {
        flexDirection: "row",
        paddingBottom: 10,
        borderBottomWidth: 0,
        borderColor: BaseColor.textSecondaryColor
    },
    line: {
        width: "100%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        marginBottom:10,
        borderStyle: "dashed"
    },
    lineFlight: {
        width: "50%",
        height: 1,
        borderWidth: 0.5,
        borderColor: BaseColor.dividerColor,
        borderStyle: "dashed"
    },
    contentLine: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: BaseColor.primaryColor,
        position: "absolute"
    },
    contentBottom: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    bottomLeft: { flexDirection: "row", alignItems: "center" },
    image: { width: 32, height: 32, marginRight: 10, borderRadius: 16 }
  });


export default class CartCardTour extends Component {
    constructor(props) {
        super(props);


        this.state = {
            backgroundColor:BaseColor.fieldColor,
            loading:false
         
        };

    }

    componentDidMount() {
        var timeLimit=this.props.timeLimit;
        if(timeLimit===0){
            this.setState({backgroundColor:'red'});
            var idCart=this.props.idCart;
            this.props.updatePrice(idCart);
           
        }
    }

    duration(expirydate)
    {
        
        var date = moment()
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var d = hours * 60 * 60 + minutes * 60 + seconds;
        return d;
        //this.setState({ totalDuration: d });
    
    }

    timeOut(value)
    {   
        if(value===1){
            this.setState({backgroundColor:'red'});
            var idCart=this.props.idCart;
            this.props.updatePrice(idCart);
           
        }
    }

    render() {
        const {
            style,
            // from,
            // to,
            // fromHour,
            // toHour,
            // totalHour,
            // route,
            // image,
            // brand,
            // type,
            // price,
            // onPress.


            
            timeLimit,
            fromFlight,
            toFlight,
            from,
            to,
            type,
            adult,
            children,
            infant,
            contactName,
            contactPhone,
            total,
            idCart,
            departure,
            returns,
            onPress
        } = this.props;

        // if(route==0){
        //     routeKet='Direct';
        // }else if(route>=0){
        //     routeKet=route+ "transit";
        // }

        // if(type=='E'){
        //     kelas="Economy Class";
        // }else if(type=='S'){
        //     kelas="Premium Economy";
        // }else if(type=='B'){
        //     kelas="Business Class";
        // }else if(type=='F'){
        //     kelas="First Class";
        // }
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        //console.log(timeLimit);
        let { loading } = this.state;
        //var numTimeLimit=this.duration(timeLimit);

        var numTimeLimit=Math.floor(Math.random() * 60) + 1;
        
        return (
            <View style={{padding: 10,
                borderRadius: 8,
                backgroundColor: this.state.backgroundColor}}>
     
                {/* <View style={styles.contentTop}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <Text caption1 light>
                            Batas Order
                        </Text>
                       
                        <CountDown
                                size={10}
                                //until={this.duration('2020-02-17T16:30:28')}
                                
                                until={this.duration(timeLimit)}
                                //until={numTimeLimit}
                                onFinish={() => this.timeOut(1)}
                                style={{float:'left'}}
                                digitStyle={{backgroundColor: BaseColor.fieldColor, borderWidth: 2, borderColor: BaseColor.fieldColor}}
                                digitTxtStyle={{color: BaseColor.primaryColor}}
                                timeLabelStyle={{color: BaseColor.primaryColor, fontWeight: 'bold'}}
                                separatorStyle={{color: BaseColor.primaryColor}}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{m: null, s: null}}
                                showSeparator
                            />
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                    </View>
                </View> */}
                {/* <View style={styles.line} /> */}

                {/* <View style={styles.contentTop}>
                    <View style={{ flex: 1 }}>
                        <Text title2>{fromFlight}</Text>
                        <Text footnote light>
                            {from}
                        </Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <Text caption1 light>
                           Flight Type
                        </Text>
                        <View style={styles.contentLine}>
                            <View style={styles.lineFlight} />
                            <Icon
                                name="plane"
                                color={BaseColor.dividerColor}
                                size={24}
                                solid
                            />
                            <View style={styles.dot} />
                        </View>
                        <Text caption1 light>
                            {type}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text title2>{toFlight}</Text>
                        <Text footnote light style={{textAlign:'right'}}>
                            {to}
                        </Text>
                    </View>
                </View> */}

                <View style={styles.contentTop}>
                    <View style={{ flex: 1 }}>
                        <Text title4>Adult</Text>
                        <Text footnote light>
                            {adult}
                        </Text>
                    </View>
                    <View style={{ flex: 1.5, alignItems: "center" }}>
                        <Text title4>Children</Text>
                        <Text caption1 light>
                            {children}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text title4>Baby</Text>
                        <Text footnote light>
                            {infant}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                               Contact Name
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {contactName}
                        </Text>
                    </View>
                </View>

                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                Contact Phone
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {contactPhone}
                        </Text>
                    </View>
                </View>

                {/* <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                contactName Phone
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {contactName}
                        </Text>
                    </View>
                </View> */}

{/* 
                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                Total
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            IDR {priceSplitter(total)}
                        </Text>
                    </View>
                </View> */}
{/* 
                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                ID Cart
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {idCart}
                        </Text>
                    </View>
                </View> */}

                {/* <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                Departure
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {departure}
                        </Text>
                    </View>
                </View>

                <View style={styles.contentBottom}>
                    <View style={styles.bottomLeft}>
                        <View>
                            <Text caption2 light>
                                Return
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text caption1 light style={{ marginLeft: 5 }}>
                            {returns}
                        </Text>
                    </View>
                </View> */}

              
           
            </View>
        );
    }
}

CartCardTour.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // fromHour: PropTypes.object,
    // toHour: PropTypes.object,
    // fromFlight: PropTypes.object,
    // toFlight: PropTypes.object,
    // price: PropTypes.string,
    // route: PropTypes.string,
    // totalHour: PropTypes.number,
    // brand: PropTypes.string,
    // image: PropTypes.node.isRequired,
    

    timeLimit:PropTypes.string,
    fromFlight: PropTypes.object,
    toFlight: PropTypes.object,
    from: PropTypes.object,
    to: PropTypes.object,
    type: PropTypes.string,
    adult: PropTypes.object,
    children: PropTypes.object,
    infant: PropTypes.object,
    contactName: PropTypes.object,
    contactPhone: PropTypes.object,
    total: PropTypes.object,
    idCart: PropTypes.object,
    departure: PropTypes.object,
    returns: PropTypes.object,
    onPress: PropTypes.func

};

CartCardTour.defaultProps = {
    style: {},
    // from: {
    //     name: "United State",
    //     value: "USA",
    //     image: Images.airline1,
    //     hour: "05:00"
    // },
    // to: {
    //     name: "Singapore",
    //     value: "SIN",
    //     image: Images.airline2,
    //     hour: "18:00"
    // },
    // totalHour: 13.5,
    // brand: "Vietjet",
    // image: Images.airline2,
    // type: "Economy",
    // price: "$499,99",
    // route: "Non Stop",
    // fromHour: "xx",
    // toHour: "yy",
    // fromFlight: "xx",
    // toFlight: "yy",
    // onPress: () => { },


    timeLimit:'xx',
    from: 'xx',
    to: 'xx',
    type: 'xx',
    adult: 'xx',
    children: 'xx',
    infant: 'xx',
    contactName: 'xx',
    contactPhone: 'xx',
    total: 'xx',
    idCart: 'xx',
    departure: 'xx',
    returns: 'xx',
    onPress: () => { },
};
