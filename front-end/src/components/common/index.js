import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Alert } from 'reactstrap';

export const PasswordInput = ({ ...rest }) => {
  let [show, setShow] = React.useState(!true);
  return (
    <div className="flex position-relative fs-5">
      <Input type={!show ? 'password' : 'text'} {...rest} />
      <div className="span flex rounded bg-primary text-light" onClick={() => setShow(prevState => !prevState)}>
        {show ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
      </div>
    </div>
  )
}

export const CustomAlert = ({ info, toggle, color }) => {
  return (
    <Alert className="flex justify-content-between py-1 fs-4" color={color} isOpen={Boolean(info)}>
      <p className="mb-0">{info} {color === "success" ? <Link to="/">Sign In</Link> : ''}</p>
      <span className={`toggle text-${color} fs-2`} onClick={toggle}>&times;</span>
    </Alert>
  )
}
