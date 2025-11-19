import React from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom';

const Footer = () => {

  const date = new Date();

  return (
    
    <div>
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className="col mb-3">
            <Link to="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
              <img src={Logo} alt='home' style={{height:"auto",width:"24rem"}}/>
            </Link>
      </div>
      <div className="col mb-3">

      </div>
      <div className="col mb-3">
        <h5>Categories</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">All</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Food" className="nav-link p-0 text-muted">Food</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Technology" className="nav-link p-0 text-muted">Technology</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Entertainment" className="nav-link p-0 text-muted">Entertainment</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Agriculture" className="nav-link p-0 text-muted">Agriculture</Link></li>
        </ul>
      </div>

      <div className="col mb-3">
        <h5>Categories</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/posts/categories/Art" className="nav-link p-0 text-muted">Art</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Business" className="nav-link p-0 text-muted">Business</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Education" className="nav-link p-0 text-muted">Education</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Weather" className="nav-link p-0 text-muted">Weather</Link></li>
          <li className="nav-item mb-2"><Link to="/posts/categories/Investment" className="nav-link p-0 text-muted">Investment</Link></li>
        </ul>
      </div>
      <div className="col mb-3">
        <h5>Contact</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted">About</Link></li>
          <li className="nav-item mb-2"><Link to="/contact" className="nav-link p-0 text-muted">Contact me</Link></li>
          <li className="nav-item mb-2"><Link to="https://kuruva-pavani.netlify.app/" className="nav-link p-0 text-muted" target='_blank'>My Portfolio</Link></li>
          <li className="nav-item mb-2"><Link to="https://www.linkedin.com/in/kuruva-pavani-2109k/" className="nav-link p-0 text-muted" target='_blank'>Linked In</Link></li>
          <li className="nav-item mb-2" ><Link to="https://github.com/kuruvapavani" className="nav-link p-0 text-muted" target='_blank'>Github Profile</Link></li>
        </ul>
      </div>
      </div>
      </div>
    </footer>
    <div className="text-muted cw">© {date.getFullYear()} made with 🩷 by Kuruva Pavani</div>
</div>
  )
}

export default Footer