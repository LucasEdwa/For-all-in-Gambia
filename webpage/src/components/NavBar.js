import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/navbar.css";

export default function NavBar() {
  return (
    <Navbar className="nav-bg " expand="lg">
      <Navbar.Brand href="#">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-li">
          <Nav.Link className="white-text" href="#">
            Home
          </Nav.Link>

          <Nav.Link className="white-text" href="#">
            Om oss
          </Nav.Link>
          <NavDropdown
            title="Förstå våra projekt"
            bg="light"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item className="" href="#">
              Action
            </NavDropdown.Item>
            <NavDropdown.Item className="" href="#">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item className="" href="#">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
