import React, {Component} from 'react';

import {
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

export class SelectSamplingScreen extends Component {
  static navigationOptions = {
    title: 'Seleccionar Muestreo'
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
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
            <RkText rkType='header'>Seleccionar muestreo</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="MT037" value="11" />
            <Picker.Item label="MT038" value="12" />
            <Picker.Item label="CB021" value="13" />
            <Picker.Item label="FM032" value="14" />
            <Picker.Item label="MT039" value="15" />
            </Picker>
            <RkText rkType='header'>Seleccionar grupo</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Cuadrilla 1" value="11" />
            <Picker.Item label="Cuadrilla 2" value="12" />
            <Picker.Item label="Aulas 3" value="12" />
            </Picker>
            <RkText rkType='header'>Seleccionar recorrido</RkText>
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="8:00" value="11" />
            <Picker.Item label="10:23" value="12" />
            <Picker.Item label="12:03" value="13" />
            <Picker.Item label="16:09" value="14" />
            <Picker.Item label="17:30" value="15" />
            </Picker>
            <RkText rkType="large">Cantidad de trabajadores</RkText>
            <RkText rkType="medium">40</RkText>

            <RkText rkType="large">Tipo:</RkText>
            <RkText rkType="medium">Crew Balance</RkText>

            <RkText rkType="large">Observaciones estimadas:</RkText>
            <RkText rkType="medium">30</RkText>

            <RkText rkType="large">Descripción:</RkText>
            <RkText rkType="medium">Establecido para la construcción del segundo piso del edificio financiero, sector eléctrico.</RkText>

            <RkText rkType="large">Precisión absoluta:</RkText>
            <RkText rkType="medium">0.3</RkText>

            <RkText rkType="large">Precisión relativa:</RkText>
            <RkText rkType="medium">0.3</RkText>
            <RkButton rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
