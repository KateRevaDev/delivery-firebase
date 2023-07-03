const Shops = ({ shops, currentShop, setCurrentShop }) => {
    return (
        <ul className="shops">
          {shops.map((shop) => {
            return (
              <li
                className={`shop-item ${currentShop === shop ? "active" : null}` }
                onClick={() => setCurrentShop(shop)}
                key={`shop-${shop.id}`}
              >
                <div>{shop.name}</div>
              </li>
            );
          })}
        </ul>
    );
};

export default Shops;