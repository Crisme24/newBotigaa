import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <div className="grid-container">
    <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">BOTIGAA</Link>
      </div>
      <div className="header-links">
        <a href="cart.html">Cart</a>
        <a href="signin.html">Sign In</a>
      </div>
    </header>
  <aside className="sidebar">
  <h3>Shopping Categories</h3>
  <button className="sidebar-close-button" onClick={closeMenu}>x</button>
  <ul>
    <li>
      <a href="index.html">Pants</a>
    </li>

    <li>
      <a href="index.html">Shirts</a>
    </li>

  </ul>
</aside>
</div>  
  );
}

export default Header;
