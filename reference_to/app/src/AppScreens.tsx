import React, {Component} from "react";
import { Root} from "native-base";

import { createStackNavigator, createSwitchNavigator,  createDrawerNavigator,createAppContainer } from 'react-navigation';

import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import SideBar from './common/SideBar';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ViewLeadsScreen from './screens/ViewLeadsScreen';
import LeadDetailScreen from './screens/LeadDetailScreen';

import AddLeadScreen from './screens/AddLeadScreen';

import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen'

const Drawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Notification: NotificationScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Profile",
    drawerWidth: deviceWidth - 50,
    drawerPosition: "right",
    contentComponent: props => <SideBar {...props} />
  }
);

const HomeStack = createStackNavigator(
  {
    
    ViewLeads: ViewLeadsScreen,    
    LeadDetail:LeadDetailScreen,
    AddLead: AddLeadScreen,
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


const AppNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Welcome: HomeStack,
  }
  ,
  {
    initialRouteName: 'Welcome',
  });


const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;

