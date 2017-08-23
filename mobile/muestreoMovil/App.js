import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from './style/styles';

export default class App extends React.Component {
    render() {
        return (
            <View style={UtilStyles.container}>
                <View style={UtilStyles.section}>
                    <RkText rkType='xxlarge'>Iniciar Sesión</RkText>
                  <View style={[UtilStyles.rowContainer]}>
                    <View style={{flex: 1}}>
                      <RkTextInput rkType='rounded' label={<Icon style={UtilStyles.inputIcon} name='user'/>} placeholder='Usuario'/>
                      <RkTextInput rkType='rounded' secureTextEntry={true} label={<Icon style={UtilStyles.inputIcon} name='lock'/>}
                                   placeholder='Contraseña'/>
                    </View>
                  </View>
                  <RkButton style={UtilStyles.spaceAround} rkType='stretch circle' onPress={() => { Alert.alert('You tapped the button!')}}>
                  Ingresar</RkButton>

                  <RkText></RkText>
                  <RkButton rkType='clear'>
                    <RkText rkType='warning'>Olvidé mi contraseña</RkText>
                  </RkButton>
                </View>

            </View>
        );
    }
}
