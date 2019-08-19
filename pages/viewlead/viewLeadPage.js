import { Button, Card, CardItem, Col, Container, Content, Grid, Input, Item, Row, Text } from 'native-base';
import React from 'react';
import { Alert, FlatList, Modal, TouchableHighlight, View } from 'react-native';
import { default as EntypoIcon } from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import styleContent from './viewLeadStyle';
import { default as commonStyle } from '../common/commonStyling';


export default class ViewLeadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.getStatusClass =this.getStatusClass.bind(this);
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

    getStatusClass(status) {
        if(status && status.toUpperCase() === 'APPROVED'){
            return styleContent.approvedStatus;
        } else  if(status && status.toUpperCase() === 'CLOSED'){
            return styleContent.closedStatus;
        } else if(status && status.toUpperCase() === 'PENDING'){
            return styleContent.pendingStatus;
        }
        return styleContent.cardViewSecondaryInfo;

    }

    getViewLeads() {
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

        const returnedView = (
            <FlatList
                data={dataR}
                renderItem={({ item }) =>
                    <Row
                        button
                        onPress={() => {
                            this.props.navigation.navigate("leaddetails");
                        }}
                    >
                        <Card style={styleContent.gridCardWrapper}
                        >
                            <CardItem>
                                <Col>
                                    <Grid>
                                        <Row>
                                            <Col>
                                                <Text style={styleContent.cardViewMainTitle} > {item.companyName} </Text>
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
                                                <Text style={styleContent.cardViewPrimaryValue} >{item.contact}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={
                                                    styleContent.cardViewPrimaryLabel}  > Status </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                            <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={this.getStatusClass(item.status)} > {item.status}  </Text>
                                                
                                            </Col>
                                            <Col style={styleContent.colValueThird} >
                                                <View style={styleContent.approvedStatusCircle} />
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Sales Rep </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                            <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.salesRep}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Unit </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                            <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.businessUnit}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Last Updated </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                            <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.lastUpdated}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Inactive Days </Text>
                                            </Col>
                                            <Col style={styleContent.colValue} >
                                            <Text style={styleContent.cardViewPrimaryValue} >:   </Text>
                                                <Text style={styleContent.cardViewPrimaryValue} > {item.inactiveDays}  </Text>
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
        const {navigation} = this.props;
        
        return (
            <Container>
                <HeaderComponent title="View Leads"  navigation={navigation} />
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
                    <View style={{ width: '100%'}}>
                        <View style={commonStyle.modalHeaderDiv}>
                            <Text note style={commonStyle.modalHeader}> Filter View Leads </Text>
                            <TouchableHighlight
                                onPress={() => {
                                    this.filerBtnToggled();
                                }}>
                                <Icon name="close" style={commonStyle.modalCloseBtn} />
                            </TouchableHighlight>
                        </View>
                        <View style={{ padding: 20, marginTop: "5%"}}>
                            <Row style={{ marginBottom: "8%" }}>
                                <Col>
                                    <Text note style={{ 
                                        fontSize: 14,
                                        fontFamily: 'Montserrat-Medium',
                                        color: "#616161"}}> Status</Text>
                                </Col>
                                <Col>
                                    <Text note style={{ 
                                        fontSize: 14,
                                        fontFamily: 'Montserrat-Medium',
                                        color: "#616161"}}>Tenure</Text>
                                </Col>
                            </Row>
                            <Row style={{  }}>
                                <Col>
                                    <Text style={{ 
                                        fontSize: 16,
                                        fontFamily: 'Montserrat-Medium',
                                        color: "#000000"}}>Hello World!</Text>
                                </Col>
                                <Col>
                                    <Text style={{ 
                                        fontSize: 16,
                                        fontFamily: 'Montserrat-Medium',
                                        color: "#000000"}}>Hello World!</Text>
                                </Col>
                            </Row>
                        </View>
                        <View style={{ width:"100%" , marginTop: "20%", alignItems: "center" }}>
                            <View  style={{
                                marginTop: 5,
                                backgroundColor: "#EC2227",
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                width: "90%",

                            }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.filerBtnToggled();
                                    }}>
                                    <Text  style={{
                                        color: "#FFFFFF",
                                        fontSize: 16,
                                        fontFamily: 'Montserrat-Medium'
                                    }}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                </Modal>
            </Container>
        )
    }
}