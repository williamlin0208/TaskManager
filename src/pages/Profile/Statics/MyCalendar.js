import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {Icon} from '@rneui/themed';
import { List } from "native-base";

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MyClaendar = (props) => {

  const [offset, setOffset] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);

  let moment = require("moment");
  let unit = props.unit || 'Month';

  let startNowMonthM = moment().startOf("month");
  let startMonthM = startNowMonthM.clone().add(offset,'month');
  
  let month = Months[Number(startMonthM.format('MM'))-1];
  let year = startMonthM.format('YYYY');
  console.log(month,year);

  onDatesSelected = (dates) => {
    setSelectedDates(dates);
    console.log(dates);
  }

  changeoffset = (num) => {
    setOffset(offset+num);
    console.log(offset,month);
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
      <View style={{flex: 1}}></View>
        <TouchableOpacity onPress={() => {
          changeoffset(-1);
        }}>
          <Icon name='arrow-left' color="#88baec"/>
        </TouchableOpacity>
        <View style={styles.monthyear}>
          <Text style={{fontSize: 14}}>{month+" "+year}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          changeoffset(1);
        }}>
          <Icon name='arrow-right' color="#88baec"/>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[0]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[1]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[2]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[3]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[4]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[5]}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.days}>{Days[6]}</Text>
        </View>
      </View>
      <Body monthStartM={startMonthM} selectedDates={selectedDates} onDatesSelected={onDatesSelected} unit={unit}/>
    </View>
  );
}

export default MyClaendar;

const Body = (props) => {

  const moment = require("moment");

  const monthStartM = props.monthStartM;
  const onDatesSelected = props.onDatesSelected;
  const selectedDates = props.selectedDates;
  const unit = props.unit;

  console.log(monthStartM);

  const Today = moment().format("YYYY-MM-DD");
  const toMonth = monthStartM.format("YYYY-MM-DD");
  console.log(Today[9]);

  let dates = [];

  let tempD = monthStartM.clone().startOf("month").startOf("week");
  let endDay = monthStartM.clone().endOf("month").endOf("week").add(1,"day");

  while(tempD.format("YYYY-MM-DD") != endDay.format("YYYY-MM-DD")){
    dates.push(tempD.format("YYYY-MM-DD"));
    tempD.add(1,"day");
  }

  const _onDatesSelected = (item) => {
    let date = moment(item, 'YYYY-MM-DD');

    let startdatM = date.clone().startOf(unit.toLowerCase());
    let endday = date.clone().endOf(unit.toLowerCase()).add(1,'day').format('YYYY-MM-DD');

    arr = []

    console.log(endday);
    while(startdatM.format("YYYY-MM-DD")!=endday){
      arr.push(startdatM.format("YYYY-MM-DD"));
      startdatM.add(1,'day');
    }
    onDatesSelected(arr);
  }

  return(
    <View style={styles.body}>
      <FlatList
        data={dates}
        scrollEnabled={false}
        numColumns={7}
        renderItem={({item}) => {
          boxstyle = styles.daybox;
          fontstyle = {color: 'black'};

          if(selectedDates.indexOf(item)!=-1){
            boxstyle = styles.selecteddaybox;
            fontstyle = styles.selectedday;
          }else if(item==Today) fontstyle = styles.today;
          else if(item[5]+item[6]!=toMonth[5]+toMonth[6]) fontstyle = styles.outmonthday;

          return (
            <TouchableOpacity style={{flex: 1}} onPress={() => {_onDatesSelected(item)}}>
              <View style={boxstyle}>
                <Text style={fontstyle}>{Number(item[8]+item[9])}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthyear: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  days: {
    fontSize: 12,
    color: '#bbbbbb'
  },
  day: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  daybox: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selecteddaybox: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#88baec',
    borderRadius: 1000

  },
  today: {
    color: '#88baec'
  },
  outmonthday: {
    color: '#cccccc'
  },
  selectedday: {
    color: 'white'
  }
});