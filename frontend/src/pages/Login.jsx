import React, { useState, useContext } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './context/userContext';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (userData === '') {
      setFocused(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred.');
      }
    }
  };

  return (
    <div className="register-form login form">
      <h2>Login</h2>
      {error && <h6 className="error"><FontAwesomeIcon icon={faCircleExclamation} /> {error}</h6>}
      <form onSubmit={loginUser}>
        <Input label="Email" placeholder="" name='email' value={userData.email} onChange={handleChange} handleFocus={handleFocus} handleBlur={handleBlur} focused={focused} type="email"/>
        <Input label="Password" type="password" name='password' placeholder="" value={userData.password} onChange={handleChange} handleFocus={handleFocus} handleBlur={handleBlur} focused={focused} />
        <button className="btn" type="submit">Login</button>
      </form>
      <small className='small'>Don't have an account?<Link to="/register" style={{ color: "#999" }}>Register</Link></small>
    </div>
  );
};

export default Login;
