import { useEffect } from "react";
import CartItems from "../components/Cart/CartItems";
import Layout from "../components/containers/Layout";
import { useDispatch } from "react-redux";
import * as sagaActions from "../saga/actions";
import { bindActionCreators } from "@reduxjs/toolkit";

const Cart = ({ order, orderCreated }) => {

  const dispatch = useDispatch();
  const {
    resetCart,
    removeItemFromCart,
    updateOrder,
    createOrder,
  } = bindActionCreators(sagaActions, dispatch);

  // need to update cart status after creating an order when component unmounts
  useEffect(() => {
    return () => {
      if (orderCreated) {
        resetCart();        
      }
    }
  }, []);

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
