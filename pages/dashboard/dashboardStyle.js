import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: '#0E0D0D'
    },
    sectionOne: {
        flex: 0.8,
        width:"100%",
        paddingTop: "4%",
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: "red"
    },
    sectionTwo: {
        flex: 0.2,
        width:"100%",
        backgroundColor: "yellow"
    },
    sectionThree: {
        flex: 0.1,
        width:"100%",
        backgroundColor: "blue"
    },
    sideMenu: {
        paddingLeft: "2%"
    }
});
export default styleContent;
