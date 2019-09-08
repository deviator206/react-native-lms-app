import { Button, Container, Content, Icon, Input, Item, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from "react-native";
import AuthenticationApi from '../../services/AuthenticationApi';
import { default as commonStyling } from '../common/commonStyling';
import ModalComponent from '../common/modalComponent';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './loginStyle';


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            showError: true,
            userNameMissing: false,
            passwordMissing: false,
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
                <View  style={commonStyling.errorMsgContent}>
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
            userNameMissing: false,
            passwordMissing: false,
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
            errMsg: resp.message
            // errMsg: i18nMessages['ERROR_MSG_' + (resp.error).toUpperCase()]
        });

        // this.props.navigation.navigate('dashboard');
    }
    onSignInBtnClicked() {
        const { userName, password } = this.state;
        console.log(userName, "&&", password);
        if (userName && password && userName !== "" && password !== "") {
            this.setState({
                spinner: true,
                showError: false,
                showForgotPasswordModal: false,
                userNameMissing: false,
                passwordMissing: false,
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
        } else {

            this.setState({
                userNameMissing: (userName && userName !== '') ? false : true,
                passwordMissing: (password && password !== '') ? false : true
            });
        }

    }

    onLoginSuccess(data) {
        window.userInformation = data;
        console.log("RESP:", window.userInformation);
        this.setState({
            spinner: false,
            userNameMissing: false,
            passwordMissing: false,
        });
        this.props.navigation.navigate('dashboard');
    }

    render() {
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
                            <View style={styleContent.hairline} />
                            <Text style={styleContent.welcomeMsg}>Welcome message goes here Test the login window here Welcome mess</Text>
                        </View>
                        <View style={styleContent.loginMiddle}>
                            {this.getErrorView()}
                            <Item regular error={this.state.userNameMissing}  style={styleContent.usernameInput}>
                                <Icon active name='person' style={styleContent.iconLoginPage}/>
                                <Input
                                    style={commonStyling.inputBoxStyle}
                                    containerStyle={commonStyling.fontMediumLabel}
                                    placeholder='Username'
                                    placeholderTextColor="#b4b4b4" 
                                    returnKeyType="next"
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(val) => { this.onUserNameChanged(val) }} />
                            </Item>
                            <View style={{height: 12}}/>
                            <Item regular error={this.state.passwordMissing}  style={styleContent.passwordInput}>
                                <Icon active name='lock' style={styleContent.iconLoginPage}/>
                                <Input 
                                    style={commonStyling.inputBoxStyle}
                                    placeholder='Password'
                                    placeholderTextColor="#b4b4b4" 
                                    secureTextEntry={true}
                                    clearButtonMode="always"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(val) => { this.onPasswordChanged(val) }} />
                            </Item>

                            <View  style={
                                {
                                    width: "100%",
                                    paddingVertical: "2%",
                                    alignItems: "flex-end"
                                }
                            }>
                                <Button style={styleContent.forgetPswdLinkButton}
                            transparent
                            onPress={
                                () => {
                                    this.toggleForgotPassword()
                                }
                            }>
                                    <Text  style={styleContent.forgetPswdLink}>Forgot password</Text>
                        </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styleContent.versionView}>
                        
                        <Text style={styleContent.versionContent}> v0.0.0.2 </Text>
                    </View>

                    <View style={styleContent.footerContent} >
                        <Button style={styleContent.loginBtn}
                            onPress={() => this.onSignInBtnClicked()}>
                            <View style={styleContent.buttonTextView} >
                                <Text style={styleContent.signInText} > SIGN IN </Text><Icon name="arrow-forward"  style={styleContent.signInIcon}/>
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