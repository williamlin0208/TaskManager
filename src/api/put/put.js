export const put_accept_work = (task) => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_put_accept_work(task))}, 500)
  }) 
}
  
const _put_accept_work = (task) => {
  return task
}

export const put_work_pass = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_put_work_pass())}, 500)
  }) 
}

const _put_work_pass = () => {
  return
}

export const put_work_fail = () => {
  return new Promise((res,rej) => {
    setTimeout(() => {res(_put_work_fail())}, 500)
  }) 
}

const _put_work_fail = () => {
  return
}