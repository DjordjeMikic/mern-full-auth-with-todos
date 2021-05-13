import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// Styles import
import "./App.scss";

import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


// Components import
import Layout from './components/layout';
import Ldn from './components/ldn';
import PrivateRoute from './privateRoute';

const Login = lazy(() => import('./routes'));
const Register = lazy(() => import('./routes/register'));
const Token = lazy(() => import('./routes/token'));
const ConfirmAccount = lazy(() => import('./routes/confirmAccount'));
const ForgotPassword = lazy(() => import('./routes/email'));
const User = lazy(() => import('./routes/user'));
const NewPassword = lazy(() => import('./routes/resetPassword'));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<Ldn />}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/confirm-account" component={ConfirmAccount} />
          <Route path="/reset-token/:id" component={Token} />
          <Route path="/new-password/:id" component={NewPassword} />
          <PrivateRoute path="/user" component={User} />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App;
