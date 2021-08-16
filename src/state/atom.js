import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

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
    const url = 'http://localhost:3000';
    const response = await axios.get(`${url}/room/`);
    console.log(response);
    return response.data;
  },
});
