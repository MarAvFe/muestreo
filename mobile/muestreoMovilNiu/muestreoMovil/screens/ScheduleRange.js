import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Network from '../constants/Network';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';

import {
    Alert,
    Platform,
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Switch,
    TouchableOpacity,
    FlatList,
    Picker,
} from 'react-native';

import {RkButton, RkText, RkTextInput, RkChoiceGroup} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class ScheduleRange extends Component {
    static navigationOptions = {
        title: 'Rango de Horario y tiempo estimado'
    };

    constructor(props) {
        super(props);
        st = new Date();
        et = new Date(st.getTime());
        et.setHours(st.getHours()+2);
        this.state = {
            checked: true,
            startTime: st,
            endTime: et,
            estimatedTime: 0,
            isStartPickerVisible: false,
            isEndPickerVisible: false,
            minute: 1000*60,
            times: [],
            idUser: this.props.navigation.state.params.idUser || -1,
            sampling: 'Seleccionar muestreo',
            isActive: false,
            samplings: [
            {
                idSampling: -1,
                name: "Cargando..."
            }
        ]
        };
        this.getMySamplings();
        // console.log(`timz: ${this.state.times}`);
        // console.log(`randint [1,7]: ${this.randInt(1,7)}`);
        // console.log(`swap [0,1,2,3,4,5], 3, 4: ${this.swap([0,1,2,3,4,5],3,4)}`);
        // console.log(`minutesInRange st, et: ${this.minutesInRange(st,et)}`);
        // console.log(`addTime [0,1,2,3,4,5,6,7,8,9] r:3 t:1 = ${this.addTime([0,1,2,3,4,5,6,7,8,9],3,1)}`);
        // console.log(`findFit [0,1,-1,-1,-1,5,6,7,8,9,10], 2: ${this.findFit([0,1,-1,-1,-1,5,6,7,8,9,10],2)}`);
        // console.log(`findFit [0,1,-1,-1,-1,5,6,7,8,9,10], 7: ${this.findFit([0,1,-1,-1,-1,5,6,7,8,9,10],7)}`);
        // console.log(`randomStartTimes st, et, 20:  ${this.randomStartTimes(st,et,20)}`);
        // console.log(`startsToMins st, this^: ${this.startsToMins(st,this.randomStartTimes(st,et,20))}`);
        // console.log(`randomStartTimes st, et, 20:  ${this.randomStartTimes(this.state.startTime,this.state.endTime,this.state.estimatedTime)}`);
        // console.log(`startsToMins st, this^: ${this.startsToMins(this.state.startTime,this.randomStartTimes(this.state.startTime,this.state.endTime,this.state.estimatedTime))}`);

    }

    _showStartPicker = () => this.setState({ isStartPickerVisible: true });

    _hideStartPicker = () => this.setState({ isStartPickerVisible: false });

    _handleStartPicked = (startTime) => {
        console.log('A starttime has been picked: ', startTime);
        this.setState({startTime});
        this._hideStartPicker();
    };

    _showEndPicker = () => this.setState({ isEndPickerVisible: true });

    _hideEndPicker = () => this.setState({ isEndPickerVisible: false });

    _handleEndPicked = (endTime) => {
        console.log('An endtime has been picked: ', endTime);
        this.setState({endTime});
        this._hideEndPicker();
    };

    /* ===================================
        START RANDOM GENERATION FUNCTIONS
       =================================== */


    randInt(lo,hi){
    	 return Math.floor((Math.random() * hi) + lo);
    }

    swap(nums, x, y){
    	var b = nums[y];
        nums[y] = nums[x];
        nums[x] = b;
        return nums;
    }

    sort(nums){
    	for (i = 0; i < nums.length; i++){
        	for (k = i; k > 0 && nums[k] < nums[k-1]; k--)
              nums = this.swap(nums,k,k-1);
        }
        return nums;
    }

    minutesInRange(d1,d2){
    	if(d1>d2){
        	return -1;
        }
        lapse = new Date(d2-d1).getTime();
        return lapse/this.state.minute;
    }

    addTime(times, range, time){
    	// [0] : Bound crash
        // [0] : Other time crash
        // [times] : Success
    	if(time+range > times.length) return [0];
        for(i = 0; i < times.length; i++){
        	if((time <= i) && (i < time+range)){
        	    if(times[i] == -1) return [0];
                times[i] = -1;
            }
        }
        return times;
    }

    findFit(times, range){
    	space = 0;
        isSpace = false;
    	for(i = 0; i < times.length; i++){
        	if(space > range) return true;
        	if(times[i] != -1){
            	space++;
            }else{
            	if(space < range) isSpace = false;
            	space = 0;
            }
        }
        return false;
    }

    randomStartTimes(d1,d2,range){
    	times = [];
        inds = [];
        if((typeof range) === 'string') range = parseInt(range);

        for(i = 0; i < this.minutesInRange(d1,d2); i++) times.push(i);
        while(this.findFit(times,range)){
        	k = this.randInt(0,times.length);
            tmp = this.addTime(times,range,k);
            if(tmp == 0) continue;
            times = tmp;
            inds.push(k);
        }

        return this.sort(inds);
    }

    startsToMins(d1,times){
    	dates = [];
        for(i = 0; i < times.length; i++){
        	s = new Date(d1);
            s.setMinutes(s.getMinutes()+times[i]);
        	dates.push(s);
        }
        return dates;
    }
    /* =================================
        END RANDOM GENERATION FUNCTIONS
       ================================= */

    generateTimes(){
        if(this.state.estimatedTime <= 0){
            Alert.alert('Error','Por favor ingrese un tiempo estimado.')
            return false;
        }
        if(this.state.startTime.getTime() > this.state.endTime.getTime()){
            Alert.alert('Error','El tiempo de inicio es posterior al de finalización.')
            return false;
        }
        if(this.state.samplings[0].idSampling === -1){
            Alert.alert('Error','No se ha seleccionado un muestreo.')
            return false;
        }
        times = this.startsToMins(
            this.state.startTime,
            this.randomStartTimes(this.state.startTime,this.state.endTime,this.state.estimatedTime)
        );
        this.setState({times});
        for(t in times) {
            console.log(`h: ${this.renderHour(times[t])}`);
            this.insertTrail(times[t]);
        };
        Alert.alert('Creación de horarios','Se han creado satisfactoriamente. Vaya a la sección de "Muestrear" para consultarlos.')
        return true;
    }

    renderHour(date){
    	hours = (`0${date.getHours()}`).slice(-2);
    	mins = (`0${date.getMinutes()}`).slice(-2);
    	return `${hours}:${mins}`
    }

    insertTrail(hour){
        const str = [];
        let parameters = {
            pIdUser: this.state.idUser,
            pIdSampling: this.state.idSampling,
            pHour: (hour).toISOString().substring(0, 19).replace('T', ' '),
        }
        for (let p in parameters) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parameters[p]));
        }
        const body = str.join("&");
        return fetch(`http://${Network.wsIp}:${Network.wsPort}/pInsertTrail`, {
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
                error = budd.error;
                if(error = 'none'){
                    return true;
                }else{
                    console.log(`Error registering trail ${this.renderHour(hour)}.`);
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

    render(){
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
            <View style={UtilStyles.rowContainer,UtilStyles.container}>

            <RkText rkType="large">Rango de horario de trabajo:</RkText>
            <View style={UtilStyles.rowContainer}>

            <RkButton rkType='info medium' style={UtilStyles.spaceH} onPress={() => this._showStartPicker()}>{this.renderHour(this.state.startTime)}</RkButton>
            <RkText rkType="large">-</RkText>
            <RkButton rkType='info medium' style={UtilStyles.spaceH} onPress={() => this._showEndPicker()}>{this.renderHour(this.state.endTime)}</RkButton>

            </View>

            <DateTimePicker
              isVisible={this.state.isStartPickerVisible}
              onConfirm={this._handleStartPicked}
              onCancel={this._hideStartPicker}
              mode='time'
            />

            <DateTimePicker
              isVisible={this.state.isEndPickerVisible}
              onConfirm={this._handleEndPicked}
              onCancel={this._hideEndPicker}
              mode='time'
            />

            <View style={UtilStyles.section,UtilStyles.rowContainer}>
            <RkText rkType="large">Seleccione el muestreo correspondiente:</RkText>
            </View>
            <Picker
            selectedValue={this.state.sampling}
            onValueChange={ (samplings) => ( this.setState({sampling:samplings}) ) } >
            {srvItems}
            </Picker>


            <View style={UtilStyles.section,UtilStyles.rowContainer}>
        <RkText rkType="large">Tiempo de recorrido, estimado en minutos:</RkText>
        <RkTextInput rkType='bordered' style={{width:'20%'}} onChangeText={(estimatedTime) => this.setState({estimatedTime})} autoCorrect={true} keyboardType='numeric' autoCapitalize={'none'} placeholder='' clearButtonMode='always'/>
        </View>


        <RkButton style={UtilStyles.spaceVertical} rkType='stretch' onPress={() => this.generateTimes()}>Generar horarios</RkButton>
        <FlatList
          data={this.state.times}
          renderItem={({item}) => <RkText style={styles.item}>{this.renderHour(item)}</RkText>}
        />

        <RkButton style={UtilStyles.spaceVertical} rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>
        </View>
        </View>
        </View>
        </ScrollView>
    );
}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
  },
})
