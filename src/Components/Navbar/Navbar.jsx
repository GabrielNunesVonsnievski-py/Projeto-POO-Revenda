import './Navbar.css'

const Navbar = () => {
    return(
      <div className='nav'>
        <div className='nav-logo'>The Car</div>
        <ul className='nav-menu'>
            <li>Home</li>
            <li>Explore</li>
            <li className='nav-contact'>Kart</li>
        </ul>
  
      </div>
    )
  }
  
  export default Navbar