import React, { Component } from "react";
import { View, TouchableOpacity,StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "@components";
//import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "@config";

const styles = StyleSheet.create({
    contentPicker: {
        paddingHorizontal: 5,
        paddingVertical:5,
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
        width: "100%",
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



export default class FormOptionQtyLong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            option: props.option,
            value: props.value,
            text:props.text
        };
    }

    componentDidMount() {
        const { option, value } = this.state;
        this.setState({
            option: this.props.listdata.map(item => {
                return {
                    ...item,
                    checked: item.value == value
                };
            })
        });
    }

    openModal() {
        const { option, value } = this.state;
        this.setState({
            modalVisible: true,
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == value
                };
            })
        });
    }

    onSelect(select) {
        this.setState({
            option: this.state.option.map(item => {
                return {
                    ...item,
                    checked: item.value == select.value
                };
            })
        });
        

        this.props.setMinPerson(select.value);
            this.setState(
                {
                    value: select.value,
                    modalVisible: false
                }
            );
    }



    render() {
        const { style, title,titleSub, onCancel,icon,label} = this.props;
        const { modalVisible, option, value } = this.state;
        return (
            <View style={[styles.contentPicker, style]}>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                        onCancel();
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            option: this.props.option
                        });
                        onCancel();
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row" }}>
                            <View>
                                                    <View>
                                                        <Text primaryColor semibold >
                                                            {title}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.iconRight}>
                                                        <Text
                                                            
                                                        >
                                                           {titleSub}
                                                        </Text>
                                                    </View>
                            </View>
                        </View>
                        {this.props.listdata.map((item, index) => (
                            <TouchableOpacity
                                style={styles.contentActionModalBottom}
                                key={item.value}
                                onPress={() => this.onSelect(item)}
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
                

                {/* <TouchableOpacity  
                style={[styles.contentForm, style]}
                onPress={() => this.openModal()}>
                            <Icon
                                name={icon}
                                size={18}
                                color={BaseColor.primaryColor}
                                style={{textAlign:'center'}}
                            />
                            <Text caption2 style={{}}>
                        {this.props.selectedText}
                        </Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                            style={[styles.contentForm, style]}
                            onPress={() => this.openModal()}
                        >
                            <View style={{flex: 1,flexDirection: "row"}}>
                                    <View style={{flex: 1,
                                                    alignItems: "flex-start",
                                                    justifyContent: "center",}}
                                                    
                                              >
                                        <Icon
                                                    name={icon}
                                                    size={14}
                                                    color={BaseColor.primaryColor}
                                        />
                                    </View>
                                    <View style={{flex: 11,
                                                    //alignItems: "flex-end",
                                                    justifyContent: "center",
                                                }}
                                                    
                                              >
                                    <Text caption2 light style={{ marginBottom: 0 }}>
                                        {label}
                                    </Text>
                                    <Text caption2 semibold numberOfLines={1}>
                                    {this.props.selectedText}
                                    </Text>
                                    </View>
                            </View>
                </TouchableOpacity>


                
                        
            </View>
        );
    }
}



FormOptionQtyLong.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    title: PropTypes.string,
    titleSub: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.string,
    option: PropTypes.array,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    listdata: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormOptionQtyLong.defaultProps = {
    style: {},
    label: "Seat Class",
    title: "Seat Class",
    titleSub: "Seat Class",
    icon: "",
    value: "E",
    option: [
        {
            value: "E",
            text: "Economy Class"
        },
        {
            value: "S",
            text: "Business Class"
        },
        {
            value: "B",
            text: "First Class"
        },
        {
            value: "F",
            text: "Normal Class"
        }
    ],
    listdata:{},
    onCancel: () => {},
    onChange: () => {}
};
