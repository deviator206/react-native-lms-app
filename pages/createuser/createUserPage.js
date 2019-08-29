import { Button, Col, Container, Content, Footer, Grid, Input, Item, Label, Row, Text } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import RefDataApi from '../../services/RefDataApi';
import UserApi from '../../services/UserApi';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import ModalComponent from '../common/modalComponent';
import RadioButtonGroupComponent from '../common/radioButtonGroup';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './createUserPageStyle';

const refDataApi = new RefDataApi({ state: {} });
const userApi = new UserApi({ state: {} });


class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.onRadioButtonSelected = this.onRadioButtonSelected.bind(this);
        this.getBUConfiguration = this.getBUConfiguration.bind(this);

        this.onResponseFromReferenceData = this.onResponseFromReferenceData.bind(this);
        this.onErrorResponseFromReferenceData = this.onErrorResponseFromReferenceData.bind(this);
        this.onCreateUserClicked = this.onCreateUserClicked.bind(this);
        this.onAppUserCreated = this.onAppUserCreated.bind(this);
        this.onAppUserCreationError = this.onAppUserCreationError.bind(this);
        this.overlayScreenView = this.overlayScreenView.bind(this);
        this.onFPModalClosed = this.onFPModalClosed.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
    }


    onFPModalClosed() {
        this.props.navigation.goBack();
    }
    

    overlayScreenView() {
        const { showOverlay = false } = this.state;
        const loaderView = (
          <ModalComponent
            modalTitle="Thank You!"
            showSecondaryForgotPassword={false}
            showSecondaryInput={false}
            modalPrimaryText="App User has been created successfully"
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


    onResponseFromReferenceData(resp) {
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


    onInputTextChanged(type, value) {
        this.setState({
            ['INPUT_' + type]: value
        });
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

    componentDidMount() {
        this.setState({
            spinner: true,
            CHILD_RADIO_BUTTON_VALUE: 'SR'
        });
        this.props.loadRefData().then(this.onResponseFromReferenceData).catch(this.onErrorResponseFromReferenceData);
    }

    onAppUserCreated(resp) {
        this.setState({
            spinner: false,
            showOverlay: true
        });
    }

    onAppUserCreationError() {
        this.setState({
            spinner: false
        });
    }

    onCreateUserClicked() {
        const {
            CHILD_RADIO_BUTTON_VALUE,
            INPUT_UNIQUE_USER_NAME,
            INPUT_UNIQUE_TEMP_PASSWORD,
            INPUT_UNIQUE_DISPLAY_NAME,
            BU = ""
        } = this.state;
        const roleValue = appConstant.ROLES_USER_TYPE_MAPPING[CHILD_RADIO_BUTTON_VALUE];

        if (INPUT_UNIQUE_USER_NAME &&
            INPUT_UNIQUE_USER_NAME !== '' &&
            INPUT_UNIQUE_TEMP_PASSWORD &&
            INPUT_UNIQUE_TEMP_PASSWORD !== '' &&
            roleValue &&
            roleValue !== ''
        ) {
            const payload = {
                "userName": INPUT_UNIQUE_USER_NAME,
                "password": INPUT_UNIQUE_TEMP_PASSWORD,
                "email": INPUT_UNIQUE_USER_NAME,
                "userDisplayName": INPUT_UNIQUE_DISPLAY_NAME,
                "businessUnit": BU,
                "roles": [
                    roleValue
                ]
            };

            this.props.createAppUser(payload).then(this.onAppUserCreated).catch(this.onAppUserCreationError);


        }



    }

    getBUConfiguration() {
        const { CHILD_RADIO_BUTTON_VALUE } = this.state;
        let returnedView;
        if (CHILD_RADIO_BUTTON_VALUE === 'SR' || CHILD_RADIO_BUTTON_VALUE === 'BH') {
            returnedView = (
                <Row>
                    <Col>
                        <Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_business_unit_name} </Text>
                        <Item >
                            {this.getDropdownFor(appConstant.DROP_DOWN_TYPE.BU_NAME)}
                        </Item>
                    </Col>
                </Row>
            );
        }
        return returnedView;
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
        switch (type) {
            case appConstant.DROP_DOWN_TYPE.SALES_REP:
                dataSource = userList;
                break;
            case appConstant.DROP_DOWN_TYPE.BU_NAME:
                dataSource = (referenceData && referenceData[type]) ? referenceData[type] : [];
                break;
        }
        returnedView = <DropDownComponent
            dataSource={dataSource}
            updateToParent={this.onDropDownChange}
            dropDownType={type}
            showAttribute='name'
            returnAttribute='code'
        />;
        return returnedView;

    }



    onRadioButtonSelected(btnCode) {
        this.setState({
            'CHILD_RADIO_BUTTON_VALUE': btnCode
        });
    }


    render() {
        const { navigation } = this.props;
        const { CHILD_RADIO_BUTTON_VALUE } = this.state;
        return (
            <Container>
                <HeaderComponent navigation={navigation} title="Create App User" />
                <Content style={styleContent.mainContent}>
                    <Grid style={styleContent.gridWrapper}>
                        <Row >
                            <Col style={{ marginTop: "5%" }}>
                                <Label style={commonStyle.labelStyling}>{i18nMessages.lbl_employee_email}</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Item style={{ height: 50, width: "95%" }}>
                                    <Input
                                        style={styleContent.dynamicTextStyle}
                                        returnKeyType="next"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(value) => {
                                            this.onInputTextChanged('UNIQUE_USER_NAME', value);
                                        }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row >
                            <Col style={{ marginTop: "5%" }}>
                                <Label style={commonStyle.labelStyling}>{i18nMessages.lbl_employee_full_name}</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Item style={{ height: 50, width: "95%" }}>
                                    <Input
                                        style={styleContent.dynamicTextStyle}
                                        returnKeyType="next"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(value) => {
                                            this.onInputTextChanged('UNIQUE_DISPLAY_NAME', value);
                                        }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row >
                            <Col style={{ marginTop: "5%" }}>
                                <Label style={commonStyle.labelStyling}>{i18nMessages.lbl_employee_password}</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Item style={{ height: 50, width: "95%" }}>
                                    <Input
                                        style={styleContent.dynamicTextStyle}
                                        returnKeyType="next"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(value) => {
                                            this.onInputTextChanged('UNIQUE_TEMP_PASSWORD', value);
                                        }}
                                    />
                                </Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <RadioButtonGroupComponent
                                    radioItemList={appConstant.USER_TYPE_RADIO_GROUP}
                                    defaultSelectionCode={CHILD_RADIO_BUTTON_VALUE}
                                    updateToParent={this.onRadioButtonSelected}
                                />
                            </Col>
                        </Row>


                        {this.getBUConfiguration()}

                    </Grid>
                </Content>
                <Footer>
                    <Button
                        style={styleContent.addFooter}
                        onPress={() => {
                            this.onCreateUserClicked();
                        }}>
                        <Text style={styleContent.addFooterText}> {i18nMessages.lbl_create_user} </Text>
                        <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
                    </Button >
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
        createAppUser: (inputPayload) => {
            return userApi.createUser(inputPayload).then((resp) => {
                return resp;
            });

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage)