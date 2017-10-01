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
import Network from '../constants/Network';

export class AddObservationScreen extends Component {
  static navigationOptions = {
    title: 'Observaciones'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      sampledProfileName: 'Aula',
      activity: 0,
      activities: [{
          idActivity: -1,
          name: "Cargando...",
      }],
    }
    this.getActivities();
  }

  getActivities(){
      const str = [];
      let parameters = {
          pIdUser: this.state.idUser,
          pIdSampling: this.state.idSampling,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
      return fetch(`http://${Network.wsIp}:${Network.wsPort}/getActivities`, {
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
              act = budd.data[0];
              if(budd.error = 'none'){
                  this.setState({ activities: act });
                  return true;
              }else{
                  console.log(`Error getting activities ${budd.error}.`);
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
      for (var i = 0; i < this.state.activities.length; i++) {
          s = this.state.activities[i].idActivity;
          n = this.state.activities[i].name;
          srvItems.push(<Picker.Item key={i} value={s} label={n} />);
      }
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Agregar observación</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>

            <RkText rkType="large">Muestreando: {this.state.sampledProfileName}</RkText>

            <RkText rkType="large">Actividad:</RkText>
            <Picker
            selectedValue={this.state.activity}
            onValueChange={ (activities) => ( this.setState({activity:activities}) ) } >
            {srvItems}
            </Picker>
            <RkButton style={UtilStyles.spaceVertical} rkType='stretch warning small' onPress={() => navigate('Activity', { name: 'Hackerman' })}>+</RkButton>

            <RkButton style={UtilStyles.spaceVertical} rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Crear observación</RkButton>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
