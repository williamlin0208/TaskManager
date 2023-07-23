import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

import {Detail, Accept, HandIn} from '../../Utility/buttons';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export const TaskItem = (props) => {
  onAcceptTaskPress = () => {
    props.onAcceptTaskPress(props.task)
  }

  onHandInPress = () => {
    
  }

  buttons=()=>{
    if(props.page=='Home'){
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.button}>
            <Detail task={props.task}/>
          </View>
          <View style={styles.button}>
            <Accept task={props.task} onAcceptTaskPress={onAcceptTaskPress}/>
          </View>
        </View>
      );
    }else if(props.page=='Tasks' || props.page=='MyTasks'){
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.button}>
            <Detail task={props.task} onHandInPress={onHandInPress}/>
          </View>
          <View style={styles.button}>
            <HandIn task={props.task} onHandInPress={onHandInPress}/>
          </View>
        </View>
      );
    }
  }
  if(props.page=='Home'){
    return (
        <View style={styles.block}>
          <View style={styles.title}>
            <Text>{props.task.title}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bold}>Date:</Text>
            <View style={styles.dscp}>
              <Text>{props.task.startTime.split(' ')[0].split('-')[0]} {props.task.startTime.split(' ')[0].split('-')[1]}/{props.task.startTime.split(' ')[0].split('-')[2]}</Text>
            </View>
  
            <Text style={styles.bold}>Time:</Text>
            <View style={styles.dscp}>
              <Text>{props.task.startTime.split(' ')[1].split(':')[0]}:{props.task.startTime.split(' ')[1].split(':')[1]}~{props.task.endTime.split(' ')[1].split(':')[0]}:{props.task.endTime.split(' ')[1].split(':')[1]}</Text>
            </View>
            
            <Text style={styles.bold}>Reward:</Text>
            <View style={styles.dscp}>
              <Text>{props.task.reward}NTD</Text>
            </View>
            {buttons()}
          </View>
        </View>
    );
  }else if(props.page=='Tasks'){
    return (
      <View style={styles.block}>
        <View style={styles.title}>
          <Text>{props.task.title}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bold}>Time:</Text>
          <View style={styles.dscp}>
            <Text>{props.task.startTime.split(' ')[1].split(':')[0]}:{props.task.startTime.split(' ')[1].split(':')[1]}~{props.task.endTime.split(' ')[1].split(':')[0]}:{props.task.endTime.split(' ')[1].split(':')[1]}</Text>
          </View>

          <Text style={styles.bold}>Reward:</Text>
          <View style={styles.dscp}>
            <Text>{props.task.reward}NTD</Text>
          </View>
          {buttons()}
        </View>
      </View>
    );
  }else if(props.page=='MyTasks'){
    return (
      <View style={styles.strip}>
        <View style={styles.title}>
          <Text>{props.task.title}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.indent}>
            <Text>
              <Text style={styles.bold}>Date:</Text>
              {props.task.startTime.split(' ')[0].split('-')[0]} {props.task.startTime.split(' ')[0].split('-')[1]}/{props.task.startTime.split(' ')[0].split('-')[2]}
            </Text>
            
            <Text>
              <Text style={styles.bold}>Time:</Text>
              {props.task.startTime.split(' ')[1].split(':')[0]}:{props.task.startTime.split(' ')[1].split(':')[1]}~{props.task.endTime.split(' ')[1].split(':')[0]}:{props.task.endTime.split(' ')[1].split(':')[1]}
            </Text>
            
            <Text>
              <Text style={styles.bold}>Reward:</Text>
              {props.task.reward}NTD
            </Text>
          </View>
        
          {buttons()}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  block:{
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#BADBFF',
    width: SCREEN_WIDTH/3-16,
  },
  strip:{
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#BADBFF',
  },
  title:{
    flex: 1,
    paddingBottom: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center'
  },
  body:{
    flex: 4,
    marginTop: 5
  },
  indent: {
    alignItems: 'center'
  },
  button:{
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  },
  bold: {
    fontWeight: 500,
  },
  dscp: {
    paddingLeft: SCREEN_WIDTH/60
  }
});