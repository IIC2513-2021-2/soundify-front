import React from 'react';


function Navbar() {
  return (
    <header>
      <div class="container">
        <div class="logo">
          <a href="#Home">Soundify</a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#Users">Users</a>
            </li>
            <li>
              <a href="#Artists">Artists</a>
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
