import { Button, Card, CloseButton } from "react-bootstrap";
import Holder from "../assets/holder286x180.svg"

const Goods = ({ goods, addToCart, removeProduct, isAdmin }) => {
    return (
        <div className="goods">
            {goods.length
                ? goods.map(item => <Good item={item} addToCart={addToCart} removeProduct={removeProduct} key={item.id} isAdmin={isAdmin} />)
                : <span>Nothing here...</span>
            }
        </div>
    );
};

const Good = ({ item, addToCart, removeProduct, isAdmin }) => {
    const { price, currency, name, description, imageURL } = item;
    return (
        <Card className="product-item" >
            {isAdmin && <CloseButton onClick={() => removeProduct(item)} />}
            <Card.Img variant="top" src={imageURL || Holder} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {price || 0} {' '} {currency || "UAH"}
                </Card.Subtitle>
                <Button variant="outline-dark" onClick={() => addToCart(item)}>Add to cart</Button>
            </Card.Body>
        </Card>
    );
};

export default Goods;