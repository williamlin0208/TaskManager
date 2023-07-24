import React, {useState} from 'react';
import {Text} from 'react-native';
import {NativeBaseProvider} from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import { useFonts, SpaceMono_700Bold_Italic } from '@expo-google-fonts/space-mono';

import Navigation from './src/index';

import {ThemeContext} from './Shared';
 
const App = () => {
  [userId,setUserId] = useState(1);
  [manager,setManager] = useState(false);

  let [fontsLoaded] = useFonts({
    SpaceMono_700Bold_Italic
  });

  if(userId==1){
    if(manager==false) setManager(true);
  }else{
    if(manager==true) setManager(false);
  }

  return (
    <ThemeContext.Provider value={{userId:userId, manager:manager}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export default App;