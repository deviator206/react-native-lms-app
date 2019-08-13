
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
        marginBottom:"3%"
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
        marginBottom: "3%"
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
    }
    ,
    colValue: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginBottom:"2%"       
    },
    iconStyling: {
        fontSize: 20
    },
    primaryText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: "#1A1A1A"
    }

});
export default styleContent;
