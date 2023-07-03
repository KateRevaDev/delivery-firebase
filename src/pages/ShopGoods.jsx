import Header from "../components/Header";
import Shops from "../components/Shops";
import Goods from "../components/Goods";

const ShopGoods = ({ goods, shops, currentShop, setCurrentShop, addToCart }) => {
  return (
    <>
      <Header />
      <div className="content-container">
        <Shops shops={shops} currentShop={currentShop} setCurrentShop={setCurrentShop} />
        <Goods goods={goods} addToCart={addToCart} />
      </div>
    </>
  );
};

export default ShopGoods;
