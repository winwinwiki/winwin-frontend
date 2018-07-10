import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import Home from './';
import Login from '../auth/login'; 
import ForgetPassword from '../auth/forgetPassword';
import ResetPassword from '../auth/resetPassword';

const HomeRoutes = () => (
  <div>
    <Home>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/forget-password" component={ForgetPassword} />
              <Route exact path="/reset-password" component={ResetPassword} />
          </Switch>
      </BrowserRouter>
    </Home>
  </div>
)

export default HomeRoutes;