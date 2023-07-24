import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import { useFonts, SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';

import Navigation from './src/index';

import {ThemeContext} from './Shared';

import {get_user_info} from './src/api/get_user_info';
 
const App = () => {

  let [fontsLoaded] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold
  });

  [userId,setUserId] = useState(1);
  [identity,setIdentity] = useState('Member');

  useEffect(() => {
    get_user_info().then((data) => {
      console.log(data);
      setUserId(data.userId);
      setIdentity(data.identity);
    });
  },[]);

  return (
    <ThemeContext.Provider value={{userId:userId, identity:identity}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export default App;