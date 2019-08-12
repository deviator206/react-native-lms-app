/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import AddLeadPage from './pages/addlead/addLeadPage';
import AppBootstrap from './pages/bootstrap/AppBootstrap';
import DashboardPage from './pages/dashboard/dashboard';
import LeadDetailsPage from './pages/leaddetails/leadDetailsPage';
import LoginPage from './pages/login/loginPage';
import MiAddPage from './pages/marketadd/miAddPage';
import MiListPage from './pages/marketlist/miListPage';
import NotificationListPage from './pages/notifications/notificationListPage';
import SideMenuBar from './pages/sidemenu/sideMenu';
import ViewLeadPage from './pages/viewlead/viewLeadPage';
import { default as configureStore } from './storage/store/createAppStore';

console.disableYellowBox = true;
const SideDrawerNavigator = createDrawerNavigator(
  {
    bootstap: {
      screen: AppBootstrap,
      navigationOptions: () => ({
        header: null,
        drawerLabel: "Demo Screen 1"
      })
    },
    login: {
      screen: LoginPage,
      navigationOptions: () => ({
        header: null,
        drawerLabel: "Demo Screen 2"
      })
    },
    dashboard: {
      screen: DashboardPage,
      drawerLabel: "Demo Screen 3"
    },

    viewlead: {
      screen: ViewLeadPage
    },
    addlead: {
      screen: AddLeadPage
    },
    milist: {
      screen: MiListPage
    },
    notificationlist: {
      screen: NotificationListPage
    },
    miadd: {
      screen: MiAddPage
    },
    leaddetails: {
      screen: LeadDetailsPage
    },

    drawer: {
      screen: SideMenuBar
    }
  },
  {
    drawerPosition: "left",
    contentComponent: props => <SideMenuBar {...props} />,
    initialRouteName: "login",
    mode: 'modal',
    headerMode: 'none',
    initialRouteParams: { someParam: 'Bonjour' }
  }
);

const AppNavigator = createStackNavigator({
  bootstap: {
    screen: AppBootstrap,
    navigationOptions: () => ({
      header: null
    })
  },
  login: {
    screen: LoginPage,
    navigationOptions: () => ({
      header: null
    })
  },
  dashboard: {
    screen: DashboardPage
  },
  viewlead: {
    screen: ViewLeadPage
  },
  miadd: {
    screen: MiAddPage
  },
  leaddetails: {
    screen: LeadDetailsPage
  },
  addlead: {
    screen: AddLeadPage
  },
  notificationlist: {
    screen: NotificationListPage
  },
  milist: {
    screen: MiListPage
  },

  drawer: {
    screen: SideMenuBar
  }
}, {
    initialRouteName: "login",
    mode: 'modal',
    headerMode: 'none',
    initialRouteParams: { someParam: 'Bonjour' }
  });
const AppContainer = createAppContainer(AppNavigator);


class App extends React.Component {
  componentDidMount() {
    //  SplashScreen.hide();
   ;
  }
  render() {
    return (
      <Provider store={ configureStore({}) }>
      <AppContainer />
     </Provider>
    );
  }
}
export default App;


