import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'reactstrap';
import { login, setUser, setError } from '../store/user/actions';
import { PasswordInput, CustomAlert } from '../components/common';

const Login = () => {
  let [info, setInfo] = useState({
    username: '',
    password: ''
  });
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (a) => {
    setInfo({ ...info, [a.target.name]: a.target.value })
  }

  const onSubmit = (a) => {
    a.preventDefault();
    dispatch(login(info));
  }

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  useEffect(() => {
    if(user.userInfo) {
      dispatch(setError(null));
      history.push('/user');
    }
  }, [dispatch, history, user.userInfo]);

  return (
    <Form
      onSubmit={onSubmit}
      className="h-50 w-50 d-flex justify-center flex-column"
    >
      <h1 className="display-4 text-center">Login</h1>
      <CustomAlert
        info={user.error}
        color="danger"
        toggle={() => dispatch(setError(null))}
      />
      <Input
        type="text"
        className="my-4 fs-5"
        placeholder="Username"
        name="username"
        value={info.username}
        onChange={onChange}
        required
      />
      <PasswordInput
        className="fs-5"
        placeholder="Password"
        name="password"
        value={info.password}
        onChange={onChange}
        required
      />
      <Button
        type="submit"
        className="my-4 fs-5"
        color="primary"
      >
        Submit
      </Button>
      <Link to="/forgot-password"
        className="text-center p-2 rounded bg-primary text-light">Your forgot password</Link>
      <h1>You don't have an account <Link to="/register">Sign up</Link></h1>
    </Form>
  )
}

export default Login;
