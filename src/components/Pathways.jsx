import React from 'react';
import { Link } from "react-router-dom";

function Pathways() {
  return (
    <div class="pathways">
      <Link to='/artist'>Artists</Link>
      <a href="#Albums">Albums</a>
    </div>
  );
}

export default Pathways;
