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

export const roomIdState = atom({
  key: 'roomIdState',
  default: null,
});

export const refreshState = atom({
  key: 'refreshState',
  default: false,
});

export const roomConfirmedState = atom({
  key: 'roomConfirmedState',
  default: false,
});

export const roomUsersInfoState = selectorFamily({
  key: 'roomUsersInfoState',
  get: (params) => async () => {
    const response = await axios.get(`room/${params}/users`);
    return response.data.users;
  },
});

export const streamInstanceState = atom({
  key: 'streamInstanceState',
  default: null,
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
