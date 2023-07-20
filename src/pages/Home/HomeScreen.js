import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Bulletin from './Bulletin';
import NewWork from './NewWork';
import Notification from './Notification';
import Settings from './Setting';
import TaskDetail from '../Tasks/TaskDetail';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Bulletin">
      <Stack.Screen name="Bulletin" 
                    component={Bulletin} 
                    options={() => ({
                                      headerRight: () => 
                                        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{maxHeight:25,maxWidth:25,marginEnd:3}}>
                                          <Image source={require('../../../assets/settings.png')} style={{maxHeight:25,maxWidth:25}}/>
                                        </TouchableOpacity>
                                      ,
                                      headerLeft: () => 
                                        <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={{maxHeight:25,maxWidth:25,marginStart:3}}>
                                          <Image source={require('../../../assets/bell.png')} style={{maxHeight:25,maxWidth:25}}/>
                                        </TouchableOpacity>
                                      })}
      />
      <Stack.Screen name="NewWork" component={NewWork} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
    </Stack.Navigator>
  )
}

export default HomeScreen;