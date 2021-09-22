import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LoggedOut from './components/login/LoggedOut';
import FinishSignUp from './components/FinishSignUp';
import SignUpContainer from './containers/SignUpContainer';
import IndexContainer from './containers/IndexContainer';
import 'antd/dist/antd.less';
import './index.less';

const App = () => {
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
