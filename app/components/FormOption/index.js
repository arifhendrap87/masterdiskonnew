import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "@components";
import styles from "./styles";
import Modal from "react-native-modal";
import { BaseColor } from "@config";

export default class FormOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            style: props.style,
            label:props.label,
            option:props.option,
            optionSet: props.optionSet,
            optionSelectText:props.optionSelectText,
            optionSelectValue:props.optionSelectValue,
            icon:props.icon
        };
    }

    componentDidMount() {
        //console.log(optionSelectValue);
        const { modalVisible,style, label,option,optionSet,optionSelectText,optionSelectValue } = this.state;
        this.setState({
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == optionSelectValue
                };
            })
        });
    }

    openModal() {
    
        const { modalVisible,style, label,option,optionSet,optionSelectText,optionSelectValue } = this.state;
        //console.log(optionSelectValue);
        
        this.setState({
            modalVisible: true,
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == optionSelectValue
                };
            })
        });
    }

    onSelect(select) {
        const { modalVisible,style, label,option,optionSet,optionSelectText,optionSelectValue } = this.state;
        this.setState({
            option: option.map(item => {
                return {
                    ...item,
                    checked: item.value == select.value
                };
            })
        });
        

        optionSet(select.text,select.value);
            this.setState(
                {
                    optionSelectValue: select.value,
                    modalVisible: false
                }
            );
    }



    render() {
        const { modalVisible,style, label,option,optionSet,optionSelectText,optionSelectValue,icon} = this.state;
        return (
            <View>
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => {
                        this.setState({
                            modalVisible: false,
                            option: option
                        });
                        //onCancel();
                    }}
                    onSwipeComplete={() => {
                        this.setState({
                            modalVisible: false,
                            option: option
                        });
                        //onCancel();
                    }}
                    swipeDirection={["down"]}
                    style={styles.bottomModal}
                >
                    <View style={styles.contentFilterBottom}>
                        <View style={styles.contentSwipeDown}>
                            <View style={styles.lineSwipeDown} />
                        </View>
                        {option.map((item, index) => (
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
                                    {/* {item.text} */}
                                    {(item.text.replace(/_/gi, ' ')).toUpperCase()}
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
                            <Text caption2 semibold>
                                {this.props.optionSelectText}
                            </Text>
                            </View>
                    </View>
                    
                </TouchableOpacity>
            </View>
        );
    }
}

FormOption.propTypes = {

    
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label:PropTypes.string,
    option: PropTypes.array,
    optionSet: PropTypes.func,
    optionSelectText: PropTypes.string,
    optionSelectValue: PropTypes.string,
    icon:PropTypes.string,
};

FormOption.defaultProps = {
    style: {},
    label:"",
    option:[{}],
    optionSet: () => {},
    optionSelectText: "",
    optionSelectValue: "",
    icon:"check",
};
