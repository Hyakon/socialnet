import { useReducer } from "react";
import { applyMiddleware, createStore } from "redux";
import userReducer from "./user/userReducer";
import thunkMiddleware from "redux-thunk";

let store = createStore(userReducer, applyMiddleware(thunkMiddleware));

let logState = () => console.log("STORE : ", store.getState());

store.subscribe(logState);

export default store;
