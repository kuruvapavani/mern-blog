import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "../components/Loader";
import PostItem from "../components/PostItem";

const CategoryPosts = () => {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`
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
      } catch (err) {
        setError("An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (isLoading) return <LoadingAnimation />;

  if (posts.length === 0)
    return (
      <div className="error-msg">
        <h1>No posts in this category</h1>
      </div>
    );

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

export default CategoryPosts;
