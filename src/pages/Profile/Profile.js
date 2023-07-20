import React from 'react';
import {Dimensions, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


const Profile = () => {

  // const navigation=useNavigation();

  let Name='William';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.img}></View>
        <View style={styles.name}>
          <Text>{Name}</Text>
        </View>
      </View>
      
      <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    flex: 1,
    flexDirection: 'row'
  },
  img:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
    margin: SCREEN_HEIGHT/50,
    backgroundColor: '#aaaaaa',
    borderRadius: '50%'
  },
  name: {
    flex: 1,
    justifyContent: 'center',
  }
});