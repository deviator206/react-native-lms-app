import { Body, Button, Card, View, CardItem, CheckBox, Col, Container, Content, DatePicker, Footer, Grid, Input, Item, Label, ListItem, Picker, Row, Text, Textarea } from 'native-base';
import React from 'react';
import { default as FeatherIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import RefDataApi from '../../services/RefDataApi';
import { default as commonStyle } from '../common/commonStyling';
import DropDownComponent from '../common/dropdownComponent';
import appConfig from '../common/config';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './addLeadStyle';
import BUListComponent from './BUListComponent';


const refDataApi = new RefDataApi({ state: {} });
class AddLeadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      selectedSource: undefined,
      selectedTenure: undefined,
      currentSelectedBU: appConfig.BU_LIST[0],
      selectedBuList: [],
      isSelfApproved: false,
      leadAddedDate: new Date(2018, 4, 4)
    };
    this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
    this.getHeaderSection = this.getHeaderSection.bind(this);
    this.onSourceChanged = this.onSourceChanged.bind(this);
    this.onBuSelectionChanged = this.onBuSelectionChanged.bind(this);
    this.onLeadAddDateSelected = this.onLeadAddDateSelected.bind(this);
    this.getLeadSourceTypes = this.getLeadSourceTypes.bind(this);
    this.getDatePickerView = this.getDatePickerView.bind(this);

    this.onTenureChanged = this.onTenureChanged.bind(this);
    this.getDropdownFor = this.getDropdownFor.bind(this);
    this.getUnitAddedList = this.getUnitAddedList.bind(this);
    this.onBuSelectionConfirmed = this.onBuSelectionConfirmed.bind(this);
    this.updateBuRmoval = this.updateBuRmoval.bind(this);
    this.onSelfApprovedClicked = this.onSelfApprovedClicked.bind(this);
  }

  componentDidMount() {

    this.props.loadRefData().then((resp) => {
      this.props.dispatchAction({ type: 'FETCH_REF_DATA', data: resp });
      this.setState({
        spinner: false,
      });
    }).catch((resp) => {
      console.log(resp)
      this.setState({
        spinner: false,
      });
    });
    this.setState({
      spinner: true,
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
      <HeaderComponent title="Add Lead" showSideMenuBtn={true} sideMenuClickHandler={() => {
        alert("TEST")
      }} />
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



  getDropdownFor(type) {
    let returnedView = '';
    let dataSource = [];
    switch (type) {
      case 'TENURE':
        dataSource = appConfig.LEAD_TENURE;
        break;
      case 'SOURCE_TYPE':
        dataSource = appConfig.LEAD_SOURCE_TYPE;
        break;
      case 'SALES_REP':
        dataSource = appConfig.SALES_REP_LIST;
        break;
      case 'CURRENCY':
        dataSource = appConfig.SUPPORTED_CURRENCY;
        break;
      case 'INDUSTRY':
        dataSource = appConfig.INDUSTRY_LIST;
        break;
      case 'BU_NAME':
        dataSource = appConfig.BU_LIST;
        break;
      case 'COUNTRY':
        dataSource = ["INDIA", "USA"];

        break;
      case 'STATE':
        dataSource = ["PUNJAB", "MAH"];
        break;
      default:
        break;
    }

    returnedView = <DropDownComponent dataSource={dataSource} />;
    return returnedView;

  }
  getDropdownFor1(type) {
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
            (<Picker.Item
              label={singleItem.toUpperCase()}
              style={styleContent.dynamicComponentTextStyle}
              value={singleItem} />)
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
    const { isSelfApproved = false } = this.state;
    this.setState({
      isSelfApproved: !isSelfApproved
    });
    console.log(isSelfApproved)
  }

  getViewForSelfApproval() {
    const { isSelfApproved = false } = this.state;
    const selfApprovalCheckbox = (
      <Col 
      style={{
        width:"50%",
      }}
      >
        <ListItem
        style={{
          padding:"0%",
         
        }}
          button
          onPress={() => {
            this.onSelfApprovedClicked();
          }}
        >
          <CheckBox checked={isSelfApproved} color="black" style={{
            paddingLeft:"0%",
            marginLeft: "0%"

          }} />
          <Body>
            <Text style={commonStyle.labelStyling} 
            >{i18nMessages.lbl_self_approved} </Text>
          </Body>
        </ListItem>
      </Col>

    );
    const saleRepSelection = (
      <Col 
      style={{
        width:"50%"
      }}
      >
        <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_select_rep} </Text>
        <Item >
          {this.getDropdownFor('SALES_REP')}
        </Item>
      </Col>
    )
    if (isSelfApproved) {
      return (
        <Row
          style={{
            marginTop: "3%"
          }}
        >
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
    const { isSelfApproved = false } = this.state;
    const { ref_info } = this.props;
    console.log(ref_info);
    return (
      <Container style={styleContent.container}>
        {this.getHeaderSection()}
        <Content style={styleContent.mainContent}>
          <Card style={styleContent.gridWrapper}>
            <CardItem>
              <Grid >
                <Row>
                  <Col >
                    <Text note style={commonStyle.sectionTitle}>{i18nMessages.date_label}</Text>
                  </Col>
                  <Col>

                    <Text note style={commonStyle.sectionTitle} >{i18nMessages.source_type}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={
                    {
                      backgroundColor: "white",
                    }
                  }>
                    <Grid>
                      <Row>
                        <Col>
                          <FeatherIcon name="calendar" style={styleContent.calenderIcon} />
                        </Col>
                        <Col style={{
                          width: "80%"
                        }}>
                          {this.getDatePickerView()}
                        </Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col>
                    {this.getDropdownFor("SOURCE_TYPE")}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label style={commonStyle.labelStyling}>{i18nMessages.customer_name_lbl}</Label>
                    <Item  >
                      <Input
                        style={commonStyle.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.requirement_project_lbl} </Text></Col></Row>

                <Row>
                  <Col>
                    <Item>
                      <Textarea
                        style={commonStyle.dynamicComponentTextAreaStyle}
                        rowSpan={4}
                        bordered
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.tenure_lbl} </Text>
                    <Item >
                      {this.getDropdownFor('TENURE')}

                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={commonStyle.sectionTitle} >{i18nMessages.lbl_contact_info}</Text></Col></Row>
                <Row>
                  <Col>

                    <Label style={commonStyle.labelStyling} >
                      {i18nMessages.lbl_contact_name}
                    </Label>
                    <Item >

                      <Input
                        style={commonStyle.dynamicComponentTextStyle}
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
                    <Label style={commonStyle.labelStyling} >
                      {i18nMessages.lbl_contact_email}
                    </Label>
                    <Item >

                      <Input
                        style={commonStyle.dynamicComponentTextStyle}
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
                    <Label style={commonStyle.labelStyling} >
                      {i18nMessages.lbl_contact_phone}
                    </Label>
                    <Item >

                      <Input
                        style={commonStyle.dynamicComponentTextStyle}
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
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_contact_country} </Text>
                    <Item >
                      {this.getDropdownFor('COUNTRY')}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_contact_state} </Text>
                    <Item >
                      {this.getDropdownFor('STATE')}
                    </Item>
                  </Col>
                </Row>

                <Row><Col><Text note style={commonStyle.sectionTitle} >{i18nMessages.lbl_business_unit_info}</Text></Col></Row>
                <Row>
                  <Col style={{
                    width: "70%"
                  }}>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_business_unit_name} </Text>
                    <Item >
                      {this.getDropdownFor('BU_NAME')}
                    </Item>
                  </Col>
                  <Col
                  >
                    <Button iconLeft
                      style={{
                        width: "80%",
                        backgroundColor: "#EC2227",
                        marginTop: "25%",
                        marginLeft: "10%"
                      }}
                    >
                      <Icon name="add" style={{
                        marginLeft: "15%",
                        fontSize: 24,
                        color: "white"
                      }} />
                      <Text
                        style={
                          {
                            marginRight: "30%",
                            paddingLeft: "0%",
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }
                        }
                      > {i18nMessages.lbl_add_bu}</Text>
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
                    <Label note style={commonStyle.labelStyling} >{i18nMessages.lbl_industry} </Label>
                    <Item >
                      {this.getDropdownFor('INDUSTRY')}
                    </Item>
                  </Col>
                </Row>
                <Row style={{
                  marginTop: "3%"
                }}>
                  <Col
                    style={{
                      width: "40%"
                    }}
                  >
                    <Label note style={commonStyle.labelStyling} >{i18nMessages.lbl_estimated_budget} </Label>
                    <Item >

                      <Input
                        style={commonStyle.dynamicComponentTextStyle}
                        returnKeyType="next"
                        clearButtonMode="always"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                    </Item>
                  </Col>
                  <Col
                    style={{
                      width: "40%",
                      marginLeft: "10%"
                    }}
                  >
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_currency} </Text>
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
            <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
          </Button >
        </Footer>
        {this.getSpinnerComponentView()}

      </Container>
    );
  }
}

// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    loadRefData: async () => {
      await refDataApi.fetchRefData({
        params: "type=SOURCE,CURRENCY,TENURE,COUNTRY,INDUSTRY,BU"
      });
    },
    dispatchAction: (param) => {
      dispatch(param);
    }
  }
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    count: state.count,
    ref_info: refDataApi.getRefInfo(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLeadPage)