import React, { Component } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
    View,
    DatePickerAndroid,
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
        };
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

    /*
        START RANDOM GENERATION FUNCTIONS
    */


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
    /*
        END RANDOM GENERATION FUNCTIONS
    */

    generateTimes(){
        times = this.startsToMins(
            this.state.startTime,
            this.randomStartTimes(this.state.startTime,this.state.endTime,this.state.estimatedTime)
        );
        //this.setState({times});
        console.log(`times: ${this.state.times}`);
        for(t in times) console.log(renderHour(t));
        return true;
    }

    renderHour(date){
    	hours = (`0${date.getHours()}`).slice(-2);
    	mins = (`0${date.getMinutes()}`).slice(-2);
    	return `${hours}:${mins}`
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <ScrollView
            ref={'scrollView'}
            automaticallyAdjustContentInsets={true}
            style={UtilStyles.container}>

            <View style={UtilStyles.section}>
            <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>

            <RkText rkType="large">Rango de Horario:</RkText>

            <RkButton onPress={() => this._showStartPicker()}>{this.renderHour(this.state.startTime)}</RkButton>
            <DateTimePicker
              isVisible={this.state.isStartPickerVisible}
              onConfirm={this._handleStartPicked}
              onCancel={this._hideStartPicker}
              mode='time'
            />

            <RkButton onPress={() => this._showEndPicker()}>{this.renderHour(this.state.endTime)}</RkButton>
            <DateTimePicker
              isVisible={this.state.isEndPickerVisible}
              onConfirm={this._handleEndPicked}
              onCancel={this._hideEndPicker}
              mode='time'
            />

        <RkText rkType="large">Tiempo de recorrido, estimado en minutos:</RkText>
        <RkTextInput onChangeText={(estimatedTime) => this.setState({estimatedTime})} autoCorrect={true} keyboardType='numeric' autoCapitalize={'none'} placeholder='' clearButtonMode='always'/>
        <RkButton rkType='stretch' onPress={() => this.generateTimes()}>Generar horarios</RkButton>
        <RkButton rkType='stretch success' onPress={() => navigate('AddObservation', { name: 'Hackerman' })}>Continuar</RkButton>
        </View>
        </View>
        </View>
        </ScrollView>
    );
}
}
