import { Spinner, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const localStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        opacity:0.5,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    actualSpinner :{
        flex : 1 
    
    }
});

export default class SpinnerComponent extends Component {
    render() {
        return (
            <View style={localStyle.container}>
                <Spinner style={localStyle.actualSpinner} color='white' />
            </View>
        )
    }
}