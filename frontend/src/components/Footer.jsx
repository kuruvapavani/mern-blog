import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    
    <div>
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className="col mb-3">
            <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
              <img src={Logo} alt='home' style={{height:"15rem",width:"auto"}}/>
            </a>
      </div>
      <div className="col mb-3">

      </div>
      <div className="col mb-3">
        <h5>Categories</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-muted">All</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Food" className="nav-link p-0 text-muted">Food</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Technology" className="nav-link p-0 text-muted">Technology</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Entertainment" className="nav-link p-0 text-muted">Entertainment</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Agriculture" className="nav-link p-0 text-muted">Agriculture</a></li>
        </ul>
      </div>

      <div className="col mb-3">
        <h5>Categories</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="/posts/categories/Art" className="nav-link p-0 text-muted">Art</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Business" className="nav-link p-0 text-muted">Business</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Education" className="nav-link p-0 text-muted">Education</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Weather" className="nav-link p-0 text-muted">Weather</a></li>
          <li className="nav-item mb-2"><a href="/posts/categories/Investment" className="nav-link p-0 text-muted">Investment</a></li>
        </ul>
      </div>
      <div className="col mb-3">
        <h5>Contact</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="/about" className="nav-link p-0 text-muted">About</a></li>
          <li className="nav-item mb-2"><a href="/contact" className="nav-link p-0 text-muted">Contact me</a></li>
          <li className="nav-item mb-2"><a href="https://kuruvapavani.github.io/my_portfolio/" className="nav-link p-0 text-muted">My Portfolio</a></li>
          <li className="nav-item mb-2"><a href="https://www.linkedin.com/in/kuruva-pavani-10388b27b/" className="nav-link p-0 text-muted">Linked In</a></li>
          <li className="nav-item mb-2"><a href="https://github.com/kuruvapavani" className="nav-link p-0 text-muted">Github Profile</a></li>
        </ul>
      </div>
      </div>
      </div>
    </footer>
    <div className="text-muted cw">© made with 🩷 by Kuruva Pavani</div>
</div>
  )
}

export default Footer