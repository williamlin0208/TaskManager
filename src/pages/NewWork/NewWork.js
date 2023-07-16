import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';


import {Back} from '../../buttons/buttons'

const NewWork = () => {

  const navigation=useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Back/>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>New work</Text>
      </View>
    </View>
  );
};

export default NewWork;

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: "5%",
    marginTop: "10%"
  }
});