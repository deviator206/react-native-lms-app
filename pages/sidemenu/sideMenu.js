import { Button, Container, Icon, ListItem, Text, View } from 'native-base';
import React from 'react';
import { FlatList, Image, Picker } from "react-native";
import styleContent from './sidemenuStyle';

const routes = [
    {
        key: "login",
        caption: "Notifications",
        icon: 'notifications'
    },
    {
        key: "dashboard",
        caption: "Profile Details",
        icon: 'face-profile'
    },
    {
        key: "login",
        caption: "Market Intelligence",
        icon: 'logout'
    },
    {
        key: "login",
        caption: "Logout",
        icon: 'logout'
    }
];

export default class SideMenuBar extends React.Component {

    constructor(props){
        super(props);
        this.setState({ language: ''})
    }

    render() {
        return (
            <Container style={styleContent.container}>
                <View style={styleContent.sideMenuSectionOne}>
                    <Button style={styleContent.closeBtnStyling} onPress={() => { this.props.navigation.closeDrawer(); }}>
                        <Icon name="close" />
                    </Button >
                    <Image source={require('../images/profile_pic_logo_2.png')} style={styleContent.profilePic} />
                    <Text style={styleContent.profileName}> Sunayna Rao </Text>
                </View>
                <Picker
                    selectedValue='TEST'
                    style={{ 
                        height: 50, 
                        width: 100 ,
                        backgroundColor: "red",
                        borderRadius: 60
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                        console.log("aaa ")
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
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