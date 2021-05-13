import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Label, Button } from 'reactstrap';
import { PasswordInput, CustomAlert } from '../components/common';
import { register, setError, setSuccess } from '../store/user/actions';

const Register = () => {
  const [info, setInfo] = useState({
    name: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    age: ''
  });
  const arr = Object.keys(info).filter(a => a !== 'gender' && !a.match(/password/gi));
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  const onChange = (a) => {
    if(a.target.name === 'age') {
      if(!isNaN(parseInt(a.target.value))) {
        setInfo({
          ...info,
          [a.target.name]: parseInt(a.target.value)
        })
      } else {
        return;
      }
    }
    setInfo({
      ...info,
      [a.target.name]: a.target.value
    })
  }

  const onSubmit = (a) => {
    a.preventDefault();
    dispatch(register(info));
  }

  useEffect(() => {
    // console.log(arr);
    return () => {
      dispatch(setError(null));
      dispatch(setSuccess(null));
    }
  }, [dispatch]);

  useEffect(() => {
    if(user.success) {
      setInfo({
        name: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        age: 16
      })
    }
  }, [user.success]);

  return (
    <Form
      onSubmit={onSubmit}
      className="h-100 w-50 d-flex justify-content-around flex-column">

      <h1>Register</h1>

      <CustomAlert
        info={user.success}
        color="success"
        toggle={() => dispatch(setSuccess(null))} />
      <CustomAlert
        info={user.error}
        color="danger"
        toggle={() => dispatch(setError(null))} />


      {arr.map((a, b) => {
        return (
          <Input
            type={a === "email" ? 'email' : 'text'}
            key={a + b}
            placeholder={`Your ${a}`}
            className="fs-5"
            name={a}
            onChange={onChange}
            value={info[a]}
            required
          />
        )
      })}

      <PasswordInput
        placeholder="Your Password"
        className="fs-5"
        name="password"
        onChange={onChange}
        value={info.password}
        required
      />

      <PasswordInput
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

      <h4>You already have an account <Link to="/">Sign In</Link></h4>

      <Button type="submit" color="primary" className="fs-5">Submit</Button>
    </Form>
  )
}

export default Register;
