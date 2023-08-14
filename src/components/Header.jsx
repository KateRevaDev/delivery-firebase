import { useSelector } from "react-redux";
import { selectOrderQuantity } from "../saga/reducer";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Fade, Tooltip } from "@mui/material";

const Header = () => {

  const quantity = useSelector(selectOrderQuantity);

  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/shops">
            <ShoppingBagOutlinedIcon />
            Shops
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <Tooltip
              title={`You have ${quantity || 'no'} ${quantity === 1 ? 'product' : 'products'} in your cart`}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <ShoppingCartOutlinedIcon />
              Cart ({quantity || 0})
            </Tooltip>
          </Nav.Link>
          <Nav.Link as={Link} to="/admin">
            <AdminPanelSettingsOutlinedIcon />
            Admin
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
