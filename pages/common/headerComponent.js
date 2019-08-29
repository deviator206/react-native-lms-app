import { Button, Header, Left, Right, Title, View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { default as MaterialCommunityIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import styleContent from './commonStyling';

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getSideMenuViews = this.getSideMenuViews.bind(this);
        this.getHamburgerIcon = this.getHamburgerIcon.bind(this);
        this.sideMenuClicked = this.sideMenuClicked.bind(this);
    }

    getSideMenuViews() {
        const { showSideMenuBtn = false, sideMenuClickHandler } = this.props;
        const sideButtonView = (
            <Button transparent onPress={() => {
                if (sideMenuClickHandler) {
                    sideMenuClickHandler();
                }
            }}>
                <MaterialCommunityIcon name="dots-vertical" style={{ color: "white", fontSize: 35 }} />
            </Button>)
        if (showSideMenuBtn) {
            return sideButtonView
        }
    }

    getHamburgerIcon() {
        const {hamburger = false} = this.props;
        if(hamburger) {
            return <MaterialIcon name='menu' style={{ color: "white",  fontSize:25 }} />
        }
        return <Icon name="ios-arrow-back" style={{ color: "white", fontSize: 35 }} />;
    }

    sideMenuClicked() {
        this.props.navigation.goBack();
    }

    render() {
        const { title, previousPage, showSideMenuBtn = false, sideMenuClickHandler = this.sideMenuClicked } = this.props;
        return (
            <Header style={styleContent.headerSection} hasTabs>
                <Left>
                    <Button transparent onPress={() => {
                        sideMenuClickHandler();
                    }}>
                        {this.getHamburgerIcon()}
                    </Button>
                </Left>
                <View style={styleContent.headerTitleWrapper}>
                    <Title style={styleContent.headerTitle}> {title}</Title>
                </View>
                <Right >
                    {this.getSideMenuViews()}
                </Right>
            </Header>
        )
    }
}

