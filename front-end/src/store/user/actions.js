import axios from '../../utils/axiosConf';
import jwt_decode from 'jwt-decode';

// Setting error in reducer
export const setError = (a) => {
  return {
    type: 'SET_ERROR',
    payload: a
  }
}

// Setting success in reducer
export const setSuccess = (a) => {
  return {
    type: 'SET_SUCCESS',
    payload: a
  }
}

// Decoding jwt token from localStorage
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

// Login and setting token and userInfo
export const login = (a) => async (dispatch) => {
  try {
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
      }
    }
  } catch(e) {
    if(e.response && e.response.status === 400) {
      dispatch(setError(e.response.data));
    }
  }
}

// Set info if user is already logged
export const setUser = () => (dispatch) => {
  let token = decode();
  if(token && token.exp > 0) {
    dispatch({ type: 'USER_TOKEN', payload: localStorage.getItem('bearer') });
    dispatch({ type: 'USER_LOGGED', payload: token })
  }
}

// Logout (clear userInfo and usertoken)
export const logout = () => (dispatch) => {
  localStorage.removeItem('bearer');
  dispatch({ type: 'USER_TOKEN', payload: null });
  dispatch({ type: 'USER_LOGGED', payload: null });
}

// Register user
export const register = (a) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'post',
      url: '/user/register',
      data: a
    });
    if(res.status === 201) {
      dispatch(setSuccess(res.data.success));
    }
  } catch(e) {
    if(e.response && e.response.data) {
      dispatch(setError(e.response.data));
    }
  }
}

// confirm account (activate account)
export const confirmAccount = (a) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'put',
      url: `/user/confirm-account/${a}`
    });
    if(res.status === 201) {
      dispatch(setSuccess('Account is activated'));
    }
  } catch(e) {
    if(e.response) {
      dispatch(setError(e.response.data))
    }
  }
}

// Set changed password
export const changePassword = (a, b) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'put',
      url: `/user/set-password/${a}`,
      data: b
    })
    if(res.status === 201) {
      dispatch(setSuccess(res.data.success));
    }
  } catch(e) {
    if(e.response) {
      dispatch(setError(e.response.data));
    }
  }
}

// Remove note
export const removeNote = (a, b) => async (dispatch) => {
  try {
    await axios({
      method: 'delete',
      url: `/user/note/${a}`,
      data: { id: b }
    })
  } catch(e) {
    if(e.response) {
      dispatch(setError(e.response.data));
    }
  }
}

// Add note to notes
export const addNote = (a, b) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'post',
      url: `/user/note/${a}`,
      data: b
    });
    if(res.status === 201) {
      dispatch(setSuccess(res.data));
    }
  } catch(e) {
    if(e.response) {
      dispatch(setError(e.response.data));
    }
  }
}

// Get your notes
export const getNotes = (a) => async (dispatch) => {
  try {
    let res = await axios({
      method: 'get',
      url: `/user/note/${a}`
    });
    if(res.status === 200) {
      // console.log(res.data);
      dispatch({ type: 'SET_NOTES', payload: res.data });
    }
  } catch (e) {
    if(e.response) {
      dispatch(setError(e.response.data));
    }
  }
}
