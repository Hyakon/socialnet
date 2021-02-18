import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../reducer";

const Login = (props) => {
  const [redirect, setRedirect] = useState(false);
  const currentUser = useSelector((state) => state);

  const dispatch = useDispatch();
  const register = (data) => {
    console.log("fetching");
    fetch("http://localhost:1337/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        Cookies.set("jwt", res.jwt);
        // console.log(res.user);
        dispatch(login(res.user));
        setRedirect(true);
      });
  };
  // const fetchLogin = (data) => {
  //   return (dispatch) => {
  //     register(data);
  //   };
  // };
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      identifier: e.target.elements.identifier.value,
      password: e.target.elements.password.value,
    };
    console.log("data ::", data);
    // dispatch(fetchLogin(data));
    register(data);
  };
  // if (redirect || !currentUser.id) return <Redirect to="/" />;
  return (
    <div>
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="identifier">identifier</label>
        <input type="text" name="identifier" />
        <label htmlFor="password">password</label>
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
