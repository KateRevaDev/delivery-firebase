import Header from "../components/Header";
import CartItems from "../components/Cart/CartItems";

const Cart = ({ order, orderCreated, removeItemFromCart, updateOrder, createOrder }) => {

  return (
    <>
      <Header />
      {!orderCreated
        ? <CartItems order={order} removeItemFromCart={removeItemFromCart} updateOrder={updateOrder} createOrder={createOrder} />
        : <span>Your order was succesfully created!</span>
      }
    </>
  );
};

export default Cart;
