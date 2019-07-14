import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
      },
    logo: {
        aspectRatio: 5, 
        resizeMode: 'contain',
        alignSelf : "center",
        marginTop: 40
        
      },
      container: {
        flex: 1
      },
});
export default styleContent;
