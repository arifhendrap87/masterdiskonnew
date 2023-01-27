import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "@components";
// import styles from "./styles";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

const styles = StyleSheet.create({
    contentForm: {
        padding: 10,
        borderRadius: 8,
        width: "100%",
        backgroundColor: BaseColor.fieldColor
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


export default class FormOptionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: false,
            // option: props.option,
            // value: props.value,
            // text:props.text
        };
    }

    componentDidMount() {
        // const { option, value } = this.state;
        // this.setState({
        //     option: this.props.listdata.map(item => {
        //         return {
        //             ...item,
        //             checked: item.value == value
        //         };
        //     })
        // });
    }

    // openModal() {
    //     const { option, value } = this.state;
    //     this.setState({
    //         modalVisible: true,
    //         option: option.map(item => {
    //             return {
    //                 ...item,
    //                 checked: item.value == value
    //             };
    //         })
    //     });
    // }

    // onSelect(select) {
    //     this.setState({
    //         option: this.state.option.map(item => {
    //             return {
    //                 ...item,
    //                 checked: item.value == select.value
    //             };
    //         })
    //     });
    // }

    // onApply() {
    //     const { option, value } = this.state;
    //     const { onChange } = this.props;
    //     const selected = option.filter(item => item.checked);
    //     if (selected.length > 0) {
    //         this.props.setKelasPesawat(selected[0].text,selected[0].value);
    //         this.setState(
    //             {
    //                 value: selected[0].value,
    //                 modalVisible: false
    //             },
    //             () => {
    //                 onChange(value);
    //             }
    //         );
    //     }
    // }

    render() {
        const { style, label, onCancel } = this.props;
        const { modalVisible, option, value } = this.state;
        return (
            <View style={[styles.contentForm, style]} >
                    <Text caption2 light style={{ marginBottom: 5 }}>
                        {this.props.label}
                    </Text>
                    <Text caption1 semibold>
                        {this.props.text}
                    </Text>
               
            </View>
        );
    }
}



FormOptionEdit.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    value: PropTypes.string,
    option: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func
};

FormOptionEdit.defaultProps = {
    style: {},
    label: "Seat Class",
    value: "Economy",
    option: [
        {
            value: "Economy",
            text: "Economy Class"
        },
        {
            value: "Business",
            text: "Business Class"
        },
        {
            value: "First",
            text: "First Class"
        },
        {
            value: "Normal",
            text: "Normal Class"
        }
    ],
    onCancel: () => {},
    onChange: () => {}
};

