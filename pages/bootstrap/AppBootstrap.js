import { Button, Container, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class AppBootstrap extends Component {
    constructor(props){
        super(props);
        this.btnHandler = this.btnHandler.bind(this);
    }
    btnHandler () {
        console.log(this.props.navigation);
        this.props.navigation.navigate('login');
    }
    render () {
        return (
            <Container>
                <Content>
                <Text> App Boot some here </Text>
                <Button  primary onPress={()=>{this.btnHandler()}}>
                     <Icon name='arrow-back' /> 
                      <Text > Some Btn v1 </Text>
                </Button>
                </Content>
            </Container>
        );
    }
}