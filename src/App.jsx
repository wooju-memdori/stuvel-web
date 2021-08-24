import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './components/Home';
import RoomContainer from './containers/RoomContainer';
import SignUpContainer from './containers/SignUpContainer';

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signUp" component={SignUpContainer} exact />
        <Route path="/room" component={RoomContainer} exact />
        <Route path="/room/:roomId" component={RoomContainer} exact />
      </Switch>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
