import { Row } from 'native-base';
import React, {useState} from 'react';
import {Dimensions, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Icon} from '@rneui/themed';

import TaskList from './TaskList';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

h1Size=SCREEN_HEIGHT/25;
TaskWidth=SCREEN_WIDTH/3;

const NextPage = (props) => {
  const onNextPress = () => {
    props.onNextPress();
  };

  return (
    <TouchableOpacity onPress={onNextPress}>
      <Icon size={40} name='arrow-right' color="white"/>
    </TouchableOpacity>
  );
}

const PrevPage = (props) => {
  const onPrevPress = () => {
    props.onPrevPress();
  };

  return (
    <TouchableOpacity onPress={onPrevPress}>
      <Icon size={40} name='arrow-left' color="white"/>
    </TouchableOpacity>
  );
}

//.format('YYYY/MM/DD d HH:mm:ss');
const Tasks = () => {

  const [offset, setOffset] = useState(0);

  let moment = require('moment');
  let startOfWeekM=moment().startOf('week');
  let endOfWeekM=moment().endOf('week');

  const onPrevPress = () => {
    setOffset((prevState) => (prevState-1));
  };
  const onNextPress = () => {
    setOffset((prevState) => (prevState+1));
  };

  const Days=['Sun','Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3, backgroundColor: '#88baec', paddingTop: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: '500'}}>
          {startOfWeekM.add(offset*7, 'days').format('YYYYY/MM/DD')}~{endOfWeekM.add(offset*7, 'days').format('YYYY/MM/DD')}
        </Text>
      </View>
      <View style={styles.header}>
        <PrevPage onPrevPress={onPrevPress}/>
        <View style={{flex:1, alignItems: 'center'}}>
          
          <Text style={styles.h1}>Weekly Tasks</Text>
        </View>
        <NextPage onNextPress={onNextPress}/>
      </View>
      
      <View style={styles.body}>
        <ScrollView horizontal={true}>
          <View>
            <View style={{flexDirection: 'row', height: SCREEN_HEIGHT/20}}>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[0]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[1]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[2]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[3]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[4]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[5]}</Text></View>
              </View>
              <View style={[styles.borders,styles.taskwidth]}>
                <View style={styles.day}><Text style={styles.daytext}>{Days[6]}</Text></View>
              </View>
            </View>

            <ScrollView>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[0]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[1]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[2]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[3]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[4]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[5]}/>
                </View>
                <View style={[styles.borders,styles.taskwidth]}>
                  <TaskList day={Days[6]}/>
                </View>
              </View>
            </ScrollView>
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#88baec'
  },
  h1:{
    color: 'white',
    fontSize: h1Size,
    // fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  body:{
    flex: 10,
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
    // fontFamily: 'monospace'
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