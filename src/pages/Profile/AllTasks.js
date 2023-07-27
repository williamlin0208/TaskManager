import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const AllTasks = () => {
  const navigation = useNavigation();

  const searchByList = [
    { label: "name", value: "Username" },
    { label: "title", value: "title" },
    { label: "date", value: "date" },
    { label: "reward", value: "reward" },
  ];

  const [searchBy, setSearchBy] = useState("Username");
  const [searchKey, setSearchKey] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <SearchGroup
        searchByList={searchByList}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        date={date}
        setDate={setDate}
      />
      <View style={{ paddingHorizontal: "2%" }}>
        <FlatList />
      </View>
    </View>
  );
};

export default AllTasks;

const SearchGroup = ({
  searchByList,
  searchBy,
  setSearchBy,
  searchKey,
  setSearchKey,
  date,
  setDate,
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 15,
        paddingHorizontal: "2%",
        alignItems: "center",
      }}
    >
      <View style={{ width: "28%" }}>
        <DropDownPicker
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          value={searchBy}
          setValue={setSearchBy}
          items={searchByList}
        />
      </View>
      {searchBy == "date" ? (
        <TouchableOpacity
          onPress={() => setDatePickerOpen(!datePickerOpen)}
          style={{
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#007AFF", fontSize: 24 }}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          style={{
            height: 35,
            width: "70%",
            marginStart: "2%",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 40,
            paddingStart: 10,
          }}
          onChangeText={(text) => setSearchKey(text)}
          value={searchKey}
          placeholder="search"
        />
      )}
      <TextInput />

      <DateTimePicker
        isVisible={datePickerOpen}
        mode="date"
        date={date}
        onConfirm={(time) => {
          setDate(time);
          setDatePickerOpen(false);
        }}
        onCancel={() => setDatePickerOpen(false)}
        textColor="#007AFF"
      />
    </View>
  );
};

const ListItem = ({ task, onDetailPress }) => {
  return (
    <View style={styles.listHead}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{task.userName}</Text>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text>{task.work.title}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {task.review == 0 ? (
          <Ionicons name="help-circle-outline" size={40} />
        ) : task.review == 1 ? (
          <Ionicons
            name="checkmark-done-circle-outline"
            size={40}
            color="green"
          />
        ) : task.review == -1 ? (
          <Ionicons name="close-circle-outline" size={40} color="red" />
        ) : (
          <View />
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NotificationDetail onDetailPress={onDetailPress} />
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
  listHead: {
    flexDirection: "row",
    height: 60,
  },
});
