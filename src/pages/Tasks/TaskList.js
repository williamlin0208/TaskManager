import React from 'react';
import {View,Text} from 'react-native';

const TaskList = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontFamily: 'monospace'}}>{props.day}</Text>
    </View>
  );
};

export default TaskList;