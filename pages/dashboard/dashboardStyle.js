import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    sectionOne: {
        flex: 1.4,
        width: "100%",
        paddingTop: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F3F3"
    },
    sectionTwo: {
        flex: 0.5,
        width: "100%",
        backgroundColor: "#F3F3F3"
    },
    sideMenu: {
        color: "white"
    },
    footerSection: {
        backgroundColor: "#FFFFFF",
        width: "100%"
    },
    tabNameStyling: {
        fontSize: 12,
        color: "#616161"
    },
    tabIconStyling: {
        color: "black",
        fontSize: 25
    },
    footerSingleTab: {

    },
    headerSection: {
        backgroundColor: "#0E0D0D",
        width: "100%",
        alignItems: "center"
    },
    headerSection1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "red",
        alignItems: "center"
    },
    overlapSection: {
        position: "absolute",
        width: "100%",
        color: "white"

    },
    gridSection: {
        paddingLeft: "3%",
        paddingRight: "3%"
    },
    whiteColor: {
        color: "white"
    },
    dashboardText: {
        color: "white",
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    },
    labelStyling: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: "#AEAEAE",
        lineHeight: 35
    },
    cardHeader: {
        color: "#AEAEAE",
        fontSize: 15,
        fontFamily: "Montserrat-Medium"
    },
    approvedValue: {
        color: "#8BBF45",
        fontSize: 41,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    rejectedValue: {
        color: "#EC2227",
        fontSize: 41,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    closedValue: {
        color: "#000000",
        fontSize: 41,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    pendingValue: {
        color: "#F37C57",
        fontSize: 41,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    cardStyling: {
        margin: "4%",
        width: "85%",
        padding: "10%",
        alignItems: "center",
        backgroundColor: "#FCFCFC",
        borderRadius: 5,
    },
    roundedButton: {
        backgroundColor: "red",
        borderRadius: 20,
        alignSelf: "center",
    },
    roundedButtonText: {
        color: "white",
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        textTransform: "uppercase",
        textAlign:"center"
    }
});
export default styleContent;
