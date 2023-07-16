import React,{useState, useEffect, useContext} from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {FAB} from '@rneui/themed';
import {Spinner} from 'native-base';
import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '../../../Shared';
import TaskItem from '../Tasks/TaskItem';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Tasks=[
  {
    title: '搬東西',
    day: 'Tues',
    time: '12:00~16:00',
    fee: '2000'
  },
  {
    title: '買ssssssssssssss咖啡',
    day: 'Thur',
    time: '13:00~13:30',
    fee: '100'
  },
  {
    title: '買咖啡',
    day: 'Thur',
    time: '13:00~13:30',
    fee: '100'
  },
  {
    title: '買咖啡',
    day: 'Thur',
    time: '13:00~13:30',
    fee: '100'
  },{
    title: '搬東西',
    day: 'Tues',
    time: '12:00~16:00',
    fee: '2000'
  }
];

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
    <View style={{ flex: 1}}>
      <View style={{flex: 1}}> 
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10, padding: 3}}>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Tasks}
            renderItem={({ item }) => { return <View style={styles.task}><TaskItem page='Home' task={item}/></View>; }}
          />
        </ScrollView>
      </View>
      <View style={styles.fab}>
        <FAB
          visible={manager?true:false}
          icon={{ name: 'add', color: 'white' }}
          color="#88baec"
          size='large'
          onPress={onNewWorkPress}
        />
        {manager?<Text style={{marginTop: 10, color: '#444444'}}>Add New Task</Text>:""}   
      </View>
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
  },
  task:{
    width: SCREEN_WIDTH/3-2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

//{loading?<Spinner/>:''}