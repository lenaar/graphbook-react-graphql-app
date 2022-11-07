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
  //polling fetch every 5000 ms = 5 seconds
  const { loading, error, data } = useQuery(GET_POSTS, { pollInterval: 5000 });
  const [postContent, setPostContent] = useState("");
  const [addPost] = useMutation(ADD_POST, {
    optimisticResponse: {
      __typename: "mutation",
      addPost: {
        __typename: "Post",
        text: postContent,
        id: -1,
        user: {
          __typename: "User",
          username: "Loading...",
          avatar: "/public/loading.gif",
        },
      },
    },
    update(cache, { data: { addPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: addPost,

              fragment: gql`
                fragment NewPost on Post {
                  id
                }
              `,
            });

            return [newPostRef, ...existingPosts];
          },
        },
      });
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
          <div
            key={post.id}
            className={"post " + (post.id < 0 ? "optimistic" : "")}
          >
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
