import { Button, Card, Col, Container, Content, DatePicker, Grid, Row, Text, View } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import LeadApi from '../../services/LeadApi';
import RefDataApi from '../../services/RefDataApi';
import UserApi from '../../services/UserApi';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import { default as Utils } from '../common/Util';
import styleContent from './dashboardStyle';

const refDataApi = new RefDataApi({ state: {} });
const userApi = new UserApi({ state: {} });

const leadApi = new LeadApi({ state: {} });




class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.getFooterTab = this.getFooterTab.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);
        this.sideMenuClicked = this.sideMenuClicked.bind(this);
        this.getHeaderSection = this.getHeaderSection.bind(this);

        this.willFocusSubscription = null;
        this.loadAllUsers = this.loadAllUsers.bind(this);
        this.onResponseSuccess = this.onResponseSuccess.bind(this);
        this.onResponseError = this.onResponseError.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.onResponseFromReferenceData = this.onResponseFromReferenceData.bind(this);
        this.onErrorResponseFromReferenceData = this.onErrorResponseFromReferenceData.bind(this);
        this.getDatePickerView = this.getDatePickerView.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.initiateRefineResult = this.initiateRefineResult.bind(this);
        this.onStatsLoaded = this.onStatsLoaded.bind(this);
    }

    onStatsLoaded (resp) {
        console.log(resp);
        const {leadStatusCountMap} = resp;
        const {APP = 0, DRAFT =0 ,NMI = 0 ,REJ = 0 } = leadStatusCountMap;
        const totalLeads = APP + DRAFT + NMI + REJ;
        const pending = DRAFT + NMI;
        this.setState({
            spinner: false,
            totalLeads,
            assignedLeads : 0,
            pendingLeads : pending,
            approvedLeads : APP,
            rejectedLeads : REJ
        });

    }

    initiateRefineResult() {
        const {
            ORIGINATOR_BU,
            TARGET_BU,
            SALES_REP,
            START_DATE,
            END_DATE,
        } = this.state;

        let payload = {};
        if(ORIGINATOR_BU && ORIGINATOR_BU !== '' &&  TARGET_BU && TARGET_BU !== '') {
            payload["fromBu"] = ORIGINATOR_BU;
            payload["toBu"] = TARGET_BU;
        }

        if(START_DATE && START_DATE !== '' &&  END_DATE && END_DATE !== '') {
            payload["startDate"] = Utils.getFormattedDate(START_DATE);
            payload["endDate"] = Utils.getFormattedDate(END_DATE);
        }

        if(SALES_REP && SALES_REP !== '' && SALES_REP !== '#_SELECT_REP_#') {
            payload["salesRepId"] = SALES_REP;
        }
        //const { userInfo} = window.userInformation
        //const userId= (userInfo && userInfo.userId) ? userInfo.userId : ""
        const queryParams = "busummary=true";
        this.setState({
            spinner: true
        });
        this.props.loadLeadStats({payload,queryParams}).then(this.onStatsLoaded).catch(this.onResponseError)
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

    getFooterTab() {
        return (<FooterComponent  {...this.props} disableHome={true} />)
    }

    onResponseFromReferenceData(resp) {
        this.setState({
            referenceData: resp
        });
    }

    onErrorResponseFromReferenceData(resp) {
        alert("Error While fetching Business Unit", resp)
    }


    onResponseSuccess(resp) {
        let userFetchedList = resp;
        userFetchedList.unshift({
            "userId": "#_SELECT_REP_#",
            "userDisplayName": "NOT SELECTED",
        });
        this.setState({
            spinner: false,
            userList: userFetchedList
        });
    }

    onResponseError() {
        this.setState({
            spinner: false
        });
    }


    loadAllUsers() {
        this.setState({
            spinner: true
        });
        this.props.getUserList({}).then(this.onResponseSuccess).catch(this.onResponseError);
    }

    componentDidMount() {
        this.setState({ spinner: false });
        this.props.loadRefData().then(this.onResponseFromReferenceData).catch(this.onErrorResponseFromReferenceData);
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.loadAllUsers);
    }

    componentWillUnmount() {
        if (this.willFocusSubscription) {
            this.willFocusSubscription.remove();
        }
    }

    onDropDownChange({ type, value }) {
        this.setState({
            [type]: value
        });
    }

    getDropdownFor(type) {
        const { referenceData = {}, userList = [] } = this.state;
        let returnedView = null;
        let dataSource = [];
        let showAttributeVal = 'name';
        let returnAttributeVal = 'code';
        switch (type) {
            case appConstant.DROP_DOWN_TYPE.SALES_REP:
                dataSource = userList;
                showAttributeVal = 'userDisplayName';
                returnAttributeVal = 'userId';
                break;
            case 'ORIGINATOR_BU':
            case 'TARGET_BU':
                dataSource = (referenceData && referenceData[appConstant.DROP_DOWN_TYPE.BU_NAME]) ? referenceData[appConstant.DROP_DOWN_TYPE.BU_NAME] : [];
                break;
        }
        if (dataSource.length > 0) {
            returnedView = <DropDownComponent
                dataSource={dataSource}
                updateToParent={this.onDropDownChange}
                dropDownType={type}
                showAttribute={showAttributeVal}
                returnAttribute={returnAttributeVal}
                roundedDropDown={true}
            />;
        }

        return returnedView;

    }

    onDateSelected(type, newDate) {
        this.setState({ [type]: newDate });
    }

    getDatePickerView(type) {
        return (
            <DatePicker
                defaultDate={this.state.leadCreatedDate}
                textStyle={styleContent.datePickerStyle}
                placeHolderTextStyle={styleContent.datePickerStyle}
                animationType={"fade"}
                placeHolderText={i18nMessages.select_date_lbl}
                onDateChange={(val) => {
                    this.onDateSelected(type, val)
                }}
            />
        )
    }

    sideMenuClicked() {
        this.props.navigation.openDrawer();
    }

    getHeaderSection() {
        const { navigation } = this.props;
        return (<HeaderComponent navigation={navigation} title="Dashboard" hamburger={true} sideMenuClickHandler={this.sideMenuClicked} />);
    }

    render() {
        const {
            totalLeads,
            assignedLeads = 0,
            pendingLeads = 0,
            approvedLeads = 0,
            rejectedLeads  = 0 
        } = this.state;
        return (
            <Container >
                {this.getHeaderSection()}
                <Content style={{
                    flex: 1
                }}>
                    <View style={
                        {
                            width: "100%",
                            height: 620,
                            paddingTop: "4%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#222222"
                        }
                    }>
                    </View>
                    <View style={
                        {
                            width: "100%",
                            backgroundColor: "#F3F3F3",
                            height: 300
                        }
                    }>

                    </View>

                    <View style={
                        {
                            width: "98%",
                            position: "absolute"
                        }
                    }>

                        <Grid style={styleContent.gridSection} >

                            <Row style={{
                                marginTop: "5%",
                                paddingHorizontal: "3%"
                            }}>
                                <Col style={{
                                    marginRight: "5%"
                                }}>
                                    <Text note style={styleContent.labelStyling}  > Originator BU</Text>
                                    {this.getDropdownFor('ORIGINATOR_BU')}
                                </Col>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  >Target BU</Text>
                                    {this.getDropdownFor('TARGET_BU')}
                                </Col>
                            </Row>



                            <Row style={{
                                marginTop: "5%",
                                paddingHorizontal: "3%"
                            }}>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  > Representative</Text>
                                    {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.SALES_REP)}
                                </Col>
                            </Row>

                            <Row style={{
                                marginTop: "5%",
                                paddingHorizontal: "3%"
                            }}>
                                <Col style={{
                                    marginRight: "5%"
                                }}>
                                    <Text note style={[styleContent.labelStyling, commonStyle.textUppercase]}  >Start Date</Text>
                                    {this.getDatePickerView('START_DATE')}
                                </Col>
                                <Col>
                                    <Text note style={[styleContent.labelStyling, commonStyle.textUppercase]}  >End Date</Text>
                                    {this.getDatePickerView('END_DATE')}
                                </Col>
                            </Row>
                            <Row style={
                                {
                                    marginTop: "10%"
                                }
                            }>
                                <Col >
                                    <Button transparent
                                        style={styleContent.roundedButton}
                                        onPress={this.initiateRefineResult}>
                                        <Text style={styleContent.roundedButtonText}> REFINE RESULTS</Text>
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{
                                    alignItems: "center",
                                    marginTop: "8%",
                                    marginBottom: "5%"
                                }}
                                >
                                    <Text style={
                                        {
                                            color: appConstant.primaryBlue,
                                            fontSize: 47,
                                            lineHeight: 50,
                                            marginTop: "3%",
                                            fontFamily: "Montserrat-Medium"

                                        }
                                    }> {totalLeads} </Text>
                                    <Text style={
                                        {
                                            color: "#FFFFFF",
                                            fontSize: 19,
                                            fontFamily: "Montserrat-SemiBold",
                                            textTransform: "uppercase",
                                            marginTop: "2%"
                                        }
                                    }> TOTAL LEADS</Text>

                                </Col>
                            </Row>

                            <Row style={{ marginLeft: "4%" }}>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Approved Lead</Text>
                                            <Text style={styleContent.approvedValue}>
                                                {approvedLeads}</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Rejected Lead</Text>
                                            <Text style={styleContent.rejectedValue}>
                                                {rejectedLeads}</Text>
                                        </View>
                                    </Card>

                                </Col>
                            </Row>




                            <Row style={{ marginLeft: "4%" }}>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Assigned Lead</Text>
                                            <Text style={styleContent.closedValue}>
                                                {assignedLeads}</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Pending Lead</Text>
                                            <Text style={styleContent.pendingValue}>
                                                {pendingLeads} </Text>
                                        </View>
                                    </Card>

                                </Col>
                            </Row>
                            <Row style={
                                {
                                    marginTop: "5%"
                                }
                            }>
                                <Col >
                                    <Button transparent
                                        style={styleContent.roundedButton}>
                                        <Text style={styleContent.roundedButtonText}> Extract RESULTS</Text>
                                    </Button>
                                </Col>
                            </Row>


                        </Grid>

                    </View>


                    {this.getSpinnerComponentView()}
                </Content>
                {this.getFooterTab()}
            </Container>
        );
    }
}



// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
    return {
        loadLeadStats: (inputPayload) => {
            return leadApi.getStats(inputPayload).then((resp) => {
                return resp;
            })

        },
        getUserList: (inputParams) => {
            return userApi.getUserList({
                params: inputParams
            }).then((resp) => {
                return resp;
            })
        },
        loadRefData: (inputParams) => {
            return refDataApi.fetchRefData({
                params: (inputParams) ? inputParams : "type=BU"
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)