
import { Item, Picker } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleContent from './commonStyling';

export default class DropDownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    onSelectionChanged() {

    }

    getView() {
        let returnedView;
        const { dataSource=["1","2","3"], onDropDownSelectionChange = this.onSelectionChanged } = this.props;
        const pickerItemArr = [];
        dataSource.forEach(singleItem => {
            pickerItemArr.push(
                (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
            )
        });
        returnedView = (
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styleContent.dynamicComponentTextStyle}
                placeholderStyle={styleContent.dynamicComponentTextStyle}
                onValueChange={onDropDownSelectionChange()}
                placeholderIconColor="#007aff"
            >
                {pickerItemArr}

            </Picker>
        );
        return returnedView;
    }

    render() {
        return (
            <Item picker>
                {this.getView()}
            </Item>
        )
    }
}

