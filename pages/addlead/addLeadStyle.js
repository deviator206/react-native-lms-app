
import { StyleSheet } from 'react-native';
import { yellow } from 'ansi-colors';
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
        color:"#AEAEAE",
        fontSize: 12,
        marginTop:"4%",
        marginBottom:"0%",
        fontFamily: 'Montserrat-Medium'
    },
    dynamicComponentTextStyle :{
        color:"green",
        fontSize: 14,
        lineHeight:14,
        fontFamily: 'Montserrat-Regular',
        textTransform: "uppercase"
    },
    datePickerStyle:{
       color:"#616161",
       fontSize:14,
       fontFamily: 'Montserrat-SemiBold',
       lineHeight: 15
    },
    textAreaStyling:{
        width: '95%'
    },
    gridWrapper:{
        width:"100%",
        height: "100%",
        marginTop: 0
    },
    labelStylingSection: {
        color:"#616161",
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        fontWeight:"bold"
    },
    addBUStyling:{
        backgroundColor:"#EC2227",
        alignSelf:"center",
        marginTop:"10%",
        height:45,
        lineHeight:45
       
    }
});
export default styleContent;
