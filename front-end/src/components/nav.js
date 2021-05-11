import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/user/actions';

const Nav4 = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="flex nav justify-content-end bg-primary">
      <h1>
        <Link to="/" className="flex">Project</Link>
      </h1>

      {user && user.userInfo && user.userInfo.exp > 0 ? (
        <p onClick={() => dispatch(logout())}>Logout {' '}
          <i className="fas fa-sign-out-alt"></i>
        </p>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/reset-token">Reset Token</Link>
          <Link to="/confirm-account">Confirm</Link>
          <Link to="/new-password">New Password</Link>
          <Link to="/forgot-password">Email</Link>
        </>
      )}
    </div>
  )
}

export default Nav4;
