import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "./pages/reducer";
import ProfileEdit from "./pages/ProfileEdit";

const App = (props) => {
  const dispatch = useDispatch();
  const jwt = Cookies.get("jwt");

  const fetchUserInfo = () => {
    return (dispatch) => {
      fetch("http://localhost:1337/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          dispatch(login(res));
        });
    };
  };

  useEffect(() => {
    if (jwt) {
      dispatch(fetchUserInfo());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:id" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
