import Shops from "../components/Shops";
import Products from "../components/Products";
import Layout from "../components/containers/Layout";

const ShopProducts = ({ products, shops, currentShop, setCurrentShop, addToCart, isAdmin, removeProduct }) => {
  return (
    <Layout>
      <div className="content-container">
        <Shops shops={shops} currentShop={currentShop} setCurrentShop={setCurrentShop} />
        <Products products={products} addToCart={addToCart} removeProduct={removeProduct} isAdmin={isAdmin} />
      </div>
    </Layout>
  );
};

export default ShopProducts;
