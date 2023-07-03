import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrderQuantity } from "../saga/reducer";

const Header = () => {

  const quantity = useSelector(selectOrderQuantity);

  return (
    <header>
      <ul className="header-items">
        <li className="header-item header-shops">
          <Link to={`/shops`}>Shops</Link>
        </li>
        <li className="header-item header-cart">
          <Link to={`/cart`}>Cart <span>({ quantity || 0 })</span></Link>
        </li>
        <li className="header-item header-admin">
          <Link to={`/admin`}>Admin</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
