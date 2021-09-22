import { atom, selectorFamily } from 'recoil';
import axios from '../utils/axios';

export const forceUserListUpdateState = atom({
  key: 'forceUserListUpdateState',
  default: 0,
});

export const followersState = selectorFamily({
  key: 'followersState',
  get:
    ({ get }) =>
    async () => {
      get(forceUserListUpdateState);
      const response = await axios.get(`/followers`);
      return response.data.data;
    },
});

export const followingsState = selectorFamily({
  key: 'followersState',
  get:
    ({ get }) =>
    async () => {
      get(forceUserListUpdateState);
      const response = await axios.get(`/followings`);
      return response.data.data;
    },
});
