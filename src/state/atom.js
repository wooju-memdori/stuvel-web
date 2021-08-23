import { atom, selectorFamily } from 'recoil';
import axios from '../utils/axios';

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

export const roomId = atom({
  key: 'roomId',
  default: null,
});

export const refresh = atom({
  key: 'refresh',
  default: false,
});

export const roomConfirmed = atom({
  key: 'roomConfirmed',
  default: false,
});

export const roomUsersInfo = selectorFamily({
  key: 'roomUsersInfo',
  get: (params) => async () => {
    const response = await axios.get(`room/${params}/users`);
    return response.data.users;
  },
});
