import React, { Component } from "react";
import {
  View,
  FlatList,
  Switch,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  BookingTime,
  Tag,
  StarRating,
  Button,
} from "@components";
import RangeSlider from "rn-range-slider";
import * as Utils from "@utils";
import { StyleSheet, Dimensions } from "react-native";
import { DataLoading, DataConfig, DataHotelLinx, DataTrip } from "@data";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  contain: {
    paddingVertical: 10,
    width: "100%",
    marginBottom: 150
  },
  roundLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  contentRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  contentResultRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineCategory: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default class HotelLinxFilter extends Component {
  constructor(props) {
    super(props);
    var filterParam = this.props.navigation.state.params.filterParam;
    console.log("----------------filterParam ------------------------------------");
    console.log(JSON.stringify(filterParam));


    var paramFilter = this.props.navigation.state.params.paramFilter;
    console.log("----------------paramFilter ------------------------------------");
    console.log(JSON.stringify(paramFilter));

    this.state = {
      filterParam: filterParam,
      paramFilter: paramFilter,

      listdata: DataHotelLinx,
      scrollEnabled: true,
      priceBegin: 0,
      priceEnd: 15000000,

      rate: [
        // { id: "ALL", selected: true, title: "All" },
        { id: 5, selected: false },
        { id: 4, selected: false },
        { id: 3, selected: false },
        { id: 2, selected: false },
        { id: 1, selected: false },
      ],
      toDo: [],
      //toDo: props.navigation.state.params.paramFilter.filterToDo,
      facilities: props.navigation.state.params.paramFilter.filterFacilities,
      roomFacilities:
        props.navigation.state.params.paramFilter.filterRoomFacilities,

      numTodoDef: 5,
      numTodo: props.navigation.state.params.paramFilter.filterToDo.length,

      numFacilitiesDef: 5,
      numFacilities:
        props.navigation.state.params.paramFilter.filterFacilities.length,

      numRoomFacilitiesDef: 5,
      numRoomFacilities:
        props.navigation.state.params.paramFilter.filterRoomFacilities.length,

      recommendFilter: false,
      filterRecommended: "",
      filterRate: [],
      filterName: "",
      filterToDo: [],
      filterRoomFacilities: [],
      filterPropertyType: [],
      filterFacilities: [],
      filterDisability: [],
      filterBrand: [],
    };
  }

  rebuildFacilities(listdata) {
    var listdata_new = [];
    var a = 1;
    listdata.map((item) => {
      var obj = {};

      obj["id"] = item.id_property_facilities;
      obj["name"] = item.facilities_name;
      obj["slug"] = item.facilities_slug;
      obj["selected"] = false;

      listdata_new.push(obj);
      a++;
    });

    return listdata_new;
  }

  componentDidMount() {
    const { filterParam, rate } = this.state;
    console.log("paramFilter", this.state.paramFilter);
    console.log("toDo", this.state.toDo);

    //filter name
    if (filterParam?.filter_name) {
      this.setState({ filterName: filterParam.filter_name });
    }

    //filter rekomended
    if (filterParam?.filter_recommended) {
      if (filterParam.filter_recommended != '') {
        this.setState({ recommendFilter: true });

      } else {
        this.setState({ filterName: false });

      }
    }

    //filter rating
    if (filterParam?.filter_rating) {
      console.log('filter_rating', JSON.stringify(filterParam.filter_rating));
      console.log('rate', JSON.stringify(rate));

      rate.forEach(x => {
        x.selected = this.checkFilter(filterParam.filter_rating, x.id) == 0 ? false : true;
      })
      console.log('rateafter', JSON.stringify(rate));
      this.setState({ rate: rate });

      setTimeout(() => {
        var filterRate = [];
        var rate = this.state.rate;
        for (const item of rate) {
          if (item.selected == true) {
            filterRate.push(item.id);
          }
        }
        console.log("rateterpilih", JSON.stringify(filterRate));
        this.setState({ filterRate: filterRate });
      }, 50);

    }

    //filer todo
    this.setState({
      toDo: this.rebuildFacilities(this.state.paramFilter.filterToDo),
    });

    setTimeout(() => {
      if (filterParam?.filter_todo) {
        console.log('filter_todo', JSON.stringify(filterParam.filter_todo));
        console.log('toDo', JSON.stringify(toDo));
        var toDo = this.state.toDo;
        toDo.forEach(x => {
          x.selected = this.checkFilter(filterParam.filter_todo, x.id) == 0 ? false : true;
        })
        console.log('todoafter', JSON.stringify(toDo));
        this.setState({ toDo: toDo });

        var filterToDo = [];
        for (const item of toDo) {
          if (item.selected == true) {
            filterToDo.push(item.id);
          }
        }
        this.setState({ filterToDo: filterToDo });
      }
    }, 50);





    //filter facilities
    this.setState({
      facilities: this.rebuildFacilities(
        this.state.paramFilter.filterFacilities
      ),
    });

    setTimeout(() => {
      if (filterParam?.filter_facilities) {
        console.log('filter_facilities', JSON.stringify(filterParam.filter_facilities));
        console.log('facilities', JSON.stringify(facilities));
        var facilities = this.state.facilities;
        facilities.forEach(x => {
          x.selected = this.checkFilter(filterParam.filter_facilities, x.id) == 0 ? false : true;
        })
        console.log('todoafter', JSON.stringify(facilities));
        this.setState({ facilities: facilities });

        var filterFacilities = [];
        for (const item of facilities) {
          if (item.selected == true) {
            filterFacilities.push(item.id);
          }
        }
        this.setState({ filterFacilities: filterFacilities });
      }
    }, 50);

    //



    this.setState({
      roomFacilities: this.rebuildFacilities(
        this.state.paramFilter.filterRoomFacilities
      ),
    });

    setTimeout(() => {
      if (filterParam?.filter_roomFacilities) {
        console.log('filter_roomFacilities', JSON.stringify(filterParam.filter_roomFacilities));
        console.log('roomFacilities', JSON.stringify(roomFacilities));
        var roomFacilities = this.state.roomFacilities;
        roomFacilities.forEach(x => {
          x.selected = this.checkFilter(filterParam.filter_roomFacilities, x.id) == 0 ? false : true;
        })
        console.log('todoafter', JSON.stringify(roomFacilities));
        this.setState({ roomFacilities: roomFacilities });

        var filterRoomFacilities = [];
        for (const item of roomFacilities) {
          if (item.selected == true) {
            filterRoomFacilities.push(item.id);
          }
        }
        this.setState({ filterRoomFacilities: filterRoomFacilities });
      }
    }, 50);

  }

  checkFilter(array, str) {
    const result = array.filter(arr => arr == str);
    return result.length;
  }

  toggleSwitchRecommend = (value) => {
    this.setState({ recommendFilter: value });
    if (value == true) {
      this.setState({ filterRecommended: "Recommended" });
    } else {
      this.setState({ filterRecommended: "" });
    }
  };

  onSelectRate(selected) {
    this.setState({
      rate: this.state.rate.map((item) => {
        return {
          ...item,
          selected: selected.id == item.id ? !item.selected : item.selected,
        };
      }),
    });

    setTimeout(() => {
      var filterRate = [];
      var rate = this.state.rate;
      for (const item of rate) {
        if (item.selected == true) {
          filterRate.push(item.id);
        }
      }
      console.log("rateterpilih", JSON.stringify(filterRate));
      this.setState({ filterRate: filterRate });
    }, 50);
  }

  onSelectTodo(selected) {
    console.log("todoSelect", JSON.stringify(this.state.toDo));
    this.setState({
      toDo: this.state.toDo.map((item) => {
        return {
          ...item,
          selected: selected.id == item.id ? !item.selected : item.selected,
        };
      }),
    });

    setTimeout(() => {
      var filterToDo = [];
      var toDo = this.state.toDo;
      for (const item of toDo) {
        if (item.selected == true) {
          filterToDo.push(item.id);
        }
      }
      console.log("todoterpilih", JSON.stringify(filterToDo));

      this.setState({ filterToDo: filterToDo });
    }, 50);
  }

  onSelectFacilities(selected) {
    console.log("toDo", JSON.stringify(this.state.facilities));
    this.setState({
      facilities: this.state.facilities.map((item) => {
        return {
          ...item,
          selected: selected.id == item.id ? !item.selected : item.selected,
        };
      }),
    });

    setTimeout(() => {
      var filterFacilities = [];
      var facilities = this.state.facilities;
      for (const item of facilities) {
        if (item.selected == true) {
          filterFacilities.push(item.id);
        }
      }
      this.setState({ filterFacilities: filterFacilities });
    }, 50);
  }

  onSelectRoomFacilities(selected) {
    console.log("toDo", JSON.stringify(this.state.roomFacilities));
    //alert('Masih onprogress');
    this.setState({
      roomFacilities: this.state.roomFacilities.map((item) => {
        return {
          ...item,
          selected: selected.id == item.id ? !item.selected : item.selected,
        };
      }),
    });

    setTimeout(() => {
      var filterRoomFacilities = [];
      var roomFacilities = this.state.roomFacilities;
      for (const item of roomFacilities) {
        if (item.selected == true) {
          filterRoomFacilities.push(item.id);
        }
      }
      this.setState({ filterRoomFacilities: filterRoomFacilities });
    }, 50);
  }

  submitFilter() {
    const { navigation } = this.props;
    const {
      priceBegin,
      priceEnd,
      filterRate,
      filterRecommended,
      filterName,
      filterToDo,
      filterFacilities,
      filterRoomFacilities,
    } = this.state;
    var filterMergeFacilities = filterToDo.concat(
      filterFacilities,
      filterRoomFacilities
    );
    console.log("filterMergeFacilities", JSON.stringify(filterMergeFacilities));
    const filter = {
      filter_name: filterName,
      filter_recommended: filterRecommended,
      filter_rating: filterRate,
      filter_todo: filterToDo,
      filter_facilities: filterFacilities,
      filter_price: [priceBegin, priceEnd],
      filter_name: filterName,
      filter_roomFacilities: filterRoomFacilities
    };

    var param = this.props.navigation.state.params.param;
    if (filter.filter_rating.length != 0) {
      param.ratingH = filter.filter_rating.toString();
    } else {
      param.ratingH = "";
    }

    if (filterMergeFacilities.length != 0) {
      param.amenities = filterMergeFacilities;
    } else {
      param.amenities = [];
    }

    if (filter.filter_recommended == "Recommended") {
      param.rHotel = "true";
    } else {
      param.rHotel = "";
    }

    if (filter.filter_name != "") {
      param.srcdata = filter.filter_name;
      param.search = filter.filter_name;
    } else {
      param.srcdata = "";
      param.search = filter.filter_name;
    }
    param.startkotak = "0";

    //param.minimbudget = filter.filter_price[0].toString();
    param.minimbudget = filter.filter_price[0].toString();
    param.maximbudget = filter.filter_price[1].toString();

    console.log("parammmmm", JSON.stringify(param));
    console.log("filterssss", JSON.stringify(filter));

    this.props.navigation.state.params.filterProcess(param, filter);
    navigation.goBack();
  }

  filterProcess(filters) {
    var products = this.state.listdata;
    const filtered = this.filterArray(products, filters);
    console.log("filtered", JSON.stringify(filtered));
  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        // ignores non-function predicates
        if (typeof filters[key] !== "function") return true;
        return filters[key](item[key]);
      });
    });
  }

  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  generateFilter(data, defNum, type) {
    var xx = [];
    console.log("banyakdata", data.length);
    var i = 0;
    console.log("type", type);
    console.log("generateFilterdata", JSON.stringify(data));
    data.map((item, index) => {
      if (i <= defNum) {
        xx.push(
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.lineCategory,
              i != defNum
                ? {
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }
                : {},
            ]}
            onPress={() => {
              this.onSelectTodo(item);
              if (type == "todo") {
                this.onSelectTodo(item);
              } else if (type == "faci") {
                this.onSelectFacilities(item);
              } else if (type == "room") {
                this.onSelectRoomFacilities(item);
              }
            }}
          >
            <Icon
              name={
                item.selected ? "checkmark-circle-outline" : "ellipse-outline"
              }
              size={24}
              color={BaseColor.primaryColor}
            />
            <Text caption1 style={{ marginLeft: 10 }}>
              {this.capitalize(item.name)}
            </Text>
          </TouchableOpacity>
        );
      }
      i++;
    });

    return xx;
  }
  render() {
    const { navigation } = this.props;
    const { round, scrollEnabled, priceBegin, priceEnd, rate, toDo } = this.state;
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          { backgroundColor: BaseColor.primaryColor },
        ]}
        forceInset={{ top: "always" }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FFFFFF",
            flex: 1,
            height: 45,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></View>
        <View style={{ backgroundColor: BaseColor.bgColor, flex: 1 }}>
          <Header
            title="Filter"
            renderLeft={() => {
              return (
                <Icon
                  name="md-arrow-back"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            // renderRight={() => {
            //   return (
            //     <Text caption1 whiteColor numberOfLines={1}>
            //       Apply
            //     </Text>
            //   );
            // }}
            onPressLeft={() => navigation.goBack()}
          //onPressRight={() => this.submitFilter()}
          />
          <ScrollView
            scrollEnabled={scrollEnabled}
            onContentSizeChange={(contentWidth, contentHeight) =>
              this.setState({
                scrollEnabled: Utils.scrollEnabled(contentWidth, contentHeight),
              })
            }
          >
            <View style={styles.contain}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <TextInput
                  style={BaseStyle.textInput}
                  onChangeText={(text) => {
                    this.setState({ filterName: text });
                  }}
                  value={this.state.filterName}
                  defaultValue={this.state.filterName}
                  autoCorrect={true}
                  placeholder={this.state.filterName == '' ? 'Cari berdasarkan nama' : this.state.filterName}
                  placeholderTextColor={BaseColor.grayColor}
                  selectionColor={BaseColor.primaryColor}
                />
              </View>

              <View
                style={[
                  { flexDirection: "row", marginHorizontal: 20 },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 10,
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text caption1 semibold>
                      Rekomendasi
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Switch
                    name="angle-right"
                    size={18}
                    onValueChange={this.toggleSwitchRecommend}
                    value={this.state.recommendFilter}
                  />
                </View>
              </View>

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <View style={{}}>
                  <Text caption1 bold>
                    Rating
                  </Text>
                </View>

                <View style={{}}>
                  {rate.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        style={[
                          styles.lineCategory,
                          index != rate.length - 1
                            ? {
                              borderBottomColor: "grey",
                              borderBottomWidth: 1,
                            }
                            : {},
                        ]}
                        onPress={() => this.onSelectRate(item)}
                      >
                        <Icon
                          name={
                            item.selected
                              ? "checkmark-circle-outline"
                              : "ellipse-outline"
                          }
                          size={24}
                          color={BaseColor.primaryColor}
                        />
                        <StarRating
                          disabled={true}
                          starSize={20}
                          maxStars={5}
                          rating={item.id}
                          //selectedStar={rating => {}}
                          fullStarColor={BaseColor.yellowColor}
                          style={{ marginLeft: 20 }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                    height:
                      this.state.numTodoDef == this.state.toDo.length
                        ? this.state.numTodoDef * 39
                        : this.state.numTodoDef * 60,
                  },
                ]}
              >
                <View style={{}}>
                  <Text caption1 bold>
                    To Do
                  </Text>
                </View>
                <View style={{}}>
                  {this.generateFilter(
                    toDo,
                    this.state.numTodoDef,
                    "todo"
                  )}
                </View>

                {this.state.toDo.length <= 5 ? (
                  <View />
                ) : this.state.numTodoDef == this.state.toDo.length ? (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({ numTodoDef: 5 });
                    }}
                  >
                    <Text bold>Tutup</Text>
                  </Button>
                ) : (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({ numTodoDef: this.state.toDo.length });
                    }}
                  >
                    <Text bold>Lihat Lebih Banyak</Text>
                  </Button>
                )}
                {/* <View style={{}}>
                                    {this.state.toDo.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index.toString()}
                                                style={styles.lineCategory}
                                                onPress={() => this.onSelectTodo(item)}
                                            >
                                                <Icon
                                                    name={
                                                        item.selected
                                                            ? "checkmark-circle-outline"
                                                            : "ellipse-outline"
                                                    }
                                                    size={24}
                                                    color={BaseColor.primaryColor}
                                                />
                                                <Text caption1 style={{ marginLeft: 10 }}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View> */}
              </View>

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <View style={{}}>
                  <Text caption1 semibold>
                    Facilities
                  </Text>
                </View>
                <View style={{}}>
                  {this.generateFilter(
                    this.state.facilities,
                    this.state.numFacilitiesDef,
                    "faci"
                  )}
                </View>
                {this.state.facilities.length <= 5 ? (
                  <View />
                ) : this.state.numFacilitiesDef ==
                  this.state.facilities.length ? (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({ numFacilitiesDef: 5 });
                    }}
                  >
                    <Text bold>Tutup</Text>
                  </Button>
                ) : (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({
                        numFacilitiesDef: this.state.facilities.length,
                      });
                    }}
                  >
                    <Text bold>Lihat Lebih Banyak</Text>
                  </Button>
                )}
              </View>

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <View style={{}}>
                  <Text caption1 bold>
                    Room Facilities
                  </Text>
                </View>
                <View style={{}}>
                  {this.generateFilter(
                    this.state.roomFacilities,
                    this.state.numRoomFacilitiesDef,
                    "room"
                  )}
                </View>
                {this.state.roomFacilities.length <= 5 ? (
                  <View />
                ) : this.state.numRoomFacilitiesDef ==
                  this.state.roomFacilities.length ? (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({ numRoomFacilitiesDef: 5 });
                    }}
                  >
                    <Text bold>Tutup</Text>
                  </Button>
                ) : (
                  <Button
                    style={{
                      height: 30,
                      marginTop: 10,
                      width: "100%",
                      borderRadius: 10,
                      backgroundColor: '#bbb'
                    }}
                    onPress={() => {
                      this.setState({
                        numRoomFacilitiesDef: this.state.roomFacilities.length,
                      });
                    }}
                  >
                    <Text bold>Lihat Lebih Banyak</Text>
                  </Button>
                )}
              </View>

              {/* <View style={styles.roundLine}>
                                <Text caption1 semibold>
                                    Disablity
                            </Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 20 }}>
                                {this.state.paramFilter.filterDisability.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index.toString()}
                                            style={styles.lineCategory}
                                            onPress={() => this.onSelectTransits(item)}
                                        >
                                            <Icon
                                                name={
                                                    item.selected
                                                        ? "checkmark-circle-outline"
                                                        : "ellipse-outline"
                                                }
                                                size={24}
                                                color={BaseColor.primaryColor}
                                            />
                                            <Text caption1 style={{ marginLeft: 10 }}>
                                                {item.facilities_name}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View> */}

              {/* <View style={styles.roundLine}>
                                <Text caption1 semibold>
                                    Brand
                            </Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 20 }}>
                                {this.state.paramFilter.filterBrand.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index.toString()}
                                            style={styles.lineCategory}
                                            onPress={() => this.onSelectTransits(item)}
                                        >
                                            <Icon
                                                name={
                                                    item.selected
                                                        ? "checkmark-circle-outline"
                                                        : "ellipse-outline"
                                                }
                                                size={24}
                                                color={BaseColor.primaryColor}
                                            />
                                            <Text caption1 style={{ marginLeft: 10 }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View> */}

              {/* <View style={styles.roundLine}>
                                <Text caption1 semibold>
                                    Property Type
                            </Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 20 }}>
                                {this.state.paramFilter.filterPropertyType.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index.toString()}
                                            style={styles.lineCategory}
                                            onPress={() => this.onSelectTransits(item)}
                                        >
                                            <Icon
                                                name={
                                                    item.selected
                                                        ? "checkmark-circle-outline"
                                                        : "ellipse-outline"
                                                }
                                                size={24}
                                                color={BaseColor.primaryColor}
                                            />
                                            <Text caption1 style={{ marginLeft: 10 }}>
                                                {item.name_property_type}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View> */}

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginHorizontal: 20,
                    marginBottom: 10,
                  },
                  {
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    marginBottom: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 10,
                  },
                ]}
              >
                <View style={{}}>
                  <Text caption1 semibold>
                    BUDGET
                  </Text>
                  <View style={styles.contentRange}>
                    <Text caption1 grayColor>
                      Rp 0
                    </Text>
                    <Text caption1 grayColor>
                      Rp 15.000.000
                    </Text>
                  </View>
                  <RangeSlider
                    style={{
                      width: "100%",
                      height: 40,
                    }}
                    thumbRadius={12}
                    lineWidth={5}
                    gravity={"center"}
                    labelStyle="none"
                    min={0}
                    max={10000000}
                    step={50000}
                    selectionColor={BaseColor.primaryColor}
                    blankColor={BaseColor.textSecondaryColor}
                    onValueChanged={(low, high, fromUser) => {
                      this.setState({
                        priceBegin: low,
                        priceEnd: high,
                      });
                    }}
                    onTouchStart={() => {
                      this.setState({
                        scrollEnabled: false,
                      });
                    }}
                    onTouchEnd={() => {
                      this.setState({
                        scrollEnabled: true,
                      });
                    }}
                  />
                  <View style={styles.contentResultRange}>
                    <Text caption1>Range Price</Text>
                    <Text caption1>
                      IDR {priceSplitter(priceBegin)} - IDR{" "}
                      {priceSplitter(priceEnd)}
                    </Text>
                  </View>
                </View>


              </View>
            </View>
          </ScrollView>
          <View
            style={[
              {
                position: "absolute", //Here is the trick
                bottom: 0, //Here is the trick,
                height: height / 10,
                backgroundColor: BaseColor.whiteColor,
                flex: 1,
                width: "100%",
                flexDirection: "row",
                paddingVertical: 20,
                justifyContent: "space-between",
                paddingHorizontal: 20,
              },
            ]}
          >
            <Button
              full
              style={{
                height: 40,
                borderRadius: 10,
                width: "100%",
                backgroundColor: BaseColor.primaryColor,
              }}
              onPress={() => {
                this.submitFilter()
                //this.scroll.scrollTo({ y: screenHeight });
              }}
            >
              <Text caption1 bold whiteColor>
                Terapkan Filter
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
