import { Button, Container, Content, View } from 'native-base';
import React, { Component } from 'react';
import { Image, Text } from "react-native";
import styleContent from './loginStyle';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.btnHandler = this.btnHandler.bind(this);
        this.counter = 0;
    }

    componentDidMount() {
        this.counter = 0;
        // alert("TEST ");
    }

    componentWillUnmount() {
        // alert("bye ");
    }
    btnHandler () {
        console.log(this.props.navigation);
        this.counter++;
        // this.props.navigation.closeDrawer();
        this.props.navigation.navigate('bootstap');
    }

    render() {
        let logoImg = require('../images/ametek_logo@1X.png');
        return (
            <Container style={styleContent.container}>
                <Content>
                    <View>
                        <Image source={logoImg} style={styleContent.logo} />
                    </View>
                    <Button onPress={()=>{this.btnHandler()}} >
                        <Text> Go BACK v - {this.counter}  </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}