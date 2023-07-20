

export const loadBulletin = () => {
  return new Promise((res,rej) => {
      setTimeout(() => {res(_loadBulletin())}, 500)
  }) 
}

const _loadBulletin = () => {
   return [
    {
      title: '搬東西',
      day: 'Tues',
      time: '12:00~16:00',
      reward: '2000'
    },
    {
      title: '買ssssssssssssss咖啡',
      day: 'Thur',
      time: '13:00~13:30',
      reward: '100'
    },
    {
      title: '買咖啡',
      day: 'Thur',
      time: '13:00~13:30',
      reward: '100'
    },
    {
      title: '買咖啡',
      day: 'Thur',
      time: '13:00~13:30',
      reward: '100'
    },{
      title: '搬東西',
      day: 'Tues',
      time: '12:00~16:00',
      reward: '2000'
    }
  ];
}

export const postWork = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_postWork())}, 500)
  }) 
}

const _postWork = () => {
  return
}

export const get_notification_cancel_list = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_get_notification_cancel_list())}, 500)
  }) 
}

const _get_notification_cancel_list = () => {
  return [{
    userId: 1,
    userName: 'Bob',
    work: {
      title: 'Eat Diner',
      startTime: '2023-7-23 20:00:00',
      endTime: '2023-7-23 22:00:00',
      reward: '0',
      remarks: 'Mcdonalds in NTHU'
    },
    status: 'leave'
    },
    {
    userId: 2,
    userName: 'Andy',
    work: {
      title: 'Throw Garbage',
      startTime: '2023-7-19 19:00:00',
      endTime: '2023-7-19 23:00:00',
      reward: '0',
      remarks: 'Garbage located at 1F'
    },
    status: 'due'
    }
  ]
}

export const get_notification_assign_list = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_get_notification_assign_list())}, 500)
  }) 
}

const _get_notification_assign_list = () => {
  return [
    {
      userId: 3,
      userName: 'Cindy',
      work: {
        title: 'Erase the whiteboard',
        startTime: '2023-7-23 6:00:00',
        endTime: '2023-7-23 9:00:00',
        reward: '0',
        remarks: 'Erase it before the meeting'
      },
      status: 'accept'
    }
  ]
}

export const get_notification_done_list = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_get_notification_done_list())}, 500)
  }) 
}

const _get_notification_done_list = () => {
  return [
    {
      userId: 4,
      userName: 'Daniel',
      work: {
        title: 'Clean the table',
        startTime: '2023-7-18 20:00:00',
        endTime: '2023-7-18 22:00:00',
        reward: '0',
        remarks: 'Clean the table after dinner'
      },
      status: 'done'
    }
  ]
}