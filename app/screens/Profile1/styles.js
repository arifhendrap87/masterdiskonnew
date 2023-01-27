import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    contain: { alignItems: "center" },
    tourItem: {
        width: Utils.scaleWithPixel(135),
        height: Utils.scaleWithPixel(160)
    },
    hotelItem: { width: Utils.scaleWithPixel(160) },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60
    },

    location: {
        flexDirection: "row",
        marginTop: 17
    },
    tagFollow: { width: 100, marginTop: 15 },
    description: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 30,
        textAlign: "center"
    },
    contentField: {
        backgroundColor: BaseColor.fieldColor,
        paddingTop: 10,
        paddingBottom: 10
    },
    fieldItem: {
        alignItems: "center",
        flex: 1
    },
    imageBanner: {
        width: 135,
        height: 160,
        borderRadius: 10
    },
    txtBanner: {
        position: "absolute",
        left: 10,
        top: 130
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
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
    },



    cardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 20,
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    sceneContainer: {
        marginTop: 10,
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
    },
    socialRow: {
        flexDirection: 'row',
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: BaseColor.primaryColor,
        fontSize: 13.5,
        textAlign: 'center',
    },
    userImage: {
        borderRadius: 60,
        height: 120,
        marginBottom: 10,
        width: 120,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
});
