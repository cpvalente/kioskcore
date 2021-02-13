import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar({ devices }) {
  return (
    <div className='navbar'>

      {devices.map((d) => (
        <NavLink
          className='navItemWrapper'
          activeClassName='selected'
          to={`/device/${d.id}`}
          key={d.id}
        >
          <div className='navItem' key={d.id}><span className='deviceShort'>{d.short}</span></div>
        </NavLink>
      ))}

      <NavLink
        className='navItemWrapper'
        activeClassName='selected'
        to={'/settings'}
      >
        <div className='navItem-settings' />
      </NavLink>
    </div>
  );
}
