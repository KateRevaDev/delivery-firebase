import { useSelector } from "react-redux";
import { selectOrderQuantity } from "../saga/reducer";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

  const quantity = useSelector(selectOrderQuantity);

  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/shops">Shops</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/cart">Cart ({ quantity || 0 })</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
