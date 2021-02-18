import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { login } from "../reducer";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:1337/auth/local/register";

const Register = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state);

  // const show_user = (tokken) => {
  //   console.log("tokken", tokken);
  //   fetch("http://localhost:1337/users/me", {
  //     headers: {
  //       Authorization: `Bearer ${tokken}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       console.log("parsing log", res);
  //       return res.json();
  //     })
  //     .then((res) => console.log(res));
  // };

  const register = (data) => {
    fetch(API_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        // setUserJwt(res.jwt);
        dispatch(login(res.user));
        // show_user(res.jwt);
        Cookies.set("jwt", res.jwt);
        console.log(res);
      });
  };

  const fetchRegister = (data) => {
    return (dispatch) => {
      register(data);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    console.log(data);
    // register(data);
    dispatch(fetchRegister(data));
  };
  if (currentUser.id) return <Redirect to="/" />;
  return (
    <div>
      <h1>Register </h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Register;
