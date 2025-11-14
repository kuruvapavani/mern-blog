import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <div>Logging out...</div>
  );
};

export default Logout;
