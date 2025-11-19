import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/userContext';
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isDarkMode ? 'dark-navbar' : 'light-navbar'}`} id='navbar'>
      <div className="container d-flex justify-content-space-around align-items-center">
        <div className="navbar-brand">
          <Link to="/"><img src={Logo} alt='logo' style={{ height: "5rem", width: "auto" }} /></Link>
        </div>
        <div className='icons'>
          <button className="nav-link" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{ color: 'black' }} />
          </button>
          <button className="navbar-toggler" type="button" onClick={handleNavbarToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      <div className={`collapse navbar-collapse justify-content-end ${navbarOpen ? 'show' : ''}`}>
        <ul className="navbar-nav" onClick={() => setNavbarOpen(false)}>
          <li><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
          {currentUser ? (
            <>
              <li><Link className="nav-link" to="/profile">My Profile</Link></li>
              <li><Link className="nav-link" to="/authors">Authors</Link></li>
              <li><Link className="nav-link" to="/create">Create Post</Link></li>
              <li><Link className="nav-link" to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link className='nav-link' to="/authors">Authors</Link></li>
              <li><Link className="nav-link" to="/login">Login</Link></li>
              <li><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
