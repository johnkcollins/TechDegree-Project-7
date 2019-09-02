import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {

      return (
        <nav className="main-nav">
          <ul>
              <li><NavLink to={'/dry_tortugas'}>Dry Tortugas</NavLink></li>
              <li><NavLink to={'/sea_turtles'}>Sea Turtles</NavLink></li>
              <li><NavLink to={'/sand_crabs'}>Sand Crabs</NavLink></li>
          </ul>
        </nav>
    );

};

export default Nav