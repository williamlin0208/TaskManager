import React from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';
import { Back } from '../../Utility/buttons';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Salary = (props) => {
  console.log(props);
  unacheived=props.goal-props.salary;
  return (
    <View style={styles.salary}>
      <Text style={{fontSize: 20}}>This {props.mode}, you've got</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon size={40} name='attach-money'/>
        <Text style={styles.money}>{props.salary}NTD</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.progressbar}>
          <View style={{flex: props.salary, height: 12,borderRadius: 100, backgroundColor: '#88baec'}}></View>
          <View style={{flex: unacheived}}></View>
          <Text style={{fontWeight: 'bold', color: '#555555'}}>{(props.salary/props.goal*100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>GOAL:{props.goal}</Text>
      </View>
    </View>
  );
}

const Profile = () => {

  // const navigation=useNavigation();

  let name='William';
  let mode='week';
  let weekly_goal=20000;
  let salary=8000;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.img}></View>
          <View style={styles.name}>
            <Text style={{fontSize: 20}}>{name}</Text>
          </View>
        </View>

        <Salary salary={salary} mode={mode} goal={weekly_goal}/>
        
        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: SCREEN_HEIGHT/50,
    paddingTop: SCREEN_HEIGHT/50,
    backgroundColor: '#fafafa'
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
    backgroundColor: '#cfcfcf',
    borderRadius: SCREEN_HEIGHT/10,
  },
  name: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  salary: {
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#E0F1FD'
  },
  money: {
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight: 'bold',
  },
  progressbar: {
    flex: 10,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#dddddd'
  }
});