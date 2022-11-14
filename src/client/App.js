import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
import Chats from "./Chats";
import Feed from "./Feed";
import Bar from "./components/bar";
import LoginRegisterForm from "./components/loginregister";
import "./components/fontawesome";
import "../../assets/css/style.css";

const initialPosts = [1, 2].map((id) => ({
  id,
  text: faker.lorem.paragraph(),
  user: { avatar: faker.image.avatar(), username: faker.internet.userName() },
}));

const App = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));

  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>

        <meta
          name="description"
          content="Newsfeed of all fake friends on Graphbook"
        />
      </Helmet>
      {loggedIn && (
        <div>
          <Bar changeLoginState={setLoggedIn} />
          <Feed />
          <Chats />
        </div>
      )}

      {!loggedIn && <LoginRegisterForm changeLoginState={setLoggedIn} />}
    </div>
  );
};

export default App;
