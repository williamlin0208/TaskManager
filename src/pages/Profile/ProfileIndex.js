import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Profile from './Profile';
import PersonalInfo from './PersonalInfo';
import MyTasks from './MyTasks';
import LeaveSystem from './LeaveSystem';
import Statics from './Statics';
import Requests from './Requests';
import StaffAttendance from './StaffAttendance';
import AppointTask from './AppointTask';
import TaskDetail from '../../Utility/TaskDetail';


const Stack = createNativeStackNavigator();

const ProfileIndex = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{title: 'Personal Information'}}/>
      <Stack.Screen name="MyTasks" component={MyTasks} options={{title: 'My Tasks'}}/>
      <Stack.Screen name="LeaveSystem" component={LeaveSystem} options={{title: 'Leave System'}}/>
      <Stack.Screen name="Statics" component={Statics} options={{title: 'Statics'}}/>
      <Stack.Screen name="Requests" component={Requests} options={{title: 'Requests'}}/>
      <Stack.Screen name="StaffAttendance" component={StaffAttendance} options={{title: 'Staff Attendance'}}/>
      <Stack.Screen name="AppointTask" component={AppointTask} options={{title: 'Appoint Task'}}/>
      <Stack.Screen name="MyTasksTaskDetail" component={TaskDetail} options={{title: 'Task Detail'}} />
    </Stack.Navigator>
  )
}

export default ProfileIndex;