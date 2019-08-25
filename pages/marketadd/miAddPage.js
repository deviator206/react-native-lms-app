import { Button, Col, Container, Content, Footer, Grid, Input, Item, Label, Row, Text, Textarea } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import MarketIntelligenceApi from '../../services/MarketIntelligenceApi';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import DropDownComponent from '../common/dropdownComponent';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import ModalComponent from '../common/modalComponent';
import SpinnerComponent from '../common/spinnerComponent';
import { default as Utils } from '../common/Util';
import styleContent from './miAddPageStyle';

const marketIntelligenceApi = new MarketIntelligenceApi({ state: {} });


class MiAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.getSectionLabel = this.getSectionLabel.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.getSectionInput = this.getSectionInput.bind(this);
        this.initiateMICreation = this.initiateMICreation.bind(this);

        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onErrorHandler = this.onErrorHandler.bind(this);
        this.overlayScreenView = this.overlayScreenView.bind(this);
        this.onFPModalClosed = this.onFPModalClosed.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);

        this.willBlurSubscription = null;

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
        this.setState({
            spinner: false,
            showOverlay: false
        });
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
                modalPrimaryText="Market Intelligence Item has been created successfully"
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
        const {
            MI_TYPE,
            INPUT_PROJECT,
            INPUT_INVESTMENT,
            INPUT_DESCRIPTION
        } = this.state;
        if (INPUT_DESCRIPTION || INPUT_DESCRIPTION === '') {
            this.setState({
                INPUT_DESCRIPTION_MISSING: true
            });
            return false;
        }

        let inputPayload = {
            "type": MI_TYPE,
            "date": Utils.getFormattedDate(new Date()),
            "description": INPUT_DESCRIPTION
        };

        if (MI_TYPE === appConstant.MI_TYPE_CONST.PROJECT) {
            inputPayload = {
                ...inputPayload,
                "name": INPUT_PROJECT
            }
        } else if (MI_TYPE === appConstant.MI_TYPE_CONST.INVESTMENT) {
            inputPayload = {
                ...inputPayload,
                "investment": INPUT_INVESTMENT
            }
        }
        this.setState({
            spinner: true
        });

        this.props.createMI(inputPayload).then(this.onSuccessHandler).catch(this.onErrorHandler);
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
        // this.willBlurSubscription =  this.props.navigation.addListener('onDidBlur', this.componentWillUnmount);
        this.setState({
            filterVisible: false,
            spinner: false,
            showOverlay: false,
            INPUT_DESCRIPTION_MISSING: false
        });
    }

    componentWillUnmount() {
        console.log(" UN mounting the MI ADD PAGE!! ");
    }
    getSectionLabel() {
        const { MI_TYPE } = this.state;
        let returnedView;
        if (MI_TYPE === appConstant.MI_TYPE_CONST.PROJECT) {
            returnedView = (
                <Row><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_project_name_mi} </Text></Col></Row>
            )
        }
        else if (MI_TYPE === appConstant.MI_TYPE_CONST.INVESTMENT) {
            returnedView = (
                <Row><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.lbl_investment_mi} </Text></Col></Row>
            )
        }
        return returnedView;
    }


    getSectionInput() {
        const { MI_TYPE } = this.state;
        let returnedView;
        if (MI_TYPE === appConstant.MI_TYPE_CONST.PROJECT || MI_TYPE === appConstant.MI_TYPE_CONST.INVESTMENT) {
            returnedView = (
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
                                    this.onInputTextChanged(MI_TYPE, value);
                                }}
                            />
                        </Item>
                    </Col>
                </Row>
            )
        }
        return returnedView;
    }



    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <HeaderComponent navigation={navigation} title="Add Market Intelligence" />
                <Content style={styleContent.mainContent}>
                    <Grid style={styleContent.gridWrapper}>
                        <Row >
                            <Col style={{ marginTop: "5%" }}>
                                <Label style={commonStyle.labelStyling}>{i18nMessages.type}</Label>
                            </Col>
                        </Row>
                        <Row >
                            <Col style={{ marginBottom: "5%" }}>
                                {this.getDropdownFor('MI_TYPE')}

                            </Col>
                        </Row>
                        {this.getSectionLabel()}
                        {this.getSectionInput()}
                        <Row style={{ marginTop: 20 }}><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.description} </Text></Col></Row>
                        <Row>
                            <Col>
                                <Item>
                                    <Textarea
                                        style={styleContent.dynamicComponentTextStyle}
                                        rowSpan={4} style={styleContent.textAreaStyling}
                                        bordered
                                        onChangeText={(value) => {
                                            this.onInputTextChanged('DESCRIPTION', value);
                                        }}
                                    />
                                </Item>
                            </Col>
                        </Row>

                    </Grid>


                </Content>
                <Footer>
                    <Button
                        style={styleContent.addFooter}
                        onPress={this.initiateMICreation}
                    >
                        <Text style={styleContent.addFooterText}>ADD MI </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MiAddPage)