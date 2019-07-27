import { Button, Container, Content, Footer, H1, Icon, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from "react-native";
import AuthenticationApi from '../../services/AuthenticationApi';
import styleContent from './loginStyle';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.btnHandler = this.btnHandler.bind(this);
        this.authenticateApi = new AuthenticationApi();
        this.counter = 0;
    }

    componentDidMount() {
        this.counter = 0;
        // alert("TEST ");
    }

    componentWillUnmount() {
        // alert("bye ");
    }
    btnHandler() {
        console.log(this.props.navigation);
        this.counter++;
        // this.props.navigation.closeDrawer();
        this.authenticateApi.proceedLoginApi();
        //this.props.navigation.navigate('bootstap');
        /**
         * 
         * <View>
                        <Image source={logoImg} style={styleContent.logo} />
                    </View>
                    <Button onPress={()=>{this.btnHandler()}} >
                        <Text> Go BACK here v - {this.counter}  </Text>
                    </Button>



                    <Button style={styleContent.loginBtn}  >
                    <Text style={styleContent.textFont1} > SIGN IN </Text><Icon name="arrow-forward" />                       
                    </Button>
         */
    }

    render() {
        let logoImg = require('../images/ametek_logo@1X.png');
        return (
            <Container style={styleContent.container}>
                <Content padder style={styleContent.mainContent}>
                    <View>
                        <Image source={logoImg} style={styleContent.logo} />
                        <View style={styleContent.loginTextAndMessage}>
                            <H1 style={styleContent.h1Login}>Login</H1>
                            <Text>Welcome message goes hereWelcome mess</Text>
                        </View>
                    </View>
                    <View style={styleContent.loginFormContent}>
                        <Item regular>
                            <Icon active name='person' />
                            <Input placeholder='Username'
                                returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>
                        <Item regular >
                            <Icon active name='lock' />
                            <Input placeholder='Password'
                                secureTextEntry={true}
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>
                        <Text > Forgot Password </Text><Icon name="arrow-forward" />
                    </View>
                </Content>
                <Text style={styleContent.versionContent} > v0.0.111 </Text>
                <Footer style={styleContent.footerContent} >
                    <Button style={styleContent.loginBtn}   >
                        <View style={styleContent.buttonTextView} >
                            <Text style={styleContent.signInText} > SIGN IN </Text><Icon name="arrow-forward" />
                        </View>
                    </Button>
                </Footer>
            </Container>
        );
    }
}