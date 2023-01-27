import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
import { BaseColor } from "@config";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';


const styles = StyleSheet.create({
    contentPicker: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 0,
        borderColor: BaseColor.fieldColor,
    },

    contentForm: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        //width: "50%",
        borderBottomColor: BaseColor.fieldColor,
        borderBottomWidth: 2,

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
        backgroundColor: BaseColor.whiteColor,
        paddingBottom: 50,
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
    },
    contentPickDate: {
        borderRadius: 8,
        borderWidth: 3,
        borderColor: BaseColor.fieldColor,
        flex: 6,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
});



export default class SetDateLong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisibleAwal: false,
            modalVisibleAkhir: false,
            selectedStartDate: null,
            selectedEndDate: null,
            selectedStartDateBooking: null,
            selectedEndDateBooking: null,
            round: props.round
        };
        this.onDateChangeAwal = this.onDateChangeAwal.bind(this);
        this.onDateChangeAkhir = this.onDateChangeAkhir.bind(this);
    }
    convertDateText(date) {
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }
    openModalAwal() {
        const { option, value } = this.state;
        this.setState({
            modalVisibleAwal: true,
        });
    }

    openModalAkhir() {
        const { option, value } = this.state;
        this.setState({
            modalVisibleAkhir: true,
        });
    }

    componentDidMount() {
        this.setState({
            selectedStartDate: null,
            selectedEndDate: null,
        });
    }

    convertDate(date) {
        var dateString = date.toString();

        var MyDate = new Date(dateString);
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate());
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        var dates = MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
        return dates;
    }

    onDateChangeAwal(date) {
        const { navigation } = this.props;
        const { setBookingTimeAwal } = this.props;

        this.setState({
            selectedStartDate: date,
        });

        this.setState({
            selectedStartDateBooking: this.convertDate(date),
        });


        setTimeout(() => {
            setBookingTimeAwal(this.state.selectedStartDateBooking);
            this.setState({ modalVisibleAwal: false });
        }, 50);

    }


    onDateChangeAkhir(date) {
        const { navigation } = this.props;
        const { setBookingTimeAkhir } = this.props;

        this.setState({
            selectedEndDate: date,
        });

        this.setState({
            selectedEndDateBooking: this.convertDate(date),
        });



        setTimeout(() => {
            setBookingTimeAkhir(this.state.selectedEndDateBooking);
            this.setState({ modalVisibleAkhir: false });
        }, 50);

    }

    onDateChange(date, type) {
        const { navigation } = this.props;
        const { setBookingTime } = this.props;

        // if(this.props.round==true){
        //   if (type === 'END_DATE') {

        //     this.setState({
        //       selectedEndDate: date,
        //     });

        //     this.setState({
        //       selectedEndDateBooking: this.convertDate(date),
        //     });

        //     setTimeout(() => {
        //         setBookingTime(this.state.selectedStartDateBooking,this.state.selectedEndDateBooking,this.props.round);
        //         this.setState({modalVisibleAwal:false});
        //      }, 50);


        //   } else {
        //     this.setState({
        //       selectedStartDate: date,
        //       selectedEndDate: null,
        //     });

        //     this.setState({
        //       selectedStartDateBooking: this.convertDate(date),
        //       selectedEndDateBooking: null,
        //     });
        //   }
        // }else{

        //   this.setState({
        //     selectedStartDate: date,
        //     selectedEndDate: null,
        //   });

        //   this.setState({
        //     selectedStartDateBooking: this.convertDate(date),
        //     selectedEndDateBooking: null,
        //   });


        // setTimeout(() => {
        //     setBookingTime(this.state.selectedStartDateBooking,this.state.selectedEndDateBooking,this.props.round);
        //     this.setState({modalVisibleAwal:false});
        // }, 50);

        // }



    }

    getDate(num) {
        var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;

    }



    render() {
        const { style, label, onPress, round, tglAwal, tglAkhir, icon, minDate } = this.props;
        const { value, modalVisibleAwal, modalVisibleAkhir } = this.state;
        // var minDate = new Date(); // Today
        // minDate.setDate(minDate.getDate() + 0);
        // var maxDate = new Date(2020, 10, 10);
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    style={[styles.contentForm, { flex: 1 }, style]}
                    onPress={() => this.openModalAwal()}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View style={{
                            flex: round == true ? 2 : 1,
                            alignItems: "flex-start",
                            justifyContent: "center",
                        }}

                        >
                            <Icon
                                name={icon}
                                size={14}
                                color={BaseColor.primaryColor}
                            />
                        </View>
                        <View style={{
                            flex: 10,
                            //alignItems: "flex-end",
                            justifyContent: "center",
                        }}

                        >
                            <Text caption2 light style={{ marginBottom: 0 }}>
                                {this.props.labelTglAwal}
                            </Text>
                            <Text caption2 semibold>
                                {this.convertDateText(tglAwal)}

                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {
                    round ?

                        <TouchableOpacity
                            style={[styles.contentForm, { flex: 1 }, style]}
                            onPress={() => this.openModalAkhir()}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View style={{
                                    flex: round == true ? 2 : 1,
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                }}

                                >
                                    <Icon
                                        name={icon}
                                        size={14}
                                        color={BaseColor.primaryColor}
                                    />
                                </View>
                                <View style={{
                                    flex: 10,
                                    //alignItems: "flex-end",
                                    justifyContent: "center",
                                }}

                                >
                                    <Text caption2 light style={{ marginBottom: 0 }}>
                                        {this.props.labelTglAkhir}
                                    </Text>
                                    <Text caption2 semibold>
                                        {this.convertDateText(tglAkhir)}

                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        :
                        <View></View>
                }



                <Modal
                    transparent={true}
                    isVisible={modalVisibleAwal}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisibleAwal: false,
                            option: this.props.option
                        });
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisibleAwal: false,
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

                        <View style={{ flexDirection: "row", marginLeft: -20 }}>


                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={false}
                                minDate={this.getDate(minDate)}
                                todayBackgroundColor={BaseColor.secondaryColor}
                                selectedDayColor={BaseColor.primaryColor}
                                selectedDayTextColor="#FFFFFF"
                                onDateChange={this.onDateChangeAwal}
                            />
                        </View>
                    </View>
                </Modal>



                <Modal
                    isVisible={modalVisibleAkhir}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisibleAkhir: false,
                            option: this.props.option
                        });
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisibleAkhir: false,
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

                        <View style={{ flexDirection: "row", marginLeft: -20 }}>


                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={false}
                                minDate={tglAwal}
                                todayBackgroundColor={BaseColor.secondaryColor}
                                selectedDayColor={BaseColor.primaryColor}
                                selectedDayTextColor="#FFFFFF"
                                onDateChange={this.onDateChangeAkhir}
                            />
                        </View>
                    </View>
                </Modal>




            </View>
        );
    }
}

SetDateLong.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelTglAwal: PropTypes.string,
    labelTglAkhir: PropTypes.string,

    tglAwal: PropTypes.string,
    tglAkhir: PropTypes.string,

    setBookingTimeAwal: PropTypes.func,
    setBookingTimeAkhir: PropTypes.func,
    round: PropTypes.bool,
    icon: PropTypes.string,
    minDate: PropTypes.number

};

SetDateLong.defaultProps = {
    style: {},
    labelTglAwal: "Berangkat",
    labelTglAkhir: "Pulang",

    tglAwal: '',
    tglAkhir: '',
    setBookingTimeAwal: () => { },
    setBookingTimeAkhir: () => { },
    round: false,
    icon: "check",
    minDate: 0
};
