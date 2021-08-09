import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

export const getRoomId = selectorFamily({
  key: 'getRoomId',
  get: () => async () => {
    const url = 'http://localhost:3000';
    const response = await axios.get(`${url}/room/`);
    return response.data;
  },
});

export const localStream = atom({
  key: 'localStream',
  default: null,
});
