import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RoomContainer from './containers/RoomContainer';
import HomeContainer from './containers/HomeContainer';
import LoggedOut from './components/LoggedOut';
import SignUpContainer from './containers/SignUpContainer';

const App = () => {
  if (!window.sessionStorage.getItem('userInfo')) {
    return (
      <RecoilRoot>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LoggedOut} exact />
            <Route path="/signUp" component={SignUpContainer} exact />
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomeContainer} exact />
          <Route path="/room" component={RoomContainer} exact />
          <Route path="/room/:roomId" component={RoomContainer} exact />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
