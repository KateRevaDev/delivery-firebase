import { useState } from "react";
import NoImagePlaceholder from "../../assets/no-image-placeholder.png";
import CloseImg from "../../assets/close.svg";

const CartItem = ({ item, removeItemFromCart, updateOrder }) => {

  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div key={`good-${item.id}`} className="cart-item">
      <img className="cart-item__img" src={NoImagePlaceholder} />
      <div className="cart-item__content">
        <div className="cart-item__name">{item.name}</div>
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
          <img
            className="cart-item__close-img"
            src={CloseImg}
            alt="Remove item"
            onClick={() => removeItemFromCart(item)}
          />
        </div>
        <div>
          {item?.price || 0} <span>{item?.currency || "UAH"}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
