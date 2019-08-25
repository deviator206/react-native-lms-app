
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: "#E8E8E8"
    },
    gridWrapper: {
        width: "96%",
        marginTop: "2%",
        alignSelf: "center"
    },
    gridCardWrapper: {
        width: "90%",
        alignSelf: "center",
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    noCard:{
        backgroundColor:"red",
        width: "90%",
        alignSelf: "center",
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%"
    },
    customerName: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: "#000000",
        marginVertical:"2%",
        textTransform: "capitalize"
    },
    requirement: {
        fontSize: 14,
        lineHeight:20,
        fontFamily: 'Montserrat-Regular',
        color: "#616161"
    },
    secondaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: "#616161",
        marginBottom: "3%",
        textTransform:"uppercase"
    },
    secondaryTextDesignation:{
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: "#AEAEAE",
        marginTop:"1%"
    },
    secondaryText: {
        fontSize: 12,
        lineHeight:18,
        fontFamily: 'Montserrat-Medium',
        color: "#AEAEAE",
        marginBottom: "3%"
    }
    ,
    secondaryDarkText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#1A1A1A",
        marginLeft:"3%"
    },
    colValue: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginBottom:"2%" ,   
        backgroundColor:"red"
    },
    iconStyling: {
        fontSize: 20
    },
    primaryText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: "#1A1A1A",
        textTransform:"capitalize"
    },
    colValueThird: {
       
    },
    colValue: {
        flexDirection: 'row', flexWrap: 'wrap',
        width:"85%"
    },
    textAreaStyling:{
        width: '95%'
    },
    marginTopStyling:{
        marginTop:"3%"
      },
    approvedStatusCircle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor:"#21A50E",
    },

    rejectedStatusCircle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor: 'red',
    },
    needMoreStatusCircle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor: 'black',
    },

    pendingStatusCircle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor: "#F37C57",
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
    modalSm: {
        height: "40%",
        backgroundColor: "yellow"
    }
});
export default styleContent;
