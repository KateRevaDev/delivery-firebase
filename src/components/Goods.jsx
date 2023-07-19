import { Button, Card } from "react-bootstrap";
import Holder from "../assets/holder286x180.svg"

const Goods = ({ goods, addToCart }) => {
    return (
        <div className="goods">
            {goods.length
                ? goods.map(item => <Good item={item} addToCart={addToCart} key={item.id} />)
                : <span>Nothing here...</span>
            }
        </div>
    );
};

const Good = ({ item, addToCart }) => {
    const { price, currency, name, description, imageURL } = item;
    return (
        <Card style={{ width: '18rem', margin: '8px' }}>
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