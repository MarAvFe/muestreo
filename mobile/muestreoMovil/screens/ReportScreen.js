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
import Network from '../constants/Network';
import MyAvoidKeyboard from '../components/myAvoidKeyboard/myAvoidKeyboard';


export class ReportScreen extends Component {
  static navigationOptions = {
    title: 'Reporte'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      idUser: this.props.navigation.state.params.idUser || -1,
      error: '',
      pComment: '',
      sampling: 'Seleccionar muestreo',
      samplings: [{
          idSampling: -1,
          name: "Cargando...",
      }],
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
                  this.setState({ sampling: this.state.samplings[0].idSampling });
                  return true;
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

  /*getUserId(){
      const str = [];
      let parameters = {
          pCedula: this.props.navigation.state.params.cedula,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
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
              let budd = JSON.parse(resp._bodyInit);
              console.log("buddddd"+JSON.stringify(budd));
              console.log('status: ' + JSON.stringify(status));
              pIdUser = budd.data[0][0].idUser;
              this.setState({pIdUser});
              console.log('gotId: ' + JSON.stringify(pIdUser));
              return this.InsertReport();
          }
          console.log("Can't get UserId.");
          return false;
      })
      .catch(err => {
          console.log('Error happened: '+ err);
          return false;
      });
  } */



InsertReport(){
  const str = [];
  let parameters = {
    pIdUser: this.state.idUser,
    pComment: this.state.pComment,
    pIdSampling: this.state.sampling,
  }
  for(let p in parameters){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
  }
  const body = str.join("&");
  console.log("JJJJJJJJJJJJJ" + JSON.stringify(body));
  console.log('access: ' + JSON.stringify(parameters));
  console.log();
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
          let budd = JSON.parse(resp._bodyInit);
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
      const { goBack, navigate } = this.props.navigation;
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
        <MyAvoidKeyboard>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Agregar Reporte</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
            <RkText rkType="large">Muestreo relacionado:</RkText>
            <View style={UtilStyles.picker}>
            <Picker
            selectedValue={this.state.sampling}
            onValueChange={ (samplings) => ( this.setState({sampling:samplings}) ) } >
            {srvItems}
            </Picker>
            </View>
            <RkText rkType="large">Mensaje:</RkText>
             <RkTextInput
                        style={UtilStyles.picker}
                          onChangeText={(pComment) => this.setState({pComment})}
                          autoCorrect={true} multiline={true} numberOfLines={5}
                          autoCapitalize={'none'} placeholder='mensaje...' clearButtonMode='always'/>
            <RkButton rkType='stretch success' onPress={() =>
              this.InsertReport().then((accepted) =>
              accepted
              ? goBack(null)
              : Alert.alert('Agregar reporte ha fallado','Los datos ingresados no son válidos.'))}>Continuar</RkButton>

          </View>
            </View>


        </View>
        </MyAvoidKeyboard>
      </ScrollView>
    );
  }
}
