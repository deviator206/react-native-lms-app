import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import {StatusBar,Image, StyleSheet } from "react-native";

import { Container, Content,H1, Text, View, Button, Icon} from "native-base";

const WelcomeImage = require('../../assets/images/welcome.png');
const LogoImage = require('../../assets/images/logo.png');


export interface Props {
	navigation: any;
}
export interface State {}

class SplashScreen extends Component<Props, State>
{
  constructor(props: Props) {

    super(props);
  }
  
  onShowLogin()
  {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <Container style={Styles.container}>
        <StatusBar />
        <Content>
            <View>
              <Image source={LogoImage} style={LocalStyles.logo}/>
              <View style={LocalStyles.note}>
                <H1>Welcome</H1>
                <Text>Welcome message goes here</Text>
              </View>
            </View>
          
            <Image source={WelcomeImage} style={LocalStyles.welcome}/>
            
            <View style={LocalStyles.toolbox}>
              <Button style={LocalStyles.signinBtn} onPress={() => this.onShowLogin()} ><Text>Sign In</Text></Button>
              <Button style={LocalStyles.arrowBtn} onPress={() => this.onShowLogin()}><Icon name="arrow-right" /></Button>
            </View>
        </Content>
      </Container>
    );
  }
}

const LocalStyles: any = StyleSheet.create({
  
  logo: {
    height:64,
    width :260,
    alignSelf: 'center',
    marginTop:40
  },
  welcome: {
    height:263,
    width :222,
    alignSelf: 'center'
  },
  note: {
    marginTop:40,
    marginBottom:40,
    width :300,
    alignSelf: 'center'
  },
  toolbox: {
    flex:1,
    flexDirection:'row',
    alignSelf: 'center',
    marginTop:40
  },
  signinBtn: {
    backgroundColor: '#000000',
    marginRight:10,
    justifyContent: 'center',
    width:160
  },
  arrowBtn: {
    backgroundColor: '#ec2227',
    justifyContent: 'center',
    width : 80
  }
}
);


export default SplashScreen;