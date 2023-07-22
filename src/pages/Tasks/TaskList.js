import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';

import TaskItem from './TaskItem';

const Tasksss=[
  {
    title: '搬東西',
    day: 'Tues',
    time: '12:00~16:00',
    reward: '2000'
  },
  {
    title: '買咖啡',
    day: 'Thur',
    time: '13:00~13:30',
    reward: '100'
  }
];

const TaskList = (props) => {
  return (
    <View style={{ flex: 20, marginTop: 10, alignItems: 'center' }}>
      <FlatList style={{flex: 1}}
        data={Tasksss}
        renderItem={({ item }) => { return <TaskItem page='Tasks' task={item}/>; }}
      />
    </View>
  );
};

export default TaskList;