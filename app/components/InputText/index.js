import React, { Component } from "react";
import { View, TouchableOpacity,TextInput } from "react-native";
import PropTypes from "prop-types";
import { Text, Button, Icon } from "@components";
// import styles from "./styles";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

const styles = StyleSheet.create({
    
    formGroupContainer: {
        height: 55, 
        position: 'relative',
        width:'100%',
        // marginTop:15,
        width:'100%'
      },
      labelContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: -15,
        left: 25,
        padding: 5,
        zIndex: 50,
        
      },
      labelContainerText: {
        color:BaseColor.greyColor
      },
      labelContainerTextError: {
        color:BaseColor.thirdColor
      },
      
      iconContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: 20,
        right: 25,
        zIndex: 50,
      },
   
      errorContainer: {
          textAlign:"left",
          flex:1,
          paddingHorizontal: 10,
          color:BaseColor.thirdColor,
      },
      
      textInput: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: BaseColor.greyColor,
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingRight:45,
      },
      
      textInputError: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: BaseColor.thirdColor,
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingRight:45,
      }
});


export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
       
    }

    
    render() {
        const { 
            style, 
            name,
            label,
            placeholder,
            value,
            icon,
            onChangeText,
            isFieldInError,
            getErrorsInField
            
            
            } = this.props;
        // const { modalVisible, option, value } = this.state;
        return (
            <View style={{width:'100%',marginVertical:15}}>
                            <View style={styles.formGroupContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={isFieldInError ? styles.labelContainerTextError : styles.labelContainerText }>{label}</Text>
                                </View>
                                <Icon
                                    name={icon}
                                    color={BaseColor.greyColor}
                                    size={14}
                                    style={styles.iconContainer}
                                  />
                                <TextInput 
                                style={isFieldInError ? styles.textInputError : styles.textInput }
                                ref={name}
                                value={value}
                                onChangeText={onChangeText}
                                placeholder={placeholder}
                                />
                            </View>
                            {isFieldInError && getErrorsInField.map(errorMessage => <Text>{errorMessage}</Text>) }
                        </View>
        );
    }
}



InputText.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name:PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    onChangeText: PropTypes.func,
    isFieldInError: PropTypes.bool,
    getErrorsInField: PropTypes.array,
};

InputText.defaultProps = {
    style: {},
    name:"",
    label: "",
    placeholder: "",
    value: "",
    icon: "",
    onChangeText: () => {},
    isFieldInError:false,
    getErrorsInField:{}
};

