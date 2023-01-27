import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      //dataReal: props.dataReal,
      expanded: true,
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  // componentDidMount() {
  //   this.setState({ dataReal: this.props.dataReal });
  // }

  render() {

    return (
      <View>
        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={false}
              renderItem={({ item, index }) =>
                <View>
                  <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]} onPress={() => this.onClick(index)}>
                    <Text style={[styles.font, styles.itemInActive]} >{item.key}</Text>
                    {/* <Icon name={'check-circle'} size={24} color={item.value ? Colors.GREEN : Colors.LIGHTGRAY} /> */}
                  </TouchableOpacity>
                  <View style={styles.childHr} />
                </View>
              } />
          </View>
        }

      </View>
    )
  }

  onClick = (indexs) => {

    array = this.state.data.map(function (item) {
      item.value = false;
      return item;
    });


    const temp = this.state.data.slice();
    temp[indexs].value = !temp[indexs].value
    console.log('temp', JSON.stringify(temp));
    this.setState({ data: temp })

    this.props.setChoose(this.state.data[indexs]);


  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });

    setTimeout(() => {
      this.props.checkExpand(this.props.title, this.state.expanded, this.props.index);
    }, 300);

  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.DARKGRAY,
  },
  itemActive: {
    fontSize: 12,
    color: Colors.GREEN,
  },
  itemInActive: {
    fontSize: 12,
    color: Colors.DARKGRAY,
  },
  btnActive: {
    borderColor: Colors.GREEN,
  },
  btnInActive: {
    borderColor: Colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.CGRAY,
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.GRAY,
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%'
  },
  childHr: {
    height: 1,
    backgroundColor: Colors.LIGHTGRAY,
    width: '100%',
  },
  colorActive: {
    borderColor: Colors.GREEN,
  },
  colorInActive: {
    borderColor: Colors.DARKGRAY,
  }

});