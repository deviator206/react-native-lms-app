
import { Content, Left, ListItem, Radio, Right, Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';


export default class RadioButtonGroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SELECTED_RADIO: ''
    };
    this.getRadioButtonListView = this.getRadioButtonListView.bind(this);
    this.isSelectedRadio = this.isSelectedRadio.bind(this);
    this.radioButtonSelected = this.radioButtonSelected.bind(this);
  }

  isSelectedRadio(btnCode) {
    const { defaultSelectionCode } = this.props;
    const { SELECTED_RADIO  } = this.state;
    if (SELECTED_RADIO === '')
      return (btnCode === defaultSelectionCode);
    return (btnCode === SELECTED_RADIO);
  }

  radioButtonSelected(btnCode) {
    const { defaultSelectionCode, updateToParent } = this.props;
    this.setState({
      SELECTED_RADIO: btnCode
    });

    if(updateToParent) {
      updateToParent(btnCode);
    }
  }


  componentDidMount() {
    this.setState({
      SELECTED_RADIO: ''
    });
  }

  getRadioButtonListView() {
    const { radioItemList = [] } = this.props;
    let returnedView;
    let radioItemListView = [];
    radioItemList.forEach(element => {
      radioItemListView.push((
        <ListItem
          selected={false}
          onPress={() => {
            this.radioButtonSelected(element.code);
          }}
        >
          <Left>
            <Text>{element.name}</Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#5cb85c"}
              selected={this.isSelectedRadio(element.code)}
            />
          </Right>
        </ListItem>
      ));



    });


    returnedView = (
      <View>
        {radioItemListView}
      </View>
    );

    return returnedView



  }



  render() {
    return (
      <Content>
        {this.getRadioButtonListView()}
      </Content>
    )
  }
}

