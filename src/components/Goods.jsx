import NoImagePlaceholder from "../assets/no-image-placeholder.png"

const Goods = ({ goods, addToCart }) => {
    return (
        <div className="goods">
            {goods.length ? goods.map((item) => {
                return (
                    <div key={`good-${item.id}`} className="good-item">
                        <img className="good-item__img" src={NoImagePlaceholder} />
                        <div className="good-item__name">{item.name}</div>
                        <div>{item?.price || 0} <span>{item?.currency || "UAH"}</span></div>
                        <button className="button" onClick={() => addToCart(item)}>
                            Add to cart
                        </button>
                    </div>
                );
            }) : <span>Nothing here...</span>}
        </div>
    );
}

export default Goods;