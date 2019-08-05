import { Button, Container, Content, Icon, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from "react-native";
import AuthenticationApi from '../../services/AuthenticationApi';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './loginStyle';


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.onSignInBtnClicked = this.onSignInBtnClicked.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.authenticateApi = new AuthenticationApi();
        this.counter = 0;
    }

    getSpinnerComponentView () {
        const {spinner} = this.state;
        console.log(spinner)
        const loaderView =  (<SpinnerComponent />);
        const nonLoaderView =  null;
        if(spinner) {
            return loaderView;
        }
        return nonLoaderView;
    }
    componentDidMount() {
        this.counter = 0;
        this.setState({spinner: false});
    }

    errorHandler(err) {
        alert('ERROR HANDLER', err);
        this.onLoginSuccess();
    }
    onSignInBtnClicked() {
        console.log(this.props.navigation);
        this.setState({spinner: true});
        this.authenticateApi.proceedLoginApi({
            successHandler: this.onLoginSuccess,
            errorHandler: this.errorHandler
        });
    }
    
    onLoginSuccess() {
        this.setState({spinner: false});
        this.props.navigation.navigate('dashboard');
    }

    render() {
        /**
         * <Text style={styleContent.forgotPassword} > Forgot Password ? </Text> 
         */
        let logoImg = require('../images/ametek_logo@1X.png');
        return (
            <Container style={styleContent.container}>
                <Content padder
                    contentContainerStyle={styleContent.mainContent}
                    style={styleContent.fullWidth}>
                    <View style={styleContent.logoWrapper}>
                        <Image source={logoImg} style={styleContent.logo} />
                    </View>
                    <View style={styleContent.loginUpperContent}>
                        <View style={styleContent.loginUpper}>
                            <Text style={styleContent.h1Login}>LOGIN</Text>
                            <Text style={styleContent.welcomeMsg}>Welcome message goes here Test the login widow here Welcome mess</Text>
                        </View>
                        <View style={styleContent.loginMiddle}>
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
                        </View>
                        <View style={styleContent.loginMiddle2}>
                             
                        </View>
                    </View>

                <View style={styleContent.versionView}>
                    <Text style={styleContent.versionContent}> v0.0.0.1 </Text>
                </View>
                <View style={styleContent.footerContent} >
                    <Button style={styleContent.loginBtn}
                        onPress={() => this.onSignInBtnClicked()}>
                        <View style={styleContent.buttonTextView} >
                            <Text style={styleContent.signInText} > SIGN IN </Text><Icon name="arrow-forward" />
                        </View>
                    </Button>
                </View>
                {this.getSpinnerComponentView()}
                </Content>
            </Container>
        );
    }
}