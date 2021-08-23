import { atom, selectorFamily } from 'recoil';
import axios from '../utils/axios';

export const isModalVisibleState = atom({
  key: 'isModalVisibleState',
  default: false,
});

export const collapsedState = atom({
  key: 'collapsedState',
  default: false,
});

export const micStatusState = atom({
  key: 'micStatusState',
  default: true,
});

export const camStatusState = atom({
  key: 'camStatusState',
  default: true,
});

export const streamingState = atom({
  key: 'streamingState',
  default: false,
});

export const userDetailsState = atom({
  key: 'userDetailsState',
  default: null,
});

export const displayStreamState = atom({
  key: 'displayStreamState',
  default: false,
});

export const roomId = selectorFamily({
  key: 'roomId',
  get: () => async () => {
    const response = await axios.get(`/room/`);
    return response.data;
  },
});

export const followersState = selectorFamily({
  key: 'followersState',
  get: () => async () => {
    const response = await axios.get(`/followers`);
    return response.data.data;
  },
});

export const followingsState = selectorFamily({
  key: 'followersState',
  get: () => async () => {
    const response = await axios.get(`/followings`);
    return response.data.data;
  },
});
