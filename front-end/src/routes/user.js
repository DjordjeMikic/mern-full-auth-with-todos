import React from 'react';
import { useSelector } from 'react-redux';
import Main from '../components/main';

const User = () => {
  const { user } = useSelector(state => state);

  return (
    <div className="h-100 w-100 flex column">
      <h1>User Page</h1>
      <Main />

      <div className="flex column w-100 justify-content-evenly mt-4">
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
