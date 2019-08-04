/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import AddLeadPage from './pages/addlead/addLeadPage';
import AppBootstrap from './pages/bootstrap/AppBootstrap';
import DashboardPage from './pages/dashboard/dashboard';
import LoginPage from './pages/login/loginPage';
import SideMenuBar from './pages/sidemenu/sideMenu';


console.disableYellowBox = true;
const SideDrawerNavigator = createDrawerNavigator(
  {
    bootstap: {
      screen:AppBootstrap,
      navigationOptions: () => ({
        header: null,
        drawerLabel: "Demo Screen 1"
      })
    },
    login: {
      screen:LoginPage,
      navigationOptions: () => ({
        header: null,
        drawerLabel: "Demo Screen 2"
      })
    },
    dashboard: {
      screen:DashboardPage,
      drawerLabel: "Demo Screen 3"
    },
    addlead: {
      screen: AddLeadPage
    },
    drawer:{
      screen: SideMenuBar 
    }
  },
  {
    drawerPosition: "left",
    contentComponent: props => <SideMenuBar {...props} />,
    initialRouteName: "login",
    mode: 'modal',
    headerMode: 'none',
    initialRouteParams : { someParam: 'Bonjour' }
  }
);

const AppNavigator = createStackNavigator({
  bootstap: {
    screen:AppBootstrap,
    navigationOptions: () => ({
      header: null
    })
  },
  login: {
    screen:LoginPage,
    navigationOptions: () => ({
      header: null
    })
  },
  dashboard: {
    screen:DashboardPage
  },
  addlead: {
    screen: AddLeadPage
  },
  drawer:{
    screen: SideMenuBar 
  }
}, {
  initialRouteName: "login",
  mode: 'modal',
  headerMode: 'none',
  initialRouteParams : { someParam: 'Bonjour' }
});
const AppContainer  = createAppContainer(SideDrawerNavigator);


class App extends React.Component {
  componentDidMount() {
   //  SplashScreen.hide();
   console.log("TEST 3");
  }
  render() {
    return <AppContainer />;
  }
}
export default  App;


