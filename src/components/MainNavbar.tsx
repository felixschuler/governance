import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to={'/'}>
          Audit Explorer
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to={'auditors'}>
              Auditors
            </Link>
            <Link className="nav-link" to={'audits'}>
              Audits
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
