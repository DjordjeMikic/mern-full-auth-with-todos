import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const User = () => {
  const { user } = useSelector(state => state);
  // const dispatch = useDispatch();

  return (
    <div className="flex column w-100">
      <h1>User Page</h1>

      <div className="flex w-100 justify-content-evenly">
        <h1>{user.userInfo.name}</h1>
        <h1>{user.userInfo.lname}</h1>
        <h1>{user.userInfo.username}</h1>
        <h1>{user.userInfo.email}</h1>
        {user.userInfo.age ? <h1>{user.userInfo.age}</h1> : ''}
      </div>
    </div>
  )
}

export default User;
