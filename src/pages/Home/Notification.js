import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ThemeContext } from "../../../Shared";
import {
  NotificationDetail,
  NotificationPass,
  NotificationFail,
} from "../../Utility/buttons";
import { LoadingBar } from "../../Utility/utility";
import { ScrollView } from "native-base";

import {
  get_claimed_tasks,
  get_not_able_to_finish_tasks,
  get_done_tasks,
} from "../../api/get/get_tasks";
import { put_work_pass, put_work_fail } from "../../api/put/put";

const TopTab = createMaterialTopTabNavigator();

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Notification = () => {
  const context = useContext(ThemeContext);
  const identity = context.identity;

  return identity == "Manager" ? (
    <TopTab.Navigator initialRouteName="claimed">
      <TopTab.Screen name="cancel">
        {(props) => <NotificationPage {...props} type="cancel" />}
      </TopTab.Screen>
      <TopTab.Screen name="claimed">
        {(props) => <NotificationPage {...props} type="claimed" />}
      </TopTab.Screen>
      <TopTab.Screen name="done">
        {(props) => <NotificationPage {...props} type="done" />}
      </TopTab.Screen>
    </TopTab.Navigator>
  ) : (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Notification</Text>
      </View>
    </View>
  );
};

export default Notification;

const NotificationPage = ({ type }) => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (type == "cancel")
    useEffect(() => {
      get_not_able_to_finish_tasks().then((data_list) =>
        setDataList(data_list)
      );
    }, []);
  else if (type == "claimed")
    useEffect(() => {
      get_claimed_tasks().then((data_list) => setDataList(data_list));
    }, []);
  else if (type == "done")
    useEffect(() => {
      get_done_tasks().then((data_list) => setDataList(data_list));
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
    <View>
      <FlatList
        style={{ marginHorizontal: "5%", width: "90%" }}
        data={dataList}
        renderItem={({ item }) => {
          return (
            <NotificationListItem
              item={item}
              type={type}
              onPassPress={onPassPress}
              onFailPress={onFailPress}
            />
          );
        }}
      />
    </View>
  );
};

const NotificationListItem = ({ item, type, onPassPress, onFailPress }) => {
  const navigation = useNavigation();

  const iconName =
    item.status == "leave"
      ? "close-circle-outline"
      : item.status == "due"
      ? "alarm-outline"
      : item.status == "claimed"
      ? "arrow-forward-outline"
      : item.status == "done"
      ? "checkmark-done-outline"
      : "";
  const [open, setOpen] = useState(false);

  const onDetailPress = () => {
    navigation.navigate("NotificationDetail", { item: item, type: type });
  };

  return type != "done" ? (
    <View style={[styles.listItem, { flexDirection: "row", height: 60 }]}>
      <View
        style={{ width: "15%", justifyContent: "center", alignItems: "center" }}
      >
        <Ionicons name={iconName} size={50} />
      </View>
      <Text style={{ width: "70%" }}>
        {item.status == "leave"
          ? `${item.workerName}取消了"${item.title}"`
          : item.status == "due"
          ? `${item.workerName}未能及時完成"${item.title}"`
          : item.status == "claimed"
          ? `${item.workerName}接取了"${item.title}"`
          : item.status == "done"
          ? `${item.workerName}完成了"${item.title}"`
          : ``}
      </Text>
      <View
        style={{ width: "15%", justifyContent: "center", alignItems: "center" }}
      >
        <NotificationDetail onDetailPress={onDetailPress} />
      </View>
    </View>
  ) : (
    <View style={open ? styles.listItemUnfold : styles.listItemFold}>
      <View
        style={{
          flexDirection: "row",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "15%" }}>
          <Ionicons name={iconName} size={50} />
        </View>
        <Text style={{ width: "70%" }}>
          {item.status == "leave"
            ? `${item.workerName}取消了"${item.title}"`
            : item.status == "due"
            ? `${item.workerName}未能及時完成"${item.title}"`
            : item.status == "accept"
            ? `${item.workerName}接取了"${item.title}"`
            : item.status == "done"
            ? `${item.workerName}完成了"${item.title}"`
            : ``}
        </Text>
        <View style={{ width: "15%" }}>
          <NotificationDetail onDetailPress={onDetailPress} />
        </View>
      </View>

      {open ? (
        <View
          style={{
            flexDirection: "row",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <NotificationFail onFailPress={() => onFailPress(item)} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <NotificationPass onPassPress={() => onPassPress(item)} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
      ) : (
        <View />
      )}

      <View style={{ height: 20, justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <View style={{ minWidth: "100%", alignItems: "center" }}>
            <Text style={{ fontSize: 12, color: "grey" }}>
              {open ? "收       起" : "展       開"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const NotificationDatail = ({ route }) => {
  const { item, type } = route.params;
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const onPassPress = (item) => {
    setIsLoading(true);
    put_work_pass().then((res) => {
      setIsLoading(false);
      navigation.navigate("Notification");
    });
  };

  const onFailPress = (item) => {
    setIsLoading(true);
    put_work_fail().then((res) => {
      setIsLoading(false);
      navigation.navigate("Notification");
    });
  };

  return isLoading ? (
    <LoadingBar />
  ) : (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          marginHorizontal: "5%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>Worker: </Text>
          <View style={styles.profilePic} />
          <Text>{item.workerName}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>Work Name: {item.title}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>Start Time: {item.startTime.format("MM-DD HH:mm")}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>End Time: {item.endTime.format("MM-DD HH:mm")}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>Reward: {item.reward}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>Remarks: {item.remarks}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text>
            Status:{" "}
            {item.status == "due"
              ? "逾時"
              : item.status == "leave"
              ? "已請假"
              : item.status == "done"
              ? "完成未審核"
              : item.status == "claimed"
              ? "已接受工作"
              : ""}
          </Text>
        </View>
        {type == "done" ? (
          <View style={{ flexDirection: "row" }}>
            <NotificationFail onFailPress={() => onFailPress(item)} />
            <NotificationPass onPassPress={() => onPassPress(item)} />
          </View>
        ) : (
          <View />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    height: SCREEN_HEIGHT / 12,
    width: SCREEN_HEIGHT / 12,
    margin: SCREEN_HEIGHT / 50,
    backgroundColor: "#aaaaaa",
    borderRadius: 50,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
  },
  listItemFold: {
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    height: 80,
  },
  listItemUnfold: {
    borderBottomWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    height: 120,
  },
});
