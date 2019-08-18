import { Button, Card, Col, Container, Content, Grid, Item, Picker, Row, Text, View } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appConfig from '../common/config';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import SpinnerComponent from '../common/spinnerComponent';
import { default as commonStyle } from '../common/commonStyling';
import styleContent from './dashboardStyle';
import {default as AppConst} from '../common/consts';
export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.getFooterTab = this.getFooterTab.bind(this);
        this.getDropdownFor = this.getDropdownFor.bind(this);
        this.sideMenuClicked = this.sideMenuClicked.bind(this);
        this.getHeaderSection  =this.getHeaderSection.bind(this);

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
                                backgroundColor: "red"
                            }}
                            value={singleItem} />)
                    )
                });
                returnedView = (
                    <Item picker style={
                        {
                            borderRadius: 80,
                            borderColor: '#393939',
                            backgroundColor: "#393939",
                            paddingLeft: "2%"                         
                        }
                    }
                    >
                        <Picker
                            style={
                                {
                                    color: "#f0f3f7",
                                    textTransform: "capitalize"
                                }
                            }
                            mode="dropdown"
                            textStyle={{ color: "#d3d3d3" }}
                            itemTextStyle={{ color: '#d3d3d3' }}
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

    sideMenuClicked() {
        this.props.navigation.openDrawer();
    }

    getHeaderSection() {

        return (<HeaderComponent title="Dashboard" showSideMenuBtn={true} hamburger={true} sideMenuClickHandler={this.sideMenuClicked} />);

        /*
          return (
            <Header style={styleContent.headerSection}>
                <Left>
                    <Button
                        transparent
                        style={styleContent.sideMenu}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name='menu' style={{ color: "white",  fontSize:25 }} />
                    </Button>
                </Left>
                <Body>
                    <Title>Dashboard</Title>
                </Body>
                <Right />
            </Header>

        )*/

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
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  >Target BU</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                            </Row>



                            <Row style={{
                                marginTop: "5%",
                                paddingHorizontal: "3%"
                            }}>
                                <Col>
                                    <Text note style={styleContent.labelStyling}  > Representative</Text>
                                    {this.getDropdownFor('BU_NAME')}
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
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                                <Col>
                                    <Text note style={[styleContent.labelStyling, commonStyle.textUppercase]}  >End Date</Text>
                                    {this.getDropdownFor('BU_NAME')}
                                </Col>
                            </Row>
                            <Row style={
                                    {
                                        marginTop: "10%"
                                    }
                                }>
                                <Col >
                                    <Button transparent
                                        style={styleContent.roundedButton}>
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
                                            color: AppConst.primaryBlue,
                                            fontSize: 47,
                                            lineHeight: 50,
                                            marginTop: "3%",
                                            fontFamily: "Montserrat-Medium"

                                        }
                                    }> 6752</Text>
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

                            <Row style={{ marginLeft: "4%"}}>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Approved Lead</Text>
                                            <Text style={styleContent.approvedValue}>
                                                131</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Rejected Lead</Text>
                                            <Text style={styleContent.rejectedValue}>
                                                78</Text>
                                        </View>
                                    </Card>

                                </Col>
                            </Row>




                            <Row style={{ marginLeft: "4%"}}>
                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Assigned Lead</Text>
                                            <Text style={styleContent.closedValue}>
                                                45</Text>
                                        </View>
                                    </Card>

                                </Col>

                                <Col >
                                    <Card style={styleContent.cardStyling}>
                                        <View >
                                            <Text style={styleContent.cardHeader}>
                                                Pending Lead</Text>
                                            <Text style={styleContent.pendingValue}>
                                                55</Text>
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