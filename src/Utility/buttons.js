          
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
        <Text>內容</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Accept = (props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={props.onAcceptTaskPress}>
      <View style={styles.detail}>
        <Text>接取</Text>
      </View>
    </TouchableOpacity>
  );
};

export const HandIn = (props) => {

  const navigation = useNavigation();

  onHandInPress = () => {
    navigation.navigate("TaskDetail",{task: props.task})
  }

  return (
    <TouchableOpacity onPress={props.onHandInPress}>
      <View style={styles.detail}>
        <Text>提交</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PostButton = (props) => {
  const navigation = useNavigation();

  onPostPress = () => {
    props.onPostPress()
  }

  return (
    <TouchableOpacity onPress={onPostPress}>
      <View style={styles.postContainer}>
        <Text style={styles.postText}>Post</Text>
      </View>
    </TouchableOpacity>
  )
}

export const NotificationDetail = ({onDetailPress}) => {

  return(
    <TouchableOpacity style={{borderRadius:10,borderWidth:1,borderColor:'black',justifyContent:'center',alignItems:'center'}}
                      onPress={onDetailPress}>
      <Text style={{paddingHorizontal:5,paddingVertical:3}}>Detail</Text>
    </TouchableOpacity>
  )
}

export const NotificationPass = ({onPassPress}) => {

  return(
    <TouchableOpacity style={{borderRadius:10,borderWidth:1,borderColor:'black',backgroundColor:'green',width:'15%',justifyContent:'center',alignItems:'center',marginHorizontal:'15%'}}
                      onPress={onPassPress}>
      <Text style={{paddingHorizontal:5,paddingVertical:3,color:'white'}}>Pass</Text>
    </TouchableOpacity>
  )
}

export const NotificationFail = ({onFailPress}) => {

  return(
    <TouchableOpacity style={{borderRadius:10,borderWidth:1,borderColor:'black',backgroundColor:'red',width:'15%',justifyContent:'center',alignItems:'center',marginHorizontal:'15%'}}
                      onPress={onFailPress}>
      <Text style={{paddingHorizontal:5,paddingVertical:3,color:'white'}}>Fail</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  back: {
    borderRadius: 100,
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
  },
  postContainer:{
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500'
  },
  postText: { fontSize:30,
              color:'white',
              paddingHorizontal: 50,
              paddingVertical: 13
  }
});