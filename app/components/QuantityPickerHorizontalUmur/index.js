import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
//import styles from "./styles";
import { BaseColor } from "@config";


const styles = StyleSheet.create({
    contentRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 10
    },
    contentResultRange: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    contentList: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    },
    contentQuest: {
        //height: 85,
        justifyContent: "space-between",
        //marginTop: 10
    },
    lineRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconRight: {
        width: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    interioItem: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginLeft: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});


export default class QuantityPickerHorizontalUmur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            minPerson: props.minPerson,

        };
    }


    onChange(type) {
        const { setMinPerson, id, idUmur } = this.props;

        var value = 0;
        var minPerson = 0;
        var valueMin = 1;
        var valueMax = 12;
        if (type == "up") {
            if (this.state.value < 12) {


                this.setState({
                    value: parseInt(this.state.value) + 1
                });
                value = parseInt(this.state.value) + 1;

                if (idUmur == 1) {
                    this.props.setUmur1(value, id, idUmur);
                } else {
                    this.props.setUmur2(value, id, idUmur);
                }

            }


        } else {
            if (this.state.value != valueMin) {
                this.setState({
                    value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
                });
                value = this.state.value - 1;

                if (idUmur == 1) {
                    this.props.setUmur1(value, id, idUmur);
                } else {
                    this.props.setUmur2(value, id, idUmur);
                }
            }



        }





    }

    render() {
        const { style, label, detail, id } = this.props;
        const { value } = this.state;
        return (

            <View style={{ paddingVertical: 5 }}>
                <View style={styles.contentQuest}>
                    <View style={styles.lineRow}>
                        <View>
                            <Text caption1>{label}</Text>
                            <Text caption1 grayColor>
                                {detail}
                            </Text>
                        </View>
                        <View style={styles.iconRight}>
                            <TouchableOpacity
                                onPress={() => this.onChange("down")}
                            >
                                <Icon
                                    name="remove-circle-outline"
                                    size={24}
                                    color={BaseColor.grayColor}
                                />
                            </TouchableOpacity>
                            <Text title1>{value}</Text>
                            <TouchableOpacity

                                onPress={() => this.onChange("up")}
                            >
                                <Icon
                                    name="add-circle-outline"
                                    size={24}
                                    color={BaseColor.primaryColor}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

QuantityPickerHorizontalUmur.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    detail: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    setMinPerson: PropTypes.func,
    minPerson: PropTypes.number,
    id: PropTypes.number,
    idUmur: PropTypes.number,
    valueMax: PropTypes.bool
};

QuantityPickerHorizontalUmur.defaultProps = {
    style: {},
    label: "Adults",
    detail: ">= 12 years",
    value: 1,
    onChange: () => { },
    setMinPerson: () => { },
    minPerson: 2,
    id: 0,
    idUmur: 0,
    valueMax: false
};
