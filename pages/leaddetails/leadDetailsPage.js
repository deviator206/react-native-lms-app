import { Card, CardItem, Col, Container,Button, Content, Grid, Input, Item, Row, Footer, View, Text, Textarea } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as MaterialIcon} from 'react-native-vector-icons/MaterialIcons';
import { default as FeatherIcon } from 'react-native-vector-icons/SimpleLineIcons';
import CheckBoxComponent from '../common/checkBoxComponent';
import appConfig from '../common/config';
import DropDownComponent from '../common/dropdownComponent';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './leadDetailsPageStyle';
import { default as commonStyle } from '../common/commonStyling';



export default class LeadDetailsPage extends React.Component {
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
  }

  componentDidMount() {
    this.setState({
      spinner: false,
      leadDetails: { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" }
    });
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
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["Spectro", "atlas"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
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
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "Sunayna Rao", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
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
    // const { spinner } = this.state;
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "shicv", "description": "dingDong", "leadContact": { "name": "Mr. Rajesh Kumar", "email": "rkumar@rksolustions.com", "phoneNumber": "9896777716", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
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
                      <Text style={styleContent.secondaryTextDesignation}>  VP_DESIGNATION </Text>
                    </Col>

                  </Row>
                  <Row>
                    <Text style={styleContent.secondaryText}> [TODO:] Basavanagudi, Apt-4, Shivaswamy, 080-26500744, RO Bangalore </Text>
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
    const { spinner } = this.state;
    const leadDetails = { "id": 1, "source": "Marketing", "custName": "RekTech Pvt. Ltd", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", "leadContact": { "name": "dingdong", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": ["marketing", "sales"], "salesRep": "shivanshu", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" };
    let returnedView;
    if (leadDetails && leadDetails.id) {
      returnedView = (
        <Row>
          <Card transparent style={styleContent.noCard} >
            <CardItem>
              <Col>
                <Grid>
                  <Row>
                    <Text style={styleContent.customerName}> {leadDetails.custName}</Text>
                  </Row>
                  <Row>
                    <Text style={styleContent.requirement} > {leadDetails.description}</Text>
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
    return (
      <Container>

        <HeaderComponent title="Leads Detail" showSideMenuBtn={true} sideMenuClickHandler={this.sideMenuClickHandler} />
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