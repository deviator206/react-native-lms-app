
import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    headerSection:{
        backgroundColor:"#0E0D0D",
        width:"100%"
    },
    calenderIcon: {
        color: "black",
        fontSize: 20,
        marginTop:"30%",
        marginLeft:"10%"
      },
    mainContent:{
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
    labelStyling: {
        color:"#616161",
        fontSize: 12,
        fontFamily: 'Montserrat-Bold'
    },
    dynamicComponentTextStyle :{
        color:"red",
        fontSize: 14,
        lineHeight:14,
        fontFamily: 'Montserrat-Regular'
    },
    datePickerStyle:{
       color:"#616161",
       fontSize:14,
       fontFamily: 'Montserrat-Medium'
    },
    textAreaStyling:{
        width: '95%'
    },
    gridWrapper:{
        width:"96%",
        alignSelf:"center"
    },
    labelStylingSection: {
        color:"#616161",
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        fontWeight:"bold"
    },
    addBUStyling:{
        backgroundColor:"#EC2227",
        alignSelf:"center",
        marginTop:"5%"
    }
});
export default styleContent;
