import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import LoggedOut from './components/login/LoggedOut';
import FinishSignUp from './components/FinishSignUp';
import SignUpContainer from './containers/SignUpContainer';
import IndexContainer from './containers/IndexContainer';
import 'antd/dist/antd.less';
import './index.less';

const App = () => {
  useEffect(async () => {
    if (!window.sessionStorage.getItem('userInfo')) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/silent-refresh`,
          {},
          { withCredentials: true },
        )
        .then((response) => {
          window.sessionStorage.setItem(
            'userInfo',
            JSON.stringify({
              accessToken: response.data.accessToken,
              expiresAt: new Date().getTime() + 1000 * 60 * 13,
            }),
          );
          window.location.replace('/');
        })
        .catch((err) => {
          if (err.response.status === 401) {
            console.log('refreshToken 없음');
          }
        });
    }
  }, []);
  if (!window.sessionStorage.getItem('userInfo')) {
    return (
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LoggedOut} exact />
            <Route path="/signup" component={SignUpContainer} exact />
            <Route path="/end" component={FinishSignUp} exact />
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <BrowserRouter>
        <IndexContainer />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
