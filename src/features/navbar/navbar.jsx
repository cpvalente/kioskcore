import NavbarItem from "./navbarItem";
import NavbarSettings from "./navbarSettings";

export default function Navbar() {

  return (
    <div className='navbar'>
      <NavbarItem />
      <NavbarItem />
      <NavbarItem />
      <NavbarSettings />
    </div>
  )
}
