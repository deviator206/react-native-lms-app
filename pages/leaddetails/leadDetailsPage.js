import { Button, Card, CardItem, Col, Container, Content, Footer, Grid, Input, Item, Row, Text, Textarea, View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';
import { default as FeatherIcon } from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import LeadApi from '../../services/LeadApi';
import CheckBoxComponent from '../common/checkBoxComponent';
import { default as commonStyle } from '../common/commonStyling';
import appConfig from '../common/config';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './leadDetailsPageStyle';

const leadApi = new LeadApi({ state: {} });

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
    this.willFocusSubscription = null;

  }


  getFormattedAddress(leadContact) {
    const { state, country }= leadContact;
    let address ='';
    if(state && state != '') {
      address += " "+ state
    }

    if(country && country != '') {
      address += " "+ country
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

  loadLeadDetail() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('leadId', 'NO-ID');

    this.setState({
      spinner: true
    });
    this.props.loadLeadDetail({ itemId }).then(this.onLeadResponseSuccess).catch(this.onLeadResponseError)
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.loadLeadDetail);
    /*this.setState({
      spinner: false,
      leadDetails: { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" }
    });*/
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
    const {leadDetails} = this.state;
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
    const {leadDetails} = this.state;
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
    const { leadDetails} = this.state;
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
                    <Text style={styleContent.requirement} > {leadDetails.creationDate}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.customerName}> {leadDetails.custName}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.requirement} > {leadDetails.description}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.requirement} > {leadDetails.source}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.requirement} > {leadDetails.tenure}</Text>
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

        <HeaderComponent navigation={navigation} title="Leads Detail"  />
        <Content style={styleContent.mainContent}>
          <Grid style={styleContent.gridWrapper} >
            {this.getCustomerInfo()}

            {this.getContactInfo()}
            {this.getSalesRepInfo()}
            {this.getBusinessUnitInfo()}
            {this.getStatusInfo()}

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