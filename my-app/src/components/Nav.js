import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
      return (
        <nav className="main-nav">
          <ul>
              <li><NavLink onClick={() => props.performSearch('Dry Tortugas') && props.resetRedirect()} exact to={`/dry tortugas`} >Dry Tortugas</NavLink></li>
              <li><NavLink onClick={() => props.performSearch('sea turtles') && props.resetRedirect()} exact to={`/sea turtles`} >Sea Turtles</NavLink></li>
              <li><NavLink onClick={() => props.performSearch('sand crabs') && props.resetRedirect()} exact to={`/sand crabs`} >Sand Crabs</NavLink></li>
          </ul>
        </nav>
    );

};

export default Nav