import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
      return (
        <nav className="main-nav">
          <ul>
              <li><NavLink onClick={() => props.performSearch('Dry Tortugas')} exact to={`/dry tortugas`} >Dry Tortugas</NavLink></li>
              <li><NavLink onClick={() => props.performSearch('sea turtles')} exact to={`/sea turtles`} >Sea Turtles</NavLink></li>
              <li><NavLink onClick={() => props.performSearch('sand crabs')} exact to={`/sand crabs`} >Sand Crabs</NavLink></li>
          </ul>
        </nav>
    );

};

export default Nav