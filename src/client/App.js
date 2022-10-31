import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
import "../../assets/css/style.css";

const initialPosts = [1, 2].map((id) => ({
  id,
  text: faker.lorem.paragraph(),
  user: { avatar: faker.image.avatar(), username: faker.internet.userName() },
}));

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
      },
    };
    console.log("postContent", postContent);

    setPosts([newPost, ...posts]);

    setPostContent("");
  };
  return (
    <div className="container">
      <Helmet>
        <title>Graphbook - Feed</title>

        <meta
          name="description"
          content="Newsfeed of all fake friends on Graphbook"
        />
      </Helmet>
      <div className="postForm">
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => {
              console.log("change");
              setPostContent(e.target.value);
            }}
            placeholder="Write a new post!"
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="feed">
        {posts.map((post, i) => (
          <div key={post.id} className="post">
            <div className="header">
              <img src={post.user.avatar} />

              <h2>{post.user.username}</h2>
            </div>

            <p className="content">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
