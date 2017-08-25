import React from 'react';

import {Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'LOGIN'
  };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={UtilStyles.container}>
            <View style={{flex:1.5, backgroundColor:'red'}}>
                </View>
                <View style={UtilStyles.section}>
                    <RkText rkType='xxlarge'>Iniciar Sesión</RkText>
                  <View style={[UtilStyles.rowContainer]}>
                    <View style={{flex: 1}}>
                      <RkTextInput rkType='rounded' label={<Icon style={UtilStyles.inputIcon} name='user'/>} placeholder='Usuario'/>
                      <RkTextInput rkType='rounded' secureTextEntry={true} label={<Icon style={UtilStyles.inputIcon} name='lock'/>}
                                   placeholder='Contraseña'/>
                    </View>
                  </View>
                  <RkButton style={UtilStyles.spaceFromForm} rkType='stretch circle' onPress={() => navigate('Menu', { name: 'Hackerman' })}>Ingresar</RkButton>

                  <RkButton style={UtilStyles.spaceTop} onPress={() => navigate('Input', { name: 'Hackerman' })} rkType='clear'>
                    <RkText rkType='warning'>Olvidé mi contraseña</RkText>
                  </RkButton>
                </View>

            </View>
        );
    }
}
