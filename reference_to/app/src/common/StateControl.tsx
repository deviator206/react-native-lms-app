import React, { Component } from "react";

import DropDownData from '../data/DropDown';
import SinglePicker from './SinglePicker';
import { Text } from "native-base";

export interface Props {
    PickedValue:string,
    onPicked:any
}
export interface State {
    PickerData:DropDownData[],
    isLoaded:boolean
}

class StateControl extends Component <Props, State>
{
    constructor(props: Props) {
        super(props);
        this.state = {
            PickerData:[],
            isLoaded:false
        }
    }
    componentDidMount()
    {
        var data:DropDownData[] = [];
        data.push({Code:'Choose',Name:'Choose'});
        data.push({Code:'MH',Name:'Maharastra'});

        this.setState({PickerData:data,isLoaded:true})

    }
    onPicked (value:string){
        this.props.onPicked(value);
    }
   
    render() {

     
        if (this.state.isLoaded)
        return (
            <SinglePicker PickedValue={this.props.PickedValue} PickerData={this.state.PickerData}
                onPicked={this.props.onPicked} />
        )
        else
            return (<Text />)


       
  }
}

  
export default StateControl;
