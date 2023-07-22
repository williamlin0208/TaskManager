import React, {useState}from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';
import { Back } from '../../Utility/buttons';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Salary = (props) => {

  onDailyPress = () => {
    props.onModeChange('day');
  }
  onWeeklyPress = () => {
    props.onModeChange('week')
  }
  onMonthlyPress = () => {
    props.onModeChange('month')
  }
  
  const ModeTab = (props) => {
    modestyle={fontWeight: 'normal', color: '#333333'};
    if(props.period=='daily'&&props.mode=='day') modestyle={fontWeight: 'bold', color: 'black',};
    if(props.period=='weekly'&&props.mode=='week')  modestyle={fontWeight: 'bold', color: 'black',};
    if(props.period=='monthly'&&props.mode=='month') modestyle={fontWeight: 'bold', color: 'black',};

    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.modetab}>
            <Text style={[styles.modetitle,modestyle]}>{props.period}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  unacheived=props.goal-props.salary;
  return (
    <View style={styles.salary}>
      <View style={{flexDirection: 'row'}}>
        <ModeTab period={'daily'} mode={props.mode} onPress={onDailyPress}/>
        <View style={styles.cutlineV}></View>
        <ModeTab period={'weekly'} mode={props.mode} onPress={onWeeklyPress}/>
        <View style={styles.cutlineV}></View>
        <ModeTab period={'monthly'} mode={props.mode} onPress={onMonthlyPress}/>
      </View>

      <View style={styles.cutlineH}></View>

      <Text style={{fontSize: 20, marginTop: 5}}>This {props.mode}, you've got</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon size={40} name='attach-money'/>
        <Text style={styles.money}>{props.salary}NTD</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.progressbar}>
          <View style={{flex: props.salary, height: 12,borderRadius: 100, backgroundColor: '#88baec'}}></View>
          <View style={{flex: unacheived}}></View>
          <Text style={{fontWeight: 'bold', color: '#555555'}}>{(props.salary/props.goal*100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>GOAL:{props.goal}</Text>
      </View>
    </View>
  );
}

const Tool = (props) => {
  onToolPress = () =>{
    props.onToolPress();
  };

  return (
    <TouchableOpacity onPress={onToolPress}>
      <View style={styles.tool}>
        <Text style={styles.tooltitle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const Profile = () => {

  const [mode, setMode] = useState('week');
  let name='William';
  let monthly_goal=20000;
  let salary=8000;

  onModeChange = (newmode) => {
    setMode(newmode)
  }
  onLogoutPress = () => {

  }
  onLeaveSystemPress = () => {

  }
  onAcceptedTasksPress = () => {

  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.img}></View>
          <View style={styles.name}>
            <Text style={{fontSize: 20}}>{name}</Text>
          </View>
          <TouchableOpacity onPress={onLogoutPress}>
            <Icon name='logout'/>
          </TouchableOpacity>
        </View>

        <Salary salary={salary} mode={mode} goal={monthly_goal} onModeChange={onModeChange}/>

        <Tool title='Acommplished Tasks' onToolPress={onAcceptedTasksPress}/>
        <Tool title='Leave System' onToolPress={onLeaveSystemPress}/>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: SCREEN_HEIGHT/50,
    paddingTop: SCREEN_HEIGHT/50,
    backgroundColor: '#fafafa'
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
    backgroundColor: '#cfcfcf',
    borderRadius: SCREEN_HEIGHT/10,
  },
  name: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  salary: {
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#E0F1FD'
  },
  money: {
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
  },
  progressbar: {
    flex: 10,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#cccccc'
  },
  tool: {
    height: 50,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  tooltitle: {
    color: '#444444',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modetab: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modetitle: {
    fontFamily: 'monospace',
  },
  cutlineV: {
    borderRightWidth: 1,
    marginTop: 5,
    marginBottom: 2,
    borderColor: 'grey'
  },
  cutlineH: {
    borderBottomWidth: 1,
    borderColor: 'grey'
  }
});