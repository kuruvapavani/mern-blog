import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from './components/Loader';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import PostItem from './PostItem';

const AuthorPosts = () => {
  const {authorId} = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const lastPostRef = useRef(null);
  const[author,setAuthor]=useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/authors/${authorId}`);
        setPosts(response.data);
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

    fetchPosts();
  }, []);
  useEffect(()=>{
    const fetchAuthor= async()=>{
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`);
        setAuthor(response.data);
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

    fetchAuthor();
  }, []);
  useEffect(() => {
    if (lastPostRef.current) {
      const navbarHeight = document.getElementById('navbar').offsetHeight; // Replace 'navbar' with the actual ID of your navigation bar
      const postTopPosition = lastPostRef.current.offsetTop;
      const marginTop = "4rem"; // Adjust this value as needed to ensure the top posts are fully visible
      const scrollToPosition = postTopPosition - navbarHeight - marginTop;
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  }, [posts]);
  return (
    <div>
    {posts.length===0?<div><h1 className='error-msg'>No Posts Yet!</h1></div>:
    <div>
      {isLoading ? <LoadingAnimation /> :
    <div className="posts-grid">
      {posts.map((post,index) => (
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
              icons={[]}
            />
          ))}
    </div>
      }
      </div>}
      </div>
  )
}
export default AuthorPosts;