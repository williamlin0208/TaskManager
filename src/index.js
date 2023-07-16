import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/HomeScreen/HomeScreen';
import Tasks from './pages/Tasks/Tasks'
import Settings from './pages/Settings/Settings';
import NewWork from './pages/NewWork/NewWork';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

ctm_bar = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
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
  return (
    <Tab.Navigator screenOptions={({route})=>(ctm_bar({route}))} initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 0 }}/>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

// <Stack.Screen name="Tab">
//   {(props) => <SignInScreen {...props} setUserid={setUserid}/>}
// </Stack.Screen> 
// <Stack.Screen name="SignUp" component={SignUpScreen} />