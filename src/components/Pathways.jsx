import React from 'react';
import { Link } from "react-router-dom";

function Pathways() {
  return (
    <div className="pathways">
      <Link to='/artists'>Artists</Link>
      <a href="#Albums">Albums</a>
    </div>
  );
}

export default Pathways;
