export const get_notification_cancel_list = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(_get_notification_cancel_list());
    }, 500);
  });
};

const _get_notification_cancel_list = () => {
  return [
    {
      userId: 1,
      userName: "Bob",
      work: {
        title: "Eat Diner",
        startTime: "2023-7-23 20:00:00",
        endTime: "2023-7-23 22:00:00",
        reward: "0",
        remarks: "Mcdonalds in NTHU",
      },
      status: "leave",
    },
    {
      userId: 2,
      userName: "Andy",
      work: {
        title: "Throw Garbage",
        startTime: "2023-7-19 19:00:00",
        endTime: "2023-7-19 23:00:00",
        reward: "0",
        remarks: "Garbage located at 1F",
      },
      status: "due",
    },
  ];
};

export const get_notification_assign_list = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(_get_notification_assign_list());
    }, 500);
  });
};

const _get_notification_assign_list = () => {
  return [
    {
      userId: 3,
      userName: "Cindy",
      work: {
        title: "Erase the whiteboard",
        startTime: "2023-7-23 6:00:00",
        endTime: "2023-7-23 9:00:00",
        reward: "0",
        remarks: "Erase it before the meeting",
      },
      status: "accept",
    },
    {
      userId: 3,
      userName: "Ember",
      work: {
        title: "Do the laundry",
        startTime: "2023-7-24 16:00:00",
        endTime: "2023-7-24 19:00:00",
        reward: "0",
        remarks: "",
      },
      status: "accept",
    },
  ];
};

export const get_notification_done_list = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(_get_notification_done_list());
    }, 500);
  });
};

const _get_notification_done_list = () => {
  return [
    {
      userId: 4,
      userName: "Daniel",
      work: {
        title: "Clean the table",
        startTime: "2023-7-18 20:00:00",
        endTime: "2023-7-18 22:00:00",
        reward: "0",
        remarks: "Clean the table after dinner",
      },
      status: "done",
      doneTime: "2023/7/18 21:38:00",
      review: 0,
      reviewTime: "",
    },
    {
      userId: 4,
      userName: "Fiona",
      work: {
        title: "Wash the dishes",
        startTime: "2023-7-15 20:00:00",
        endTime: "2023-7-15 22:00:00",
        reward: "0",
        remarks: "Wash them before bed",
      },
      status: "done",
      doneTime: "2023/7/15 21:09:00",
      review: 0,
      reviewTime: "",
    },
  ];
};

export const get_done_handled_list = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(_get_done_handled_list());
    }, 500);
  });
};

const _get_done_handled_list = () => {
  return [
    {
      userId: 4,
      userName: "Daniel",
      work: {
        title: "Clean the table",
        startTime: "2023-7-18 20:00:00",
        endTime: "2023-7-18 22:00:00",
        reward: "0",
        remarks: "Clean the table after dinner",
      },
      status: "done",
      doneTime: "2023/7/18 21:38:00",
      review: 1,
      reviewTime: "2023/7/25 14:21:00",
    },
    {
      userId: 4,
      userName: "Fiona",
      work: {
        title: "Wash the dishes",
        startTime: "2023-7-15 20:00:00",
        endTime: "2023-7-15 22:00:00",
        reward: "0",
        remarks: "Wash them before bed",
      },
      status: "done",
      doneTime: "2023/7/15 21:09:00",
      review: -1,
      reviewTime: "2023/7/25 10:13:00",
    },
  ];
};
