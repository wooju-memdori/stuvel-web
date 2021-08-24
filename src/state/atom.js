import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

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
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/room/`);
    return response.data;
  },
});

export const genderOrInterestState = atom({
  key: 'genderOrInterestState',
  default: 'gender',
});

export const requiredOrOptionState = atom({
  key: 'requiredOrOptionState',
  default: 'required',
});

export const userInfoState = atom({
  key: 'userInfoState',
  default: null,
});

export const signUpDoneState = atom({
  key: 'signUpDoneState',
  default: false,
});
