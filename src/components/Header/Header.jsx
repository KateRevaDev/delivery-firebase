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
  const username = useSelector(state => state.userInfo.name);
  const isAdmin = useSelector(state => state.userInfo.isAdmin);

  return (
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/shops">
            <HeaderTooltip title="Shops">
              <span>
                <ShoppingBagOutlinedIcon />
                Shops
              </span>
            </HeaderTooltip>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <HeaderTooltip
              title={`You have ${quantity || 'no'} ${quantity === 1 ? 'product' : 'products'} in your cart`}
            >
              <span>
                <ShoppingCartOutlinedIcon />
                Cart ({quantity || 0})
              </span>
            </HeaderTooltip>
          </Nav.Link>
          {isAdmin && (
            <Nav.Link as={Link} to="/admin">
              <HeaderTooltip title="Admin panel">
                <span>
                  <AdminPanelSettingsOutlinedIcon />
                  Admin
                </span>
              </HeaderTooltip>
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/profile">
            <HeaderTooltip title="Profile">
              <span>
                {username ? `Hello, ${username}` : 'Profile'}
              </span>
            </HeaderTooltip>
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
