import React, { Component } from "react";
import {Picker, Content, Grid, Row, Col,Button, Icon, View} from "native-base";

import DropDownData from '../data/DropDown';
import { Text } from "react-native";

export interface Props {
    PickedValue:string,
    PickerData:DropDownData[],
    onPicked:any
}
export interface State {
    PickedValue:string,
    PickerChanged:boolean
}


class MultiPicker extends Component <Props, State>
{
    SelectedData:DropDownData[] = [];

    constructor(props: Props) {
        super(props);
        
        if (this.props.PickedValue!=='Choose')
        {
            var selected = this.props.PickedValue.split(',');
            var picker = this.props.PickerData;
            for (let i=0;i<selected.length;i++)
            {
                for (let j=0;j<picker.length;j++)
                {
                    if (picker[j].Code === selected[i])
                    {
                        this.SelectedData.push(picker[j])
                        continue
                    }    
                }
            }
        }
        this.state={
            PickedValue: 'Choose',
            PickerChanged:false
        }

        
    }
    onAdd()
    {
        var Selected = this.state.PickedValue;
        if (Selected!=='Choose')
        {
            if (this.canAdd(Selected))
            {
                var picker = this.props.PickerData;
                
                for (let j=0;j<picker.length;j++)
                {
                    if (picker[j].Code === Selected)
                    {
                        this.SelectedData.push(picker[j])
                        continue
                    }    
                }
                this.props.onPicked(this.getSelected());    
            }
            
            this.setState({PickedValue:'Choose'})
        }
    }
    canAdd(Selected:string)
    {
        for (var i=0;i<this.SelectedData.length;i++)
        {
            if (Selected===this.SelectedData[i].Code)
                return false;
        }
        return true;
    }
    onRemove(Code:string)
    {
        
        var data:DropDownData[]=[];

        for (var i=0;i<this.SelectedData.length;i++)
        {
            if (Code!==this.SelectedData[i].Code)
                data.push(this.SelectedData[i])
        }
        this.SelectedData = data;
        this.setState({PickedValue:'Choose'})
        this.props.onPicked(this.getSelected());
    }
    getSelected()
    {
        var selected:string[] =[];
        for (var i=0;i<this.SelectedData.length;i++)
        {
            selected.push(this.SelectedData[i].Code) 
        }
        return selected.join(',');
    }
    onPicked (value:string){
        this.setState({PickedValue:value})
    }
    renderSelected()
    {
        if (this.SelectedData.length>0)
        {
            return (
                this.SelectedData.map((data:DropDownData, index:number) => (
                    <Button key={index} bordered rounded style={{margin:2,padding:4}} onPress={() => this.onRemove(data.Code) }>
                        <Text>{data.Name}</Text><Icon style={{width:18,height:18}} name='close' /></Button>
                )))
        }

    }
    renderList()
    {
        
        if (this.props.PickerData.length>0)
        {
            return (
                this.props.PickerData.map((data:DropDownData, index:number) => (
                    <Picker.Item key={index} label={data.Name} value={data.Code} />
                )))
        }
        
    }
   
    render() {

        return (
            <Content padder>
                <Grid>
                <Row>
                    <Col>
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
                    </Col>
                    <Col style={ { width: 100 } }><Button rounded style={{backgroundColor:'red',padding:8}} onPress={() => this.onAdd() }><Text style={{color:'white',marginLeft:4}}>Add</Text><Icon active name='plus' /></Button></Col>
                </Row>
                </Grid>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>{this.renderSelected()}</View>
            </Content>  

            
        );
       
  }
}

  
export default MultiPicker;
