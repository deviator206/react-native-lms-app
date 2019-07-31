import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    sideMenuSectionOne: {
        flex: 0.8,
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "#545454",
        alignItems: "center"
    },
    profilePic: {
        width: "80%",
        borderRadius: 50,
        aspectRatio: 0.6,
        resizeMode: 'contain',
        alignSelf: "center"
    },
    profileName: {
        color: "#FFFFFF",
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: "10%"
    },
    sideMenuSectionTwo: {
        flex:0.6,
        backgroundColor: "#FFFFFF"
    },
    menuItemText: {
        color:"#616161",
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,

    },
    iconStyling: {
        
    },
    listItemStyle: {
        backgroundColor: "red",
        width:"100%",
        flex:1
    }
});
export default styleContent;
