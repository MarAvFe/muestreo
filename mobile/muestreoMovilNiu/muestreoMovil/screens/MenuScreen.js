import React, {Component} from 'react';

import {
    Alert,
    Linking,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Picker
} from 'react-native';

import { RkButton, RkText } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import Network from '../constants/Network';

export class MenuScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Menu',
      });

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            name: '',
            idUser: -1,
        };
        manUsuario = 'https://github.com/MarAvFe/muestreo/tree/master/documentos/usuario/readme.md';

        this.greetUser();
    }


    greetUser(){
        const str = [];
        let parameters = {
            cedula: this.props.navigation.state.params.cedula,
        }
        for (let p in parameters) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
        }
        const body = str.join("&");
        console.log('access: ' + JSON.stringify(parameters));
        return fetch(`http://${Network.wsIp}:${Network.wsPort}/User/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            body: body,
        })
        .then((response) => {
            const resp = response;
            status = resp.status;
            if (status < 400) {
                let budd = JSON.parse(resp._bodyInit).data[0];
                console.log('status: ' + JSON.stringify(status));
                name = budd.name;
                idUser = budd.idUser;
                this.setState({name});
                this.setState({idUser});
                console.log('gotName: ' + name);
                console.log('gotId: ' + this.state.idUser);
                return true;
            }
            console.log("Login unauthenticated.");
            return false;
        })
        .catch(err => {
            console.log('Error happened: '+ err);
            return false;
        });
    }


    logout(){
        return fetch(`http://${Network.wsIp}:${Network.wsPort}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        })
        .then((response) => {
            const resp = response;
            status = resp.status;
            if (status < 400) {
                let budd = JSON.parse(resp._bodyInit);
                console.log('status: ' + JSON.stringify(status));
                ans = budd.data;
                console.log('Logout status: ' + ans);
                return true;
            }
            console.log("Logout failed.");
            return false;
        })
        .catch(err => {
            console.log('Error happened: '+ err);
            return false;
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("cedGot: " + this.props.navigation.state.params.cedula);
        return (
            <ScrollView
            ref={'scrollView'}
            automaticallyAdjustContentInsets={true}
            style={UtilStyles.container}>


            <View style={UtilStyles.section}>
            <RkText rkType='xxlarge'>Buenas tardes, {this.state.name}</RkText>
            <RkText rkType='header'>Seleccionar acción</RkText>
            <View style={UtilStyles.columnContainer}>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('SelectSampling', { name: 'Hackerman' })}>Muestrear</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('Report', { name: 'Hackerman' })}>Reportar</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('Comment', { name: 'Hackerman' })}>Comentario</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('Activity', { name: 'Hackerman' })}>Agregar actividad</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Agregar observacion</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch' onPress={() => navigate('ScheduleRange', { idUser: this.state.idUser })}>Rango de trabajo</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='warning stretch'
            onPress={() =>
                Linking.openURL(manUsuario)
                .catch(err => console.error('An error occurred', err))}>
                Manual de Usuario</RkButton>
            <RkButton style={UtilStyles.spaceTop} rkType='stretch danger' onPress={() =>
                this.logout().then((accepted) =>
                accepted
                ? navigate('Home')
                : Alert.alert('Final de sesión','Ha habido un error en el cierre de sesión.')
            )}>Cerrar sesión</RkButton>
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
