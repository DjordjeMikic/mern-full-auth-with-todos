import React from 'react';
import { Form, Button } from 'reactstrap';
import { PasswordInput } from '../components/common';

const NewPassword = () => {
  let [info, setInfo] = React.useState({
    password: '',
    confirmPassword: ''
  });

  const onChange = (a) => {
    setInfo({ ...info, [a.target.name]: a.target.value });
  }

  const onSubmit = (a) => {
    a.preventDefault();
    console.log(info);
    setInfo({
      password: '',
      confirmPassword: ''
    })
  }
  return (
    <div className="flex column h-100 w-100">
      <h1>New Password</h1>
      <Form
        onSubmit={onSubmit}
        className="h-50 w-50 d-flex justify-content-evenly flex-column">
        <PasswordInput
          className="fs-5"
          placeholder="Your new Password"
          name="password"
          onChange={onChange}
          value={info.password}
        />
        <PasswordInput
          className="fs-5"
          placeholder="Confirm your new password"
          name="confirmPassword"
          onChange={onChange}
          value={info.confirmPassword}
        />
        <Button type="submit" className="mt-4 fs-5" color="primary">Submit</Button>
      </Form>
    </div>
  )
}

export default NewPassword;
