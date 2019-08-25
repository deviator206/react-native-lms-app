import { Body, Button, Card, CardItem, CheckBox, Col, Container, Content, DatePicker, Footer, Grid, Input, Item, Label, ListItem, Row, Text, Textarea } from 'native-base';
import React from 'react';
import { default as FeatherIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import LeadApi from '../../services/LeadApi';
import RefDataApi from '../../services/RefDataApi';
import UserApi from '../../services/UserApi';
import { default as commonStyle } from '../common/commonStyling';
import appConfig from '../common/config';
import { default as appConstant, default as appconstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import ModalComponent from '../common/modalComponent';
import SpinnerComponent from '../common/spinnerComponent';
import { default as Utils } from '../common/Util';
import styleContent from './addLeadStyle';
import BUListComponent from './BUListComponent';


const refDataApi = new RefDataApi({ state: {} });
const leadApi = new LeadApi({ state: {} });
const userApi = new UserApi({ state: {} });


class AddLeadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      currentSelectedBU: appConfig.BU_LIST[0],
      customerName: '',
      selectedBuList: [],
      isSelfApproved: false,
      leadCreatedDate: new Date(2018, 4, 4)
    };

    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
    this.getHeaderSection = this.getHeaderSection.bind(this);

    this.onLeadSubmit = this.onLeadSubmit.bind(this);

    this.onLeadAddDateSelected = this.onLeadAddDateSelected.bind(this);

    this.getDatePickerView = this.getDatePickerView.bind(this);

    this.getDropdownFor = this.getDropdownFor.bind(this);
    this.getDropdownForSplType = this.getDropdownForSplType.bind(this);
    this.getUnitAddedList = this.getUnitAddedList.bind(this);
    this.onBuSelectionConfirmed = this.onBuSelectionConfirmed.bind(this);
    this.updateBuRmoval = this.updateBuRmoval.bind(this);
    this.onSelfApprovedClicked = this.onSelfApprovedClicked.bind(this);

    this.onResponseFromReferenceData = this.onResponseFromReferenceData.bind(this);
    this.onErrorResponseFromReferenceData = this.onErrorResponseFromReferenceData.bind(this);

    this.onResponseSubmitLead = this.onResponseSubmitLead.bind(this);
    this.onErrorResponseSubmitLead = this.onErrorResponseSubmitLead.bind(this);

    this.inputTextFieldChanged = this.inputTextFieldChanged.bind(this);
    this.onStateLoaded = this.onStateLoaded.bind(this);
    this.overlayScreenView = this.overlayScreenView.bind(this);

    this.onFPModalClosed = this.onFPModalClosed.bind(this);
    this.onUserListLoaded = this.onUserListLoaded.bind(this);
    this.onUserListLoadedError = this.onUserListLoadedError.bind(this);
  }


  inputTextFieldChanged({ type, value }) {
    this.setState({
      [type]: value
    });
  }

  onResponseSubmitLead() {
    this.setState({
      spinner: false,
      showOverlay: true
    });
  }
  onErrorResponseSubmitLead(resp) {
    this.setState({
      spinner: false
    });
  }



  onResponseFromReferenceData(resp) {

    const referenceDefaultValues = {};
    for (let [key, value] of Object.entries(resp)) {
      referenceDefaultValues[key] = value[0].code
    }
    this.setState({
      spinner: false,
      referenceData: resp
    });

    this.setState({
      CUSTOMER_NAME: '',
      REQUIREMENT: '',
      CONTACT_NAME: '',
      CONTACT_EMAIL: '',
      CONTACT_PHONE: '',
      ESTIMATE: '',
      ...referenceDefaultValues
    })
  }

  onResponseFromReferenceData1(resp) {
    this.setState({
      spinner: false,
      referenceData: resp
    });
  }
  onErrorResponseFromReferenceData(resp) {
    this.setState({
      spinner: false
    });
  }

  onLeadSubmit() {
    const { TENURE, SOURCE, CURRENCY, INDUSTRY, COUNTRY, selectedPhyState = 'NA', leadCreatedDate = new Date(),
      CUSTOMER_NAME,
      REQUIREMENT,
      CONTACT_NAME,
      CONTACT_EMAIL,
      CONTACT_PHONE,
      ESTIMATE,
      STATE,
      SALES_REP,
      selectedBuList = []
    } = this.state;
    // const { userId = "8" } = this.props;
    const userId = (window.userInformation &&
      window.userInformation.userInfo &&
      window.userInformation.userInfo.userId) ? window.userInformation.userInfo.userId : -1;

      if(!userId || userId == -1) {
        alert("User Id is not Valid")
        return true;
      }
    const inputPayload = {
      "source": SOURCE,
      "custName": CUSTOMER_NAME,
      "description": REQUIREMENT,
      "tenure": TENURE,
      "leadContact": {
        "name": CONTACT_NAME,
        "email": CONTACT_EMAIL,
        "phoneNumber": CONTACT_PHONE,
        "country": COUNTRY,
        "state": STATE
      },
      "leadsSummaryRes": {
        "businessUnits": selectedBuList,
        "salesRep": SALES_REP,
        "industry": INDUSTRY,
        "estimate": ESTIMATE,
        "currency": CURRENCY
      },
      "deleted": false,
      "creatorId": userId,
      "creationDate": Utils.getFormattedDate(leadCreatedDate)
    }

    this.setState({
      spinner: true
    });

    this.props.submitLead(inputPayload).then(this.onResponseSubmitLead).catch(this.onErrorResponseSubmitLead);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { TENURE,
      SOURCE,
      CURRENCY,
      INDUSTRY,
      COUNTRY,
      BU,
      CUSTOMER_NAME,
      REQUIREMENT,
      CONTACT_NAME,
      CONTACT_EMAIL,
      CONTACT_PHONE,
      ESTIMATE,
      STATE,
      SALES_REP
    } = this.state;
    if (nextState &&
      (
        (TENURE !== nextState.TENURE) ||
        (SOURCE !== nextState.SOURCE) ||
        (CURRENCY !== nextState.CURRENCY) ||
        (INDUSTRY !== nextState.INDUSTRY) ||
        (COUNTRY !== nextState.COUNTRY) ||
        (BU !== nextState.BU) ||
        (CUSTOMER_NAME !== nextState.CUSTOMER_NAME) ||
        (REQUIREMENT !== nextState.REQUIREMENT) ||
        (CONTACT_NAME !== nextState.CONTACT_NAME) ||
        (CONTACT_EMAIL !== nextState.CONTACT_EMAIL) ||
        (CONTACT_PHONE !== nextState.CONTACT_PHONE) ||
        (ESTIMATE !== nextState.ESTIMATE) ||
        (STATE !== nextState.STATE) ||
        (SALES_REP !== nextState.SALES_REP)
      )
    ) {
      return false;
    }
    return true
  }

  onStateLoaded(resp) {
    const { dynamic_state_ref } = this.state;
    this.setState({
      spinner: false,
      dynamic_state_list: resp[dynamic_state_ref],

    });

    // NON render set state
    this.setState({
      STATE: (resp[dynamic_state_ref] && resp[dynamic_state_ref][0] && resp[dynamic_state_ref][0].code) ? resp[dynamic_state_ref][0].code : ''
    });

  }

  getDropdownForSplType(type) {
    const { dynamic_state_list = [], userList = [] } = this.state;
    let returnedView = null;
    let dataSource = [];
    switch (type) {
      case appConstant.DROP_DOWN_TYPE.STATE:
        dataSource = dynamic_state_list;
        returnedView = <DropDownComponent
          dataSource={dataSource}
          updateToParent={this.onDropDownChange}
          dropDownType={type}
          showAttribute='name'
          returnAttribute='code'
        />;
        break;
      case appconstant.DROP_DOWN_TYPE.SALES_REP:
        dataSource = userList;
        returnedView = <DropDownComponent
          showAttribute='userName'
          returnAttribute='userId'
          dataSource={dataSource}
          updateToParent={this.onDropDownChange}
          dropDownType={type}
        />;
        break;
      default:
        break;
    }
    return returnedView;
  }

  onDropDownChange({ type, value }) {
    const { referenceData = [] } = this.state;

    this.setState({
      [type]: value
    });

    if (type === appConstant.DROP_DOWN_TYPE.COUNTRY) {
      const dynamic_state_ref = value + "_" + appConstant.DROP_DOWN_TYPE.STATE;
      let dynamic_state_list = [];
      if (referenceData[dynamic_state_ref] && referenceData[dynamic_state_ref].length <= 0) {
        dynamic_state_list = referenceData[dynamic_state_ref];
        this.setState({
          dynamic_state_list,
          dynamic_state_ref
        });
      } else {
        this.setState({
          spinner: true,
          dynamic_state_ref
        });
        this.props.loadRefData("type=" + dynamic_state_ref).then(this.onStateLoaded).catch(this.onErrorResponseFromReferenceData);
      }
    }

  }

  componentDidMount() {
    this.props.loadRefData().then(this.onResponseFromReferenceData).catch(this.onErrorResponseFromReferenceData);
    this.setState({
      spinner: true,
      currentSelectedBU: appConfig.BU_LIST[0],
      selectedBuList: [],
      showOverlay: false,
      isSelfApproved: false,
      leadCreatedDate: new Date(2018, 4, 4)
    });
  }

  onLeadAddDateSelected(newDate) {
    this.setState({ leadCreatedDate: newDate });
  }

  onTenureChanged(value) {
    this.setState({
      selectedTenure: value
    });
  }

  onFPModalClosed() {
    this.props.navigation.goBack();
  }

  getHeaderSection() {
    const { navigation } = this.props;
    return (
      <HeaderComponent title="Add Lead" navigation={navigation} />
    )
  }


  getDatePickerView() {
    return (
      <DatePicker
        defaultDate={this.state.leadCreatedDate}
        textStyle={styleContent.datePickerStyle}
        placeHolderTextStyle={styleContent.datePickerStyle}
        animationType={"fade"}
        placeHolderText={i18nMessages.select_date_lbl}
        onDateChange={this.onLeadAddDateSelected}
      />
    )
  }

  overlayScreenView() {
    const { showOverlay = false } = this.state;

    const loaderView = (
      <ModalComponent
        modalTitle="Thank You!"
        showSecondaryForgotPassword={false}
        showSecondaryInput={false}
        modalPrimaryText="Lead has been created successfully"
        showHeaderCloseBtn={false}
        onCloseCallBackhandler={this.onFPModalClosed}
        showRegularModalButton={true}
        regularModalButtonLabel="Navigate To Previous Screen"
      />
    );
    const nonLoaderView = null;
    if (showOverlay) {
      return loaderView;
    }
    return nonLoaderView;
  }
  getSpinnerComponentView() {
    const { spinner } = this.state;

    const loaderView = (<SpinnerComponent />);
    const nonLoaderView = null;
    if (spinner) {
      return loaderView;
    }
    return nonLoaderView;
  }




  getDropdownFor(type) {
    const { referenceData = {} } = this.state;
    let returnedView = null;
    let dataSource = [];
    dataSource = (referenceData && referenceData[type]) ? referenceData[type] : [];
    returnedView = <DropDownComponent
      dataSource={dataSource}
      updateToParent={this.onDropDownChange}
      dropDownType={type}
      showAttribute='name'
      returnAttribute='code'
    />;
    return returnedView;

  }

  onBuSelectionConfirmed() {
    const { BU, selectedBuList = [] } = this.state;
    if (BU && selectedBuList.indexOf(BU) === -1) {
      selectedBuList.push(BU)
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
    const { selectedBuList = [], referenceData = {} } = this.state;
    let dataSource = [];
    dataSource = (referenceData && referenceData[appConstant.DROP_DOWN_TYPE.BU_NAME]) ? referenceData[appConstant.DROP_DOWN_TYPE.BU_NAME] : [];
    return (
      <BUListComponent businessUnitList={selectedBuList} dataSource={dataSource} onBuRemoval={this.updateBuRmoval} />
    )
  }

  onUserListLoaded(resp) {
    this.setState({
      spinner: false,
      userList: resp
    });

    // NON render set state
    this.setState({
      SALES_REP: (resp && resp[0] && resp[0].userName) ? resp[0].userName : ''
    });
  }

  onUserListLoadedError(resp) {
    this.setState({
      spinner: false,
      userList: []
    });
  }

  onSelfApprovedClicked() {
    const { isSelfApproved = false, userList = [] } = this.state;
    let newObject = {
      isSelfApproved: !isSelfApproved
    }
    if (userList.length <= 0 && !isSelfApproved) {
      newObject['spinner'] = true;
      this.props.loadUserList().then(this.onUserListLoaded).catch(this.onUserListLoadedError);
    }
    this.setState({
      ...newObject
    });
  }

  getViewForSelfApproval() {
    const { isSelfApproved = false } = this.state;
    const selfApprovalCheckbox = (
      <Col
        style={{
          width: "50%",
        }}
      >
        <ListItem
          style={{
            padding: "0%",

          }}
          button
          onPress={() => {
            this.onSelfApprovedClicked();
          }}
        >
          <CheckBox checked={isSelfApproved} color="black" style={{
            paddingLeft: "0%",
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
          width: "50%"
        }}
      >
        <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_select_rep} </Text>
        <Item >
          {this.getDropdownForSplType(appConstant.DROP_DOWN_TYPE.SALES_REP)}
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
    const { isSelfApproved = false, referenceData = {} } = this.state;
    console.log("REF DATA ", referenceData);
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
                          width: "88%"
                        }}>
                          {this.getDatePickerView()}
                        </Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col>
                    {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.SOURCE)}
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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'CUSTOMER_NAME',
                            value
                          });
                        }}
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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'REQUIREMENT',
                            value
                          });
                        }}
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.tenure_lbl} </Text>
                    <Item >
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.TENURE)}

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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'CONTACT_NAME',
                            value
                          });
                        }}
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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'CONTACT_EMAIL',
                            value
                          });
                        }}
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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'CONTACT_PHONE',
                            value
                          });
                        }}
                      />

                    </Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_contact_country} </Text>
                    <Item >
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.COUNTRY)}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_contact_state} </Text>
                    <Item >
                      {this.getDropdownForSplType(appConstant.DROP_DOWN_TYPE.STATE)}
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
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.BU_NAME)}
                    </Item>
                  </Col>
                  <Col
                  >
                    <Button
                      iconLeft
                      style={{
                        width: "80%",
                        backgroundColor: "#EC2227",
                        marginTop: "25%",
                        marginLeft: "10%",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        paddingTop: 10
                      }}
                      onPress={this.onBuSelectionConfirmed}
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
                            paddingTop: 3
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
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.INDUSTRY)}
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
                        onChangeText={(value) => {
                          this.inputTextFieldChanged({
                            type: 'ESTIMATE',
                            value
                          });
                        }}
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
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.CURRENCY)}
                    </Item>
                  </Col>
                </Row>
                {this.getViewForSelfApproval()}
              </Grid>

            </CardItem>
          </Card>

        </Content>

        <Footer>
          <Button style={styleContent.addLeadFooter}
            onPress={this.onLeadSubmit}
          >
            <Text style={styleContent.addLeadFooterText}>ADD LEAD </Text>
            <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
          </Button >
        </Footer>
        {this.overlayScreenView()}
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
    submitLead: (inputPayload) => {
      return leadApi.createLead({
        params: inputPayload
      }).then((resp) => {
        return resp;
      })
    },

    loadRefData: (inputParams) => {
      return refDataApi.fetchRefData({
        params: (inputParams) ? inputParams : "type=SOURCE,CURRENCY,TENURE,COUNTRY,INDUSTRY,BU"
      }).then(result => {
        const refInfo = {};
        if (result && result.data) {
          result.data.forEach((element) => {
            if (element && element.type) {
              if (!refInfo[element.type]) {
                refInfo[element.type] = [];
              }
              refInfo[element.type].push(element);
            }
          });
        }
        return refInfo;
      });
    },

    loadUserList: () => {
      return userApi.getUserList().then(result => {
        return result;
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
    count: state.count
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLeadPage)