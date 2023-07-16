          
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';



const Back = () => {

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
export default Back;

const styles = StyleSheet.create({
  back: {
    borderRadius: 1000000,
    backgroundColor: '#88baec'
  },
});