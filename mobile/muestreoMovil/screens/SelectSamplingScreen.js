import React, {Component} from 'react';
import Network from '../constants/Network';
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
      checked: true,
      idUser: this.props.navigation.state.params.idUser || -1,
      sampling: 'Seleccionar muestreo',
      samplings: [{
          idSampling: -1,
          name: "Cargando...",
      }],
      samp: {
          name: 'MNombre',
          description: 'MDescription',
          type: 'MCrew Balance',
          modality: "MEn vivo",
      }
    }
    this.getMySamplings();
  }

  getMySamplings(){
      const str = [];
      let parameters = {
          pIdUser: this.state.idUser,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
      return fetch(`http://${Network.wsIp}:${Network.wsPort}/getParticipatingSamplings`, {
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
              samps = budd.data[0];
              if(budd.error = 'none'){
                  this.setState({ samplings: samps });
                  return true;
              }else{
                  console.log(`Error getting samplings ${budd.error}.`);
                  return false;
              }
          }
          console.log("Login unauthenticated.");
          return false;
      })
      .catch(err => {
          console.log('Error happened: '+ err);
          return false;
      });
  }

  render() {
      const { navigate } = this.props.navigation;

      const srvItems = [];
      for (var i = 0; i < this.state.samplings.length; i++) {
          s = this.state.samplings[i].idSampling;
          n = this.state.samplings[i].name;
          srvItems.push(<Picker.Item key={i} value={s} label={n} />);
      }

    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
            <RkText rkType='header'>Seleccionar muestreo</RkText>

            <View style={UtilStyles.spaceTop, UtilStyles.picker}>
            <Picker
            selectedValue={this.state.sampling}
            onValueChange={ (samplings) => ( this.setState({sampling:samplings}) ) } >
            {srvItems}
            </Picker>
            </View>

            <View style={UtilStyles.section}>
            <RkText rkType='header'>Nombre: {this.state.samp.name}</RkText>
            <RkText rkType='header'>Descripción: {this.state.samp.description}</RkText>
            <RkText rkType='header'>Tipo: {this.state.samp.type}</RkText>
            <RkText rkType='header'>Modalidad: {this.state.samp.modality}</RkText>
            </View>

            <RkButton
            style={UtilStyles.spaceVertical}
            rkType='stretch info'
            onPress={() => navigate('SelectTrail', {
                idSampling: this.state.sampling,
                idUser: this.state.idUser,
            })}>
            Continuar
            </RkButton>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
