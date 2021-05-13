const initialState = {
  userInfo: null,
  userToken: null,
  error: null,
  success: null,
  notes: null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGGED':
      return {
        ...state,
        userInfo: action.payload
      }

    case 'USER_TOKEN':
      return {
        ...state,
        userToken: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }

    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload
      }

    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload
      }

    default:
      return state;
  }
}

export default reducer;
