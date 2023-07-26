import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";

import { get_staff_attendance } from "../../api/get/get_staff_attendance.js";
import { LoadingBar } from "../../Utility/utility";

const StaffAttendance = () => {
  const navigation = useNavigation();

  const [StaffAttendanceList, setStaffAttendanceList] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [direction, setDirection] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    setIsLoaing(true);
    get_staff_attendance().then((data) => {
      data = data.map((x) => {
        x.percent = ((x.pass / (x.total - x.absent)) * 100).toFixed(2);
        return x;
      });
      setStaffAttendanceList(data);
      setIsLoaing(false);
    });
  }, []);

  useEffect(() => {
    if (direction == "") return;
    setStaffAttendanceList(
      direction == "desc"
        ? StaffAttendanceList.sort((a, b) => b[sortKey] - a[sortKey])
        : StaffAttendanceList.sort((a, b) => a[sortKey] - b[sortKey])
    );
    setRender(!render); //force re-render
  }, [sortKey, direction]);

  onHeadPress = (btnName) => {
    if (sortKey == "") {
      setSortKey(btnName);
      setDirection("desc");
    } else if (sortKey == btnName) {
      setDirection(direction == "asc" ? "desc" : "asc");
    } else {
      setSortKey(btnName);
      setDirection("desc");
    }
  };

  return isLoading ? (
    <LoadingBar />
  ) : (
    <View style={styles.container}>
      <Sheet
        data={StaffAttendanceList}
        setData={setStaffAttendanceList}
        sortKey={sortKey}
        direction={direction}
        onHeadPress={onHeadPress}
      />
    </View>
  );
};

export default StaffAttendance;

const Sheet = ({ data, sortKey, direction, onHeadPress }) => {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Head onHeadPress={onHeadPress} sortKey={sortKey} direction={direction} />
      <View style={{ flex: 15 }}>
        <FlatList
          contentContainerStyle={{ backgroundColor: "white" }}
          data={data}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>
    </View>
  );
};

const Head = ({ onHeadPress, sortKey, direction }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        marginHorizontal: 2,
        marginTop: 10,
      }}
    >
      <View style={styles.head}>
        <Text>Name</Text>
      </View>
      <TouchableOpacity
        style={styles.head}
        onPress={() => onHeadPress("total")}
      >
        <Text>Total</Text>
        {sortKey == "total" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "total" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.head} onPress={() => onHeadPress("pass")}>
        <Text>Pass</Text>
        {sortKey == "pass" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "pass" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.head} onPress={() => onHeadPress("fail")}>
        <Text>Fail</Text>
        {sortKey == "fail" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "fail" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.head}
        onPress={() => onHeadPress("leave")}
      >
        <Text>Leave</Text>
        {sortKey == "leave" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "leave" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.head}
        onPress={() => onHeadPress("absent")}
      >
        <Text>Absent</Text>
        {sortKey == "absent" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "absent" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.head}
        onPress={() => onHeadPress("percent")}
      >
        <Text>%</Text>
        {sortKey == "percent" && direction == "asc" ? (
          <Ionicons name="chevron-up-outline" size={20} />
        ) : sortKey == "percent" && direction == "desc" ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <View />
        )}
      </TouchableOpacity>
    </View>
  );
};

const ListItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        marginVertical: 15,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.userName}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.total}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.pass}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.fail}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.leave}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.absent}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{item.percent}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: "10%",
  },
  head: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 5,
    flexDirection: "column",
    height: "100%",
  },
});
