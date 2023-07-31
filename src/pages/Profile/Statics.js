import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from '@react-navigation/core';

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

  const searchUnitList = [
    { label: "Month", value: "Month" },
    { label: "Week", value: "Week" },
    { label: "Day", value: "Day" }
  ];

  const [ModeName, setModeName] = useState("Salary");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [searchUnit, setSearchUnit] = useState("Month");
  console.log(searchUnit);

  let moment = require("moment");
  
  let date = '';
  if(searchUnit == "Month"){
    date = <Month moment={moment}/>
  }else if(searchUnit == "Week"){
    date = <Week moment={moment}/>
  }else if(searchUnit == "Day"){
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
      <View style = {{flex: 10, marginHorizontal: "10%"}}>
        <View>
          <DropDownPicker
            open={dropDownOpen}
            setOpen={setDropDownOpen}
            value={searchUnit}
            setValue={setSearchUnit}
            items={searchUnitList}
          />
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
  console.log(startOfMonthM, endOfMonthM);
}

const Week = (props) => {
  let startOfWeekM = props.moment().startOf("week");
  let endOfWeekM = props.moment().endOf("week");
}

const Day = (props) => {
  let startOfDayM = props.moment().startOf("day");
  let endOfDayM = props.moment().endOf("day");
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