import { LOGIN, LOGOUT } from "./userType";

export const login = (user) => {
  console.log("ACTION LOGIN : ", user);
  return {
    type: LOGIN,
    user: user,
  };
};

export const logout = (user) => {
  return {
    type: LOGOUT,
    user: user,
  };
};
