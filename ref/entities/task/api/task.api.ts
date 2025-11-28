import { tasks } from './task.data';
import type { Task } from '../types';

interface TaskApi {
    getTasks: () => Promise<Task[]>;
}

export const taskApi: TaskApi = {
  getTasks: async () => {
    await new Promise(res => setTimeout(res, 100));
    return tasks;
  },
};
