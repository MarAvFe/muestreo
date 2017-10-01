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

export class ReportScreen extends Component {
  static navigationOptions = {
    title: 'Reporte'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      pCedula: '',
      error: '',
      pComment: '',
      pIdUser: 0,
    };
  }

  getUserId(){
      const str = [];
      let parameters = {
          pCedula: this.props.navigation.state.params.cedula,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
      console.log("Bodddyyyyyyyyy"+ JSON.stringify(body));
      console.log('access: ' + JSON.stringify(parameters));
      return fetch(`http://${Network.wsIp}:${Network.wsPort}/pGet_UserId`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          body: body,
      })
      .then((response) => {
          const resp = response;
          console.log("entroooooooo");
          status = resp.status;
          if (status < 400) {
              let budd = JSON.parse(resp._bodyInit).data[0];
              console.log('status: ' + JSON.stringify(status));
              pIdUser = budd.idUser;
              this.setState({pIdUser});
              console.log('gotId: ' + pIdUser);
              return true;
          }
          console.log("Can't get UserId.");
          return false;
      })
      .catch(err => {
          console.log('Error happened: '+ err);
          return false;
      });
  }



InsertReport(){
//  getUserId();
  const str = [];
  let parameters = {
    pIdUser: this.state.pIdUser,
    pComment: this.state.pComment,

  }

  for(let p in parameters){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
  }
  const body = str.join("&");
  console.log(JSON.stringify(body));
  console.log('access: ' + JSON.stringify(parameters));
  return fetch(`http://${Network.wsIp}:${Network.wsPort}/pInsert_Report`, {
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
          error = budd.error;
          this.setState({Error});
          console.log('Error: ' + error);
          return true;
      }
      console.log("Failed adding report.");
      return false;
  })
  .catch(err => {
      console.log('Error happened: '+ err);
      return false;
  });

}


  render() {
      const { navigate } = this.props.navigation;
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <RkText rkType='header'>Reportar</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
            <RkText rkType="large">Mensaje:</RkText>
             <RkTextInput
                          onChangeText={(pComment) => this.setState({pComment})}
                          autoCorrect={true} multiline={true} numberOfLines={5}
                          autoCapitalize={'none'} placeholder='mensaje...' clearButtonMode='always'/>
            <RkButton rkType='stretch success' onPress={() =>this.getUserId().then((accepted) =>
            accepted
            ? navigate('Menu', { error: this.state.error })
            : Alert.alert('Obtener cedula ha fallado','Los datos ingresados no son válidos.'))}>Continuar</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
