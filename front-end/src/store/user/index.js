const initialState = {
  userInfo: null,
  userToken: null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGGED':
      return {
        ...state,
        userInfo: action.payload
      }

    default:
      return state;
  }
}
export default reducer;
