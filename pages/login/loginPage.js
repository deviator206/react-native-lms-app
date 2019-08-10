import { Button, Container, Content, Icon, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from "react-native";
import AuthenticationApi from '../../services/AuthenticationApi';
import { default as commonStyling } from '../common/commonStyling';
import i18nMessages from '../common/i18n';
import ModalComponent from '../common/modalComponent';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './loginStyle';



export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            showError: true,
            showForgotPasswordModal: false,
            errMsg: '',
            userName: '',
            password: ''
        }
        this.onSignInBtnClicked = this.onSignInBtnClicked.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.onUserNameChanged = this.onUserNameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.getErrorView = this.getErrorView.bind(this);
        this.getForgotPasswordModalView = this.getForgotPasswordModalView.bind(this);
        this.toggleForgotPassword = this.toggleForgotPassword.bind(this);
        this.onFPModalClosed = this.onFPModalClosed.bind(this);
        this.authenticateApi = new AuthenticationApi();
    }

    getSpinnerComponentView() {
        const { spinner } = this.state;
        const loaderView = (<SpinnerComponent />);
        const nonLoaderView = null;
        if (spinner) {
            return loaderView;
        }
        return nonLoaderView;
    }


    toggleForgotPassword() {
        const { showForgotPasswordModal } = this.state;
        this.setState({
            showForgotPasswordModal: !showForgotPasswordModal
        })
    }

    onFPModalClosed() {
        this.toggleForgotPassword();

    }

    getForgotPasswordModalView() {
        const { showForgotPasswordModal } = this.state;
        if (showForgotPasswordModal) {
            return (
                <ModalComponent showModal={showForgotPasswordModal} onCloseCallBackhandler={this.onFPModalClosed} />
            )
        }
    }

    getErrorView() {
        const { showError = false, errMsg } = this.state;
        if (showError) {
            return (
                <View >
                    <Text style={commonStyling.errorMessageText}>{errMsg}</Text>
                </View>
            )
        }
    }

    componentDidMount() {
        this.setState({
            spinner: false,
            errMsg: '',
            showForgotPasswordModal: false,
            userName: '',
            password: '',
            showError: false
        });
    }

    onPasswordChanged(val) {
        this.setState({ password: val });
    }
    onUserNameChanged(val) {
        this.setState({ userName: val });
    }
    errorHandler(resp) {
        console.log('ERROR HANDLER ::: ', resp.message);
        this.setState({
            spinner: false,
            showError: true,
            showForgotPasswordModal: false,
            errMsg: i18nMessages['ERROR_MSG_' + (resp.error).toUpperCase()]
        });
    }
    onSignInBtnClicked() {
        const { userName, password } = this.state;
        console.log(userName ,"&&", password);
        if(userName && password && userName !== "" && password !== "") {
            console.log("------66666666--------");
            this.setState({
                spinner: true,
                showError: false,
                showForgotPasswordModal: false,
                errMsg: '',
            });
            this.authenticateApi.proceedLoginApi({
                params: {
                    userName,
                    password
                },
                successHandler: this.onLoginSuccess,
                errorHandler: this.errorHandler
            }); 
        }else {
            console.log("##############" , i18nMessages['ERROR_MSG_CREDENTIALS_MISSING']);
            this.setState({
                showError: true,
                errMsg: i18nMessages['ERROR_MSG_CREDENTIALS_MISSING'],
            });
        }
        
    }

    onLoginSuccess(data) {
        console.log("RESP:", data);
        this.setState({ spinner: false });
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
                                <Input 
                                    containerStyle={commonStyling.fontMediumLabel}
                                    placeholder='Username'
                                    returnKeyType="next"
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(val) => { this.onUserNameChanged(val) }} />
                            </Item>
                            <Item regular >
                                <Icon active name='lock' />
                                <Input placeholder='Password'
                                    secureTextEntry={true}
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(val) => { this.onPasswordChanged(val) }} />
                            </Item>
                        </View>
                        {this.getErrorView()}

                        <Button style={{
                            backgroundColor: "red"
                        }}
                            transparent
                            onPress={
                                () => {
                                    this.toggleForgotPassword()
                                }
                            }>
                            <Text >forgot password</Text>
                        </Button>
                    </View>

                    <View style={styleContent.versionView}>
                        <Text style={styleContent.versionContent}> v0.0.0.2 </Text>
                    </View>

                    <View style={styleContent.footerContent} >
                        <Button style={styleContent.loginBtn}
                            onPress={() => this.onSignInBtnClicked()}>
                            <View style={styleContent.buttonTextView} >
                                <Text style={styleContent.signInText} > SIGN IN </Text><Icon name="arrow-forward" />
                            </View>
                        </Button>
                    </View>
                    {this.getForgotPasswordModalView()}
                    {this.getSpinnerComponentView()}
                </Content>
            </Container>
        );
    }
}