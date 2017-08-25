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
            <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="WRK037" value="11" />
            <Picker.Item label="WRK038" value="12" />
            <Picker.Item label="WRK021" value="13" />
            <Picker.Item label="WRK032" value="14" />
            <Picker.Item label="WRK039" value="15" />
            </Picker>
                <View style={UtilStyles.rowContainer}>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Es productivo?</RkText>
                  <RkChoice/>
                </View>

<RkText rkType="large">Distracción:</RkText>
                <Picker
                style={UtilStyles.form}
                selectedValue={this.state.language}
                onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                <Picker.Item label="Comiendo" value="11" />
                <Picker.Item label="Jeteando" value="12" />
                <Picker.Item label="Esperando" value="13" />
                </Picker>

            <RkButton rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
