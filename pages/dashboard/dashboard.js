import { Body, Button, Card, Col, Container, Content, Footer, FooterTab, Grid, Header, Icon, Item, Left, Picker, Right, Row, Text, Title, View } from 'native-base';
import React from 'react';
import appConfig from '../common/config';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './dashboardStyle';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.getFooterTab = this.getFooterTab.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);

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
        return (<Footer >
            <FooterTab style={styleContent.footerSection}>
                <Button vertical style={styleContent.footerSingleTab}>
                    <Icon name="home" style={styleContent.tabIconStyling} />
                    <Text style={styleContent.tabNameStyling}>Home</Text>
                </Button >
                <Button vertical style={styleContent.footerSection} >
                    <Icon name="view-headline" style={styleContent.tabIconStyling} />
                    <Text style={styleContent.tabNameStyling}>View Lead</Text>
                </Button>
                <Button onPress={
                    () => {
                        console.log(" menu clicked");
                        this.props.navigation.navigate("addlead");
                    }
                } vertical style={styleContent.footerSection} >
                    <Icon name="note-add" style={styleContent.tabIconStyling} />
                    <Text style={styleContent.tabNameStyling}>Add Lead</Text>
                </Button>
            </FooterTab>
        </Footer>)
    }

    componentDidMount() {
        this.setState({ spinner: false });
    }

    getDropdownFor(type) {
        let returnedView = '';
        const pickerItemArr = [];
        switch (type) {
            case 'BU_NAME':
                appConfig.BU_LIST.forEach(singleItem => {
                    pickerItemArr.push(
                        (<Picker.Item 
                            label={singleItem}
                            style={{
                                backgroundColor:"red"
                            }}

                            value={singleItem} />)
                    )
                });
                returnedView = (
                    <Item picker >
                        <Picker
                            style={
                                {
                                    borderRadius: 80, 
                                    borderWidth: 10, 
                                    borderColor: 'red',
                                    
                                    backgroundColor: "#707070"
                                }
                            }
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
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

    getHeaderSection() {
        return (
            <Header style={styleContent.headerSection}>
                <Left>
                    <Button
                        transparent
                        style={styleContent.sideMenu}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name='ios-menu' style={{ color: "white" }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Dashboard</Title>
                </Body>
                <Right />
            </Header>

        )
    }

    render() {
        return (
            <Container >
                {this.getHeaderSection()}
                <Content style={{
                    flex: 1
                }}>
                    <View style={
                        {
                            width: "100%",
                            backgroundColor: "yellow",
                            height: 500,
                            paddingTop: "4%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#0E0D0D"
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

                            <Row>
                                <Col style={{
                                    marginRight:"5%"
                                }}>
                                    <Text note style={styleContent.labelStyling}  > Originator BU</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  >Target BU</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                            </Row>



                            <Row>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  >Select Rep</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{
                                    marginRight:"5%"
                                }}>
                                    <Text note style={styleContent.labelStyling}  >Start Date</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  >End Date</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button transparent style={{
                                        backgroundColor: "red",
                                        borderRadius: 20,
                                        alignSelf: "center",
                                        marginTop: "2%"
                                    }

                                    }>
                                        <Text style={
                                            {
                                                color: "white",
                                                fontSize: 14

                                            }
                                        }> REFINE RESULTS</Text>
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{
                                    alignItems: "center",
                                    marginTop: "2%"
                                }}
                                >
                                    <Text style={
                                        {
                                            color: "#44C1EE",
                                            fontSize: 45

                                        }
                                    }> 6752</Text>
                                    <Text style={
                                        {
                                            color: "#FFFFFF",
                                            fontSize: 22

                                        }
                                    }> TOTAL LEADS</Text>

                                </Col>
                            </Row>

                            <Row>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={{
                                                color: "#AEAEAE",
                                                fontSize: 14
                                            }}>
                                                Approved Lead</Text>
                                            <Text style={{
                                                color: "#8BBF45",
                                                fontSize: 40
                                            }}>
                                                131</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={{
                                                color: "#AEAEAE",
                                                fontSize: 14
                                            }}>
                                                Rejected Lead</Text>
                                            <Text style={{
                                                color: "#616161",
                                                fontSize: 40
                                            }}>
                                                131</Text>
                                        </View>
                                    </Card>

                                </Col>
                            </Row>




                            <Row>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={{
                                                color: "#AEAEAE",
                                                fontSize: 14
                                            }}>
                                                Approved Lead</Text>
                                            <Text style={{
                                                color: "#8BBF45",
                                                fontSize: 40
                                            }}>
                                                131</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={{
                                                color: "#AEAEAE",
                                                fontSize: 14
                                            }}>
                                                Rejected Lead</Text>
                                            <Text style={{
                                                color: "#616161",
                                                fontSize: 40
                                            }}>
                                                131</Text>
                                        </View>
                                    </Card>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                            <Right>
                                    <Button transparent style={{
                                        backgroundColor: "red",
                                        borderRadius: 20,
                                        alignSelf: "center",
                                        marginTop: "2%"
                                    }

                                    }>
                                        <Text style={
                                            {
                                                color: "white",
                                                fontSize: 14

                                            }
                                        }> EXTRACT REPORT</Text>
                                    </Button>
                                    </Right>
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