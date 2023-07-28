import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Tasks from "./Tasks";
import TaskDetail from "../../Utility/TaskDetail";

const Stack = createNativeStackNavigator();

const TasksIndex = () => {
  return (
    <Stack.Navigator initialRouteName="Tasks">
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TasksTaskDetail"
        component={TaskDetail}
        options={{ title: "Task Detail" }}
      />
    </Stack.Navigator>
  );
};

export default TasksIndex;
