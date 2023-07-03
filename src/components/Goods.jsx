import { Button, Card } from "react-bootstrap";
import Holder from "../assets/holder.svg"

const Goods = ({ goods, addToCart }) => {
    return (
        <div className="goods">
            {goods.length ? goods.map((item) => {
                return <Good item={item} addToCart={addToCart} key={item.id} />;
            }) : <span>Nothing here...</span>}
        </div>
    );
};

const Good = ({ item, addToCart }) => {
    return (
        <Card style={{ width: '18rem', margin: '8px' }}>
            <Card.Img variant="top" src={Holder} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.name}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    {item?.price || 0} {' '} {item?.currency || "UAH"}
                </Card.Subtitle>
                <Button variant="dark" onClick={() => addToCart(item)}>Add to cart</Button>
            </Card.Body>
        </Card>
    );
};

export default Goods;