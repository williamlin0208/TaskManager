import moment from 'moment';
import { no_worker_ongoing_tasks, claimed_tasks, not_able_to_finish_tasks, done_tasks, user_tasks, handled_tasks, url } from '../../Utility/utility';
import axios from 'axios';

export const get_no_worker_ongoing_tasks = () => {
    return new Promise((res, rej) => {
        axios.get(`${url}/tasks?status=posted`).then((response) => {
            var result = Object.assign([], response.data);
            for (let i = 0; i < result.length; i++) {
                result[i].startTime = moment(result.starttime);
                result[i].endTime = moment(result.endtime);
                delete result[i].starttime;
                delete result[i].endtime;
            }

            res(result);
        });
    });
};

export const get_claimed_tasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(_get_claimed_task());
        }, 500);
    });
};

const _get_claimed_task = () => {
    return claimed_tasks;
};

export const get_not_able_to_finish_tasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(_get_not_able_to_finish_tasks());
        }, 500);
    });
};

const _get_not_able_to_finish_tasks = () => {
    return not_able_to_finish_tasks;
};

export const get_done_tasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(_get_done_tasks());
        }, 500);
    });
};

const _get_done_tasks = () => {
    return done_tasks;
};

export const get_handled_tasks = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(_get_handled_tasks());
        }, 500);
    });
};

const _get_handled_tasks = () => {
    return handled_tasks;
};

export const get_user_tasks = (userId = 8) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(_get_user_tasks());
        }, 500);
    });
};

const _get_user_tasks = () => {
    return user_tasks;
};
