import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./navStyle.css";
const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="navBar-container">
      <div className="navBar-logo">Logo</div>
      <ul className="navBar-list">
        <li>
          <Link className="link-decoration" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link-decoration" to="/productos">
            Productos
          </Link>
        </li>
        <li>
          <Link className="link-decoration" to="/carrito">
            Cart
          </Link>
        </li>
        <li onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? "Log Out" : "Log In"}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
