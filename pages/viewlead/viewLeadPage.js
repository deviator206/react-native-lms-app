import { Button, Card, CardItem, Col, Container, Content, Grid, Input, Item, Row, Text } from 'native-base';
import React from 'react';
import { Alert, FlatList, Modal, TouchableHighlight, View } from 'react-native';
import { default as EntypoIcon } from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import LeadApi from '../../services/LeadApi';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './viewLeadStyle';

const leadApi = new LeadApi({ state: {} });

class ViewLeadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false,
            spinner: false,
        };
        this.willFocusSubscription = null;
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.getStatusClass = this.getStatusClass.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.loadAllLeads = this.loadAllLeads.bind(this);

        this.onLeadResponseSuccess = this.onLeadResponseSuccess.bind(this);
        this.onLeadResponseError = this.onLeadResponseError.bind(this);
        this.getStatusCircle = this.getStatusCircle.bind(this);
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


    filerBtnToggled() {
        const { filterVisible } = this.state;
        console.log(filterVisible);
        this.setState({
            filterVisible: !filterVisible
        });
    }

    onLeadResponseSuccess(resp) {
        this.setState({
            spinner: false,
            resultSet: resp
        });
    }

    onLeadResponseError(error) {
        console.log(error);
        this.setState({
            spinner: false
        });
    }

    loadAllLeads() {
        this.setState({
            spinner: true
        });
        this.props.loadLeads({}).then(this.onLeadResponseSuccess).catch(this.onLeadResponseError)
    }
    componentDidMount() {
        this.setState({
            filterVisible: false
        });
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.loadAllLeads);
    }

    componentWillUnmount() {
        if (this.willFocusSubscription) {
            this.willFocusSubscription.remove();
        }
    }

    getStatusClass(status) {
        if (status && status.toUpperCase() === 'APPROVED') {
            return styleContent.approvedStatus;
        } else if (status && status.toUpperCase() === 'CLOSED') {
            return styleContent.closedStatus;
        } else if (status && status.toUpperCase() === 'PENDING') {
            return styleContent.pendingStatus;
        }
        return styleContent.cardViewSecondaryInfo;

    }

    getStatusCircle(status) {
        if (status === appConstant.LEAD_STATUS.APPROVED) {
            return styleContent.approvedStatusCircle;
        }

        if (status === appConstant.LEAD_STATUS.REJECTED) {
            return styleContent.rejectedStatusCircle;
        }

        if (status === appConstant.LEAD_STATUS.PENDING) {
            return styleContent.pendingStatusCircle;
        }
        return styleContent.needMoreStatusCircle
    }


    getViewLeads() {
        const { resultSet } = this.state;
        /**
         const dataR = [
             {
                 companyName: "CM Tek-3",
                 description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                 contact: "RK Sharma",
                 status: "Approved",
                 salesRep: "Samir",
                 businessUnit: "Atlas",
                 lastUpdated: "12/4/2019",
                 inactiveDays: "129"
             }, {
                 companyName: 'BM Sigma',
                 description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                 contact: "Shrivastava",
                 status: "Closed",
                 salesRep: "Sunayna",
                 businessUnit: "Spectro",
                 lastUpdated: "12/4/2019",
                 inactiveDays: "29"
 
             },
             {
                 companyName: 'Suraj Ent',
                 description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                 contact: "Shrivastava",
                 status: "Pending",
                 salesRep: "Sunayna",
                 businessUnit: "Spectro",
                 lastUpdated: "12/4/2019",
                 inactiveDays: "29"
 
             },
             {
                 companyName: 'IT Stick',
                 description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                 contact: "Shrivastava",
                 status: "PENDING",
                 salesRep: "Sunayna",
                 businessUnit: "Spectro",
                 lastUpdated: "12/4/2019",
                 inactiveDays: "29"
 
             }];
 
             */
        /**
         * 
         * {"id":25,"name":"dingdong","email":"a@b.com","phoneNumber":"9764007637","state":"NA","country":"CND","designation":null},"leadsSummaryRes":{"businessUnits":["ATL"],"rootLeadId":16,"salesRep":"shivanshu","industry":null,"budget":0.0,"currency":"INR"},"updateDate":"2019-06-04","updatorId":8,"creationDate":"2019-06-04","inactiveDuration":76,"tenure":"LT1Y","deleted":false,"message":null,"creatorId":8}
         */

        const returnedView = (
            <FlatList
                data={resultSet}
                renderItem={({ item }) =>
                    <Row
                        button
                        onPress={() => {
                            // item.id
                            this.props.navigation.navigate("leaddetails", {
                                leadId: item.id
                            });
                        }}
                    >
                        <Card style={styleContent.gridCardWrapper}
                        >
                            <CardItem>
                                <Col>
                                    <Grid>
                                        <Row>
                                            <Col>
                                                <Text style={[styleContent.cardViewMainTitle, commonStyle.camelCase]} > {item.custName} </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text style={styleContent.cardViewSecondaryInfo}  > {item.description} </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Contact </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} >{item.leadContact && item.leadContact.name}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={
                                                    styleContent.cardViewPrimaryLabel}  > Status </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={this.getStatusClass(item.status)} > {item.status && appConstant.DECODED_LEAD_STATUS[(item.status).toUpperCase()]}  </Text>

                                            </Col>
                                            <Col style={styleContent.colValueThird} >
                                                <View style={this.getStatusCircle(item.status)} />
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Sales Rep </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.leadsSummaryRes && item.leadsSummaryRes.salesRep}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Unit </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.leadsSummaryRes && item.leadsSummaryRes.businessUnits && item.leadsSummaryRes.businessUnits.length > 0 && item.leadsSummaryRes.businessUnits[0]}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Last Updated </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.updateDate}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Inactive Days </Text>
                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.inactiveDuration}  </Text>
                                            </Col>
                                        </Row>
                                    </Grid>

                                </Col>
                            </CardItem>
                        </Card>
                    </Row>
                }
            >

            </FlatList>
        );

        return returnedView;
    }
    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <HeaderComponent title="View Leads" navigation={navigation} />
                <Content style={styleContent.mainContent}>
                    <Grid >
                        <Row style={styleContent.searchAndFilterWrapper}>
                            <Col style={styleContent.searchBarWrapper} >
                                <Item searchBar
                                    rounded
                                    style={styleContent.searchBarStyling}>
                                    <Input
                                        placeholder="Search"
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'Montserrat-Regular',
                                            color: "#616161"
                                        }}
                                    />
                                    <Icon name="search" style={styleContent.iconStyling} />
                                </Item>
                            </Col>
                            <Col  >
                                <Button
                                    transparent
                                    onPress={() => {
                                        this.filerBtnToggled();
                                    }


                                    }
                                >
                                    <EntypoIcon name="sound-mix" style={styleContent.iconStyling} />
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Grid style={styleContent.gridWrapper} >
                        {this.getViewLeads()}
                    </Grid>
                </Content>
                <FooterComponent  {...this.props} disableView={true} />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.filterVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ width: '100%', height: "100%" }}>
                        <View style={commonStyle.modalHeaderDiv}>
                            <View><Text note style={commonStyle.modalHeader}> Filter View Leads </Text></View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.filerBtnToggled();
                                    }}>
                                    <Icon name="close" style={commonStyle.modalCloseBtn} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ flex: 1, padding: 20 }}>
                            <Grid style={commonStyle.formGrid}>
                                <Row style={commonStyle.formGridLabel}>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.status}</Text>
                                    </Col>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.tenure_lbl}</Text>
                                    </Col>
                                </Row>
                                <Row style={commonStyle.formGridValue}>
                                    <Col>
                                        <Text>Status dropdown</Text>
                                    </Col>
                                    <Col>
                                        <Text>Tenure dropdown</Text>
                                    </Col>
                                </Row>

                                <Row style={commonStyle.formGridLabel}>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.location}</Text>
                                    </Col>
                                </Row>
                                <Row style={commonStyle.formGridValue}>
                                    <Col><Text>Country AND State dropdown</Text></Col>
                                </Row>


                                <Row style={commonStyle.formGridLabel}>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.bu_selection}</Text>
                                    </Col>
                                </Row>
                                <Row style={commonStyle.formGridValue}>
                                    <Col><Text>BU and Rep dropdown</Text></Col>
                                </Row>
                                <Row style={commonStyle.formGridLabel}>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.industry}</Text>
                                    </Col>
                                </Row>
                                <Row style={commonStyle.formGridValue}>
                                    <Col><Text>Industry dropdown</Text></Col>
                                </Row>


                                <Row style={commonStyle.formGridLabel}>
                                    <Col>
                                        <Text note style={commonStyle.labelStyling}>{i18nMessages.source_type}</Text>
                                    </Col>
                                </Row>
                                <Row style={commonStyle.formGridValue}>
                                    <Col><Text>source dropdown</Text></Col>
                                </Row>
                            </Grid>
                        </View>

                        <View style={commonStyle.modalFooter}>
                            <View style={commonStyle.modalButtonContent}>
                                <View style={{ width: "40%" }}>
                                    <TouchableHighlight
                                        onPress={() => { }}>
                                        <Text style={[commonStyle.modalTwoButtons, commonStyle.secondaryButton]}>Reset</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ width: "40%" }}>
                                    <TouchableHighlight
                                        onPress={() => { }}>
                                        <Text style={[commonStyle.modalTwoButtons, commonStyle.primaryButton]}>Apply</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>

                {this.getSpinnerComponentView()}
            </Container>
        )
    }
}


// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
    return {
        loadLeads: (inputParams) => {
            return leadApi.getLeads({
                params: inputParams
            }).then((resp) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewLeadPage)