import React, { Component } from "react";

import DropDownData from '../data/DropDown';
import SinglePicker from './SinglePicker';
import { Text } from "native-base";

export interface Props {
    PickedValue:string,
    onPicked:any
}
export interface State {
    isLoaded:boolean
}

class IndustryControl extends Component <Props, State>
{
    LocalData:DropDownData[] = [];
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoaded:false
        }
    }
    componentDidMount()
    {
        this.LocalData.push({Code:'Choose',Name:'Choose'});
        this.LocalData.push({Code:'Accounts',Name:'Accounts'});
        this.LocalData.push({Code:'Finance',Name:'Finance'});
        this.LocalData.push({Code:'Technology',Name:'Technology'});

        this.setState({isLoaded:true})

    }
    onPicked (value:string){
        this.props.onPicked(value);
    }
   
    render() {

     
        if (this.state.isLoaded)
            return (
                <SinglePicker PickedValue={this.props.PickedValue} PickerData={this.LocalData}
                    onPicked={this.props.onPicked} />
            )
        else
            return (<Text />)
      
  }
}

  
export default IndustryControl;
