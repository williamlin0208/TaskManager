export const get_staff_attendance = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(_get_staff_attendance());
    }, 500);
  });
};

const _get_staff_attendance = () => {
  return [
    {
      userId: 1,
      userName: "Bob",
      total: 30,
      pass: 25,
      fail: 2,
      leave: 1,
      absent: 2,
    },
    {
      userId: 2,
      userName: "Andy",
      total: 45,
      pass: 37,
      fail: 4,
      leave: 3,
      absent: 2,
    },
    {
      userId: 3,
      userName: "Nate",
      total: 50,
      pass: 38,
      fail: 5,
      leave: 2,
      absent: 5,
    },
  ];
};
