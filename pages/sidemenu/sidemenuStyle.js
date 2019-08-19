import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    sideMenuSectionOne: {
        flex: 0.6,
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "#333333",
        alignItems: "flex-start",
        paddingLeft: "10%"
    },
    profilePic: {
        flex: 0.8,
        width: "90%",
        borderRadius: 50,
        aspectRatio: 0.75,
        resizeMode: 'contain',
        alignSelf: "flex-start",
        paddingLeft: "8%"
    },
    profileName: {
        flex: 0.2,
        color: "#FFFFFF",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
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
        marginVertical: "1%"

    },
    iconStyling: {
        color: "#666666",
        marginHorizontal: "5%"
    },
    closeBtnStyling: {
        alignSelf:"flex-end",
        backgroundColor:"#333333",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginRight: 5
    },
    closeBtn: {
        color: "#666666",
        fontSize: 35
    },
    listItemStyle: {
        width:"100%",
        flex:1
    }
});
export default styleContent;
