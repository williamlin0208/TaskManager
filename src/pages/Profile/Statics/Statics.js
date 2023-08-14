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
      <TouchableOpacity style={styles.mode} onPress={() => {props.OnModeChosen(props.title)}}>
        <View style={styles.press}>
          <Text style={styles.modetext}>
            <Text style={props.title==props.mode?{fontSize: 20, fontWeight: 500}:{}}>{props.title[0]}</Text>
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
  const [selectedDates, setSelectedDates] = useState([moment().format("YYYYY/MM")]);
  const [loading, setLoading] = useState(false);

  console.log(Unit, selectedDates);
  console.log(ModeName);

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
    console.log("mode: ",mode);
    setModeName(mode);
  }

  const OnChoosePress = () => {
    setShowDatePicker(!showDatePicker);
  }


  return (
    <View style={styles.container}>
      <View style={styles.modes}>
        <Mode title={"Salary"} mode={ModeName} OnModeChosen={OnModeChosen} />
        <Mode title={"Attendance"} mode={ModeName} OnModeChosen={OnModeChosen} />
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
        <ScrollView>
          {ModeName=="Salary"?<Salary Unit={Unit}/>:<Attendance Unit={Unit}/>}
        </ScrollView>
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

  const Unit = props.Unit;
  const [salary, setSalary] = useState(8000);
  const [WeeklyGoal, setWeeklyGoal] =  useState(10000);

  let goal=WeeklyGoal;
  if(Unit == "Month"){
    goal=WeeklyGoal*30/7;
  }else if(Unit == "Week"){
    goal=WeeklyGoal;
  }else if(Unit == "Day"){
    goal=WeeklyGoal/7;
  }

  let unacheived=goal-salary;
  return (
    <View style={styles.salary}>

      <Text style={{fontSize: 20, marginTop: 5}}>This {Unit.toLowerCase()}, you've got</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon size={40} name='attach-money'/>
        <Text style={styles.money}>{salary}NTD</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.progressbar}>
          <View style={{flex: salary, height: 12,borderRadius: 100, backgroundColor: '#88baec'}}></View>
          <View style={{flex: unacheived}}></View>
          <Text style={{fontWeight: 'bold', color: '#333333', position: 'absolute', right: 12}}>{(salary/goal*100).toFixed(2)}%</Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>Goal:{goal.toFixed(2)}NTD</Text>
      </View>
    </View>
  );
}

const Attendance = (props) => {

  const Unit = props.Unit;
  const [attTasksNum, setAttTasksNum] = useState(8);
  const [allTasksNum, setAllTasksNum] =  useState(10);

  const absTasksNum=allTasksNum-attTasksNum;

  return (
    <View style={styles.salary}>

      <Text style={{fontSize: 20, marginTop: 5}}>This {Unit.toLowerCase()}, you've done</Text>
      <View style={{flexDirection: 'row'}}>
        <Icon size={40} name='done-all'/>
        <Text style={styles.money}>{attTasksNum} Tasks</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.progressbar}>
          <View style={{flex: attTasksNum, height: 12,borderRadius: 100, backgroundColor: '#88baec'}}></View>
          <View style={{flex: absTasksNum}}></View>
          <Text style={{fontWeight: 'bold', color: '#333333', position: 'absolute', right: 12}}>{(attTasksNum/allTasksNum*100).toFixed(2)}%</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 5}}>
        <Text style={{fontWeight: 'bold'}}>Total: {allTasksNum.toFixed(2)} Tasks</Text>
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