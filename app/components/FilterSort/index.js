import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Icon, Text, Button } from "@components";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
import Modal from "react-native-modal";

export default class FilterSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOption: props.sortOption,
            sortSelected: props.sortSelected,
            modalVisible: false
        };
    }

    componentDidMount() {
        const { sortOption, sortSelected } = this.state;
        this.setState({
            sortOption: sortOption.map(item => {
                return {
                    ...item,
                    checked: item.value == sortSelected.value
                };
            })
        });
    }


    onSelectFilter(selected) {
        const { sortOption } = this.state;
        this.setState({
            sortOption: sortOption.map(item => {
                return {
                    ...item,
                    checked: item.value == selected.value
                };
            })
        });
        
        this.props.sortProcess(selected.value);
        
        setTimeout(() => {
            this.onApply();
        }, 50);
    }
    
    
    onApply() {
        const { sortOption } = this.state;
        const { onChangeSort } = this.props;
        const sorted = sortOption.filter(item => item.checked);
        if (sorted.length > 0) {
            this.setState({
                sortSelected: sorted[0],
                modalVisible: false
            });
        }
    }
    

    onOpenSort() {
        const { sortOption, sortSelected } = this.state;
        this.setState({
            modalVisible: true,
            sortOption: sortOption.map(item => {
                return {
                    ...item,
                    checked: item.value == sortSelected.value
                };
            })
        });
    }


    render() {
        const {
            style,
            modeView,
            onFilter,
            onClear,
            onChangeView,
            sortProcess,
        } = this.props;
        const { sortOption, modalVisible, sortSelected } = this.state;
        
        return (
            <View style={[styles.contain, style]}>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({modalVisible:false});
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            sortOption: this.props.sortOption
                        });
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {sortOption.map((item, index) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.value}
                                onPress={() => this.onSelectFilter(item)}
                            >
                                <Text
                                    body2
                                    semibold
                                    primaryColor={item.checked}
                                >
                                    {item.text}
                                </Text>
                                {item.checked && (
                                    <Icon
                                        name="checkmark-outline"
                                        size={14}
                                        color={BaseColor.primaryColor}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}

                    </View>
                </Modal>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => this.onOpenSort()}
                >
                    <Icon
                        name={'funnel-outline'}
                        size={16}
                        color={BaseColor.primaryColor}
                        solid
                    />
                    <Text headline grayColor style={{ marginLeft: 5 }}>
                        {sortSelected.text}
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={onFilter}
                        style={styles.contentFilter}
                    >
                        <Icon
                            name="filter"
                            size={16}
                            color={BaseColor.primaryColor}
                            solid
                        />
                        <Text headline grayColor style={{ marginLeft: 5 }}>
                            Filter
                        </Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClear}
                        style={styles.contentFilter}
                    >
                        <Icon
                            name="reload-outline"
                            size={16}
                            color={BaseColor.primaryColor}
                            solid
                        />
                        <Text headline grayColor style={{ marginLeft: 5 }}>
                            Refresh
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

FilterSort.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    sortOption: PropTypes.array,
    sortSelected: PropTypes.object,
    modeView: PropTypes.string,
    onChangeView: PropTypes.func,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    sortProcess: PropTypes.func,
};

FilterSort.defaultProps = {
    style: {},
    sortOption: [
        {
            value: "low_price",
            icon: "sort-amount-up",
            text: "Harga Terendah"
        },
        {
            value: "hight_price",
            icon: "sort-amount-down",
            text: "Harga Tertinggi"
        },

        {
            value: "early_departure_time",
            icon: "sort-amount-up",
            text: "Berangkat Paling Awal"
        },
        {
            value: "end_departure_time",
            icon: "sort-amount-down",
            text: "Berangkat Paling Akhir"
        },

        {
            value: "early_arrival_time",
            icon: "sort-amount-up",
            text: "Tiba Paling Awal"
        },
        {
            value: "end_arrival_time",
            icon: "sort-amount-down",
            text: "Tiba Paling Akhir"
        },
        {
            value: "shortest_duration",
            icon: "sort-amount-down",
            text: "Durasi Tersingkat"
        },
    ],
    sortSelected: {
        value: "high_rate",
        icon: "funnel-outline",
        text: "Sort"
    },
    modeView: "",
    //onChangeSort: () => {},
    onChangeView: () => {},
    onFilter: () => {},
    onClear: () => {},
    sortProcess: () => {},
};
