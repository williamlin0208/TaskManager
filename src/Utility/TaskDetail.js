import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Accept } from "./buttons";

const TaskDetail = ({ route }) => {
  const navigation = useNavigation();
  const { task, from } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          marginHorizontal: 30,
          marginTop: 30,
        }}
      >
        <Text style={{ fontSize: 25, alignSelf: "center", fontWeight: "bold" }}>
          Description
        </Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Title: {task.title}
        </Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Day: {task.startTime.format("MM-DD")}
        </Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Time: {task.startTime.format("HH:mm")}~{task.endTime.format("HH:mm")}
        </Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Reward: {task.reward}
        </Text>
      </View>

      <DetailContent />

      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity style={{ width: "30%" }}>
          <Accept />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskDetail;

const DetailContent = () => {
  return (
    <View style={styles.detail}>
      <Text style={{ fontSize: 25, alignSelf: "center", fontWeight: "bold" }}>
        Remarks
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: "#d1d1d1",
          marginTop: 10,
          borderRadius: 5,
        }}
      ></View>
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
  detail: {
    flex: 3,
    marginHorizontal: 50,
  },
});
