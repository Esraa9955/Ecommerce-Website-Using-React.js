import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  

  //const { favoritesmovies } = useSelector((state) => state?.favorites);
  return (
    <>
     <nav className="navbar  bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/' className="navbar-brand">Products App</Link>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
      
    </form>
 
  
   
    <div className='d-flex align-items-center '>
 
      
    <div className='d-flex align-items-center'>
    <Link to='/cart'><i className="fas fa-shopping-cart" style={{fontSize: '24px', 
    color: 'green', 
    marginRight: '5px', cursor:'pointer' }}></i></Link>
    {/*<Link to='/cart' className="navbar-brand m-2">Cart({favoritesmovies?.length})</Link>*/}
    </div>

    </div>
   
  </div>
</nav>
    
    </>
  )
}

export default Header;
