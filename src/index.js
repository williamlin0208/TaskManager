import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';

import HomeScreen from './pages/Home/HomeScreen';
import ProfileIndex from './pages/Profile/ProfileIndex';
import TasksIndex from './pages/Tasks/TasksIndex';

const Tab = createBottomTabNavigator();

const Navigation = () => {

  const navigation = useNavigation();

  return (
      <Tab.Navigator screenOptions={({route})=>(ctm_bar({route}))} initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{title: "Home", tabBarBadge: 0}}/>
        <Tab.Screen name="TasksIndex" component={TasksIndex} options={{title: "Tasks", tabBarBadge: 0}}/>
        <Tab.Screen name="ProfileIndex" component={ProfileIndex} options={{title: "Profile", tabBarBadge: null}}/>
      </Tab.Navigator>
  );
};

export default Navigation;

const ctm_bar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    }else if (route.name === 'TasksIndex'){
      iconName = focused ? 'checkmark' : 'checkmark-outline';
    }else if (route.name === 'ProfileIndex') {
      iconName = focused ? 'person' : 'person-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#88baec',
  tabBarInactiveTintColor: 'gray',
  headerShown: false
})

// <Stack.Screen name="Tab">
//   {(props) => <SignInScreen {...props} setUserid={setUserid}/>}
// </Stack.Screen> 
// <Stack.Screen name="SignUp" component={SignUpScreen} />