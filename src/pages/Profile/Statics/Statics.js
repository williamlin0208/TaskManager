import React, {useState} from 'react';
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

  
  
  let date = '';
  if(Unit == "Month"){
    date = <Month moment={moment}/>
  }else if(Unit == "Week"){
    date = <Week moment={moment}/>
  }else if(Unit == "Day"){
    date = <Day moment={moment}/>
  }

  OnDonePress = () => {
    setModeName("Salary");
  };
  OnUndonePress = () => {
    setModeName("Attendance");
  };

  return (
    <View style={styles.container}>
      <View style={styles.modes}>
        <Mode title={"Salary"} mode={ModeName} onPress={OnDonePress} />
        <Mode title={"Attendance"} mode={ModeName} onPress={OnUndonePress} />
      </View>
        <View style={styles.datecontainer}>
          <DropDownPicker
            open={dropDownOpen}
            setOpen={setDropDownOpen}
            value={Unit}
            setValue={setUnit}
            items={UnitList}
          />
          {date}
          {showDatePicker && <MyClaendar unit={Unit}/>}
        </View>
    </View>
  );
};

export default Statics;

const Month = (props) => {
  let monthM = props.moment();
  let month = monthM.format("YYYYY/MM");

  return (
    <View >
      <Text style={styles.datefont}>
        {month}
      </Text>
    </View>
  );
}

const Week = (props) => {
  let startOfWeekM = props.moment().startOf("week");
  let endOfWeekM = props.moment().endOf("week");
  return (
    <View>
      <Text style={styles.datefont}>
        {startOfWeekM.format("YYYYY/MM/DD")}~{endOfWeekM.format("YYYYY/MM/DD")}
      </Text>
    </View>
  );
}

const Day = (props) => {
  let DayM = props.moment().format("YYYYY/MM/DD");

  return (
    <View>
      <Text style={styles.datefont}>
        {DayM}
      </Text>
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
    fontSize: 18,
    fontFamily: "SpaceMono_700Bold",
    color: '#555555'
  }
});