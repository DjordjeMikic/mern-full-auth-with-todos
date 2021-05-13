import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/user/actions';

const Nav = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="flex nav justify-content-end bg-primary">
      <h1>
        <Link to="/" className="flex">Project</Link>
      </h1>

      {user && user.userInfo && user.userInfo.exp > 0 ? (
        <p className="logout mb-0" onClick={() => dispatch(logout())}>Logout {' '}
          <i className="fas fa-sign-out-alt"></i>
        </p>
      ) : ''}
    </div>
  )
}

export default Nav;
