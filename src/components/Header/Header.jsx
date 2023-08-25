import { useSelector } from "react-redux";
import { selectOrderQuantity } from "../../saga/reducer";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import HeaderTooltip from "./HeaderTooltip";


const Header = () => {

  const quantity = useSelector(selectOrderQuantity);
  const userName = useSelector(state => state.userInfo.username);

  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/shops">
            <HeaderTooltip title="Shops">
                <ShoppingBagOutlinedIcon />
                Shops
            </HeaderTooltip>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <HeaderTooltip
              title={`You have ${quantity || 'no'} ${quantity === 1 ? 'product' : 'products'} in your cart`}
            >
              <ShoppingCartOutlinedIcon />
              Cart ({quantity || 0})
            </HeaderTooltip>
          </Nav.Link>
          <Nav.Link as={Link} to="/admin">
            <HeaderTooltip title="Admin panel">
              <AdminPanelSettingsOutlinedIcon />
              Admin
            </HeaderTooltip>
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            <HeaderTooltip title="Profile">
              Profile
            </HeaderTooltip>
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
