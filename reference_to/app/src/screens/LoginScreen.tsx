import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import {StatusBar,Image, StyleSheet } from "react-native";

import { Container, Content,H1, Text, View, Button, Icon, Footer, Item,Input} from "native-base";

const LogoImage = require('../../assets/images/logo.png');

export interface Props {
	navigation: any;
}
export interface State {
    Username : string,
    Password : string
}

class LoginScreen extends Component<Props, State>
{
    constructor(props: Props) {

        super(props);
        this.state = {
            Username: '',
            Password: ''
          };
    }
    
    onDoLogin()
    {
        this.props.navigation.navigate('Welcome');
    }
    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar />
                <Content>
                    <View>
                        <Image source={LogoImage} style={LocalStyles.logo}/>
                        <View style={LocalStyles.note}>
                        <H1>Login</H1>
                        <Text>Welcome message goes here</Text>
                        </View>
                    </View>

                    <View>
                        <Item regular>
                            <Icon active name='account-circle' />
                            <Input placeholder='Username'
                                returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.Username} 
                                onChangeText={(text) => this.setState({ Username: text })}/>
                        </Item>
                        <Item regular style={{marginTop:20}}>
                            <Icon active name='lock' />
                            <Input placeholder='Password'
                                secureTextEntry={true}
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.Password} 
                                onChangeText={(text) => this.setState({ Password: text })} />
                        </Item>
                    </View>
                    <Text style={LocalStyles.versionText}>Version: 1.0.0</Text>
                </Content>
                <Footer>
                    <Button style={LocalStyles.loginBtn} onPress={() => this.onDoLogin()} >
                        <Text>Sign In</Text><Icon name="arrow-right" />
                    </Button>
                </Footer>
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
    note: {
      marginTop:40,
      marginBottom:40,
      width :300,
      alignSelf: 'center'
    },
    versionText :{
        marginTop:200,
        alignSelf: 'flex-end'
    },
    loginBtn: {
        backgroundColor: '#ec2227',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
  }
  );

export default LoginScreen;