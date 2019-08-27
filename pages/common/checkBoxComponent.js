
import { Body, CheckBox, Col, ListItem, Text } from 'native-base';
import React from 'react';
import { default as commonStyle } from './commonStyling';

export default class CheckBoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedState: false
        }
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.getView = this.getView.bind(this);
    }


    componentDidMount() {
        const {  updateToParent, controlType , currentState = false} = this.props;
        console.log("currentState::::", currentState);
        this.setState({
            checkedState: currentState
        });
        if (updateToParent) {
            updateToParent({ type: controlType, value:false })
        }
    }

  
    onSelectionChanged() {
        const { updateToParent,controlType } = this.props;
        const {checkedState} = this.state;
        this.setState({
            checkedState: !checkedState
        });
        if (updateToParent) {
            updateToParent({ type: controlType, value: !checkedState })
        }

    }

    getView() {
        let returnedView;
        const { checkedState = false} = this.state;
        const {  checkBoxLabel = "DDE" , onCheckBoxChanged = this.onSelectionChanged, currentState } = this.props;
        
        returnedView = (
            <ListItem
                style={{
                    padding: "0%",
                    marginLeft: "0%",
                    borderWidth: 0,
                    borderColor:"#FFFFFF"
                }}
                button
                onPress={() => {
                    onCheckBoxChanged()
                }}
            >
                <CheckBox checked={checkedState} color="black" style={{
                    paddingLeft: "0%",
                    marginLeft: "0%"

                }} />
                <Body>
                    <Text style={commonStyle.darkLabelStyling} >{checkBoxLabel} </Text>
                </Body>
            </ListItem>
        );
        return returnedView;
    }

    render() {
        return (
            <Col>
                {this.getView()}
            </Col>
        )
    }
}

