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

import {
  get_notification_done_list,
  get_done_handled_list,
} from "../../api/get/get_notification";
import { LoadingBar } from "../../Utility/utility";
import { List } from "native-base";
import {
  NotificationDetail,
  NotificationFail,
  NotificationPass,
} from "../../Utility/buttons";
import { put_work_fail, put_work_pass } from "../../api/put/put";

const Request = () => {
  const [requestList, setRequestList] = useState([]);
  const [handledList, setHandledList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get_notification_done_list().then((data) => {
      setRequestList(data);
    });
    get_done_handled_list().then((data) => {
      setHandledList(data);
      setIsLoading(false);
    });
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
    <View style={styles.container}>
      <View style={{ flex: 1, paddingVertical: 15, marginStart: 10 }}>
        <Text style={{ fontSize: 25 }}>Unhandled</Text>
      </View>
      <View style={{ flex: 10 }}>
        <FlatList
          data={requestList}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onFailPress={onFailPress}
              onPassPress={onPassPress}
            />
          )}
        />
      </View>

      <View style={{ flex: 1, paddingVertical: 15, marginStart: 10 }}>
        <Text style={{ fontSize: 25 }}>Handled</Text>
      </View>
      <View style={{ flex: 10 }}>
        <FlatList
          data={handledList}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onFailPress={onFailPress}
              onPassPress={onPassPress}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Request;

const ListItem = ({ item, onFailPress, onPassPress }) => {
  const navigation = useNavigation();

  const [isFolded, setIsFolded] = useState(true);

  const onDetailPress = () => {
    navigation.navigate("MyTasksTaskDetail", {
      task: item.work,
      from: "requests",
    });
  };

  const bottomTime = item.review == 0 ? item.doneTime : item.reviewTime;

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
          <Text>{item.userName}</Text>
        </View>
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{item.work.title}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {item.review == 0 ? (
            <Ionicons name="help-circle-outline" size={40} />
          ) : item.review == 1 ? (
            <Ionicons
              name="checkmark-done-circle-outline"
              size={40}
              color="green"
            />
          ) : item.review == -1 ? (
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
        {item.review == 0 ? (
          <TouchableOpacity
            style={{ width: "100%", flexDirection: "row" }}
            onPress={() => setIsFolded(!isFolded)}
          >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {isFolded ? "Unfold" : "Fold"}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {bottomTime.split(" ")[0].split("/")[1]}/
                {bottomTime.split(" ")[0].split("/")[2]}{" "}
                {bottomTime.split(" ")[1].split(":")[0]}:
                {bottomTime.split(" ")[1].split(":")[1]}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {bottomTime.split(" ")[0].split("/")[1]}/
                {bottomTime.split(" ")[0].split("/")[2]}{" "}
                {bottomTime.split(" ")[1].split(":")[0]}:
                {bottomTime.split(" ")[1].split(":")[1]}
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
