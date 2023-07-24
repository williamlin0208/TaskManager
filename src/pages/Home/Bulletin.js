import React,{useState, useEffect, useContext} from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {FAB} from '@rneui/themed';
import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '../../../Shared';
import TaskItem from '../../Utility/TaskItem';
import {accept_work, loadBulletin} from '../../api';
import { LoadingBar } from '../../Utility/utility';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const Bulletin = () => {

  const navigation = useNavigation();

  const [isLoading, setIsLoaing] = useState(false);
  const [Tasks, setTasks] = useState([]); 
  const context = useContext(ThemeContext);
  const manager = context.manager;

  useEffect(() => {
    loadBulletin().then((data) => {setTasks(data)})
  },[])

  console.log(context);

  onNewWorkPress = () => {
    navigation.navigate('NewWork');
  }

  onAcceptTaskPress = (task) => {
    setIsLoaing(true);
    accept_work(task).then((res) => {
      setIsLoaing(false);
    });
  }

  return (
    isLoading ? 
      <LoadingBar />
    :
      <View style={{ flex: 1, backgroundColor: '#fafafa'}}>
        <View style={{flex: 1}}> 
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10, padding: 3}}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: 'flex-end',
              }}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={Tasks}
              renderItem={({ item }) => { return <View style={styles.task}><TaskItem page='Home' task={item} onAcceptTaskPress={onAcceptTaskPress}/></View>; }}
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

export default Bulletin;

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