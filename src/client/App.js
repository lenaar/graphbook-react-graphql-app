import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
import Chats from "./Chats";
import Feed from "./Feed";
import Bar from "./components/bar";
import "./components/fontawesome";
import "../../assets/css/style.css";

const initialPosts = [1, 2].map((id) => ({
  id,
  text: faker.lorem.paragraph(),
  user: { avatar: faker.image.avatar(), username: faker.internet.userName() },
}));

const App = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>

        <meta
          name="description"
          content="Newsfeed of all fake friends on Graphbook"
        />
      </Helmet>
      <Bar />
      <Feed />
      <Chats />
    </div>
  );
};

export default App;
