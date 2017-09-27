import React from 'react';
import * as Screens from './screens';
import {StackNavigator} from 'react-navigation';
import {bootstrap} from './style/themeBootstrapper'

bootstrap();

const ExplorerApp = StackNavigator({
  Home: {screen: Screens.LoginScreen},
  Input: {screen: Screens.InputScreen},
  Menu: {screen: Screens.MenuScreen},
  SelectSampling: {screen: Screens.SelectSamplingScreen},
  AddObservation: {screen: Screens.AddObservationScreen},
  Report: {screen: Screens.ReportScreen},
  Comment: {screen: Screens.CommentScreen},
  Button: {screen: Screens.ButtonScreen},
  Card: {screen: Screens.CardScreen},
  Choice: {screen: Screens.ChoiceScreen},
  Image: {screen: Screens.ImageScreen},
  Settings: {screen: Screens.SettingsScreen},
  Tab: {screen: Screens.TabScreen}
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#007777'
    }
  }
});

export default () => <ExplorerApp />;
