import React, { Component } from "react";
import {Picker} from "native-base";

import DropDownData from '../data/DropDown';

export interface Props {
    PickedValue:string,
    PickerData:DropDownData[],
    onPicked:any
}
export interface State {
    PickedValue:string,
    PickerData:DropDownData[]
}

class SinglePicker extends Component <Props, State>
{
    constructor(props: Props) {
        super(props);
        this.state={
            PickedValue: this.props.PickedValue,
            PickerData:this.props.PickerData
        }
    }
    
    onPicked (value:string){
        this.setState({PickedValue:value})
        this.props.onPicked(value);
        
    }
    renderList()
    {
        
        if (this.state.PickerData.length>0)
        {
            return (
                this.state.PickerData.map((data:DropDownData, index:number) => (
                    <Picker.Item key={index} label={data.Name} value={data.Code} />
                )))
        }
        
    }
   
    render() {

        return (

            <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.PickedValue}
                onValueChange={(value) => this.onPicked(value)}
                >
                {
                    this.renderList()
                }
            </Picker>
        );
       
  }
}

  
export default SinglePicker;
