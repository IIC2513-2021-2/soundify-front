import React from 'react';
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to='/'>Soundify</Link>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#Users">Users</a>
            </li>
            <li>
              <Link to='/artists'>Artists</Link>
            </li>
            <li>
              <a href="#Albums">Albums</a>
            </li>
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              <a href="#LogIn">Log In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
