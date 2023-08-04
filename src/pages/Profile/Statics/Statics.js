import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from '@react-navigation/core';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Icon} from '@rneui/themed';

import MyClaendar from './MyCalendar';

const Statics = () => {
  const navigation=useNavigation();
  let moment = require("moment");

  const Mode = (props) => {
    return (
      <TouchableOpacity style={styles.mode} onPress={props.onPress}>
        <View style={styles.press}>
          <Text style={styles.modetext}>
            <Text>{props.title[0]}</Text>
            {props.title.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const UnitList = [
    { label: "Month", value: "Month" },
    { label: "Week", value: "Week" },
    { label: "Day", value: "Day" }
  ];
  
  const [ModeName, setModeName] = useState("Salary");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [Unit, setUnit] = useState("Month");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState(moment().format("YYYYY/MM"));
  const [loading, setLoading] = useState(false);

  const [WeeklyGoal, setWeeklyGoal] =  useState(10000);

  console.log(Unit, selectedDates);
  console.log(ModeName);

  let goal=WeeklyGoal;
  if(Unit == "Month"){
    goal=WeeklyGoal*30/7;
  }else if(Unit == "Week"){
    goal=WeeklyGoal;
  }else if(Unit == "Day"){
    goal=WeeklyGoal/7;
  }

  useEffect(() => {
    let value = '';
    if(Unit=="Month"){
      value=moment().format("YYYY/MM");
    }else if(Unit=="Week"){
      value=`${moment().startOf('week').format("YYYYY/MM/DD")}~${moment().endOf('week').format("YYYYY/MM/DD")}`;
    }else if(Unit=="Day"){
      value=moment().format("YYYY/MM/DD");
    }
    setSelectedDates(value);
    setShowDatePicker(false);
  },[Unit]);

  const OnModeChosen = (mode) => {
    setModeName(mode);
  }

  const OnChoosePress = () => {
    setShowDatePicker(!showDatePicker);
  }


  return (
    <View style={styles.container}>
      <View style={styles.modes}>
        <Mode title={"Salary"} mode={ModeName} onPress={() => {OnModeChosen("Salary");}} />
        <Mode title={"Attendance"} mode={ModeName} onPress={() => {OnModeChosen("Attendance");}} />
      </View>
      <View style={styles.datecontainer}>
        <View style={{zIndex: 10}}>
          <DropDownPicker
            open={dropDownOpen}
            setOpen={setDropDownOpen}
            value={Unit}
            setValue={setUnit}
            items={UnitList}
          />
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
          <View>
            <Text style={styles.datefont}>
              {selectedDates}
          </Text>
          </View>
          <View style={{width: 10}}></View>
          <ChooseButton mode={showDatePicker?'Done':'Select'} onPress={OnChoosePress}/>
        </View>
        <View style={{zIndex: 5}}>
          <View style={{position: "absolute", width: '90%'}}>
            {showDatePicker && <MyClaendar unit={Unit} setSelectedDates={setSelectedDates}/>}
          </View>
        </View>
        {ModeName=="Salary"?<Salary salary={8000} mode={Unit} goal={goal}/>:<View></View>}
      </View>
    </View>
  );
};

export default Statics;

ChooseButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5, backgroundColor: '#aaaaaa'}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {props.mode}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Salary = (props) => {

  let unacheived=props.goal-props.salary;
  return (
    <View style={styles.salary}>


      <Text style={{fontSize: 20, marginTop: 5}}>This {props.mode.toLowerCase()}, you've got</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon size={40} name='attach-money'/>
        <Text style={styles.money}>{props.salary}NTD</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.progressbar}>
          <View style={{flex: props.salary, height: 12,borderRadius: 100, backgroundColor: '#88baec'}}></View>
          <View style={{flex: unacheived}}></View>
          <Text style={{fontWeight: 'bold', color: '#333333', position: 'absolute', right: 12}}>{(props.salary/props.goal*100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>Goal:{props.goal.toFixed(2)}NTD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  modes: {
    flexDirection: 'row',
    height: 50
  },
  mode: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    backgroundColor: 'white'
  },
  datecontainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  datefont: {
    fontSize: 16,
    fontFamily: "SpaceMono_700Bold",
    color: '#555555'
  },
  salary: {
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#E0F1FD'
  },
  progressbar: {
    flex: 10,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#bbbbbb'
  },
  money: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
  }
});