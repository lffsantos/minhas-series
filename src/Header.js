import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler

} from 'reactstrap'
import { Link } from 'react-router-dom';

const Header = (params) => {
  const [open, setOpen] = useState(false)
  const toogle = () => {
    setOpen(!open)
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
          <NavbarToggler onClick={toogle}/>
          <Collapse isOpen={open} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/series">Series</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/generos">Géneros</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;