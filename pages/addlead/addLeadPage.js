import { Body, Button, Card, CardItem, Col, Container, Content, Footer, Grid, Header, Icon, Input, Item, Label, Left, Right, Row, Text, Textarea, Title } from 'native-base';
import React from 'react';
import SpinnerComponent from '../common/spinnerComponent';
import styleContent from './addLeadStyle';


export default class AddLeadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false
        }
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
        this.getHeaderSection = this.getHeaderSection.bind(this);
    }

    getHeaderSection () {
        return (
            <Header style={styleContent.headerSection}>
              <Left>
                <Button transparent onPress={() => this.goBack()}>
                  <Icon name="arrow-left" />
                </Button>
              </Left>
              <Body>
                <Title>Add Lead</Title>
              </Body>
              <Right/>
            </Header>

        )
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

    render() {
        return (
            <Container style={styleContent.container}>
                {this.getHeaderSection()}
                <Content style={styleContent.mainContent}>
                    <Card style={{width:'96%',alignSelf:'center'}}>
                        <CardItem>
                            <Grid>
                              <Row><Col><Text note>Date</Text></Col><Col><Text note>Source</Text></Col></Row>  
                              <Row><Col><Text note>Customer Name</Text></Col></Row>
                              <Row>
                                <Col>
                                        <Input returnKeyType="next"
                                            clearButtonMode="always"
                                            autoCapitalize="none"
                                            autoCorrect={false}/>
                                    
                                </Col>
                            </Row>  
                            <Row><Col><Text note>Requirement</Text></Col></Row>
                            <Row>
                        <Col>
                          <Item>
                            <Textarea rowSpan={2} style={{width:'99%'}} bordered 
                               />

                         </Item>
                        </Col>
                      </Row>
                      <Row><Col><Text note>Contact Information</Text></Col></Row>
                      <Row>
                        <Col>
                          <Item floatingLabel>
                            <Label style={{fontSize:14}}>Name</Label>
                            <Input returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                />
                         </Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Item floatingLabel>
                            <Label style={{fontSize:14}}>Email</Label>
                            <Input returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                />
                         </Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Item floatingLabel>
                            <Label style={{fontSize:14}}>Phone</Label>
                            <Input returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                               />
                         </Item>
                        </Col>
                      </Row>

                      <Row><Col><Text note>Country</Text></Col><Col><Text note>State</Text></Col></Row>
                      

                            </Grid>

                        </CardItem>
                    </Card>
                    
                </Content>
                
                <Footer>
                        <Button  style={styleContent.addLeadFooter}>
                            <Text style={styleContent.addLeadFooterText}>ADD LEAD </Text>
                        </Button >
                </Footer>
                {this.getSpinnerComponentView()}
                
            </Container>
        );
    }
}