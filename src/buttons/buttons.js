          
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';

export const Back = () => {

  const navigation = useNavigation();

  onBackPress = () => {
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={onBackPress}>
      <View style={styles.back}>
        <Icon size={40} name='arrow-left' color="white"/>
      </View>
    </TouchableOpacity>
  );
};

export const Detail = (props) => {

  const navigation = useNavigation();

  onDetailPress = () => {
    navigation.navigate("TaskDetail",{task: props.task})
  }

  return (
    <TouchableOpacity onPress={onDetailPress}>
      <View style={styles.detail}>
        <Text>詳情</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Accept = (props) => {

  const navigation = useNavigation();

  onDetailPress = () => {
  }

  return (
    <TouchableOpacity onPress={onDetailPress}>
      <View style={styles.detail}>
        <Text>接受</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    borderRadius: 1000000,
    backgroundColor: '#88baec'
  },
  detail: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  accept:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  }
});