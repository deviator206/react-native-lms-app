import { Body, Button, Card, CardItem, CheckBox, Col, Container, Content, DatePicker, Footer, Grid, Header, Input, Item, Label, Left, ListItem, Picker, Right, Row, Text, Textarea, Title } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appConfig from '../common/config';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './addLeadStyle';
import BUListComponent from './BUListComponent';


export default class AddLeadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      selectedSource: undefined,
      selectedTenure: undefined,
      currentSelectedBU: undefined,
      selectedBuList: [],
      isSelfApproved: false,
      leadAddedDate: new Date(2018, 4, 4)
    }
    this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
    this.getHeaderSection = this.getHeaderSection.bind(this);
    this.onSourceChanged = this.onSourceChanged.bind(this);
    this.onBuSelectionChanged = this.onBuSelectionChanged.bind(this);
    this.onLeadAddDateSelected = this.onLeadAddDateSelected.bind(this);
    this.getLeadSourceTypes = this.getLeadSourceTypes.bind(this);
    this.getDatePickerView = this.getDatePickerView.bind(this);
    this.getDropdownForTenure = this.getDropdownForTenure.bind(this);
    this.onTenureChanged = this.onTenureChanged.bind(this);
    this.getDropdownFor = this.getDropdownFor.bind(this);
    this.getUnitAddedList = this.getUnitAddedList.bind(this);
    this.onBuSelectionConfirmed = this.onBuSelectionConfirmed.bind(this);
    this.updateBuRmoval = this.updateBuRmoval.bind(this);
    this.onSelfApprovedClicked = this.onSelfApprovedClicked.bind(this);
  }

  componentDidMount() {
    this.setState({
      spinner: false,
      selectedSource: undefined,
      selectedTenure: undefined,
      currentSelectedBU: appConfig.BU_LIST[0],
      selectedBuList: [],
      isSelfApproved: false,
      leadAddedDate: new Date(2018, 4, 4)
    });
  }

  onLeadAddDateSelected(newDate) {
    // this.setState({ leadAddedDate: newDate });
    console.log(newDate);
  }

  onTenureChanged(value) {
    this.setState({
      selectedTenure: value
    });
  }

  onBuSelectionChanged(value) {
    this.setState({
      currentSelectedBU: value
    });
  }

  onSourceChanged(value) {
    this.setState({
      selectedSource: value
    });
  }

  getHeaderSection() {
    return (
      <Header style={styleContent.headerSection}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" style={{color:"white", fontSize:35}} />
          </Button>
        </Left>
        <Body>
          <Title>Add Lead</Title>
        </Body>
        <Right />
      </Header>

    )
  }


  getDatePickerView() {
    return (
      <DatePicker
        defaultDate={this.state.leadAddedDate}
        textStyle={styleContent.datePickerStyle}
        placeHolderTextStyle={styleContent.datePickerStyle}
        animationType={"fade"}
        placeHolderText={i18nMessages.select_date_lbl}
        onDateChange={this.onLeadAddDateSelected}
      />
    )
  }
  getSpinnerComponentView() {
    const { spinner } = this.state;
    console.log(spinner)
    const loaderView = (<SpinnerComponent />);
    const nonLoaderView = null;
    if (spinner) {
      return loaderView;
    }
    return nonLoaderView;
  }

  getLeadSourceTypes() {
    return (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="keyboard-arrow-down" />}
          style={styleContent.dynamicComponentTextStyle}
          selectedValue={this.state.selectedSource}
          placeholderStyle={styleContent.dynamicComponentTextStyle}
          onValueChange={this.onSourceChanged.bind(this)}
          placeholderIconColor="#007aff"
        >
          <Picker.Item label="Wallet" style={styleContent.dynamicComponentTextStyle} value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
        </Picker>
      </Item>

    )
  }

  getDropdownForTenure() {
    return (
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={styleContent.dynamicComponentTextStyle}
          selectedValue={this.state.selectedSource}
          placeholderStyle={styleContent.dynamicComponentTextStyle}
          onValueChange={this.onSourceChanged.bind(this)}
          placeholderIconColor="#007aff"
        >
          <Picker.Item label="Wallet" style={styleContent.dynamicComponentTextStyle} value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
        </Picker>
      </Item>
    );
  }


  getDropdownFor(type) {
    let returnedView = '';
    const pickerItemArr = [];
    switch (type) {
      case 'TENURE':
        appConfig.LEAD_TENURE.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);
        break;
      case 'SOURCE_TYPE':
        appConfig.LEAD_SOURCE_TYPE.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);
        break;
      case 'SALES_REP':
        appConfig.SALES_REP_LIST.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);
        break;
      case 'CURRENCY':
        appConfig.SUPPORTED_CURRENCY.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);

        break;
      case 'INDUSTRY':
        appConfig.INDUSTRY_LIST.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);
        break;
      case 'BU_NAME':
        appConfig.BU_LIST.forEach(singleItem => {
          pickerItemArr.push(
            (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
          )
        });
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.currentSelectedBU}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onBuSelectionChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              {pickerItemArr}

            </Picker>
          </Item>);
        break;
      case 'COUNTRY':
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.selectedSource}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onSourceChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="India" style={styleContent.dynamicComponentTextStyle} value="key0" />
              <Picker.Item label="Chine" value="key1" />
              <Picker.Item label="Pakistan" value="key2" />
            </Picker>
          </Item>);
        break;
      case 'STATE':
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.selectedSource}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onSourceChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="Maharashtra" style={styleContent.dynamicComponentTextStyle} value="key0" />
              <Picker.Item label="Karnataka" value="key1" />
              <Picker.Item label="Punjab" value="key2" />
            </Picker>
          </Item>);
        break;
      default:
        returnedView = (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styleContent.dynamicComponentTextStyle}
              selectedValue={this.state.selectedSource}
              placeholderStyle={styleContent.dynamicComponentTextStyle}
              onValueChange={this.onSourceChanged.bind(this)}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="RANDOM" style={styleContent.dynamicComponentTextStyle} value="key0" />
              <Picker.Item label="CHECK THIS" value="key1" />
            </Picker>
          </Item>);
        break;
    }

    return returnedView;
  }

  onBuSelectionConfirmed() {
    const { currentSelectedBU, selectedBuList = [] } = this.state;
    if (currentSelectedBU && selectedBuList.indexOf(currentSelectedBU) === -1) {
      selectedBuList.push(currentSelectedBU)
    }
    this.setState({
      selectedBuList: selectedBuList
    });
  }

  updateBuRmoval(value) {
    const { selectedBuList = [] } = this.state;
    const indexOfElement = selectedBuList.indexOf(value);
    if (indexOfElement !== -1) {
      selectedBuList.splice(indexOfElement, 1)
    }
    this.setState({
      selectedBuList: selectedBuList
    });

  }
  getUnitAddedList() {
    const { selectedBuList = [] } = this.state;
    return (
      <BUListComponent businessUnitList={selectedBuList} onBuRemoval={this.updateBuRmoval} />
    )
  }

  onSelfApprovedClicked() {
    const { isSelfApproved } = this.state;
    this.setState({
      isSelfApproved: !isSelfApproved
    });
    console.log(isSelfApproved)
  }

  getViewForSelfApproval() {
    const { isSelfApproved } = this.state;
    const selfApprovalCheckbox = (
      <Col>
        <ListItem
          button
          onPress={() => {
            this.onSelfApprovedClicked();
          }}
        >
          <CheckBox checked={isSelfApproved} />
          <Body>
            <Text>{i18nMessages.lbl_self_approved} </Text>
          </Body>
        </ListItem>
      </Col>

    );
    const saleRepSelection = (
      <Col>
        <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_select_rep} </Text>
        <Item >
          {this.getDropdownFor('SALES_REP')}
        </Item>
      </Col>
    )
    if (isSelfApproved) {
      return (
        <Row>
          {selfApprovalCheckbox}
          {saleRepSelection}
        </Row>
      )
    }
    return (
      <Row>
        {selfApprovalCheckbox}
      </Row>
    )
  }

  render() {
    const { isSelfApproved } = this.state;
    return (
      <Container style={styleContent.container}>
        {this.getHeaderSection()}
        <Content style={styleContent.mainContent}>
          <Card style={styleContent.gridWrapper}>
            <CardItem>
              <Grid >
                <Row>
                  <Col >
                    <Text note style={styleContent.labelStyling}>{i18nMessages.date_label}</Text>
                  </Col>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.source_type}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.getDatePickerView()}
                  </Col>
                  <Col>
                    {this.getDropdownFor("SOURCE_TYPE")}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label style={styleContent.labelStyling}>{i18nMessages.customer_name_lbl}</Label>
                    <Item >
                      <Input
                        style={styleContent.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={styleContent.labelStyling} >{i18nMessages.requirement_project_lbl} </Text></Col></Row>

                <Row>
                  <Col>
                    <Item>
                      <Textarea
                        style={styleContent.dynamicComponentTextStyle}
                        rowSpan={4} style={styleContent.textAreaStyling}
                        bordered
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.tenure_lbl} </Text>
                    <Item >
                      {this.getDropdownFor('TENURE')}

                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={styleContent.labelStylingSection} >{i18nMessages.lbl_contact_info}</Text></Col></Row>
                <Row>
                  <Col>
                    <Item floatingLabel>
                      <Label style={styleContent.labelStyling} >
                        {i18nMessages.lbl_contact_name}
                      </Label>
                      <Input
                        style={styleContent.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Item floatingLabel>
                      <Label style={styleContent.labelStyling} >
                        {i18nMessages.lbl_contact_email}
                      </Label>
                      <Input
                        style={styleContent.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Item floatingLabel>
                      <Label style={styleContent.labelStyling} >
                        {i18nMessages.lbl_contact_phone}
                      </Label>
                      <Input
                        style={styleContent.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_contact_country} </Text>
                    <Item >
                      {this.getDropdownFor('COUNTRY')}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_contact_state} </Text>
                    <Item >
                      {this.getDropdownFor('STATE')}
                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={styleContent.labelStylingSection} >{i18nMessages.lbl_business_unit_info}</Text></Col></Row>
                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_business_unit_name} </Text>
                    <Item >
                      {this.getDropdownFor('BU_NAME')}
                    </Item>
                  </Col>
                  <Col>
                    <Button style={styleContent.addBUStyling} onPress={() => { this.onBuSelectionConfirmed() }} >
                      <Icon name="add"  /><Text style={{ fontSize: 16 }}>{i18nMessages.lbl_add_bu} </Text>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.getUnitAddedList()}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_industry} </Text>
                    <Item >
                      {this.getDropdownFor('INDUSTRY')}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_estimated_budget} </Text>
                    <Item >

                      <Input
                        style={styleContent.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                    </Item>
                  </Col>
                  <Col>
                    <Text note style={styleContent.labelStyling} >{i18nMessages.lbl_currency} </Text>
                    <Item >
                      {this.getDropdownFor('CURRENCY')}
                    </Item>
                  </Col>
                </Row>
                {this.getViewForSelfApproval()}


              </Grid>

            </CardItem>
          </Card>

        </Content>

        <Footer>
          <Button style={styleContent.addLeadFooter}>
            <Text style={styleContent.addLeadFooterText}>ADD LEAD </Text>
            <Icon name="arrow-forward" style={{color:"white", fontSize:20}} />
          </Button >
        </Footer>
        {this.getSpinnerComponentView()}

      </Container>
    );
  }
}