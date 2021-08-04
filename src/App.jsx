import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/room" component={Room} exact />
      <Route path="/room:roomId" component={Room} exact />
    </Switch>
  </BrowserRouter>
);

export default App;
