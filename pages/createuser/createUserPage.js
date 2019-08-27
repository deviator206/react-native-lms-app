import { Button, Col, Container, Content, Footer, Grid, Input, Item, Label, Row, Text } from 'native-base';
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
import RadioButtonGroupComponent from '../common/radioButtonGroup';
import SpinnerComponent from '../common/spinnerComponent';
import { default as Utils } from '../common/Util';
import styleContent from './createUserPageStyle';


const marketIntelligenceApi = new MarketIntelligenceApi({ state: {} });


class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.onRadioButtonSelected = this.onRadioButtonSelected.bind(this);
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
        // this.willBlurSubscription =  this.props.navigation.addListener('onDidBlur', this.componentWillUnmount);
        this.setState({
            spinner: false,
            CHILD_RADIO_BUTTON_VALUE: 'SR'
        });
    }

    componentWillUnmount() {
        console.log(" UN mounting the MI ADD PAGE!! ");
    }

    onRadioButtonSelected(btnCode) {
        this.setState({
            'CHILD_RADIO_BUTTON_VALUE': btnCode
        });
    }


    render() {
        const { navigation } = this.props;
        const {CHILD_RADIO_BUTTON_VALUE} = this.state;
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

                    </Grid>

                    <RadioButtonGroupComponent
                        radioItemList={appConstant.USER_TYPE_RADIO_GROUP}
                        defaultSelectionCode= {CHILD_RADIO_BUTTON_VALUE}
                        updateToParent={this.onRadioButtonSelected}
                    />

                    <Text> Selected Role { CHILD_RADIO_BUTTON_VALUE} </Text>
                </Content>
                <Footer>
                    <Button
                        style={styleContent.addFooter}
                        onPress={ () => {

                        }}>
                        <Text style={styleContent.addFooterText}>ADD MI </Text>
                        <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
                    </Button >
                </Footer>

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage)