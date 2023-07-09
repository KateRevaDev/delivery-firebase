import { useState } from "react";
import Holder from "../../assets/holder143x90.png"
import { Card, CloseButton, Col, Container, Image, Row } from "react-bootstrap";

const CartItem = ({ item, removeItemFromCart, updateOrder }) => {

  const [quantity, setQuantity] = useState(item.quantity);

  const { price, currency, name } = item;

  return (
    <Card className="m-3" key={`good-${item.id}`}>
      <Card.Body className="cart-item__content">
        <Image src={Holder} width={143} rounded />
        <Card.Text>{name}</Card.Text>
        <div className="cart-item__quantity">
          <input
            defaultValue={quantity}
            min={1}
            type="number"
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              updateOrder(
                {
                  field: "quantity",
                  value: Number(e.target.value),
                  id: item.id,
                }
              );
            }}
          />
          <CloseButton alt="Remove item" onClick={() => removeItemFromCart(item)} className="cart-item__close-img" />
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          {price || 0} {' '} {currency || "UAH"}
        </Card.Subtitle>
      </Card.Body >
    </Card >
  );
};

export default CartItem;
