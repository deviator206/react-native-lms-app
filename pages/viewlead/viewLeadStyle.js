
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: "#E8E8E8"
    },
    iconStyling: {
        fontSize: 20,
        color: "#616161"
    },
    searchBarStyling: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        paddingLeft: "5%",
        paddingRight: "5%",
        borderColor: '#999999',

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
        width: "96%",
        alignSelf: "center",
        marginTop: "5%",
        marginLeft: "2%",
        marginRight: "2%"
    },
    searchAndFilterWrapper: {
        marginTop: "5%"
    },
    colLabelOnly: {
        width: "42%",
        height: 25
    },
    colValue: {
        flexDirection: 'row', flexWrap: 'wrap',
        width:"54%"
    },
    colValueThird: {
       
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
        color: "#616161",
        marginBottom: "3%"
    },
    cardViewPrimaryLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: "#616161"
    },
    cardViewPrimaryValue: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#1A1A1A"
    },
    approvedStatus: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#21A50E",
        textTransform:"uppercase"
    },
    closedStatus: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#EC2227",
        textTransform:"uppercase"
    },
    pendingStatus: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#F37C57",
        textTransform:"uppercase"
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
});
export default styleContent;