import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ShopProducts from "./pages/ShopProducts.jsx";
import Cart from "./pages/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { initialize_fb } from "./api/queries.js";
import { useEffect } from "react";
import AdminPanel from "./pages/AdminPanel.jsx";
import * as sagaActions from "./saga/actions.js";
import { bindActionCreators } from "@reduxjs/toolkit";
import Loader from "./components/Loader.jsx";


const App = () => {

  const isLoading = useSelector(state => state.isLoading);
  const products = useSelector(state => state.goods);
  const shops = useSelector(state => state.shops);
  const order = useSelector(state => state.order);
  const orderCreated = useSelector(state => state.orderCreated)
  const currentShop = useSelector(state => state.currentShop);
  const isAdmin = useSelector(state => state.userInfo.isAdmin);

  const dispatch = useDispatch();
  const {
    getShops,
    getProducts,
    setCurrentShop,
    addToCart,
    removeItemFromCart,
    updateOrder,
    createOrder,
    removeProduct,
  } = bindActionCreators(sagaActions, dispatch);

  useEffect(() => {
    initialize_fb();
    getShops();
    setCurrentShop();
  }, []);

  useEffect(() => {
    if (currentShop) {
      getProducts(currentShop);
    }
  }, [currentShop])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ShopProducts
              products={products}
              shops={shops}
              currentShop={currentShop}
              setCurrentShop={setCurrentShop}
            />}
        />
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
          element={<ShopProducts
            products={products}
            shops={shops}
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
            addToCart={addToCart}
            isAdmin={isAdmin}
            removeProduct={({ id }) => removeProduct({ shopId: currentShop.id, id })}
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
