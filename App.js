/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AppBootstrap from './pages/bootstrap/AppBootstrap';
import LoginPage from './pages/login/loginPage';
/*
const App = () => {
  return (
    <Fragment>
      <StatusBar />
      <Text> 0.0.7</Text>
      <LoginPage />
    </Fragment>
  );
};
*/
//  <AppBootstrap />
const AppNavigator = createStackNavigator({
  bootstap: AppBootstrap,
  login:LoginPage
}, {
  initialRouteName: "bootstap",
  initialRouteParams : { someParam: 'Bonjour' }
});
const App  = createAppContainer(AppNavigator);
export default  App;

