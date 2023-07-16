import React,{useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FAB} from '@rneui/themed';
import {Spinner} from 'native-base';
import {useNavigation} from '@react-navigation/core';

import { ThemeContext } from '../../../Shared';

const HomeScreen = () => {

  const navigation = useNavigation();

  const [loading, setloaing] = useState(false);
  const context = useContext(ThemeContext);
  const manager = context.manager;

  console.log(context);
  console.log(manager);

  onNewWorkPress = () => {
    navigation.navigate('NewWork');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.fab}>
        {manager?<Text>新增工作</Text>:""}
        <FAB
          visible={manager?true:false}
          icon={{ name: 'add', color: 'white' }}
          color="#88baec"
          size='large'
          onPress={onNewWorkPress}
        />      
      </View>
      <Text>Hello World!</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: "3%",
    bottom: "3%"
  }
});

//{loading?<Spinner/>:''}