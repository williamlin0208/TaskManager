import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

import {Detail, Accept} from '../../Utility/buttons';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const TaskItem = (props) => {

  buttons=()=>{
    if(props.page=='Home'){
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.button}>
            <Detail task={props.task}/>
          </View>
          <View style={styles.button}>
            <Accept task={props.task}/>
          </View>
        </View>
      );
    }else if(props.page=='Tasks'){
      return (
        <View style={styles.button}>
          <Detail task={props.task}/>
        </View>
      );
    }
  }

  return (
    <View style={styles.block}>
      <View style={styles.title}>
        <Text>{props.task.title}</Text>
      </View>
      <View style={styles.body}>
        <Text>星期:{props.task.day}</Text>
        <Text>時間:{props.task.time}</Text>
        <Text>費用:{props.task.reward}</Text>
        {buttons()}
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
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  }
});