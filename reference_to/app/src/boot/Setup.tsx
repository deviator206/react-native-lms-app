import React, { Component } from "react";
import { StyleProvider } from "native-base";

import App from '../AppScreens'
import getTheme from "../theme/components";
import variables from "../theme/lms/platform";

export default class Setup extends Component {
  render() {
    return (
      
        <StyleProvider style={getTheme(variables)}>
          <App />
        </StyleProvider>
      );
  }
}
