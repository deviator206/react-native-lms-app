import { Button, Card, CardItem, Col, Container, Content, Grid, Input, Item, Row, Text } from 'native-base';
import React from 'react';
import { Alert, FlatList, Modal, TouchableHighlight, View } from 'react-native';
import { default as FilterIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../common/headerComponent';
import styleContent from './viewLeadStyle';


export default class ViewLeadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
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

    getViewLeads() {
        const dataR = [
            {
                companyName: "CM Tek-3",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                contact: "RK Sharma",
                status: "CLOSED",
                salesRep: "Samir",
                businessUnit: "Atlas",
                lastUpdated: "12/4/2019",
                inactiveDays: "129"
            }, {
                companyName: 'BM Sigma',
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                contact: "Shrivastava",
                status: "PENDING",
                salesRep: "Sunayna",
                businessUnit: "Spectro",
                lastUpdated: "12/4/2019",
                inactiveDays: "29"

            },
            {
                companyName: 'Suraj Ent',
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                contact: "Shrivastava",
                status: "PENDING",
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
                              onPress={()=>{
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
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.contact}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Status </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.status}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Sales Rep </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.salesRep}  </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Unit </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.businessUnit}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Last Updated </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.lastUpdated}  </Text>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col style={styleContent.colLabelOnly} >
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Inactive Days </Text>
                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.inactiveDays}  </Text>
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
        return (
            <Container>
                <HeaderComponent title="View Leads" />
                <Content style={styleContent.mainContent}>
                    <Grid >
                        <Row style={styleContent.searchAndFilterWrapper}>
                            <Col style={styleContent.searchBarWrapper} >
                                <Item searchBar rounded style={styleContent.searchBarStyling}>
                                    <Input placeholder="Search" />
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
                                    <FilterIcon name="filter-outline" style={styleContent.iconStylingBigger} />
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Grid style={styleContent.gridWrapper} >
                        {this.getViewLeads()}
                    </Grid>
                </Content>

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