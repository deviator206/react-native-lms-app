import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Container, Content,Header,Left, Button,Text,Body,Title,Right,Icon} from "native-base";

import FooterControl from '../common/FooterControl'

export interface Props {
	navigation: any;
}
export interface State {}

class HomeScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);

    }    
    render() {
        return (
            <Container>
                <StatusBar />
              <Header>
                <Left/>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                    <Button transparent
                          onPress={() => this.props.navigation.openDrawer()}>
                          <Icon  name="dots-vertical" />
                      </Button>
                </Right>
            </Header>
            
              <Content>
                <Text style={{ paddingBottom: 20 }}>Home ...</Text>  
              </Content>  
              <FooterControl ActiveTab='Home' navigation={this.props.navigation}/>  
            </Container>
        );
    }
}

export default HomeScreen;