import { StyleSheet } from 'react-native';
import { default as AppConst } from '../common/consts';
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
        fontSize: 14,
        marginTop: "8%",
        fontFamily: "Montserrat-Medium"
    },
    approvedValue: {
        color: AppConst.primaryGreen,
        fontSize: 40,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    rejectedValue: {
        color: AppConst.primaryRed,
        fontSize: 40,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    closedValue: {
        color: AppConst.mediumGrey,
        fontSize: 40,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    pendingValue: {
        color: AppConst.primaryOrange,
        fontSize: 40,
        textAlign: "center",
        fontFamily: "Montserrat-Medium"
    },
    cardStyling: {
       // marginHorizontal: "4%",
        width: "94%",
        height: 130,
        justifyContent: "space-around",
        padding: "10%",
        alignItems: "center",
        backgroundColor: "#FCFCFC",
        borderRadius: 5,
    },
    roundedButton: {
        backgroundColor: AppConst.primaryRed,
        borderRadius: 30,
        alignSelf: "center",
        height: 45,
        paddingHorizontal: "5%"
    },
    datePickerStyle:{
        color:"#616161",
        fontSize:14,
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: 15
     },
    roundedButtonText: {
        color: "white",
        fontSize: 14,
        fontFamily: "Montserrat-Medium",
        textTransform: "uppercase",
        textAlign:"center"
    }
});
export default styleContent;
