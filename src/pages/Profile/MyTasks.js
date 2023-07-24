import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '../../../Shared';

import TaskItem from '../../Utility/TaskItem';
import {get_user_tasks_list} from '../../api/get_user_tasks';

const MyTasks = () => {

  const Mode = (props) => {
    let wordbeginstyle=props.title==props.mode?styles.wordbegin:styles.modetext;
    return (
      <TouchableOpacity style={styles.mode} onPress={props.onPress}>
        <View style={styles.press}>
          <Text style={styles.modetext}>
            <Text style={wordbeginstyle}>{props.title[0]}</Text>
            {props.title.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const context = useContext(ThemeContext);
  const [Loading, setLoading] =useState(true);
  const [Tasks, setTasks] = useState([]); 
  const [ModeName, setModeName] = useState('Done');

  useEffect(() => {
    new Promise((res,rej) => {
      res(setLoading(true));
    }).then(() => {
      get_user_tasks_list(context.userId, ModeName).then((data) => {
        console.log('loading '+ModeName+' tasks');
        setTasks(data, ModeName);
        setLoading(false);
      });
    });
  },[ModeName]);

  OnDonePress = () => {
    setModeName('Done');
  }
  OnTBDPress = () => {
    setModeName('TBD');
  }
  OnExpiredPress = () => {
    setModeName('Expired');
  }
  OnLeavePress = () => {
    setModeName('Leave');
  }

  const navigation=useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', borderBottomRightRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#88baec',}}>
        <Mode title={'Done'} mode={ModeName} onPress={OnDonePress}/>
        <Mode title={'TBD'} mode={ModeName} onPress={OnTBDPress}/>
        <Mode title={'Expired'} mode={ModeName} onPress={OnExpiredPress}/>
        <Mode title={'Leave'} mode={ModeName} onPress={OnLeavePress}/>
      </View>

      {Loading?
        <View style={{marginTop: 10}}>
          <ActivityIndicator size="large" color="#88baec"/>
        </View>
        :
        <View style={{flex: 15, paddingHorizontal: 20}}>
          <FlatList
            contentContainerStyle={{paddingBottom:10}} 
            data={Tasks}
            renderItem={({ item }) => {
              return <TaskItem page='MyTasks' task={item}/>
            }}
          />
        </View>
      }

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: 'white'
  },
  modetext: {
    color: 'white',
    fontSize: 12,
    // fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  press: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordbegin: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});