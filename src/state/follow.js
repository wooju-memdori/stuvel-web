import { atom, selector } from 'recoil';
import axios from '../utils/axios';

export const forceUserListUpdate = atom({
  key: 'forceUserListUpdate',
  default: 0,
});

export const followersState = selector({
  key: 'followersState',
  get: async ({ get }) => {
    get(forceUserListUpdate);
    const response = await axios.get(`/followers`);
    return response.data.data;
  },
});

export const followingsState = selector({
  key: 'followingsState',
  get: async ({ get }) => {
    get(forceUserListUpdate);
    const response = await axios.get(`/followings`);
    return response.data.data;
  },
});
