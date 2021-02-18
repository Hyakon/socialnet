import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { login } from "../reducer";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:1337/users/me";
const ProfileEdit = ({ user }) => {
  const dispatch = useDispatch();
  const jwt = Cookies.get("jwt");

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

  const update = (data) => {
    fetch(API_URL, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatch(login(res));
      });
  };

  const fetchUpdate = (data) => {
    return (dispatch) => {
      update(data);
    };
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.elements.username.value || user.username,
      email: e.target.elements.email.value || user.email,
      password: e.target.elements.password.value || user.password,
    };
    console.log(data);
    // register(data);
    dispatch(fetchUpdate(data));
  };
  console.log(user);
  return (
    <div>
      <h1>Register </h1>
      <form onSubmit={handleUpdate}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder={user.username} />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" placeholder={user.email} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" placeholder={user.password} />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
