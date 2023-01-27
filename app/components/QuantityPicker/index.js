import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
import styles from "./styles";
import { BaseColor } from "@config";

export default class QuantityPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            minPerson: props.minPerson,
            minPersonDef: props.minPersonDef,
            maksPersonRoom: props.maksPersonRoom,
            sisaPersonRoom: props.sisaPersonRoom,
            type: props.type,
        };
    }


    onChange(types) {
        const { setMinPerson, sisaPersonRoom } = this.props;


        var values = 0;
        var minPerson = 0;
        if (types == "up") {
            if (this.state.type == 'hotel_package_room') {
                if (sisaPersonRoom == 0) {
                } else if (sisaPersonRoom != 0) {
                    this.setState({
                        value: parseInt(this.state.value) + 1
                    });
                    values = parseInt(this.state.value) + 1;

                    this.setState({
                        minPerson: parseInt(this.state.minPerson) + 1
                    });
                    minPerson = parseInt(this.state.minPerson) + 1;
                    setMinPerson(minPerson);

                    if (this.props.typeOld == '1') {
                        this.props.setJumlahDewasa(values);

                    } else if (this.props.typeOld == '2') {
                        this.props.setJumlahAnak(values);

                    } else if (this.props.typeOld == '3') {
                        this.props.setJumlahBayi(values);
                    }

                }
            } else {
                this.setState({
                    value: parseInt(this.state.value) + 1
                });
                values = parseInt(this.state.value) + 1;

                this.setState({
                    minPerson: parseInt(this.state.minPerson) + 1
                });
                minPerson = parseInt(this.state.minPerson) + 1;
                setMinPerson(minPerson);

                if (this.props.typeOld == '1') {
                    this.props.setJumlahDewasa(values);

                } else if (this.props.typeOld == '2') {
                    this.props.setJumlahAnak(values);

                } else if (this.props.typeOld == '3') {
                    this.props.setJumlahBayi(values);
                }
            }
        } else {
            if (this.props.typeOld == '1') {

                if (this.state.value > this.state.minPersonDef) {
                    this.setState({
                        value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
                    });
                    values = this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0

                    this.setState({
                        minPerson: this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
                    });
                    minPerson = this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0

                    setMinPerson(minPerson);
                    this.props.setJumlahDewasa(values);
                } else {
                    minPerson = this.state.minPersonDef;

                    setMinPerson(minPerson);
                    this.props.setJumlahDewasa(minPerson);


                }
            } else if (this.props.typeOld == '2') {

                if (this.state.value != 0) {
                    this.setState({
                        value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
                    });
                    values = this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0

                    this.setState({
                        minPerson: this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
                    });
                    minPerson = this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
                    setMinPerson(minPerson);
                    this.props.setJumlahAnak(values);


                }
            } else if (this.props.typeOld == '3') {

                if (this.state.value != 0) {
                    this.setState({
                        value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
                    });
                    values = this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0

                    this.setState({
                        minPerson: this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
                    });
                    minPerson = this.state.minPerson - 1 > 0 ? parseInt(this.state.minPerson) - 1 : 0
                    setMinPerson(minPerson);
                    this.props.setJumlahBayi(values);


                }
            }

        }

        //setMinPerson(minPerson);


    }

    render() {
        const { style, label, detail } = this.props;
        const { value } = this.state;
        return (
            <View style={[styles.contentPicker, style]}>
                <Text caption1 style={{ marginBottom: 5 }}>
                    {label}
                </Text>
                <Text caption1 light style={{ marginBottom: 5 }}>
                    {detail}
                </Text>
                <TouchableOpacity onPress={() => {
                    this.onChange("up")

                }}>
                    <Icon
                        name="add-circle-outline"
                        size={24}
                        color={BaseColor.primaryColor}
                    />
                </TouchableOpacity>
                <Text title1>{value}</Text>
                <TouchableOpacity onPress={() => {

                    this.onChange("down")
                }}>
                    <Icon
                        name="remove-circle-outline"
                        size={24}
                        color={BaseColor.primaryColor}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

QuantityPicker.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    detail: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    setMinPerson: PropTypes.func,
    minPerson: PropTypes.number,
    minPersonDef: PropTypes.number,
    maksPersonRoom: PropTypes.number,
    sisaPersonRoom: PropTypes.number,
    type: PropTypes.string,

};

QuantityPicker.defaultProps = {
    style: {},
    label: "Adults",
    detail: ">= 12 years",
    value: 1,
    onChange: () => { },
    setMinPerson: () => { },
    minPerson: 2,
    minPersonDef: 2,
    maksPersonRoom: 0,
    sisaPersonRoom: 0,
    type: ''

};
