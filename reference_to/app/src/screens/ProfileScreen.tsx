import Styles from "../theme/lms/Styles";
import React, { Component } from "react";

import { Container, Text, Content, Header,Left,Right,Body,Button,Icon,Title} from "native-base";

import FooterControl from '../common/FooterControl'

export interface Props {
	navigation: any;
}
export interface State {}

class ProfileScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);

    }    
    goBack()
    {

      this.props.navigation.goBack();
    }
    render() {
        return (
          <Container style={Styles.homeContainer}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.goBack()}>
                <Icon name="arrow-left" />
              </Button>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right/>
          </Header>
              <Content>
                <Text style={{ paddingBottom: 20 }}>Profile ...</Text>  
              </Content>  
              
            </Container>
        );
    }
}

export default ProfileScreen;