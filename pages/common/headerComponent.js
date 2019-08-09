import { Body, Button, Header, Left, Right, Title } from 'native-base';
import React from 'react';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleContent from './commonStyling';

export default class HeaderComponent extends React.Component {
    constructor(props){
        super(props);
        this.getSideMenuViews = this.getSideMenuViews.bind(this);
    }

    getSideMenuViews() {
        const { showSideMenuBtn = false, sideMenuClickHandler } = this.props;
        const sideButtonView = (
        <Button transparent onPress={() => {
            if(sideMenuClickHandler){
                sideMenuClickHandler();
            }
        }}>
            <MaterialCommunityIcon name="dots-vertical" style={{ color: "white", fontSize: 35 }} />
        </Button>)
        if (showSideMenuBtn) {
            return sideButtonView
        }
    }

    render() {
        const { title, previousPage, showSideMenuBtn = false } = this.props;
        console.log(previousPage);
        return (
            <Header style={styleContent.headerSection} hasTabs>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" style={{ color: "white", fontSize: 35 }} />
                    </Button>
                </Left>
                <Body>
                    <Title> {title}</Title>
                </Body>
                <Right >
                   {this.getSideMenuViews()}
                </Right>
            </Header>
        )
    }
}

