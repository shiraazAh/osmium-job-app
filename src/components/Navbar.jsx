import "../styles.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomNavbar() {
  return (
    <div className="App container">
      <Container>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Osmium Job Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="tracker">Tracker</Nav.Link>
                <Nav.Link href="jobs">Jobs</Nav.Link>
                <Nav.Link href="preferences">Preferences</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}
