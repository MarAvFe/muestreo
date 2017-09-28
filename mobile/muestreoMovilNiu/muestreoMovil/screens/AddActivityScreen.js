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

export class AddActivityScreen extends Component {
  static navigationOptions = {
    title: 'Actividad'
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
            <RkText rkType='header'>Agregar actividad</RkText>
            <View style={UtilStyles.rowContainer}>
              <View style={{flex: 1}}>
              <RkText rkType="large">Nombre:</RkText>
              <RkTextInput autoCorrect={true}
                           autoCapitalize={'none'} placeholder='' clearButtonMode='always'/>
                           <RkText rkType="large">Descripcion:</RkText>
              <RkTextInput autoCorrect={true}
                    autoCapitalize={'none'} placeholder='descripcion...' clearButtonMode='always'/>

                    <RkText rkType="large">Tipo de actividad:</RkText>
                    <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Productiva" value="1" />
                    <Picker.Item label="Improductiva" value="2" />
                    <Picker.Item label="Colaborativa" value="3" />
                    </Picker>

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
                <RkButton rkType='stretch success' onPress={() => navigate('Report', { name: 'Hackerman' })}>Continuar</RkButton>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
