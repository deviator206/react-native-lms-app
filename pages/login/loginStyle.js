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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
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
    justifyContent: "space-around",
    alignItems: "center"
  },
  versionView:{
    flex: 0.08,
    width: "100%"
  },
  versionContent: {
    textAlign : 'right'
  },
  footerContent: {
    flex: 0.1,
    width: "100%"
  },
  h1Login:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    fontWeight:"bold"
  },
  forgotPassword: {
    flex: 0.1,
    textAlign : 'right'
  },
  welcomeMsg:{
    paddingTop: "5%",
    textAlign : 'left'
  },
  loginUpperContent :{
    flex:1,
    justifyContent:"space-around",
    width:"90%",
    alignItems:"center",
  },
  fullWidth : {
    width:"100%"
  },
  logoWrapper:{
    paddingTop:"5%"
  },
  loginUpper:{
    flex: 0.3,
    paddingTop: "5%",
    justifyContent:"space-around",
    width:"100%"
  },
  loginMiddle:{
    flex: 0.4,
    paddingTop: "5%",
    justifyContent:"space-between",
    width:"100%"
  },
  loginMiddle2:{
    flex: 0.6,
    justifyContent:"space-between",
    width:"100%"
  }
});
export default styleContent;
