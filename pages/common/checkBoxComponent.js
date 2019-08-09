
import { Body, CheckBox, Col, ListItem, Text } from 'native-base';
import React from 'react';

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
                button
                onPress={() => {
                    alert("CLICKED ")
                }}
            >
                <CheckBox checked={checkedState} />
                <Body>
                    <Text>{checkBoxLabel} </Text>
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

