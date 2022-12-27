import React from "react";

import { useParams } from "react-router-dom";

import UserProfile from "./components/user";

import Chats from "./Chats";

import Bar from "./components/bar";

export const User = ({ changeLoginState }) => {
  const { username } = useParams();
  return (
    <>
      <Bar changeLoginState={changeLoginState} />

      <UserProfile username={username} />

      <Chats />
    </>
  );
};

export default User;
