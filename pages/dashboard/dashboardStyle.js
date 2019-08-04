import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    sectionOne: {
        flex: 0.5,
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
        paddingLeft: "2%"
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
       color:"black"
    },
    footerSingleTab:{
        
    }
});
export default styleContent;
