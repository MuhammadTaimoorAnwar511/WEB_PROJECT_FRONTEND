import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Navebar=()=>{
return(
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
{/* <a className="navbar-brand" href="#">profile</a> */}
<Link to="/Profile" className="navbar-brand">
    <FontAwesomeIcon icon={faUser} /> {/* Profile icon */}
</Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
      <Link to="/Home" className="nav-link" aria-current="page">
        <FontAwesomeIcon icon={faHome} /> {/* Home icon */}
      </Link>
    </li>
    <li className="nav-item">
      {/* <a className="nav-link" href="#">notifications</a> */}
      <Link to="#" className="nav-link">
      <FontAwesomeIcon icon={faBell} /> {/* Notification icon */}
      </Link>
    </li>
    <li className="nav-item">
      {/* <a className="nav-link" href="#">orders</a> */}
      <Link to="/orders" className="nav-link">
        Orders
      </Link>
    </li>
    <Link to="/dashboard" className="nav-link">
      Dashboard
    </Link>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown
      </a>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </li>
  </ul>
  <form className="d-flex" role="search">
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success" type="submit">Search</button>
  </form>
  <Link to="/" className="nav-link">
  <FontAwesomeIcon icon={faSignOutAlt} /> 
  </Link>
</div>
</div>
</nav>
</div>
);
}
export default Navebar