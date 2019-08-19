import { Body, Button, List, ListItem, Right, Text } from 'native-base';
import React from 'react';


export default class BUListComponent extends React.Component {
    constructor(props){
        super(props);
        this.getListItemsView = this.getListItemsView.bind(this);
        this.getUnitDisplayName = this.getUnitDisplayName.bind(this);
    }

    getUnitDisplayName(codeName) {
        const{  dataSource = []}  = this.props;
        let displayName = '';
        dataSource.every((singleBU)=>{
            if(codeName === singleBU.code) {
                displayName = singleBU.name;
                return false; 
            }
            return true;
        });

        return displayName;
    }
    getListItemsView() {
        const{ onBuRemoval, businessUnitList = []}  = this.props;
        const listViews =[];
        businessUnitList.forEach((element) => {
            const uniqueKey = 'TEMP_BU_LIST'+element;
            listViews.push(
                <ListItem thumbnail key={uniqueKey} >
                        <Body>
                            <Text>{this.getUnitDisplayName(element)}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={
                                () => {
                                    onBuRemoval(element)
                                }
                            }>
                            <Text>Remove</Text>
                            </Button>
                        </Right>
                    </ListItem>
            );
        });
        return listViews;
    }
    render() {
        return (
            <List> 
                { this.getListItemsView()}
            </List>
        )
    }
}