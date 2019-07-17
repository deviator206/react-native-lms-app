import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import {Content,Text,  Button, Icon} from "native-base";

import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';


export interface Props {
    Date:string,
    onDateSelected:any
}
export interface State {
    date:string,
    isDatePickerVisible:boolean
}

class DateControl extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);
        this.state = {
            date:this.props.Date,
            isDatePickerVisible:false
        }
    }
    onDateSelected (selectedDate:Date) {
        this.setState({ date:Moment(selectedDate).format('DD/MM/YYYY') });
        this.setState({ isDatePickerVisible: false });
        this.props.onDateSelected(this.state.date);
    };

    render() {

        return (
            <Content>
                    <Button transparent style={styles.inputBackground} onPress={() => this.setState({ isDatePickerVisible: true })}>
                        <Icon name="calendar-range" /><Text style={styles.inputText} >{this.state.date}</Text>
                    </Button>
                    

                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={(date:Date)=>this.onDateSelected(date)}
                    onCancel={() => this.setState({ isDatePickerVisible: false })}
                />
            </Content>
        );
  }
}

const styles = StyleSheet.create({

    inputBackground:
    {
      borderBottomColor:"#D9D5DC",
      borderBottomWidth:2
    },
    inputText:
    {
        color:"#000"
    }

});
  
export default DateControl;
