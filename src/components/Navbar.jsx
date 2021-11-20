import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = function () {
  const { currentUser, handleUserLogout } = useAuth();
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">Soundify</Link>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#Users">Users</a>
            </li>
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <a href="#Albums">Albums</a>
            </li>
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              {currentUser ? (
                <button type="button" onClick={handleUserLogout}>Logout</button>
              ) : (<Link to="/Login">Log In</Link>)}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
