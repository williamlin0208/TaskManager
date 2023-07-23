import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import { TaskItem } from '../Tasks/TaskItem';
import {accept_work, loadBulletin} from '../../api';

const MyTasks = () => {

  const [Tasks, setTasks] = useState([]); 
  useEffect(() => {
    loadBulletin().then((data) => {setTasks(data)})
  },[])

  const navigation=useNavigation();
  return (
    <FlatList style={{flex: 1}}
      data={Tasks}
      renderItem={({ item }) => {
        return <TaskItem page={'MyTasks'} task={item}/>
      }}
    />
  );
};

export default MyTasks;

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
  }
});