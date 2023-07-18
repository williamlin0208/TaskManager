import React,{useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import {Back} from '../../buttons/buttons'

const NewWork = () => {

  const navigation=useNavigation();

  const [title, setTitle] = useState('');
  const [pickerVisibility, setPickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date());

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
          <TouchableOpacity onPress={() => {setPickerVisibility(true)}}>
            <Text>Start Time: {time.toLocaleString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal  isVisible={pickerVisibility}
                                mode='datetime'
                                date={time}
                                onConfirm={(time) => {setTime(time); setPickerVisibility(false)}}
                                onCancel={() => {setPickerVisibility(false)}}
                                minimumDate={new Date()}
                                display='inline' />
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