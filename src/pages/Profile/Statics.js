import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from '@react-navigation/core';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const Statics = () => {

  const navigation=useNavigation();

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
  const [selectedDates, setSelectedDates] = useState('');
  console.log(Unit, selectedDates);

  const DatePicker = (props) => {
    if(props.unit == "Month"){
      return (
        <Calendar
          onDayPress={day => {
            console.log(day);
            setSelectedDates(`${day.dateString}`);
          }}
          markedDates={{
            [selectedDates]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
        />
      );
    }else if(props.unit == "Month"){
      return (
        <Calendar
          onDayPress={day => {
            console.log(day);
            setSelectedDates(`${day.dateString}`);
          }}
          markedDates={{
            [selectedDates]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
        />
      );
    }else if(props.unit == "Day"){
      return (
        <Calendar
          onDayPress={day => {
            console.log(day);
            setSelectedDates(`${day.dateString}`);
          }}
          markedDates={{
            [selectedDates]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
        />
      );
    }
  };

  let moment = require("moment");
  
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
      <View style = {{flex: 1}}></View>
      <View style = {{flex: 10, marginHorizontal: "5%", zIndex: 100}}>
        <DropDownPicker
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          value={Unit}
          setValue={setUnit}
          items={UnitList}
        />
        <View style={{zIndex: 1}}>
          {showDatePicker && <DatePicker unit={Unit}/>}
        </View>
        {date}
      </View>
      <View style = {{flex: 1}}></View>
      </View>
    </View>
  );
};

export default Statics;

const Month = (props) => {
  let startOfMonthM = props.moment().startOf("month");
  let endOfMonthM = props.moment().endOf("month");
  return (
    <View>
      <Text>
        {startOfMonthM.format("YYYYY/MM")}
      </Text>
    </View>
  );
}

const Week = (props) => {
  let startOfWeekM = props.moment().startOf("week");
  let endOfWeekM = props.moment().endOf("week");
  return (
    <View>
      <Text>
        {startOfWeekM.format("YYYYY/MM/DD")}~{endOfWeekM.format("YYYYY/MM/DD")}
      </Text>
    </View>
  );
}

const Day = (props) => {
  let DayM = props.moment().format("YYYYY/MM/DD");

  return (
    <View>
      <Text>
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
    flex: 1
  }
});