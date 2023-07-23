import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import { TaskItem } from '../Tasks/TaskItem';
import {accept_work, loadBulletin} from '../../api';

const MyTasks = () => {

  const [Tasks, setTasks] = useState([]); 
  const [ModeName, setModeName] = useState('Confirmed');

  useEffect(() => {
    loadBulletin().then((data) => {setTasks(data)})
  },[])

  OnConfirmedPress = () => {

  }
  OnUnconfirmedPress = () => {
    
  }
  OnExpiredPress = () => {
    
  }
  OnLeavePress = () => {
    
  }

  const Mode = (props) => {
    modestyle=props.first?styles.mode:[styles.mode, {borderLeftWidth: 1, borderColor: '#aaaaaa'}];
    return (
      <View style={modestyle}>
        <TouchableOpacity>
          <View style={styles.mode}>
            <Text style={styles.modetext}>{props.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const navigation=useNavigation();
  return (
    <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
      <View style={{height: 40, flexDirection: 'row', borderWidth: 1, borderColor: '#aaaaaa', borderRadius: 10, backgroundColor: 'white'}}>
        <Mode title={'Confirmed'} first={true}/>
        <Mode title={'Unconfirmed'} first={false}/>
        <Mode title={'Expired'} first={false}/>
        <Mode title={'Leave'} first={false}/>
      </View>
      <View style={{flex: 15}}>
        <FlatList
          contentContainerStyle={{paddingBottom:10}} 
          data={Tasks}
          renderItem={({ item }) => {
            return <TaskItem page={'MyTasks'} task={item}/>
          }}
        />
      </View>
    </View>
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
  },
  mode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modetext: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});