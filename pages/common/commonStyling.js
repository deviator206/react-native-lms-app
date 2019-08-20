
import { StyleSheet } from 'react-native';
import {default as AppConst} from './consts';
const styleContent = StyleSheet.create({
    fontMediumLabel: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginBottom: 10,
        height: 56,
    },
    headerTitle: {
        textAlign: "center",
        fontFamily: "Montserrat-Medium",
        fontSize: 20

    },
    headerTitleWrapper: {
        width: "70%",
        paddingTop: "4%",
        marginLeft: "3%"
    },
    headerSection: {
        backgroundColor: "#0E0D0D",
        width: "100%",
        padding: "1%"
    },
    footerSection: {
        backgroundColor: "#FFFFFF",
        width: "100%"
    },
    tabNameStyling: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: "#616161"
    },
    tabIconStyling: {
        color: "#616161",
       
        fontSize: 25
    },
    dynamicComponentTextAreaStyle: {
        color: "#000000",
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        textTransform: "uppercase",
        fontWeight: "100",
        width: '95%'
    },
    dynamicComponentTextStyle: {
        color: "#000000",
        fontSize: 14,

        height: 40,
        lineHeight: 40,
        fontFamily: 'Montserrat-Regular',
        textTransform: "uppercase",
        fontWeight: "100"
    },
    errorMsgContent: {
       // marginTop: "10%",
        //backgroundColor: "green"
    },
    errorMessageText: {
        color: AppConst.primaryRed,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginVertical: "1%"
        //marginTop: "5%"
    },
    sectionTitle: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 15,
        color: "#616161",
        marginTop: "10%",
        marginBottom: "2%",
        textTransform: "uppercase"
    },
    labelStyling: {
        color: "#AEAEAE",
        fontSize: 14,
        marginTop: "4%",
        marginBottom: "0%",
        fontFamily: 'Montserrat-Medium'
    },
    darkLabelStyling: {
        color: "#1A1A1A",
        fontSize: 15,
        fontFamily: 'Montserrat-Medium'
    },
    textUppercase: {
        textTransform: "uppercase"
    },
    inputBoxStyle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: "#1A1A1A",
        backgroundColor: "#ffffff",
        borderColor: "#D9D9D9",
        borderWidth: 1,
        borderLeftWidth: 0
    },
    modalHeaderDiv: {
        backgroundColor: "#0E0D0D",
        height: 60,
        paddingHorizontal: 20,
        paddingTop: 15,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    modalHeader: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    modalCloseBtn: {
        fontSize: 30,
        color: "#CCCCCC",
    },
    modalBody: {
        backgroundColor: "#FFFFFF",
        padding: 25
    },
    modalTextBox: {
        marginBottom: 30
    },
    modalFooter:{
        width:"100%",
        height: 50
    },
    modalButtonContent: {
        height: 50,
        justifyContent: "space-around",
        flexDirection: "row"
    },
    modalTwoButtons: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        textAlign: "center",
        height: 50,
        lineHeight: 50
    },
    primaryButton: {
        backgroundColor: "#EC2227" 
    },
    secondaryButton: {
        backgroundColor: "#44C1EE"
    },
    formGrid: {
        //backgroundColor: "red"
    },
    formGridLabel: {
        height: 50
    },
    formGridValue: {
        height: 60,
        marginBottom: 10
    }
});
export default styleContent;
