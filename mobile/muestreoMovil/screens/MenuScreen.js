import React, {Component} from 'react';

import {
  Linking,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker
} from 'react-native';

import {RkButton, RkText} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class MenuScreen extends Component {
  static navigationOptions = {
    title: 'Menu'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
    manUsuario = 'http://www.duckduckgo.com';
  }

  render() {
      const { navigate } = this.props.navigation;
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <RkText rkType='header'>Seleccionar acción</RkText>
          <View style={UtilStyles.columnContainer}>
              <RkButton style={UtilStyles.spaceTop} rkType='success stretch' onPress={() => navigate('SelectSampling', { name: 'Hackerman' })}>Muestrear</RkButton>
              <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('Report', { name: 'Hackerman' })}>Reportar</RkButton>
              <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('Comment', { name: 'Hackerman' })}>Comentario</RkButton>
              <RkButton style={UtilStyles.spaceTop} rkType='warning stretch'
                onPress={() =>
                    Linking.openURL(manUsuario)
                    .catch(err => console.error('An error occurred', err))}>
                    Manual de Usuario</RkButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  inputIcon: {
    fontSize: 15,
    color: '#0000003a',
    marginLeft: 4,
  },
  searchIcon: {
    marginLeft: 16,
  }
});
