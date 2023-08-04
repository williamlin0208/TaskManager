import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from '@react-navigation/core';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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

  const [showDatePicker, setShowDatePicker] = useState(true);
  const [selectedDates, setSelectedDates] = useState(moment().format("YYYYY/MM"));

  console.log(Unit, selectedDates);
  console.log(ModeName);
  console.log("selectedDates:", selectedDates);

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
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View >
              <Text style={styles.datefont}>
                {selectedDates}
              </Text>
            </View>
            <ChooseButton mode={showDatePicker?'Done':'Select'} onPress={OnChoosePress}/>
          </View>
          {showDatePicker && <MyClaendar unit={Unit} setSelectedDates={setSelectedDates}/>}
        </View>
    </View>
  );
};

export default Statics;

ChooseButton = (props) => {
  return (
    <TouchableOpacity style={{marginLeft: 10}} onPress={props.onPress}>
      <View style={{justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5, backgroundColor: '#aaaaaa'}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {props.mode}
        </Text>
      </View>
    </TouchableOpacity>
  )
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
    fontSize: 18,
    fontFamily: "SpaceMono_700Bold",
    color: '#555555'
  }
});