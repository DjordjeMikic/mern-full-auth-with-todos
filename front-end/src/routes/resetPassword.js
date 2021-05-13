import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'reactstrap';
import { PasswordInput } from '../components/common';
import { CustomAlert } from '../components/common';

import { changePassword, setError, setSuccess } from '../store/user/actions';

const NewPassword = () => {
  const [info, setInfo] = useState({
    password: '',
    confirmPassword: ''
  });
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const onChange = (a) => {
    setInfo({ ...info, [a.target.name]: a.target.value });
  }

  const onSubmit = (a) => {
    a.preventDefault();
    let path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    dispatch(changePassword(path, info));
    setInfo({
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="flex column h-100 w-100">
      <h1>New Password</h1>
      <CustomAlert
        info={user.error}
        color="danger"
        toggle={() => dispatch(setError(null))}
      />
      <CustomAlert
        info={user.success}
        color="success"
        toggle={() => dispatch(setSuccess(null))}
      />
      <Form
        onSubmit={onSubmit}
        className="h-50 w-50 d-flex justify-content-evenly flex-column">
        
        <PasswordInput
          className="fs-5"
          placeholder="Your new Password"
          name="password"
          onChange={onChange}
          value={info.password}
          required
        />
        <PasswordInput
          className="fs-5"
          placeholder="Confirm your new password"
          name="confirmPassword"
          onChange={onChange}
          value={info.confirmPassword}
          required
        />
        
        <Button type="submit" className="mt-4 fs-5" color="primary">Submit</Button>
      </Form>
    </div>
  )
}

export default NewPassword;
