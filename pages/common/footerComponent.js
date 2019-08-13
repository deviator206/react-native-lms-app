
import { Button, Footer, FooterTab, Text } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as FoundationIcon} from 'react-native-vector-icons/Foundation';

import styleContent from './commonStyling';

export default class FooterComponent extends React.Component {
    
    render() {
        return (
            <Footer >
                <FooterTab style={styleContent.footerSection}>
                    <Button vertical style={styleContent.footerSingleTab}>
                        <Icon name="home-outline" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Home</Text>
                    </Button >
                    <Button vertical
                        onPress={
                            () => {
                                this.props.navigation.navigate("viewlead");
                            }
                        }
                        style={styleContent.footerSection} >
                        <FoundationIcon name="page-search" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}> View Lead</Text>
                    </Button>
                    <Button onPress={
                        () => {
                            console.log(" menu clicked");
                            this.props.navigation.navigate("addlead");
                        }
                    } vertical style={styleContent.footerSection} >
                        <FoundationIcon name="page-add" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Add Lead</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

