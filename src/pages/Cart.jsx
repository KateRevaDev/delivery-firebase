import CartItems from "../components/Cart/CartItems";
import Layout from "../components/containers/Layout";

const Cart = ({ order, orderCreated, removeItemFromCart, updateOrder, createOrder }) => {

  return (
    <Layout>
      {!orderCreated
        ? <CartItems order={order} removeItemFromCart={removeItemFromCart} updateOrder={updateOrder} createOrder={createOrder} />
        : <span>Your order was succesfully created!</span>
      }
    </Layout>
  );
};

export default Cart;
