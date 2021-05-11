import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout';
import Login from './routes';
import Token from './routes/token';
import ConfirmAccount from './routes/confirmAccount';
import Register from './routes/register';
import ForgotPassword from './routes/email';
import User from './routes/user';
import NewPassword from './routes/resetPassword';
import PrivateRoute from './privateRoute';
import "./App.css";

import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-token" component={Token} />
        <Route path="/confirm-account" component={ConfirmAccount} />
        <Route path="/new-password" component={NewPassword} />
        <PrivateRoute path="/user" component={User} />
      </Switch>
    </Layout>
  )
}

export default App;
