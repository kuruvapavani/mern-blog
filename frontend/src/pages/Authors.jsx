import React,{useEffect,useState, useRef } from 'react'
import {Link} from "react-router-dom"
import LoadingAnimation from './components/Loader';
import axios from "axios";
import TimeAgo from './TimeAgo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import DefaultAvatar from "./default.jpg"

const Authors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [authors, setAuthors] = useState([]);
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/authors`);
        setAuthors(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> {err.response.data.message}</>);
        } else {
          setError(<><FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.</>);
        }
        setIsLoading(false);
      }
    }

    fetchAuthors();
  }, []);

  useEffect(() => {
    if (lastPostRef.current) {
      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const postTopPosition = lastPostRef.current.offsetTop;
      const marginTop = "4rem";
      const scrollToPosition = postTopPosition - navbarHeight - marginTop;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }, [authors]);
  return (
    <div className="posts-grid">
      {authors.map((author) => {
        return (
          <Link to={`/posts/author/${author._id}`} style={{ textDecoration: 'none' }}>
          <div key={author.id} className='author-card'>
            <div className='author-details'>
              <img src={author.avatar ? `https://drive.google.com/thumbnail?id=${author.avatar}&sz=w1000` : DefaultAvatar} alt='author' />
              <h3>{author.username}</h3>
            </div>
            <h5>{author.posts} posts</h5>
          </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Authors;