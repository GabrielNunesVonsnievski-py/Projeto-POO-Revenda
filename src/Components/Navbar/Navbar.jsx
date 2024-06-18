import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ cartItemsCount }) => {
  const [menu, setMenu] = useState("");

  return (
    <div className='nav'>
      <div className='nav-logo'>
        <Link to="/" className="nav-link">The Car</Link>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => setMenu('products')}>
          <Link to="/products" className="nav-link">Products</Link>
        </li>
        <li onClick={() => setMenu('login')}>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li onClick={() => setMenu('cart')} className='nav-contact'>
          <Link to="/cart" className="nav-link">Cart ({cartItemsCount})</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
