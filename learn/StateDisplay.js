import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class StateDisplay extends Component {
    constructor(props) {
        super(props);
        this.timerHandler = this.timerHandler.bind(this);
    }
    timerHandler() {
        console.log("#### ");
        this.setState(previousState => {
            {isShowingText: !previousState}
        }); 
    }
    componentDidMount() {
        this.state = {isShowingText : false};
        setInterval(this.timerHandler, 1000)
    }
    
    render () {
        if(this.state && !this.state.isShowingText) {
            return null;
        } else {
            return (
                <View>
                    <Text>
                        Test Message!!!
                    </Text>
                </View>
            );
        }
    }
}