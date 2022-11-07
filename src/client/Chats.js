import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_CHATS = gql`
  {
    chats {
      id
      users {
        id
        avatar
        username
      }
      lastMessage {
        text
      }
    }
  }
`;

const usernamesToString = (users) => {
  const userList = users.slice(1);

  var usernamesString = "";

  for (var i = 0; i < userList.length; i++) {
    usernamesString += userList[i].username;

    if (i - 1 === userList.length) {
      usernamesString += ", ";
    }
  }

  return usernamesString;
};

const shorten = (text) => {
  if (text.length > 12) {
    return text.substring(0, text.length - 9) + "...";
  }

  return text;
};

const Chats = () => {
  const { loading, error, data } = useQuery(GET_CHATS);
  if (loading)
    return (
      <div className="chats">
        <p>Loading ...</p>
      </div>
    );
  if (error)
    return (
      <div className="chats">
        <p>{error.message}</p>
      </div>
    );

  const { chats } = data;

  return (
    <div className="chats">
      {chats.map((chat, i) => (
        <div key={chat.id} className="chat">
          <div className="header">
            <img
              src={
                chat.users.length > 2
                  ? faker.image.abstract()
                  : chat.users[1].avatar
              }
            />

            <div>
              <h2>{shorten(usernamesToString(chat.users))}</h2>
              <span>{chat?.lastMessage?.text}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
