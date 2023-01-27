import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";
import PropTypes, { func } from "prop-types";
import { Text, Icon } from "@components";
// import styles from "./styles";
import { BaseColor } from "@config";
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker';


const styles = StyleSheet.create({
    contentPicker: {
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius: 8,
        flex: 1,
        //backgroundColor: BaseColor.fieldColor,
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



export default class SetDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedStartDate: null,
            selectedEndDate: null,
            selectedStartDateBooking: null,
            selectedEndDateBooking: null,
            round:props.round
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    openModal() {
        const { option, value } = this.state;
        this.setState({
            modalVisible: true,
        });
    }

    componentDidMount() {
        this.setState({
            selectedStartDate: null,
            selectedEndDate: null,
        });
    }

    convertDate(date){
        var dateString=date.toString();

        var MyDate = new Date(dateString);
        var MyDateString = '';
        MyDate.setDate(MyDate.getDate());
        var tempoMonth = (MyDate.getMonth()+1);
        var tempoDate = (MyDate.getDate());
        if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
        if (tempoDate < 10) tempoDate = '0' + tempoDate;

        var dates=MyDate.getFullYear()  + '-' +  tempoMonth  + '-' +  tempoDate;
        return dates;
      }

      onDateChange(date) {
        const { navigation } = this.props;
        const {setBookingTime}=this.props;

        this.setState({
            selectedStartDate: date,
          });

          this.setState({
            selectedStartDateBooking: this.convertDate(date),
          });
   

        setTimeout(() => {
            setBookingTime(this.state.selectedStartDateBooking);
            this.setState({modalVisible:false});
        }, 50);
      }

      convertDateText(date){
        var d = new Date(date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
        return d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
    }
  
    render() {
        const { style, label,onPress,round,tglAwal,tglAkhir} = this.props;
        const { value,modalVisible } = this.state;
        var minDate = new Date(); // Today
        minDate.setDate(minDate.getDate() + 0);
        var maxDate = new Date(2020, 10, 10);
        return (

            
                <View style={[styles.contentPicker, style]}>
                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Icon
                            name="calendar-alt"
                            size={18}
                            color={BaseColor.primaryColor}
                            style={{textAlign:'center'}}
                        />
                        <Text caption2 style={{}}>
                        {this.convertDateText(tglAwal)}
                    </Text>
                    </TouchableOpacity>
                    
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

                        <View style={{flexDirection: "row",marginLeft:-20}}>
                            <CalendarPicker
                                            startFromMonday={true}
                                            allowRangeSelection={this.state.round}
                                            minDate={minDate}
                                            //maxDate={maxDate}
                                            todayBackgroundColor="#f2e6ff"
                                            selectedDayColor={BaseColor.primaryColor}
                                            selectedDayTextColor="#FFFFFF"
                                            onDateChange={this.onDateChange}
                                            />
                        </View>
                    </View>
                </Modal>
                </View>

                
           
        );
    }
}

SetDate.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelTglAwal: PropTypes.string,
    labelTglAkhir: PropTypes.string,

    tglAwal:PropTypes.string,
    tglAkhir:PropTypes.string,

    setBookingTime:PropTypes.func,
    round:PropTypes.bool,
};

SetDate.defaultProps = {
    style: {},
    labelTglAwal: "Adults",
    labelTglAkhir: "Adults",

    tglAwal:'',
    tglAkhir:'',
    setBookingTime: () => {},
    round:false
};
