import axios from '../../utils/axiosConf';
import jwt_decode from 'jwt-decode';

export const setError = (a) => {
  return {
    type: 'SET_ERROR',
    payload: a
  }
}
export const setSuccess = (a) => {
  return {
    type: 'SET_SUCCESS',
    payload: a
  }
}
const decode = () => {
  if(localStorage.getItem('bearer')) {
    let item = localStorage.getItem('bearer');
    let token = jwt_decode(item);
    return {
      exp: token.exp,
      iat: token.iat,
      ...token.result
    }
  }
}
export const login = (a) => async (dispatch) => {
  let res = await axios({
    method: 'post',
    url: '/user/login',
    data: a
  });

  if(res.status === 201) {
    if(res.data && res.data.token) {
      localStorage.setItem('bearer', res.data.token);
      dispatch({ type: 'USER_TOKEN', payload: res.data.token });
      let token = decode();
      if(Object.keys(token).length && token.exp > 0) {
        dispatch({ type: 'USER_LOGGED', payload: token });
      }
      console.log(token);
    }
  }
}

export const setUser = () => (dispatch) => {
  let token = decode();
  if(token && token.exp > 0) {
    dispatch({ type: 'USER_TOKEN', payload: localStorage.getItem('bearer') });
    dispatch({ type: 'USER_LOGGED', payload: token })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('bearer');
  dispatch({ type: 'USER_TOKEN', payload: null });
  dispatch({ type: 'USER_LOGGED', payload: null });
}
export const register = (a) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'post',
      url: '/user/register',
      data: a
    });
    if(res.status === 201) {
      dispatch(setSuccess(res.data));
    }
  } catch(e) {
    if(e.response.data.error) {
      dispatch(setError(e.response.data.error));
    }
  }
}









export const setNewPassword = (a, b) => async (dispatch) => {
  let res = await axios({
    method: 'put',
    url: `/user/set-password/${a}`,
    data: b
  })
}
