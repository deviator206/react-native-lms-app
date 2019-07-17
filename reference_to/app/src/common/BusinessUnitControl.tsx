import React, { Component } from "react";

import DropDownData from '../data/DropDown';
import SinglePicker from './SinglePicker';
import { Text } from "native-base";
import MultiPicker from "./MultiPicker";

export interface Props 
{
    PickerType:string,
    PickedValue:string,
    onPicked:any
}
export interface State {
    PickerData:DropDownData[],
    isLoaded:boolean
}

class BusinessUnitControl extends Component <Props, State>
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
        data.push({Code:'Atlas',Name:'Atlas'});
        data.push({Code:'Land',Name:'Land'});
        data.push({Code:'Spectro',Name:'Spectro'});
        this.setState({PickerData:data,isLoaded:true})

    }
    onPicked (value:string){
        this.props.onPicked(value);
    }
   
    render() {

     
        if (this.state.isLoaded)
        {
            if (this.props.PickerType==='Single')
                return (
                    <SinglePicker PickedValue={this.props.PickedValue} PickerData={this.state.PickerData} 
                        onPicked={this.props.onPicked} />
                )
            else if (this.props.PickerType==='Multiple')
                return (
                    <MultiPicker PickedValue={this.props.PickedValue} PickerData={this.state.PickerData} 
                        onPicked={this.props.onPicked} />
                )
    
        }
        else
            return (<Text />)


       
  }
}

  
export default BusinessUnitControl;
