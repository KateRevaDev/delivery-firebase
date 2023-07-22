import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ShopGoods from "./pages/ShopGoods.jsx";
import Cart from "./pages/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "./saga/reducer.js";
import { initialize_fb } from "./api/queries.js";
import { useEffect } from "react";
import AdminPanel from "./pages/AdminPanel.jsx";
import * as sagaActions from "./saga/actions.js";
import { bindActionCreators } from "@reduxjs/toolkit";
import Loader from "./components/Loader.jsx";


const App = () => {

  const isLoading = useSelector(selectors.selectIsLoading);
  const goods = useSelector(selectors.selectGoods);
  const shops = useSelector(selectors.selectShops);
  const order = useSelector(selectors.selectOrder);
  const orderCreated = useSelector(selectors.selectOrderCreated)
  const currentShop = useSelector(selectors.selectCurrentShop);
  const isAdmin = useSelector(state => state.userInfo.isAdmin);

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
          element={<ShopGoods
            goods={goods}
            shops={shops}
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
            addToCart={addToCart}
            isAdmin={isAdmin}
          />}
        />
        {isAdmin && <Route path="admin" element={<AdminPanel shops={shops} />} />}
      </>
    )
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <RouterProvider router={router} />
      )}
    </>);
};

export default App;
