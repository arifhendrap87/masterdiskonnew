import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import DatePicker from 'react-native-datepicker'
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import CalendarPicker from 'react-native-calendar-picker';


// Load sample data
import { UserData } from "@data";
import Timeline from 'react-native-timeline-flatlist';


const styles = StyleSheet.create({
  contentTitle: {
    alignItems: "flex-start",
    width: "100%",
    height: 32,
    justifyContent: "center"
  },
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: BaseColor.grayColor
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },

  // container: {
  //   flex: 1,
  //   padding: 20,
  // paddingTop:65,
  //   backgroundColor:'white'
  // },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -10
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },
  image: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 3

  },
  textDescription: {
    marginLeft: 10,
    color: 'black'
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


export default class FlightDetail extends Component {
  constructor(props) {
    super(props);
    var select = this.props.navigation.state.params.select;
    console.log('select', JSON.stringify(select));
    var detailPrice = select.detail;

    var price = detailPrice.price;
    var perPax = price.perPax;




    var data_timeline = [];
    var a = 0;
    for (const item of select.detail.flight) {
      data_timeline.push(this.timeline_from(item));
      data_timeline.push(this.timeline_to(item));
    }


    this.state = {
      select: select,
      detailPrice: detailPrice,
      price: price,
      perPax: perPax,
      data_timeline: data_timeline
    };

    this.renderDetail = this.renderDetail.bind(this)
  }

  timeline_from(item) {
    var imageUrl = '';
    imageUrl = item.image;
    var data = {
      time: item.departure.time,
      title: item.departure.name + ' (' + item.departure.code + ')',
      operation: item.name,
      description: 'Keberangkatan :' + item.departure.date + ' ' + item.departure.time,
      lineColor: '#009688',
      icon: Images.dot,
      imageUrl: imageUrl,
      baggage: item.baggage,
      meal: item.amenities.meal,
      smoke: item.amenities.smoke,
      type: 'from',
      seat: item.code + ' | ' + item.class
    }
    console.log('timeline_from', JSON.stringify(data));
    return data;

  }


  timeline_to(item) {
    var imageUrl = '';
    imageUrl = item.image;
    var data = {
      time: item.arrival.time,
      title: item.arrival.name + ' (' + item.arrival.code + ')',
      operation: item.name,
      description: 'Sampai :' + item.arrival.date + ' ' + item.arrival.time,
      lineColor: '#009688',
      icon: Images.dot,
      imageUrl: imageUrl,
      baggage: item.baggage,
      meal: item.amenities.meal,
      smoke: item.amenities.smoke,
      type: 'to',
      seat: item.code + ' | ' + item.class
    }
    console.log('timeline_to', JSON.stringify(data));
    return data
  }

  convertDateText(date) {
    var d = new Date(date);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = null;
    if (rowData.type == 'from') {
      if (rowData.description && rowData.imageUrl)
        desc = (
          <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 2, borderWidth: 1, borderColor: BaseColor.textSecondaryColor }}>
                <Image source={{ uri: rowData.imageUrl }} style={styles.image} resizeMode="contain" />
              </View>
              <View style={{ flex: 10 }}>
                <Text style={[styles.textDescription]}>{rowData.seat}</Text>
                <Text style={[styles.textDescription]}>{rowData.operation}</Text>
              </View>
              <View>
              </View>
            </View>
            <View style={[styles.descriptionContainer]}>
              <Text caption1 style={{ marginLeft: 0, color: BaseColor.primaryColor }} bold>{rowData.description}</Text>
            </View>
          </View>
        )
    } else {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text caption1 style={{ marginLeft: 0, color: BaseColor.primaryColor }} bold>{rowData.description}</Text>
        </View>
      )
    }



    var baggage = 'No';
    var meal = 'No';
    var facility = null;

    facility = <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={[styles.contentFilter, { marginLeft: 0 }]}
      >
        <Icon
          name="suitcase"
          size={16}
          color={BaseColor.thirdColor}
          solid
        />
        <Text caption1 style={{ marginLeft: 5, color: BaseColor.thirdColor }}>
          : {baggage} kg
        </Text>

      </View>


      <View
        style={styles.contentFilter}
      >
        <Icon
          name="md-fast-food-outline"
          size={16}
          color={BaseColor.thirdColor}
          solid
        />
        <Text caption1 style={{ marginLeft: 5, color: BaseColor.thirdColor }}>
          : {meal}
        </Text>

      </View>
    </View>


    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
        {/* {facility} */}
      </View>
    )
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

  render() {
    const { navigation } = this.props;
    const { selectedStartDate, selectedEndDate } = this.state;
    var information = [
      { title: "County", detail: 'asd' },
      { title: "Category", detail: 'asd' },
      { title: "Duration", detail: 'asdsad' },
    ]
    const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Detail"
          renderLeft={() => {
            return (
              <Icon
                name="md-arrow-back"
                size={20}
                color={BaseColor.whiteColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => { }}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={{ paddingHorizontal: 0, flex: 1 }}>
              <Timeline
                data={this.state.data_timeline}
                circleSize={20}
                circleColor={BaseColor.primaryColor}
                lineColor={BaseColor.primaryColor}
                timeContainerStyle={{ minWidth: 40, marginTop: 0 }}
                timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                descriptionStyle={{ color: 'gray' }}
                options={{
                  style: { paddingTop: 5 }
                }}
                //innerCircle={'icon'}
                onEventPress={this.onEventPress}
                renderDetail={this.renderDetail}
              />
            </View>

            <View style={{ paddingHorizontal: 0, flex: 1, marginBottom: 20 }}>
              <Text style={[styles.title]}>Info</Text>
              {
                this.state.select.detail?.flight[0]?.amenities?.baggage?.cabin?.adt?.desc ?
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      borderBottomColor:
                        BaseColor.textSecondaryColor,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text caption2 bold>
                      Baggage Cabin
                    </Text>
                    <Text caption2 bold >
                      {this.state.select.detail?.flight[0]?.amenities?.baggage?.cabin?.adt?.desc}
                    </Text>
                  </View>
                  :
                  <View />
              }

              {
                this.state.select.detail?.flight[0]?.amenities?.baggage?.cabin?.adt?.desc ?
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      borderBottomColor:
                        BaseColor.textSecondaryColor,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text caption2 bold>
                      Baggage Checkin
                    </Text>
                    <Text caption2 bold >
                      {this.state.select.detail?.flight[0]?.amenities?.baggage?.checkin?.adt?.desc}
                    </Text>
                  </View>
                  :
                  <View />
              }

              {
                this.state.select.detail?.flight[0]?.amenities?.meal ?
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      borderBottomColor:
                        BaseColor.textSecondaryColor,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text caption2 bold>
                      Meal
                    </Text>
                    <Text caption2 bold >
                      {this.state.select.detail?.flight[0]?.amenities?.meal == true ? 'Include' : 'Not Include'}
                    </Text>
                  </View>
                  :
                  <View />
              }
            </View>


            <View style={{ paddingHorizontal: 0, flex: 1 }}>
              <Text style={[styles.title]}>Tarif</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                  borderBottomColor:
                    BaseColor.textSecondaryColor,
                  borderBottomWidth: 1
                }}
              >
                <Text caption2 bold>
                  Adult
                </Text>
                <Text caption2 bold >
                  {this.state.perPax.adult.count} x Rp {priceSplitter(this.state.perPax.adult.amount)}
                </Text>
              </View>

              {this.state.perPax.child.count != 0 ?

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 5,
                    borderBottomColor:
                      BaseColor.textSecondaryColor,
                    borderBottomWidth: 1
                  }}
                >
                  <Text caption2 bold>
                    Child
                  </Text>
                  <Text caption2 bold >
                    {this.state.perPax.child.count} x Rp {priceSplitter(this.state.perPax.child.amount)}
                  </Text>
                </View>
                :
                <View />
              }

              {this.state.perPax.infant.count != 0 ?
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 5,
                    borderBottomColor:
                      BaseColor.textSecondaryColor,
                    borderBottomWidth: 1
                  }}
                >
                  <Text caption2 bold>
                    Infant
                  </Text>
                  <Text caption2 bold >
                    {this.state.perPax.infant.count} x Rp {priceSplitter(this.state.perPax.infant.amount)}
                  </Text>
                </View>
                :
                <View />
              }

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                  borderBottomColor:
                    BaseColor.textSecondaryColor,
                  borderBottomWidth: 1
                }}
              >
                <Text caption2 bold>
                  Tax
                </Text>
                <Text caption2 bold >
                  Rp {priceSplitter(this.state.price.tax)}
                </Text>
              </View>


              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                  borderBottomColor:
                    BaseColor.textSecondaryColor,
                  borderBottomWidth: 1
                }}
              >
                <Text caption2 bold>
                  Fee
                </Text>
                <Text caption2 bold >
                  Rp {priceSplitter(this.state.price.fee)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                  borderBottomColor:
                    BaseColor.textSecondaryColor,
                  borderBottomWidth: 1
                }}
              >
                <Text caption2 bold>
                  Protection (CIU Insurance)
                </Text>
                <Text caption2 bold >
                  Rp {priceSplitter(this.state.price.iwjr)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                  // borderBottomColor:
                  // BaseColor.textSecondaryColor,
                  // borderBottomWidth: 1
                }}
              >
                <Text caption2 bold style={{ color: BaseColor.primaryColor }}>
                  Grand Total
                </Text>
                <Text caption2 bold style={{ color: BaseColor.primaryColor }}>
                  Rp {priceSplitter(this.state.price.total)}
                </Text>
              </View>



            </View>
          </View>
        </ScrollView>

      </SafeAreaView>
    );
  }
}
