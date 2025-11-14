// Error404.js
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-animation"></div>
      <div className="error-text">
        <p>Oops! Page not found</p>
        <Link to="/"><button className='btn'>Back to homepage</button></Link>
      </div>
    </div>
  );
}

export default ErrorPage;
