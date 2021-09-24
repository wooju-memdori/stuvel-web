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

    if (!userInfo) {
      return config;
    }

    let { accessToken, expiresAt } = JSON.parse(userInfo);

    // accessToken 토큰 만료일 경우 (refreshToken 아직 유효)
    if (
      // new Date(refreshTokenExpiresAt) new Date().getTime() > 1000 * 60 &&
      new Date(expiresAt) - new Date().getTime() <=
      0
    ) {
      console.log('acessToken 연장');
      const response = await axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/silent-refresh`,
          {},
          { withCredentials: true },
        )
        .catch((err) => {
          if (err.response.status === 401) {
            sessionStorage.removeItem('userInfo');
            window.location.replace('/');
          }
        });
      accessToken = response.data.accessToken;
      const now = new Date();
      // 13분 뒤부터 accessToken 재발급
      expiresAt = now.getTime() + 1000 * 60 * 13;
      window.sessionStorage.setItem(
        'userInfo',
        JSON.stringify({
          accessToken,
          expiresAt,
        }),
      );
      const newConfig = config;
      newConfig.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      };
      console.log(newConfig.headers);
      return newConfig;
    }
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

export default axiosInstance;
