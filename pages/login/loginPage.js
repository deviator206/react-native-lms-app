import { Container, Content, Footer, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image } from "react-native";
import styleContent from './loginStyle';

export default class LoginPage extends Component {
    render() {
        let logoImg = require('../images/ametek_logo@1X.png');
        return (
            <Container style={styleContent.container}>
                <Content>
                    <View>
                        <Image source={logoImg} style={styleContent.logo} />
                    </View>
                </Content>

                <Footer>
                    <Text >
                        @Footer
                    </Text>

                </Footer>
            </Container>
        );
    }
}