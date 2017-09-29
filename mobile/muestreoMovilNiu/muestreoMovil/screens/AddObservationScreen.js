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

import {RkButton, RkText, RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class AddObservationScreen extends Component {
  static navigationOptions = {
    title: 'Observaciones'
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
          <RkText rkType='header'>Agregar observación</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>

            <RkText rkType="large">Muestreo relacionado:</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="MT037" value="11" />
            <Picker.Item label="MT038" value="12" />
            <Picker.Item label="CB021" value="13" />
            <Picker.Item label="FM032" value="14" />
            <Picker.Item label="MT039" value="15" />
            <Picker.Item label="MT037" value="11" />
            <Picker.Item label="MT038" value="12" />
            <Picker.Item label="CB021" value="13" />
            <Picker.Item label="FM032" value="14" />
            <Picker.Item label="MT039" value="15" />
            <Picker.Item label="MT037" value="11" />
            <Picker.Item label="MT038" value="12" />
            <Picker.Item label="CB021" value="13" />
            <Picker.Item label="FM032" value="14" />
            <Picker.Item label="MT039" value="15" />
            </Picker>

            <RkText rkType="large">Muestreando:</RkText>
            <RkText rkType="large">Peon</RkText>

            <RkText rkType="large">Hora del recorrido:</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="08:43" value="11" />
            <Picker.Item label="09:51" value="12" />
            <Picker.Item label="11:02" value="13" />
            </Picker>

            <RkText rkType="large">Actividad:</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Comiendo" value="1" />
            <Picker.Item label="Jeteando" value="2" />
            <Picker.Item label="Esperando" value="3" />
            <Picker.Item label="Trabajando" value="4" />
            </Picker>
            <RkButton rkType='stretch success' onPress={() => navigate('Activity', { name: 'Hackerman' })}>Agregar nueva actividad</RkButton>


            <RkButton rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
