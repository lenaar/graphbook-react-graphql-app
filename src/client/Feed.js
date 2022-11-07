import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "../../assets/css/style.css";

const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;

const GET_POSTS = gql`
  {
    posts {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [postContent, setPostContent] = useState("");
  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      const data = cache.readQuery({ query: GET_POSTS });
      const newData = { posts: [addPost, ...data.posts] };
      cache.writeQuery({ query: GET_POSTS, data: newData });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    addPost({ variables: { post: { text: postContent } } });
    setPostContent("");
  };

  if (loading) return "Loading ...";
  if (error) return `Error! ${error.message}`;
  const { posts } = data;

  return (
    <div className="container">
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

export default Feed;
