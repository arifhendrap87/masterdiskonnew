import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, IconIons } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


const styles = StyleSheet.create({
    location: {
        flexDirection: "row",
        marginTop: 10
    },
    contentTag: {
        marginLeft: 20,
        marginTop: 10,
        width: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    contentUser: {
        marginBottom: 30,
        flexDirection: "row"
    },
    imgBanner: {
        height: 335,
        width: "100%",
        position: "absolute"
    },
    imgUser: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: BaseColor.whiteColor
    },
    contentLeftUser: {
        flex: 1,
        justifyContent: "flex-end"
    },



    contentTitle: {
        alignItems: "flex-start",
        width: "100%",
        height: 32,
        justifyContent: "center"
    },
    textInput: {
        height: 56,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        padding: 10,
        width: "100%"
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    profileItem2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },

    contentActionBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },


    searchForm: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        backgroundColor: BaseColor.whiteColor,
        width: "90%",
        shadowColor: "black",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1,
        alignItems: "center",
    },

    imageBackground: {
        height: 140,
        width: "100%",
        position: "absolute",
    },
    contentBoxTop: {
        padding: 10,
        height: 120,
        width: "90%",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: BaseColor.whiteColor,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0,
        elevation: 5
    },
    item: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    contain: {
        flexDirection: "row",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        padding: 10,
        width: "100%"
    },
    thumb: { width: 48, height: 48, marginRight: 10, borderRadius: 24 },
    content: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 10
    },
    left: {
        flex: 10,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    right: {
        flex: 2,
        alignItems: "flex-end",
        justifyContent: "center"
    }
});



export default class CardCustomProfile extends Component {



    render() {
        const {
            style,
            title,
            subtitle,
            icon,
            onPress,
            nav
        } = this.props;

        var action = () => { };
        if (nav == true) {
            action = onPress;
        }
        return (
            <TouchableOpacity
                onPress={action}
                style={{ backgroundColor: BaseColor.whiteColor, paddingHorizontal: 10 }}
            >
                <View style={styles.contain}>

                    <IconIons
                        name={icon}
                        size={18}
                        color={BaseColor.primaryColor}
                    />

                    <View style={styles.content}>
                        <View style={styles.left}>
                            <Text headline semibold>
                                {title}
                            </Text>
                            <Text
                                note
                                numberOfLines={2}
                                footnote
                                grayColor
                                style={{
                                    paddingTop: 5
                                }}
                            >
                                {subtitle}
                            </Text>
                        </View>
                        {
                            nav == true ?
                                <View style={styles.right}>
                                    <Icon
                                        name="md-arrow-forward-outline"
                                        size={18}
                                        color={BaseColor.primaryColor}
                                    />
                                </View>
                                :
                                <View />
                        }


                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}

CardCustomProfile.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func,
    nav: PropTypes.bool
};

CardCustomProfile.defaultProps = {
    style: {},
    title: '',
    subtitle: '',
    icon: '',
    onPress: () => { },
    nav: true
};
