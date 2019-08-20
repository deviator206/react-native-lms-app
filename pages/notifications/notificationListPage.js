import { Button, Card, CardItem, Col, Container, Content, Grid, Input, Item, Row, Tab, Tabs, Text } from 'native-base';
import React from 'react';
import { Alert, FlatList, Modal, TouchableHighlight, View } from 'react-native';
import { default as FilterIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FooterComponent from '../common/footerComponent';
import HeaderComponent from '../common/headerComponent';
import styleContent from './notificationListStyle';



export default class NotificationListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.sideMenuClickHandler = this.sideMenuClickHandler.bind(this);
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

    getViewLeads() {
        const dataR = [
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"

            }, {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"

            },
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"

            },
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"
            },
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"
            },
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"
            },
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "CLOSED"
            }];

        const returnedView = (
            <FlatList
                data={dataR}
                renderItem={({ item }) =>
                    <Row>
                        <Card style={styleContent.gridCardWrapper} >
                            <CardItem>
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
                                                <Text style={styleContent.cardViewPrimaryLabel}  > Status </Text>

                                            </Col>
                                            <Col style={styleContent.colValue} >
                                                <Text style={styleContent.cardViewPrimaryValue} >: {item.status}  </Text>
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
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        const { navigation } = this.props;
        return (
            <Container>
                <HeaderComponent navigation={navigation}   title="Notifications" />
                
                <Content style={styleContent.mainContent}>
                    <Tabs   tabBarUnderlineStyle={{backgroundColor:'red', height:3}} tabBarPosition="overlayTop">
                        <Tab 
                        activeTabStyle={{backgroundColor:"#FFFFFF"}} 
                        activeTextStyle={{color:"#000000"}} 
                        textStyle={{color:"#616161"}} 
                        tabStyle={{backgroundColor:"#E8E8E8"}} 
                      
                        heading="Read" 
                        >
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
                            
                        </Tab>
                        <Tab 
                        activeTabStyle={{backgroundColor:"#FFFFFF"}} 
                        activeTextStyle={{color:"#000000"}} 
                        textStyle={{color:"#616161"}} 
                        tabStyle={{backgroundColor:"#E8E8E8"}} 
                        heading="Unread"
                        >
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
                        </Tab>
                    </Tabs>

                </Content>
                <View style={styleContent.circular} transparent button >
                    <Icon name="add" style={{ color: "white", fontSize: 50 }} />
                </View>
                <FooterComponent />

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