import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import RoomContainer from './components/RoomContainer';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/room" component={RoomContainer} exact />
      <Route path="/room:roomId" component={RoomContainer} exact />
    </Switch>
  </BrowserRouter>
);

export default App;
