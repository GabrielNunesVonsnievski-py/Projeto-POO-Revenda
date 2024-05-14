import './Navbar.css'
import React, { useState, Link} from 'react';
import { Routes, Route, Link} from 'react-router-dom'
import LoginForm from '../../Pages/Login';

const Navbar = () => {

  const [menu, setMenu] = useState("");
  
    return(
      <div className='nav'>
        <div className='nav-logo'>The Car</div>
        <ul className='nav-menu'>
            <li>Home</li>
            <li>Explore</li>
            <li onClick={LoginForm}>Login</li>
            <li className='nav-contact'>Kart</li>
        </ul>
  
      </div>
    )
  }
  
  export default Navbar