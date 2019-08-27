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
import CreateUserPage from './pages/createuser/createUserPage';
import DashboardPage from './pages/dashboard/dashboard';
import LeadDetailsPage from './pages/leaddetails/leadDetailsPage';
import LoginPage from './pages/login/loginPage';
import MiAddPage from './pages/marketadd/miAddPage';
import MiDetailsPage from './pages/marketdetails/miDetailsPage';
import MiListPage from './pages/marketlist/miListPage';
import NotificationListPage from './pages/notifications/notificationListPage';
import SideMenuBar from './pages/sidemenu/sideMenu';
import UserListPage from './pages/users/userListPage';
import ViewLeadPage from './pages/viewlead/viewLeadPage';
import { default as configureStore } from './storage/store/createAppStore';


console.disableYellowBox = true;
const SideDrawerNavigator = createDrawerNavigator(
  {

    dashboard: {
      screen: DashboardPage,
      drawerLabel: "Demo Screen 3"
    },
    drawer: {
      screen: SideMenuBar
    }
  },
  {
    drawerPosition: "left",
    contentComponent: props => <SideMenuBar {...props} />,
    initialRouteName: "dashboard",
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
    key: 'login',
    navigationOptions: () => ({
      header: null
    })
  },
  milist: {
    screen: MiListPage
  },
  notificationlist: {
    screen: NotificationListPage
  },
 
  userlist:{
    screen: UserListPage
  },
  midetails: {
    screen: MiDetailsPage
  },
  miadd: {
    screen: MiAddPage
  },
  createuser:{
    screen: CreateUserPage
  },
  dashboard: {
    screen: SideDrawerNavigator
  },
  viewlead: {
    screen: ViewLeadPage,
    key: 'view_lead',
  },
  leaddetails: {
    screen: LeadDetailsPage,
    key: 'lead_details',
  },
  addlead: {
    screen: AddLeadPage
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


const newStore = configureStore({});
window.storeInstance = newStore;
class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
  }

  handleNavigationChange(prevState, newState, action) {
    console.log(prevState, newState, action);
  }
  componentDidMount() {
    //  SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={newStore}>
        <AppContainer

        />
      </Provider>
    );
  }
}
export default App;


