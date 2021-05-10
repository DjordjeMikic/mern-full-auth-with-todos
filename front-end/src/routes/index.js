import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'reactstrap';
import { login } from '../store/user/actions';
import { PasswordInput } from '../components/common';

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


    // console.log(info);
  }

  useEffect(() => {
    if(user.userInfo) {
      history.push('/user');
    }
  }, [history, user.userInfo]);

  return (
    <Form
      onSubmit={onSubmit}
      className="h-50 w-50 d-flex justify-center flex-column"
    >
      <h1 className="display-4 text-center">Login</h1>
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
    </Form>
  )
}

export default Login;
