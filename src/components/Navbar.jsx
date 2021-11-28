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
              <a href="/albums">Albums</a>
            </li>
            <li>
              <a href="#About">About</a>
            </li>
            <li>
              {currentUser ? (
                <button type="button" onClick={handleUserLogout}>Logout</button>
              ) : (
                <Link to="login">Log In</Link>
              )}
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
