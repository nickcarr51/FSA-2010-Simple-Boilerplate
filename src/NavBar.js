import React from 'react';
import { Link } from 'react-router-dom';
// import HomeIcon from '@material-ui/icons/Home';


const Navbar = () => {
  return (
    <div className="header">
      <nav>
        {
          <div className="navBar">
            {/* The navbar will show these links after you log in */}
            <Link to="/">
              {/* <HomeIcon fontSize="small" /> */}
              Home
            </Link>
          </div>
          }
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
