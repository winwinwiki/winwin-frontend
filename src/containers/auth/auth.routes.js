import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";

import Auth from "./";
import Login from "./login";
import ForgetPassword from "./forgetPassword";
import ResetPassword from "./resetPassword";
import newUserChangePassword from "./changePassword/newUserChangePassword";
import PrivateRoute from "../privateRouter";
import PageNotFound from "./pageNotFound";

const AuthRoutes = ({ location: { state } }) => (
  <React.Fragment>
    <Auth>
      {/* <BrowserRouter> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        {/* <PrivateRoute
          title={"Reset Forgotten Password"}
          authenticated={(state && state.isAuth) || false}
          exact
          path="/reset-password"
          component={ResetPassword}
        /> */}
        <PrivateRoute
          title={"Verify User"}
          authenticated={state && state.length ? true : false}
          exact
          path="/verify-user"
          component={newUserChangePassword}
        />
        <Route path="*" component={PageNotFound} />
      </Switch>
      {/* </BrowserRouter> */}
    </Auth>
  </React.Fragment>
);

export default AuthRoutes;
