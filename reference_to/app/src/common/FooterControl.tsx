import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {Button,Footer,FooterTab,Text,Icon} from "native-base";

export interface Props {
    ActiveTab:string,
    navigation: any;
}
export interface State {
    isHome: boolean,
    isView: boolean,
    isAdd: boolean
}

class FooterControl extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);
        this.state = {
            isHome:(this.props.ActiveTab === 'Home'?true:false),
            isView:(this.props.ActiveTab === 'ViewLeads'?true:false),
            isAdd:(this.props.ActiveTab === 'AddLead'?true:false)
        }

    }    
    onToggleTable(TabID:string) {
        this.props.navigation.navigate(TabID);
    }
    render() {
        return (
            <Footer >
                <FooterTab>
                    <Button active={this.state.isHome} onPress={() => this.onToggleTable('Home')}>
                        <Icon active={this.state.isHome} name="home" />
                        <Text>Home</Text>
                    </Button>
                    <Button active={this.state.isView} onPress={() => this.onToggleTable('ViewLeads')}>
                        <Icon active={this.state.isView} name="eye" />
                        <Text>View Leads</Text>
                    </Button>
                    <Button active={this.state.isAdd} onPress={() => this.onToggleTable('AddLead')}>
                        <Icon active={this.state.isAdd} name="star-outline" />
                        <Text>Add Lead</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const LocalStyles: any = StyleSheet.create({
     
    whiteTab: {
        backgroundColor: '#ffffff'
        
    }
  }
  );


export default FooterControl;