
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
        marginHorizontal: "2%",
        alignSelf: "center"
    },
    gridCardWrapper: {
        width: "96%",
        alignSelf: "center",
    },
    searchAndFilterWrapper: {
        marginTop: "2%"
    },
    colLabelOnly: {
       // width: "40%",
    },
    colValue: {

    },
    closedStatus: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: "#21A50E",
        textTransform:"uppercase"
    },
    pendingStatus: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: "#F37C57",
        textTransform:"uppercase"
    },
    cardViewMainTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        fontWeight: "bold",
        color: "#000000"
    },
    cardViewSecondaryInfo: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: "#AEAEAE",
        lineHeight: 18
    },
    cardViewPrimaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#616161"
    },
    cardViewPrimaryValue: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#000000"

    },
    circular: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'red',
        alignSelf:"flex-end",
        marginRight:"4%",
        marginBottom:"2%"

    },
    secondaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: "#616161",
        marginBottom: "3%",
        textTransform:"uppercase"
    },
    labelStyling: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        color: "#AEAEAE",
        marginTop: "5%",
        marginBottom: "2%"
    },
    addFooter:{
        backgroundColor: '#ec2227',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    addFooterText:{
        color:"#FAFAFA",
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    dynamicTextStyle: {
        color: "#000000",
        fontSize: 14,
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        marginLeft: 0,
        fontFamily: 'Montserrat-Regular'
    },
    colWidth30: {
        width: "20%"
    },
    colWidth50:{
        width: "80%"
    },
    colWidth70: {
        width: "80%"
    },
    profilePic: {
        height: 60, 
        width: 60,
        backgroundColor: "#eee", 
        borderColor: "#ddd", 
        borderWidth: 1, 
        borderRadius: 50,
        marginTop: 7
    },
    profileDetails: {
        flex: 1
    },
    profileDetailsRow: {
      marginTop: 5,
      marginLeft: 5
    },
    alignItemTOEnd: {
        alignItems: "flex-end"
    },
    profileDetailsLabel: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: "#000000"
    },
    profileDetailsValue: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: "#616161",
        alignItems: "flex-end"
    },
    profileDetailsInfo: {
        lineHeight: 18,
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 10,
        marginTop: 10
    },
    marginHorizontalRow: {
        marginHorizontal: 18,
        marginTop: 15,
        marginBottom: 5
    }
});
export default styleContent;