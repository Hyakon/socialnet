import { LOGIN, LOGOUT } from "./userType";

const initialState = {
  id: null,
  username: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.user.id,
        username: action.user.username,
      };

    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default userReducer;
