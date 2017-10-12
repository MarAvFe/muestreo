import React, {Component} from 'react';
import _ from 'lodash';
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

import {RkButton, RkText, RkTextInput, RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';
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
      idUser: this.props.navigation.state.params.idUser || -1,
      idTrail: this.props.navigation.state.params.idTrail || -1,
      sampling: this.props.navigation.state.params.sampling || {},
      activity: 0,
      activities: [{
          idActivity: -1,
          name: "Cargando...",
          description: '',
          type: '',
      }],
      actsToShow: [{
          idActivity: -1,
          name: "Cargando...",
          description: '',
          type: '',
      }],
      act: [{
          idActivity: -1,
          name: "Cargando...",
          description: '',
          type: '',
      }]
    }
  }

  componentWillMount(){
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
          // console.log('Fetched: '+ JSON.stringify(resp._bodyInit));
          // console.log('FetchedJSON: '+ JSON.stringify(resp));
          status = resp.status;
          if (status < 400) {
              let budd = JSON.parse(resp._bodyInit);
              // console.log('status: ' + JSON.stringify(status));
              act = budd.data[0];
              if(budd.error = 'none'){
                  this.setState({ activities: act });
                  this.setState({ actsToShow: act });
                  this.setState({ activity: this.state.activities[0].idActivity });
                  return true;
              }else{
                  console.log(`Error getting activities ${budd.error}.`);
                  return false;
              }
          }
          console.log("Error de conexión.");
          return false;
      })
      .catch(err => {
          console.log('Error happened: '+ err);
          return false;
      });
  }

  addObservation(){
      const str = [];
      let parameters = {
          pIdUser: this.state.idUser,
          pIdTrail: this.state.idTrail,
          pIdActivity: this.state.activity,
      }
      for (let p in parameters) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
      }
      const body = str.join("&");
      return fetch(`http://${Network.wsIp}:${Network.wsPort}/pAddObservation`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          body: body,
      })
      .then((response) => {
          const resp = response;
          // console.log('Fetched: '+ JSON.stringify(resp._bodyInit));
          // console.log('FetchedJSON: '+ JSON.stringify(resp));
          status = resp.status;
          if (status < 400) {
              let budd = JSON.parse(resp._bodyInit);
              // console.log('status: ' + JSON.stringify(status));
              act = budd.data[0];
              if(budd.error = 'none'){
                  return true;
              }else{
                  console.log(`Error getting activities ${budd.error}.`);
                  return false;
              }
          }
          console.log("Error de conexión.");
          return false;
      })
      .catch(err => {
          console.log('Error happened: '+ err);
          return false;
      });
  }

  _filter(text) {
      let pattern = new RegExp(text, 'i');
      if (text !== '') {
          let activities = _.filter(this.state.activities, (act) => {
              if (act.name.search(pattern) != -1)
              return act;
          });
          this.setState({ actsToShow: activities });
      }else{
          this.setState({ actsToShow: this.state.activities });
      }
  }

  getActivityObj(activity){
      let i = 0;
      for (; i < this.state.actsToShow.length; i++) {
          if(this.state.actsToShow[i].idActivity === activity){
              return {
                  name: this.state.actsToShow[i].name,
                  description: this.state.actsToShow[i].description,
                  type: this.state.actsToShow[i].type,
              }
          }
      }
      return {};
  }

  updateInfo(selected){
      this.setState({activity:selected});
      const a = this.getActivityObj(selected);
      a.type = a.type !== 0 ? a.type !== 1 ? 'Improductiva' : 'Colaborativa' : 'Productiva';
      this.setState({act: a});
  }

  render() {
      const { goBack, navigate } = this.props.navigation;

      const srvItems = [];
      for (var i = 0; i < this.state.actsToShow.length; i++) {
          s = this.state.actsToShow[i].idActivity;
          n = this.state.actsToShow[i].name;
          srvItems.push(<Picker.Item key={i} value={s} label={n} />);
      }
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Agregar observación</RkText>
            <View style={{flex: 1}}>

            <RkText style={UtilStyles.spaceTop} rkType='header'>Muestreo de:</RkText><RkText type='small'> {this.state.sampling.sampled}</RkText>

                <RkText style={UtilStyles.spaceVertical} rkType="large">Actividad:</RkText>
                <RkTextInput autoCapitalize='none'
                autoCorrect={false}
                onChange={(event) => this._filter(event.nativeEvent.text)}
                label={<RkText><Icon name="search" size={20} color="#777777" /></RkText>}
                rkType='row'
                placeholder='Filtro'/>
                <View style={UtilStyles.row}>
                    <View style={{flex:1}}>
                        <View style={UtilStyles.picker}>
                            <Picker
                            selectedValue={this.state.activity}
                            onValueChange={ (activity) => this.updateInfo(activity) } >
                            {srvItems}
                            </Picker>
                        </View>
                    </View>
                    <View style={UtilStyles.spaceAround}>
                        <RkButton rkType='large info' style={{width: 50, height: 50}} onPress={() => navigate('Activity', { name: 'Hackerman' })}>
                        <Icon name="plus" size={20} color="#ffffff" />
                        </RkButton>
                    </View>
                    <View style={UtilStyles.spaceAround}>
                        <RkButton rkType='large success' style={{width: 50, height: 50}} onPress={() => {
                            this.getActivities();
                        }}>
                        <Icon name="refresh" size={20} color="#ffffff" />
                        </RkButton>
                    </View>
                </View>

                <View style={UtilStyles.section}>
                <RkText style={UtilStyles.spaceTop} rkType='header'>Descripción:</RkText><RkText type='small'> {this.state.act.description}</RkText>
                <RkText style={UtilStyles.spaceTop} rkType='header'>Tipo:</RkText><RkText type='small'> {this.state.act.type}</RkText>
                </View>

                <RkButton style={UtilStyles.spaceVertical} rkType='stretch rounded success' onPress={() =>
                    this.addObservation().then((accepted) =>
                    accepted
                    ? (Alert.alert('Éxito','Se ha agregado la observación.'), goBack(null) )
                    : Alert.alert('Error','Ha fallado la creación de una observación.')
                )}>Crear observación</RkButton>
            </View>
        </View>
      </ScrollView>
    );
  }
}
