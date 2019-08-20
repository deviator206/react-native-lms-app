import { Button, Col, Container, Content, Footer, Grid, Input, Item, Label, Picker, Row, Text, Textarea } from 'native-base';
import React from 'react';
import { Alert, Modal, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appConfig from '../common/config';
import HeaderComponent from '../common/headerComponent';
import i18nMessages from '../common/i18n';
import styleContent from './miAddPageStyle';
import { default as commonStyle } from '../common/commonStyling';

export default class MiAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.sideMenuClickHandler = this.sideMenuClickHandler.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);
    }

    getDropdownFor(type) {
        let returnedView = '';
        const pickerItemArr = [];
        switch (type) {
            case 'TYPE':
                appConfig.LEAD_TENURE.forEach(singleItem => {
                    pickerItemArr.push(
                        (<Picker.Item label={singleItem} style={styleContent.dynamicComponentTextStyle} value={singleItem} />)
                    )
                });
                returnedView = (
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={styleContent.dynamicComponentTextStyle}
                            selectedValue={this.state.currentSelectedBU}
                            placeholderStyle={styleContent.dynamicComponentTextStyle}
                            placeholderIconColor="#007aff"
                        >
                            {pickerItemArr}

                        </Picker>
                    </Item>);
                break;
            default:
                break;
        }
        return returnedView;
    }

    sideMenuClickHandler() {
        alert("clicked side panel")
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


    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container>
                <HeaderComponent title="Add Market Intelligence" showSideMenuBtn={true} sideMenuClickHandler={this.sideMenuClickHandler} />
                <Content style={styleContent.mainContent}>
                    <Grid style={styleContent.gridWrapper}>
                        <Row >
                            <Col style={{ marginTop: "5%"}}>
                                <Label style={commonStyle.labelStyling}>{i18nMessages.type}</Label>
                            </Col>
                        </Row>
                        <Row >
                            <Col  style={{ marginBottom: "5%"}}>
                                {this.getDropdownFor("TYPE")}

                            </Col>
                        </Row>

                        <Row><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.requirement_project_lbl} </Text></Col></Row>



                        <Row>
                            <Col>
                                <Item style={{height: 50,  width: "95%"}}>
                                    <Input
                                        style={styleContent.dynamicTextStyle}
                                        returnKeyType="next"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20}}><Col><Text note style={commonStyle.labelStyling} >{i18nMessages.description} </Text></Col></Row>
                        <Row>
                            <Col>
                                <Item>
                                    <Textarea
                                        style={styleContent.dynamicComponentTextStyle}
                                        rowSpan={4} style={styleContent.textAreaStyling}
                                        bordered
                                    />
                                </Item>
                            </Col>
                        </Row>

                    </Grid>


                </Content>
                <Footer>
                    <Button style={styleContent.addFooter}>
                        <Text style={styleContent.addFooterText}>ADD MI </Text>
                        <Icon name="arrow-forward" style={{ color: "white", fontSize: 20 }} />
                    </Button >
                </Footer>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.filterVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <Content style={{ width: '100%', marginTop: 80 }}>
                        <Grid style={{ width: '96%', backgroundColor: 'white', marginTop: 10, padding: 10 }}>
                            <Row><Col><Text note>Status</Text></Col><Col><Text note>Tenure</Text></Col></Row>
                            <Row>
                                <Col>
                                    <Text>Hello World!</Text>
                                </Col>
                                <Col>
                                    <Text>Hello World!</Text>
                                </Col>
                            </Row>
                        </Grid>
                        <View style={{ marginTop: 22 }}>

                            <View>


                                <TouchableHighlight
                                    onPress={() => {
                                        this.filerBtnToggled();
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Content>

                </Modal>

            </Container>
        )
    }
}