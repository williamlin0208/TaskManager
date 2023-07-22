import { Row } from 'native-base';
import React from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView} from 'react-native';

import TaskList from './TaskList';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// console.log(SCREEN_WIDTH, SCREEN_HEIGHT);

h1Size=SCREEN_HEIGHT/25;
TaskWidth=SCREEN_WIDTH/3;

const Tasks = () => {
  const Days=['Sun','Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.h1}>Weekly Tasks</Text>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView horizontal={true}>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[0]}</Text></View>
            <TaskList day={Days[0]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[1]}</Text></View>
            <TaskList day={Days[1]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[2]}</Text></View>
            <TaskList day={Days[2]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[3]}</Text></View>
            <TaskList day={Days[3]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[4]}</Text></View>
            <TaskList day={Days[4]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[5]}</Text></View>
            <TaskList day={Days[5]}/>
          </View>
          <View style={[styles.borders,styles.taskwidth]}>
            <View style={styles.day}><Text style={styles.daytext}>{Days[6]}</Text></View>
            <TaskList day={Days[6]}/>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa'
  },
  header:{
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#88baec'
  },
  h1:{
    color: 'white',
    fontSize: h1Size,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  body:{
    flex: 10,
    flexDirection: 'row'
  },
  days:{
    height: SCREEN_HEIGHT/20
  },
  day:{
    flex: 1,
    backgroundColor: '#88baec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daytext:{
    fontFamily: 'monospace'
  },
  borders:{
    borderLeftColor: '#777777',
    borderLeftWidth: 1,
    borderStyle: 'solid'
  },
  taskwidth:{
    width: TaskWidth
  }
});