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

export class CommentScreen extends Component {
  static navigationOptions = {
    title: 'Comentario'
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
          <RkText rkType='header'>Agregar comentario</RkText>
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
              <RkText rkType="large">Mensaje:</RkText>
             <RkTextInput autoCorrect={true}
                          autoCapitalize={'none'} placeholder='mensaje...' clearButtonMode='always'/>
            <RkButton rkType='stretch success' onPress={() => navigate('Report', { name: 'Hackerman' })}>Continuar</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
