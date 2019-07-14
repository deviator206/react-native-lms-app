import React, { Component } from 'react';
import { Image, View } from 'react-native';
export default class ImageRefComponent extends Component {
    render() {
        let pic = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
        return (
            <View style={ {
                flex:1, 
                alignItems:"center"
                }}>
            <Image source={{uri: pic}} style={{width: 193, height: 110}} />
            <Image source={require("./img/logo.png")} style={{width: 100, height: 110}} />
            </View>
        );
    }
}