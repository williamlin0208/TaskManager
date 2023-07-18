import React,{useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import {Back} from '../../buttons/buttons'

const NewWork = () => {

  const navigation=useNavigation();

  const [title, setTitle] = useState('');
  const [pickerStartVisibility, setPickerStartVisibility] = useState(false);
  const [pickerEndVisibility, setPickerEndVisibility] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reward, setReward] = useState('100');

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Back/>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems:'center'}}>
        <Text style={{fontSize:25}}>New Work</Text>
        <View style={{flexDirection:'row'}}>
          <Text>Name: </Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => {setTitle(text)}}/>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {setPickerStartVisibility(true)}}>
            <Text>Start Time: {startTime.toLocaleString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal  isVisible={pickerStartVisibility}
                                mode='datetime'
                                date={startTime}
                                onConfirm={(time) => {setStartTime(time); setPickerStartVisibility(false)}}
                                onCancel={() => {setPickerStartVisibility(false)}}
                                minimumDate={new Date()}
                                textColor='black' />
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {setPickerEndVisibility(true)}}>
            <Text>End Time: {endTime.toLocaleString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal  isVisible={pickerEndVisibility}
                                mode='datetime'
                                date={endTime}
                                onConfirm={(time) => {setEndTime(time); setPickerEndVisibility(false)}}
                                onCancel={() => {setPickerEndVisibility(false)}}
                                minimumDate={new Date()}
                                textColor='black' />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text>Reward: </Text>
          <TextInput style={styles.input} 
                     value={reward}
                     onChangeText={(num) => setReward(num)}
                     keyboardType='numeric'/>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewWork;

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: "5%",
    marginTop: "10%"
  },
  input: {
    borderWidth: 1,
    width:'30%'
  }
});