import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker,
  Switch,
  TouchableOpacity
} from 'react-native';

import {RkButton, RkText, RkTextInput, RkChoiceGroup} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class ReportScreen extends Component {
  static navigationOptions = {
    title: 'Reporte'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
      const { navigate } = this.props.navigation;
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <RkText rkType='header'>Reportar</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
            <RkText rkType="large">Destinatario:</RkText>
            <RkTextInput
                         autoCapitalize={'none'} placeholder='alguien@correo.com' clearButtonMode='always'/>
             <RkTextInput autoCorrect={true} multiline={true} numberOfLines={5}
                          autoCapitalize={'none'} placeholder='mensaje...' clearButtonMode='always'/>
            <RkButton rkType='stretch success' onPress={() => navigate('Report', { name: 'Hackerman' })}>Continuar</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
