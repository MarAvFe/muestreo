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

export class SelectTrailScreen extends Component {
  static navigationOptions = {
    title: 'Seleccionar Recorrido'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      idUser: this.props.navigation.state.params.idUser || -1,
      idSampling: this.props.navigation.state.params.idSampling || -1,
      trail: 0,
      trails: [{
          idTrail: -1,
          hour: "Cargando...",
      }],
    }
    this.getMyTrails();
  }

  getMyTrails(){
      const str = [];
      let parameters = {
          pIdUser: this.state.idUser,
          pIdSampling: this.state.idSampling,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
      return fetch(`http://${Network.wsIp}:${Network.wsPort}/getPendingTrails`, {
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
              trai = budd.data[0];
              if(budd.error = 'none'){
                  this.setState({ trails: trai });
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
      for (var i = 0; i < this.state.trails.length; i++) {
          s = this.state.trails[i].idTrail;
          n = this.state.trails[i].hour;
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
            <RkText rkType='header'>Seleccionar recorrido</RkText>
            <Picker
            selectedValue={this.state.trail}
            onValueChange={ (trails) => ( this.setState({trail:trails}) ) } >
            {srvItems}
            </Picker>

            <RkButton
            style={UtilStyles.spaceVertical}
            rkType='stretch success'
            onPress={() => navigate('AddObservation', {
                idTrail: this.state.trail,
                idUser: this.state.sampidUser,
            })}>
            Agregar observación
            </RkButton>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
