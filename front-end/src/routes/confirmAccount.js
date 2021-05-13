import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAccount, setError, setSuccess } from '../store/user/actions';
import { CustomAlert } from '../components/common';

const ConfirmAccount = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    let path = pathname.slice(pathname.lastIndexOf('/') + 1);
    dispatch(confirmAccount(path));
    // console.log(path);
    return () => {
      dispatch(setError(null));
      dispatch(setSuccess(null));
    }
  }, [dispatch, pathname]);

  return (
    <div className="flex column">
      <h1>Confirm Account</h1>      
      <CustomAlert
        info={user.error}
        color="danger"
        toggle={() => dispatch(setError(null))} />
      <CustomAlert
        info={user.success}
        color="success"
        toggle={() => dispatch(setSuccess(null))} />
    </div>
  )
}

export default ConfirmAccount;
