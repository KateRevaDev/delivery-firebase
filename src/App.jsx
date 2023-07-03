import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ShopGoods from "./pages/ShopGoods.jsx";
import Cart from "./pages/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentShop,
  selectGoods,
  selectIsLoading,
  selectOrder,
  selectOrderCreated,
  selectShops,
} from "./saga/reducer.js";
import { initialize_fb } from "./api/queries.js";
import { useEffect } from "react";
import AdminPanel from "./pages/AdminPanel.jsx";
import * as sagaActions from "./saga/actions.js";
import { bindActionCreators } from "@reduxjs/toolkit";


const App = () => {

  const isLoading = useSelector(selectIsLoading);
  const goods = useSelector(selectGoods);
  const shops = useSelector(selectShops);
  const order = useSelector(selectOrder);
  const orderCreated = useSelector(selectOrderCreated)
  const currentShop = useSelector(selectCurrentShop);

  const dispatch = useDispatch();
  const {
    getShops,
    getGoods,
    setCurrentShop,
    addToCart,
    removeItemFromCart,
    updateOrder,
    createOrder,
  } = bindActionCreators(sagaActions, dispatch);

  useEffect(() => {
    initialize_fb();
    getShops();
    setCurrentShop();
  }, []);

  useEffect(() => {
    if (currentShop) {
      getGoods(currentShop);
    }
  }, [currentShop])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ShopGoods goods={goods} shops={shops} currentShop={currentShop} />} />
        <Route path="cart" element={
          <Cart
            order={order}
            orderCreated={orderCreated}
            removeItemFromCart={removeItemFromCart}
            updateOrder={updateOrder}
            createOrder={createOrder}
          />}
        />
        <Route
          path="shops"
          element={<ShopGoods goods={goods} shops={shops} currentShop={currentShop} setCurrentShop={setCurrentShop} addToCart={addToCart} />}
        />
        <Route path="admin" element={<AdminPanel />} />
      </>
    )
  );
  if (isLoading) {
    return <>Loading...</>;
  };

  return (
    <>
      <RouterProvider router={router} />
    </>);
};

export default App;
