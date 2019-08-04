
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
    }
});
export default styleContent;
