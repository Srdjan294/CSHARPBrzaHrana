import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';



export default function NavbarBrzaHrana(){

    const navigate = useNavigate();
    
    
    return(

    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate(RoutesNames.HOME)}>Brza Hrana</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate(RoutesNames.HOME)}>Početna</Nav.Link>
            <Nav.Link href="http://srdjan294-002-site1.atempurl.com/swagger/index.html" target='_blank'>Swagger</Nav.Link>
            <Nav.Link onClick={() => navigate(RoutesNames.JELOVNIK_PREGLED)}>Jelovnik</Nav.Link>
            <Nav.Link onClick={() => navigate(RoutesNames.KORISNIK_PREGLED)}>Korisnici</Nav.Link>
            <Nav.Link href="#link">Narudžbe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  


    );
}