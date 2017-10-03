import React from 'react';

import {Alert, Image, Keyboard, ScrollView, StyleSheet, ListView, Text, View } from 'react-native';
import {RkAvoidKeyboard, RkButton, RkText, RkTextInput, RkCard} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import Network from '../constants/Network';
import MyAvoidKeyboard from '../components/myAvoidKeyboard/myAvoidKeyboard';

export class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'LOGIN',
    };

    constructor(props) {
        super(props);
        this.state = {
            cedula: '100320253',
            status: '',
            pUser: 'mirba@gmail.com',
            pPwd: 'qwe123',
            chosenImg: this.randInt(0,3),
        };
    }


    authUser(){
        const str = [];
        let parameters = {
            pUser: this.state.pUser,
            pPwd: this.state.pPwd,
        }
        for (let p in parameters) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
        }
        const body = str.join("&");
        console.log('access: ' + JSON.stringify(parameters));
              console.log(JSON.stringify(body));
        return fetch(`http://${Network.wsIp}:${Network.wsPort}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            body: body,
        })
        .then((response) => {
            const resp = response;
            console.log('Fetched: '+ JSON.stringify(resp._bodyInit));
            console.log('FetchedJSON: '+ JSON.stringify(resp));
            status = resp.status;
            if (status < 400) {
                let budd = JSON.parse(resp._bodyInit);
                console.log('status: ' + JSON.stringify(status));
                cedula = budd.data;
                this.setState({cedula});
                console.log('gotCedula: ' + cedula);
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

    randInt(lo,hi){
    	 return Math.floor((Math.random() * hi) + lo);
    }

    render() {
        const { navigate } = this.props.navigation;

        const validImgs = [
            require('../img/stock/gears.jpg'),
            require('../img/stock/buildpit.jpg'),
            require('../img/stock/metro.jpg')
        ]
        const randImg = validImgs[this.state.chosenImg];

        return (
            <View style={UtilStyles.container}>
            <RkCard style={{flex:1.5}} rkType='backImg'>
            <Image rkCardImg source={randImg}/>
            </RkCard>
            <MyAvoidKeyboard>
            <View style={UtilStyles.section}>
            <RkText rkType='xxlarge'>Iniciar Sesión</RkText>
            <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
            <RkTextInput
                rkType='rounded'
                onChangeText={(pUser) => this.setState({pUser})}
                onSubmitEditing={Keyboard.dismiss}
                label={<Icon style={UtilStyles.inputIcon} name='user'/>}
                placeholder='Usuario'
            />
            <RkTextInput
                rkType='rounded'
                onChangeText={(pPwd) => this.setState({pPwd})}
                secureTextEntry={true}
                label={<Icon style={UtilStyles.inputIcon} name='lock' />}
                placeholder='Contraseña'
            />
            </View>
            </View>
            <RkButton style={UtilStyles.spaceFromForm} rkType='stretch circle'
            onPress={() =>
                this.authUser().then((accepted) =>
                accepted
                ? navigate('Menu', { cedula: this.state.cedula })
                : Alert.alert('Inicio de sesión','Los credenciales ingresados no son válidos.')
            )}>Ingresar</RkButton>

            <RkButton style={UtilStyles.spaceTop} onPress={() => navigate('Input', { name: 'Hackerman' })} rkType='clear'>
            <RkText rkType='warning'>Olvidé mi contraseña</RkText>
            </RkButton>
            </View>
            </MyAvoidKeyboard>
            </View>
        );
    }
}
