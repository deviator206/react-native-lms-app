
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    mainContent: {
        flex: 1
    },
    iconStylingBigger:{
        fontSize:35
    },
    iconStyling:{
        fontSize:25
    },
    searchBarStyling:{
        width: "80%",
        alignSelf:"center",
        
    },
    searchBarWrapper:{
        width: "90%",
    },
    gridWrapper:{
        width:"96%",
        marginTop:"2%",
        alignSelf:"center"
    },
    gridCardWrapper:{
        width:"95%",
        alignSelf:"center",
        backgroundColor:"yellow"
    },
    searchAndFilterWrapper:{
        marginTop:"2%"
    },
    colLabelOnly:{
        width:"40%",
    },
    colValue:{
        
    },
    cardViewMainTitle:{
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        fontWeight:"bold",
        color:"#000000"
    },
    cardViewSecondaryInfo:{
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color:"#AEAEAE"
    },
    cardViewPrimaryLabel:{
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color:"#616161"
    },
    cardViewPrimaryValue:{
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color:"#21A50E"
    }
});
export default styleContent;