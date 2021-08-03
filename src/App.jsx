import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/Home';
import RoomPage from './components/Room';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/room" component={RoomPage} exact />
    </Switch>
  </BrowserRouter>
);

export default App;
