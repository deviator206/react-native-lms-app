import { StyleSheet } from 'react-native';
import { hidden, red } from 'ansi-colors';
import {default as AppConst} from '../common/consts';
const styleContent = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  loginBtn: {
    backgroundColor: AppConst.primaryRed,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%'
  },
  hairline: {
    borderBottomWidth: 2,
    borderBottomColor: AppConst.primaryRed,
    width: "15%"
  },
  logo: {
    aspectRatio: 3.5,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: '#E8E8E8'
  },
  textFont: {
    fontWeight: 'bold'
  },
  buttonTextView: {
    paddingTop: "2%",
    flex:1,
    flexDirection:"row",
    justifyContent: "center",
    height: "100%",
    paddingTop: "5%"
  },
  signInText: {
    color: "#FAFAFA",
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  signInIcon: {
    color: "#FFFFFF",
    marginLeft: "2%",
    fontSize: 18,
    paddingTop: 2
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  versionView:{
    flex: 0.09,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  versionContent: {
    textAlign : 'right',
    fontFamily: 'Montserrat-Regular',
    textTransform: "capitalize",
    marginRight: "10%",
    fontSize: 12,
    color: "#808080"
  },
  footerContent: {
    flex: 0.1,
    width: "100%"
  },
  h1Login:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight:"bold",
    color: "#1A1A1A"
  },
  forgotPassword: {
    flex: 0.1,
    textAlign : 'right'
  },
  welcomeMsg:{
    marginTop: "5%",
    textAlign : 'left',
    fontFamily: "Montserrat-Regular",
    color: "#1a1a1a"
  },
  loginUpperContent :{
    flex:0.6,
    justifyContent:"space-around",
    width:"90%",
    alignItems:"center"
  },
  fullWidth : {
    width:"100%"
  },
  logoWrapper:{
    paddingTop:"15%",
    width: "100%",
    paddingLeft: "5%",
  },
  loginUpper:{
    flex: 0.3,
    paddingTop: "0%",
    justifyContent:"space-around",
    width:"100%"
  },
  loginMiddle:{
    flex: 0.5,
    //paddingTop: "5%",
    //justifyContent:"space-between",
    width:"100%"
  },
  loginMiddle2:{
    flex: 0.6,
    justifyContent:"space-between",
    width:"100%"
  },
  passwordInput: {
    //marginTop: "5%",
  },
  usernameInput: {
   // marginTop: "5%"
  },
  iconLoginPage: {
    backgroundColor: "#ffffff",
    height: 50,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    paddingVertical: "3%",
    paddingLeft: "5%",
    borderRightWidth: 0,
    color: "#A7A7A7"
  },
  forgetPswdLinkButton: {
    flex: 0.2,
    marginTop: "2%",
  },
  forgetPswdLink: {
    color: "#000000",
    fontFamily: 'Montserrat-Regular',
    textTransform: "capitalize"
  }
});
export default styleContent;
