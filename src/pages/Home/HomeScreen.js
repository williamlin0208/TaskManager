import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Bulletin from './Bulletin';
import NewWork from './NewWork';
import Notification from './Notification';
import Settings from './Setting';
import TaskDetail from '../Tasks/TaskDetail';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Bulletin">
      <Stack.Screen name="Bulletin" component={Bulletin} />
      <Stack.Screen name="NewWork" component={NewWork} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
    </Stack.Navigator>
  )
}

export default HomeScreen;