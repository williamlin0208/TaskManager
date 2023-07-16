import { Row } from 'native-base';
import React from 'react';
import {Dimensions, View, Text, StyleSheet, FlatList} from 'react-native';

import TaskList from './TaskList';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// console.log(SCREEN_WIDTH, SCREEN_HEIGHT);

h1Size=SCREEN_HEIGHT/25;

const Tasks = () => {
  const Days=['Sun','Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.h1}>Weekly Tasks</Text>
        </View>
        <View style={styles.days}>
          <FlatList
            numColumns={Days.length}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-evenly'}}
            data={Days}
            renderItem={({ item }) => { return <View style={[styles.day, styles.borders]}><Text style={styles.daytext}>{item}</Text></View>; }}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[0]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[1]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[2]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[3]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[4]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[5]}/>
        </View>
        <View style={[styles.borders,{flex: 1}]}>
          <TaskList day={Days[6]}/>
        </View>
      </View>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column'
  },
  header:{
    flex: 2,
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
    height: SCREEN_HEIGHT/20,
    width: SCREEN_WIDTH/7,
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
  }
});