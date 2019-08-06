import { Body, Button, Header, Left, Right, Title } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleContent from './commonStyling';

export default class HeaderComponent extends React.Component {

    render() {
        const { title, previousPage } = this.props;
        console.log(previousPage);
        return (
            <Header style={styleContent.headerSection}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" style={{ color: "white", fontSize: 35 }} />
                    </Button>
                </Left>
                <Body>
                    <Title> {title }</Title>
                </Body>
                <Right />
            </Header>
        )
    }
}

