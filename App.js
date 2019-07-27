/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AppBootstrap from './pages/bootstrap/AppBootstrap';
import LoginPage from './pages/login/loginPage';
console.disableYellowBox = true;
//  <AppBootstrap />
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
  }
}, {
  initialRouteName: "login",
  mode: 'modal',
  headerMode: 'none',
  initialRouteParams : { someParam: 'Bonjour' }
});
const AppContainer  = createAppContainer(AppNavigator);


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


