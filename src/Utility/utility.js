import { Modal, View, ActivityIndicator, Text } from "react-native";
import moment from "moment";

export const LoadingBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View
      style={{
        flex: 1,
        backgroundColor: "#dcdcdc",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ borderRadius: 10, backgroundColor: "white", padding: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: "200" }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);

export const no_worker_ongoing_tasks = [
  {
    taskid: 1,
    workerId: null,
    workerName: null,
    title: "move the stuff",
    startTime: moment().add(1, "days"),
    endTime: moment().add(1, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "posted",
    statusTime: moment().add(-1, "days"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 2,
    workerId: null,
    workerName: null,
    title: "buy a coffee",
    startTime: moment().add(2, "days"),
    endTime: moment().add(2, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "posted",
    statusTime: moment().add(-1, "days"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 3,
    workerId: null,
    workerName: null,
    title: "take out the garbage",
    startTime: moment().add(3, "days"),
    endTime: moment().add(3, "days").add(3, "hours"),
    reward: "10",
    remarks: "",
    status: "posted",
    statusTime: moment().add(-1, "days"),
    reviewerId: null,
    reviewerName: null,
  },
];

export const claimed_tasks = [
  {
    taskid: 4,
    workerId: 2,
    workerName: "Cindy",
    title: "erase the whiteboard",
    startTime: moment().add(1, "days"),
    endTime: moment().add(1, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "claimed",
    statusTime: moment().add(-4, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 5,
    workerId: 3,
    workerName: "Ember",
    title: "buy a coffee",
    startTime: moment().add(2, "days"),
    endTime: moment().add(2, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "claimed",
    statusTime: moment().add(-16, "minutes"),
    reviewerId: null,
    reviewerName: null,
  },
];

export const not_able_to_finish_tasks = [
  {
    taskid: 6,
    workerId: 4,
    workerName: "Bob",
    title: "eat dinner",
    startTime: moment().add(-1, "days"),
    endTime: moment().add(-1, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "due",
    statusTime: moment().add(-1, "days").add(2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 7,
    workerId: 5,
    workerName: "Andy",
    title: "shopping",
    startTime: moment().add(-2, "days"),
    endTime: moment().add(-2, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "leave",
    statusTime: moment().add(-2, "days").add(-2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
];

export const done_tasks = [
  {
    taskid: 8,
    workerId: 6,
    workerName: "Dainel",
    title: "clean the table",
    startTime: moment().add(-1, "days"),
    endTime: moment().add(-1, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "done",
    statusTime: moment().add(-1, "days").add(2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 9,
    workerId: 7,
    workerName: "Fiona",
    title: "wash the dishes",
    startTime: moment().add(-2, "days"),
    endTime: moment().add(-2, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "done",
    statusTime: moment().add(-2, "days").add(2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
];

export const handled_tasks = [
  {
    taskid: 13,
    workerId: 6,
    workerName: "Dainel",
    title: "clean the table",
    startTime: moment().add(-5, "days"),
    endTime: moment().add(-5, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "pass",
    statusTime: moment().add(-1, "days").add(2, "hours"),
    reviewerId: 8,
    reviewerName: "Black Hole",
  },
  {
    taskid: 14,
    workerId: 7,
    workerName: "Fiona",
    title: "wash the dishes",
    startTime: moment().add(-6, "days"),
    endTime: moment().add(-6, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "fail",
    statusTime: moment().add(-2, "days").add(2, "hours"),
    reviewerId: 8,
    reviewerName: "Black Hole",
  },
];

export const user_tasks = [
  {
    taskid: 10,
    workerId: 8,
    workerName: "Black Hole",
    title: "clean the table",
    startTime: moment().add(-4, "days"),
    endTime: moment().add(-4, "days").add(2, "hours"),
    reward: "2000",
    remarks: "",
    status: "pass",
    statusTime: moment().add(-1, "days").add(2, "hours"),
    reviewerId: 8,
    reviewerName: "Black Hole",
  },
  {
    taskid: 11,
    workerId: 8,
    workerName: "Black Hole",
    title: "wash the dishes",
    startTime: moment().add(-2, "days"),
    endTime: moment().add(-2, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "done",
    statusTime: moment().add(-2, "days").add(2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
  {
    taskid: 12,
    workerId: 8,
    workerName: "Black Hole",
    title: "cook the dinner",
    startTime: moment().add(1, "days"),
    endTime: moment().add(1, "days").add(2, "hours"),
    reward: "200",
    remarks: "",
    status: "claimed",
    statusTime: moment().add(-1, "days").add(2, "hours"),
    reviewerId: null,
    reviewerName: null,
  },
];
