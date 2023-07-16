import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

import {Detail} from '../../buttons/buttons';
import { Button } from 'react-native-elements';

const Tasks=[
  {
    title: '搬東西',
    day: 'Tues',
    time: '12:00~16:00',
    fee: '2000'
  },
  {
    title: '買咖啡',
    day: 'Thur',
    time: '13:00~13:30',
    fee: '100'
  }
];

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const TaskItem = (props) => {
  return (
    <View style={styles.block}>
      <View style={styles.title}>
        <Text>{props.task.title}</Text>
      </View>
      <View style={styles.body}>
        <Text>星期:{props.task.day}</Text>
        <Text>時間:{props.task.time}</Text>
        <Text>費用:{props.task.fee}</Text>
        <View style={styles.button}>
          <Detail/>
        </View>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  block:{
    marginTop: 5,
    padding: 5,
    backgroundColor: '#afbffe',
    width: SCREEN_WIDTH/3-10,
  },
  title:{
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  body:{
    flex: 4,
    marginTop: 5
  },
  button:{
    paddingTop: 5
  }
});