
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor:"#E8E8E8"
    },
    inputBox: {
        paddingLeft: 20
    },
    iconStylingBigger: {
        fontSize: 25
    },
    iconStyling: {
        fontSize: 25
    },
    searchIcon: {
        paddingRight: 5
    },
    searchBarStyling: {
        width: "90%",
        marginLeft: 20,
        //alignSelf: "center",
        backgroundColor:"#FFFFFF",
        borderWidth: 1,
        borderColor: "#999999"

    },
    searchBarWrapper: {
        width: "90%",
        marginTop: 10
    },
    filterBtnIcon: {
        marginTop: 12
    },
    gridWrapper: {
        width: "96%",
        marginTop: "2%",
        alignSelf: "center"
    },
    gridCardWrapper: {
        width: "96%",
        alignSelf: "center",
        marginTop: "4%",
        marginLeft: "2%",
        marginRight: "2%"
    },
    searchAndFilterWrapper: {
        marginTop: "2%"
    },
    colLabelOnly: {
        width: "50%"
    },
    colValue: {
        width: "50%",
        justifyContent: "space-around",
        alignItems: "flex-end"
    },
    cardViewMainTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: "#000000",
        marginBottom: "3%"
    },
    cardViewSecondaryInfo: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: "#555555"
    },
    cardViewPrimaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: "#616161",
        marginTop: "2%",
        marginBottom: "2%"
    },
    cardViewPrimaryValue: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: "black"
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
    addLeadFooter: {
        backgroundColor: '#ec2227',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        borderRadius: 90

    },
    calenderIcon: {
        color: "black",
        fontSize: 20,
        marginTop:"30%",
        marginLeft:"10%"
      },
    datePickerStyle:{
        color:"#616161",
        fontSize:14,
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: 15
     },
    floatingButtonView: {
        backgroundColor: "#E8E8E8"
    },
    floatingButton: {
       // position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#EC2227',
        bottom: 5,
        right: 15,
        alignSelf:"flex-end",

    }
});
export default styleContent;