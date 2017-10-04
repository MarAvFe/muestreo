import React, {Component} from 'react';

import {
    Alert,
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
import Network from '../constants/Network';

export class AddActivityScreen extends Component {
  static navigationOptions = {
    title: 'Actividad'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      name: '',
      error: '',
      description: '',
      type: 0,
    };
  }

  createActivity(){
    const str = [];
    let parameters = {
      name: this.state.name,
      description: this.state.description,
      type:  this.state.type,
    }

    for(let p in parameters){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
    }

    const body = str.join("&");
    console.log(JSON.stringify(body));
    console.log('access: ' + JSON.stringify(parameters));
    return fetch(`http://${Network.wsIp}:${Network.wsPort}/Activity/add`, {
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
       if(status < 400 ){
         let budd = JSON.parse(resp._bodyInit);
         console.log('status: ' + JSON.stringify(status));
         error = budd.error;
         this.setState({error});
         console.log('Error:' + error);
         return true;
       }
       console.log("Failed adding activity.");
       return false;
    })
    .catch(err => {
      console.log('Error happened: '+ err);
      return false;
    });
  }


    render(){
        const { goBack, navigate } = this.props.navigation;
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
              <RkTextInput
                    rkType='rounded'
                    autoCorrect={true}
                    onChangeText={(name) => this.setState({name})}
                    autoCapitalize={'none'} placeholder='' clearButtonMode='always'/>
           <RkText rkType="large">Descripcion:</RkText>
              <RkTextInput
                    style={UtilStyles.picker}
                    rkType='rounded'
                    autoCorrect={true} multiline={true} numberOfLines={5}
                    onChangeText={(description) => this.setState({description})}
                    autoCapitalize={'none'} placeholder='descripcion...' clearButtonMode='always'/>

              <RkText rkType="large">Tipo de actividad:</RkText>
                    <View style={UtilStyles.picker}>
                    <Picker
                    selectedValue={this.state.type}
                    onValueChange={(type) => this.setState({type})}>
                    <Picker.Item label="Productiva" value="0" />
                    <Picker.Item label="Improductiva" value="1" />
                    <Picker.Item label="Colaborativa" value="2" />
                    </Picker>
                    </View>

                <RkButton
                style={UtilStyles.spaceTop} rkType='rounded stretch success' onPress={()=>
                    this.createActivity().then((accepted) =>
                    accepted
                    ? (Alert.alert('Éxito','Se ha agregado correctamente la actividad.'), goBack(null))
                    : Alert.alert('Agregar actividad ha fallado','Los datos ingresados no son válidos.'))}>
                    <Icon name="plus" size={20} color="#ffffff" />  Agregar Actividad
                    </RkButton>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
