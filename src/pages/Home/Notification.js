import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../../Shared';
import { get_notification_cancel_list, get_notification_assign_list, get_notification_done_list } from '../../api';
import { NotificationDetail, NotificationPass, NotificationFail } from '../../Utility/buttons';

const TopTab = createMaterialTopTabNavigator();

const Notification = () => {

  const navigation = useNavigation();

  const context = useContext(ThemeContext);
  const manager = context.manager;

  return (
    manager ? 
    <TopTab.Navigator initialRouteName='assign'>
      <TopTab.Screen name='cancel'>
        {(props) => <NotificationPage {...props} type='cancel'/>}
      </TopTab.Screen>
      <TopTab.Screen name='assign'>
        {(props) => <NotificationPage {...props} type='assign'/>}
      </TopTab.Screen>
      <TopTab.Screen name='done'>
        {(props) => <NotificationPage {...props} type='done'/>}
      </TopTab.Screen>
    </TopTab.Navigator>

    :

    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification</Text>
      </View>
    </View>
  );
};

export default Notification;

const NotificationPage = ({type}) => {

  const [dataList, setDataList] = useState([]);

  if (type == 'cancel') useEffect(() => {
    get_notification_cancel_list().then((data_list) => setDataList(data_list));
  },[]); 
  else if (type == 'assign') useEffect(() => {
    get_notification_assign_list().then((data_list) => setDataList(data_list));
  },[]);
  else if (type == 'done') useEffect(() => {
    get_notification_done_list().then((data_list) => setDataList(data_list));
  },[]);

  return(
    <View>
      <FlatList style={{marginHorizontal:'5%',width:'90%'}}
                data={dataList}
                renderItem={({item}) => {return <NotificationListItem item={item} type={type}/>}}
      />
    </View>
  )
}

const NotificationListItem = ({item, type}) => {
  const navigation = useNavigation();

  const iconName = item.status == 'leave' ? 'close-circle-outline' :
                   item.status == 'due' ? 'alarm-outline' : 
                   item.status == 'accept' ? 'arrow-forward-outline' :
                   item.status == 'done' ? 'checkmark-done-outline' : '';

  const onDetailPress = () => {
    navigation.navigate('NotificationDetail',{info:item,type:type})
  }

  const onPassPress = () => {

  }

  const onFailPress = () => {

  }

  return(
    type != 'done' ?
    <View style={[styles.listItem,{flexDirection:'row',height:60}]}>
      <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
        <Ionicons name={iconName} size={'50%'}/>
      </View>
      <Text style={{width:'70%'}}>{
        item.status == 'leave' ? `${item.userName}取消了"${item.work.title}"` : 
        item.status == 'due' ? `${item.userName}未能及時完成"${item.work.title}"` : 
        item.status == 'accept' ? `${item.userName}接取了"${item.work.title}"` :
        item.status == 'done' ? `${item.userName}完成了"${item.work.title}"` : ``
      }
      </Text>
      <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
        <NotificationDetail onDetailPress={onDetailPress}/>
      </View>
    </View>
    
    :

    <View style={[styles.listItem,{flexDirection:'column',height:100}]}>
      <View style={{flexDirection:'row',height:60}}>
        <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
          <Ionicons name={iconName} size={'50%'}/>
        </View>
        <Text style={{width:'70%'}}>{
          item.status == 'leave' ? `${item.userName}取消了"${item.work.title}"` : 
          item.status == 'due' ? `${item.userName}未能及時完成"${item.work.title}"` : 
          item.status == 'accept' ? `${item.userName}接取了"${item.work.title}"` :
          item.status == 'done' ? `${item.userName}完成了"${item.work.title}"` : ``
        }
        </Text>
        <View style={{width:'15%',justifyContent:'center',alignItems:'center'}}>
          <NotificationDetail onDetailPress={onDetailPress}/>
        </View>
      </View>
      <View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center'}}>
        <NotificationFail onFailPress={onFailPress}/>
        <NotificationPass onPassPress={onPassPress}/>
      </View>
    </View>
  )
}


export const NotificationDatail = ({route}) => {
  const {info,type} = route.params

  return(
    <View>
      
    </View>
  )
}

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
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor:'white',
    alignItems:'center',
  }
});