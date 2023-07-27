import React from "react";
import { useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import Bulletin from "./Bulletin";
import NewWork from "./NewWork";
import Notification, { NotificationDatail } from "./Notification";
import Settings from "./Setting";
import TaskDetail from "../../Utility/TaskDetail";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Bulletin">
      <Stack.Screen
        name="Bulletin"
        component={Bulletin}
        options={() => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={{ maxHeight: 25, maxWidth: 25, marginEnd: 3 }}
            >
              <Ionicons name="settings-outline" size={25} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={{ maxHeight: 25, maxWidth: 25, marginStart: 3 }}
            >
              <Ionicons name="notifications-outline" size={25} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="NewWork" component={NewWork} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="HomeTaskDetail" component={TaskDetail} />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDatail}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
