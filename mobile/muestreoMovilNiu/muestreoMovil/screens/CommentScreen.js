import React, {Component} from 'react';
import Network from '../constants/Network';

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

export class CommentScreen extends Component {
  static navigationOptions = {
    title: 'Comentario'
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
                  return this.InsertComment();
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


  InsertComment(){
  //  getUserId();
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
    console.log(JSON.stringify(body));
    console.log('access: ' + JSON.stringify(parameters));
    return fetch(`http://${Network.wsIp}:${Network.wsPort}/pInsert_Comment`, {
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

    const srvItems = [];
    for (var i = 0; i < this.state.samplings.length; i++) {
        s = this.state.samplings[i].idSampling;
        n = this.state.samplings[i].name;
        srvItems.push(<Picker.Item key={i} value={s} label={n} />);

    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <RkText rkType='header'>Agregar comentario</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
             <RkText rkType="large">Muestreo relacionado:</RkText>

             <Picker
             selectedValue={this.state.sampling}
             onValueChange={ (samplings) => ( this.setState({sampling:samplings}) ) } >
             {srvItems}
             </Picker>

              <RkText rkType="large">Mensaje:</RkText>
             <RkTextInput
                       onChangeText={(pComment) => this.setState({pComment})}
                       autoCorrect={true} multiline={true} numberOfLines={5}
                       autoCapitalize={'none'} placeholder='mensaje...' clearButtonMode='always'/>

                       <RkButton rkType='stretch success' onPress={()=>
                                     this.getMySamplings().then((accepted) =>
                                     accepted
                                     ? navigate('Menu', { error: this.state.error })
                                     : Alert.alert('Agregar comentario ha fallado','Los datos ingresados no son válidos.'))}>Continuar</RkButton>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
}
