import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';


import {Back, Accept} from '../../Utility/buttons'

const Detail = () => {
  return (
    <View style={styles.detail}>
      <Text style={{fontSize:25, alignSelf:'center', fontWeight:'bold'}}>Description</Text>
      <View style={{flex: 1, backgroundColor: '#d1d1d1', marginTop: 10}}>
      </View>
    </View>
  );
}

const TaskDetail = ({route}) => {

  const navigation=useNavigation();
  const {task} = route.params

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Back/>
      </View>
      
      <View style={{ flex: 2, flexDirection:'column', marginHorizontal:30, marginTop:30 }}>
        <Text style={{fontSize:25, alignSelf:'center', fontWeight:'bold'}}>Description</Text>
        <Text style={{fontSize:20, alignSelf:'center'}}>Title: {task.title}</Text>
        <Text style={{fontSize:20, alignSelf:'center'}}>Day: {task.day}</Text>
        <Text style={{fontSize:20, alignSelf:'center'}}>Time: {task.time}</Text>
        <Text style={{fontSize:20, alignSelf:'center'}}>Reward: {task.reward}</Text>
      </View>

      <Detail/>

      <View style={{flex: 1, alignItems:'center', marginTop: 20}}>
        <TouchableOpacity style={{width:'30%'}}>
          <Accept />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskDetail;

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
  detail: {
    flex: 3,
    borderRadius: 5,
    marginHorizontal:50,
  }
});