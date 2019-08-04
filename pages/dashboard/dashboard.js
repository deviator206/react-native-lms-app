import { Button, Container, Footer, FooterTab, Icon, Picker, Text, View } from 'native-base';
import React from 'react';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './dashboardStyle';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.getFooterTab = this.getFooterTab.bind(this);
        
    }

    getSpinnerComponentView() {
        const { spinner } = this.state;
        console.log(spinner)
        const loaderView = (<SpinnerComponent />);
        const nonLoaderView = null;
        if (spinner) {
            return loaderView;
        }
        return nonLoaderView;
    }

    getFooterTab() {
        return (<Footer >
                    <FooterTab style={styleContent.footerSection}>
                    <Button vertical style={styleContent.footerSingleTab}>
                        <Icon name="home" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Home</Text>
                    </Button >
                    <Button vertical style={styleContent.footerSection} >
                        <Icon name="view-headline" style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>View Lead</Text>
                    </Button>
                    <Button  onPress={
                        () => {
                            console.log(" menu clicked");
                            this.props.navigation.navigate("addlead");
                        }
                    } vertical style={styleContent.footerSection} >
                        <Icon name="note-add"  style={styleContent.tabIconStyling} />
                        <Text style={styleContent.tabNameStyling}>Add Lead</Text>
                    </Button>
                    </FooterTab>
          </Footer>)
    }

    componentDidMount() {
        this.setState({ spinner: false });
    }

    render() {
        return (
            <Container style={styleContent.container}>
                <View style={styleContent.sectionOne}>
                    <Button transparent
                        style={styleContent.sideMenu}
                        onPress={() => {
                            console.log(" menu clicked");
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name='ios-menu' />
                    </Button>

                    <View>
                        <Text> 1.2 </Text>
                    </View>
                    <View>
                        <Text> 2.3 </Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 120 }}
                            >
                            <Picker.Item label="TTTT" value="key0" />
                            <Picker.Item label="ATM Card" value="key1" />
                            <Picker.Item label="Debit Card" value="key2" />
                            <Picker.Item label="Credit Card" value="key3" />
                            <Picker.Item label="Net Banking" value="key4" />
                            </Picker>
                    </View>

                </View>
                <View style={styleContent.sectionTwo}>
                    <Text> Section 2 </Text>
                </View>
                {this.getFooterTab()}
                {this.getSpinnerComponentView()}
            </Container>
        );
    }
}