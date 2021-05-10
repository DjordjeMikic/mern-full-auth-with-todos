import React from 'react';
import { Input } from 'reactstrap';

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
