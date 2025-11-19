import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingAnimation from './components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import PostItem from './PostItem';

const CategoryPosts = () => {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
        const updatedPosts = await Promise.all(response.data.map(async (post) => {
          const authorResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${post.authorId}`);
          return { 
            ...post, 
            author: authorResponse.data
          };
        }));
        setPosts(updatedPosts);
        setIsLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> {err.response.data.message}</>);
        } else {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.</>);
        }
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (lastPostRef.current) {
      const navbarHeight = document.getElementById('navbar').offsetHeight; 
      const postTopPosition = lastPostRef.current.offsetTop;
      const marginTop = "4rem";
      const scrollToPosition = postTopPosition - navbarHeight - marginTop;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }, [posts]);

  return (
    <div>
      {isLoading ? <LoadingAnimation /> :
        posts.length === 0 ? (
          <div className='error-msg'><h1>No posts in this category</h1></div>
        ) : (
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
        )}
    </div>
  );
};

export default CategoryPosts;
