import React, {useState, useEffect, useContext}from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from '@rneui/themed';

import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '../../../Shared';

import {get_user_info} from '../../api/get/get_user_info';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


const PersonalInfo = () => {

  const ImgChangeBtn = () => {
    const navigation = useNavigation();
  
    onPress = () => {
      
    };
  
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.change}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Renew</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const context = useContext(ThemeContext);
  const userId = context.userId;
  const identity = context.identity;

  const [name, setName] = useState('User');
  const [title, setTitle] = useState('None');
  const [weeklyGoal, setWeeklyGoal] = useState("0");

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    get_user_info(userId).then((data) => {
      setName(data.name);
      setTitle(data.title);
      setWeeklyGoal(data.weeklyGoal.toString());
    });
  },[]);

  onEditPress = () => {
    setIsEdit(true);
  }
  onDonePress = () => {
    setIsEdit(false);
  }

  const navigation=useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <View style={styles.imgblock}>
              <Image source={require('../../../assets/user-default.png')} style={styles.img}/>
            </View>
            {isEdit ? <ImgChangeBtn/> : null}
          </View>
          <View style={styles.name}>
            <Text style={{fontSize: 12, color: 'grey'}}>{identity}</Text>
            <Text style={{fontSize: 20}}>{name}</Text>
          </View>
          <View style={styles.button}>
              {
              isEdit?
              <TouchableOpacity onPress={onDonePress}>
                <View style={{padding: 5, borderRadius: 5, backgroundColor: '#cccccc'}}>
                  <Text style={{fontWeight: 'bold'}}>Done</Text>
                </View>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={onEditPress}>
                <Icon name='edit' size={35} color='grey' style={styles.funtion}/>
              </TouchableOpacity>
              }
          </View>
        </View>
        <View style={{marginTop: 10, marginHorizontal: 5}}>
          <View>
            <Text style={{fontSize: 18}}>
              <Text style={styles.font}>Title: </Text>
              {title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.font}>Weekly Goal: </Text>
            {isEdit?
            <TextInput
              style={{
                height: 20,
                width: "20%",
                marginStart: "2%",
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                paddingStart: 10,
              }}
              onChangeText={(text) => setWeeklyGoal(text)}
              value={weeklyGoal}
            />
            :
            <Text style={{fontSize: 18}}>{weeklyGoal}</Text>
            }
          </View>
        </View>
        <View style={{height: 10}}></View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfo;

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
  funtion: {
    padding: 5
  },
  imgblock:{
    
    backgroundColor: '#dddddd',
    borderRadius: SCREEN_HEIGHT/10,
  },
  img:{
    height: SCREEN_HEIGHT/10,
    width: SCREEN_HEIGHT/10,
    borderRadius: SCREEN_HEIGHT/10
  },
  name:{
    flex: 1,
    marginLeft: SCREEN_WIDTH/30
  },
  button: {
    flexDirection: 'row'
  },
  change: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#88baec'
  },
  font: {
    color: '#444444',
    fontSize: 18,
    fontWeight: 'bold',
  }
});