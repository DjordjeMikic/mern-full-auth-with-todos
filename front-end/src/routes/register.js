import React from 'react';
import { Form, Input, Label, Button } from 'reactstrap';

const Register = () => {
  let [info, setInfo] = React.useState({
    name: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    age: 16
  });

  const onChange = (a) => {
    setInfo({
      ...info,
      [a.target.name]: a.target.value
    })
  }

  const onSubmit = (a) => {
    a.preventDefault();
    console.log(info);
  }

  return (
    <Form onSubmit={onSubmit}
      className="h-100 w-50 d-flex justify-content-around flex-column">
      <h1>Register</h1>
      <Input
        type="text"
        placeholder="Your Name"
        className="fs-5"
        name="name"
        onChange={onChange}
        value={info.name}
        required
      />

      <Input
        type="text"
        placeholder="Your Lname"
        className="fs-5"
        name="lname"
        onChange={onChange}
        value={info.lname}
        required
      />

      <Input
        type="text"
        placeholder="Your Username"
        className="fs-5"
        name="username"
        onChange={onChange}
        value={info.username}
        required
      />

      <Input
        type="email"
        placeholder="Your Email"
        className="fs-5"
        name="email"
        onChange={onChange}
        value={info.email}
        required
      />

      <Input
        type="password"
        placeholder="Your Password"
        className="fs-5"
        name="password"
        onChange={onChange}
        value={info.password}
        required
      />

      <Input
        type="password"
        placeholder="Confirm Your Password"
        className="fs-5"
        name="confirmPassword"
        onChange={onChange}
        value={info.confirmPassword}
        required
      />

      <div className="flex fs-5">
        <Label for="male">Male</Label>
        <Input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={onChange}
          defaultChecked={info.gender === 'male'}
          required
        />
        <Label for="female">Female</Label>
        <Input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={onChange}
          defaultChecked={info.gender === 'female'}
          required
        />
      </div>

      <Input
        type="number"
        placeholder="Your age"
        className="fs-5"
        name="age"
        min="16"
        max="99"
        value={info.age}
        onChange={onChange}
      />

      <Button type="submit" color="primary" className="fs-5">Submit</Button>
    </Form>
  )
}

export default Register;
