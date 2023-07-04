import { ListGroup } from "react-bootstrap";

const Shops = ({ shops, currentShop, setCurrentShop }) => {
  return (
    <ListGroup className="shops">
      {shops.map((shop) => {
        return (
          <ListGroup.Item
            className={currentShop === shop ? "active" : null}
            action onClick={() => setCurrentShop(shop)}
            key={`shop-${shop.id}`}
            variant="light"
          >
            {shop.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Shops;