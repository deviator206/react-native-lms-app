import Styles from "../theme/lms/Styles";
import React, { Component } from "react";

import { Container, Text, Content, Header, Left, Button, Icon, Body, Title, Right, Footer, Card, 
        CardItem, Grid,Row,Col, Item, Input, Label, Textarea, CheckBox} from "native-base";
import { StyleSheet } from "react-native";

import DateControl from '../common/DateControl'
import LeadSourceControl from '../common/LeadSourceControl'
import StateControl from "../common/StateControl";
import CountryControl from "../common/CountryControl";
import BusinessUnitControl from "../common/BusinessUnitControl";
import IndustryControl from "../common/IndustryControl";
import CurrencyControl from "../common/CurrencyControl";
import SalesRepControl from "../common/SalesRepControl";

export interface Detail  {Date: string,Source:string,Customer:string,Requirement:string,
  ContactName:string,Email:string,Phone:string,State:string,Country:string,
  BusinessUnit:string,Industry:string,Budget:number,Currency:string,ApproveType:boolean,SalesRep:string}

  class DefaultDetail implements Detail {
    constructor(
      public Date = '',
      public Source ='',
      public Customer= '', 
      public Requirement= '', 
      public ContactName= '', 
      public Email= '', 
      public Phone= '', 
      public State= '', 
      public Country= '', 
      public BusinessUnit= '', 
      public Industry= '', 
      public Budget = 0,
      public Currency= '', 
      public ApproveType=true,
      public SalesRep= ''
    ) {}
  }
export interface Props {
	navigation: any;
}
export interface State {
  LeadDetail : Detail;
}

class AddLeadScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);

        this.state = {
          LeadDetail: new DefaultDetail()
        }
    }    
    goBack()
    {

      this.props.navigation.goBack();
    }
    onAddLead()
    {

    }
    onEdit(Key:string,Value:string)
    {
      var newLeadDetail = this.state.LeadDetail;
      if (Key==='Date')
        newLeadDetail.Date = Value;
      else if (Key==='Source')
        newLeadDetail.Source = Value;
      else if (Key==='Customer')
        newLeadDetail.Customer = Value;
      else if (Key==='Requirement')
          newLeadDetail.Requirement = Value;
      else if (Key==='ContactName')
          newLeadDetail.ContactName = Value;
      else if (Key==='Email')
          newLeadDetail.Email = Value;
      else if (Key==='Phone')
          newLeadDetail.Phone = Value;
      else if (Key==='State')
          newLeadDetail.State = Value;
      else if (Key==='Country')
          newLeadDetail.Country = Value;
      else if (Key==='BusinessUnit')
          newLeadDetail.BusinessUnit = Value;
      else if (Key==='Industry')
          newLeadDetail.Industry = Value;
      else if (Key==='Budget')
          newLeadDetail.Budget = parseFloat( Value);
      else if (Key==='Currency')
          newLeadDetail.Currency = Value;
      else if (Key==='ApproveType')
          newLeadDetail.ApproveType = !this.state.LeadDetail.ApproveType;
      else if (Key==='SalesRep')
          newLeadDetail.SalesRep = Value;

        this.setState({ LeadDetail: newLeadDetail })
    }
    render() {
        return (
          <Container style={Styles.homeContainer}>
            <Header>
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
              <Content>
                <Card style={{width:'96%',alignSelf:'center'}}>
                  <CardItem>
                    <Grid>
                      <Row><Col><Text note>Date</Text></Col><Col><Text note>Source</Text></Col></Row>
                      <Row>
                        <Col><DateControl Date={this.state.LeadDetail.Date} onDateSelected={(value:string)=> this.onEdit('Date',value)}/></Col>
                        <Col><LeadSourceControl PickedValue={this.state.LeadDetail.Source} onPicked={(value:string)=> this.onEdit('Source',value)} /></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Item floatingLabel>
                            <Label style={{fontSize:14}}>Customer Name</Label>
                            <Input returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.LeadDetail.Customer} 
                                onChangeText={(value:string)=> this.onEdit('Customer',value)}/>
                         </Item>
                        </Col>
                      </Row>
                      <Row><Col><Text note>Requirement</Text></Col></Row>
                      <Row>
                        <Col>
                          <Item>
                            <Textarea rowSpan={2} style={{width:'99%'}} bordered value={this.state.LeadDetail.Requirement} 
                                onChangeText={(value:string)=> this.onEdit('Requirement',value)}/>

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
                                value={this.state.LeadDetail.ContactName} 
                                onChangeText={(value:string)=> this.onEdit('ContactName',value)}/>
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
                                value={this.state.LeadDetail.Email} 
                                onChangeText={(value:string)=> this.onEdit('Email',value)}/>
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
                                value={this.state.LeadDetail.Phone} 
                                onChangeText={(value:string)=> this.onEdit('Phone',value)}/>
                         </Item>
                        </Col>
                      </Row>
                      <Row><Col><Text note>Country</Text></Col><Col><Text note>State</Text></Col></Row>
                      <Row>
                        <Col><CountryControl PickedValue={this.state.LeadDetail.Country} onPicked={(value:string)=> this.onEdit('Country',value)} /></Col>
                        <Col><StateControl PickedValue={this.state.LeadDetail.State} onPicked={(value:string)=> this.onEdit('State',value)} /></Col>
                      </Row>
                      <Row><Col><Text note>Business Unit</Text></Col></Row>
                      <Row>
                        <Col><BusinessUnitControl PickerType='Multiple' PickedValue={this.state.LeadDetail.BusinessUnit} onPicked={(value:string)=> this.onEdit('BusinessUnit',value)} /></Col>
                      </Row>
                      <Row><Col><Text note>Industry</Text></Col></Row>
                      <Row>
                        <Col><IndustryControl PickedValue={this.state.LeadDetail.Industry} onPicked={(value:string)=> this.onEdit('Industry',value)} /></Col>
                      </Row>

                      <Row><Col><Text note>Estimated Budget</Text></Col></Row>
                      <Row>
                        <Col>
                          <Item floatingLabel>
                            <Input returnKeyType="next"
                                clearButtonMode="always"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.LeadDetail.Budget+''} 
                                onChangeText={(value:string)=> this.onEdit('Budget',value)}/>
                         </Item>

                        </Col>
                        <Col><CurrencyControl PickedValue={this.state.LeadDetail.Currency} onPicked={(value:string)=> this.onEdit('Currency',value)} /></Col>
                      </Row>
                      <Row><Col><Text note>Self Approve</Text></Col><Col><Text note>Sales Rep</Text></Col></Row>
                      <Row>
                        <Col><CheckBox style={{marginTop:16}} checked={this.state.LeadDetail.ApproveType} onPress={()=>this.onEdit('ApproveType','1')} /></Col>
                        <Col><SalesRepControl PickedValue={this.state.LeadDetail.SalesRep} onPicked={(value:string)=> this.onEdit('SalesRep',value)} /></Col>
                      </Row>

                    </Grid>
                  </CardItem>
                </Card>  
              </Content>  
              <Footer>
                    <Button style={LocalStyles.addBtn} onPress={() => this.onAddLead()} >
                        <Text style={{fontSize:16}}>CREATE LEAD</Text><Icon name="arrow-right" />
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const LocalStyles: any = StyleSheet.create({
  
  addBtn: {
      backgroundColor: '#ec2227',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
  }
}
);

export default AddLeadScreen;