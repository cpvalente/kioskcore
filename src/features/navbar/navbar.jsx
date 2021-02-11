import NavbarItem from "./navbarItem";
import NavbarSettings from "./navbarSettings";

export default function Navbar() {


  return (
    <div className='navbar'>
      <NavbarItem selected={false} />
      <NavbarItem selected={false} />
      <div className='navItemWrapper selected'>
      <div className='navItem'></div>
    </div>


      <NavbarSettings />
    </div>
  )
}
