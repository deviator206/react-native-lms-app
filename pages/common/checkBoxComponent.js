
import { Body, CheckBox, Col, ListItem, Text } from 'native-base';
import React from 'react';
import { default as commonStyle } from './commonStyling';

export default class CheckBoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    onSelectionChanged() {

    }

    getView() {
        let returnedView;
        const { checkedState = false, checkBoxLabel = "DDE" } = this.props;
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
                    alert("CLICKED ")
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

