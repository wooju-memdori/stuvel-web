import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

export const usersState = atom({
  key: 'usersState',
  default: [],
});

export const peersInfoState = atom({
  key: 'peersInfoState',
  default: {},
});

export const roomId = selectorFamily({
  key: 'roomId',
  get: () => async () => {
    const url = 'http://localhost:3000';
    const response = await axios.get(`${url}/room/`);
    console.log(response);
    return response.data;
  },
});

export const userState = atom({
  key: 'user',
  default: '',
});

export const socket = atom({
  key: 'socket',
  default: null,
});

export const localStream = atom({
  key: 'localStream',
  default: null,
});
