import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "./components/Loader";
import axios from "axios";
import PostItem from "./PostItem";

const AuthorPosts = () => {
  const { authorId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, authorRes] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/posts/authors/${authorId}`
          ),
          axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`),
        ]);

        setPosts(postsRes.data);
        setAuthor(authorRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authorId]);

  if (isLoading) return <LoadingAnimation />;

  if (posts.length === 0)
    return (
      <div>
        <h1 className="error-msg">No Posts Yet!</h1>
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
          author={author}
          ref={index === posts.length - 1 ? lastPostRef : null}
          icons={[]}
        />
      ))}
    </div>
  );
};

export default AuthorPosts;
