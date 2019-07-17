import Styles from "../theme/lms/Styles";
import React, { Component } from "react";
import { StatusBar,StyleSheet,FlatList } from "react-native";

import { Container, Text, Content,Header,Left,Body,Right,Title,Button, View,Item,Icon,Input,
        CardItem,Grid,Row,Col, Card} from "native-base";

import FooterControl from '../common/FooterControl'
import Modal from "react-native-modal";
import StatusControl from "../common/StatusControl";
import TenureControl from "../common/TenureControl";
import CountryControl from "../common/CountryControl";
import IndustryControl from "../common/IndustryControl";
import LeadSourceControl from "../common/LeadSourceControl";
import SalesRepControl from "../common/SalesRepControl";
import BusinessUnitControl from "../common/BusinessUnitControl";

export interface Leads  {id: string ,Company:string,Description:string,Contact:string,Status:string,SalesRep:string,
    BusinessUnit:string,UpdatedOn:string,Days:string}

export interface Props {
	navigation: any;
}
export interface State {
  SearchText: string,
  LeadData:Leads[],
  isFilterVisible:boolean,
  FilterData: LeadFilters
}

export interface LeadFilters  {Status: string,Tenure:string,Source:string, State:string,Country:string,
  BusinessUnit:string,Industry:string,SalesRep:string}

  class DefaultDetail implements LeadFilters {
    constructor(
      public Status = '',
      public Tenure='',
      public Source ='',
      public State= '', 
      public Country= '', 
      public BusinessUnit= '', 
      public Industry= '', 
      public SalesRep= ''
    ) {}
  }


class ViewLeadsScreen extends Component<Props, State>
{
    constructor(props: Props) {
 
        super(props);

        this.state = {
          SearchText:'',
          LeadData:[],
          isFilterVisible:false,
          FilterData : new DefaultDetail()
        }
    }  
    componentDidMount()
    {
      var data =
      {list:[
        { "id": 1, "source": "Marketing", "custName": "Shaheen Shah Afridi", "description": "South Africa batsman hopes the top order converts starts to big scores, beginning", "leadContact": { "name": "CH Morris", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": [ "marketing", "sales" ], "salesRep": "Porter", "industry": "Sports" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" },
        { "id": 2, "source": "Marketing", "custName": "Wahab Riaz", "description": "van der Dussen, 1 run, dropped by the captain! Full, on middle, and he goes for an expansive", "leadContact": { "name": "Shaheen Shah Afridi ", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": [ "marketing" ], "salesRep": "Groenewald", "industry": "Resale" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" },
        { "id": 3, "source": "Marketing", "custName": "HE van der Dussen", "description": "Miller reviews. This was full on middle, and turning across Miller. He misses the sweep, and ball hits front leg. But was it spinning too much? Replays ", "leadContact": { "name": "Phehlukwayo", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": [ "Admin", "sales" ], "salesRep": "Abell", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" },
        { "id": 4, "source": "Marketing", "custName": "Mohammad Hafeez", "description": "1 run, opens the face of the bat and strikes it to the same fielder. This won't do for South Africa", "leadContact": { "name": "XI from the New Zealand", "email": "a@b.com", "phoneNumber": "9764007637", "country": "India", "state": "MH" }, "leadsSummaryRes": { "businessUnits": [ "marketing", "Finance" ], "salesRep": "Siddle ", "industry": "it" }, "deleted": false, "creatorId": "123", "creationDate": "2019-06-04" }
        ]} ;

        this.onShowData(data);

    }
    onSearchChangeText(text:string)
    {
    
        this.setState({SearchText: text})
        
    }
    onEdit(Key:string,Value:string)
    {
      var newFilterData = this.state.FilterData;
      if (Key==='Status')
        newFilterData.Status = Value;
      else if (Key==='Source')
        newFilterData.Source = Value;
      else if (Key==='Tenure')
        newFilterData.Tenure = Value;
      else if (Key==='State')
      newFilterData.State = Value;
      else if (Key==='Country')
      newFilterData.Country = Value;
      else if (Key==='BusinessUnit')
      newFilterData.BusinessUnit = Value;
      else if (Key==='Industry')
      newFilterData.Industry = Value;
      else if (Key==='SalesRep')
      newFilterData.SalesRep = Value;

        this.setState({ FilterData:   newFilterData })
    }

    onShowData(data:any)  
    {
      var lead:any =[];
      data.list.map((value:any)=>{
        lead.push({id: value.id+'' ,Company:value.custName,Description:value.description,Contact:value.leadContact.name,
          Status:'NA',SalesRep:value.leadsSummaryRes.salesRep,
          BusinessUnit:value.leadsSummaryRes.businessUnits.join(','),UpdatedOn:'NA',Days:'NA'})
      })

      this.setState({LeadData:lead});
    }
    onShowDetail(ID:string)
    {
      this.props.navigation.navigate('LeadDetail');
    }
    renderSwipeCard(item:Leads)
    {
      return (

            <CardItem style={{marginBottom:6}} button onPress={() => this.onShowDetail(item.id)}>
              <Grid >
                <Row >
                  <Col><Text style={{fontSize: 16,fontWeight:'bold'}}>{item.Company}</Text></Col>
                </Row>
                <Row>
                  <Col><Text note>{item.Description}</Text></Col>
                </Row>
                <Row><Col style={{width:60}}><Text note>Contact</Text></Col><Col><Text>{item.Contact}</Text></Col></Row>
                <Row><Col style={{width:60}}><Text note>Status</Text></Col><Col><Text>{item.Status}</Text></Col></Row>
                <Row><Col style={{width:90}}><Text note>Sales Rep</Text></Col><Col><Text>{item.SalesRep}</Text></Col></Row>
                <Row><Col style={{width:120}}><Text note>Business Unit</Text></Col><Col><Text>{item.BusinessUnit}</Text></Col></Row>
                <Row><Col style={{width:180}}><Text note>Last Status Updated on </Text></Col><Col><Text>{item.UpdatedOn}</Text></Col></Row>
                <Row><Col style={{width:100}}><Text note>Inactive Day</Text></Col><Col><Text>{item.Days}</Text></Col></Row>
              </Grid>
            </CardItem>
      );
    }
    render() {
        return (
            <Container style={Styles.homeContainer}>
              <StatusBar />
              <Header>
                <Left/>
                <Body>
                  <Title style={{alignSelf:'center'}}>View Leads</Title>
                </Body>
                <Right />
              </Header>
              <Content>
                <View style={LocalStyles.searchbox}>
                  <Item rounded style={{width:'85%'}} >
                      <Input clearButtonMode="always"
                          placeholder='Search Leads'
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={this.state.SearchText} 
                          onChangeText={(text) => this.onSearchChangeText(text)}/>
                          <Icon  name='magnify' />
                  </Item>
                  <Button transparent onPress={()=>{this.setState({ isFilterVisible: !this.state.isFilterVisible })}}><Icon style={{color:'red'}}  name='tune-vertical' /></Button>
                </View>  
                
                <FlatList<Leads>
                data={this.state.LeadData}
                style ={{width:'96%',alignSelf:'center'}}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => this.renderSwipeCard(item)}
                keyExtractor={(item, index) => item.id}
                
              />

              </Content>  
              <FooterControl ActiveTab='ViewLeads' navigation={this.props.navigation} />  

              <Modal isVisible={this.state.isFilterVisible}>
                <Content style={{width:'100%',marginTop:80}}>
                  <Grid style={{width:'96%',backgroundColor:'white',marginTop:10,padding:10}}>
                    <Row><Col><Text note>Status</Text></Col><Col><Text note>Tenure</Text></Col></Row>
                    <Row>
                      <Col><StatusControl PickedValue={this.state.FilterData.Status} onPicked={(value:string)=> this.onEdit('Status',value)} /></Col>
                      <Col><TenureControl PickedValue={this.state.FilterData.Tenure} onPicked={(value:string)=> this.onEdit('Tenure',value)} /></Col>
                    </Row>

                    <Row><Col><Text note>Country</Text></Col><Col><Text note>State</Text></Col></Row>
                    <Row>
                      <Col><CountryControl PickedValue={this.state.FilterData.Country} onPicked={(value:string)=> this.onEdit('Country',value)} /></Col>
                      <Col><StatusControl PickedValue={this.state.FilterData.State} onPicked={(value:string)=> this.onEdit('State',value)} /></Col>
                    </Row>

                    <Row><Col><Text note>Business Unit</Text></Col><Col><Text note>Sales Rep</Text></Col></Row>
                    <Row>
                      <Col><BusinessUnitControl PickerType='Single' PickedValue={this.state.FilterData.BusinessUnit} onPicked={(value:string)=> this.onEdit('BusinessUnit',value)} /></Col>
                      <Col><SalesRepControl PickedValue={this.state.FilterData.SalesRep} onPicked={(value:string)=> this.onEdit('SalesRep',value)} /></Col>
                    </Row>

                    <Row><Col><Text note>Industry</Text></Col><Col><Text note>Source</Text></Col></Row>
                    <Row>
                      <Col><IndustryControl PickedValue={this.state.FilterData.Industry} onPicked={(value:string)=> this.onEdit('Industry',value)} /></Col>
                      <Col><LeadSourceControl PickedValue={this.state.FilterData.Source} onPicked={(value:string)=> this.onEdit('Source',value)} /></Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button style={{backgroundColor:'red',alignSelf:'flex-end',marginRight:10}} onPress={()=>{this.setState({ isFilterVisible: !this.state.isFilterVisible })}} ><Text>Reset</Text></Button>
                      </Col>
                      <Col>
                        <Button style={{backgroundColor:'red',marginLeft:10}} onPress={()=>{this.setState({ isFilterVisible: !this.state.isFilterVisible })}} ><Text>Apply</Text></Button>
                      </Col>
                    </Row>

                  </Grid>
                </Content>
              </Modal>
              
            </Container>

        );
    }
}


const LocalStyles: any = StyleSheet.create({
  
  searchbox: {
    flex:1,
    flexDirection:'row',
    marginTop:10
  }
}
);

export default ViewLeadsScreen;