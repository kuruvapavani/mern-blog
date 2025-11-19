import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
import axios from "axios";
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import LoadingAnimation from "./components/Loader";

const Register = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    setLoading(false);
  }, [token]);

  if (loading || submitLoading) {
    return <LoadingAnimation />;
  }

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    if (userData === '') {
      setFocused(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(
          <>
            <FontAwesomeIcon icon={faCircleExclamation} /> {err.response.data.message}
          </>
        );
      } else {
        setError(
          <>
            <FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.
          </>
        );
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="register-form form">
      <h2>Register</h2>
      <h6 className="error">{error}</h6>

      <form onSubmit={registerUser}>
        <Input
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          focused={focused}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          focused={focused}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          focused={focused}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="password2"
          value={userData.password2}
          onChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          focused={focused}
        />

        <button className="btn" type="submit">
          Register
        </button>
      </form>

      <small className="small">
        Already have an account?
        <Link to="/login" style={{ color: "#999" }}>Login</Link>
      </small>
    </div>
  );
};

export default Register;
