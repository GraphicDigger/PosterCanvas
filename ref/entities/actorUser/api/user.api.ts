import { users } from './user.data';
import type { User } from '../types';

interface UserApi {
    getUsers: () => Promise<User[]>;
}

export const userApi: UserApi = {
  getUsers: async () => {
    await new Promise(res => setTimeout(res, 100));
    return users;
  },
};
