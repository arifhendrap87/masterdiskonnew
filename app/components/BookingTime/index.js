import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text } from "@components";
import styles from "./styles";
//import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { BaseColor, FontFamily } from "@config";

export default class BookingTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            checkinTime: "",
            checkoutTime: "",
            modalVisible: false
        };
    }

    openModal(open) {
        this.setState({
            modalVisible: open
        });
    }

    render() {
        const {
            style,
            checkInTime,
            checkOutTime,
            onCancel,
            onChange
        } = this.props;
        const { modalVisible } = this.state;
        return (
            <View style={[styles.contentPickDate, style]}>
                <Modal
                    isVisible={modalVisible}
                    backdropColor="rgba(0, 0, 0, 0.5)"
                    backdropOpacity={1}
                    animationIn="fadeIn"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                >
                    <View style={styles.contentModal}>
                        <View style={styles.contentCalendar}>
                            {/* <Calendar
                                style={{
                                    borderRadius: 8
                                }}
                                markedDates={this.state.markedDates}
                                current={"2019-05-05"}
                                minDate={"2019-05-10"}
                                maxDate={"2019-05-30"}
                                onDayPress={day => {
                                    //console.log("selected day", day);
                                }}
                                onDayLongPress={day => {
                                    //console.log("selected day", day);
                                }}
                                monthFormat={"dd-MM-yyyy"}
                                onMonthChange={month => {
                                    //console.log("month changed", month);
                                }}
                                theme={{
                                    textSectionTitleColor:
                                        BaseColor.textPrimaryColor,
                                    selectedDayBackgroundColor:
                                        BaseColor.primaryColor,
                                    selectedDayTextColor: "#ffffff",
                                    todayTextColor: BaseColor.primaryColor,
                                    dayTextColor: BaseColor.textPrimaryColor,
                                    textDisabledColor: BaseColor.grayColor,
                                    dotColor: BaseColor.primaryColor,
                                    selectedDotColor: "#ffffff",
                                    arrowColor: BaseColor.primaryColor,
                                    monthTextColor: BaseColor.textPrimaryColor,
                                    textDayFontFamily: FontFamily.default,
                                    textMonthFontFamily: FontFamily.default,
                                    textDayHeaderFontFamily: FontFamily.default,
                                    textMonthFontWeight: "bold",
                                    textDayFontSize: 14,
                                    textMonthFontSize: 16,
                                    textDayHeaderFontSize: 14
                                }}
                            /> */}
                            <View style={styles.contentActionCalendar}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                        onCancel();
                                    }}
                                >
                                    <Text caption1>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                        onChange();
                                    }}
                                >
                                    <Text caption1 primaryColor>
                                        Done
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.itemPick}
                    onPress={() => this.openModal(true)}
                >
                    <Text caption1 light style={{ marginBottom: 5 }}>
                        Check In
                    </Text>
                    <Text headline semibold>
                        {checkInTime}
                    </Text>
                </TouchableOpacity>
                <View style={styles.linePick} />
                <TouchableOpacity
                    style={styles.itemPick}
                    onPress={() => this.openModal(true)}
                >
                    <Text caption1 light style={{ marginBottom: 5 }}>
                        Check Out
                    </Text>
                    <Text headline semibold>
                        {checkOutTime}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

BookingTime.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    checkInTime: PropTypes.string,
    checkOutTime: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func
};

BookingTime.defaultProps = {
    style: {},
    checkInTime: "Sun, Nov 01",
    checkOutTime: "Sun, Nov 11",
    onCancel: () => {},
    onChange: () => {}
};
