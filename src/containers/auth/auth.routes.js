import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import Auth from './';
import Login from './login';
import ForgetPassword from './forgetPassword';
import ResetPassword from './resetPassword';

const AuthRoutes = () => (
    <React.Fragment>
        <Auth>
            {/* <BrowserRouter> */}
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/forget-password" component={ForgetPassword} />
                    <Route exact path="/reset-password" component={ResetPassword} />
                </Switch>
            {/* </BrowserRouter> */}
        </Auth>
    </React.Fragment>
)

export default AuthRoutes;