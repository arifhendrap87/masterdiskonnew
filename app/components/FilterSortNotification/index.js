import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { Icon, Text, Button } from "@components";
import PropTypes from "prop-types";
import { BaseColor, BaseStyle } from "@config";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    contain: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    line: {
        width: 1,
        height: 14,
        backgroundColor: BaseColor.grayColor,
        marginLeft: 10
    },
    contentFilter: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 0

    },
    contentFilterBottom: {
        width: "100%",
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        paddingHorizontal: 20,
        backgroundColor: BaseColor.whiteColor,
        height: 400,
        paddingVertical: 10
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


export default class FilterSortNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: props.orderStatus,
            sortSelected: props.sortSelected,
            modalVisible: false,
            value: props.value,
            keyword: "",
            status: ""
        };
        this.onSetStatus = this.onSetStatus.bind(this);
    }

    componentDidMount() {
        const { orderStatus, sortSelected } = this.state;

    }





    onApply() {
        const { orderStatus } = this.state;
        const { onChangeSort } = this.props;
        const sorted = orderStatus.filter(item => item.checked);
        if (sorted.length > 0) {
            this.setState({
                //sortSelected: sorted[0],
                modalVisible: false
            });
        }
    }
    onSetStatus(selected) {
        const { orderStatus } = this.state;
        this.setState({ status: selected.id })
        // this.setState({
        //     orderStatus: orderStatus.map(item => {
        //         return {
        //             ...item,
        //             checked: item.value == selected.value
        //         };
        //     })
        // });

    }

    onOpenSort() {
        const { orderStatus, sortSelected } = this.state;
        this.setState({
            modalVisible: true,
            orderStatus: orderStatus.map(item => {
                return {
                    ...item,
                    checked: item.value == sortSelected.value
                };
            })
        });
    }

    onChange(type) {
        const { id, valueMax, valueMin } = this.props;
        console.log('valueMax', valueMax);

        var value = this.props.value;
        var minPerson = 0;
        console.log(type);
        if (type == "up") {
            if (valueMax == false) {


                // this.setState({
                //     value: parseInt(this.state.value) + 1
                // });
                value = parseInt(this.props.value) + 1;


            } else {
                // this.setState({
                //     value: parseInt(this.state.value) + 0
                // });
                value = parseInt(this.props.value) + 0;


            }

            console.log(value);
            this.props.setPagination(value);



        } else {
            if (this.props.value != valueMin) {
                // this.setState({
                //     value: this.state.value - 1 > 0 ? parseInt(this.state.value) - 1 : 0
                // });
                value = this.props.value - 1

                this.props.setPagination(value);
            }


        }




    }


    render() {
        const {
            style,
            modeView,
            onFilter,
            onClear,
            onChangeView,
            sortProcess,
            banyakData, banyakPage
        } = this.props;
        const { orderStatus, modalVisible, sortSelected, value } = this.state;

        return (
            <View style={[styles.contain, style]}>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: 'center' }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => this.onChange("down")}
                    >
                        <Icon
                            name={'ios-caret-back-outline'}
                            size={24}
                            color={BaseColor.primaryColor}
                            solid
                        />

                    </TouchableOpacity>
                    <Text headline grayColor style={{ marginHorizontal: 5 }}>
                        Page {this.props.value} - {banyakPage}
                    </Text>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => this.onChange("up")}
                    >
                        <Icon
                            name={'ios-caret-forward-outline'}
                            size={24}
                            color={BaseColor.primaryColor}
                            solid
                        />

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

FilterSortNotification.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    orderStatus: PropTypes.array,
    sortSelected: PropTypes.object,
    modeView: PropTypes.string,
    onChangeView: PropTypes.func,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    sortProcess: PropTypes.func,

    banyakData: PropTypes.number,
    banyakPage: PropTypes.number,

    value: PropTypes.number,
    valueMax: PropTypes.bool,
    valueMin: PropTypes.number
};

FilterSortNotification.defaultProps = {
    style: {},

    orderStatus: [
    ],
    sortSelected: {
        value: "high_rate",
        icon: "sort-amount-up",
        text: "Sort"
    },
    modeView: "",

    //onChangeSort: () => {},
    onChangeView: () => { },
    onFilter: () => { },
    onClear: () => { },
    sortProcess: () => { },


    banyakData: 0,
    banyakPage: 0,
    value: 1,
    valueMax: false,
    valueMin: 1
};
