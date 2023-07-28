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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { get_done_tasks, get_handled_tasks } from "../../api/get/get_tasks";
import { LoadingBar } from "../../Utility/utility";
import { List } from "native-base";
import {
  NotificationDetail,
  NotificationFail,
  NotificationPass,
} from "../../Utility/buttons";
import { put_work_fail, put_work_pass } from "../../api/put/put";

const TopTab = createMaterialTopTabNavigator();

const Request = () => {
  const [requestList, setRequestList] = useState([]);
  const [handledList, setHandledList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get_done_tasks()
      .then((data) => {
        setRequestList(data);
      })
      .catch((err) => console.log(err));
    get_handled_tasks()
      .then((data) => {
        setHandledList(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const onPassPress = (item) => {
    setIsLoading(true);
    put_work_pass().then((res) => {
      setIsLoading(false);
    });
  };

  const onFailPress = (item) => {
    setIsLoading(true);
    put_work_fail().then((res) => {
      setIsLoading(false);
    });
  };

  return isLoading ? (
    <LoadingBar />
  ) : (
    <TopTab.Navigator initialRouteName="unhandled">
      <TopTab.Screen name="unhandled">
        {(props) => (
          <TaskList
            {...props}
            dataList={requestList}
            onPassPress={onPassPress}
            onFailPress={onFailPress}
          />
        )}
      </TopTab.Screen>
      <TopTab.Screen name="handled">
        {(props) => (
          <TaskList
            {...props}
            dataList={handledList}
            onPassPress={onPassPress}
            onFailPress={onFailPress}
          />
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default Request;

const TaskList = ({ dataList, onFailPress, onPassPress }) => {
  return (
    <FlatList
      data={dataList}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onFailPress={onFailPress}
          onPassPress={onPassPress}
        />
      )}
    />
  );
};

const ListItem = ({ item, onFailPress, onPassPress }) => {
  const navigation = useNavigation();

  const [isFolded, setIsFolded] = useState(true);

  const onDetailPress = () => {
    navigation.navigate("MyTasksTaskDetail", {
      task: item,
      from: "requests",
    });
  };

  const bottomTime = item.statusTime.format("MM-DD HH:mm");

  return (
    <View
      style={
        isFolded ? styles.listContainerFolded : styles.listContainerUnfolded
      }
    >
      <View style={styles.listHead}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{item.workerName}</Text>
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{item.title}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {item.status == "done" ? (
            <Ionicons name="help-circle-outline" size={40} />
          ) : item.status == "pass" ? (
            <Ionicons
              name="checkmark-done-circle-outline"
              size={40}
              color="green"
            />
          ) : item.status == "fail" ? (
            <Ionicons name="close-circle-outline" size={40} color="red" />
          ) : (
            <View />
          )}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NotificationDetail onDetailPress={onDetailPress} />
        </View>
      </View>
      {!isFolded ? (
        <View style={styles.listMid}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <NotificationFail onFailPress={() => onFailPress(item)} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <NotificationPass onPassPress={() => onPassPress(item)} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.listTail}>
        {item.status == "done" ? (
          <TouchableOpacity
            style={{ width: "100%", flexDirection: "row" }}
            onPress={() => setIsFolded(!isFolded)}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {isFolded ? "Unfold" : "Fold"}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                finish time: {bottomTime}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                handle time: {bottomTime}
              </Text>
            </View>
          </View>
        )}
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
  listContainerFolded: {
    flexDirection: "column",
    height: 80,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  listContainerUnfolded: {
    flexDirection: "column",
    height: 130,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  listHead: {
    flexDirection: "row",
    height: 60,
  },
  listTail: {
    flexDirection: "column",
    height: 20,
    borderBottomWidth: 1,
    justifyContent: "flex-end",
  },
  listMid: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
});
