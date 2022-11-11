import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../assets/css/style.css";
import Loading from "./components/loading";
import Error from "./components/error";
import Post from "./components/post";
import { GET_POSTS } from "./apollo/queries/getPosts";
import { useAddPostMutation } from "./apollo/mutations/addPost";

const Feed = () => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //polling fetch every 5000 ms = 5 seconds
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    pollInterval: 5000,
    variables: { page: 0, limit: 10 },
  });
  const [postContent, setPostContent] = useState("");
  const [addPost] = useAddPostMutation(postContent);

  const loadMore = (fetchMore) => {
    const self = this;
    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult.postsFeed.posts.length) {
          setHasMore(false);
          return previousResult;
        }
        setPage(page + 1);
        const newData = {
          postsFeed: {
            __typename: "PostFeed",
            posts: [
              ...previousResult.postsFeed.posts,
              ...fetchMoreResult.postsFeed.posts,
            ],
          },
        };
        return newData;
      },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    addPost({ variables: { post: { text: postContent } } });
    setPostContent("");
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <Error>
        <p>{error.message}</p>
      </Error>
    );
  const { postsFeed } = data;
  const { posts } = postsFeed;

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
        <InfiniteScroll
          dataLength={posts.length}
          next={() => loadMore(fetchMore)}
          hasMore={hasMore}
          loader={
            <div className="loader" key={"loader"}>
              Loading ...
            </div>
          }
        >
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
