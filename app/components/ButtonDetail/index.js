import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon, Button } from "@components";
import { BaseColor } from "@config";
import PropTypes from "prop-types";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contain: {
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: BaseColor.fieldColor,
        borderRadius: 8,
        width: "100%"
    },
    packageTitleContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    contentPrice: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    containItem: {
        padding: 10,
        alignItems: "center",
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1
    },
    contentTopIcon: {
        alignItems: "center",
        backgroundColor: BaseColor.fieldColor,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingBottom: 10,
        paddingTop: 10
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: BaseColor.lightPrimaryColor
    },
    lineIcon: {
        width: 48,
        height: 2,
        borderRadius: 1,
        backgroundColor: "#B1ADAD",
        marginTop: 10,
        marginBottom: 10
    },
    serviceContentIcon: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20
    },
    priceContentIcon: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
    }
});

export default class ButtonDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderPackage() {
        const {
            style,
            packageName,
            price,
            type,
            description,
            onPress,
            onPressIcon
        } = this.props;
        return (
            <View style={[styles.contain, style]}>
                {/* <View style={styles.contentPrice}>
                    <Text
                        footnote
                        accentColor
                        style={{
                            alignSelf: "flex-end"
                        }}
                    >
                        {type}
                    </Text>
                </View> */}
                <View style={styles.packageTitleContent}>
                    <Text title3>
                        {packageName}
                    </Text>
                    <TouchableOpacity onPress={onPressIcon} activeOpacity={0.9}>
                        <Icon
                            name="angle-down"
                            size={36}
                            color={BaseColor.primaryColor}
                        />
                    </TouchableOpacity>
                </View>
                
                {/* <Text caption2 numberOfLines={5} style={{ marginTop: 10 }}>
                    {description}
                </Text> */}
                {/* <Button full style={{ marginTop: 10 }} onPress={onPress}>
                    Book Now
                </Button> */}
            </View>
        );
    }

    renderPackageIcon() {
        const {
            style,
            packageName,
            price,
            type,
            services,
            onPress
        } = this.props;
        return (
            <View style={style}>
                <View style={styles.contentTopIcon}>
                    <View style={styles.icon}>
                        <Icon
                            name="tag"
                            style={{
                                fontSize: 32,
                                color: "white"
                            }}
                        />
                    </View>
                    <View style={styles.lineIcon} />
                    <Text title2 semibold>
                        {packageName}
                    </Text>
                </View>
                <View style={styles.serviceContentIcon}>
                    {services.map((item, index) => (
                        <Text
                            body2
                            grayColor
                            style={{
                                marginBottom: 20
                            }}
                            key={item.package}
                        >
                            {item.detail}
                        </Text>
                    ))}
                </View>
                <View style={styles.priceContentIcon}>
                    <Text title1 semibold primaryColor>
                        {price}
                    </Text>
                    <Text
                        footnote
                        accentColor
                        style={{
                            marginLeft: 10,
                            alignSelf: "flex-end"
                        }}
                    >
                        {type}
                    </Text>
                </View>
                <View>
                    <Button full onPress={onPress}>
                        Book Now
                    </Button>
                </View>
            </View>
        );
    }

    renderPackageDetail() {
        const {
            style,
            packageName,
            price,
            type,
            description,
            services,
            onPress
        } = this.props;
        return (
            <View style={[styles.contain, style]}>
                <View style={styles.packageTitleContent}>
                    <Text title2 semibold>
                        {packageName}
                    </Text>
                </View>
                <View style={styles.contentPrice}>
                    <Text title1 primaryColor semibold>
                        {price}
                    </Text>
                    <Text
                        footnote
                        accentColor
                        style={{
                            marginLeft: 10,
                            alignSelf: "flex-end"
                        }}
                    >
                        {type}
                    </Text>
                </View>
                <Text caption2 numberOfLines={5} style={{ marginVertical: 10 }}>
                    {description}
                </Text>
                {services.map((item, index) => (
                    <View style={styles.containItem} key={item.package}>
                        <Text headline accentColor style={{ marginBottom: 6 }}>
                            {item.name}
                        </Text>
                        <Text caption2 grayColor>
                            {item.desc}
                        </Text>
                    </View>
                ))}

                <Button full style={{ marginTop: 10 }} onPress={onPress}>
                    Book Now
                </Button>
            </View>
        );
    }

    render() {
        const { icon, detail } = this.props;
        if (icon) return this.renderPackageIcon();
        else if (detail) return this.renderPackageDetail();
        else return this.renderPackage();
    }
}

ButtonDetail.propTypes = {
    icon: PropTypes.bool,
    detail: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    packageName: PropTypes.string,
    price: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    services: PropTypes.array,
    onPress: PropTypes.func,
    onPressIcon: PropTypes.func
};

ButtonDetail.defaultProps = {
    icon: false,
    detail: false,    
    packageName: "",
    description: "",
    price: "",
    type: "",    
    services: [],
    style: {},
    onPress: () => {},
    onPressIcon: () => {}
};
