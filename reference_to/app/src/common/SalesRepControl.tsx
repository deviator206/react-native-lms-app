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

class SalesRepControl extends Component <Props, State>
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
        this.LocalData.push({Code:'Vihaan',Name:'Vihaan'});
        this.LocalData.push({Code:'Arjun',Name:'Arjun'});
        this.LocalData.push({Code:'Reyansh',Name:'Reyansh'});
        this.LocalData.push({Code:'Muhammad',Name:'Muhammad'});

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

  
export default SalesRepControl;
