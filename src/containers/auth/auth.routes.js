import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

import Auth from "./";
import Login from "./login";
import ForgetPassword from "./forgetPassword";
import ResetPassword from "./resetPassword";
import newUserChangePassword from "./changePassword/newUserChangePassword";
import PrivateRoute from "../privateRouter";

const AuthRoutes = ({ location: { state } }) => (
  <React.Fragment>
    <Auth>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <PrivateRoute
          authenticated={(state && state.isAuth) || false}
          exact
          path="/reset-password"
          component={ResetPassword}
        />
        <Route exact path="/verify-user" component={newUserChangePassword} />
      </Switch>
      {/* </BrowserRouter> */}
    </Auth>
  </React.Fragment>
);

export default AuthRoutes;
