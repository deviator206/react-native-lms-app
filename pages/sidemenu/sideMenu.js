import { Button, Container, ListItem, Text, View } from 'native-base';
import React from 'react';
import { FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleContent from './sidemenuStyle';

const routes = [
    {
        key: "notificationlist",
        caption: "Notifications",
        icon: 'notifications'
    },
    {
        key: "dashboard",
        caption: "Profile Details",
        icon: 'person-outline'
    },
    {
        key: "milist",
        caption: "Market Intelligence",
        icon: 'local-atm'
    },
    {
        key: "userlist",
        caption: "App User",
        icon: 'people-outline'
    },
    {
        key: "login",
        caption: "Logout",
        icon: 'exit-to-app'
    }
];

export default class SideMenuBar extends React.Component {

    constructor(props){
        super(props);
        this.setState({ language: ''})
    }

    render() {
        const { userInfo} = window.userInformation
        const userDisplayName= (userInfo && userInfo.userDisplayName) ? userInfo.userDisplayName : "NO DISPLAY NAME"
        
        return (
            <Container style={styleContent.container}>
                <View style={styleContent.sideMenuSectionOne}>
                    <Button style={styleContent.closeBtnStyling} onPress={() => { this.props.navigation.closeDrawer(); }}>
                        <Icon style={styleContent.closeBtn} name="close" />
                    </Button >
                    <Image source={require('../images/profile_pic_logo_2.png')} style={styleContent.profilePic} />
                    <Text style={styleContent.profileName}> {userDisplayName} </Text>
                </View>
                <FlatList
                    style={styleContent.sideMenuSectionTwo}
                    data={routes}
                    renderItem={({ item }) => {
                        return (<ListItem
                            style={styleContent.listItemStyle}
                            button
                            onPress={() => { 
                                console.log(item.key);
                                this.props.navigation.navigate(item.key); }}
                        >

                            <Icon size={20} style={styleContent.iconStyling} name={item.icon} />
                            <Text style={styleContent.menuItemText}> {item.caption}</Text>


                        </ListItem>)
                    }}
                />

                
            </Container>
        )
    }
}