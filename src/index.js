import React, {useState} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';

import HomeScreen from './pages/HomeScreen/HomeScreen';
import Tasks from './pages/Tasks/Tasks'
import NewWork from './pages/NewWork/NewWork';
import Notification from './pages/HomeScreen/Notification'
import Settings from './pages/HomeScreen/Setting';
import TaskDetail from './pages/Tasks/TaskDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

ctm_bar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Bulletin') {
      iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
    }else if (route.name === 'Tasks'){
      iconName = focused ? 'ios-list' : 'ios-list-outline';
    }else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#88baec',
  tabBarInactiveTintColor: 'gray',
  // headerShown: false
})

const Nav_Tab = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator screenOptions={({route})=>(ctm_bar({route}))} initialRouteName="Bulletin">
        <Tab.Screen name="Bulletin" component={HomeScreen} options={() => ({
            headerRight: () => 
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Image source={require('../assets/settings.png')} style={{maxHeight:25,maxWidth:25,marginEnd:15}}/>
              </TouchableOpacity>
            ,
            headerLeft: () => 
              <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                <Image source={require('../assets/bell.png')} style={{maxHeight:25,maxWidth:25,marginStart:15}}/>
              </TouchableOpacity>
            
          })}/>
        <Tab.Screen name="Tasks" component={Tasks} options={{ tabBarBadge: 0 }}/>
        <Tab.Screen name="Settings" component={Settings} options={{ tabBarBadge: null }}/>
    </Tab.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Nav">
        <Stack.Screen name="Nav" component={Nav_Tab} />
        <Stack.Screen name="NewWork" component={NewWork} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

// <Stack.Screen name="Tab">
//   {(props) => <SignInScreen {...props} setUserid={setUserid}/>}
// </Stack.Screen> 
// <Stack.Screen name="SignUp" component={SignUpScreen} />