import { Body, Button, List, ListItem, Right, Text } from 'native-base';
import React from 'react';


export default class BUListComponent extends React.Component {
    constructor(props){
        super(props);
        this.getListItemsView = this.getListItemsView.bind(this);
    }

    getListItemsView() {
        const{ onBuRemoval}  = this.props;
        const businessUnitList = ["Atlas","Spectro","KTem","LmQT"];
        const listViews =[];
        businessUnitList.forEach(element => {
            listViews.push(
                <ListItem thumbnail >
                        <Body>
                            <Text>{element}</Text>
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