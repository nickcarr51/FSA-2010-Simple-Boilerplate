import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navBar">
      <nav>

            <NavLink to="/" className="nav-bar">
              Home
            </NavLink>

            <NavLink to="/chickenmeal" className="nav-bar">
              Chicken
            </NavLink>


            <NavLink to="/porkmeal" className="nav-bar">
              Pork
            </NavLink>


            <NavLink to="/seafoodmeal" className="nav-bar">
              Seafood
            </NavLink>

      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
