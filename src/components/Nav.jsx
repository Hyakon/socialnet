import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../pages/reducer";
const style = {
  nav: {
    background: "royalBlue",
  },
  li: {
    textDecoration: "none",
    color: "white",
  },
  ul: {
    listStyleType: "none",
    margin: 0,
    display: "flex",
    justifyContent: "space-evenly",
    height: "2em",
    alignItems: "center",
    fontSize: "2em",
  },
};

const Nav = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("jwt", "");
  };
  console.log(currentUser.id, typeof currentUser.id);
  return (
    <nav style={style.nav}>
      <ul style={style.ul}>
        <li>
          <Link style={style.li} to="/">
            Home
          </Link>
        </li>

        <li>
          <Link style={style.li} to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link style={style.li} to="/login">
            Login
          </Link>
        </li>

        <>
          <li>
            <Link style={style.li} to="/profile">
              Profile
            </Link>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </>
      </ul>
    </nav>
  );
};

export default Nav;
