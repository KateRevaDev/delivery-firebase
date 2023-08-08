import Header from "../components/Header";
import Shops from "../components/Shops";
import Products from "../components/Products";

const ShopProducts = ({ products, shops, currentShop, setCurrentShop, addToCart, isAdmin, removeProduct }) => {
  return (
    <>
      <Header />
      <div className="content-container">
        <Shops shops={shops} currentShop={currentShop} setCurrentShop={setCurrentShop} />
        <Products products={products} addToCart={addToCart} removeProduct={removeProduct} isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default ShopProducts;
