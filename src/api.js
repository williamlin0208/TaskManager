

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