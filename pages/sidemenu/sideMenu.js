import { Container, ListItem, Text, View } from 'native-base';
import React from 'react';
import { FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styleContent from './sidemenuStyle';

const routes = [
    {
        key: "login",
        caption: "User",
        icon: 'user'
    },
    {
        key: "dashboard",
        caption: "Dashboard",
        icon: 'account'
    },
    {
        key: "login",
        caption: "Logout",
        icon: 'logout'
    }
];

export default class SideMenuBar extends React.Component {

    render() {
        return (
            <Container style={styleContent.container}>
                <View style={styleContent.sideMenuSectionOne}>
                    <Image source={require('../images/profile_pic_logo_2.png')} style={styleContent.profilePic} />
                    <Text style={styleContent.profileName}> Sunayna Rao </Text>
                </View>
                <FlatList
                    style={styleContent.sideMenuSectionTwo}
                    data={routes}
                    renderItem={({ item }) => {
                        return (<ListItem
                            style={styleContent.listItemStyle}
                            button
                            onPress={() => { this.props.navigation.navigate(item.key); }}
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