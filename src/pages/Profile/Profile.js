import React, {useState, useContext}from 'react';
import {Dimensions, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '../../../Shared';
import { useEffect } from 'react';

import {get_user_info} from '../../api/get/get_user_info';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Profile = () => {

  const navigation = useNavigation();

  let moment = require('moment');
  let startOfMonthM=moment().startOf('month');
  let endOfMonthM=moment().endOf('month');

  dayOfThisMonth=1+endOfMonthM.diff(startOfMonthM, 'days');

  const context = useContext(ThemeContext);
  const userId = context.userId;
  const identity = context.identity;

  const [mode, setMode] = useState('week');
  const [goalDays, setGoalDays] =useState(7);

  const [name, setName] = useState('User');
  const [weeklyGoal, setWeeklyGoal] = useState(1);

  let goal=weeklyGoal*(goalDays/7);
  let salary=8000;

  useEffect(() => {
    get_user_info(userId).then((data) => {
      setName(data.name);
      setWeeklyGoal(data.weeklyGoal);
    });
  },[]);

  onModeChange = (newmode) => {
    setMode(newmode);
    const corres={'day': 1, 'week': 7, 'month': dayOfThisMonth};
    setGoalDays(corres[newmode]);
  }
  onSettingPress = () => {
    
  }
  onLogoutPress = () => {

  }
  onPersonalInformationPress = () => {
    navigation.navigate("PersonalInfo");
  }
  onMyTasksPress = () => {
    navigation.navigate("MyTasks");
  }
  onLeaveSystemPress = () => {
    navigation.navigate("LeaveSystem");
  }
  onStaticsPress = () => {
    navigation.navigate("Statics");
  }
  onRequestskPress = () => {
    navigation.navigate("Requests");
  }
  onStaffAttendancePress = () => {
    navigation.navigate("StaffAttendance");
  }
  onAllTasksPress = () => {
    navigation.navigate("AllTasks");
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.imgblock}>
            <Image source={require('../../../assets/user-default.png')} style={styles.img}/> 
          </View>
          <View style={styles.name}>
            <Text style={{fontSize: 12, color: 'grey'}}>{manager?'Manager':'Member'}</Text>
            <Text style={{fontSize: 20}}>{name}</Text>
          </View>
          <TouchableOpacity onPress={onSettingPress}>
            <Icon name='settings' size={35} color='grey' style={styles.funtion}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogoutPress}>
            <Icon name='logout' size={35} color='grey' style={styles.funtion}/>
          </TouchableOpacity>
        </View>

        <Salary salary={salary} mode={mode} goal={goal} onModeChange={onModeChange}/>

        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 15, color: 'grey'}}>Funtions</Text>
        </View>
        <Tool title='Personal Information' onToolPress={onPersonalInformationPress}/>
        <Tool title='My Tasks' onToolPress={onMyTasksPress}/>
        <Tool title='Leave System' onToolPress={onLeaveSystemPress}/>
        <Tool title='Statics' onToolPress={onStaticsPress}/>
        {
          identity=='Manager'?
          <View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 15, color: 'grey'}}>Management</Text>
            </View>
            <Tool title='Requests' onToolPress={onRequestskPress}/>
            <Tool title='Staff Attendance' onToolPress={onStaffAttendancePress}/>
            <Tool title='All Tasks' onToolPress={onAllTasksPress}/>
          </View>
          :
          <View></View>
        }
        <View style={{height: 10}}></View>
      </ScrollView>
    </View>
  );
};

export default Profile;

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
    const corres={'Daily':'day', 'Weekly':'week', 'Monthly':'month'};

    modestyle=styles.modetitleunselected;
    if(corres[props.period]==props.mode) modestyle=styles.modetitleselected;

    return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.modetab}>
            <Text style={modestyle}>{props.period}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  unacheived=props.goal-props.salary;
  return (
    <View style={styles.salary}>
      <View style={{flexDirection: 'row'}}>
        <ModeTab period={'Daily'} mode={props.mode} onPress={onDailyPress}/>
        <View style={styles.cutlineV}></View>
        <ModeTab period={'Weekly'} mode={props.mode} onPress={onWeeklyPress}/>
        <View style={styles.cutlineV}></View>
        <ModeTab period={'Monthly'} mode={props.mode} onPress={onMonthlyPress}/>
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
          <Text style={{fontWeight: 'bold', color: '#333333', position: 'absolute', right: 12}}>{(props.salary/props.goal*100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>Goal:{props.goal.toFixed(2)}NTD</Text>
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
  funtion: {
    padding: 5
  },
  imgblock:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
    backgroundColor: '#dddddd',
    borderRadius: SCREEN_HEIGHT/10,
  },
  img:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
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
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
  },
  progressbar: {
    flex: 10,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#bbbbbb'
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
  modetitleselected: {
    fontFamily: 'SpaceMono_700Bold',
  },
  modetitleunselected: {
    fontFamily: 'SpaceMono_400Regular',
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