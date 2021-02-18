import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import ProfileEdit from "../ProfileEdit";

const Profile = ({ match }) => {
  const currentUser = useSelector((state) => state);
  const jwt = Cookies.get("jwt");
  const [userProfileData, setUserProfileData] = useState("");
  console.log("user: ", currentUser);
  const who = match.url.split("/")[2] || "me";

  useEffect(() => {
    if (jwt && who !== "edit")
      fetch(`http://localhost:1337/users/${who}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => setUserProfileData(res));
  }, [jwt, who]);

  if (!jwt) return <div>Connectez-vous</div>;
  return (
    <div>
      <h1>Profile :</h1>
      <ul>
        <li>username : {userProfileData.username}</li>
        <li>Email: {userProfileData.email}</li>
        <li>Description : {userProfileData.description}</li>
        <li>Confirmed : {userProfileData.confirmed}</li>
        <li>Created : {userProfileData.create_at}</li>
        <li>Updated: {userProfileData.updated_at}</li>
      </ul>
      <Link to="profile/edit">edit</Link>
      <Route path="/profile/edit">
        <ProfileEdit user={userProfileData}></ProfileEdit>
      </Route>
    </div>
  );
};

export default Profile;
