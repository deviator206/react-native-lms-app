import { Button, Col, Container, Content, Footer, Grid, Row, Text, Textarea } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import MarketIntelligenceApi from '../../services/MarketIntelligenceApi';
import CheckBoxComponent from '../common/checkBoxComponent';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import ModalComponent from '../common/modalComponent';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './miDetailsPageStyle';

const marketIntelligenceApi = new MarketIntelligenceApi({ state: {} });


class MiDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);

        this.initiateMICreation = this.initiateMICreation.bind(this);

        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onErrorHandler = this.onErrorHandler.bind(this);
        this.overlayScreenView = this.overlayScreenView.bind(this);
        this.onFPModalClosed = this.onFPModalClosed.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);


        this.getStatusStyle = this.getStatusStyle.bind(this);
        this.getListedInfo = this.getListedInfo.bind(this);
        this.onCheckBoxChanged = this.onCheckBoxChanged.bind(this);



    }

    onCheckBoxChanged({ type, value }) {
        this.setState({
            [type]: value
        });
    }

    getStatusStyle(status) {
        if (status === appConstant.MI_STATUS.CLOSED) {
            return styleContent.closedStatus;
        }
        return styleContent.pendingStatus;
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



    onFPModalClosed() {
        this.props.navigation.goBack();
    }


    onSuccessHandler(resp) {
        this.setState({
            spinner: false,
            showOverlay: true
        });
    }

    onErrorHandler(resp) {
        this.setState({
            spinner: false
        });
    }

    overlayScreenView() {
        const { showOverlay = false } = this.state;

        const loaderView = (
            <ModalComponent
                modalTitle="Thank You!"
                showSecondaryForgotPassword={false}
                showSecondaryInput={false}
                modalPrimaryText="Info has been added successfully"
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

    initiateMICreation() {
       /* const {
            MI_TYPE,
            INPUT_PROJECT,
            INPUT_INVESTMENT,
            INPUT_DESCRIPTION
        } = this.state;
        let inputPayload = {
            "type": MI_TYPE,
            "creationDate": Utils.getFormattedDate(new Date()),
            "description": INPUT_DESCRIPTION
        };

        if (MI_TYPE === appConstant.MI_TYPE_CONST.PROJECT) {
            inputPayload = {
                ...inputPayload,
                "projectName": INPUT_PROJECT
            }
        } else if (MI_TYPE === appConstant.MI_TYPE_CONST.INVESTMENT) {
            inputPayload = {
                ...inputPayload,
                "Investment": INPUT_INVESTMENT
            }
        }
        */

        this.setState({
            spinner: true
        });

        this.props.createMI({}).then(this.onSuccessHandler).catch(this.onErrorHandler);
    }

    onInputTextChanged(type, value) {
        this.setState({
            ['INPUT_' + type]: value
        });
    }

    onDropDownChange({ type, value }) {
        this.setState({
            [type]: value
        });
    }

    getDropdownFor(type) {
        let returnedView = null;
        let dataSource = [];
        dataSource = (appConstant.MI_TYPE) ? appConstant.MI_TYPE : [];
        returnedView = <DropDownComponent
            dataSource={dataSource}
            updateToParent={this.onDropDownChange}
            dropDownType={type}
            showAttribute='name'
            returnAttribute='code'
        />;
        return returnedView;

    }



    filerBtnToggled() {
        const { filterVisible } = this.state;
        console.log(filterVisible);
        this.setState({
            filterVisible: !filterVisible
        });
    }
    componentDidMount() {
        this.setState({
            filterVisible: false
        });
    }




    getListedInfo() {
        // const { resultSet = [] } = this.state;
        const resultSet = [
            {
                name: "John",
                info: "ke if you want to access manager app on all machines. Go to {Tomcat_ins",
                date: "24-09-2019"
            },
            {
                name: "Olive",
                info: "ke if you want to access manager app on all machines. Go to {Tomcat_ins",
                date: "24-09-2019"
            },
            {
                name: "Mustang",
                info: "ke if you want to access manager app on all machines. Go to {Tomcat_ins",
                date: "24-09-2019"
            }
        ];
        let returnedView
        if (resultSet && resultSet.length > 0) {
            returnedView = (
                <FlatList
                    data={resultSet}
                    renderItem={({ item }) =>
                        <Row
                            style={styleContent.gridCardWrapper}
                            button
                            onPress={() => {
                                // item.id
                                this.props.navigation.navigate("midetails", {
                                    miId: item.id
                                });
                            }}
                        >

                            <Col>
                                <Grid>

                                    <Row style={
                                        {
                                            borderTopColor: "black",
                                            borderTopWidth: 3
                                        }
                                    }>
                                        <Col>
                                            <Text style={styleContent.cardViewSecondaryInfo} > {item.name} </Text>
                                        </Col>
                                        <Col style={{ flexDirection: "row" }}>
                                            <Text style={styleContent.cardViewSecondaryInfo}  > Date:  </Text>
                                            <Text style={styleContent.cardViewPrimaryValue}  >  {item.date} </Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={styleContent.cardViewSecondaryInfo}  > {item.info} </Text>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Col>
                        </Row>
                    }
                >

                </FlatList>
            );
        }
        return returnedView;
    }



    render() {

        const { ADD_MORE_INFO = false, CONVERT_TO_LEAD = false, } = this.state;
        const { navigation } = this.props;
        const item = {
            miId: "MI#779",
            type: "New Item",
            description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
            status: "OPEN"
        };
        return (
            <Container>
                <HeaderComponent navigation={navigation} title="Market Intelligence" />
                <Content style={styleContent.mainContent}>

                    <Grid style={styleContent.gridWrapper}>
                        <Row style={styleContent.gridCardWrapper}>
                            <Col>
                                <Grid>
                                    <Row>
                                        <Col>
                                            <Text style={styleContent.cardViewMainTitle} > {item.miId} </Text>
                                        </Col>
                                        <Col style={{ flexDirection: "row" }}>
                                            <Text style={styleContent.cardViewSecondaryInfo}  > Type:  </Text>
                                            <Text style={styleContent.cardViewPrimaryValue}  >  {item.type} </Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={styleContent.cardViewSecondaryInfo}  > {item.description} </Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={styleContent.colLabelOnly} >
                                            <Text style={styleContent.cardViewPrimaryLabel}  > Status: </Text>

                                        </Col>
                                        <Col style={styleContent.colValue} >

                                            <Text style={this.getStatusStyle(item.status)} > {item.status}  </Text>
                                        </Col>

                                    </Row>
                                </Grid>

                            </Col>
                        </Row>

                    </Grid>

                    <Grid style={[styleContent.gridWrapper, {
                        height: 400,
                        backgroundColor: "yellow"
                    }]} >
                        {this.getListedInfo()}
                    </Grid>

                </Content>
                <Footer style={{
                    height: 300,
                    backgroundColor: "white"
                }}>

                    <Grid>
                        <Row>
                            <Col>
                                <CheckBoxComponent
                                    checkBoxLabel={i18nMessages.lbl_mi_info_add_more_info}
                                    controlType={appConstant.MI_INFO.ADD_MORE_INFO}
                                    updateToParent={this.onCheckBoxChanged}
                                />
                            </Col>
                        </Row>
                        {ADD_MORE_INFO && (
                            <Row>
                                <Col>
                                    <Textarea
                                        style={commonStyle.dynamicComponentTextAreaStyle}
                                        rowSpan={4}
                                        bordered
                                        placeholder="Lorem Ipsum is sim"
                                        onChangeText={(text) => {
                                            this.onInputTextChanged(appConstant.MI_INFO.ADD_MORE_INFO, text);
                                        }}
                                    />
                                </Col>
                            </Row>
                        )}
                       
                        <Row>
                            <Col>
                                <CheckBoxComponent
                                    checkBoxLabel={i18nMessages.lbl_mi_info_convert_to_lead}
                                    controlType={appConstant.MI_INFO.CONVERT_TO_LEAD}
                                    updateToParent={this.onCheckBoxChanged}
                                />
                            </Col>
                        </Row>
                        {CONVERT_TO_LEAD && (
                            <Row>
                                <Col>
                                    <Text> Customer Name </Text>
                                </Col>
                            </Row>
                        )}
                        {CONVERT_TO_LEAD && (
                            <Row>
                                <Col>
                                    <Textarea
                                        style={commonStyle.dynamicComponentTextAreaStyle}
                                        rowSpan={2}
                                        bordered
                                        placeholder="Lorem Ipsum is sim"
                                        onChangeText={(text) => {
                                            this.onInputTextChanged(appConstant.MI_INFO.CTL_CUSTOMER_NAME, text);
                                        }}
                                    />
                                </Col>
                            </Row>
                        )}

                        {CONVERT_TO_LEAD && (
                            <Row>
                                <Col>
                                    <Text> Requirements </Text>
                                </Col>
                            </Row>
                        )}
                        {CONVERT_TO_LEAD && (
                            <Row>
                                <Col>
                                    <Textarea
                                        style={commonStyle.dynamicComponentTextAreaStyle}
                                        rowSpan={4}
                                        bordered
                                        placeholder="Lorem Ipsum is sim"
                                        onChangeText={(text) => {
                                            this.onInputTextChanged(appConstant.MI_INFO.CTL_REQUIREMENT, text);
                                        }}
                                    />
                                </Col>
                            </Row>
                        )}
                        {CONVERT_TO_LEAD && (
                            <Row>
                                <Col>
                                    <Button
                                        style={styleContent.addFooter}
                                        onPress={this.initiateMICreation}
                                    >
                                        <Text style={styleContent.addFooterText}>CONVERT TO LEAD </Text>
                                        <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
                                    </Button >
                                </Col>
                            </Row>
                        )}
                    </Grid>


                </Footer>
                {this.overlayScreenView()}
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
        createMI: (inputPayload) => {
            return marketIntelligenceApi.createNewMI({
                params: inputPayload
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

export default connect(mapStateToProps, mapDispatchToProps)(MiDetailsPage)