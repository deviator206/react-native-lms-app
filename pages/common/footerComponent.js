
import { Button, Footer, FooterTab, Text } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleContent from './commonStyling';

export default class FooterComponent extends React.Component {
    
    render() {
        return (
            <Footer >
                <FooterTab style={styleContent.footerSection}>
                    <Button vertical style={styleContent.footerSingleTab}>
                        <Icon name="home" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Home</Text>
                    </Button >
                    <Button vertical
                        onPress={
                            () => {
                                this.props.navigation.navigate("viewlead");
                            }
                        }

                        style={styleContent.footerSection} >
                        <Icon name="view-list" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}> View Lead</Text>
                    </Button>
                    <Button onPress={
                        () => {
                            console.log(" menu clicked");
                            this.props.navigation.navigate("addlead");
                        }
                    } vertical style={styleContent.footerSection} >
                        <Icon name="note-add" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Add Lead</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

