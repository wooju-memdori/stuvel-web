import axios from 'axios';
import Socket from 'socket.io-client';
import { atom, selectorFamily } from 'recoil';

export const roomId = selectorFamily({
  key: 'roomId',
  get: () => async () => {
    const url = 'http://localhost:3000';
    const response = await axios.get(`${url}/room/`);
    console.log(response);
    return response.data;
  },
});

export const user = atom({
  key: 'user',
  default: {
    userId: 'userId',
  },
});

export const socket = selectorFamily({
  key: 'socket',
  get:
    () =>
    ({ get }) => {
      console.log(`get(roomId): ${get(roomId())}`);
      const so = new Socket('http://localhost:3000/room');
      so.emit('join-room', get(roomId()), get(user));
      console.log('joined!');
      return so;
      // socket.on('user-connected', (userId) => {
      //   console.log(`user-connected - ${userId}`);
      // });
    },
  default: null,
});

export const localStream = atom({
  key: 'localStream',
  default: null,
});
