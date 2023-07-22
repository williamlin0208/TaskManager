import React, {useState} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';

import HomeScreen from './pages/Home/HomeScreen';
import Profile from './pages/Profile/Profile';
import Tasks from './pages/Tasks/Tasks';

const Tab = createBottomTabNavigator();

ctm_bar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
    }else if (route.name === 'Tasks'){
      iconName = focused ? 'ios-list' : 'ios-list-outline';
    }else if (route.name === 'Profile') {
      iconName = focused ? 'settings' : 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#88baec',
  tabBarInactiveTintColor: 'gray',
  // headerShown: false
})

const Navigation = () => {

  const navigation = useNavigation();

  return (
      <Tab.Navigator screenOptions={({route})=>(ctm_bar({route}))} initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 0, headerShown: false}}/>
        <Tab.Screen name="Tasks" component={Tasks} options={{ tabBarBadge: 0, headerShown: false }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarBadge: null }}/>
      </Tab.Navigator>
  );
};

export default Navigation;

// <Stack.Screen name="Tab">
//   {(props) => <SignInScreen {...props} setUserid={setUserid}/>}
// </Stack.Screen> 
// <Stack.Screen name="SignUp" component={SignUpScreen} />