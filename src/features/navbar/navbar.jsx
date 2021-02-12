import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarSettings from './navbarSettings';

export default function Navbar({ devices }) {


  return (
    <div className='navbar'>
      {devices.map((d) => (
        <NavLink
          className='navItemWrapper'
          activeClassName='selected'
          to={`/device:${d.ipaddress}`}
          key={d.ipaddress}
        >
          <div
            className='navItem'
            key={d.ipaddress}
          />
        </NavLink>
      ))}
        <NavLink
          className='navItemWrapper'
          activeClassName='selected'
          to={'/settings'}
        >
          <div
            className='navItem-settings'
          />
        </NavLink>
    </div>
  );
}
