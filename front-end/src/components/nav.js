import React from 'react';
import { Link } from 'react-router-dom';

const Nav4 = () => {
  return (
    <div className="flex nav justify-content-end bg-primary">
      <h1>
        <Link to="/" className="flex">Project</Link>
      </h1>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/reset-token">Reset Token</Link>
      <Link to="/confirm-account">Confirm</Link>
      <Link to="/forgot-password">Email</Link>
    </div>
  )
}

export default Nav4;
