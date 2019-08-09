
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    mainContent: {
        flex:0.8,
        backgroundColor:"#FFFFFF",
        width: "100%",
        height: '100%'
    },
    addLeadFooter:{
        backgroundColor: '#ec2227',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    addLeadFooterText:{
        color:"#FAFAFA",
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    dynamicComponentTextStyle :{
        color:"#616161",
    },
    textAreaStyling:{
        width: '95%'
    },
    iconStylingBigger: {
        fontSize: 35
    },
    iconStyling: {
        fontSize: 25
    },
    searchBarStyling: {
        width: "80%",
        alignSelf: "center",
        backgroundColor:"#FFFFFF"

    },
    searchBarWrapper: {
        width: "90%",
    },
    gridWrapper: {
        width: "96%",
        marginTop: "2%",
        alignSelf: "center"
    },
    gridCardWrapper: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "yellow"
    },
    searchAndFilterWrapper: {
        marginTop: "2%"
    },
    colLabelOnly: {
        width: "40%",
    },
    colValue: {

    },
    cardViewMainTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        fontWeight: "bold",
        color: "#000000"
    },
    cardViewSecondaryInfo: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#AEAEAE"
    },
    cardViewPrimaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#616161"
    },
    cardViewPrimaryValue: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#21A50E"
    },
    addLeadFooter: {
        backgroundColor: '#ec2227',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        borderRadius: 90

    },
    circular: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'red',
        alignSelf:"flex-end",
        marginRight:"4%",
        marginBottom:"2%"

    }
});
export default styleContent;