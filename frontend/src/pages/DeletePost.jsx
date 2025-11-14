import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const removePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (location.pathname === `/dashboard`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Link><button className='btn' onClick={removePost}>Delete <FontAwesomeIcon icon={faTrashAlt} /> </button></Link>
  );
};

export default DeletePost;
