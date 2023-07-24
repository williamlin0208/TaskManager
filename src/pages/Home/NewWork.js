import React,{useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PostButton } from '../../Utility/buttons';
import { LoadingBar } from '../../Utility/utility';
import { postWork } from '../../api/api';

const NewWork = () => {

  const navigation = useNavigation();
  var nowTime = new Date();
  nowTime.setSeconds(0);
  if (nowTime.getMinutes() < 30) nowTime.setMinutes(30);
  else {
    nowTime.setMinutes(0);
    nowTime.setHours(nowTime.getHours() + 1)
  }

  const [title, setTitle] = useState('');
  const [pickerStartVisibility, setPickerStartVisibility] = useState(false);
  const [pickerEndVisibility, setPickerEndVisibility] = useState(false);
  const [startTime, setStartTime] = useState(nowTime);
  const [endTime, setEndTime] = useState(nowTime);
  const [reward, setReward] = useState('100');
  const [remarks, setRemarks] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const showMessage = (str) => {
    if (str == 'ok'){
      return Alert.alert('Success','New work has been posted on the bulletin.',
              [{text: 'Ok', onPress: () => navigation.navigate('Bulletin')}])
    }
    else{
      return Alert.alert('Failed',str,
              [{text: 'Back', style: 'cancel'}])
    }
  }

  const checkValid = () => {
    const now = new Date()
    if (endTime < startTime) return 'End Time should be later than Start Time.'
    else if (endTime < now) return 'End Time should be later than Now.'
    else if (parseInt(reward) < 0 || parseInt(reward) > 100000) return 'Reward should be set between 0 and 100000.'
    else if (title == '') return 'Name should not be empty.'
    return 'ok' 
  }

  const onPostPress = () => {
    const msg = checkValid();
    if (msg == 'ok'){
      setIsPosting(true);
      postWork().then(() => {
        setIsPosting(false);
        showMessage(msg);
      })
    }
    else showMessage(msg);
  }

  return (
    isPosting ? 
    <LoadingBar /> :
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems:'center'}}>

        <View style={{flexDirection:'row', marginVertical:30}}>
          <Text>Name: </Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => {setTitle(text)}}/>
        </View>

        <View style={{flexDirection:'row', marginVertical:30}}>
          <Text>Start Time: </Text>
          <TouchableOpacity onPress={() => {setPickerStartVisibility(true)}}>
            <Text style={{color:'#007AFF'}}>{startTime.toLocaleString()}</Text>
          </TouchableOpacity>
          {/* <DateTimePickerModal  isVisible={pickerStartVisibility}
                                mode='datetime'
                                date={startTime}
                                onConfirm={(time) => {setStartTime(time); setPickerStartVisibility(false)}}
                                onCancel={() => {setPickerStartVisibility(false)}}
                                textColor='#007AFF' /> */}
        </View>

        <View style={{flexDirection:'row', marginVertical:30}}>
          <Text>End Time: </Text>
          <TouchableOpacity onPress={() => {setPickerEndVisibility(true)}}>
            <Text style={{color:'#007AFF'}}>{endTime.toLocaleString()}</Text>
          </TouchableOpacity>
          {/* <DateTimePickerModal  isVisible={pickerEndVisibility}
                                mode='datetime'
                                date={endTime}
                                onConfirm={(time) => {setEndTime(time); setPickerEndVisibility(false)}}
                                onCancel={() => {setPickerEndVisibility(false)}}
                                textColor='#007AFF' /> */}
        </View>
        
        <View style={{flexDirection:'row', marginVertical:30}}>
          <Text>Reward: </Text>
          <TextInput style={styles.input} 
                     value={reward}
                     onChangeText={(num) => setReward(num)}
                     keyboardType='numeric'/>
        </View>

        <Text>Remarks: </Text>
        <View style={{backgroundColor: 'white',
                      borderColor: '#000000',
                      borderWidth: 1,
                      minWidth:'70%',
                      minHeight:'15%',
                      marginVertical:30
        }}>
          <TextInput  editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      onChangeText={text => setRemarks(text)}
                      value={remarks}
                      style={{padding: 10}}
          />
        </View>

        <PostButton onPostPress={() => {onPostPress()}}/>

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
    backgroundColor:'white',
    width:'30%'
  }
});