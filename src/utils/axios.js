import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const userInfo = window.sessionStorage.getItem('userInfo');
    const accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;
    const newConfig = config;
    newConfig.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    };
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  },
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest.retry) {
//       console.log('토큰 만료');
//       originalRequest.retry = true;
//       const sessionObj = window.sessionStorage.getItem('userInfo');
//       const userInfo = sessionObj ? JSON.parse(sessionObj) : null;
//       const { accessToken } = await axios.post('/users/silent-refresh').body;
//       if (userInfo) {
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         userInfo.accessToken = accessToken;
//         window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
//       }
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
