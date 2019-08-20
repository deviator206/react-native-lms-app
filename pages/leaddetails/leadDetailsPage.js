import { Button, Card, CardItem, Col, Container, Content, Footer, Grid, Input, Item, Row, Text, Textarea, View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import { default as FeatherIcon } from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import LeadApi from '../../services/LeadApi';
import RefDataApi from '../../services/RefDataApi';
import UserApi from '../../services/UserApi';
import CheckBoxComponent from '../common/checkBoxComponent';
import { default as commonStyle } from '../common/commonStyling';
import appConfig from '../common/config';
import { default as appConstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './leadDetailsPageStyle';

const leadApi = new LeadApi({ state: {} });
const userApi = new UserApi({ state: {} });
const refDataApi = new RefDataApi({ state: {} });

class LeadDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      leadDetails: undefined
    }
    this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
    this.sideMenuClickHandler = this.sideMenuClickHandler.bind(this);
    this.getCustomerInfo = this.getCustomerInfo.bind(this);
    this.getContactInfo = this.getContactInfo.bind(this);
    this.getSalesRepInfo = this.getSalesRepInfo.bind(this);
    this.getBusinessUnitInfo = this.getBusinessUnitInfo.bind(this);
    this.getActionsInfo = this.getActionsInfo.bind(this);
    this.getStatusInfo = this.getStatusInfo.bind(this);
    this.loadLeadDetail = this.loadLeadDetail.bind(this);

    this.onLeadResponseSuccess = this.onLeadResponseSuccess.bind(this);
    this.onLeadResponseError = this.onLeadResponseError.bind(this);
    this.getFormattedAddress = this.getFormattedAddress.bind(this);
    this.getDropdownForSplType = this.getDropdownForSplType.bind(this);
    this.getDropdownFor = this.getDropdownFor.bind(this);
    this.onUserListLoaded = this.onUserListLoaded.bind(this);
    this.onUserListLoadedError = this.onUserListLoadedError.bind(this);

    this.onResponseFromReferenceData = this.onResponseFromReferenceData.bind(this);
    this.onErrorResponseFromReferenceData = this.onErrorResponseFromReferenceData.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);

    this.willFocusSubscription = null;

  }


  getFormattedAddress(leadContact) {
    const { state, country } = leadContact;
    let address = '';
    if (state && state != '') {
      address += " " + state
    }

    if (country && country != '') {
      address += " " + country
    }

    return address;
  }

  onLeadResponseSuccess(resp) {
    this.setState({
      spinner: false,
      leadDetails: resp
    });
  }

  onLeadResponseError(error) {
    console.log(error);
    this.setState({
      spinner: false
    });
  }

  onUserListLoaded(resp) {
    this.setState({
      userList: resp
    });

    // NON render set state
    this.setState({
      SALES_REP: (resp && resp[0] && resp[0].userName) ? resp[0].userName : ''
    });
  }

  onUserListLoadedError(resp) {
    this.setState({
      userList: []
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      CURRENCY,
      BU,
      SALES_REP
    } = this.state;
    if (nextState &&
      (
        (CURRENCY !== nextState.CURRENCY) ||
        (BU !== nextState.BU) ||
        (SALES_REP !== nextState.SALES_REP)
      )
    ) {
      return false;
    }
    return true
  }

  onResponseFromReferenceData(resp) {
    const referenceDefaultValues = {};
    for (let [key, value] of Object.entries(resp)) {
      referenceDefaultValues[key] = value[0].code
    }
    this.setState({
      referenceData: resp
    });

    // NON render
    this.setState({
      ...referenceDefaultValues
    })
  }

  onErrorResponseFromReferenceData(resp) {

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
    />;
    return returnedView;

  }


  loadLeadDetail() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('leadId', 'NO-ID');

    this.setState({
      spinner: true
    });
    this.props.loadLeadDetail({ itemId }).then(this.onLeadResponseSuccess).catch(this.onLeadResponseError);
    this.props.loadUserList().then(this.onUserListLoaded).catch(this.onUserListLoadedError);
    this.props.loadRefData().then(this.onResponseFromReferenceData).catch(this.onErrorResponseFromReferenceData);

  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.loadLeadDetail);
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }

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


  sideMenuClickHandler() {
    alert("clicked side panel")
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
        />;
        break;
      case appConstant.DROP_DOWN_TYPE.SALES_REP:
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


  getStatusInfo() {
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadsSummaryRes) {
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Text style={styleContent.secondaryLabel}> STATUS</Text>
                  </Row>
                  <Row>
                    <Col style={styleContent.colValue}>
                      <Text style={styleContent.primaryText}> [TODO: PENDING] </Text>
                    </Col>
                    <Col style={styleContent.colValueThird} >
                      <View style={styleContent.approvedStatusCircle} />
                    </Col>

                  </Row>

                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }
    //alert(":: ",spinner)
    return returnedView;
  }


  getActionsInfo() {
    const { leadDetails } = this.state;
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadsSummaryRes) {
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row >
                    <Text style={styleContent.secondaryLabel}> ESTIMATED BUDGET </Text>
                  </Row>
                  <Row>
                    <Col style={{
                      width: "50%"
                    }}>
                      <Item >
                        <Input
                          style={styleContent.secondaryDarkText}
                          returnKeyType="next"
                          clearButtonMode="always"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                      </Item>
                    </Col>
                    <Col style={{
                      marginTop: "3%",
                      width: "30%",
                      marginLeft: "10%"
                    }}>
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.CURRENCY)}
                    </Col>
                  </Row>
                  <Row style={styleContent.marginTopStyling}>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_assign_rep} />
                    </Col>
                    <Col style={styleContent.marginTopStyling}>
                      {this.getDropdownForSplType(appConstant.DROP_DOWN_TYPE.SALES_REP)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_modify_bu} />
                    </Col>
                    <Col style={styleContent.marginTopStyling}>
                      {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.BU_NAME)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_notify_bu} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Textarea
                        style={commonStyle.dynamicComponentTextAreaStyle}
                        rowSpan={4}
                        bordered
                        placeholder="Lorem Ipsum is sim"
                      />


                    </Col>
                  </Row>

                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      );
    }
    return returnedView;
  }
  getActionsInfo1() {
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadsSummaryRes) {
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row >
                    <Text style={styleContent.secondaryLabel}> ESTIMATED BUDGET </Text>
                  </Row>
                  <Row>
                    <Col style={{
                      width: "50%"
                    }}>
                      <Item >
                        <Input
                          style={styleContent.secondaryDarkText}
                          returnKeyType="next"
                          clearButtonMode="always"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                      </Item>
                    </Col>
                    <Col style={{
                      marginTop: "3%",
                      width: "30%",
                      marginLeft: "10%"
                    }}>
                      <DropDownComponent dataSource={appConfig.SUPPORTED_CURRENCY} />
                    </Col>
                  </Row>
                  <Row style={styleContent.marginTopStyling}>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_assign_rep} />
                    </Col>
                    <Col style={styleContent.marginTopStyling}>
                      <DropDownComponent dataSource={appConfig.SALES_REP_LIST} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_modify_bu} />
                    </Col>
                    <Col style={styleContent.marginTopStyling}>
                      <DropDownComponent dataSource={appConfig.BU_LIST} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <CheckBoxComponent checkBoxLabel={i18nMessages.lbl_notify_bu} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Textarea
                        style={commonStyle.dynamicComponentTextAreaStyle}
                        rowSpan={4}
                        bordered
                        placeholder="Lorem Ipsum is sim"
                      />


                    </Col>
                  </Row>
                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }
    //alert(":: ",spinner)
    return returnedView;

  }
  getBusinessUnitInfo() {
    const { leadDetails } = this.state;
    // const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["Spectro", "atlas"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadsSummaryRes && leadDetails.leadsSummaryRes.businessUnits) {
      let unitList = [];
      leadDetails.leadsSummaryRes.businessUnits.forEach((singleUnit) => {
        unitList.push((
          <Row>
            <Col>
              <Text style={styleContent.primaryText}> {singleUnit} </Text>
            </Col>
          </Row>
        ));

      });
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Text style={styleContent.secondaryLabel}> BUSINESS UNIT </Text>
                  </Row>
                  <Row>
                    <Col>
                      <Grid>
                        {unitList}
                      </Grid>
                    </Col>
                  </Row>
                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }
    //alert(":: ",spinner)
    return returnedView;

  }


  getSalesRepInfo() {
    const { leadDetails } = this.state;
    //  const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "Sunayna Rao", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadsSummaryRes) {
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Text style={styleContent.secondaryLabel}> Sales Reprentative </Text>
                  </Row>
                  <Row>
                    <Col>
                      <Text style={styleContent.primaryText}> {leadDetails.leadsSummaryRes.salesRep} </Text>
                    </Col>

                  </Row>

                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }
    //alert(":: ",spinner)
    return returnedView;

  }


  getContactInfo() {
    const { leadDetails } = this.state;
    // const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "Mr. Rajesh Kumar", "email": "rkumar@rksolustions.com", "phoneNumber": "9896777716", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id && leadDetails.leadContact) {
      returnedView = (
        <Row>
          <Card style={styleContent.gridCardWrapper} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Text style={styleContent.secondaryLabel}> CONTACT </Text>
                  </Row>
                  <Row>
                    <Col style={styleContent.colValue}>
                      <Text style={styleContent.primaryText}> {leadDetails.leadContact.name} </Text>
                      <Text style={styleContent.secondaryTextDesignation}>  {leadDetails.leadContact.designation} </Text>
                    </Col>

                  </Row>
                  <Row>
                    <Text style={styleContent.secondaryText}> {this.getFormattedAddress(leadDetails.leadContact)} </Text>
                  </Row>

                  <Row style={
                    {
                      marginBottom: "2%"
                    }
                  }>
                    <Icon name="email-outline" style={styleContent.iconStyling} />
                    <Text style={styleContent.secondaryDarkText}> {leadDetails.leadContact.email} </Text>
                  </Row>

                  <Row>
                    <FeatherIcon name="phone" style={styleContent.iconStyling} />
                    <Text style={styleContent.secondaryDarkText}> {leadDetails.leadContact.phoneNumber} </Text>
                  </Row>
                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }
    //alert(":: ",spinner)
    return returnedView;

  }
  getCustomerInfo() {
    const { leadDetails } = this.state;
    // const leadDetails = { "id": 1, "source": "Marketing", "custName": "RekTech Pvt. Ltd", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id) {
      returnedView = (
        <Row>
          <Card transparent style={styleContent.noCard} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Col>
                      <Text style={styleContent.requirement} > DATE : {leadDetails.creationDate}</Text>
                    </Col>
                    <Col>
                      <Text style={styleContent.requirement} > SOURCE: {leadDetails.source}</Text>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Text style={styleContent.customerName}> {leadDetails.custName}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.requirement} > {leadDetails.description}</Text>
                  </Row>
                  
                  <Row>
                    <Text style={styleContent.requirement} > TENURE : {leadDetails.tenure}</Text>
                  </Row>

                </Grid>
              </Col>
            </CardItem>
          </Card>
        </Row>
      )
    }

    return returnedView;

  }

  render() {
    // {this.getActionsInfo()}
    const { navigation } = this.props;
    return (
      <Container>

        <HeaderComponent navigation={navigation} title="Leads Detail" />
        <Content style={styleContent.mainContent}>
          <Grid style={styleContent.gridWrapper} >
            {this.getCustomerInfo()}

            {this.getContactInfo()}
            {this.getSalesRepInfo()}
            {this.getBusinessUnitInfo()}
            {this.getStatusInfo()}
            {this.getActionsInfo()}

          </Grid>
          <Footer>
            <Button style={styleContent.addLeadFooter}>
              <Text style={styleContent.addLeadFooterText}>UPDATE LEAD </Text>
              <MaterialIcon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
            </Button >
          </Footer>
        </Content>
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
    loadLeadDetail: (inputParams) => {
      return leadApi.getLeadDetails(inputParams).then((resp) => {
        return resp;
      })
    },
    loadRefData: (inputParams) => {
      return refDataApi.fetchRefData({
        params: (inputParams) ? inputParams : "type=CURRENCY,BU"
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailsPage)