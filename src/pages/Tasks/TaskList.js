import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import TaskItem from "../../Utility/TaskItem";

const TaskList = (props) => {
  return (
    <View style={{ marginTop: 5, alignItems: "center" }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={props.tasks}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <TaskItem
              form={"block"}
              page="Tasks"
              state={item.status}
              dayMode={"none"}
              task={item}
            />
          );
        }}
      />
    </View>
  );
};

export default TaskList;
