import { Button, Card, CardItem, Col, Container, Content, Grid, Input, Item, Row, Text, View } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import { default as FilterIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import MarketIntelligenceApi from '../../services/MarketIntelligenceApi';
import { default as commonStyle } from '../common/commonStyling';
import { default as appConstant } from '../common/consts';
import HeaderComponent from '../common/headerComponent';
import SpinnerComponent from '../common/spinnerComponent';
import { default as FilterComponent } from './miFilterComponent';
import styleContent from './miListPageStyle';


const marketIntelligenceApi = new MarketIntelligenceApi({ state: {} });



class MiListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterVisible: false,
            spinner: false
        };
        this.filerBtnToggled = this.filerBtnToggled.bind(this);
        this.willFocusSubscription = null;

        this.onLoadAllMarketInt = this.onLoadAllMarketInt.bind(this);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onResponseSuccess = this.onResponseSuccess.bind(this);
        this.onResponseError = this.onResponseError.bind(this);
        this.getStatusStyle = this.getStatusStyle.bind(this);
        this.triggerFilterBasedSearch = this.triggerFilterBasedSearch.bind(this);
        this.triggerResetFilterBasedSearch = this.triggerResetFilterBasedSearch.bind(this);

    }

    onResponseSuccess(resp) {
        const resultSetLocal = [
            {
                miId: "MI#779",
                type: "New Item",
                description: "This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward",
                status: "OPEN"

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
        this.setState({
            spinner: false,
            resultSet: resp
        });
    }

    onResponseError() {
        this.setState({
            spinner: false
        });
    }

    onSearchTextChange(value) {
        this.setState({
            searchInput: value
        })
    }

    triggerResetFilterBasedSearch() {
        this.setState({
            filterVisible: false,
            filterState: {}
        });
        this.onLoadAllMarketInt();
    }

    triggerFilterBasedSearch(filterState) {
        const { MI_TYPE_DROP_DOWN, START_DATE, MI_STATUS_DROP_DOWN, END_DATE } = filterState;
        let filterPayload = {};

        if (MI_TYPE_DROP_DOWN) {
            filterPayload = {
                ...filterPayload,
                type: MI_TYPE_DROP_DOWN
            }
        }

        if (MI_STATUS_DROP_DOWN) {
            filterPayload = {
                ...filterPayload,
                status: MI_STATUS_DROP_DOWN
            }
        }

        if (START_DATE) {
            filterPayload = {
                ...filterPayload,
                startDate: START_DATE
            }
        }

        if (END_DATE) {
            filterPayload = {
                ...filterPayload,
                endDate: END_DATE
            }
        }

        this.setState({
            filterVisible: false,
            spinner: true,
            filterState
        });
        this.props.searchMIList(filterPayload).then(this.onResponseSuccess).catch(this.onResponseError);
    }

    onSearchButtonClicked() {
        const { searchInput = '' } = this.state;
        if (searchInput && searchInput !== '') {
            const filterPayload = {
                "searchText": searchInput
            }
           //  this.triggerFilterBasedSearch(filterPayload)
        }
    }
    onLoadAllMarketInt() {
        this.setState({
            spinner: true
        });
        this.props.loadAllMI().then(this.onResponseSuccess).catch(this.onResponseError)
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
            filterVisible: false,
            filterState: {}
        });
        this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.onLoadAllMarketInt);
    }

    componentWillUnmount() {
        if (this.willFocusSubscription) {
            this.willFocusSubscription.remove();
        }
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



    getStatusStyle(status) {
        if (status === appConstant.MI_STATUS.CLOSED) {
            return styleContent.closedStatus;
        }
        return styleContent.pendingStatus;
    }


    getViewLeads() {
        const { resultSet = [] } = this.state;
        let returnedView
        if (resultSet && resultSet.length > 0) {
            returnedView = (
                <FlatList
                    data={resultSet}
                    renderItem={({ item }) =>
                        <Row
                            button
                            onPress={() => {
                                // item.id
                                this.props.navigation.navigate("midetails", {
                                    miId: item.id
                                });
                            }}
                        >
                            <Card style={styleContent.gridCardWrapper} >
                                <CardItem>
                                    <Col>
                                        <Grid>
                                            <Row>
                                                <Col>
                                                    <Text style={styleContent.cardViewMainTitle} > MI#{item.id} </Text>
                                                </Col>
                                                <Col style={{ flexDirection: "row" }}>
                                                    <Text style={styleContent.cardViewSecondaryInfo}  > Type:  </Text>
                                                    <Text style={styleContent.cardViewPrimaryValue}  >  {item.type} </Text>
                                                </Col>

                                            </Row>
                                            {
                                                item && item.creationDate && (
                                                    <Row>
                                                        <Col>
                                                            <Text style={styleContent.cardViewSecondaryInfo}  > Date:  </Text>

                                                        </Col>
                                                        <Col>
                                                            <Text style={styleContent.cardViewPrimaryValue}  >  {item.creationDate} </Text>
                                                        </Col>
                                                    </Row>

                                                )
                                            }
                                            {
                                                item && item.name && (
                                                    <Row>
                                                        <Col>
                                                            <Text style={styleContent.cardViewSecondaryInfo}  > Project Name:  </Text>
                                                        </Col>
                                                        <Col>
                                                            <Text style={styleContent.cardViewPrimaryValue}  > {item.name} </Text>
                                                        </Col>
                                                    </Row>

                                                )
                                            }
                                            {
                                                item && item.investment && (
                                                    <Row>
                                                        <Col>
                                                            <Text style={styleContent.cardViewSecondaryInfo}  >Investment: </Text>
                                                        </Col>
                                                        <Col>
                                                            <Text style={styleContent.cardViewPrimaryValue}  > {item.investment} </Text>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                            {
                                                item && item.description && (
                                                    <Row>
                                                        <Col>
                                                            <Text style={styleContent.cardViewSecondaryInfo}  >Description: </Text>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                            {
                                                item && item.description && (
                                                    <Row>
                                                        <Col>
                                                            <Text style={styleContent.cardViewPrimaryValue}  > {item.description} </Text>
                                                        </Col>
                                                    </Row>
                                                )
                                            }

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
                                </CardItem>
                            </Card>
                        </Row>
                    }
                >

                </FlatList>
            );
        }
        return returnedView;
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <HeaderComponent navigation={navigation} title="Market Intelligence" />
                <Content style={styleContent.mainContent}>
                    <Grid >
                        <Row style={commonStyle.searchAndFilterWrapper}>
                            <Col style={commonStyle.searchBarWrapper} >
                                <Item searchBar rounded style={commonStyle.searchBarStyling}>
                                    <Input
                                        placeholder="Search"
                                        style={commonStyle.inputBox}
                                        onChangeText={(value) => {
                                            this.onSearchTextChange(value);
                                        }}
                                    />
                                    <Button transparent
                                        onPress={() => {
                                            this.onSearchButtonClicked();
                                        }}
                                    >
                                        <Icon name="search"
                                            style={[styleContent.iconStyling, commonStyle.searchIcon]}
                                        />
                                    </Button>
                                </Item>
                            </Col>
                            <Col  >
                                <Button
                                    transparent
                                    style={styleContent.filterBtnIcon}
                                    onPress={() => {
                                        this.filerBtnToggled();
                                    }}
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
                <View style={styleContent.floatingButtonView}>
                    <Button
                        style={styleContent.floatingButton}
                        button
                        onPress={() => {
                            this.props.navigation.navigate("miadd");
                        }} >
                        <Icon name="add" style={{
                            color: "white",
                            fontSize: 30,
                            marginLeft: 15
                        }} />
                    </Button>
                </View>

                <FilterComponent
                    savedState={this.state.filterState}
                    showModal={this.state.filterVisible}
                    toggleHandler={this.filerBtnToggled}
                    applyFilterHandler={this.triggerFilterBasedSearch}
                    resetFilterHandler={this.triggerResetFilterBasedSearch}
                />
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
        loadAllMI: (inputParams) => {
            return marketIntelligenceApi.getMI({
                params: inputParams
            }).then((resp) => {
                return resp;
            })

        },
        searchMIList: (filterPayload) => {
            return marketIntelligenceApi.searchMIList(filterPayload).then((resp) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MiListPage);