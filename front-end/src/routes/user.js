import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const User = () => {
  const { user } = useSelector(state => state);
  // const dispatch = useDispatch();
  // const history = useHistory();
  //
  // React.useEffect(() => {
  //   if(!user.userInfo) {
  //     history.push('/');
  //   }
  // }, [history, user.userInfo]);

  return (
    <div className="flex column">
      <h1>User Page</h1>
    </div>
  )
}

export default User;
