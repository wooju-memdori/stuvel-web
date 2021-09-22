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

export const signUpProcessState = atom({
  key: 'signUpProcessState',
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

export const currentUserInfoState = atom({
  key: 'currentUserInfoState',
  default: null,
});

export const currentUserInfoFetchState = selectorFamily({
  key: 'currentUserInfoFetchState',
  get: () => async () => {
    const response = await axios.get(`/users`);
    if (response.error) {
      return response.error;
    }
    return response.data.data;
  },
});

export const currentNavbarComponent = atom({
  key: 'currentNavbarInfoState',
  default: '',
});

// export const userUpdateState = selectorFamily({
//   key: 'userUpdateState',
//   get: (body) => async () => {
//     const response = await axios.patch(`/users/me`, body);
//     if (response.error) {
//       return response.error;
//     }
//     return response.data.data;
//   },
// });
