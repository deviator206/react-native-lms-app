import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    sectionOne: {
        flex: 1.4,
        width:"100%",
        paddingTop: "4%",
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: "#0E0D0D"
    },
    sectionTwo: {
        flex: 0.5,
        width:"100%",
        backgroundColor: "#F3F3F3"
    },
    sideMenu: {
        color:"white"
    },
    footerSection:{
        backgroundColor: "#FFFFFF",
        width:"100%"
    },
    tabNameStyling:{
        fontSize:12,
        color:"#616161"
    },
    tabIconStyling: {
       color:"black",
       fontSize:25
    },
    footerSingleTab:{
        
    },
    headerSection:{
        backgroundColor:"#0E0D0D",
        width:"100%",
        alignItems:"center"
    },
    headerSection1:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"red",
        alignItems:"center"
    },
    overlapSection:{
        position:"absolute",
        width:"100%",
        color:"white"
      
    },
    gridSection:{
        paddingLeft:"3%",
        paddingRight:"3%"
    },
    whiteColor:{
        color:"white"
    },
    dashboardText:{
        color:"white",
        fontSize:20,
        fontFamily: 'Montserrat-Bold'
    },
    labelStyling:{
        fontSize:14,
        fontFamily: 'Montserrat-Bold',
        color:"#AEAEAE",
        lineHeight:35
    },
    cardStyling:{
        marginTop: "2%",
        alignItems:"center",
        height:112,
        paddingBottom:"4%",
        paddingTop:"4%",
        backgroundColor: "#FCFCFC",
        borderRadius: 5,
    }
});
export default styleContent;
