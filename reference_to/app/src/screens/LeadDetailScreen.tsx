import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import { Linking, Alert, Platform } from 'react-native';
import { Container, Text, Content,Header,Left,Body,Icon,Button,Title, Right, Card, CardItem, Grid, Row, Col} from "native-base";


export interface Detail  {id: string ,Company:string,Description:string,Contact:string,Designation:string,Address:string,
	Email:string,Mobile:string, SalesRep:string,BusinessUnit:string,Status:string}

  class DefaultDetail implements Detail {
    constructor(
      public id = '',
      public Company = '',
      public Description = '',
      public Contact = '',
      public Designation = '',
      public Address = '',
      public Email = '',
      public Mobile = '',
      public SalesRep = '',
      public BusinessUnit = '',
      public Status = ''
    ) {}
  }
export interface Props {
	navigation: any;
}
export interface State {
  LeadDetail : Detail;
}

class LeadDetailScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);
        this.state = {
          LeadDetail: new DefaultDetail()
        }

    }    
    componentDidMount()
    {
      var detail= new DefaultDetail();
      detail.id='1';
      detail.Address='NA';
      detail.BusinessUnit='marketing, sales';
      detail.Company = 'Shaheen Shah Afridi';
      detail.Contact = 'CH Morris';
      detail.Description = 'South Africa batsman hopes the top order converts starts to big scores, beginning';
      detail.Designation = 'NA';
      detail.Email = 'a@b.com';
      detail.Mobile = '9764007637';
      detail.SalesRep = 'Porter'
      detail.Status = 'NA';
      this.setState({LeadDetail:detail})
    }
    goBack()
    {

      this.props.navigation.goBack();
    }
    onOpenDialer(phone:string)
    {
      var phoneNumber = phone;
      if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
      }
      else  {
        phoneNumber = `tel:${phone}`;
      }

      Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
              Alert.alert('Phone number is not available');
            } else
            {
              return Linking.openURL(phoneNumber);
            }
          }
        )
        .catch(err => console.log(err));
    }
    renderCard(Title:string,Detail:string)
    {
      return (
        <Card style={{width:'96%',alignSelf:'center'}}>
          <CardItem>
            <Body>
              <Text note>{Title}</Text>
              <Text>{Detail}</Text>
            </Body>
          </CardItem>
        </Card>
      );
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
                  <Title>Lead Details</Title>
                </Body>
                <Right>
                  <Button transparent onPress={() => this.goBack()}>
                    <Icon  name="dots-vertical" />
                  </Button>
                </Right>
              </Header>
              <Content>
                
                <Card style={{width:'96%',alignSelf:'center'}}>
                  <CardItem>
                    <Body>
                      <Text>{this.state.LeadDetail.Company}</Text>
                      <Text note>{this.state.LeadDetail.Description}</Text>
                    </Body>
                  </CardItem>
                </Card>
                
                <Card style={{width:'96%',alignSelf:'center'}}>
                  <CardItem>
                  <Grid>
                    <Row><Col><Text>Contact</Text></Col></Row>
                    <Row><Col><Text>{this.state.LeadDetail.Contact}</Text></Col></Row>
                    <Row><Col><Text note>{this.state.LeadDetail.Designation}</Text></Col></Row>
                    <Row><Col><Text note>{this.state.LeadDetail.Address}</Text></Col></Row>
                    <Row>
                      <Col>
                        <Row><Col style={{width:30}}><Icon name="email-outline" /></Col><Col><Text>{this.state.LeadDetail.Email}</Text></Col></Row>
                        <Row><Col style={{width:30}}><Icon name="phone" /></Col><Col><Text>{this.state.LeadDetail.Mobile}</Text></Col></Row>
                      </Col>
                      <Col style={{width:60}}><Button rounded onPress={() => this.onOpenDialer(this.state.LeadDetail.Mobile)}><Icon name="phone" /></Button></Col>
                    </Row>
                    
                  </Grid>
                  </CardItem>
                </Card>

                {this.renderCard('Sales Representative',this.state.LeadDetail.SalesRep)}
                {this.renderCard('Business Unit Handing',this.state.LeadDetail.BusinessUnit)}
                {this.renderCard('Status',this.state.LeadDetail.Status)}
              </Content>  
              
            </Container>
        );
    }
}

export default LeadDetailScreen;