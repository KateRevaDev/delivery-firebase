import { useState } from "react";
import Holder from "../../assets/holder143x90.png"
import { Card, CloseButton, Form, Image } from "react-bootstrap";
import AnimatedHolder from "../../assets/holder.gif"

const CartItem = ({ item, removeItemFromCart, updateOrder }) => {

  const [quantity, setQuantity] = useState(item.quantity);
  const [isImgLoaded, setImgIsImgLoaded] = useState(false);

  const { price, currency, name, imageURL } = item;

  return (
    <Card className="m-3 cart-item" key={`good-${item.id}`}>
      <Card.Body className="cart-item__content">
        <Image
          className="cart-item__img"
          src={isImgLoaded ? (imageURL ? imageURL : Holder) : (imageURL ? AnimatedHolder : Holder)}
          onLoad={() => setImgIsImgLoaded(true)}
        />
        <div>
          <Card.Text className="mb-2">{name}</Card.Text>
          <div className="mb-2 cart-item__quantity">
            <Form.Control
              defaultValue={quantity}
              min={1}
              max={999999}
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
            <CloseButton alt="Remove item" onClick={() => removeItemFromCart(item)} className="cart-item__close-img m-1" />
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            {price || 0} {' '} {currency || "UAH"}
          </Card.Subtitle>
        </div>
      </Card.Body >
    </Card >
  );
};

export default CartItem;
