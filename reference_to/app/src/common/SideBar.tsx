import * as React from "react";
import { Text, Container, List, ListItem, Content, Icon } from "native-base";
import { FlatList } from "react-native";

const routes = [
  {
    key: "Notification",
    caption: "Notification",
    icon: 'bell'
  },
  {
    key: "Profile",
    caption: "Profile",
    icon: 'account'
  },
  {
    key: "Login",
    caption: "Logout",
    icon: 'logout'
  }
];

export interface Props {
  navigation: any;
}
export interface State {}

export default class Sidebar extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Content>
          <FlatList 
            style={{ marginTop: 40 }}
            data={routes}
            renderItem={({ item })  => {
              return (
                <ListItem
                  button
                  onPress={() => {this.props.navigation.navigate(item.key);}}
                >
                  <Icon name={item.icon} />
                  <Text>{item.caption}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}