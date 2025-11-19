import React, { useState, useEffect, useRef } from "react";
import LoadingAnimation from "../components/Loader";
import axios from "axios";
import PostItem from "../components/PostItem";

const HomePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/`
        );
        const updatedPosts = await Promise.all(
          response.data.map(async (post) => {
            const authorResponse = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/users/${post.authorId}`
            );
            return {
              ...post,
              author: authorResponse.data,
            };
          })
        );
        setPosts(updatedPosts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="posts-grid">
      {posts.map((post, index) => (
        <PostItem
          key={post._id}
          postId={post._id}
          postTitle={post.title}
          postDescription={post.previewDescription}
          postDate={post.createdAt}
          category={post.category}
          postThumbnail={post.thumbnail}
          author={post.author}
          ref={index === posts.length - 1 ? lastPostRef : null}
          icons={[]}
        />
      ))}
    </div>
  );
};

export default HomePosts;
