import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import { Text, Icon,QuantityPicker } from "@components";
// import styles from "./styles";
import { BaseColor } from "@config";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    contentPicker: {
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0,
        borderColor: BaseColor.fieldColor,
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
        margin: 0
    },
    contentFilterBottom: {
        width: "100%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: "center"
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor
    },
    contentActionModalBottom: {
        flexDirection: "row",
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    }
});



export default class SetPenumpang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    openModal() {
        const { option, value } = this.props;
        this.setState({
            modalVisible: true,
        });
    }
    

    render() {
        const { 
            style,
            label,
            dewasa,
            anak,
            bayi,
            setJumlahDewasa,
            setJumlahAnak,
            setJumlahBayi,
            minPersonDef,
            minPerson,
            minPrice,
            totalPrice,
            setMinPerson,
            maksPersonRoom,
            sisaPersonRoom,
            includeBayi,
            type
        } = this.props;
        const {modalVisible } = this.state;
        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));


        var contentLabel=<View></View>

        if(totalPrice != 0){
        contentLabel=<View style={{ marginTop: 20, flexDirection: "row" }}>
                        <View>                  
                                                <View style={styles.iconRight}>
                                                    <Text
                                                        headline primaryColor
                                                        style={{ paddingHorizontal: 10}}
                                                    >
                                                        Rp {priceSplitter(totalPrice)}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text caption2 style={{ paddingHorizontal: 10 }}>
                                                        {minPerson} x Rp {priceSplitter(minPrice)}
                                                    </Text>
                                                </View>
                                                
                        </View>
                    </View>
        }

        contentBayi=<View></View>

        if(includeBayi==true){
        contentBayi=<QuantityPicker
                                    label="Infants"
                                    detail="<= 2 years"
                                    value={bayi}
                                    setJumlahBayi={setJumlahBayi}
                                    typeOld="3"
                                    minPerson={minPerson}
                                    minPersonDef={minPersonDef}
                                    setMinPerson={setMinPerson}
                                    maksPersonRoom={maksPersonRoom}
                                    sisaPersonRoom={sisaPersonRoom}
                                    type={type}
                                />
        }
        return (
            <View style={[styles.contentPicker, style]}>

                    <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                    >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>

                        {contentLabel}
                        <View style={{ marginTop: 20, flexDirection: "row" }}>
                                <QuantityPicker
                                    label="Adults"
                                    detail=">= 12 years"
                                    value={dewasa}
                                    setJumlahDewasa={setJumlahDewasa}
                                    typeOld="1"
                                    minPerson={minPerson}
                                    minPersonDef={minPersonDef}
                                    setMinPerson={setMinPerson}
                                    maksPersonRoom={maksPersonRoom}
                                    sisaPersonRoom={sisaPersonRoom}
                                    type={type}
                                />
                        
                        
                                <QuantityPicker
                                    label="Children"
                                    detail="2 - 12 years"
                                    value={anak}
                                    style={{ marginHorizontal: 15 }}
                                    setJumlahAnak={setJumlahAnak}
                                    typeOld="2"
                                    minPerson={minPerson}
                                    minPersonDef={minPersonDef}
                                    setMinPerson={setMinPerson}
                                    maksPersonRoom={maksPersonRoom}
                                    sisaPersonRoom={sisaPersonRoom}
                                    type={type}
                                />
                                {contentBayi}
                                
                        </View>
                    </View>
                    </Modal>


                        <TouchableOpacity onPress={() => this.openModal()}>
                            <Icon
                                name="user"
                                size={18}
                                color={BaseColor.primaryColor}
                                style={{textAlign:'center'}}
                            />
                            <Text caption2 style={{}}>
                            {label} Orang
                        </Text>
                        </TouchableOpacity>
                        

                    </View>
        );
    }
}

SetPenumpang.propTypes = {
    // style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // label: PropTypes.string,
    // minPriceDef: PropTypes.number,
    // minPrice: PropTypes.number,
    // minPerson: PropTypes.number,
    // totalPrice:PropTypes.number,
    // maksPersonRoom:PropTypes.number,
    // sisaPersonRoom:PropTypes.number,
    // exclude:PropTypes.string,
    // onPress: PropTypes.func
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    dewasa: PropTypes.string,
    anak: PropTypes.string,
    bayi: PropTypes.string,
    setJumlahDewasa: PropTypes.func,
    setJumlahAnak:PropTypes.func,
    setJumlahBayi:PropTypes.func,
    minPersonDef:PropTypes.number,
    minPerson:PropTypes.number,
    minPrice:PropTypes.number,
    totalPrice:PropTypes.number,
    setMinPerson:PropTypes.func,
    maksPersonRoom:PropTypes.number,
    sisaPersonRoom:PropTypes.number,
    includeBayi:PropTypes.bool,
    type: PropTypes.string,
    
    
};

SetPenumpang.defaultProps = {
    style: {},
    label: "",
    dewasa: "",
    anak: "",
    bayi: "",
    setJumlahDewasa: () => {},
    setJumlahAnak:() => {},
    setJumlahBayi:() => {},
    minPersonDef:0,
    minPerson:0,
    minPrice:0,
    totalPrice:0,
    setMinPerson:() => {},
    maksPersonRoom:0,
    sisaPersonRoom:0,
    includeBayi:true,
    type:'',
};
