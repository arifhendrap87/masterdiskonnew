import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Button } from "@components";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    contain: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
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


export default class FilterSortProduct extends Component {
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
                        this.setState({ modalVisible: false });
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
                                        name="check"
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
                        color={BaseColor.grayColor}
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
                            color={BaseColor.grayColor}
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
                            color={BaseColor.grayColor}
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

FilterSortProduct.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    sortOption: PropTypes.array,
    sortSelected: PropTypes.object,
    modeView: PropTypes.string,
    onChangeView: PropTypes.func,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    sortProcess: PropTypes.func,
};

FilterSortProduct.defaultProps = {
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
};
