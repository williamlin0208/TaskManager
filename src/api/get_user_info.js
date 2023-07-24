info1 = {
  userId: 1,
  identity: 'Manager',
  name: 'Black Hole',
  title: 'Project Manager',
  weeklyGoal: 20000,
}

info2 = {
  userId: 2,
  identity: 'Member',
  name: 'William',
  title: 'Senior Software Engineer',
  weeklyGoal: 5000
}

export const get_user_info = (userid , mode) => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_get_user_info())}, 100);
  }) 
}

const _get_user_info = () => {
  return info1;
}