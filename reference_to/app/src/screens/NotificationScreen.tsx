import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";

import { Container, Text, Content} from "native-base";

import FooterControl from '../common/FooterControl'
export interface Props {
	navigation: any;
}
export interface State {}

class NotificationScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);

    }    
    render() {
        return (
            <Container style={Styles.container}>
              <Content>
                <Text style={{ paddingBottom: 20 }}>Notification ...</Text>  
              </Content>  
              <FooterControl ActiveTab='Home' />  
            </Container>
        );
    }
}

export default NotificationScreen;