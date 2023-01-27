import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon, Button } from "@components";
import { BaseColor } from "@config";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';
// import Calendar from './src/Calendar';
// import Calendar from 'rn-date-range';
// import { CalendarList } from "react-native-common-date-picker";
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
            round: props.round,
            warning: '',
            warningText: 'Tanggal Pulang / Checkout Tidak boleh kosong',
            errorType: '',
            checkInCheckOutSame: false
        };
        this.onDateChangeAwal = this.onDateChangeAwal.bind(this);
        this.onDateChangeAkhir = this.onDateChangeAkhir.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

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

    warningValidation() {
        const { tglAkhir, tglAwal } = this.props;
        if (this.props.type != 'flight') {
            var date1 = new Date(tglAwal);
            var date2 = new Date(tglAkhir);

            console.log('tglAwal', tglAwal);
            console.log('tglAkhir', tglAkhir);


            if (date1 < date2) {
                this.setState({ warning: '' });
                this.setState({ errorType: '' });
            } else {
                this.setState({ errorType: 'tglAkhirKosong' });
                this.setState({ warning: this.state.warningText })
            }


        }
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
            //selectedStartDateBooking: this.convertDate(date),
            selectedStartDateBooking: this.convertDate(date),
        });

        setTimeout(() => {
            setBookingTimeAwal(this.state.selectedStartDateBooking);
            //this.setState({ modalVisibleAwal: false });
        }, 50);

    }


    onDateChangeAkhir(date) {
        const { navigation } = this.props;
        const { setBookingTimeAkhir } = this.props;

        this.setState({
            selectedEndDate: date,
        });

        this.setState({
            //selectedEndDateBooking: this.convertDate(date),
            selectedEndDateBooking: date,
        });



        setTimeout(() => {
            setBookingTimeAkhir(this.state.selectedEndDateBooking);
            this.setState({ modalVisibleAkhir: false });
        }, 50);

    }

    addDate(MyDate, num) {
        //var MyDate = new Date();
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth() + 1);
        var tempoDate = (MyDate.getDate() + num);
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        return MyDate.getFullYear() + '-' + tempoMonth + '-' + tempoDate;
    }

    onDateChange(date, type) {

        const { navigation } = this.props;
        const { setBookingTime, tglAkhir, tglAwal } = this.props;

        console.log('tgl awal', tglAwal)
        console.log('tglAkhir', tglAkhir)
        console.log('round', this.props.round)
        if (this.props.round == true) {
            console.log('typepilih', type);
            if (type === 'END_DATE') {
                //alert('WITH ENDADTE');
                this.setState({
                    selectedEndDate: date,
                });

                this.setState({
                    selectedEndDateBooking: date,
                });

                setTimeout(() => {
                    setBookingTime(this.state.selectedStartDateBooking, this.state.selectedEndDateBooking, this.props.round);
                    this.warningValidation();
                }, 10);


            } else {
                var dateEnd = new Date(date);
                dateEnd = this.addDate(dateEnd, 1);
                console.log('dates', dateEnd);
                this.setState({
                    selectedStartDate: date,
                    selectedEndDate: null,
                });

                this.setState({
                    selectedStartDateBooking: date,
                    selectedEndDateBooking: null,
                });

                setTimeout(() => {
                    setBookingTime(this.state.selectedStartDateBooking, this.state.selectedEndDateBooking, this.props.round);
                    this.warningValidation();
                }, 10);
            }
        } else {
            //alert('2');
            var dateEnd = new Date(date);
            dateEnd = this.addDate(dateEnd, 1);

            this.setState({
                selectedStartDate: date,
                selectedEndDate: dateEnd,
            });

            this.setState({
                selectedStartDateBooking: date,
                selectedEndDateBooking: dateEnd,
            });



            setTimeout(() => {
                console.log('selectedStartDateBooking', this.state.selectedStartDateBooking);
                console.log('selectedEndDateBooking', this.state.selectedEndDateBooking);
                console.log('round', this.props.round);
                //setBookingTimeAwal(this.state.selectedStartDateBooking);
                setBookingTime(this.state.selectedStartDateBooking, this.state.selectedEndDateBooking, this.props.round);

                //this.setState({ modalVisibleAwal: false });
            }, 10);

        }



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

        var from = new Date();
        from.setDate(from.getDate() - 16);
        var to = new Date();

        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() + 1);
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity
                    style={[styles.contentForm, { flex: 1 }, style]}
                    onPress={() => {
                        console.log('tglawal', this.getDate(minDate))
                        this.openModalAwal()
                    }}
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
                                        {tglAkhir != null ? this.convertDateText(tglAkhir) : '-'}

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
                        if (this.state.warning == '') {
                            this.setState({
                                modalVisibleAwal: false,
                                option: this.props.option
                            });
                        }


                    }}
                    onSwipeComplete={() => {
                        if (this.state.warning == '') {
                            this.setState({
                                modalVisibleAwal: false,
                                option: this.props.option
                            });
                        }
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
                                minDate={new Date()}
                                todayBackgroundColor={BaseColor.secondaryColor}
                                selectedDayColor={BaseColor.primaryColor}
                                selectedDayTextColor="#FFFFFF"
                                //onDateChange={this.onDateChangeAwal}
                                onDateChange={this.onDateChange}
                                selectedStartDate={this.props.tglAwal}
                                selectedEndDate={this.props.tglAkhir}
                            />


                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text caption1 bold style={{ color: BaseColor.thirdColor }}>{this.state.warning}</Text>
                            {
                                this.state.warning != '' ?
                                    <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: BaseColor.secondColor, paddingLeft: 3, paddingRight: 10 }}>
                                        <Icon
                                            name={'ellipse'}
                                            size={30}
                                            color={BaseColor.primaryColor}
                                        />
                                        <Text caption1 numberOfLines={2}>Tanda lingkaran berarti berangkat dan pulang di hari yang sama. Klik sekali lagi untuk menampilkan range tanggal.</Text>
                                    </View>
                                    :
                                    <View />
                            }

                        </View>
                        <Button
                            full
                            style={{
                                height: 40,
                                backgroundColor: BaseColor.primaryColor

                            }}
                            onPress={() => {

                                this.setState({
                                    modalVisibleAwal: false,
                                });

                            }}

                        >
                            <Text whiteColor>Pilih tanggal</Text>
                        </Button>
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
                                minDate={new Date()}
                                todayBackgroundColor={BaseColor.secondaryColor}
                                selectedDayColor={BaseColor.primaryColor}
                                selectedDayTextColor="#FFFFFF"
                                //onDateChange={this.onDateChangeAkhir}
                                onDateChange={this.onDateChange}
                                selectedStartDate={this.props.tglAwal}
                                selectedEndDate={this.props.tglAkhir}

                            />
                        </View>
                        <Button
                            full
                            style={{
                                height: 40,
                                backgroundColor: BaseColor.primaryColor

                            }}
                            onPress={() => {

                                this.setState({
                                    modalVisibleAkhir: false,
                                });


                            }}
                        >
                            <Text whiteColor>Pilih tanggal</Text>
                        </Button>
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
