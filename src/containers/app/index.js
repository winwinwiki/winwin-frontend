import React from 'react';
import { Route } from 'react-router-dom';

import HomeRoutes from '../home/home.routes';
import About from '../about';

const App = () => (
  <div>
      <Route path="/" component={HomeRoutes} />
      <Route exact path="/about-us" component={About} />
  </div>
)

export default App;