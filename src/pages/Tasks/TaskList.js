import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';

import {TaskItem} from './TaskItem';

const Tasksss=[
  {
    title: '搬東西',
    startTime:'2023-7-25 12:00:00',
    endTime: '2023-7-25 16:00:00',
    reward: '2000',
    remarks: ''
  },
  {
    title: '買ssssssssssssss咖啡',
    startTime:'2023-7-26 12:00:00',
    endTime: '2023-7-26 18:00:00',
    reward: '100',
    remarks: ''
  },
  {
    title: '買咖啡',
    startTime:'2023-7-26 12:00:00',
    endTime: '2023-7-26 18:00:00',
    reward: '100',
    remarks: ''
  },
  {
    title: '買咖啡',
    startTime:'2023-7-26 12:00:00',
    endTime: '2023-7-26 18:00:00',
    reward: '100',
    remarks: ''
  },{
    title: '搬東西',
    startTime:'2023-7-26 12:00:00',
    endTime: '2023-7-26 18:00:00',
    reward: '1000',
    remarks: ''
  }
];

const TaskList = (props) => {
  
  return (
    <View style={{marginTop: 5, alignItems: 'center' }}>
      <FlatList style={{flex: 1}}
        contentContainerStyle={{paddingBottom:10}} 
        data={Tasksss}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return <TaskItem page='Tasks' task={item}/>;
        }}
      />
    </View>
  );
};

export default TaskList;