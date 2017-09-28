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

export class ScheduleRange extends Component {
  static navigationOptions = {
    title: 'Rango de Horario y tiempo estimado'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }
    render(){
        const { navigate } = this.props.navigation;
      return (
        <ScrollView
          ref={'scrollView'}
          automaticallyAdjustContentInsets={true}
          style={UtilStyles.container}>

          <View style={UtilStyles.section}>
            <View style={UtilStyles.rowContainer}>
              <View style={{flex: 1}}>

                    <RkText rkType="large">Rango de Horario:</RkText>
                    <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="7:30 - 9:10" value="1" />
                    <Picker.Item label="9:20 - 11:00" value="2" />
                    <Picker.Item label="13:00 - 14:15" value="3" />
                    <Picker.Item label="14:30 - 17:00" value="3" />
                    </Picker>

               <RkText rkType="large">Tiempo estimado en minutos:</RkText>
               <RkTextInput autoCorrect={true} keyboardType='numeric' autoCapitalize={'none'} placeholder='' clearButtonMode='always'/>
                <RkButton rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
