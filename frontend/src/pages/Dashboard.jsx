import React, { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { faPencil, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import PostItem from '../components/PostItem';
import axios from 'axios';
import LoadingAnimation from '../components/Loader';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const lastPostRef = useRef(null);
  

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const authorId = currentUser?.id;
    if (!authorId) {
      navigate('/login');
      return;
    }
    const getMyPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/authors/${authorId}`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };
    getMyPosts();
  }, [currentUser?.id, navigate, token]);

  useEffect(() => {
    const getAuthor = async () => {
      const authorId = currentUser?.id;
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`);
        setAuthor(response.data);
        setIsLoading(false);
      } catch (error) {
        return error;
      }
    };
    getAuthor();
  }, [currentUser?.id]);

  return (
    <div>
      {posts.length === 0 ? (
        <div className='error-msg'>
          <h2 >No Posts Yet!</h2>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <div className='posts-grid'>
              {posts.map((post, index) => (
                <PostItem
                  key={post._id}
                  postId={post._id}
                  postTitle={post.title}
                  postDescription={post.description}
                  postDate={post.createdAt}
                  category={post.category}
                  postThumbnail={post.thumbnail}
                  author={author}
                  ref={index === posts.length - 1 ? lastPostRef : null}
                  icons={[faEye, faPencil, faTrashAlt]} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
