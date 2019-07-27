import { StyleSheet } from 'react-native';
const styleContent = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  loginBtn: {
    backgroundColor: '#ec2227',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%'
  },
  logo: {
    aspectRatio: 4.5,
    resizeMode: 'contain',
    alignSelf: "center"
  },
  container: {
  
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: '#eeeeee'
  },
  textFont: {
    fontWeight: 'bold'
  },
  buttonTextView: {
    paddingTop: "2%",
    flex:1,
    flexDirection:"row",
    justifyContent: "center"
  },
  signInText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    top: "5%",
    width: "100%"
  },
  versionContent: {
    flex: 0.08,
    width: "100%",
    alignSelf: 'flex-end'
  },
  footerContent: {
    flex: 0.1,
    width: "100%",
    backgroundColor: 'yellow'
  },
  loginFormContent:{
    paddingTop: "5%",
    flex:1,
    justifyContent: "center"
  },
  loginTextAndMessage :{
    paddingTop: "5%",
    flex:1,
    justifyContent: "center"
  },
  h1Login:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 30
  }
});
export default styleContent;
